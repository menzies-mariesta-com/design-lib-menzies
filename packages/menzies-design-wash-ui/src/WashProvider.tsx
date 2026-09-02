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
}

type WashContextValue = {
  pigment: WatercolorThemeId
  mode: ThemeMode
  setPigment: (id: WatercolorThemeId) => void
  setMode: (mode: ThemeMode) => void
}

const WashContext = createContext<WashContextValue | null>(null)

/**
 * Root provider for Wash UI. Applies pigment theme and wires document-level effects once.
 */
export function WashProvider({
  children,
  defaultPigment,
  defaultMode,
  enableEffects = true,
}: WashProviderProps) {
  const [pigment, setPigmentState] = useState<WatercolorThemeId>(
    () => defaultPigment ?? readStoredTheme(),
  )
  const [mode, setModeState] = useState<ThemeMode>(
    () => defaultMode ?? readStoredMode(),
  )

  useEffect(() => {
    applyTheme(pigment, mode)
  }, [pigment, mode])

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
    window.addEventListener(THEME_CHANGE_EVENT, onTheme)
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, onTheme)
    }
  }, [])

  const value = useMemo<WashContextValue>(
    () => ({
      pigment,
      mode,
      setPigment: (id) => {
        setPigmentState(id)
        applyTheme(id, mode)
      },
      setMode: (next) => {
        setModeState(next)
        applyTheme(pigment, next)
      },
    }),
    [pigment, mode],
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
