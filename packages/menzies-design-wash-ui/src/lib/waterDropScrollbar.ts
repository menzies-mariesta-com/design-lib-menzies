import { prefersReducedMotion } from './ripple'
import {
  computeDropRadiusPx,
  easeActivity,
  springFollow,
  WaterDropFluidSim,
} from './waterDropFluidSim'
import {
  createFluidRenderer,
  type FluidRenderer,
  type FluidRendererMode,
} from './waterDropFluidRender'

export type WaterDropScrollbarOptions = {
  root?: ParentNode
  /** `canvas2d` (default) or `webgl` (opt-in metaball). */
  renderer?: FluidRendererMode
  gutterPx?: number
  minThumbPx?: number
  maxThumbPx?: number
  /** @deprecated Bar thumb width; fluid drops use simulated radius instead. */
  thumbWidthPx?: number
  /** @deprecated Use fluid impulse; kept for API compatibility. */
  maxStretch?: number
  /** @deprecated */
  velocityGain?: number
  /** @deprecated */
  stretchDecayMs?: number
}

export type VerticalThumbOptions = {
  minThumbPx?: number
  maxThumbPx?: number
}

export type VerticalThumbMetrics = {
  visible: boolean
  /** Thumb offset inside the host’s client box (px). */
  top: number
  /** Thumb height (px). */
  height: number
}

const DEFAULTS = {
  gutterPx: 8,
  minThumbPx: 28,
  maxThumbPx: 140,
  thumbWidthPx: 10,
  maxStretch: 1.85,
  velocityGain: 0.018,
  stretchDecayMs: 200,
  impulseGain: 0.72,
  maxActiveSims: 8,
  idleActivityEpsilon: 0.04,
  minHostPx: 48,
} as const

const OVERFLOW_SCROLL = new Set(['auto', 'scroll', 'overlay'])
const SKIP_SELECTOR = [
  'input',
  'textarea',
  'select',
  '[contenteditable="true"]',
  '.wash-rte-surface',
  '.wash-code-input',
  '.wash-code-highlight',
  '.wash-scroll-native',
  '[data-wash-scroll-native]',
  '.overflow-marquee-portal',
  '.overflow-marquee-track',
  '.wash-water-scroll-canvas',
  '.wash-water-scroll-portal',
].join(', ')

const HTML_CLASS = 'wash-water-scroll-enabled'
const PORTAL_CLASS = 'wash-water-scroll-portal'
const CANVAS_CLASS = 'wash-water-scroll-canvas'

type Axis = 'vertical' | 'horizontal'

type HostState = {
  sim: WaterDropFluidSim
  axis: Axis
  activity: number
  activityTarget: number
  springPos: number
  targetPos: number
  lastScrollPos: number
  lastScrollTime: number
  springInit: boolean
  visible: boolean
  centerX: number
  centerY: number
  radiusPx: number
  particleKernelPx: number
}

let attached = false
let portalEl: HTMLDivElement | null = null
let canvasEl: HTMLCanvasElement | null = null
let renderer: FluidRenderer | null = null
let rafId = 0
let lastFrame = 0
let rescanTimer: ReturnType<typeof setTimeout> | null = null
let canvasW = 0
let canvasH = 0
let idleFrameCounter = 0

const hostStates = new WeakMap<HTMLElement, HostState>()
const activeHosts = new Set<HTMLElement>()

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

export function computeVerticalThumb(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
  opts: VerticalThumbOptions = {},
): VerticalThumbMetrics {
  const minThumbPx = opts.minThumbPx ?? DEFAULTS.minThumbPx
  const maxThumbPx = opts.maxThumbPx ?? DEFAULTS.maxThumbPx
  const scrollMax = scrollHeight - clientHeight
  if (scrollMax <= 1 || clientHeight <= 0) {
    return { visible: false, top: 0, height: 0 }
  }
  const ratio = clientHeight / scrollHeight
  const height = clamp(minThumbPx, maxThumbPx, clientHeight * ratio)
  const travel = Math.max(0, clientHeight - height)
  const top = (scrollTop / scrollMax) * travel
  return { visible: true, top, height }
}

export function computeHorizontalThumb(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number,
  opts: VerticalThumbOptions = {},
): VerticalThumbMetrics {
  const minThumbPx = opts.minThumbPx ?? DEFAULTS.minThumbPx
  const maxThumbPx = opts.maxThumbPx ?? DEFAULTS.maxThumbPx
  const scrollMax = scrollWidth - clientWidth
  if (scrollMax <= 1 || clientWidth <= 0) {
    return { visible: false, top: 0, height: 0 }
  }
  const ratio = clientWidth / scrollWidth
  const height = clamp(minThumbPx, maxThumbPx, clientWidth * ratio)
  const travel = Math.max(0, clientWidth - height)
  const top = (scrollLeft / scrollMax) * travel
  return { visible: true, top, height }
}

