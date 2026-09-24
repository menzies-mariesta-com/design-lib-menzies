/** Prefer vertical flip / end-align over left/right so menus never force horizontal page scroll. */
export type DropdownPlacement = {
  end: boolean
  top: boolean
  /**
   * Viewport-capped panel height (px) for the chosen side.
   * Apply as inline `maxHeight` so the menu scrolls instead of escaping the viewport.
   */
  maxHeight: number
}

export type MeasureDropdownOptions = {
  /** Estimated panel width in px (used before paint). Default 288 (w-72). */
  panelWidth?: number
  /** Preferred panel height in px before clamping to free space. Default 320. */
  panelHeight?: number
  /** Viewport padding in px. Default 8. */
  pad?: number
  /**
   * Minimum height (px) needed below the trigger to stay bottom-placed.
   * Default: min(panelHeight, 40% of viewport), floored at 160.
   */
  minBottom?: number
}

/** Shared panel utilities: cap width to viewport; overflow scrolls vertically. */
export const DROPDOWN_PANEL_OVERFLOW =
  'max-w-[min(100vw-1rem,24rem)] overflow-x-hidden overflow-y-auto'

/**
 * Panel z-index utility for `dropdown-content`.
 * Host elevation when open is handled globally in Wash UI CSS
 * (`.dropdown-open` / `:focus-within` / `details[open]` → z-20).
 */
export const DROPDOWN_PANEL_Z = 'z-50'

const DEFAULT_PANEL_HEIGHT = 320
const DEFAULT_MIN_PANEL = 120

export function measureDropdownPlacement(
  trigger: HTMLElement,
  opts: MeasureDropdownOptions = {},
): DropdownPlacement {
  const pad = opts.pad ?? 8
  const panelWidth = opts.panelWidth ?? 288
  const panelHeight = opts.panelHeight ?? DEFAULT_PANEL_HEIGHT
  const rect = trigger.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  const spaceBelow = Math.max(0, vh - rect.bottom - pad)
  const spaceAbove = Math.max(0, rect.top - pad)

  const minBottom =
    opts.minBottom ??
    Math.max(160, Math.min(panelHeight, Math.floor(vh * 0.4)))

  // Default bottom. Flip top only when below is too tight and above is roomier.
  const top = spaceBelow < minBottom && spaceAbove > spaceBelow

  // Grow leftward when the trigger sits near the right edge
  const spaceToViewportRight = vw - rect.left - pad
  const end =
    spaceToViewportRight < panelWidth || rect.right > vw - panelWidth - pad

  const sideSpace = top ? spaceAbove : spaceBelow
  const maxHeight = Math.max(
    DEFAULT_MIN_PANEL,
    Math.min(panelHeight, sideSpace, Math.floor(vh * 0.7)),
  )

  return { end, top, maxHeight }
}

export function dropdownPlacementClassName(
  placement: DropdownPlacement,
  extra = '',
): string {
  const parts = [
    'dropdown',
    placement.end ? 'dropdown-end' : '',
    placement.top ? 'dropdown-top' : 'dropdown-bottom',
    extra,
  ]
  return parts.filter(Boolean).join(' ')
}

/** Inline style for viewport-capped dropdown panels. */
export type DropdownPanelStyle = {
  maxHeight: number
  '--wash-dropdown-max-h': string
}

export function dropdownPanelStyle(
  placement: DropdownPlacement,
): DropdownPanelStyle {
  return {
    maxHeight: placement.maxHeight,
    '--wash-dropdown-max-h': `${placement.maxHeight}px`,
  }
}

export function sameDropdownPlacement(
  a: DropdownPlacement,
  b: DropdownPlacement,
): boolean {
  return a.end === b.end && a.top === b.top && a.maxHeight === b.maxHeight
}

/** Fine-pointer hover media query (matches Wash CSS dropdown hover). */
export const DROPDOWN_HOVER_MEDIA = '(hover: hover) and (pointer: fine)'

/** Grace period before hover-close so the pointer can reach the panel. */
export const DROPDOWN_HOVER_CLOSE_DELAY_MS = 200

const HOVER_BOUND = new WeakSet<HTMLDetailsElement>()

function isHoverCapableDetails(el: Element): el is HTMLDetailsElement {
  return (
    el instanceof HTMLDetailsElement &&
    el.classList.contains('dropdown') &&
    !el.classList.contains('dropdown-no-hover') &&
    !el.classList.contains('dropdown-close')
  )
}

