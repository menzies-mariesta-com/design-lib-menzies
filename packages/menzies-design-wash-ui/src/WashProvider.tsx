import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyTheme,
  readStoredMode,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  type ThemeChangeDetail,
  type ThemeMode,
  type WatercolorThemeId,
} from './theme'
import {
  applyBrush,
  readStoredBrush,
  BRUSH_CHANGE_EVENT,
  type BrushChangeDetail,
  type BrushState,
} from './brush'
import { attachGlobalRipple } from './lib/ripple'
import { attachSmartTooltips } from './lib/tooltipPlacement'

export type WashProviderProps = {
  children: ReactNode
  /** Initial pigment id. Defaults to stored or mineral. */
  defaultPigment?: WatercolorThemeId
  /** Initial paper mode. Defaults to stored or light. */
  defaultMode?: ThemeMode
  /** When true, installs document-level ripple and smart tooltip placement. Default true. */
  enableEffects?: boolean
  /** When true, restores and applies stored brush on mount. Default true. */
  enableBrush?: boolean
}

type WashContextValue = {
  pigment: WatercolorThemeId
  mode: ThemeMode
  brush: BrushState
  setPigment: (id: WatercolorThemeId) => void
  setMode: (mode: ThemeMode) => void
  setBrush: (partial: Partial<BrushState>) => void
}

const WashContext = createContext<WashContextValue | null>(null)

/**
 * Root provider for Wash UI. Applies pigment theme and optional brush load,
 * and wires document-level effects once.
 */
export function WashProvider({
  children,
  defaultPigment,
  defaultMode,
  enableEffects = true,
  enableBrush = true,
}: WashProviderProps) {
  const [pigment, setPigmentState] = useState<WatercolorThemeId>(
    () => defaultPigment ?? readStoredTheme(),
  )
  const [mode, setModeState] = useState<ThemeMode>(
    () => defaultMode ?? readStoredMode(),
  )
  const [brush, setBrushState] = useState<BrushState>(() => readStoredBrush())

  useEffect(() => {
    applyTheme(pigment, mode)
  }, [pigment, mode])

  useEffect(() => {
    if (!enableBrush) return
    applyBrush(brush)
  }, [enableBrush]) // eslint-disable-line react-hooks/exhaustive-deps -- boot once from state

  useEffect(() => {
    if (!enableEffects) return
    const detachRipple = attachGlobalRipple()
    const detachTips = attachSmartTooltips()
    return () => {
      detachRipple?.()
      detachTips?.()
    }
  }, [enableEffects])

  useEffect(() => {
    function onTheme(event: Event) {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail
      if (!detail) return
      setPigmentState(detail.pigment)
      setModeState(detail.mode)
    }
    function onBrush(event: Event) {
      const detail = (event as CustomEvent<BrushChangeDetail>).detail
      if (!detail) return
      setBrushState(detail)
    }
    window.addEventListener(THEME_CHANGE_EVENT, onTheme)
    window.addEventListener(BRUSH_CHANGE_EVENT, onBrush)
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, onTheme)
      window.removeEventListener(BRUSH_CHANGE_EVENT, onBrush)
    }
  }, [])

  const value = useMemo<WashContextValue>(
    () => ({
      pigment,
      mode,
      brush,
      setPigment: (id) => {
        setPigmentState(id)
        applyTheme(id, mode)
      },
      setMode: (next) => {
        setModeState(next)
        applyTheme(pigment, next)
      },
      setBrush: (partial) => {
        setBrushState(applyBrush(partial))
      },
    }),
    [pigment, mode, brush],
  )

  return <WashContext.Provider value={value}>{children}</WashContext.Provider>
}

export function useWash(): WashContextValue {
  const ctx = useContext(WashContext)
  if (!ctx) {
    throw new Error('useWash must be used within WashProvider')
  }
  return ctx
}

/** Optional hook: returns null outside provider (for demo shells). */
export function useWashOptional(): WashContextValue | null {
  return useContext(WashContext)
}