/** @deprecated Fluid sim uses impulse; retained for tests and API stability. */
export function stretchFromVelocity(
  velocityPxPerMs: number,
  options: Pick<WaterDropScrollbarOptions, 'maxStretch' | 'velocityGain'> = {},
): number {
  const maxStretch = options.maxStretch ?? DEFAULTS.maxStretch
  const gain = options.velocityGain ?? DEFAULTS.velocityGain
  if (prefersReducedMotion()) return 1
  return clamp(1 + velocityPxPerMs * gain, 1, maxStretch)
}

/** @deprecated */
export function easeStretch(
  current: number,
  target: number,
  dtMs: number,
  halfLifeMs: number = DEFAULTS.stretchDecayMs,
): number {
  if (dtMs <= 0) return current
  const alpha = 1 - Math.exp(-dtMs / halfLifeMs)
  return current + (target - current) * alpha
}

function shouldSkip(el: Element): boolean {
  return Boolean(el.closest(SKIP_SELECTOR))
}

function hostMeetsMinSize(el: HTMLElement): boolean {
  return (
    el.clientWidth >= DEFAULTS.minHostPx &&
    el.clientHeight >= DEFAULTS.minHostPx
  )
}

function isVerticallyScrollable(el: HTMLElement): boolean {
  if (shouldSkip(el)) return false
  if (!hostMeetsMinSize(el)) return false
  const style = getComputedStyle(el)
  if (!OVERFLOW_SCROLL.has(style.overflowY)) return false
  return el.scrollHeight > el.clientHeight + 1
}

function isHorizontallyScrollable(el: HTMLElement): boolean {
  if (shouldSkip(el)) return false
  if (!hostMeetsMinSize(el)) return false
  const style = getComputedStyle(el)
  if (!OVERFLOW_SCROLL.has(style.overflowX)) return false
  return el.scrollWidth > el.clientWidth + 1
}

function simParticleCount(): number {
  return activeHosts.size > 4 ? 12 : 24
}

function rebuildSim(state: HostState, radius: number): void {
  state.sim = new WaterDropFluidSim(radius, state.axis, simParticleCount())
  state.particleKernelPx = Math.max(4, radius * 0.28)
}

function collectHosts(root: ParentNode): Array<{ el: HTMLElement; axis: Axis }> {
  const found: Array<{ el: HTMLElement; axis: Axis }> = []
  const seen = new Set<HTMLElement>()

  const scrolling = document.scrollingElement
  if (
    scrolling instanceof HTMLElement &&
    !shouldSkip(scrolling) &&
    hostMeetsMinSize(scrolling)
  ) {
    if (scrolling.scrollHeight > scrolling.clientHeight + 1) {
      found.push({ el: scrolling, axis: 'vertical' })
      seen.add(scrolling)
    }
  }

  const walk = root.querySelectorAll?.('*')
  if (!walk) return found

  for (const node of walk) {
    if (!(node instanceof HTMLElement)) continue
    if (seen.has(node)) continue
    if (isVerticallyScrollable(node)) {
      found.push({ el: node, axis: 'vertical' })
      seen.add(node)
      continue
    }
    if (isHorizontallyScrollable(node)) {
      found.push({ el: node, axis: 'horizontal' })
      seen.add(node)
    }
  }

  return found
}

function createHostState(axis: Axis, radiusPx: number): HostState {
  const count = simParticleCount()
  return {
    sim: new WaterDropFluidSim(radiusPx, axis, count),
    axis,
    activity: 0,
    activityTarget: 0,
    springPos: 0,
    targetPos: 0,
    lastScrollPos: 0,
    lastScrollTime: performance.now(),
    springInit: false,
    visible: false,
    centerX: 0,
    centerY: 0,
    radiusPx,
    particleKernelPx: Math.max(4, radiusPx * 0.28),
  }
}

