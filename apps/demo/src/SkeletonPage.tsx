import { useState, type ReactNode } from 'react'
import { Droplets, Layers, Palette } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

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

const svgPalette =
  '<svg class="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>'
const svgLayers =
  '<svg class="size-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>'
const svgDroplets =
  '<svg class="size-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>'

function toJsxSvg(html: string): string {
  return html
    .replace(/class=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/aria-hidden="true"/g, 'aria-hidden={true}')
}

const basicHtml = `<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
  <div class="skeleton h-32 w-32" aria-hidden="true" role="presentation"></div>
  <div class="skeleton h-16 w-16 shrink-0 rounded-full" aria-hidden="true" role="presentation"></div>
  <div class="skeleton h-3 w-28" aria-hidden="true" role="presentation"></div>
  <div class="skeleton h-4 w-40" aria-hidden="true" role="presentation"></div>
  <div class="skeleton h-4 w-56" aria-hidden="true" role="presentation"></div>
  <div class="skeleton h-8 w-full max-w-xs" aria-hidden="true" role="presentation"></div>
</div>
<div class="mt-6 space-y-2">
  <p class="label-ink">skeleton-text</p>
  <span class="skeleton skeleton-text font-display text-lg font-semibold">Mixing the next glaze…</span>
</div>`

const layoutsHtml = `<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <div class="flex w-full max-w-xs flex-col gap-4" role="status" aria-busy="true" aria-label="Loading profile card">
    <div class="flex items-center gap-4">
      <div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div class="flex flex-col gap-3">
        <div class="skeleton h-4 w-20"></div>
        <div class="skeleton h-4 w-28"></div>
      </div>
    </div>
    <div class="skeleton h-32 w-full"></div>
  </div>
  <div class="flex w-full max-w-xs flex-col gap-4" role="status" aria-busy="true" aria-label="Loading media card">
    <div class="skeleton h-32 w-full"></div>
    <div class="skeleton h-4 w-28"></div>
    <div class="skeleton h-4 w-full"></div>
    <div class="skeleton h-4 w-full"></div>
  </div>
  <ul class="flex w-full max-w-xs flex-col gap-3" role="status" aria-busy="true" aria-label="Loading list">
    <li class="flex items-center gap-3 rounded-box border border-ink-border/50 bg-base-100/50 p-3">
      <div class="skeleton h-10 w-10 shrink-0 rounded-full"></div>
      <div class="flex min-w-0 flex-1 flex-col gap-2">
        <div class="skeleton h-3 w-3/4"></div>
        <div class="skeleton h-3 w-1/2"></div>
      </div>
    </li>
    <li class="flex items-center gap-3 rounded-box border border-ink-border/50 bg-base-100/50 p-3">
      <div class="skeleton h-10 w-10 shrink-0 rounded-full"></div>
      <div class="flex min-w-0 flex-1 flex-col gap-2">
        <div class="skeleton h-3 w-3/4"></div>
        <div class="skeleton h-3 w-1/2"></div>
      </div>
    </li>
    <li class="flex items-center gap-3 rounded-box border border-ink-border/50 bg-base-100/50 p-3">
      <div class="skeleton h-10 w-10 shrink-0 rounded-full"></div>
      <div class="flex min-w-0 flex-1 flex-col gap-2">
        <div class="skeleton h-3 w-3/4"></div>
        <div class="skeleton h-3 w-1/2"></div>
      </div>
    </li>
  </ul>
</div>`

const sizesHtml = `<div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
  <div class="skeleton h-2 w-16" aria-hidden="true"></div>
  <div class="skeleton h-4 w-24" aria-hidden="true"></div>
  <div class="skeleton h-4 w-40" aria-hidden="true"></div>
  <div class="skeleton h-4 w-64" aria-hidden="true"></div>
  <div class="skeleton h-12 w-12" aria-hidden="true"></div>
  <div class="skeleton h-20 w-20" aria-hidden="true"></div>
  <div class="skeleton h-32 w-32" aria-hidden="true"></div>
  <div class="skeleton h-24 w-full max-w-sm" aria-hidden="true"></div>
</div>`

