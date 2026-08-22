/**
 * Intelligent tooltip sides: pick top/bottom/left/right so tips stay
 * inside the viewport and overflow clipping ancestors (hidden|auto|scroll|clip).
 *
 * Opt out per element: data-tooltip-smart="off"
 * Preferred side: existing tooltip-{side} class (stored as data-tooltip-prefer)
 *
 * Note: base stylesheet may re-assert top for `.tooltip` inside sm+/md+/… media
 * queries. Side classes alone can lose that cascade; `styles` doubles
 * specificity (`.tooltip.tooltip-bottom`, etc.) so placement classes stick.
 */

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

export type MeasureTooltipOptions = {
  /** Gap between trigger and tip (--tt-off uses 0.5rem). Default 10. */
  gap?: number
  /** Inset from clip edges. Default 8. */
  pad?: number
}

const SIDE_CLASSES = [
  'tooltip-top',
  'tooltip-bottom',
  'tooltip-left',
  'tooltip-right',
] as const

const SIDE_ORDER: TooltipSide[] = ['top', 'bottom', 'right', 'left']

/** Tip chrome: padding + tail so estimates are not undersized. */
const TIP_TAIL_PX = 4
const TIP_SAFETY_PX = 4

type Bounds = { left: number; top: number; right: number; bottom: number }
type Size = { w: number; h: number }
type Box = Bounds

let attached = false
let activeTooltip: HTMLElement | null = null
let probe: HTMLDivElement | null = null

function isClipOverflow(value: string): boolean {
  return (
    value === 'hidden' ||
    value === 'auto' ||
    value === 'scroll' ||
    value === 'clip'
  )
}

/** Intersect viewport with overflow ancestors that can clip the tip. */
export function getTooltipClipBounds(
  el: HTMLElement,
  pad = 8,
): Bounds {
  let left = pad
  let top = pad
  let right = window.innerWidth - pad
  let bottom = window.innerHeight - pad

  let node: HTMLElement | null = el.parentElement
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node)
    const clipX = isClipOverflow(style.overflowX) || isClipOverflow(style.overflow)
    const clipY = isClipOverflow(style.overflowY) || isClipOverflow(style.overflow)

    if (clipX || clipY) {
      const r = node.getBoundingClientRect()
      if (clipX) {
        left = Math.max(left, r.left + pad)
        right = Math.min(right, r.right - pad)
      }
      if (clipY) {
        top = Math.max(top, r.top + pad)
        bottom = Math.min(bottom, r.bottom - pad)
      }
    }

    node = node.parentElement
  }

  return { left, top, right, bottom }
}

function ensureProbe(): HTMLDivElement {
  if (probe && document.body.contains(probe)) return probe
  probe = document.createElement('div')
  probe.setAttribute('aria-hidden', 'true')
  probe.style.cssText = [
    'position:absolute',
    'left:-9999px',
    'top:0',
    'visibility:hidden',
    'pointer-events:none',
    'white-space:normal',
    'max-width:20rem',
    'width:max-content',
    'padding:0.25rem 0.5rem',
    'font-size:0.875rem',
    'line-height:1.25',
    'box-sizing:border-box',
  ].join(';')
  document.body.appendChild(probe)
  return probe
}

/** Estimate tip box size from data-tip or .tooltip-content (::before). */
export function estimateTooltipSize(el: HTMLElement): Size {
  const content = el.querySelector(':scope > .tooltip-content')
  if (content instanceof HTMLElement) {
    const r = content.getBoundingClientRect()
    if (r.width > 1 && r.height > 1) {
      return {
        w: Math.ceil(r.width) + TIP_SAFETY_PX,
        h: Math.ceil(r.height) + TIP_TAIL_PX + TIP_SAFETY_PX,
      }
    }
  }

  const tip = el.getAttribute('data-tip') ?? ''
  if (!tip) {
    return { w: 80, h: 28 + TIP_TAIL_PX + TIP_SAFETY_PX }
  }

  const node = ensureProbe()
  // Match tip font when possible so width is not underestimated.
  const hostStyle = getComputedStyle(el)
  node.style.fontFamily = hostStyle.fontFamily
  node.style.fontWeight = hostStyle.fontWeight
  node.textContent = tip
  const r = node.getBoundingClientRect()
  return {
    w: Math.max(32, Math.ceil(r.width) + TIP_SAFETY_PX),
    h: Math.max(24, Math.ceil(r.height) + TIP_TAIL_PX + TIP_SAFETY_PX),
  }
}