function layoutHost(
  host: HTMLElement,
  state: HostState,
  gutterPx: number,
  metricsOpts: VerticalThumbOptions,
): void {
  const rect = host.getBoundingClientRect()
  if (
    rect.bottom < -40 ||
    rect.top > window.innerHeight + 40 ||
    rect.right < -40 ||
    rect.left > window.innerWidth + 40
  ) {
    state.visible = false
    return
  }

  if (state.axis === 'horizontal') {
    const metrics = computeHorizontalThumb(
      host.scrollLeft,
      host.scrollWidth,
      host.clientWidth,
      metricsOpts,
    )
    if (!metrics.visible) {
      state.visible = false
      return
    }
    state.visible = true
    const radius = computeDropRadiusPx({
      clientSize: host.clientWidth,
      scrollSize: host.scrollWidth,
    })
    if (Math.abs(radius - state.radiusPx) > 1) {
      state.radiusPx = radius
      rebuildSim(state, radius)
    }
    state.targetPos = metrics.top + metrics.height * 0.5
    if (!state.springInit) {
      state.springPos = state.targetPos
      state.springInit = true
    }
    state.centerX = rect.left + gutterPx + state.springPos
    state.centerY = rect.bottom - gutterPx - radius
    return
  }

  const metrics = computeVerticalThumb(
    host.scrollTop,
    host.scrollHeight,
    host.clientHeight,
    metricsOpts,
  )
  if (!metrics.visible) {
    state.visible = false
    return
  }
  state.visible = true
  const radius = computeDropRadiusPx({
    clientSize: host.clientHeight,
    scrollSize: host.scrollHeight,
  })
  if (Math.abs(radius - state.radiusPx) > 1) {
    state.radiusPx = radius
    rebuildSim(state, radius)
  }
  state.targetPos = metrics.top + metrics.height * 0.5
  if (!state.springInit) {
    state.springPos = state.targetPos
    state.springInit = true
  }
  state.centerX = rect.right - gutterPx - radius
  state.centerY = rect.top + gutterPx + state.springPos
}

function registerHost(host: HTMLElement, axis: Axis): void {
  if (hostStates.has(host)) return
  const radius = 12
  hostStates.set(host, createHostState(axis, radius))
  activeHosts.add(host)
}

function unregisterHost(host: HTMLElement): void {
  hostStates.delete(host)
  activeHosts.delete(host)
}

function syncHosts(root: ParentNode, gutterPx: number, metricsOpts: VerticalThumbOptions): void {
  const next = collectHosts(root)
  const nextSet = new Set(next.map((h) => h.el))

  for (const host of [...activeHosts]) {
    if (!nextSet.has(host)) unregisterHost(host)
  }

  for (const { el, axis } of next) {
    if (!hostStates.has(el)) registerHost(el, axis)
    const state = hostStates.get(el)
    if (state) layoutHost(el, state, gutterPx, metricsOpts)
  }
}

function onScroll(event: Event, impulseGain: number): void {
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  const host = target
  const state = hostStates.get(host)
  if (!state) return

  const now = performance.now()
  const pos = state.axis === 'horizontal' ? host.scrollLeft : host.scrollTop
  const dt = Math.max(1, now - state.lastScrollTime)
  const velocity = (pos - state.lastScrollPos) / dt

  state.lastScrollPos = pos
  state.lastScrollTime = now
  state.activityTarget = 1
  state.sim.impulseScroll(velocity, impulseGain)
}

function hostsAllIdle(): boolean {
  for (const host of activeHosts) {
    const state = hostStates.get(host)
    if (!state?.visible) continue
    if (state.activityTarget > 0 || state.activity > 0.05) return false
  }
  return true
}

function pickSimHosts(): HTMLElement[] {
  const visible: Array<{ host: HTMLElement; activity: number }> = []
  for (const host of activeHosts) {
    const state = hostStates.get(host)
    if (!state?.visible) continue
    visible.push({ host, activity: state.activity })
  }
  visible.sort((a, b) => b.activity - a.activity)
  const cap = DEFAULTS.maxActiveSims
  const active = new Set(visible.slice(0, cap).map((v) => v.host))
  return [...activeHosts].filter((h) => active.has(h))
}