const studioHtml = `<div class="grid gap-4 md:grid-cols-2">
  <div class="rounded-box border border-ink-border/60 bg-base-100/60 p-4" role="status" aria-busy="true" aria-label="Loading pigment card">
    <div class="mb-3 flex items-center gap-2">
      ${svgPalette}
      <span class="label-ink">Pigment card</span>
    </div>
    <div class="skeleton mb-4 h-28 w-full"></div>
    <div class="space-y-2">
      <div class="skeleton h-4 w-32"></div>
      <div class="skeleton h-3 w-full"></div>
      <div class="skeleton h-3 w-5/6"></div>
    </div>
    <div class="mt-3 flex gap-2">
      <div class="skeleton h-8 w-8 rounded-full"></div>
      <div class="skeleton h-8 w-8 rounded-full"></div>
      <div class="skeleton h-8 w-8 rounded-full"></div>
    </div>
  </div>
  <div class="rounded-box border border-ink-border/60 bg-base-100/60 p-4" role="status" aria-busy="true" aria-label="Loading layer stack">
    <div class="mb-3 flex items-center gap-2">
      ${svgLayers}
      <span class="label-ink">Layer stack</span>
    </div>
    <div class="space-y-2">
      <div class="flex items-center gap-3 rounded-box border border-ink-border/40 bg-base-200/40 px-3 py-2">
        <div class="skeleton h-8 w-8 shrink-0"></div>
        <div class="flex min-w-0 flex-1 flex-col gap-1.5">
          <div class="skeleton h-3 w-24"></div>
          <div class="skeleton h-2 w-16"></div>
        </div>
        <div class="skeleton h-4 w-8 shrink-0"></div>
      </div>
      <div class="flex items-center gap-3 rounded-box border border-ink-border/40 bg-base-200/40 px-3 py-2">
        <div class="skeleton h-8 w-8 shrink-0"></div>
        <div class="flex min-w-0 flex-1 flex-col gap-1.5">
          <div class="skeleton h-3 w-24"></div>
          <div class="skeleton h-2 w-16"></div>
        </div>
        <div class="skeleton h-4 w-8 shrink-0"></div>
      </div>
      <div class="flex items-center gap-3 rounded-box border border-ink-border/40 bg-base-200/40 px-3 py-2">
        <div class="skeleton h-8 w-8 shrink-0"></div>
        <div class="flex min-w-0 flex-1 flex-col gap-1.5">
          <div class="skeleton h-3 w-24"></div>
          <div class="skeleton h-2 w-16"></div>
        </div>
        <div class="skeleton h-4 w-8 shrink-0"></div>
      </div>
      <div class="flex items-center gap-3 rounded-box border border-ink-border/40 bg-base-200/40 px-3 py-2">
        <div class="skeleton h-8 w-8 shrink-0"></div>
        <div class="flex min-w-0 flex-1 flex-col gap-1.5">
          <div class="skeleton h-3 w-24"></div>
          <div class="skeleton h-2 w-16"></div>
        </div>
        <div class="skeleton h-4 w-8 shrink-0"></div>
      </div>
    </div>
  </div>
  <div class="rounded-box border border-ink-border/60 bg-wash-blue/25 p-4 md:col-span-2" role="status" aria-busy="true" aria-label="Loading wash drying shelf">
    <div class="mb-3 flex items-center gap-2">
      ${svgDroplets}
      <span class="label-ink">Wash drying shelf</span>
    </div>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div class="flex flex-col gap-2">
        <div class="skeleton aspect-square w-full"></div>
        <div class="skeleton h-3 w-3/4"></div>
        <div class="skeleton h-2 w-1/2"></div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="skeleton aspect-square w-full"></div>
        <div class="skeleton h-3 w-3/4"></div>
        <div class="skeleton h-2 w-1/2"></div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="skeleton aspect-square w-full"></div>
        <div class="skeleton h-3 w-3/4"></div>
        <div class="skeleton h-2 w-1/2"></div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="skeleton aspect-square w-full"></div>
        <div class="skeleton h-3 w-3/4"></div>
        <div class="skeleton h-2 w-1/2"></div>
      </div>
    </div>
  </div>
</div>`

