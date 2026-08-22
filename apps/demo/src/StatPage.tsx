import type { ReactNode } from 'react'
import {
  Clock,
  Droplets,
  MessageSquareText,
  Palette,
  TrendingDown,
  TrendingUp,
} from 'menzies-design-wash-ui/icons'

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
          daisyUI <span className="font-mono text-xs">stats</span> blocks for
          studio metrics: title, value, description, figures, colors, and
          responsive layout.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Single stat"
          description="One stat with title, value, and description inside a stats container."
        >
          <Sample label="stats · stat · stat-title · stat-value · stat-desc">
            <div className="stats cursor-default bg-base-100 shadow">
              <div className="stat">
                <div className="stat-title">Washes this week</div>
                <div className="stat-value">48</div>
                <div className="stat-desc">12 more than last week</div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Direction"
          title="Horizontal and vertical"
          description="stats is horizontal by default. Use stats-vertical to stack, or stats-horizontal to pin the row."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="03 · Figure"
          title="Icons in the figure"
          description="Place Lucide icons in stat-figure. Color the figure and value with semantic text classes."
        >
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
                  <MessageSquareText
                    className="size-8"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
                <div className="stat-title">Critiques</div>
                <div className="stat-value text-accent">24</div>
                <div className="stat-desc">3 pending review</div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Value accents"
          description="Accent titles, values, and descriptions with text-primary through text-error."
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-4">
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
          </div>
        </Section>

        <Section
          eyebrow="05 · Multiple"
          title="Studio metrics row"
          description="Several stats in one horizontal group with trend cues in the description."
        >
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
                  <TrendingDown
                    className="size-8"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
                <div className="stat-title">Abandoned drafts</div>
                <div className="stat-value">90</div>
                <div className="stat-desc text-error">Down 14%</div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Menzies Design dashboard"
          description="Washes completed, pigments, critiques, and dry time for the pigment desk."
          panel="wash-panel-ochre"
        >
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
                    <MessageSquareText
                      className="size-8"
                      strokeWidth={2}
                      aria-hidden
                    />
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
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Stack on mobile"
          description="stats-vertical on small screens, stats-horizontal from lg up."
        >
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
        </Section>
      </div>
    </>
  )
}
