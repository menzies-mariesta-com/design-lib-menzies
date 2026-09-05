/** Prefer vertical flip / end-align over left/right so menus never force horizontal page scroll. */
export type DropdownPlacement = {
  end: boolean
  top: boolean
}

export type MeasureDropdownOptions = {
  /** Estimated panel width in px (used before paint). Default 288 (w-72). */
  panelWidth?: number
  /** Estimated panel height in px. Default 320. */
  panelHeight?: number
  /** Viewport padding in px. Default 8. */
  pad?: number
}

/** Shared panel utilities: cap width to viewport; overflow scrolls vertically. */
export const DROPDOWN_PANEL_OVERFLOW =
  'max-w-[min(100vw-1rem,24rem)] max-h-[min(70vh,24rem)] overflow-x-hidden overflow-y-auto'

export function measureDropdownPlacement(
  trigger: HTMLElement,
  opts: MeasureDropdownOptions = {},
): DropdownPlacement {
  const pad = opts.pad ?? 8
  const panelWidth = opts.panelWidth ?? 288
  const panelHeight = opts.panelHeight ?? 320
  const rect = trigger.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  const spaceBelow = vh - rect.bottom - pad
  const spaceAbove = rect.top - pad
  const top = spaceBelow < Math.min(panelHeight, vh * 0.5) && spaceAbove > spaceBelow

  // Grow leftward when the trigger sits near the right edge
  const spaceToViewportRight = vw - rect.left - pad
  const end = spaceToViewportRight < panelWidth || rect.right > vw - panelWidth - pad

  return { end, top }
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
