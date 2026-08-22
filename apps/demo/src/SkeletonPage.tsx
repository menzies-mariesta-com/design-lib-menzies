import { useState, type ReactNode } from 'react'
import { Droplets, Layers, Palette } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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

const shapes = [
  { name: 'Block', className: 'h-32 w-32' },
  { name: 'Circle', className: 'h-16 w-16 shrink-0 rounded-full' },
  { name: 'Line sm', className: 'h-3 w-28' },
  { name: 'Line md', className: 'h-4 w-40' },
  { name: 'Line lg', className: 'h-4 w-56' },
  { name: 'Bar', className: 'h-8 w-full max-w-xs' },
] as const

const sizeSamples = [
  { name: 'Tiny', className: 'h-2 w-16' },
  { name: 'Short', className: 'h-4 w-24' },
  { name: 'Medium', className: 'h-4 w-40' },
  { name: 'Wide', className: 'h-4 w-64' },
  { name: 'Square sm', className: 'h-12 w-12' },
  { name: 'Square md', className: 'h-20 w-20' },
  { name: 'Square lg', className: 'h-32 w-32' },
  { name: 'Banner', className: 'h-24 w-full max-w-sm' },
] as const

function ToggleDemo() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="label cursor-pointer gap-3 py-0">
          <span className="label-text text-sm">Show loaded content</span>
          <input
            type="checkbox"
            className="toggle toggle-primary cursor-pointer"
            checked={loaded}
            onChange={(e) => setLoaded(e.target.checked)}
            aria-label="Toggle skeleton versus loaded content"
          />
        </label>
        <ClassLabel value="toggle + skeleton vs content" />
      </div>

      <div
        className="rounded-box border border-ink-border/60 bg-base-100/70 p-4"
        aria-busy={!loaded}
        aria-live="polite"
      >
        {loaded ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="avatar avatar-placeholder shrink-0">
              <div className="w-16 rounded-full bg-wash-blue text-lg font-semibold text-base-content">
                <span>MK</span>
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <p className="font-display text-lg font-semibold">Misty Cove plate</p>
              <p className="text-sm text-ink-muted">
                Soft ultramarine wash over ochre underpainting. Edges left wet for bloom.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="badge badge-soft badge-primary">Series A</span>
                <span className="badge badge-soft badge-secondary">Wet edge</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div
              className="skeleton h-16 w-16 shrink-0 rounded-full"
              aria-hidden
            />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="skeleton h-5 w-40" aria-hidden />
              <div className="skeleton h-4 w-full" aria-hidden />
              <div className="skeleton h-4 w-4/5 max-w-md" aria-hidden />
              <div className="flex gap-2 pt-1">
                <div className="skeleton h-6 w-20 rounded-full" aria-hidden />
                <div className="skeleton h-6 w-24 rounded-full" aria-hidden />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SkeletonPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Skeleton
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">skeleton</span> placeholders
          for content still loading. Blocks, circles, text lines, and studio
          layouts. Animation eases when{' '}
          <span className="font-mono text-xs">prefers-reduced-motion</span> is
          set.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Blocks, circles, and lines"
          description="Core skeleton shapes sized with Tailwind width and height utilities."
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {shapes.map((s) => (
              <Sample key={s.name} label={`skeleton ${s.className}`} align="center">
                <div
                  className={`skeleton ${s.className}`}
                  aria-hidden
                  role="presentation"
                />
              </Sample>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            <p className="label-ink">skeleton-text</p>
            <Sample label="skeleton skeleton-text">
              <span className="skeleton skeleton-text font-display text-lg font-semibold">
                Mixing the next glaze…
              </span>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="02 · Layouts"
          title="Card and list placeholders"
          description="Avatar plus lines, media cards, and wash-panel list rows."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Sample label="circle + lines + block">
              <div
                className="flex w-full max-w-xs flex-col gap-4"
                role="status"
                aria-busy="true"
                aria-label="Loading profile card"
              >
                <div className="flex items-center gap-4">
                  <div className="skeleton h-16 w-16 shrink-0 rounded-full" />
                  <div className="flex flex-col gap-3">
                    <div className="skeleton h-4 w-20" />
                    <div className="skeleton h-4 w-28" />
                  </div>
                </div>
                <div className="skeleton h-32 w-full" />
              </div>
            </Sample>

            <Sample label="media + title + body lines">
              <div
                className="flex w-full max-w-xs flex-col gap-4"
                role="status"
                aria-busy="true"
                aria-label="Loading media card"
              >
                <div className="skeleton h-32 w-full" />
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
              </div>
            </Sample>

            <Sample label="wash-panel list rows">
              <ul
                className="flex w-full max-w-xs flex-col gap-3"
                role="status"
                aria-busy="true"
                aria-label="Loading list"
              >
                {[1, 2, 3].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-box border border-ink-border/50 bg-base-100/50 p-3"
                  >
                    <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="skeleton h-3 w-3/4" />
                      <div className="skeleton h-3 w-1/2" />
                    </div>
                  </li>
                ))}
              </ul>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Widths and heights"
          description="Common placeholder scales with class labels under each sample."
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {sizeSamples.map((s) => (
              <Sample key={s.name} label={`skeleton ${s.className}`} align="center">
                <div className={`skeleton ${s.className}`} aria-hidden />
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Studio"
          title="Pigment and layer placeholders"
          description="Studio-shaped loading shells for pigment cards and the layer stack."
          panel="wash-panel-rose"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className="rounded-box border border-ink-border/60 bg-base-100/60 p-4"
              role="status"
              aria-busy="true"
              aria-label="Loading pigment card"
            >
              <div className="mb-3 flex items-center gap-2">
                <Palette className="size-4 text-primary" strokeWidth={2} aria-hidden />
                <span className="label-ink">Pigment card</span>
              </div>
              <div className="skeleton mb-4 h-28 w-full" />
              <div className="space-y-2">
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-5/6" />
              </div>
              <div className="mt-3 flex gap-2">
                <div className="skeleton h-8 w-8 rounded-full" />
                <div className="skeleton h-8 w-8 rounded-full" />
                <div className="skeleton h-8 w-8 rounded-full" />
              </div>
              <ClassLabel value="skeleton pigment card" />
            </div>

            <div
              className="rounded-box border border-ink-border/60 bg-base-100/60 p-4"
              role="status"
              aria-busy="true"
              aria-label="Loading layer stack"
            >
              <div className="mb-3 flex items-center gap-2">
                <Layers className="size-4 text-secondary" strokeWidth={2} aria-hidden />
                <span className="label-ink">Layer stack</span>
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-box border border-ink-border/40 bg-base-200/40 px-3 py-2"
                  >
                    <div className="skeleton h-8 w-8 shrink-0" />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="skeleton h-3 w-24" />
                      <div className="skeleton h-2 w-16" />
                    </div>
                    <div className="skeleton h-4 w-8 shrink-0" />
                  </div>
                ))}
              </div>
              <ClassLabel value="skeleton layer stack" />
            </div>

            <div
              className="rounded-box border border-ink-border/60 bg-wash-blue/25 p-4 md:col-span-2"
              role="status"
              aria-busy="true"
              aria-label="Loading wash drying shelf"
            >
              <div className="mb-3 flex items-center gap-2">
                <Droplets className="size-4 text-accent" strokeWidth={2} aria-hidden />
                <span className="label-ink">Wash drying shelf</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="skeleton aspect-square w-full" />
                    <div className="skeleton h-3 w-3/4" />
                    <div className="skeleton h-2 w-1/2" />
                  </div>
                ))}
              </div>
              <ClassLabel value="skeleton shelf grid" />
            </div>
          </div>
        </Section>

        <Section
          eyebrow="05 · Toggle"
          title="Skeleton versus loaded"
          description="Flip between placeholder shell and finished plate content."
        >
          <ToggleDemo />
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Adaptive loading rows"
          description="Stacked on mobile, side by side from md up."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
            <div
              className="flex flex-1 items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4"
              role="status"
              aria-busy="true"
              aria-label="Loading thumbnail bake"
            >
              <div className="skeleton h-14 w-14 shrink-0 rounded-box" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-3 w-full" />
                <ClassLabel value="skeleton row (mobile stack)" />
              </div>
            </div>
            <div
              className="flex flex-1 items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4"
              role="status"
              aria-busy="true"
              aria-label="Loading cloud archive"
            >
              <div className="skeleton h-14 w-14 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-3 w-4/5" />
                <ClassLabel value="skeleton row (md side by side)" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
