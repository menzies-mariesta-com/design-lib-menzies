import {
  applyTheme,
  readStoredMode,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  type ThemeChangeDetail,
  type ThemeMode,
  type WatercolorThemeId,
} from '../theme'
import {
  applyBrush,
  readStoredBrush,
  BRUSH_CHANGE_EVENT,
  type BrushChangeDetail,
  type BrushState,
} from '../brush'
import { attachGlobalRipple } from '../lib/ripple'
import { attachSmartTooltips } from '../lib/tooltipPlacement'

export type InitWashOptions = {
  /** Initial pigment id. Defaults to stored or mineral. */
  defaultPigment?: WatercolorThemeId
  /** Initial paper mode. Defaults to stored or light. */
  defaultMode?: ThemeMode
  /** When true, installs document-level ripple and smart tooltip placement. Default true. */
  enableEffects?: boolean
  /** When true, restores and applies stored brush on boot. Default true. */
  enableBrush?: boolean
}

export type WashRuntime = {
  getPigment: () => WatercolorThemeId
  getMode: () => ThemeMode
  getBrush: () => BrushState
  setPigment: (id: WatercolorThemeId) => void
  setMode: (mode: ThemeMode) => void
  setBrush: (partial: Partial<BrushState>) => void
  destroy: () => void
}

/**
 * Framework-free boot helper: applies pigment theme, optional brush load,
 * and wires document-level ripple and smart tooltip placement once.
 */
export function initWash(options: InitWashOptions = {}): WashRuntime {
  const {
    defaultPigment,
    defaultMode,
    enableEffects = true,
    enableBrush = true,
  } = options

  let pigment: WatercolorThemeId = defaultPigment ?? readStoredTheme()
  let mode: ThemeMode = defaultMode ?? readStoredMode()
  let brush: BrushState = readStoredBrush()

  applyTheme(pigment, mode)
  if (enableBrush) {
    applyBrush(brush)
  }

  const cleanups: Array<() => void> = []

  if (enableEffects) {
    const detachRipple = attachGlobalRipple()
    const detachTips = attachSmartTooltips()
    if (detachRipple) cleanups.push(detachRipple)
    if (detachTips) cleanups.push(detachTips)
  }

  function onTheme(event: Event) {
    const detail = (event as CustomEvent<ThemeChangeDetail>).detail
    if (!detail) return
    pigment = detail.pigment
    mode = detail.mode
  }

  function onBrush(event: Event) {
    const detail = (event as CustomEvent<BrushChangeDetail>).detail
    if (!detail) return
    brush = detail
  }

  window.addEventListener(THEME_CHANGE_EVENT, onTheme)
  window.addEventListener(BRUSH_CHANGE_EVENT, onBrush)
  cleanups.push(() => {
    window.removeEventListener(THEME_CHANGE_EVENT, onTheme)
    window.removeEventListener(BRUSH_CHANGE_EVENT, onBrush)
  })

  return {
    getPigment: () => pigment,
    getMode: () => mode,
    getBrush: () => brush,
    setPigment(id) {
      pigment = id
      applyTheme(id, mode)
    },
    setMode(next) {
      mode = next
      applyTheme(pigment, next)
    },
    setBrush(partial) {
      brush = applyBrush(partial)
    },
    destroy() {
      for (const cleanup of cleanups) cleanup()
      cleanups.length = 0
    },
  }
}
