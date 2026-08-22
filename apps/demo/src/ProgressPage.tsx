import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { Droplets, Palette } from 'menzies-design-wash-ui/icons'

const colors = [
  { name: 'Primary', className: 'progress-primary' },
  { name: 'Secondary', className: 'progress-secondary' },
  { name: 'Accent', className: 'progress-accent' },
  { name: 'Neutral', className: 'progress-neutral' },
  { name: 'Info', className: 'progress-info' },
  { name: 'Success', className: 'progress-success' },
  { name: 'Warning', className: 'progress-warning' },
  { name: 'Error', className: 'progress-error' },
] as const

const basicValues = [0, 10, 40, 70, 100] as const

const widths = [
  { name: 'Narrow', className: 'w-32' },
  { name: 'Medium', className: 'w-56' },
  { name: 'Wide', className: 'w-72' },
  { name: 'Full', className: 'w-full max-w-md' },
] as const

function Section({
  eyebrow,
  title,
  description,
  children,
  panel = '',
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  panel?: string
}) {
  return (
    <article className={`wash-panel paper-grain soak-in ${panel}`}>
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function Sample({
  label,
  children,
  align = 'start',
}: {
  label: string
  children: ReactNode
  align?: 'start' | 'center'
}) {
  return (
    <div
      className={`flex flex-col gap-2 ${align === 'center' ? 'items-center' : 'items-start'}`}
    >
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function InteractiveProgress() {
  const [value, setValue] = useState(42)

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <p className="font-medium">Pigment load</p>
        <span className="font-mono text-sm tabular-nums text-ink-muted">
          {value}%
        </span>
      </div>
      <progress
        className="progress progress-primary w-full"
        value={value}
        max={100}
        aria-label={`Pigment load ${value} percent`}
      />
      <label className="flex flex-col gap-2">
        <span className="label-ink">Range control</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="range range-primary range-sm cursor-pointer"
          aria-label="Set progress value"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {[0, 25, 50, 75, 100].map((n) => (
          <button
            key={n}
            type="button"
            className="btn btn-sm btn-ghost cursor-pointer"
            onClick={() => setValue(n)}
          >
            {n}%
          </button>
        ))}
      </div>
      <ClassLabel value="progress progress-primary + range" />
    </div>
  )
}

function StudioDryingPanel({
  title,
  description,
  colorClass,
  start,
  step,
  label,
}: {
  title: string
  description: string
  colorClass: string
  start: number
  step: number
  label: string
}) {
  const reducedMotion = usePrefersReducedMotion()
  const [value, setValue] = useState(start)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setValue((prev) => {
        const next = prev + step
        return next > 100 ? 0 : next
      })
    }, 800)
    return () => window.clearInterval(id)
  }, [reducedMotion, step])

  return (
    <div
      className="flex cursor-progress flex-col gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-5 py-6"
      role="status"
      aria-live="polite"
      aria-busy={value < 100}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold">{title}</p>
          <p className="mt-1 text-sm text-ink-muted">{description}</p>
        </div>
        <span className="shrink-0 font-mono text-sm tabular-nums text-ink-muted">
          {value}%
        </span>
      </div>
      <progress
        className={`progress ${colorClass} w-full`}
        value={value}
        max={100}
        aria-label={`${title} ${value} percent`}
      />
      <ClassLabel value={label} />
    </div>
  )
}

function RadialSample({
  value,
  className = '',
  size,
  thickness,
  label,
}: {
  value: number
  className?: string
  size?: string
  thickness?: string
  label: string
}) {
  const style = {
    '--value': value,
    ...(size ? { '--size': size } : {}),
    ...(thickness ? { '--thickness': thickness } : {}),
  } as CSSProperties

  return (
    <Sample label={label} align="center">
      <div
        className={`radial-progress ${className}`}
        style={style}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {value}%
      </div>
    </Sample>
  )
}

