import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { Droplets, Palette } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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

const svgDroplets =
  '<svg class="size-5 text-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-4-7-11-7-11S5 11 5 15a7 7 0 0 0 7 7z"/></svg>'
const svgPalette =
  '<svg class="size-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>'

function toJsx(html: string): string {
  return daisyToJsx(html)
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/\svalue="(\d+)"/g, ' value={$1}')
    .replace(/\smax="100"/g, ' max={100}')
    .replace(/aria-valuenow="(\d+)"/g, 'aria-valuenow={$1}')
    .replace(/aria-valuemin="0"/g, 'aria-valuemin={0}')
    .replace(/aria-valuemax="100"/g, 'aria-valuemax={100}')
    .replace(
      /style="--value:\s*(\d+)"/g,
      'style={{ "--value": $1 } as React.CSSProperties}',
    )
    .replace(
      /style="--value:\s*(\d+);\s*--size:\s*([^;"]+)"/g,
      'style={{ "--value": $1, "--size": "$2" } as React.CSSProperties}',
    )
    .replace(
      /style="--value:\s*(\d+);\s*--size:\s*([^;]+);\s*--thickness:\s*([^"]+)"/g,
      'style={{ "--value": $1, "--size": "$2", "--thickness": "$3" } as React.CSSProperties}',
    )
}

const basicHtml = `<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-3">
    <p class="label-ink">Determinate</p>
    <div class="flex flex-col gap-3">
${basicValues
  .map(
    (v) => `      <progress class="progress w-full max-w-md" value="${v}" max="100" aria-label="Progress ${v} percent"></progress>`,
  )
  .join('\n')}
    </div>
  </div>
  <div class="flex flex-col gap-3">
    <p class="label-ink">Indeterminate</p>
    <progress class="progress w-full max-w-md" aria-label="Indeterminate progress"></progress>
    <p class="text-sm text-ink-muted">Indeterminate bars animate in supporting browsers. Respect system reduced-motion settings when shipping live studio flows.</p>
  </div>
</div>`

const colorsHtml = `<div class="grid gap-5 sm:grid-cols-2">
${colors
  .map(
    (c) => `  <div class="flex w-full flex-col gap-1.5">
    <span class="text-sm font-medium">${c.name}</span>
    <progress class="progress ${c.className} w-full" value="70" max="100" aria-label="${c.name} progress 70 percent"></progress>
  </div>`,
  )
  .join('\n')}
</div>`

const widthsHtml = `<div class="flex flex-col gap-5">
${widths
  .map(
    (w) => `  <div class="flex w-full flex-col gap-1.5">
    <span class="text-sm font-medium">${w.name}</span>
    <progress class="progress progress-primary ${w.className}" value="55" max="100" aria-label="${w.name} progress"></progress>
  </div>`,
  )
  .join('\n')}
</div>`

const interactiveHtml = `<div class="flex w-full max-w-lg flex-col gap-4">
  <div class="flex items-end justify-between gap-3">
    <p class="font-medium">Pigment load</p>
    <span class="font-mono text-sm tabular-nums text-ink-muted">42%</span>
  </div>
  <progress class="progress progress-primary w-full" value="42" max="100" aria-label="Pigment load 42 percent"></progress>
  <label class="flex flex-col gap-2">
    <span class="label-ink">Range control</span>
    <input type="range" min="0" max="100" value="42" class="range range-primary range-sm cursor-pointer" aria-label="Set progress value" />
  </label>
  <div class="flex flex-wrap gap-2">
    <button type="button" class="btn btn-sm btn-ghost cursor-pointer">0%</button>
    <button type="button" class="btn btn-sm btn-ghost cursor-pointer">25%</button>
    <button type="button" class="btn btn-sm btn-ghost cursor-pointer">50%</button>
    <button type="button" class="btn btn-sm btn-ghost cursor-pointer">75%</button>
    <button type="button" class="btn btn-sm btn-ghost cursor-pointer">100%</button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">progress progress-primary + range</code>
</div>`

const interactiveJsx = toJsx(interactiveHtml).replace(
  /(<input[^>]*?) value=\{42\}/g,
  '$1 defaultValue={42}',
)

