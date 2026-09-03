import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  Check,
  Copy,
  Droplets,
  Palette,
  Plus,
  RotateCw,
  Sparkles,
  Trash2,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  ColorPickerWheel,
  WatercolorSplash,
  useWatercolorSplash,
  SPLASH_VARIANTS,
  splashToCss,
  splashToHtml,
  splashToReact,
  splashToSvg,
  splashVariantLabel,
  themeSplashColors,
  type SplashVariant,
} from '@menzies-mariesta-com/menzies-design-wash-ui/react'
import {
  applyTheme,
  readStoredMode,
  watercolorThemes,
  type WatercolorThemeId,
} from './themes'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const variants = SPLASH_VARIANTS.map((id) => ({
  id,
  label: splashVariantLabel(id),
}))

function variantSeed(id: SplashVariant) {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  return 200 + (hash % 9000)
}

function ShapeGallery({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? 'grid max-h-52 grid-cols-4 gap-1.5 overflow-y-auto sm:grid-cols-5'
          : 'grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8'
      }
    >
      {variants.map((item) => (
        <div
          key={item.id}
          className={`rounded-box border border-ink-border/60 bg-base-100/60 text-center ${compact ? 'p-1.5' : 'p-3'}`}
        >
          <WatercolorSplash
            variant={item.id}
            seed={variantSeed(item.id)}
            size={compact ? 44 : 72}
            opacity={0.82}
            blur={12}
            className="mx-auto"
          />
          <p
            className={`mt-1 truncate font-medium ${compact ? 'text-[0.65rem]' : 'text-xs'}`}
          >
            {item.label}
          </p>
          {!compact ? (
            <code className="font-mono text-[0.6rem] text-ink-muted">{item.id}</code>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function ShapePicker({
  value,
  onChange,
}: {
  value: SplashVariant
  onChange: (variant: SplashVariant) => void
}) {
  return (
    <div
      className="grid max-h-52 grid-cols-4 gap-1.5 overflow-y-auto sm:grid-cols-5"
      role="listbox"
      aria-label="Splash shape variants"
    >
      {variants.map((item) => {
        const selected = item.id === value
        return (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={selected}
            className={`cursor-pointer rounded-box border p-1.5 text-left transition-colors ${
              selected
                ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
                : 'border-ink-border/60 bg-base-100/60 hover:border-primary/40 hover:bg-base-200/60'
            }`}
            onClick={() => onChange(item.id)}
          >
            <WatercolorSplash
              variant={item.id}
              seed={variantSeed(item.id)}
              size={44}
              opacity={0.82}
              blur={12}
              className="mx-auto"
            />
            <span className="mt-1 block truncate text-center text-[0.65rem] font-medium">
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function ControlField({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <label className="form-control w-full cursor-default" htmlFor={htmlFor}>
      <span className="label py-1">
        <span className="label-text text-sm">{label}</span>
      </span>
      {children}
    </label>
  )
}

function CopyButton({
  label,
  value,
  className = 'btn-secondary',
}: {
  label: string
  value: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable in some contexts.
    }
  }

  return (
    <div className={`tooltip tooltip-${className.replace('btn-', '')}`} data-tip={copied ? 'Copied' : label}>
      <button
        type="button"
        className={`btn btn-sm ${className} cursor-pointer`}
        aria-label={copied ? 'Copied' : label}
        onClick={() => void copy()}
      >
        {copied ? (
          <Check className="size-4" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Copy className="size-4" strokeWidth={1.75} aria-hidden="true" />
        )}
        <span className="hidden sm:inline">{label}</span>
      </button>
    </div>
  )
}

const DEFAULT_CUSTOM_COLORS = ['#276c8e', '#b87524']

const SPLASH_COLOR_DEFAULTS = [
  '#276c8e',
  '#b87524',
  '#8e4a6b',
  '#3d7a5c',
  '#5c4a8e',
  '#8e6b27',
  '#2f6f8f',
  '#9a4d3a',
] as const

function isHexColor(value: string) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim())
}

function normalizeHexInput(value: string) {
  const trimmed = value.trim()
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    return trimmed.toLowerCase()
  }
  return null
}

function nextSplashColor(colors: string[], index: number) {
  const last = colors[colors.length - 1]
  if (last && isHexColor(last)) {
    return last
  }
  return SPLASH_COLOR_DEFAULTS[index % SPLASH_COLOR_DEFAULTS.length] ?? '#888888'
}

function PlaygroundStudio() {
  const {
    config,
    update,
    randomizeShape,
    addColor,
    removeColor,
    updateColorAt,
    maxColors,
  } = useWatercolorSplash({
    seed: 1284,
    variant: 'blob',
    opacity: 0.72,
    blur: 18,
    spread: 1.05,
    rotation: 12,
    size: 280,
    colors: DEFAULT_CUSTOM_COLORS,
  })

  const [useThemeColors, setUseThemeColors] = useState(false)
  const [composite, setComposite] = useState(true)
  const secondarySeed = config.seed + 913

  const activeColors = useMemo(
    () =>
      useThemeColors ? themeSplashColors(config.colors.length) : config.colors,
    [config.colors, useThemeColors],
  )

  const activeConfig = useMemo(
    () => ({
      ...config,
      colors: activeColors,
    }),
    [activeColors, config],
  )

  const exportSnippets = useMemo(
    () => ({
      css: splashToCss(activeConfig),
      svg: splashToSvg(activeConfig),
      html: splashToHtml(activeConfig),
      jsx: splashToReact(activeConfig),
    }),
    [activeConfig],
  )

  const randomizeTheme = useCallback(() => {
    const theme =
      watercolorThemes[Math.floor(Math.random() * watercolorThemes.length)]
    if (theme) applyTheme(theme.id as WatercolorThemeId, readStoredMode())
    setUseThemeColors(true)
  }, [])

  const applyCustomColor = useCallback(
    (index: number, value: string) => {
      const normalized = normalizeHexInput(value)
      if (!normalized) return
      setUseThemeColors(false)
      updateColorAt(index, normalized)
    },
    [updateColorAt],
  )

  const handleAddColor = useCallback(() => {
    const nextIndex = config.colors.length
    if (nextIndex >= maxColors) return
    const nextColor = nextSplashColor(config.colors, nextIndex)
    addColor(nextColor)
    setUseThemeColors(false)
  }, [addColor, config.colors, maxColors])

  const handleRemoveColor = useCallback(
    (index: number) => {
      removeColor(index)
      setUseThemeColors(false)
    },
    [removeColor],
  )

  const preview = (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex min-h-72 flex-col overflow-hidden rounded-box border border-ink-border/70 bg-base-200/80 p-4 sm:p-6">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-ink-muted">
          Preview stage
        </p>
        <div className="relative flex min-h-60 flex-1 items-center justify-center rounded-box bg-base-100/90">
          <WatercolorSplash
            seed={activeConfig.seed}
            variant={activeConfig.variant}
            colors={activeConfig.colors}
            opacity={activeConfig.opacity}
            blur={activeConfig.blur}
            spread={activeConfig.spread}
            rotation={activeConfig.rotation}
            size={activeConfig.size}
            className="relative z-10"
          />
          {composite ? (
            <WatercolorSplash
              seed={secondarySeed}
              variant="splash"
              colors={[...activeConfig.colors].reverse()}
              opacity={activeConfig.opacity * 0.55}
              blur={activeConfig.blur * 1.15}
              spread={activeConfig.spread * 0.85}
              rotation={activeConfig.rotation + 48}
              size={activeConfig.size * 0.72}
              className="absolute z-0 translate-x-8 translate-y-6"
            />
          ) : null}
        </div>
        <p className="mt-4 text-center text-xs text-ink-muted">
          Only your splash settings render here. Section chrome keeps Wash panel
          decoration.
        </p>
      </div>

      <div className="space-y-3 rounded-box border border-ink-border/70 bg-base-100/70 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          Controls
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-primary btn-sm cursor-pointer"
            onClick={randomizeTheme}
          >
            <Palette className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Randomize theme
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm cursor-pointer"
            onClick={() => randomizeShape()}
          >
            <RotateCw className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Randomize shape
          </button>
          <button
            type="button"
            className="btn btn-accent btn-sm cursor-pointer"
            onClick={() => {
              randomizeTheme()
              randomizeShape()
            }}
          >
            <Sparkles className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Randomize all
          </button>
        </div>

        <div className="form-control w-full">
          <span className="label py-1">
            <span className="label-text text-sm">Shape ({config.variant})</span>
          </span>
          <ShapePicker
            value={config.variant}
            onChange={(variant) => update({ variant })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="label-text text-sm">
              Colors ({config.colors.length}/{maxColors})
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-xs cursor-pointer"
              disabled={config.colors.length >= maxColors}
              onClick={handleAddColor}
            >
              <Plus className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
              Add color
            </button>
          </div>
          <div className="space-y-4">
            {config.colors.map((hex, index) => (
              <div
                key={`splash-color-${index}`}
                className="rounded-box border border-ink-border/60 bg-base-100/50 p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="label-text text-sm font-medium">
                    Color {index + 1}
                  </span>
                  <div
                    className="tooltip tooltip-right tooltip-error shrink-0"
                    data-tip={
                      config.colors.length <= 1 ? 'Keep at least one color' : 'Remove color'
                    }
                  >
                    <button
                      type="button"
                      className="btn btn-square btn-ghost btn-xs cursor-pointer text-error disabled:cursor-not-allowed"
                      aria-label={`Remove color ${index + 1}`}
                      disabled={config.colors.length <= 1}
                      onClick={() => handleRemoveColor(index)}
                    >
                      <Trash2 className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end">
                  <ColorPickerWheel
                    value={isHexColor(hex) ? normalizeHexInput(hex) ?? hex : '#888888'}
                    onChange={(next) => applyCustomColor(index, next)}
                    size={132}
                    showSwatch={false}
                    showHexInput={false}
                    aria-label={`Pick color ${index + 1}`}
                    className="shrink-0"
                  />
                  <ControlField label="Hex" htmlFor={`splash-color-${index}`}>
                    <input
                      id={`splash-color-${index}`}
                      type="text"
                      className="input input-bordered input-sm w-full font-mono cursor-text"
                      value={hex}
                      spellCheck={false}
                      aria-label={`Hex value for color ${index + 1}`}
                      onChange={(event) => {
                        const next = event.target.value
                        setUseThemeColors(false)
                        const copy = [...config.colors]
                        copy[index] = next
                        update({ colors: copy })
                      }}
                      onBlur={(event) => {
                        const normalized = normalizeHexInput(event.target.value)
                        if (normalized) {
                          applyCustomColor(index, normalized)
                          return
                        }
                        updateColorAt(index, nextSplashColor([], index))
                      }}
                    />
                  </ControlField>
                  <span
                    className="hidden size-10 shrink-0 rounded-box border border-ink-border shadow-sm sm:block"
                    style={{
                      backgroundColor: isHexColor(hex)
                        ? normalizeHexInput(hex) ?? hex
                        : '#888888',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <label className="label cursor-pointer justify-start gap-3 py-1">
          <input
            type="checkbox"
            className="checkbox checkbox-sm cursor-pointer"
            checked={useThemeColors}
            onChange={(event) => setUseThemeColors(event.target.checked)}
          />
          <span className="label-text text-sm">
            Preview with Wash pigment CSS vars (--wash-a, --wash-b, --wash-c)
          </span>
        </label>
        {useThemeColors ? (
          <p className="text-xs text-ink-muted">
            Preview follows the active theme vars for {config.colors.length} slot
            {config.colors.length === 1 ? '' : 's'}. Pick or type a hex value to
            switch back to custom colors.
          </p>
        ) : (
          <p className="text-xs text-ink-muted">
            Preview uses your hex values. Exported snippets include the colors
            array below.
          </p>
        )}

        <ControlField label={`Opacity (${Math.round(activeConfig.opacity * 100)}%)`} htmlFor="splash-opacity">
          <input
            id="splash-opacity"
            type="range"
            min={0.2}
            max={1}
            step={0.01}
            className="range range-primary range-sm w-full cursor-pointer"
            value={activeConfig.opacity}
            onChange={(event) => update({ opacity: Number(event.target.value) })}
          />
        </ControlField>

        <ControlField label={`Blur (${activeConfig.blur.toFixed(0)}px)`} htmlFor="splash-blur">
          <input
            id="splash-blur"
            type="range"
            min={0}
            max={40}
            step={1}
            className="range range-secondary range-sm w-full cursor-pointer"
            value={activeConfig.blur}
            onChange={(event) => update({ blur: Number(event.target.value) })}
          />
        </ControlField>

        <ControlField label={`Scale (${activeConfig.spread.toFixed(2)})`} htmlFor="splash-spread">
          <input
            id="splash-spread"
            type="range"
            min={0.6}
            max={1.6}
            step={0.01}
            className="range range-accent range-sm w-full cursor-pointer"
            value={activeConfig.spread}
            onChange={(event) => update({ spread: Number(event.target.value) })}
          />
        </ControlField>

        <ControlField label={`Rotation (${activeConfig.rotation}°)`} htmlFor="splash-rotation">
          <input
            id="splash-rotation"
            type="range"
            min={0}
            max={360}
            step={1}
            className="range range-neutral range-sm w-full cursor-pointer"
            value={activeConfig.rotation}
            onChange={(event) => update({ rotation: Number(event.target.value) })}
          />
        </ControlField>

        <ControlField label={`Size (${Math.round(activeConfig.size)}px)`} htmlFor="splash-size">
          <input
            id="splash-size"
            type="range"
            min={120}
            max={420}
            step={4}
            className="range range-info range-sm w-full cursor-pointer"
            value={activeConfig.size}
            onChange={(event) => update({ size: Number(event.target.value) })}
          />
        </ControlField>

        <label className="label cursor-pointer justify-start gap-3 py-1">
          <input
            type="checkbox"
            className="checkbox checkbox-sm cursor-pointer"
            checked={composite}
            onChange={(event) => setComposite(event.target.checked)}
          />
          <span className="label-text text-sm">Composite second splash</span>
        </label>

        <div className="flex flex-wrap gap-2 border-t border-ink-border/60 pt-3">
          <CopyButton label="Copy CSS" value={exportSnippets.css} className="btn-secondary" />
          <CopyButton label="Copy SVG" value={exportSnippets.svg} className="btn-primary" />
          <CopyButton label="Copy JSX" value={exportSnippets.jsx} className="btn-accent" />
        </div>
      </div>
    </div>
  )

  const jsxSnippet = useMemo(() => {
    const colorProp = useThemeColors
      ? null
      : `      colors={[${activeConfig.colors.map((color) => `"${color}"`).join(', ')}]}`
    const lines = [
      "import { WatercolorSplash } from '@menzies-mariesta-com/menzies-design-wash-ui/react'",
      '',
      'export function HeroSplash() {',
      '  return (',
      '    <WatercolorSplash',
      `      seed={${activeConfig.seed}}`,
      `      variant="${activeConfig.variant}"`,
      colorProp,
      `      opacity={${activeConfig.opacity.toFixed(2)}}`,
      `      blur={${activeConfig.blur.toFixed(1)}}`,
      `      spread={${activeConfig.spread.toFixed(2)}}`,
      `      rotation={${activeConfig.rotation}}`,
      `      size={${Math.round(activeConfig.size)}}`,
      '    />',
      '  )',
      '}',
    ]
    return lines.filter(Boolean).join('\n')
  }, [activeConfig, useThemeColors])

  const htmlSnippet = useMemo(() => exportSnippets.html, [exportSnippets.html])

  return (
    <ShowcaseTabs preview={preview} html={htmlSnippet} jsx={jsxSnippet} />
  )
}

export default function WatercolorPlaygroundPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Watercolor playground
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Shape organic paint splashes with reproducible seeds, tune pigment and
          atmosphere, then copy SVG, CSS, or React markup for cards, heroes, and
          empty states.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Studio"
          title="Paint splash playground"
          description="Randomize Wash themes, then export the splash"
          panel="wash-panel-ochre"
        >
          <PlaygroundStudio />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Variants"
          title="Splash shapes"
          description="Forty procedural shape variants share the same pigment vars"
        >
          <ShapeGallery />
          <p className="mt-4 text-center text-xs text-ink-muted">
            Browse all {SPLASH_VARIANTS.length} shapes above. Pick one in the studio
            controls or pass <code className="font-mono">variant="."</code> in code.
          </p>
        </GallerySection>

        <GallerySection
          eyebrow="03 · Usage"
          title="Drop-in pigment splashes"
          description="Omit color props to inherit --wash-a and --wash-b from the active"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <article className="card border border-ink-border bg-base-100">
              <div className="relative overflow-hidden p-6">
                <WatercolorSplash
                  className="pointer-events-none absolute -right-6 -top-8 opacity-90"
                  variant="wash"
                  seed={902}
                  size={180}
                />
                <Droplets
                  className="relative z-10 size-8 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="card-title relative z-10 mt-3 text-primary font-bold">
                  Card accent
                </h3>
                <p className="relative z-10 mt-1 text-sm text-ink-muted">
                  Position splashes behind content with absolute layout.
                </p>
              </div>
            </article>

            <article className="wash-panel flex min-h-40 items-center justify-center p-6">
              <WatercolorSplash variant="ring" seed={441} size={160} spread={1.2} />
            </article>

            <article className="wash-panel flex min-h-40 items-center justify-center gap-2 p-6">
              <WatercolorSplash variant="splash" seed={77} size={100} rotation={-18} />
              <WatercolorSplash variant="blob" seed={188} size={130} rotation={24} opacity={0.62} />
            </article>
          </div>
        </GallerySection>
      </div>
    </>
  )
}
