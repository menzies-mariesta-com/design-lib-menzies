/** Wash ripple: opt in with `.ripple`, `.ripple-surface`, or `[data-ripple]`. */

export type RippleOrigin = 'pointer' | 'center'

export type SpawnRippleOptions = {
  origin?: RippleOrigin
  clientX?: number
  clientY?: number
}

const HOST_SELECTOR = '.ripple, .ripple-surface, [data-ripple]'
const SKIP_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]), textarea, select, [type="range"], [type="checkbox"], [type="radio"], [type="file"], [type="color"], [role="slider"], .no-ripple'

const hostTimers = new WeakMap<Element, Set<number>>()
let attached = false
let reducedMotionMq: MediaQueryList | null = null

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  if (!reducedMotionMq) {
    reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
  }
  return reducedMotionMq.matches
}

function readOrigin(host: HTMLElement): RippleOrigin {
  const raw = host.getAttribute('data-ripple-origin')
  return raw === 'center' ? 'center' : 'pointer'
}

function readDurationMs(host: HTMLElement): number {
  const raw = getComputedStyle(host).getPropertyValue('--ripple-duration').trim()
  return Number.parseFloat(raw) || 620
}

function isDisabledHost(host: HTMLElement): boolean {
  if (host.hasAttribute('disabled')) return true
  if (host.getAttribute('aria-disabled') === 'true') return true
  if (host.classList.contains('btn-disabled')) return true
  if (host.classList.contains('disabled')) return true
  return false
}

function shouldSkipTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true
  if (target.closest(SKIP_SELECTOR)) return true
  return false
}

/** Closest ripple host, or null if the event should not bloom. */
export function findRippleHost(
  target: EventTarget | null,
): HTMLElement | null {
  if (!(target instanceof Element)) return null
  if (shouldSkipTarget(target)) return null

  const host = target.closest(HOST_SELECTOR)
  if (!(host instanceof HTMLElement)) return null
  if (host.hasAttribute('data-ripple-managed')) return null
  if (isDisabledHost(host)) return null
  return host
}

export function clearRipples(host: Element): void {
  const timers = hostTimers.get(host)
  if (timers) {
    for (const id of timers) window.clearTimeout(id)
    timers.clear()
  }
  host.querySelectorAll(':scope > .ripple-wave').forEach((node) => node.remove())
}

export function spawnRipple(
  host: HTMLElement,
  options: SpawnRippleOptions = {},
): void {
  if (prefersReducedMotion()) return
  if (isDisabledHost(host)) return

  const origin = options.origin ?? readOrigin(host)
  const rect = host.getBoundingClientRect()
  const scaleRaw = getComputedStyle(document.documentElement)
    .getPropertyValue('--brush-ripple-scale')
    .trim()
  const brushScale = Number.parseFloat(scaleRaw) || 1
  const size = Math.max(rect.width, rect.height) * 2 * brushScale

  let x: number
  let y: number
  if (
    origin === 'center' ||
    options.clientX === undefined ||
    options.clientY === undefined
  ) {
    x = rect.width / 2 - size / 2
    y = rect.height / 2 - size / 2
  } else {
    x = options.clientX - rect.left - size / 2
    y = options.clientY - rect.top - size / 2
  }

  const wave = document.createElement('span')
  wave.className = 'ripple-wave'
  wave.setAttribute('aria-hidden', 'true')
  wave.style.width = `${size}px`
  wave.style.height = `${size}px`
  wave.style.left = `${x}px`
  wave.style.top = `${y}px`

  host.appendChild(wave)

  let timers = hostTimers.get(host)
  if (!timers) {
    timers = new Set()
    hostTimers.set(host, timers)
  }

  const durationMs = readDurationMs(host)
  const timer = window.setTimeout(() => {
    wave.remove()
    timers!.delete(timer)
  }, durationMs + 40)
  timers.add(timer)
}

function onPointerDown(event: PointerEvent): void {
  if (event.button !== 0 && event.pointerType === 'mouse') return
  const host = findRippleHost(event.target)
  if (!host) return
  spawnRipple(host, {
    origin: readOrigin(host),
    clientX: event.clientX,
    clientY: event.clientY,
  })
}

function onKeyDown(event: KeyboardEvent): void {
  if (event.key !== 'Enter' && event.key !== ' ') return
  if (event.repeat) return

  const active = document.activeElement
  if (!(active instanceof HTMLElement)) return
  if (!active.matches(HOST_SELECTOR)) return
  if (shouldSkipTarget(active)) return
  if (active.hasAttribute('data-ripple-managed')) return
  if (isDisabledHost(active)) return

  spawnRipple(active, { origin: 'center' })
}

/**
 * Document-level listeners for `.ripple` / `.ripple-surface` / `[data-ripple]`.
 * Safe to call once at app boot; subsequent calls are no-ops.
 */
export function attachGlobalRipple(): () => void {
  if (typeof document === 'undefined' || attached) {
    return () => undefined
  }

  attached = true
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('keydown', onKeyDown, true)

  return () => {
    document.removeEventListener('pointerdown', onPointerDown, true)
    document.removeEventListener('keydown', onKeyDown, true)
    attached = false
  }
}
