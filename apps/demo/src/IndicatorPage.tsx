import type { ReactNode } from 'react'
import { Droplets, Lock, MessageSquareText } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const statusColors = [
  { name: 'Primary', className: 'status-primary' },
  { name: 'Secondary', className: 'status-secondary' },
  { name: 'Accent', className: 'status-accent' },
  { name: 'Info', className: 'status-info' },
  { name: 'Success', className: 'status-success' },
  { name: 'Warning', className: 'status-warning' },
  { name: 'Error', className: 'status-error' },
] as const

const badgeColors = [
  { name: 'Primary', className: 'badge-primary' },
  { name: 'Secondary', className: 'badge-secondary' },
  { name: 'Accent', className: 'badge-accent' },
  { name: 'Info', className: 'badge-info' },
  { name: 'Success', className: 'badge-success' },
  { name: 'Warning', className: 'badge-warning' },
  { name: 'Error', className: 'badge-error' },
] as const

const positions = [
  {
    name: 'Top start',
    className: 'indicator-item indicator-top indicator-start',
  },
  {
    name: 'Top center',
    className: 'indicator-item indicator-top indicator-center',
  },
  {
    name: 'Top end',
    className: 'indicator-item indicator-top indicator-end',
  },
  {
    name: 'Middle start',
    className: 'indicator-item indicator-middle indicator-start',
  },
  {
    name: 'Middle center',
    className: 'indicator-item indicator-middle indicator-center',
  },
  {
    name: 'Middle end',
    className: 'indicator-item indicator-middle indicator-end',
  },
  {
    name: 'Bottom start',
    className: 'indicator-item indicator-bottom indicator-start',
  },
  {
    name: 'Bottom center',
    className: 'indicator-item indicator-bottom indicator-center',
  },
  {
    name: 'Bottom end',
    className: 'indicator-item indicator-bottom indicator-end',
  },
] as const

const picsum = (id: number, size = 160) =>
  `https://picsum.photos/id/${id}/${size}/${size}`

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
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'indicator'}
    </code>
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
    <div className="flex flex-col items-center gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function ContentBox({ label = 'content' }: { label?: string }) {
  return (
    <div className="grid h-24 w-24 place-items-center rounded-box bg-base-300 text-sm sm:h-28 sm:w-28">
      {label}
    </div>
  )
}