/**
 * Bind hover-open / delayed hover-close on one `<details class="dropdown">`.
 * No-ops when `dropdown-no-hover` / `dropdown-close` is present, or when already bound.
 */
export function bindDetailsDropdownHover(
  host: HTMLDetailsElement,
  opts: { hoverCloseDelayMs?: number } = {},
): () => void {
  if (!isHoverCapableDetails(host) || HOVER_BOUND.has(host)) {
    return () => undefined
  }

  HOVER_BOUND.add(host)
  const hoverCloseDelayMs = opts.hoverCloseDelayMs ?? DROPDOWN_HOVER_CLOSE_DELAY_MS
  const mq =
    typeof window.matchMedia === 'function'
      ? window.matchMedia(DROPDOWN_HOVER_MEDIA)
      : null

  let closeTimer: ReturnType<typeof setTimeout> | null = null

  const clearCloseTimer = () => {
    if (closeTimer != null) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
  }

  const onEnter = () => {
    if (mq && !mq.matches) return
    clearCloseTimer()
    if (!host.open) host.open = true
  }

  const onLeave = () => {
    if (mq && !mq.matches) return
    clearCloseTimer()
    const delay = Math.max(0, hoverCloseDelayMs)
    closeTimer = setTimeout(() => {
      closeTimer = null
      if (host.open) host.open = false
    }, delay)
  }

  host.addEventListener('pointerenter', onEnter)
  host.addEventListener('pointerleave', onLeave)

  return () => {
    clearCloseTimer()
    host.removeEventListener('pointerenter', onEnter)
    host.removeEventListener('pointerleave', onLeave)
    HOVER_BOUND.delete(host)
  }
}

export type AttachDetailsDropdownsOptions = {
  /** Root to scan / observe. Default `document`. */
  root?: ParentNode
  hoverCloseDelayMs?: number
}

/**
 * Framework-free: hover-open for `<details class="dropdown">` (fine pointers),
 * plus outside click and Escape dismiss.
 * Opt out per element with `dropdown-no-hover` (e.g. WashTimePicker).
 * Non-details `.dropdown` hover remains CSS-only.
 */
export function attachDetailsDropdowns(
  options: AttachDetailsDropdownsOptions = {},
): () => void {
  const root = options.root ?? document
  const hoverCloseDelayMs =
    options.hoverCloseDelayMs ?? DROPDOWN_HOVER_CLOSE_DELAY_MS
  const cleanups = new Map<HTMLDetailsElement, () => void>()

  const bindAll = (scope: ParentNode) => {
    const list = scope.querySelectorAll?.('details.dropdown')
    if (!list) return
    for (const el of list) {
      if (!(el instanceof HTMLDetailsElement)) continue
      if (cleanups.has(el)) continue
      if (!isHoverCapableDetails(el)) continue
      cleanups.set(el, bindDetailsDropdownHover(el, { hoverCloseDelayMs }))
    }
  }

  bindAll(root)

  const observer =
    typeof MutationObserver === 'function'
      ? new MutationObserver((records) => {
          for (const record of records) {
            for (const node of record.addedNodes) {
              if (!(node instanceof Element)) continue
              if (node instanceof HTMLDetailsElement && node.classList.contains('dropdown')) {
                if (!cleanups.has(node) && isHoverCapableDetails(node)) {
                  cleanups.set(
                    node,
                    bindDetailsDropdownHover(node, { hoverCloseDelayMs }),
                  )
                }
              }
              bindAll(node)
            }
          }
        })
      : null

  if (observer && root instanceof Node) {
    observer.observe(root, { childList: true, subtree: true })
  }

  function onPointerDown(event: PointerEvent) {
    const target = event.target
    if (!(target instanceof Node)) return
    const openList = document.querySelectorAll('details.dropdown[open]')
    for (const el of openList) {
      if (!(el instanceof HTMLDetailsElement)) continue
      if (!el.contains(target)) el.open = false
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return
    const openList = document.querySelectorAll('details.dropdown[open]')
    for (const el of openList) {
      if (el instanceof HTMLDetailsElement) el.open = false
    }
  }

  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeyDown)

  return () => {
    observer?.disconnect()
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('keydown', onKeyDown)
    for (const cleanup of cleanups.values()) cleanup()
    cleanups.clear()
  }
}