export function readPreferredTooltipSide(el: HTMLElement): TooltipSide {
  const stored = el.dataset.tooltipPrefer as TooltipSide | undefined
  if (stored && SIDE_ORDER.includes(stored)) return stored

  if (el.classList.contains('tooltip-bottom')) return 'bottom'
  if (el.classList.contains('tooltip-left')) return 'left'
  if (el.classList.contains('tooltip-right')) return 'right'
  if (el.classList.contains('tooltip-top')) return 'top'
  return 'top'
}

function rememberPreferredSide(el: HTMLElement): TooltipSide {
  if (!el.dataset.tooltipPrefer) {
    el.dataset.tooltipPrefer = readPreferredTooltipSide(el)
  }
  return el.dataset.tooltipPrefer as TooltipSide
}

function tipBoxForSide(
  side: TooltipSide,
  trigger: DOMRect,
  tip: Size,
  gap: number,
): Box {
  const cx = trigger.left + trigger.width / 2
  const cy = trigger.top + trigger.height / 2

  switch (side) {
    case 'top':
      return {
        left: cx - tip.w / 2,
        right: cx + tip.w / 2,
        top: trigger.top - gap - tip.h,
        bottom: trigger.top - gap,
      }
    case 'bottom':
      return {
        left: cx - tip.w / 2,
        right: cx + tip.w / 2,
        top: trigger.bottom + gap,
        bottom: trigger.bottom + gap + tip.h,
      }
    case 'left':
      return {
        left: trigger.left - gap - tip.w,
        right: trigger.left - gap,
        top: cy - tip.h / 2,
        bottom: cy + tip.h / 2,
      }
    case 'right':
      return {
        left: trigger.right + gap,
        right: trigger.right + gap + tip.w,
        top: cy - tip.h / 2,
        bottom: cy + tip.h / 2,
      }
  }
}

function clippedAmount(box: Box, bounds: Bounds): number {
  return (
    Math.max(0, bounds.left - box.left) +
    Math.max(0, box.right - bounds.right) +
    Math.max(0, bounds.top - box.top) +
    Math.max(0, box.bottom - bounds.bottom)
  )
}

function freeSpace(side: TooltipSide, trigger: DOMRect, bounds: Bounds): number {
  switch (side) {
    case 'top':
      return trigger.top - bounds.top
    case 'bottom':
      return bounds.bottom - trigger.bottom
    case 'left':
      return trigger.left - bounds.left
    case 'right':
      return bounds.right - trigger.right
  }
}

/**
 * When the trigger sits on a viewport/clip edge, flip the preferred side away
 * from that edge (e.g. navbar at top=12px must never prefer top).
 */
function edgeAwarePreferred(
  preferred: TooltipSide,
  trigger: DOMRect,
  tip: Size,
  gap: number,
  bounds: Bounds,
): TooltipSide {
  const needY = tip.h + gap
  const needX = tip.w + gap
  const space = {
    top: trigger.top - bounds.top,
    bottom: bounds.bottom - trigger.bottom,
    left: trigger.left - bounds.left,
    right: bounds.right - trigger.right,
  }

  if (preferred === 'top' && space.top < needY && space.bottom >= needY) {
    return 'bottom'
  }
  if (preferred === 'bottom' && space.bottom < needY && space.top >= needY) {
    return 'top'
  }
  if (preferred === 'left' && space.left < needX && space.right >= needX) {
    return 'right'
  }
  if (preferred === 'right' && space.right < needX && space.left >= needX) {
    return 'left'
  }

  // No explicit prefer / default top near the top edge → bottom.
  if (preferred === 'top' && space.top < needY) {
    if (space.bottom >= needY) return 'bottom'
    if (space.right >= needX) return 'right'
    if (space.left >= needX) return 'left'
  }

  return preferred
}