const toggleHtml = `<div class="space-y-4">
  <label class="label cursor-pointer gap-3 py-0">
    <span class="label-text text-sm">Show loaded content</span>
    <input type="checkbox" class="toggle toggle-primary cursor-pointer" aria-label="Toggle skeleton versus loaded content" />
  </label>
  <div class="rounded-box border border-ink-border/60 bg-base-100/70 p-4" aria-busy="true" aria-live="polite">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div class="skeleton h-16 w-16 shrink-0 rounded-full" aria-hidden="true"></div>
      <div class="flex min-w-0 flex-1 flex-col gap-3">
        <div class="skeleton h-5 w-40" aria-hidden="true"></div>
        <div class="skeleton h-4 w-full" aria-hidden="true"></div>
        <div class="skeleton h-4 w-4/5 max-w-md" aria-hidden="true"></div>
        <div class="flex gap-2 pt-1">
          <div class="skeleton h-6 w-20 rounded-full" aria-hidden="true"></div>
          <div class="skeleton h-6 w-24 rounded-full" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </div>
</div>`

const responsiveHtml = `<div class="flex flex-col gap-4 md:flex-row md:items-stretch">
  <div class="flex flex-1 items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4" role="status" aria-busy="true" aria-label="Loading thumbnail bake">
    <div class="skeleton h-14 w-14 shrink-0 rounded-box"></div>
    <div class="flex min-w-0 flex-1 flex-col gap-2">
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-3 w-full"></div>
    </div>
  </div>
  <div class="flex flex-1 items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4" role="status" aria-busy="true" aria-label="Loading cloud archive">
    <div class="skeleton h-14 w-14 shrink-0 rounded-full"></div>
    <div class="flex min-w-0 flex-1 flex-col gap-2">
      <div class="skeleton h-4 w-32"></div>
      <div class="skeleton h-3 w-4/5"></div>
    </div>
  </div>
</div>`

const basicJsx = daisyToJsx(basicHtml)
const layoutsJsx = daisyToJsx(layoutsHtml)
const sizesJsx = daisyToJsx(sizesHtml)
const studioJsx = toJsxSvg(studioHtml)
const toggleJsx = daisyToJsx(toggleHtml)
const responsiveJsx = daisyToJsx(responsiveHtml)

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
            <div className="skeleton h-16 w-16 shrink-0 rounded-full" aria-hidden />
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
          daisyUI <span className="font-mono text-xs">skeleton</span> placeholders for content still loading.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Blocks, circles, and lines"
          description="Core skeleton shapes sized with Tailwind width and height utilities"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={basicHtml}
            jsx={basicJsx}
          />
        </Section>

        <Section
          eyebrow="02 · Layouts"
          title="Card and list placeholders"
          description="Avatar plus lines, media cards, and wash-panel list rows"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
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
            }
            html={layoutsHtml}
            jsx={layoutsJsx}
          />
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Widths and heights"
          description="Common placeholder scales with class labels under each sample"
        >
          <ShowcaseTabs
            preview={
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {sizeSamples.map((s) => (
                  <Sample key={s.name} label={`skeleton ${s.className}`} align="center">
                    <div className={`skeleton ${s.className}`} aria-hidden />
                  </Sample>
                ))}
              </div>
            }
            html={sizesHtml}
            jsx={sizesJsx}
          />
        </Section>

        <Section
          eyebrow="04 · Studio"
          title="Pigment and layer placeholders"
          description="Studio-shaped loading shells for pigment cards and the layer stack"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
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
            }
            html={studioHtml}
            jsx={studioJsx}
          />
        </Section>

        <Section
          eyebrow="05 · Toggle"
          title="Skeleton versus loaded"
          description="Flip between placeholder shell and finished plate content"
        >
          <ShowcaseTabs
            preview={<ToggleDemo />}
            html={toggleHtml}
            jsx={toggleJsx}
          />
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Adaptive loading rows"
          description="Stacked on mobile, side by side from md up"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
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
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        </Section>
      </div>
    </>
  )
}
