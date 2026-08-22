import { useCallback, useMemo, useState } from 'react'
import {
  generateSplashConfig,
  mergeSplashConfig,
  normalizeSplashColors,
  splashToCss,
  splashToHtml,
  splashToReact,
  splashToSvg,
  MAX_SPLASH_COLORS,
  type SplashVariant,
  type WatercolorSplashConfig,
  type WatercolorSplashPropsInput,
} from '../lib/watercolorSplash'

export type UseWatercolorSplashOptions = Partial<
  Omit<WatercolorSplashConfig, 'seed'>
> &
  Pick<
    WatercolorSplashPropsInput,
    'seed' | 'color' | 'primaryColor' | 'secondaryColor' | 'colors'
  >

export function useWatercolorSplash(initial?: UseWatercolorSplashOptions) {
  const [config, setConfig] = useState<WatercolorSplashConfig>(() =>
    mergeSplashConfig(generateSplashConfig(initial?.seed), initial),
  )

  const randomizeShape = useCallback((nextSeed?: number) => {
    setConfig((current) =>
      mergeSplashConfig(generateSplashConfig(nextSeed), current),
    )
  }, [])

  const update = useCallback((patch: Partial<WatercolorSplashConfig>) => {
    setConfig((current) => mergeSplashConfig(current, patch))
  }, [])

  const setVariant = useCallback((variant: SplashVariant) => {
    setConfig((current) => ({ ...current, variant }))
  }, [])

  const setColors = useCallback((colors: string[]) => {
    setConfig((current) => ({
      ...current,
      colors: normalizeSplashColors(colors),
    }))
  }, [])

  const addColor = useCallback((color?: string) => {
    setConfig((current) => {
      if (current.colors.length >= MAX_SPLASH_COLORS) return current
      const fallback =
        current.colors[current.colors.length - 1] ??
        current.colors[0] ??
        '#888888'
      return {
        ...current,
        colors: normalizeSplashColors([...current.colors, color ?? fallback]),
      }
    })
  }, [])

  const removeColor = useCallback((index: number) => {
    setConfig((current) => {
      if (current.colors.length <= 1) return current
      return {
        ...current,
        colors: current.colors.filter((_, colorIndex) => colorIndex !== index),
      }
    })
  }, [])

  const updateColorAt = useCallback((index: number, color: string) => {
    setConfig((current) => {
      if (index < 0 || index >= current.colors.length) return current
      const next = [...current.colors]
      next[index] = color
      return {
        ...current,
        colors: normalizeSplashColors(next),
      }
    })
  }, [])

  const exports = useMemo(
    () => ({
      svg: splashToSvg(config),
      css: splashToCss(config),
      html: splashToHtml(config),
      jsx: splashToReact(config),
    }),
    [config],
  )

  return {
    config,
    setConfig,
    update,
    setVariant,
    setColors,
    addColor,
    removeColor,
    updateColorAt,
    randomizeShape,
    exports,
    maxColors: MAX_SPLASH_COLORS,
  }
}

export default useWatercolorSplash
