import type { ReactNode } from 'react'
import {
  Clock,
  Droplets,
  MessageSquareText,
  Palette,
  TrendingDown,
  TrendingUp,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

const svgDroplets =
  '<svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>'
const svgPalette =
  '<svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>'
const svgMessage =
  '<svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
const svgClock =
  '<svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
const svgTrendUp =
  '<svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>'
const svgTrendDown =
  '<svg class="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>'

function toJsxSvg(html: string): string {
  return html
    .replace(/class=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/aria-hidden="true"/g, 'aria-hidden={true}')
}

const basicHtml = `<div class="stats cursor-default bg-base-100 shadow">
  <div class="stat">
    <div class="stat-title">Washes this week</div>
    <div class="stat-value">48</div>
    <div class="stat-desc">12 more than last week</div>
  </div>
</div>`

const directionHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <div class="stats w-full cursor-default bg-base-100 shadow">
    <div class="stat">
      <div class="stat-title">Plates</div>
      <div class="stat-value">128</div>
      <div class="stat-desc">On the shelf</div>
    </div>
    <div class="stat">
      <div class="stat-title">Series</div>
      <div class="stat-value">14</div>
      <div class="stat-desc">Active</div>
    </div>
  </div>
  <div class="stats stats-vertical w-full cursor-default bg-base-100 shadow">
    <div class="stat">
      <div class="stat-title">Plates</div>
      <div class="stat-value">128</div>
      <div class="stat-desc">On the shelf</div>
    </div>
    <div class="stat">
      <div class="stat-title">Series</div>
      <div class="stat-value">14</div>
      <div class="stat-desc">Active</div>
    </div>
    <div class="stat">
      <div class="stat-title">Sketches</div>
      <div class="stat-value">62</div>
      <div class="stat-desc">In progress</div>
    </div>
  </div>
</div>`

const figureHtml = `<div class="stats w-full cursor-default bg-base-100 shadow">
  <div class="stat">
    <div class="stat-figure text-primary">${svgDroplets}</div>
    <div class="stat-title">Washes completed</div>
    <div class="stat-value text-primary">312</div>
    <div class="stat-desc">18% more than last month</div>
  </div>
  <div class="stat">
    <div class="stat-figure text-secondary">${svgPalette}</div>
    <div class="stat-title">Pigments mixed</div>
    <div class="stat-value text-secondary">86</div>
    <div class="stat-desc">Ultramarine leading</div>
  </div>
  <div class="stat">
    <div class="stat-figure text-accent">${svgMessage}</div>
    <div class="stat-title">Critiques</div>
    <div class="stat-value text-accent">24</div>
    <div class="stat-desc">3 pending review</div>
  </div>
</div>`

const colorsHtml = `<div class="stats stats-vertical w-full cursor-default bg-base-100 shadow lg:stats-horizontal">
  <div class="stat">
    <div class="stat-title">Primary</div>
    <div class="stat-value text-primary">89%</div>
    <div class="stat-desc text-primary">Glaze opacity</div>
  </div>
  <div class="stat">
    <div class="stat-title">Secondary</div>
    <div class="stat-value text-secondary">42</div>
    <div class="stat-desc text-secondary">Layers stacked</div>
  </div>
  <div class="stat">
    <div class="stat-title">Accent</div>
    <div class="stat-value text-accent">7</div>
    <div class="stat-desc text-accent">New brushes</div>
  </div>
  <div class="stat">
    <div class="stat-title">Info</div>
    <div class="stat-value text-info">16h</div>
    <div class="stat-desc text-info">Dry window</div>
  </div>
  <div class="stat">
    <div class="stat-title">Success</div>
    <div class="stat-value text-success">98%</div>
    <div class="stat-desc text-success">Archive healthy</div>
  </div>
  <div class="stat">
    <div class="stat-title">Warning</div>
    <div class="stat-value text-warning">4</div>
    <div class="stat-desc text-warning">Plates at risk</div>
  </div>
  <div class="stat">
    <div class="stat-title">Error</div>
    <div class="stat-value text-error">2</div>
    <div class="stat-desc text-error">Failed exports</div>
  </div>
</div>`

const multipleHtml = `<div class="stats w-full cursor-default bg-base-100 shadow">
  <div class="stat">
    <div class="stat-title">Downloads</div>
    <div class="stat-value">31K</div>
    <div class="stat-desc">Jan 1 to Feb 1</div>
  </div>
  <div class="stat">
    <div class="stat-figure text-success">${svgTrendUp}</div>
    <div class="stat-title">New followers</div>
    <div class="stat-value">4,200</div>
    <div class="stat-desc text-success">Up 400 (22%)</div>
  </div>
  <div class="stat">
    <div class="stat-figure text-error">${svgTrendDown}</div>
    <div class="stat-title">Abandoned drafts</div>
    <div class="stat-value">90</div>
    <div class="stat-desc text-error">Down 14%</div>
  </div>
</div>`

const studioHtml = `<div class="flex flex-col gap-4">
  <div class="stats w-full cursor-default border border-ink-border/60 bg-base-100/80 shadow-sm">
    <div class="stat">
      <div class="stat-figure text-primary">${svgDroplets}</div>
      <div class="stat-title">Washes completed</div>
      <div class="stat-value">156</div>
      <div class="stat-desc">This season</div>
    </div>
    <div class="stat">
      <div class="stat-figure text-secondary">${svgPalette}</div>
      <div class="stat-title">Pigments</div>
      <div class="stat-value">64</div>
      <div class="stat-desc">On the palette</div>
    </div>
    <div class="stat">
      <div class="stat-figure text-accent">${svgMessage}</div>
      <div class="stat-title">Critiques</div>
      <div class="stat-value">19</div>
      <div class="stat-desc">Open threads</div>
    </div>
    <div class="stat">
      <div class="stat-figure text-info">${svgClock}</div>
      <div class="stat-title">Dry time</div>
      <div class="stat-value">2.4h</div>
      <div class="stat-desc">Avg last glaze</div>
    </div>
  </div>
  <div class="stats cursor-default border border-base-300 bg-base-100">
    <div class="stat">
      <div class="stat-title">Studio balance</div>
      <div class="stat-value">$420</div>
      <div class="stat-actions">
        <button type="button" class="btn btn-xs btn-success cursor-pointer">Add funds</button>
      </div>
    </div>
    <div class="stat">
      <div class="stat-title">Print credit</div>
      <div class="stat-value">$89</div>
      <div class="stat-actions">
        <button type="button" class="btn btn-xs cursor-pointer">Withdraw</button>
        <button type="button" class="btn btn-xs cursor-pointer">Deposit</button>
      </div>
    </div>
  </div>
</div>`

const responsiveHtml = `<div class="stats stats-vertical w-full cursor-default bg-base-100 shadow lg:stats-horizontal">
  <div class="stat place-items-center lg:place-items-start">
    <div class="stat-title">Downloads</div>
    <div class="stat-value">31K</div>
    <div class="stat-desc">Jan 1 to Feb 1</div>
  </div>
  <div class="stat place-items-center lg:place-items-start">
    <div class="stat-title">Followers</div>
    <div class="stat-value text-secondary">4,200</div>
    <div class="stat-desc text-secondary">Up 40 (2%)</div>
  </div>
  <div class="stat place-items-center lg:place-items-start">
    <div class="stat-title">New registers</div>
    <div class="stat-value">1,200</div>
    <div class="stat-desc">Down 90 (14%)</div>
  </div>
</div>`

const basicJsx = daisyToJsx(basicHtml)
const directionJsx = daisyToJsx(directionHtml)
const figureJsx = toJsxSvg(figureHtml)
const colorsJsx = daisyToJsx(colorsHtml)
const multipleJsx = toJsxSvg(multipleHtml)
const studioJsx = toJsxSvg(studioHtml)
const responsiveJsx = daisyToJsx(responsiveHtml)

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
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

export default function StatPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Stat
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">stats</span> blocks.: title, value, description, figures, colors, and.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Single stat"
          description="One stat with title, value, and description inside a stats"
        >
          <ShowcaseTabs
            preview={
              <Sample label="stats · stat · stat-title · stat-value · stat-desc">
                <div className="stats cursor-default bg-base-100 shadow">
                  <div className="stat">
                    <div className="stat-title">Washes this week</div>
                    <div className="stat-value">48</div>
                    <div className="stat-desc">12 more than last week</div>
                  </div>
                </div>
              </Sample>
            }
            html={basicHtml}
            jsx={basicJsx}
          />
        </Section>

        <Section
          eyebrow="02 · Direction"
          title="Horizontal and vertical"
          description="stats is horizontal by default"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="grid gap-6 lg:grid-cols-2">
                <Sample label="stats (horizontal default)">
                  <div className="stats w-full cursor-default bg-base-100 shadow">
                    <div className="stat">
                      <div className="stat-title">Plates</div>
                      <div className="stat-value">128</div>
                      <div className="stat-desc">On the shelf</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Series</div>
                      <div className="stat-value">14</div>
                      <div className="stat-desc">Active</div>
                    </div>
                  </div>
                </Sample>
                <Sample label="stats stats-vertical">
                  <div className="stats stats-vertical w-full cursor-default bg-base-100 shadow">
                    <div className="stat">
                      <div className="stat-title">Plates</div>
                      <div className="stat-value">128</div>
                      <div className="stat-desc">On the shelf</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Series</div>
                      <div className="stat-value">14</div>
                      <div className="stat-desc">Active</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Sketches</div>
                      <div className="stat-value">62</div>
                      <div className="stat-desc">In progress</div>
                    </div>
                  </div>
                </Sample>
              </div>
            }
            html={directionHtml}
            jsx={directionJsx}
          />
        </Section>

        <Section
          eyebrow="03 · Figure"
          title="Icons in the figure"
          description="Place Lucide icons in stat-figure"
        >
          <ShowcaseTabs
            preview={
              <Sample label="stat-figure + Lucide">
                <div className="stats w-full cursor-default bg-base-100 shadow">
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <Droplets className="size-8" strokeWidth={2} aria-hidden />
                    </div>
                    <div className="stat-title">Washes completed</div>
                    <div className="stat-value text-primary">312</div>
                    <div className="stat-desc">18% more than last month</div>
                  </div>
                  <div className="stat">
                    <div className="stat-figure text-secondary">
                      <Palette className="size-8" strokeWidth={2} aria-hidden />
                    </div>
                    <div className="stat-title">Pigments mixed</div>
                    <div className="stat-value text-secondary">86</div>
                    <div className="stat-desc">Ultramarine leading</div>
                  </div>
                  <div className="stat">
                    <div className="stat-figure text-accent">
                      <MessageSquareText className="size-8" strokeWidth={2} aria-hidden />
                    </div>
                    <div className="stat-title">Critiques</div>
                    <div className="stat-value text-accent">24</div>
                    <div className="stat-desc">3 pending review</div>
                  </div>
                </div>
              </Sample>
            }
            html={figureHtml}
            jsx={figureJsx}
          />
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Value accents"
          description="Accent titles, values"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <Sample label="stat-value text-primary … text-error">
                <div className="stats stats-vertical w-full cursor-default bg-base-100 shadow lg:stats-horizontal">
                  <div className="stat">
                    <div className="stat-title">Primary</div>
                    <div className="stat-value text-primary">89%</div>
                    <div className="stat-desc text-primary">Glaze opacity</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Secondary</div>
                    <div className="stat-value text-secondary">42</div>
                    <div className="stat-desc text-secondary">Layers stacked</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Accent</div>
                    <div className="stat-value text-accent">7</div>
                    <div className="stat-desc text-accent">New brushes</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Info</div>
                    <div className="stat-value text-info">16h</div>
                    <div className="stat-desc text-info">Dry window</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Success</div>
                    <div className="stat-value text-success">98%</div>
                    <div className="stat-desc text-success">Archive healthy</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Warning</div>
                    <div className="stat-value text-warning">4</div>
                    <div className="stat-desc text-warning">Plates at risk</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Error</div>
                    <div className="stat-value text-error">2</div>
                    <div className="stat-desc text-error">Failed exports</div>
                  </div>
                </div>
              </Sample>
            }
            html={colorsHtml}
            jsx={colorsJsx}
          />
        </Section>

        <Section
          eyebrow="05 · Multiple"
          title="Studio metrics row"
          description="Several stats in one horizontal group"
        >
          <ShowcaseTabs
            preview={
              <Sample label="stats · multiple stat">
                <div className="stats w-full cursor-default bg-base-100 shadow">
                  <div className="stat">
                    <div className="stat-title">Downloads</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">Jan 1 to Feb 1</div>
                  </div>
                  <div className="stat">
                    <div className="stat-figure text-success">
                      <TrendingUp className="size-8" strokeWidth={2} aria-hidden />
                    </div>
                    <div className="stat-title">New followers</div>
                    <div className="stat-value">4,200</div>
                    <div className="stat-desc text-success">Up 400 (22%)</div>
                  </div>
                  <div className="stat">
                    <div className="stat-figure text-error">
                      <TrendingDown className="size-8" strokeWidth={2} aria-hidden />
                    </div>
                    <div className="stat-title">Abandoned drafts</div>
                    <div className="stat-value">90</div>
                    <div className="stat-desc text-error">Down 14%</div>
                  </div>
                </div>
              </Sample>
            }
            html={multipleHtml}
            jsx={multipleJsx}
          />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Menzies Design dashboard"
          description="Washes completed, pigments, critiques, and dry time"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-col gap-4">
                <Sample label="stats · studio dashboard">
                  <div className="stats w-full cursor-default border border-ink-border/60 bg-base-100/80 shadow-sm">
                    <div className="stat">
                      <div className="stat-figure text-primary">
                        <Droplets className="size-8" strokeWidth={2} aria-hidden />
                      </div>
                      <div className="stat-title">Washes completed</div>
                      <div className="stat-value">156</div>
                      <div className="stat-desc">This season</div>
                    </div>
                    <div className="stat">
                      <div className="stat-figure text-secondary">
                        <Palette className="size-8" strokeWidth={2} aria-hidden />
                      </div>
                      <div className="stat-title">Pigments</div>
                      <div className="stat-value">64</div>
                      <div className="stat-desc">On the palette</div>
                    </div>
                    <div className="stat">
                      <div className="stat-figure text-accent">
                        <MessageSquareText className="size-8" strokeWidth={2} aria-hidden />
                      </div>
                      <div className="stat-title">Critiques</div>
                      <div className="stat-value">19</div>
                      <div className="stat-desc">Open threads</div>
                    </div>
                    <div className="stat">
                      <div className="stat-figure text-info">
                        <Clock className="size-8" strokeWidth={2} aria-hidden />
                      </div>
                      <div className="stat-title">Dry time</div>
                      <div className="stat-value">2.4h</div>
                      <div className="stat-desc">Avg last glaze</div>
                    </div>
                  </div>
                </Sample>
                <Sample label="stat-actions">
                  <div className="stats cursor-default border border-base-300 bg-base-100">
                    <div className="stat">
                      <div className="stat-title">Studio balance</div>
                      <div className="stat-value">$420</div>
                      <div className="stat-actions">
                        <button
                          type="button"
                          className="btn btn-xs btn-success cursor-pointer"
                        >
                          Add funds
                        </button>
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Print credit</div>
                      <div className="stat-value">$89</div>
                      <div className="stat-actions">
                        <button type="button" className="btn btn-xs cursor-pointer">
                          Withdraw
                        </button>
                        <button type="button" className="btn btn-xs cursor-pointer">
                          Deposit
                        </button>
                      </div>
                    </div>
                  </div>
                </Sample>
              </div>
            }
            html={studioHtml}
            jsx={studioJsx}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Stack on mobile"
          description="stats-vertical on small screens, stats-horizontal from lg up"
        >
          <ShowcaseTabs
            preview={
              <Sample label="stats stats-vertical lg:stats-horizontal">
                <div className="stats stats-vertical w-full cursor-default bg-base-100 shadow lg:stats-horizontal">
                  <div className="stat place-items-center lg:place-items-start">
                    <div className="stat-title">Downloads</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">Jan 1 to Feb 1</div>
                  </div>
                  <div className="stat place-items-center lg:place-items-start">
                    <div className="stat-title">Followers</div>
                    <div className="stat-value text-secondary">4,200</div>
                    <div className="stat-desc text-secondary">Up 40 (2%)</div>
                  </div>
                  <div className="stat place-items-center lg:place-items-start">
                    <div className="stat-title">New registers</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">Down 90 (14%)</div>
                  </div>
                </div>
              </Sample>
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        </Section>
      </div>
    </>
  )
}