export default function IndicatorPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Indicator
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">indicator</span> pins a
          badge or status dot on buttons, avatars, inputs, and studio chrome.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Badge and status dots"
          description="Place indicator-item before the main content. Default is top end."
        >
          <div className="flex flex-wrap items-end justify-center gap-8 sm:justify-start">
            <Sample label="indicator + badge badge-primary">
              <div className="indicator">
                <span className="indicator-item badge badge-primary cursor-default">
                  New
                </span>
                <ContentBox />
              </div>
            </Sample>
            <Sample label="indicator + status status-success">
              <div className="indicator">
                <span
                  className="indicator-item status status-success cursor-default"
                  aria-label="Online"
                />
                <ContentBox />
              </div>
            </Sample>
            <Sample label="indicator + badge on button">
              <div className="indicator">
                <span className="indicator-item badge badge-secondary cursor-default">
                  12
                </span>
                <button type="button" className="btn cursor-pointer">
                  Inbox
                </button>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="02 · Positions"
          title="Placement grid"
          description="Combine horizontal and vertical placement classes on indicator-item."
          panel="wash-panel-ochre"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {positions.map((p) => (
              <Sample key={p.name} label={p.className}>
                <div className="indicator">
                  <span
                    className={`${p.className} badge badge-secondary cursor-default`}
                    aria-hidden
                  />
                  <ContentBox label={p.name} />
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · All corners"
          title="Multiple indicators"
          description="Stack several indicator-item nodes on one container."
        >
          <Sample label="nine indicator-item placements">
            <div className="indicator">
              <span className="indicator-item indicator-top indicator-start badge cursor-default">
                NW
              </span>
              <span className="indicator-item indicator-top indicator-center badge cursor-default">
                N
              </span>
              <span className="indicator-item indicator-top indicator-end badge cursor-default">
                NE
              </span>
              <span className="indicator-item indicator-middle indicator-start badge cursor-default">
                W
              </span>
              <span className="indicator-item indicator-middle indicator-center badge cursor-default">
                ·
              </span>
              <span className="indicator-item indicator-middle indicator-end badge cursor-default">
                E
              </span>
              <span className="indicator-item indicator-bottom indicator-start badge cursor-default">
                SW
              </span>
              <span className="indicator-item indicator-bottom indicator-center badge cursor-default">
                S
              </span>
              <span className="indicator-item indicator-bottom indicator-end badge cursor-default">
                SE
              </span>
              <div className="grid h-32 w-full max-w-xs place-items-center rounded-box bg-base-300 text-sm sm:w-60">
                Box
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="04 · Status colors"
          title="Semantic status dots"
          description="status with brand and feedback colors on the indicator corner."
          panel="wash-panel-rose"
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            {statusColors.map((c) => (
              <Sample
                key={c.name}
                label={`indicator-item status ${c.className}`}
              >
                <div className="indicator">
                  <span
                    className={`indicator-item status cursor-default ${c.className}`}
                    aria-label={c.name}
                  />
                  <ContentBox label={c.name} />
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Badge colors"
          title="Semantic badge indicators"
          description="badge colors for counts and labels on the same placement."
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            {badgeColors.map((c) => (
              <Sample
                key={c.name}
                label={`indicator-item badge ${c.className}`}
              >
                <div className="indicator">
                  <span
                    className={`indicator-item badge cursor-default ${c.className}`}
                  >
                    {c.name.slice(0, 1)}
                  </span>
                  <ContentBox />
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="06 · With avatar"
          title="Avatar indicators"
          description="Combine avatar and indicator for presence or role labels."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end justify-center gap-8 sm:justify-start">
            <Sample label="avatar indicator + badge">
              <div className="avatar indicator">
                <span className="indicator-item badge badge-secondary cursor-default">
                  Lead
                </span>
                <div className="h-20 w-20 rounded-lg">
                  <img
                    src={picsum(64)}
                    alt="Studio artist portrait with role badge"
                  />
                </div>
              </div>
            </Sample>
            <Sample label="avatar indicator + status-success">
              <div className="avatar indicator">
                <span
                  className="indicator-item status status-success cursor-default"
                  aria-label="Online"
                />
                <div className="w-20 rounded-full">
                  <img
                    src={picsum(65)}
                    alt="Studio artist portrait, online status"
                  />
                </div>
              </div>
            </Sample>
            <Sample label="avatar indicator + badge-error">
              <div className="avatar indicator">
                <span className="indicator-item badge badge-error badge-xs cursor-default">
                  !
                </span>
                <div className="w-16 rounded-full">
                  <img
                    src={picsum(91)}
                    alt="Studio artist portrait with alert badge"
                  />
                </div>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="07 · With button"
          title="Button indicators"
          description="Unread counts and soft badges on interactive controls."
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            <Sample label="indicator + btn">
              <div className="indicator">
                <span className="indicator-item badge badge-secondary cursor-default">
                  12
                </span>
                <button type="button" className="btn cursor-pointer">
                  Critiques
                </button>
              </div>
            </Sample>
            <Sample label="indicator + btn btn-primary">
              <div className="indicator">
                <span className="indicator-item badge badge-accent cursor-default">
                  3
                </span>
                <button type="button" className="btn btn-primary cursor-pointer">
                  Series
                </button>
              </div>
            </Sample>
            <Sample label="indicator + btn btn-ghost btn-square">
              <div className="tooltip tooltip-primary" data-tip="Messages">
                <div className="indicator">
                  <span className="indicator-item badge badge-error badge-xs cursor-default">
                    5
                  </span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-square btn-primary cursor-pointer"
                    aria-label="Messages"
                  >
                    <MessageSquareText className="size-5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="08 · With input"
          title="Input indicators"
          description="Required or hint badges anchored to form fields."
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end">
            <Sample label="indicator + input + badge">
              <div className="indicator w-full max-w-xs">
                <span className="indicator-item badge cursor-default">
                  Required
                </span>
                <input
                  type="email"
                  placeholder="Studio email"
                  className="input w-full cursor-text"
                />
              </div>
            </Sample>
            <Sample label="indicator-bottom + badge-info">
              <div className="indicator w-full max-w-xs">
                <span className="indicator-item indicator-bottom badge badge-info badge-sm cursor-default">
                  Hint
                </span>
                <input
                  type="text"
                  placeholder="Plate title"
                  className="input w-full cursor-text"
                />
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="09 · Studio"
          title="Menzies Design patterns"
          description="Unread critique count, layer lock, and brush wet state."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Sample label="unread critiques">
              <div className="indicator">
                <span className="indicator-item badge badge-error cursor-default">
                  4
                </span>
                <button type="button" className="btn cursor-pointer gap-2">
                  <MessageSquareText className="size-4" strokeWidth={2} />
                  Critiques
                </button>
              </div>
            </Sample>
            <Sample label="layer lock">
              <div className="indicator">
                <span
                  className="indicator-item status status-warning cursor-default"
                  aria-label="Locked"
                />
                <div className="flex items-center gap-3 rounded-box border border-ink-border bg-base-200 px-4 py-3">
                  <div className="tooltip tooltip-warning" data-tip="Layer locked">
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-warning btn-sm cursor-pointer"
                      aria-label="Layer locked"
                    >
                      <Lock className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Wash layer B</p>
                    <p className="text-xs text-ink-muted">Locked for export</p>
                  </div>
                </div>
              </div>
            </Sample>
            <Sample label="brush wet">
              <div className="indicator">
                <span className="indicator-item badge badge-info badge-sm cursor-default">
                  Wet
                </span>
                <div className="flex items-center gap-3 rounded-box border border-ink-border bg-base-200 px-4 py-3">
                  <div className="tooltip tooltip-info" data-tip="Brush wetness">
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-info btn-sm cursor-pointer"
                      aria-label="Brush wetness"
                    >
                      <Droplets className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Round 6</p>
                    <p className="text-xs text-ink-muted">Keep tip damp</p>
                  </div>
                </div>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="10 · Responsive"
          title="Breakpoint placement"
          description="Resize the viewport: start, then middle, bottom, center, end."
          panel="wash-panel-ochre"
        >
          <Sample label="indicator-start sm:middle md:bottom lg:center xl:end">
            <div className="indicator">
              <span
                className="indicator-item indicator-start badge badge-secondary sm:indicator-middle md:indicator-bottom lg:indicator-center xl:indicator-end cursor-default"
                aria-hidden
              />
              <div className="grid h-28 w-full max-w-xs place-items-center rounded-box bg-base-300 px-4 text-center text-sm sm:h-32">
                Resize to move the badge
              </div>
            </div>
          </Sample>
        </Section>
      </div>
    </>
  )
}
