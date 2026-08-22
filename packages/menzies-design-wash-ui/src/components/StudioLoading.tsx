import { useEffect, useState, type CSSProperties } from 'react'
import {
  BRUSH_CHANGE_EVENT,
  getBrushPreset,
  readStoredBrush,
  tipLabels,
  type BrushChangeDetail,
  type BrushState,
  type TipShape,
} from '../brush'

function tipRadius(tip: TipShape): string {
  if (tip === 'flat') return '4px'
  if (tip === 'rigger') return '999px'
  if (tip === 'fan') return '40% 60%'
  if (tip === 'dry') return '42%'
  if (tip === 'mop') return '50%'
  return '40%'
}

function tipMask(tip: TipShape): string | undefined {
  if (tip === 'dry') {
    return 'repeating-linear-gradient(90deg, #000 0 3px, transparent 3px 7px)'
  }
  if (tip === 'fan') {
    return 'repeating-linear-gradient(18deg, #000 0 4px, transparent 4px 9px)'
  }
  return undefined
}

type LoaderChrome = {
  /** When true, omit status role (parent already announces busy). */
  decorative?: boolean
  label?: string
}

/** Subscribe to BrushSwitcher / desk brush changes. */
export function useActiveBrush(): BrushState {
  const [brush, setBrush] = useState<BrushState>(() => readStoredBrush())

  useEffect(() => {
    setBrush(readStoredBrush())

    function onBrushChange(event: Event) {
      const detail = (event as CustomEvent<BrushChangeDetail>).detail
      if (!detail) return
      setBrush(detail)
    }

    window.addEventListener(BRUSH_CHANGE_EVENT, onBrushChange)
    return () => window.removeEventListener(BRUSH_CHANGE_EVENT, onBrushChange)
  }, [])

  return brush
}