/** Side try order: preferred first, then opposites, then remaining. */
function orderedSides(preferred: TooltipSide): TooltipSide[] {
  const opposite: Record<TooltipSide, TooltipSide> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  }
  const rest = SIDE_ORDER.filter((s) => s !== preferred && s !== opposite[preferred])
  return [preferred, opposite[preferred], ...rest]
}

export function measureTooltipPlacement(
  el: HTMLElement,
  opts: MeasureTooltipOptions = {},
): TooltipSide {
  const gap = opts.gap ?? 10
  const pad = opts.pad ?? 8
  const remembered = rememberPreferredSide(el)
  const trigger = el.getBoundingClientRect()
  const tip = estimateTooltipSize(el)
  const bounds = getTooltipClipBounds(el, pad)
  const preferred = edgeAwarePreferred(remembered, trigger, tip, gap, bounds)

  let best: TooltipSide = preferred
  let bestClipped = Number.POSITIVE_INFINITY
  let bestFree = -1
  let bestPreferred = false

  for (const side of orderedSides(preferred)) {
    const box = tipBoxForSide(side, trigger, tip, gap)
    const clipped = clippedAmount(box, bounds)
    const free = freeSpace(side, trigger, bounds)
    const isPreferred = side === preferred

    const better =
      clipped < bestClipped ||
      (clipped === bestClipped && isPreferred && !bestPreferred) ||
      (clipped === bestClipped &&
        isPreferred === bestPreferred &&
        free > bestFree)

    if (better) {
      best = side
      bestClipped = clipped
      bestFree = free
      bestPreferred = isPreferred
    }
  }

  return best
}

export function tooltipPlacementClassName(
  side: TooltipSide,
  extra = '',
): string {
  const parts = ['tooltip', `tooltip-${side}`, extra]
  return parts.filter(Boolean).join(' ')
}

/** Apply the best side class; keeps color / alignment classes intact. */
export function applyTooltipPlacement(
  el: HTMLElement,
  opts: MeasureTooltipOptions = {},
): TooltipSide | null {
  if (el.dataset.tooltipSmart === 'off') return null
  const hasTip =
    (el.getAttribute('data-tip') ?? '') !== '' ||
    Boolean(el.querySelector(':scope > .tooltip-content:not(:empty)'))
  if (!hasTip) return null

  const side = measureTooltipPlacement(el, opts)
  for (const c of SIDE_CLASSES) el.classList.remove(c)
  el.classList.add(`tooltip-${side}`)
  el.dataset.tooltipSide = side
  return side
}

function findTooltipHost(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null
  const host = target.closest('.tooltip')
  if (!(host instanceof HTMLElement)) return null
  if (host.dataset.tooltipSmart === 'off') return null
  return host
}

function isTooltipActive(el: HTMLElement): boolean {
  if (el.classList.contains('tooltip-open')) return true
  if (el.matches(':hover')) return true
  if (el.querySelector(':focus-visible')) return true
  return false
}

function onEnter(event: Event) {
  const host = findTooltipHost(event.target)
  if (!host) return
  activeTooltip = host
  // Run before the tip opacity transition paints.
  applyTooltipPlacement(host)
}

function onScrollOrResize() {
  const el = activeTooltip
  if (!el) return
  if (!document.contains(el) || !isTooltipActive(el)) {
    activeTooltip = null
    return
  }
  applyTooltipPlacement(el)
}

/**
 * Global listener: on hover/focus of any `.tooltip`, pick a side that
 * fits the viewport and overflow parents. Call once from app boot.
 */
export function attachSmartTooltips(): () => void {
  if (attached || typeof document === 'undefined') {
    return () => undefined
  }
  attached = true

  document.addEventListener('pointerover', onEnter, true)
  document.addEventListener('focusin', onEnter, true)
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)

  return () => {
    document.removeEventListener('pointerover', onEnter, true)
    document.removeEventListener('focusin', onEnter, true)
    window.removeEventListener('scroll', onScrollOrResize, true)
    window.removeEventListener('resize', onScrollOrResize)
    attached = false
    activeTooltip = null
  }
}
