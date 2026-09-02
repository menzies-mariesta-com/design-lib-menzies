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
  attachSmartTooltips,
  applyTooltipPlacement,
  type TooltipSide as SmartTooltipSide,
} from '../lib/tooltipPlacement'

export {
  useDropdownPlacement,
  useDetailsDropdownPlacement,
  measureDropdownPlacement,
  dropdownPlacementClassName,
  DROPDOWN_PANEL_OVERFLOW,
  type DropdownPlacement,
  type MeasureDropdownOptions,
} from '../lib/dropdownPlacement'

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