const radialHtml = `<div class="flex flex-col gap-8">
  <div>
    <p class="label-ink mb-4">Values</p>
    <div class="flex flex-wrap gap-6">
${[0, 20, 60, 80, 100]
  .map(
    (v) => `      <div class="radial-progress" style="--value: ${v}" role="progressbar" aria-valuenow="${v}" aria-valuemin="0" aria-valuemax="100">${v}%</div>`,
  )
  .join('\n')}
    </div>
  </div>
  <div>
    <p class="label-ink mb-4">Colors and chrome</p>
    <div class="flex flex-wrap gap-6">
      <div class="radial-progress text-primary" style="--value: 70" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70%</div>
      <div class="radial-progress bg-primary text-primary-content border-4 border-primary" style="--value: 70" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70%</div>
      <div class="radial-progress text-secondary" style="--value: 70; --size: 4rem; --thickness: 4px" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70%</div>
      <div class="radial-progress text-accent" style="--value: 70; --size: 6rem; --thickness: 8px" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70%</div>
    </div>
  </div>
</div>`

const studioHtml = `<div class="grid gap-4 md:grid-cols-2">
  <div class="flex flex-col gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-5 py-6" role="status" aria-live="polite">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="font-display text-lg font-semibold">Wash drying</p>
        <p class="mt-1 text-sm text-ink-muted">Soft edges are settling</p>
      </div>
      <span class="shrink-0 font-mono text-sm tabular-nums text-ink-muted">18%</span>
    </div>
    <progress class="progress progress-primary w-full" value="18" max="100" aria-label="Wash drying 18 percent"></progress>
    <code class="font-mono text-[0.65rem] text-ink-muted">progress progress-primary</code>
  </div>
  <div class="flex flex-col gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-5 py-6" role="status" aria-live="polite">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="font-display text-lg font-semibold">Pigment load</p>
        <p class="mt-1 text-sm text-ink-muted">Blending ultramarine and ochre for the next glaze</p>
      </div>
      <span class="shrink-0 font-mono text-sm tabular-nums text-ink-muted">34%</span>
    </div>
    <progress class="progress progress-secondary w-full" value="34" max="100" aria-label="Pigment load 34 percent"></progress>
    <code class="font-mono text-[0.65rem] text-ink-muted">progress progress-secondary</code>
  </div>
  <div class="flex flex-col gap-3 rounded-box border border-ink-border/60 bg-wash-blue/25 px-5 py-6 md:col-span-2 lg:col-span-1">
    <div class="flex items-center gap-2">
      ${svgDroplets}
      <p class="font-display text-lg font-semibold">Series sync</p>
    </div>
    <p class="text-sm text-ink-muted">Pulling the latest plates into your studio shelf.</p>
    <progress class="progress progress-info w-full" value="88" max="100" aria-label="Series sync 88 percent"></progress>
    <code class="font-mono text-[0.65rem] text-ink-muted">progress progress-info · value=88</code>
  </div>
  <div class="flex flex-col items-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/20 px-5 py-6 md:col-span-2 lg:col-span-1">
    <div class="flex items-center gap-2">
      ${svgPalette}
      <p class="font-display text-lg font-semibold">Glaze round</p>
    </div>
    <div class="radial-progress text-accent" style="--value: 62; --size: 5.5rem" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100">62%</div>
    <p class="text-center text-sm text-ink-muted">Second glaze layer at sixty-two percent opacity.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">radial-progress text-accent</code>
  </div>
</div>`

