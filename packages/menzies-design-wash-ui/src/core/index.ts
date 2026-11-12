/**
 * Framework-free Wash UI core: themes, DOM helpers, and markup recipes.
 * Use with `menzies-design-wash-ui/styles.css` in any stack (vanilla, Vue, Svelte, etc.).
 */

export * from '../theme'

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
  attachOverflowMarquee,
  isTextOverflowing,
  type AttachOverflowMarqueeOptions,
} from '../lib/overflowMarquee'

export {
  attachSmartTooltips,
  applyTooltipPlacement,
  measureTooltipPlacement,
  getTooltipClipBounds,
  estimateTooltipSize,
  tooltipPlacementClassName,
  resolveHorizontalTooltipSide,
  stripHorizontalTooltipClasses,
  type TooltipSide,
  type HorizontalTooltipSide,
  type MeasureTooltipOptions,
} from '../lib/tooltipPlacement'

export {
  measureDropdownPlacement,
  dropdownPlacementClassName,
  dropdownPanelStyle,
  mergeDropdownPanelStyle,
  resolveTriggerMatchedPanelStyle,
  sameDropdownPlacement,
  bindDetailsDropdownHover,
  bindDivDropdownHover,
  attachDetailsDropdowns,
  DROPDOWN_PANEL_OVERFLOW,
  DROPDOWN_PANEL_Z,
  DROPDOWN_HOVER_MEDIA,
  DROPDOWN_HOVER_CLOSE_DELAY_MS,
  type DropdownPlacement,
  type DropdownPanelStyle,
  type MeasureDropdownOptions,
  type AttachDetailsDropdownsOptions,
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
  createWashId,
  createLiveAnnouncer,
  trapFocus,
  type LiveAnnouncer,
} from '../a11y/vanilla'

export { washRecipes } from '../components/recipes'

export { initWash, type InitWashOptions, type WashRuntime } from './init'

export {
  attachWaterDropScrollbar,
  computeVerticalThumb,
  computeHorizontalThumb,
  stretchFromVelocity,
  easeStretch,
  type WaterDropScrollbarOptions,
  type VerticalThumbMetrics,
  type VerticalThumbOptions,
} from '../lib/waterDropScrollbar'
export {
  computeDropRadiusPx,
  easeActivity,
  springFollow,
  WaterDropFluidSim,
  type FluidAxis,
  type FluidMassOptions,
} from '../lib/waterDropFluidSim'
export {
  dropDrawBounds,
  createFluidRenderer,
  type FluidRendererMode,
  type FluidDropDraw,
} from '../lib/waterDropFluidRender'

export { WASH_UI_VERSION } from '../version'
export {
  washUiBrandText,
  washUiBrandLabel,
  washUiBrandInlineHtml,
} from '../washUiBrand'
