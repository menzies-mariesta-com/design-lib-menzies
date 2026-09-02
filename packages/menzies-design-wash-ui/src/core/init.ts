import {
  applyTheme,
  readStoredMode,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  type ThemeChangeDetail,
  type ThemeMode,
  type WatercolorThemeId,
} from '../theme'
import { attachGlobalRipple } from '../lib/ripple'
import { attachSmartTooltips } from '../lib/tooltipPlacement'

export type InitWashOptions = {
  /** Initial pigment id. Defaults to stored or mineral. */
  defaultPigment?: WatercolorThemeId
  /** Initial paper mode. Defaults to stored or light. */
  defaultMode?: ThemeMode
  /** When true, installs document-level ripple and smart tooltip placement. Default true. */
  enableEffects?: boolean
}

export type WashRuntime = {
  getPigment: () => WatercolorThemeId
  getMode: () => ThemeMode
  setPigment: (id: WatercolorThemeId) => void
  setMode: (mode: ThemeMode) => void
  destroy: () => void
}

/**
 * Framework-free boot helper: applies pigment theme and wires document-level
 * ripple and smart tooltip placement once.
 */
export function initWash(options: InitWashOptions = {}): WashRuntime {
  const { defaultPigment, defaultMode, enableEffects = true } = options

  let pigment: WatercolorThemeId = defaultPigment ?? readStoredTheme()
  let mode: ThemeMode = defaultMode ?? readStoredMode()

  applyTheme(pigment, mode)

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

  window.addEventListener(THEME_CHANGE_EVENT, onTheme)
  cleanups.push(() => {
    window.removeEventListener(THEME_CHANGE_EVENT, onTheme)
  })

  return {
    getPigment: () => pigment,
    getMode: () => mode,
    setPigment(id) {
      pigment = id
      applyTheme(id, mode)
    },
    setMode(next) {
      mode = next
      applyTheme(pigment, next)
    },
    destroy() {
      for (const cleanup of cleanups) cleanup()
      cleanups.length = 0
    },
  }
}