/** Favicon-style pigment mark (wash circles), not a third-party brand glyph. */
export function PigmentMark({
  className = '',
  size = 48,
}: {
  className?: string
  size?: number
}) {
  return (
    <svg
      className={`studio-load-mark ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="studio-load-mark__a"
        cx="14"
        cy="16"
        r="10"
        fill="var(--color-primary)"
        opacity="0.4"
      />
      <circle
        className="studio-load-mark__b"
        cx="20"
        cy="14"
        r="8"
        fill="var(--color-secondary)"
        opacity="0.32"
      />
      <circle
        className="studio-load-mark__c"
        cx="16"
        cy="20"
        r="7"
        fill="var(--color-accent)"
        opacity="0.28"
      />
      <circle
        className="studio-load-mark__core"
        cx="12"
        cy="12"
        r="3"
        fill="var(--color-primary)"
        opacity="0.7"
      />
    </svg>
  )
}

/** Sweeping stroke that loops; size / opacity / water follow the active brush. */
export function BrushStrokeLoader({
  brush,
  label = 'Brush stroke loading',
  decorative = false,
  className = '',
}: {
  brush: BrushState
  className?: string
} & LoaderChrome) {
  const { tip, size, hardness, opacity, flow, water } = brush
  const height = Math.max(8, Math.round(size * 0.55))
  const blur = Math.max(0, (100 - hardness) / 22)
  const alpha = opacity / 100
  const taper =
    tip === 'rigger' ? 0.28 : tip === 'flat' ? 1.45 : tip === 'mop' ? 1.9 : 1
  const mask = tipMask(tip)
  const duration = `calc(1.1s + (var(--brush-water, 45) * 0.012s))`

  return (
    <div
      className={`studio-load-stroke relative flex h-14 w-full max-w-xs items-center overflow-hidden sm:h-16 ${className}`}
      role={decorative ? undefined : 'status'}
      aria-label={decorative ? undefined : label}
      aria-busy={decorative ? undefined : true}
      aria-hidden={decorative || undefined}
    >
      <span
        className="studio-load-stroke__mark"
        style={{
          height: `${height * taper}px`,
          opacity: Math.max(0.25, alpha),
          filter: `blur(${blur}px)`,
          borderRadius: tipRadius(tip),
          animationDuration: duration,
          background:
            tip === 'mop'
              ? `radial-gradient(ellipse at center, color-mix(in oklab, var(--color-primary) ${48 + flow / 3}%, var(--color-secondary)) 0%, color-mix(in oklab, var(--color-primary) ${30 + water / 4}%, transparent) 55%, transparent 78%)`
              : `linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--color-primary) ${55 + flow / 3}%, var(--color-secondary)) 8%, color-mix(in oklab, var(--color-primary) ${45 + water / 2}%, transparent) 82%, transparent 100%)`,
          boxShadow:
            water > 40
              ? `0 0 ${10 + water / 8}px color-mix(in oklab, var(--color-primary) ${18 + water / 6}%, transparent)`
              : undefined,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  )
}

/** Soft tip blob that breathes with brush desk vars. */
export function BrushTipLoader({
  brush,
  label = 'Brush tip loading',
  decorative = false,
  className = '',
}: {
  brush: BrushState
  className?: string
} & LoaderChrome) {
  const dim = Math.max(36, Math.min(88, Math.round(brush.size * 1.85)))
  const mask = tipMask(brush.tip)

  return (
    <div
      className={`studio-load-tip flex items-center justify-center ${className}`}
      role={decorative ? undefined : 'status'}
      aria-label={decorative ? undefined : label}
      aria-busy={decorative ? undefined : true}
      aria-hidden={decorative || undefined}
      style={
        {
          '--tip-w':
            brush.tip === 'rigger'
              ? `${dim * 0.32}px`
              : brush.tip === 'flat'
                ? `${dim * 1.1}px`
                : `${dim}px`,
          '--tip-h':
            brush.tip === 'rigger'
              ? `${dim * 1.25}px`
              : brush.tip === 'flat'
                ? `${dim * 0.42}px`
                : `${dim}px`,
        } as CSSProperties
      }
    >
      <span
        className="studio-load-tip__blob"
        style={{
          borderRadius: tipRadius(brush.tip),
          maskImage: mask,
          WebkitMaskImage: mask,
          background:
            brush.tip === 'mop'
              ? `radial-gradient(circle, color-mix(in oklab, var(--color-primary) 72%, transparent), transparent 72%)`
              : `color-mix(in oklab, var(--color-primary) 78%, var(--color-secondary))`,
        }}
      />
    </div>
  )
}

/** Pigment droplet + wash bloom pulse using theme wash tokens. */
export function PigmentBloomLoader({
  label = 'Pigment bloom loading',
  decorative = false,
  className = '',
}: {
  className?: string
} & LoaderChrome) {
  return (
    <div
      className={`studio-load-bloom relative size-24 overflow-hidden rounded-full sm:size-28 ${className}`}
      role={decorative ? undefined : 'status'}
      aria-label={decorative ? undefined : label}
      aria-busy={decorative ? undefined : true}
      aria-hidden={decorative || undefined}
    >
      <span className="studio-load-bloom__a" />
      <span className="studio-load-bloom__b" />
      <span className="studio-load-bloom__c" />
      <span className="studio-load-bloom__drop" />
    </div>
  )
}

/** Wordmark ink-fill soak with pigment mark. */
export function InkWordmarkLoader({
  label = `${'Menzies Design'} logo loading`,
  decorative = false,
  className = '',
}: {
  className?: string
} & LoaderChrome) {
  return (
    <div
      className={`studio-load-ink flex flex-col items-center gap-3 ${className}`}
      role={decorative ? undefined : 'status'}
      aria-label={decorative ? undefined : label}
      aria-busy={decorative ? undefined : true}
      aria-hidden={decorative || undefined}
    >
      <PigmentMark size={56} />
      <p className="studio-load-ink__word font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {'Menzies Design'}
      </p>
      <p className="label-ink">Ink soaking in</p>
    </div>
  )
}

/** Compact badge row for active brush feedback on loading demos. */
export function ActiveBrushBadge({ brush }: { brush: BrushState }) {
  const preset = getBrushPreset(brush.id)
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="badge badge-primary badge-soft">{preset.name}</span>
      <span className="badge badge-ghost border border-ink-border">
        {tipLabels[brush.tip]} · {brush.size}px
      </span>
      <span className="badge badge-ghost border border-ink-border">
        O{brush.opacity} · W{brush.water}
      </span>
    </div>
  )
}
