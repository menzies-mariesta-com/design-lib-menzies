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
  useDropdownPlacement,
  useDetailsDropdownPlacement,
} from '../hooks/useDropdownPlacement'

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
