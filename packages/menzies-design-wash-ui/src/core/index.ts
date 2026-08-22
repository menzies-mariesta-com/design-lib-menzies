/**
 * Framework-free Wash UI core: themes, brushes, DOM helpers, and markup recipes.
 * Use with `menzies-design-wash-ui/styles.css` in any stack (vanilla, Vue, Svelte, etc.).
 */

export * from '../theme'
export * from '../brush'

export {
  attachGlobalRipple,
  spawnRipple,
  clearRipples,
  prefersReducedMotion,
  findRippleHost,
  type RippleOrigin,
  type SpawnRippleOptions,
} from '../lib/ripple'

export {
  attachSmartTooltips,
  applyTooltipPlacement,
  measureTooltipPlacement,
  getTooltipClipBounds,
  estimateTooltipSize,
  tooltipPlacementClassName,
  type TooltipSide,
  type MeasureTooltipOptions,
} from '../lib/tooltipPlacement'

export {
  measureDropdownPlacement,
  dropdownPlacementClassName,
  DROPDOWN_PANEL_OVERFLOW,
  type DropdownPlacement,
  type MeasureDropdownOptions,
} from '../lib/dropdownPlacement'

export {
  createWashId,
  createLiveAnnouncer,
  trapFocus,
  type LiveAnnouncer,
} from '../a11y/vanilla'

export { washRecipes } from '../components/recipes'

export { initWash, type InitWashOptions, type WashRuntime } from './init'
