import { useEffect, useId, useMemo, useState } from 'react'
import { Eye, MousePointerClick, Waves } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  brushCssVars,
  getBrushPreset,
  tipLabels,
  type BrushState,
  type TipShape,
} from './brushes'

type BrushShowcaseProps = {
  brush: BrushState
}

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

function AnimatedStroke({ brush }: { brush: BrushState }) {
  const { tip, size, hardness, opacity, flow, water } = brush
  const strokeKey = `${tip}-${size}-${hardness}-${opacity}-${flow}-${water}`
  const height = Math.max(10, Math.round(size * 0.9))
  const blur = Math.max(0, (100 - hardness) / 18)
  const alpha = opacity / 100
  const taper =
    tip === 'rigger' ? 0.28 : tip === 'flat' ? 1.55 : tip === 'mop' ? 2.1 : 1
  const mask = tipMask(tip)

  return (
    <div
      className="brush-showcase-stroke relative flex h-36 w-full items-center overflow-hidden rounded-box border border-ink-border/70 bg-base-200/50 px-4 md:h-44"
      aria-hidden="true"
    >
      <div className="brush-showcase-stroke__guide absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-ink-border/40" />
      <div
        key={strokeKey}
        className="brush-showcase-stroke__mark relative w-full"
        style={{
          height: `${height * taper}px`,
          opacity: Math.max(0.2, alpha),
          filter: `blur(${blur}px)`,
          borderRadius: tipRadius(tip),
          background:
            tip === 'mop'
              ? `radial-gradient(ellipse at center, color-mix(in oklab, var(--color-primary) ${48 + flow / 3}%, var(--color-secondary)) 0%, color-mix(in oklab, var(--color-primary) ${30 + water / 4}%, transparent) 55%, transparent 78%)`
              : `linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--color-primary) ${55 + flow / 3}%, var(--color-secondary)) 8%, color-mix(in oklab, var(--color-primary) ${45 + water / 2}%, transparent) 82%, transparent 100%)`,
          boxShadow:
            water > 40
              ? `0 0 ${12 + water / 6}px color-mix(in oklab, var(--color-primary) ${20 + water / 5}%, transparent)`
              : undefined,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  )
}

function TipSilhouette({ tip, size }: { tip: TipShape; size: number }) {
  const dim = Math.max(48, Math.min(120, Math.round(size * 2.4)))
  const mask = tipMask(tip)

  return (
    <div
      className="brush-showcase-tip flex flex-col items-center justify-center gap-2 rounded-box border border-ink-border/70 bg-base-100/70 p-4"
      aria-hidden="true"
    >
      <div
        className="brush-showcase-tip__blob"
        style={{
          width: tip === 'rigger' ? dim * 0.35 : tip === 'flat' ? dim * 1.15 : dim,
          height: tip === 'rigger' ? dim * 1.35 : tip === 'flat' ? dim * 0.45 : dim,
          borderRadius: tipRadius(tip),
          opacity: 'var(--brush-opacity)',
          filter: `blur(var(--brush-edge-soft))`,
          background:
            tip === 'mop'
              ? `radial-gradient(circle, color-mix(in oklab, var(--color-primary) 70%, transparent), transparent 72%)`
              : `color-mix(in oklab, var(--color-primary) 75%, var(--color-secondary))`,
          maskImage: mask,
          WebkitMaskImage: mask,
          boxShadow:
            '0 0 calc(8px + var(--brush-water) * 0.2px) color-mix(in oklab, var(--color-primary) 35%, transparent)',
        }}
      />
      <p className="label-ink text-center">{tipLabels[tip]} tip</p>
    </div>
  )
}

function WashBloomPanel() {
  return (
    <div
      className="brush-showcase-bloom paper-grain relative min-h-44 overflow-hidden rounded-box border border-ink-border/70 md:min-h-52"
      aria-hidden="true"
    >
      <span className="brush-showcase-bloom__a" />
      <span className="brush-showcase-bloom__b" />
      <span className="brush-showcase-bloom__c" />
      <div className="relative z-10 flex h-full min-h-44 flex-col justify-end p-4 md:min-h-52">
        <p className="font-display text-lg font-semibold text-base-content/90">
          Wash bloom
        </p>
        <p className="text-sm text-ink-muted">
          Water and flow swell the pigment pools. Hardness tightens the grain.
        </p>
      </div>
    </div>
  )
}

function RipplePlayground({ brush }: { brush: BrushState }) {
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    setClicks(0)
  }, [brush.id, brush.tip, brush.size])

  return (
    <button
      type="button"
      className="brush-showcase-ripple ripple ripple-primary relative flex min-h-44 w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-box border-2 border-dashed border-primary/50 bg-primary/10 p-6 text-center transition hover:bg-primary/15 md:min-h-52"
      aria-label="Ripple playground. Click to bloom a tip-shaped wash ripple."
      onClick={() => setClicks((n) => n + 1)}
    >
      <MousePointerClick className="size-8 text-primary" strokeWidth={1.75} />
      <div>
        <p className="font-display text-lg font-semibold">Ripple playground</p>
        <p className="mt-1 max-w-sm text-sm text-ink-muted">
          Click here. Ripple shape follows {tipLabels[brush.tip]}, scale{' '}
          {brush.size}px, water {brush.water}%.
        </p>
      </div>
      <span className="badge badge-soft badge-primary">
        {clicks === 0 ? 'Tap to bloom' : `${clicks} bloom${clicks === 1 ? '' : 's'}`}
      </span>
    </button>
  )
}

