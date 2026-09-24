/**
 * React adapter for Wash UI: provider, primitives, and hooks.
 */

export { WashProvider, useWash, useWashOptional, type WashProviderProps } from '../WashProvider'

export * from '../a11y'
export * from '../primitives'
export * from '../components'

export {
  attachGlobalRipple,
  spawnRipple,
  clearRipples,
  prefersReducedMotion,
  type RippleOrigin,
  type SpawnRippleOptions,
} from '../lib/ripple'

export {
  attachOverflowMarquee,
  isTextOverflowing,
  type AttachOverflowMarqueeOptions,
} from '../lib/overflowMarquee'

export {
  attachSmartTooltips,
  applyTooltipPlacement,
  resolveHorizontalTooltipSide,
  stripHorizontalTooltipClasses,
  type TooltipSide as SmartTooltipSide,
  type HorizontalTooltipSide,
} from '../lib/tooltipPlacement'

export {
  measureDropdownPlacement,
  dropdownPlacementClassName,
  dropdownPanelStyle,
  sameDropdownPlacement,
  DROPDOWN_PANEL_OVERFLOW,
  DROPDOWN_PANEL_Z,
  type DropdownPlacement,
  type DropdownPanelStyle,
  type MeasureDropdownOptions,
} from '../lib/dropdownPlacement'

export {
  placeContextMenuNearCursor,
  CONTEXT_MENU_CURSOR_GAP,
  CONTEXT_MENU_LONG_PRESS_MS,
  CONTEXT_MENU_LONG_PRESS_MOVE_CANCEL_PX2,
  CONTEXT_MENU_SHELL_CLASS,
  type ContextMenuPos,
} from '../lib/contextMenu'

export {
  useDropdownPlacement,
  useDetailsDropdownPlacement,
  DROPDOWN_HOVER_CLOSE_DELAY_MS,
  type UseDetailsDropdownPlacementOptions,
} from '../hooks/useDropdownPlacement'

export {
  useContextMenu,
  useContextMenuSurface,
  type UseContextMenuResult,
  type ContextMenuSurfaceTriggers,
} from '../hooks/useContextMenu'

export { useRipple, usePrefersReducedMotion } from '../hooks/useRipple'
export {
  useWatercolorSplash,
  type UseWatercolorSplashOptions,
} from '../hooks/useWatercolorSplash'

// Re-export theme for convenience in React apps
export * from '../theme'

export * from '../charts'

export { WASH_UI_VERSION } from '../version'
export {
  washUiBrandText,
  washUiBrandLabel,
  washUiBrandInlineHtml,
} from '../washUiBrand'
export { WashUiBrand, type WashUiBrandProps } from '../components/WashUiBrand'