const responsiveHtml = `<div class="flex flex-col gap-4 md:flex-row md:items-stretch">
  <div class="flex flex-1 flex-col gap-2 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
    <div class="flex items-center justify-between gap-2">
      <p class="font-medium">Thumbnail bake</p>
      <span class="font-mono text-xs tabular-nums text-ink-muted">45%</span>
    </div>
    <progress class="progress progress-warning w-full" value="45" max="100" aria-label="Thumbnail bake 45 percent"></progress>
    <p class="text-sm text-ink-muted">Compressing preview for the shelf grid.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">progress progress-warning</code>
  </div>
  <div class="flex flex-1 flex-col gap-2 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
    <div class="flex items-center justify-between gap-2">
      <p class="font-medium">Cloud archive</p>
      <span class="font-mono text-xs tabular-nums text-ink-muted">92%</span>
    </div>
    <progress class="progress progress-success w-full" value="92" max="100" aria-label="Cloud archive 92 percent"></progress>
    <p class="text-sm text-ink-muted">Uploading high-res scan in the background.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">progress progress-success</code>
  </div>
</div>`

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
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
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
}: {
  value: number
  className?: string
  size?: string
  thickness?: string
}) {
  const style = {
    '--value': value,
    ...(size ? { '--size': size } : {}),
    ...(thickness ? { '--thickness': thickness } : {}),
  } as CSSProperties

  return (
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
          daisyUI <span className="font-mono text-xs">progress</span> bars for wash drying and pigment load.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Value and indeterminate"
          description="Set value and max for determinate bars"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className="label-ink">Determinate</p>
                    <div className="flex flex-col gap-3">
                      {basicValues.map((v) => (
                        <progress
                          key={v}
                          className="progress w-full max-w-md"
                          value={v}
                          max={100}
                          aria-label={`Progress ${v} percent`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="label-ink">Indeterminate</p>
                    <progress
                      className="progress w-full max-w-md"
                      aria-label="Indeterminate progress"
                    />
                    <p className="text-sm text-ink-muted">
                      Indeterminate bars animate in supporting browsers. Respect
                      system reduced-motion settings when shipping live studio flows.
                    </p>
                  </div>
                </div>
              </>
            }
            html={basicHtml}
            jsx={toJsx(basicHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="progress-primary through progress-error"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  {colors.map((c) => (
                    <div key={c.name} className="flex w-full flex-col gap-1.5">
                      <span className="text-sm font-medium">{c.name}</span>
                      <progress
                        className={`progress ${c.className} w-full`}
                        value={70}
                        max={100}
                        aria-label={`${c.name} progress 70 percent`}
                      />
                    </div>
                  ))}
                </div>
              </>
            }
            html={colorsHtml}
            jsx={toJsx(colorsHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Widths"
          title="Width scale"
          description="daisyUI progress has no size modifiers"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-5">
                  {widths.map((w) => (
                    <div key={w.name} className="flex w-full flex-col gap-1.5">
                      <span className="text-sm font-medium">{w.name}</span>
                      <progress
                        className={`progress progress-primary ${w.className}`}
                        value={55}
                        max={100}
                        aria-label={`${w.name} progress`}
                      />
                    </div>
                  ))}
                </div>
              </>
            }
            html={widthsHtml}
            jsx={toJsx(widthsHtml)}
          />
        </Section>

        <Section
          eyebrow="04 · Interactive"
          title="Controlled value"
          description="Drive the bar with a range slider and quick presets"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <InteractiveProgress />
              </>
            }
            html={interactiveHtml}
            jsx={interactiveJsx}
          />
        </Section>

        <Section
          eyebrow="05 · Radial"
          title="Related radial progress"
          description="Circular companion using --value, optional --size and --thickness"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="label-ink mb-4">Values</p>
                    <div className="flex flex-wrap gap-6">
                      {[0, 20, 60, 80, 100].map((v) => (
                        <RadialSample key={v} value={v} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="label-ink mb-4">Colors and chrome</p>
                    <div className="flex flex-wrap gap-6">
                      <RadialSample value={70} className="text-primary" />
                      <RadialSample
                        value={70}
                        className="bg-primary text-primary-content border-4 border-primary"
                      />
                      <RadialSample
                        value={70}
                        className="text-secondary"
                        size="4rem"
                        thickness="4px"
                      />
                      <RadialSample
                        value={70}
                        className="text-accent"
                        size="6rem"
                        thickness="8px"
                      />
                    </div>
                  </div>
                </div>
              </>
            }
            html={radialHtml}
            jsx={toJsx(radialHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Wash drying panels"
          description="Pigment load and wash settle meters for studio busy states"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <StudioDryingPanel
                    title="Wash drying"
                    description="Soft edges are settling"
                    colorClass="progress-primary"
                    start={18}
                    step={7}
                    label="progress progress-primary"
                  />
                  <StudioDryingPanel
                    title="Pigment load"
                    description="Blending ultramarine and ochre for the next glaze"
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
              </>
            }
            html={studioHtml}
            jsx={toJsx(studioHtml)}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Adaptive progress rows"
          description="Stacked on mobile, side by side from md up"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={responsiveHtml}
            jsx={toJsx(responsiveHtml)}
          />
        </Section>
      </div>
    </>
  )
}