function CssVarReadouts({ brush }: { brush: BrushState }) {
  const vars = useMemo(() => brushCssVars(brush), [brush])
  const rows: { label: string; key: keyof typeof vars; hint: string }[] = [
    { label: 'Size', key: '--brush-size', hint: 'px desk' },
    { label: 'Hardness', key: '--brush-hardness', hint: '%' },
    { label: 'Opacity', key: '--brush-opacity', hint: '0-1' },
    { label: 'Flow', key: '--brush-flow', hint: '%' },
    { label: 'Water', key: '--brush-water', hint: '%' },
    { label: 'Edge soft', key: '--brush-edge-soft', hint: 'blur' },
    { label: 'Wash blur', key: '--brush-wash-blur', hint: 'bloom' },
    { label: 'Grain', key: '--brush-grain-opacity', hint: '0-1' },
    { label: 'Ripple ms', key: '--brush-ripple-duration', hint: 'duration' },
    { label: 'Ripple scale', key: '--brush-ripple-scale', hint: '×' },
    { label: 'Ripple radius', key: '--brush-ripple-radius', hint: 'tip' },
    { label: 'Soak ms', key: '--brush-soak-duration', hint: 'in' },
  ]

  return (
    <div className="rounded-box border border-ink-border/70 bg-base-100/70 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Waves className="size-4 text-secondary" strokeWidth={1.75} />
        <p className="text-sm font-medium">Live CSS variables</p>
      </div>
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {rows.map((row) => (
          <div
            key={row.key}
            className="rounded-lg border border-ink-border/50 bg-base-200/40 px-2.5 py-2"
          >
            <dt className="label-ink text-[0.65rem]">{row.label}</dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-primary">
              {vars[row.key]}
            </dd>
            <p className="font-mono text-[0.6rem] text-ink-muted">{row.hint}</p>
          </div>
        ))}
      </dl>
    </div>
  )
}

function CompareHint() {
  return (
    <div className="rounded-box border border-ink-border/60 bg-base-200/40 px-4 py-3 text-sm text-ink-muted">
      <p className="font-medium text-base-content">How to notice the change</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>
          <span className="text-base-content">Cloud mop</span>: huge soft bloom, max
          water, slow fat ripples
        </li>
        <li>
          <span className="text-base-content">Ochre scumble</span>: scratchy mask,
          hard edges, thin grainy ripples
        </li>
        <li>
          <span className="text-base-content">Needle rigger</span>: skinny hard
          stroke, tiny tip, tight ripples
        </li>
        <li>
          <span className="text-base-content">Archival ink</span>: dense opaque round,
          dry edges, crisp pressure
        </li>
      </ul>
    </div>
  )
}

/** High-visibility demos that exaggerate active brush CSS vars. */
export default function BrushShowcase({ brush }: BrushShowcaseProps) {
  const headingId = useId()
  const presetName = getBrushPreset(brush.id).name

  return (
    <section
      className="wash-panel paper-grain soak-in"
      aria-labelledby={headingId}
    >
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">00 · Live showcase</p>
        <h2
          id={headingId}
          className="font-display text-xl font-semibold md:text-2xl"
        >
          See the brush change
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Site washes are subtle on purpose. These panels exaggerate tip, size,
          water, and hardness so preset switches are obvious.
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-primary gap-1.5">
            <Eye className="size-3.5" strokeWidth={2} />
            {presetName}
          </span>
          <span className="badge badge-soft badge-secondary">
            {tipLabels[brush.tip]}
          </span>
          <span className="badge badge-soft badge-accent">{brush.size}px</span>
          <span className="badge badge-ghost border border-ink-border">
            H{brush.hardness} · O{brush.opacity} · F{brush.flow} · W{brush.water}
          </span>
        </div>

        <AnimatedStroke brush={brush} />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,1.4fr)]">
          <TipSilhouette tip={brush.tip} size={brush.size} />
          <WashBloomPanel />
          <RipplePlayground brush={brush} />
        </div>

        <CssVarReadouts brush={brush} />
        <CompareHint />
      </div>
    </section>
  )
}
