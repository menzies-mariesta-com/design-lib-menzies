import { useState, type CSSProperties, type ReactNode } from 'react'
import {
  Clock,
  Droplets,
  Layers,
  Paintbrush,
  Palette,
  Sparkles,
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
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

const masonryCards = [
  {
    id: 'cerulean',
    title: 'Cerulean wash',
    body: 'Cool sky field for coastal plates. Keep edges soft.',
    height: 'min-h-28',
    panel: 'wash-panel-blue',
  },
  {
    id: 'sienna',
    title: 'Raw sienna',
    body: 'Warm ground layer. Useful under fog and sand.',
    height: 'min-h-40',
    panel: 'wash-panel-ochre',
  },
  {
    id: 'madder',
    title: 'Rose madder',
    body: 'Quiet accent for dusk edges and bloom notes.',
    height: 'min-h-24',
    panel: 'wash-panel-rose',
  },
  {
    id: 'payne',
    title: 'Payne grey',
    body: 'Ink weight for cliffs and shadow bands without heavy black.',
    height: 'min-h-36',
    panel: '',
  },
  {
    id: 'sap',
    title: 'Sap green',
    body: 'Tide vegetation. Thin, then glaze.',
    height: 'min-h-32',
    panel: '',
  },
  {
    id: 'violet',
    title: 'Cobalt violet',
    body: 'Evening bloom. Pair with cerulean, not ochre.',
    height: 'min-h-44',
    panel: 'wash-panel-rose',
  },
  {
    id: 'fog',
    title: 'Fog plate',
    body: 'Low contrast wash. Hierarchy from type, not pigment.',
    height: 'min-h-28',
    panel: 'wash-panel-blue',
  },
  {
    id: 'critique',
    title: 'Critique note',
    body: 'Hold back chroma on the second pass.',
    height: 'min-h-36',
    panel: 'wash-panel-ochre',
  },
] as const

function InteractiveBento() {
  const [active, setActive] = useState<string | null>('hero')

  const tiles = [
    {
      id: 'hero',
      label: 'col-span-2 row-span-2',
      className: 'md:col-span-2 md:row-span-2',
      title: 'Studio desk',
      body: 'Open washes, drying plates, and critique queue in one planned span.',
      icon: Palette,
      panel: 'wash-panel-blue',
    },
    {
      id: 'water',
      label: 'col-span-1',
      className: '',
      title: 'Water',
      body: '62% load',
      icon: Droplets,
      panel: '',
    },
    {
      id: 'brush',
      label: 'col-span-1',
      className: '',
      title: 'Brush',
      body: 'Round 8',
      icon: Paintbrush,
      panel: 'wash-panel-ochre',
    },
    {
      id: 'layers',
      label: 'col-span-1 md:col-span-2',
      className: 'md:col-span-2',
      title: 'Layer stack',
      body: 'Three wet layers. One dry glaze waiting.',
      icon: Layers,
      panel: 'wash-panel-rose',
    },
  ] as const

  return (
    <Sample label="grid + col-span / row-span · click to highlight">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-3 md:gap-4">
        {tiles.map((tile) => {
          const Icon = tile.icon
          const selected = active === tile.id
          return (
            <button
              key={tile.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(tile.id)}
              className={`wash-panel paper-grain cursor-pointer p-4 text-left transition-[box-shadow,transform] duration-300 motion-reduce:transition-none motion-reduce:transform-none ${tile.panel} ${tile.className} ${
                selected
                  ? 'ring-2 ring-primary shadow-md scale-[1.01] motion-reduce:scale-100'
                  : 'hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-lg font-semibold">{tile.title}</p>
                <Icon className="size-4 shrink-0 text-base-content/70" strokeWidth={2} />
              </div>
              <p className="mt-2 text-sm text-ink-muted">{tile.body}</p>
              <ClassLabel value={tile.label} />
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-sm text-ink-muted" aria-live="polite">
        Selected: {tiles.find((t) => t.id === active)?.title ?? 'none'}
      </p>
    </Sample>
  )
}

function InteractiveMasonry() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <Sample label="columns-1 md:columns-2 xl:columns-3 · break-inside-avoid">
      <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
        {masonryCards.map((card, index) => {
          const selected = active === card.id
          return (
            <button
              key={card.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(card.id === active ? null : card.id)}
              className={`mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer p-4 text-left transition-[box-shadow,opacity] duration-300 motion-reduce:transition-none soak-in motion-reduce:animate-none ${card.panel} ${card.height} ${
                selected
                  ? 'ring-2 ring-secondary shadow-md'
                  : 'hover:shadow-sm'
              }`}
              style={
                {
                  animationDelay: `${Math.min(index, 6) * 40}ms`,
                } as CSSProperties
              }
            >
              <p className="font-display text-base font-semibold">{card.title}</p>
              <p className="mt-2 text-sm text-ink-muted">{card.body}</p>
            </button>
          )
        })}
      </div>
      <p className="mt-1 text-sm text-ink-muted" aria-live="polite">
        {active
          ? `Focused pigment: ${masonryCards.find((c) => c.id === active)?.title}`
          : 'Click a pigment card to focus it.'}
      </p>
    </Sample>
  )
}

export default function BentoMasonryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Bento / Masonry
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Layout galleries for Menzies Design desks. Bento uses planned grid spans.
          Masonry packs staggered heights with CSS columns. Built with Tailwind
          and daisyUI cards, no extra layout library.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Bento"
          title="Asymmetric studio grid"
          description="Hero tile plus smaller metric tiles. Spans are intentional, not flow-packed."
        >
          <Sample label="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[7.5rem]">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:auto-rows-[7.5rem] md:gap-4">
              <div className="wash-panel wash-panel-blue paper-grain flex flex-col justify-between p-5 md:col-span-2 md:row-span-2">
                <div>
                  <p className="label-ink">Hero tile</p>
                  <h3 className="font-display mt-1 text-2xl font-semibold">
                    Menzies Design desk
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-ink-muted">
                    Planned span for the primary plate: title, status, and one
                    clear action.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button type="button" className="btn btn-primary btn-sm cursor-pointer">
                    Open series
                  </button>
                  <ClassLabel value="md:col-span-2 md:row-span-2" />
                </div>
              </div>

              <div className="stats cursor-default bg-base-100 shadow-sm md:col-span-2">
                <div className="stat place-items-start py-3">
                  <div className="stat-figure text-primary">
                    <Droplets className="size-5" strokeWidth={2} />
                  </div>
                  <div className="stat-title">Washes</div>
                  <div className="stat-value text-2xl">48</div>
                  <div className="stat-desc">This week</div>
                </div>
                <div className="stat place-items-start py-3">
                  <div className="stat-figure text-secondary">
                    <Clock className="size-5" strokeWidth={2} />
                  </div>
                  <div className="stat-title">Drying</div>
                  <div className="stat-value text-2xl">6</div>
                  <div className="stat-desc">In tray</div>
                </div>
              </div>

              <div className="card card-border bg-base-100 md:col-span-1">
                <div className="card-body gap-2 p-4">
                  <Paintbrush className="size-4 text-base-content/70" strokeWidth={2} />
                  <h3 className="card-title font-display text-base">Brushes</h3>
                  <p className="text-sm text-ink-muted">12 ready</p>
                  <ClassLabel value="md:col-span-1" />
                </div>
              </div>

              <div className="card card-border bg-base-100 md:col-span-1">
                <div className="card-body gap-2 p-4">
                  <Layers className="size-4 text-base-content/70" strokeWidth={2} />
                  <h3 className="card-title font-display text-base">Layers</h3>
                  <p className="text-sm text-ink-muted">Stack of 4</p>
                  <ClassLabel value="md:col-span-1" />
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm md:col-span-2">
                <div className="card-body flex-row items-center gap-4 p-4">
                  <Sparkles className="size-5 shrink-0 text-accent" strokeWidth={2} />
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold">
                      Critique queue
                    </h3>
                    <p className="text-sm text-ink-muted">
                      Three plates waiting. Wide span for a list cue.
                    </p>
                  </div>
                  <ClassLabel value="md:col-span-2" />
                </div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Masonry"
          title="Staggered pigment columns"
          description="CSS columns flow cards by height. Uneven min-heights create the masonry rhythm."
          panel="wash-panel-ochre"
        >
          <Sample label="columns-1 sm:columns-2 lg:columns-3 · break-inside-avoid">
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {masonryCards.map((card) => (
                <div
                  key={card.id}
                  className={`mb-4 break-inside-avoid card card-border bg-base-100 ${card.height}`}
                >
                  <div className={`card-body p-4 ${card.panel}`}>
                    <h3 className="card-title font-display text-base">{card.title}</h3>
                    <p className="text-sm text-ink-muted">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="03 · Sizes / density"
          title="Gap and column density"
          description="Tighten or open the packing without changing tile content."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <Sample label="gap-2 · columns-2">
              <div className="columns-2 gap-2">
                {masonryCards.slice(0, 4).map((card) => (
                  <div
                    key={`tight-${card.id}`}
                    className="mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3"
                  >
                    <p className="text-sm font-semibold">{card.title}</p>
                    <p className="mt-1 text-xs text-ink-muted">Tight density</p>
                  </div>
                ))}
              </div>
            </Sample>
            <Sample label="gap-4 · columns-2">
              <div className="columns-2 gap-4">
                {masonryCards.slice(0, 4).map((card) => (
                  <div
                    key={`mid-${card.id}`}
                    className="mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3"
                  >
                    <p className="text-sm font-semibold">{card.title}</p>
                    <p className="mt-1 text-xs text-ink-muted">Comfort density</p>
                  </div>
                ))}
              </div>
            </Sample>
            <Sample label="gap-6 · columns-2">
              <div className="columns-2 gap-6">
                {masonryCards.slice(0, 4).map((card) => (
                  <div
                    key={`loose-${card.id}`}
                    className="mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4"
                  >
                    <p className="text-sm font-semibold">{card.title}</p>
                    <p className="mt-1 text-xs text-ink-muted">Loose density</p>
                  </div>
                ))}
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="04 · Interactive"
          title="Click to highlight"
          description="Local selection only. Tiles feel navigational without routing."
          panel="wash-panel-rose"
        >
          <InteractiveBento />
        </Section>

        <Section
          eyebrow="05 · Interactive masonry"
          title="Focus a pigment card"
          description="Same click pattern on column-packed cards. Stagger uses soak-in; reduced motion keeps them static."
        >
          <InteractiveMasonry />
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Single column on mobile"
          description="Bento collapses to one column under md. Masonry uses columns-1 until sm or xl breakpoints."
          panel="wash-panel-blue"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Sample label="grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <div className="rounded-box bg-base-200 p-4 md:col-span-2">
                  <p className="font-display font-semibold">Wide on desktop</p>
                  <p className="mt-1 text-sm text-ink-muted">Full width on mobile</p>
                </div>
                <div className="rounded-box bg-base-200 p-4">
                  <p className="font-display font-semibold">Side</p>
                  <p className="mt-1 text-sm text-ink-muted">Stacks below</p>
                </div>
                <div className="rounded-box bg-base-200 p-4 md:col-span-3">
                  <p className="font-display font-semibold">Footer span</p>
                  <p className="mt-1 text-sm text-ink-muted">md:col-span-3</p>
                </div>
              </div>
            </Sample>
            <Sample label="columns-1 xl:columns-3">
              <div className="columns-1 gap-3 xl:columns-3">
                {['Fog', 'Sand', 'Cliff'].map((name) => (
                  <div
                    key={name}
                    className="mb-3 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3"
                  >
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      One column until xl
                    </p>
                  </div>
                ))}
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="07 · Bento vs masonry"
          title="How they differ"
          description="Choose the model that matches the desk: planned hierarchy or flowing packs."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-box border border-ink-border bg-base-100 p-5">
              <p className="label-ink">Bento</p>
              <h3 className="font-display mt-1 text-lg font-semibold">
                Planned spans
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                You assign <span className="font-mono text-xs">col-span</span>{' '}
                and <span className="font-mono text-xs">row-span</span>. Hero
                tiles stay dominant. Gaps are even. Best for dashboards and
                feature desks.
              </p>
              <ClassLabel value="CSS Grid · explicit spans" />
            </div>
            <div className="rounded-box border border-ink-border bg-base-100 p-5">
              <p className="label-ink">Masonry</p>
              <h3 className="font-display mt-1 text-lg font-semibold">
                Flow packing
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                Cards keep natural heights. Columns pack top-to-bottom, then
                across. Order follows source, not a fixed map. Best for pigment
                libraries and note walls.
              </p>
              <ClassLabel value="CSS columns · break-inside-avoid" />
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