export default function ProgressPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Progress
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">progress</span> bars for
          wash drying and pigment load. Value-based, indeterminate, colors, and
          a related radial section. Studio demos pause when{' '}
          <span className="font-mono text-xs">prefers-reduced-motion</span> is
          set.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Value and indeterminate"
          description="Set value and max for determinate bars. Omit value for indeterminate motion."
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="label-ink">Determinate</p>
              <div className="flex flex-col gap-3">
                {basicValues.map((v) => (
                  <Sample key={v} label={`progress · value=${v}`}>
                    <progress
                      className="progress w-full max-w-md"
                      value={v}
                      max={100}
                      aria-label={`Progress ${v} percent`}
                    />
                  </Sample>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="label-ink">Indeterminate</p>
              <Sample label="progress (no value)">
                <progress
                  className="progress w-full max-w-md"
                  aria-label="Indeterminate progress"
                />
              </Sample>
              <p className="text-sm text-ink-muted">
                Indeterminate bars animate in supporting browsers. Respect
                system reduced-motion settings when shipping live studio flows.
              </p>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="progress-primary through progress-error, plus neutral."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {colors.map((c) => (
              <Sample key={c.name} label={`progress ${c.className}`}>
                <div className="flex w-full flex-col gap-1.5">
                  <span className="text-sm font-medium">{c.name}</span>
                  <progress
                    className={`progress ${c.className} w-full`}
                    value={70}
                    max={100}
                    aria-label={`${c.name} progress 70 percent`}
                  />
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Widths"
          title="Width scale"
          description="daisyUI progress has no size modifiers. Control width with Tailwind utilities."
        >
          <div className="flex flex-col gap-5">
            {widths.map((w) => (
              <Sample
                key={w.name}
                label={`progress progress-primary ${w.className}`}
              >
                <div className="flex w-full flex-col gap-1.5">
                  <span className="text-sm font-medium">{w.name}</span>
                  <progress
                    className={`progress progress-primary ${w.className}`}
                    value={55}
                    max={100}
                    aria-label={`${w.name} progress`}
                  />
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Interactive"
          title="Controlled value"
          description="Drive the bar with a range slider and quick presets."
          panel="wash-panel-rose"
        >
          <InteractiveProgress />
        </Section>

        <Section
          eyebrow="05 · Radial"
          title="Related radial progress"
          description="Circular companion using --value, optional --size and --thickness."
        >
          <div className="flex flex-col gap-8">
            <div>
              <p className="label-ink mb-4">Values</p>
              <div className="flex flex-wrap gap-6">
                {[0, 20, 60, 80, 100].map((v) => (
                  <RadialSample
                    key={v}
                    value={v}
                    label={`radial-progress --value:${v}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="label-ink mb-4">Colors and chrome</p>
              <div className="flex flex-wrap gap-6">
                <RadialSample
                  value={70}
                  className="text-primary"
                  label="radial-progress text-primary"
                />
                <RadialSample
                  value={70}
                  className="bg-primary text-primary-content border-4 border-primary"
                  label="radial-progress + bg + border"
                />
                <RadialSample
                  value={70}
                  className="text-secondary"
                  size="4rem"
                  thickness="4px"
                  label="--size:4rem --thickness:4px"
                />
                <RadialSample
                  value={70}
                  className="text-accent"
                  size="6rem"
                  thickness="8px"
                  label="--size:6rem --thickness:8px"
                />
              </div>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Wash drying panels"
          description="Pigment load and wash settle meters for studio busy states. Auto-advance pauses under reduced motion."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <StudioDryingPanel
              title="Wash drying"
              description="Soft edges are settling. Leave the plate undisturbed."
              colorClass="progress-primary"
              start={18}
              step={7}
              label="progress progress-primary"
            />
            <StudioDryingPanel
              title="Pigment load"
              description="Blending ultramarine and ochre for the next glaze."
              colorClass="progress-secondary"
              start={34}
              step={5}
              label="progress progress-secondary"
            />
            <div className="flex flex-col gap-3 rounded-box border border-ink-border/60 bg-wash-blue/25 px-5 py-6 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <Droplets
                  className="size-5 text-info"
                  strokeWidth={2}
                  aria-hidden
                />
                <p className="font-display text-lg font-semibold">Series sync</p>
              </div>
              <p className="text-sm text-ink-muted">
                Pulling the latest plates into your studio shelf.
              </p>
              <progress
                className="progress progress-info w-full"
                value={88}
                max={100}
                aria-label="Series sync 88 percent"
              />
              <ClassLabel value="progress progress-info · value=88" />
            </div>
            <div className="flex flex-col items-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/20 px-5 py-6 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <Palette
                  className="size-5 text-accent"
                  strokeWidth={2}
                  aria-hidden
                />
                <p className="font-display text-lg font-semibold">Glaze round</p>
              </div>
              <div
                className="radial-progress text-accent"
                style={
                  {
                    '--value': 62,
                    '--size': '5.5rem',
                  } as CSSProperties
                }
                role="progressbar"
                aria-valuenow={62}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                62%
              </div>
              <p className="text-center text-sm text-ink-muted">
                Second glaze layer at sixty-two percent opacity.
              </p>
              <ClassLabel value="radial-progress text-accent" />
            </div>
          </div>
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Adaptive progress rows"
          description="Stacked on mobile, side by side from md up."
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
            <div className="flex flex-1 flex-col gap-2 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">Thumbnail bake</p>
                <span className="font-mono text-xs tabular-nums text-ink-muted">
                  45%
                </span>
              </div>
              <progress
                className="progress progress-warning w-full"
                value={45}
                max={100}
                aria-label="Thumbnail bake 45 percent"
              />
              <p className="text-sm text-ink-muted">
                Compressing preview for the shelf grid.
              </p>
              <ClassLabel value="progress progress-warning" />
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">Cloud archive</p>
                <span className="font-mono text-xs tabular-nums text-ink-muted">
                  92%
                </span>
              </div>
              <progress
                className="progress progress-success w-full"
                value={92}
                max={100}
                aria-label="Cloud archive 92 percent"
              />
              <p className="text-sm text-ink-muted">
                Uploading high-res scan in the background.
              </p>
              <ClassLabel value="progress progress-success" />
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