function tick(
  resolved: Required<Pick<WaterDropScrollbarOptions, 'gutterPx' | 'minThumbPx' | 'maxThumbPx'>>,
  impulseGain: number,
): void {
  const now = performance.now()
  const dt = lastFrame > 0 ? now - lastFrame : 16
  lastFrame = now
  const reduced = prefersReducedMotion()

  const metricsOpts = {
    minThumbPx: resolved.minThumbPx,
    maxThumbPx: resolved.maxThumbPx,
  }

  for (const host of activeHosts) {
    const state = hostStates.get(host)
    if (!state) continue
    if (now - state.lastScrollTime > 160) {
      state.activityTarget = 0
    }
    state.activity = easeActivity(state.activity, state.activityTarget, dt)
    layoutHost(host, state, resolved.gutterPx, metricsOpts)
    state.springPos = springFollow(state.springPos, state.targetPos, dt)
    if (state.axis === 'horizontal') {
      const rect = host.getBoundingClientRect()
      state.centerX = rect.left + resolved.gutterPx + state.springPos
    } else {
      const rect = host.getBoundingClientRect()
      state.centerY = rect.top + resolved.gutterPx + state.springPos
    }
  }

  const globalIdle = hostsAllIdle()
  if (globalIdle) idleFrameCounter += 1
  else idleFrameCounter = 0
  const skipSimThisFrame = globalIdle && idleFrameCounter % 3 !== 0

  const simHosts = pickSimHosts()
  for (const host of simHosts) {
    const state = hostStates.get(host)
    if (!state?.visible) continue
    const shouldStep =
      !reduced &&
      !skipSimThisFrame &&
      (state.activity > DEFAULTS.idleActivityEpsilon || state.activityTarget > 0)
    if (shouldStep) {
      state.sim.step(dt, state.activity, reduced)
    }
  }

  if (renderer && canvasEl) {
    const w = window.innerWidth
    const h = window.innerHeight
    if (w !== canvasW || h !== canvasH) {
      canvasW = w
      canvasH = h
      renderer.resize(w, h)
    }
    renderer.beginFrame()
    for (const host of activeHosts) {
      const state = hostStates.get(host)
      if (!state?.visible) continue
      const points = reduced
        ? [{ x: state.centerX, y: state.centerY, r: state.radiusPx }]
        : state.sim.toScreenPoints(
            state.centerX,
            state.centerY,
            state.particleKernelPx,
          )
      renderer.drawDrop({ points, activity: reduced ? 0 : state.activity })
    }
    renderer.endFrame()
  }

  rafId = requestAnimationFrame(() => tick(resolved, impulseGain))
}

export function attachWaterDropScrollbar(
  options: WaterDropScrollbarOptions = {},
): (() => void) | undefined {
  if (typeof document === 'undefined') return undefined
  if (attached) return () => undefined

  const root = options.root ?? document
  const resolved = {
    gutterPx: options.gutterPx ?? DEFAULTS.gutterPx,
    minThumbPx: options.minThumbPx ?? DEFAULTS.minThumbPx,
    maxThumbPx: options.maxThumbPx ?? DEFAULTS.maxThumbPx,
  }
  const impulseGain = DEFAULTS.impulseGain

  attached = true
  document.documentElement.classList.add(HTML_CLASS)

  portalEl = document.createElement('div')
  portalEl.className = PORTAL_CLASS
  portalEl.setAttribute('aria-hidden', 'true')

  canvasEl = document.createElement('canvas')
  canvasEl.className = CANVAS_CLASS
  portalEl.appendChild(canvasEl)
  document.body.appendChild(portalEl)

  renderer = createFluidRenderer(canvasEl, {
    mode: options.renderer ?? 'canvas2d',
  })

  const scheduleRescan = () => {
    if (rescanTimer != null) clearTimeout(rescanTimer)
    rescanTimer = setTimeout(() => {
      rescanTimer = null
      syncHosts(root, resolved.gutterPx, {
        minThumbPx: resolved.minThumbPx,
        maxThumbPx: resolved.maxThumbPx,
      })
    }, 100)
  }

  const onScrollCapture = (e: Event) => onScroll(e, impulseGain)
  const onResize = () => {
    canvasW = 0
    canvasH = 0
    scheduleRescan()
  }

  document.addEventListener('scroll', onScrollCapture, {
    capture: true,
    passive: true,
  })
  window.addEventListener('resize', onResize, { passive: true })

  const resizeObs =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => scheduleRescan())
      : null
  resizeObs?.observe(document.documentElement)

  const mutationObs =
    typeof MutationObserver !== 'undefined'
      ? new MutationObserver(() => scheduleRescan())
      : null
  mutationObs?.observe(root === document ? document.documentElement : root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'hidden'],
  })

  syncHosts(root, resolved.gutterPx, {
    minThumbPx: resolved.minThumbPx,
    maxThumbPx: resolved.maxThumbPx,
  })
  lastFrame = performance.now()
  rafId = requestAnimationFrame(() => tick(resolved, impulseGain))

  return () => {
    attached = false
    document.documentElement.classList.remove(HTML_CLASS)
    document.removeEventListener('scroll', onScrollCapture, true)
    window.removeEventListener('resize', onResize)
    resizeObs?.disconnect()
    mutationObs?.disconnect()
    if (rescanTimer != null) clearTimeout(rescanTimer)
    cancelAnimationFrame(rafId)

    for (const host of [...activeHosts]) unregisterHost(host)
    renderer?.dispose()
    renderer = null
    portalEl?.remove()
    portalEl = null
    canvasEl = null
  }
}
