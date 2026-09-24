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
