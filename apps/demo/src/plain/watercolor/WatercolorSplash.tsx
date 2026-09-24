import { useId, useMemo, type CSSProperties } from 'react'
import {
  generateSplashConfig,
  mergeSplashConfig,
  buildSplashSvgMarkup,
  type SplashVariant,
  type WatercolorSplashConfig,
} from '../lib/watercolorSplash'

export type WatercolorSplashProps = {
  /** @deprecated Use `colors` array instead */
  color?: string
  /** @deprecated Use `colors` array instead */
  secondaryColor?: string
  colors?: string[] | [string, string]
  opacity?: number
  blur?: number
  spread?: number
  rotation?: number
  seed?: number
  size?: number | string
  variant?: SplashVariant
  className?: string
  style?: CSSProperties
  title?: string
  'aria-hidden'?: boolean
}

function sizeValue(size: number | string | undefined, fallback: number) {
  if (size == null) return `${fallback}px`
  return typeof size === 'number' ? `${size}px` : size
}

export function WatercolorSplash({
  color,
  secondaryColor,
  colors,
  opacity,
  blur,
  spread,
  rotation,
  seed,
  size,
  variant,
  className = '',
  style,
  title,
  'aria-hidden': ariaHidden = true,
}: WatercolorSplashProps) {
  const reactId = useId().replace(/:/g, '')
  const config = useMemo<WatercolorSplashConfig>(() => {
    const base = generateSplashConfig(seed ?? 42)
    return mergeSplashConfig(base, {
      seed,
      color,
      secondaryColor,
      colors,
      opacity,
      blur,
      spread,
      rotation,
      size: typeof size === 'number' ? size : base.size,
      variant,
    })
  }, [
    blur,
    color,
    colors,
    opacity,
    rotation,
    secondaryColor,
    seed,
    size,
    spread,
    variant,
  ])

  const markup = useMemo(
    () =>
      buildSplashSvgMarkup(config).replace(
        /wash-splash-(filter|gradient)-/g,
        `wash-splash-$1-${reactId}-`,
      ),
    [config, reactId],
  )

  return (
    <span
      className={`inline-block max-w-full ${className}`.trim()}
      style={{
        width: sizeValue(size, config.size),
        height: sizeValue(size, config.size),
        ...style,
      }}
      role={ariaHidden ? undefined : 'img'}
      aria-hidden={ariaHidden ? true : undefined}
      aria-label={ariaHidden ? undefined : title}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export {
  generateSplashConfig,
  mergeSplashConfig,
  normalizeSplashColors,
  resolveSplashColors,
  themeSplashColors,
  splashToCss,
  splashToHtml,
  splashToReact,
  splashToSvg,
  splashVariantLabel,
  SPLASH_VARIANTS,
  DEFAULT_PRIMARY,
  DEFAULT_SECONDARY,
  DEFAULT_TERTIARY,
  DEFAULT_SPLASH_COLORS,
  MAX_SPLASH_COLORS,
  type SplashVariant,
  type WatercolorSplashConfig,
} from '../lib/watercolorSplash'

export default WatercolorSplash
