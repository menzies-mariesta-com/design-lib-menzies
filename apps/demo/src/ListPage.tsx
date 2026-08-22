import { useState, type ReactNode } from 'react'
import {
  Droplets,
  Eye,
  Heart,
  Layers,
  Paintbrush,
  Pencil,
  Play,
  Trash2,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const songs = [
  {
    artist: 'Mira K.',
    track: 'Harbor dawn',
    blurb:
      'Soft cerulean wash over warm paper. Quiet hierarchy, no extra pigment.',
    color: 'bg-wash-blue',
    initials: 'MK',
  },
  {
    artist: 'Jon L.',
    track: 'Ochre cliff',
    blurb:
      'Dry-brush edges and earth tones. A study in warm restraint.',
    color: 'bg-wash-ochre',
    initials: 'JL',
  },
  {
    artist: 'Ada R.',
    track: 'Rose bloom',
    blurb:
      'Petal glazes layered wet-on-wet until the paper sings.',
    color: 'bg-wash-rose',
    initials: 'AR',
  },
] as const

const iconRows = [
  {
    name: 'Cerulean wash',
    hint: 'Cool undertone',
    Icon: Droplets,
    badge: 'Ready',
    badgeClass: 'badge-info',
  },
  {
    name: 'Ochre glaze',
    hint: 'Warm earth',
    Icon: Paintbrush,
    badge: 'Drying',
    badgeClass: 'badge-warning',
  },
  {
    name: 'Rose bloom',
    hint: 'Floral series',
    Icon: Layers,
    badge: 'Queued',
    badgeClass: 'badge-ghost',
  },
] as const

type PigmentStatus = 'Ready' | 'Drying' | 'Queued'

type PigmentRow = {
  id: string
  name: string
  series: string
  wash: string
  status: PigmentStatus
}

const pigmentSeed: PigmentRow[] = [
  {
    id: 'p1',
    name: "Payne's gray",
    series: 'Mist bank',
    wash: 'bg-wash-blue',
    status: 'Ready',
  },
  {
    id: 'p2',
    name: 'Raw sienna',
    series: 'Warm earth',
    wash: 'bg-wash-ochre',
    status: 'Drying',
  },
  {
    id: 'p3',
    name: 'Alizarin lake',
    series: 'Florals',
    wash: 'bg-wash-rose',
    status: 'Queued',
  },
  {
    id: 'p4',
    name: 'Ultramarine',
    series: 'Coastal',
    wash: 'bg-wash-blue',
    status: 'Ready',
  },
]

const statusBadge: Record<PigmentStatus, string> = {
  Ready: 'badge-success',
  Drying: 'badge-warning',
  Queued: 'badge-ghost',
}

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
      {value || 'list'}
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
    <div className="flex flex-col gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function Avatar({
  color,
  initials,
}: {
  color: string
  initials: string
}) {
  return (
    <div className="avatar avatar-placeholder">
      <div
        className={`size-10 rounded-box ${color} text-sm font-semibold text-base-content`}
      >
        <span>{initials}</span>
      </div>
    </div>
  )
}

function StudioPigmentsList() {
  const [items, setItems] = useState(pigmentSeed)
  const [activeId, setActiveId] = useState(pigmentSeed[0].id)

  function cycleStatus(id: string) {
    setItems((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row
        const next: PigmentStatus =
          row.status === 'Ready'
            ? 'Drying'
            : row.status === 'Drying'
              ? 'Queued'
              : 'Ready'
        return { ...row, status: next }
      }),
    )
  }

  function removeItem(id: string) {
    const remaining = items.filter((row) => row.id !== id)
    setItems(remaining)
    setActiveId((current) =>
      current === id ? (remaining[0]?.id ?? '') : current,
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Select a pigment row. Cycle status or remove a wash from the desk.
      </p>
      <ul className="list w-full max-w-2xl rounded-box border border-ink-border bg-base-100 shadow-sm">
        <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
          Studio pigments
        </li>
        {items.length === 0 ? (
          <li className="list-row text-sm text-ink-muted">
            No pigments on the desk. Refresh to restore the sample set.
          </li>
        ) : (
          items.map((row) => {
            const isActive = row.id === activeId
            return (
              <li
                key={row.id}
                role="button"
                tabIndex={0}
                className={`list-row cursor-pointer transition-colors hover:bg-primary/40 ${
                  isActive ? 'bg-primary/20' : ''
                }`}
                onClick={() => setActiveId(row.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveId(row.id)
                  }
                }}
              >
                <div
                  className={`size-10 shrink-0 rounded-box border border-ink-border ${row.wash}`}
                  aria-hidden
                />
                <div className="list-col-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{row.name}</span>
                    <span className={`badge badge-sm ${statusBadge[row.status]}`}>
                      {row.status}
                    </span>
                    {isActive ? (
                      <span className="badge badge-sm badge-primary">Active</span>
                    ) : null}
                  </div>
                  <div className="text-xs opacity-60">{row.series}</div>
                </div>
                <div
                  className="tooltip tooltip-left tooltip-secondary"
                  data-tip="Cycle status"
                >
                  <button
                    type="button"
                    className="btn btn-ghost btn-square btn-secondary cursor-pointer"
                    aria-label="Cycle status"
                    onClick={(e) => {
                      e.stopPropagation()
                      cycleStatus(row.id)
                    }}
                  >
                    <Droplets className="size-4" strokeWidth={2} />
                  </button>
                </div>
                <div
                  className="tooltip tooltip-left tooltip-error"
                  data-tip="Remove"
                >
                  <button
                    type="button"
                    className="btn btn-ghost btn-square btn-error cursor-pointer"
                    aria-label="Remove"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeItem(row.id)
                    }}
                  >
                    <Trash2 className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </li>
            )
          })
        )}
      </ul>
      <ClassLabel value="list-row · cursor-pointer · hover:bg-primary/40 · active bg-primary/20" />
    </div>
  )
}

export default function ListPage() {
  const [hoverDemoActive, setHoverDemoActive] = useState(1)

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          List
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">list</span> rows with
          figures, badges, actions,{' '}
          <span className="font-mono text-xs">list-col-grow</span>,{' '}
          <span className="font-mono text-xs">list-col-wrap</span>, hover, and
          an interactive studio pigment desk.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="list + list-row"
          description="Vertical flex shell with horizontal grid rows. Second child grows by default."
        >
          <Sample label="list + list-row">
            <ul className="list max-w-md rounded-box border border-ink-border bg-base-100 shadow-sm">
              <li className="list-row">
                <div className="font-medium">Cerulean wash</div>
              </li>
              <li className="list-row">
                <div className="font-medium">Ochre glaze</div>
              </li>
              <li className="list-row">
                <div className="font-medium">Rose bloom</div>
              </li>
            </ul>
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Header"
          title="Section label row"
          description="A plain li ahead of list-row items for a quiet group title."
          panel="wash-panel-ochre"
        >
          <Sample label="list + header li + list-row">
            <ul className="list max-w-md rounded-box border border-ink-border bg-base-100 shadow-sm">
              <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                Most played plates this week
              </li>
              {songs.map((s) => (
                <li key={s.track} className="list-row">
                  <div className="font-medium">{s.track}</div>
                </li>
              ))}
            </ul>
          </Sample>
        </Section>

        <Section
          eyebrow="03 · Icons, avatars, badges"
          title="Figures and status chips"
          description="Lucide icons, avatar placeholders, and badge chips beside growing titles."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Sample label="list-row + Lucide icon + badge">
              <ul className="list rounded-box border border-ink-border bg-base-100 shadow-sm">
                <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                  Wash queue
                </li>
                {iconRows.map((row) => (
                  <li key={row.name} className="list-row">
                    <row.Icon
                      className="size-5 text-base-content/80"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <div>
                      <div className="font-medium">{row.name}</div>
                      <div className="text-xs opacity-60">{row.hint}</div>
                    </div>
                    <span className={`badge badge-sm ${row.badgeClass}`}>
                      {row.badge}
                    </span>
                  </li>
                ))}
              </ul>
            </Sample>

            <Sample label="list-row + avatar + badge">
              <ul className="list rounded-box border border-ink-border bg-base-100 shadow-sm">
                <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                  Studio roster
                </li>
                {songs.map((s, i) => (
                  <li key={s.artist} className="list-row">
                    <Avatar color={s.color} initials={s.initials} />
                    <div>
                      <div className="font-medium">{s.artist}</div>
                      <div className="text-xs font-semibold uppercase opacity-60">
                        {s.track}
                      </div>
                    </div>
                    <span
                      className={`badge badge-sm ${
                        i === 0 ? 'badge-primary' : 'badge-ghost'
                      }`}
                    >
                      {i === 0 ? 'Lead' : 'Bench'}
                    </span>
                  </li>
                ))}
              </ul>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="04 · Titles and descriptions"
          title="Second column grows (default)"
          description="Title plus muted subtitle. The second child fills remaining space."
          panel="wash-panel-rose"
        >
          <Sample label="list-row (2nd child grows)">
            <ul className="list max-w-lg rounded-box border border-ink-border bg-base-100 shadow-sm">
              <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                Most played songs this week
              </li>
              {songs.map((s) => (
                <li key={s.track} className="list-row">
                  <Avatar color={s.color} initials={s.initials} />
                  <div>
                    <div className="font-medium">{s.artist}</div>
                    <div className="text-xs font-semibold uppercase opacity-60">
                      {s.track}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Sample>
        </Section>

        <Section
          eyebrow="05 · Actions"
          title="Icon actions on the trailing edge"
          description="Ghost square buttons with matching tooltips. Prefer tooltip-left so tips stay in view."
        >
          <Sample label="list-row + btn-square actions">
            <ul className="list max-w-xl rounded-box border border-ink-border bg-base-100 shadow-sm">
              <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                Most played songs this week
              </li>
              {songs.map((s) => (
                <li key={s.track} className="list-row">
                  <Avatar color={s.color} initials={s.initials} />
                  <div>
                    <div className="font-medium">{s.artist}</div>
                    <div className="text-xs font-semibold uppercase opacity-60">
                      {s.track}
                    </div>
                  </div>
                  <div
                    className="tooltip tooltip-left tooltip-primary"
                    data-tip="Play"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-primary cursor-pointer"
                      aria-label="Play"
                    >
                      <Play className="size-[1.2em]" strokeWidth={2} />
                    </button>
                  </div>
                  <div
                    className="tooltip tooltip-left tooltip-accent"
                    data-tip="Favorite"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-accent cursor-pointer"
                      aria-label="Favorite"
                    >
                      <Heart className="size-[1.2em]" strokeWidth={2} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Sample>
        </Section>

        <Section
          eyebrow="06 · list-col-grow"
          title="Third column grows"
          description="Index + figure + growing title block. list-col-grow moves fill to another child."
          panel="wash-panel-ochre"
        >
          <Sample label="list-col-grow">
            <ul className="list max-w-xl rounded-box border border-ink-border bg-base-100 shadow-sm">
              <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                Most played songs this week
              </li>
              {songs.map((s, i) => (
                <li key={s.track} className="list-row">
                  <div className="text-4xl font-thin tabular-nums opacity-30">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <Avatar color={s.color} initials={s.initials} />
                  <div className="list-col-grow">
                    <div className="font-medium">{s.artist}</div>
                    <div className="text-xs font-semibold uppercase opacity-60">
                      {s.track}
                    </div>
                  </div>
                  <div
                    className="tooltip tooltip-left tooltip-primary"
                    data-tip="Play"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-primary cursor-pointer"
                      aria-label="Play"
                    >
                      <Play className="size-[1.2em]" strokeWidth={2} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Sample>
        </Section>

        <Section
          eyebrow="07 · list-col-wrap"
          title="Description wraps to next line"
          description="list-col-wrap pushes a child onto the next grid row for longer copy."
          panel="wash-panel-rose"
        >
          <Sample label="list-col-wrap">
            <ul className="list max-w-xl rounded-box border border-ink-border bg-base-100 shadow-sm">
              <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                Most played songs this week
              </li>
              {songs.map((s) => (
                <li key={s.track} className="list-row">
                  <Avatar color={s.color} initials={s.initials} />
                  <div>
                    <div className="font-medium">{s.artist}</div>
                    <div className="text-xs font-semibold uppercase opacity-60">
                      {s.track}
                    </div>
                  </div>
                  <p className="list-col-wrap text-xs text-ink-muted">{s.blurb}</p>
                  <div
                    className="tooltip tooltip-left tooltip-primary"
                    data-tip="Play"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-primary cursor-pointer"
                      aria-label="Play"
                    >
                      <Play className="size-[1.2em]" strokeWidth={2} />
                    </button>
                  </div>
                  <div
                    className="tooltip tooltip-left tooltip-accent"
                    data-tip="Favorite"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-accent cursor-pointer"
                      aria-label="Favorite"
                    >
                      <Heart className="size-[1.2em]" strokeWidth={2} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Sample>
        </Section>

        <Section
          eyebrow="08 · Hover and active"
          title="Selectable list rows"
          description="cursor-pointer on rows, hover wash, and an active selection state. daisyUI list has no built-in hover class."
        >
          <Sample label="list-row · hover:bg-primary/40 · bg-primary/20">
            <ul className="list max-w-lg rounded-box border border-ink-border bg-base-100 shadow-sm">
              <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                Pick a plate
              </li>
              {songs.map((s, i) => {
                const isActive = hoverDemoActive === i
                return (
                  <li
                    key={s.track}
                    role="button"
                    tabIndex={0}
                    className={`list-row cursor-pointer transition-colors hover:bg-primary/40 ${
                      isActive ? 'bg-primary/20' : ''
                    }`}
                    onClick={() => setHoverDemoActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setHoverDemoActive(i)
                      }
                    }}
                  >
                    <Avatar color={s.color} initials={s.initials} />
                    <div className="list-col-grow">
                      <div className="font-medium">{s.track}</div>
                      <div className="text-xs opacity-60">{s.artist}</div>
                    </div>
                    {isActive ? (
                      <span className="badge badge-sm badge-primary">Active</span>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </Sample>
        </Section>

        <Section
          eyebrow="09 · Studio pigments"
          title="Interactive watercolor desk"
          description="Select a pigment, cycle its status, or remove it. Rows keep hover and active washes."
          panel="wash-panel-ochre"
        >
          <StudioPigmentsList />
        </Section>

        <Section
          eyebrow="10 · Surface variants"
          title="Bordered and soft shadow"
          description="daisyUI list has no size or bordered modifiers. Use Tailwind border, rounded-box, and shadow for presentation."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Sample label="list + border + rounded-box">
              <ul className="list rounded-box border border-ink-border bg-base-100">
                {songs.map((s) => (
                  <li key={`border-${s.track}`} className="list-row">
                    <div className="font-medium">{s.track}</div>
                  </li>
                ))}
              </ul>
            </Sample>
            <Sample label="list + bg-base-100 + shadow-md">
              <ul className="list rounded-box bg-base-100 shadow-md">
                {songs.map((s) => (
                  <li key={`soft-${s.track}`} className="list-row">
                    <div className="font-medium">{s.track}</div>
                  </li>
                ))}
              </ul>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="11 · Responsive"
          title="Two-up from md"
          description="Side-by-side lists on tablet and up. Stack on mobile to avoid horizontal scroll."
          panel="wash-panel-rose"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Sample label="list (md:grid-cols-2 left)">
              <ul className="list rounded-box border border-ink-border bg-base-100 shadow-sm">
                <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                  Cool washes
                </li>
                <li className="list-row cursor-pointer hover:bg-primary/40">
                  <Droplets className="size-4" strokeWidth={2} aria-hidden />
                  <div className="list-col-grow font-medium">Cerulean</div>
                  <span className="badge badge-sm badge-info">Cool</span>
                </li>
                <li className="list-row cursor-pointer hover:bg-primary/40">
                  <Droplets className="size-4" strokeWidth={2} aria-hidden />
                  <div className="list-col-grow font-medium">Ultramarine</div>
                  <span className="badge badge-sm badge-info">Cool</span>
                </li>
              </ul>
            </Sample>
            <Sample label="list (md:grid-cols-2 right)">
              <ul className="list rounded-box border border-ink-border bg-base-100 shadow-sm">
                <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                  Warm washes
                </li>
                <li className="list-row cursor-pointer hover:bg-primary/40">
                  <Paintbrush className="size-4" strokeWidth={2} aria-hidden />
                  <div className="list-col-grow font-medium">Raw sienna</div>
                  <span className="badge badge-sm badge-warning">Warm</span>
                </li>
                <li className="list-row cursor-pointer hover:bg-primary/40">
                  <Paintbrush className="size-4" strokeWidth={2} aria-hidden />
                  <div className="list-col-grow font-medium">Alizarin</div>
                  <span className="badge badge-sm badge-warning">Warm</span>
                </li>
              </ul>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="12 · CRUD actions"
          title="View, edit, delete"
          description="Semantic icon actions with matched tooltip colors for ledger-style rows."
        >
          <Sample label="list-row + view / edit / delete">
            <ul className="list max-w-xl rounded-box border border-ink-border bg-base-100 shadow-sm">
              <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                Plate ledger
              </li>
              {songs.map((s) => (
                <li key={s.track} className="list-row">
                  <Avatar color={s.color} initials={s.initials} />
                  <div className="list-col-grow">
                    <div className="font-medium">{s.track}</div>
                    <div className="text-xs opacity-60">{s.artist}</div>
                  </div>
                  <div
                    className="tooltip tooltip-left tooltip-primary"
                    data-tip="View"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-primary cursor-pointer"
                      aria-label="View"
                    >
                      <Eye className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div
                    className="tooltip tooltip-left tooltip-secondary"
                    data-tip="Edit"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-secondary cursor-pointer"
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div
                    className="tooltip tooltip-left tooltip-error"
                    data-tip="Delete"
                  >
                    <button
                      type="button"
                      className="btn btn-ghost btn-square btn-error cursor-pointer"
                      aria-label="Delete"
                    >
                      <Trash2 className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Sample>
        </Section>

        <Section
          eyebrow="13 · Class map"
          title="Components and modifiers"
          description="Official daisyUI list surface. No size or bordered modifiers on list."
          panel="wash-panel-ochre"
        >
          <div className="overflow-x-auto">
            <table className="table table-zebra table-sm [&_tbody_tr]:hover:bg-primary/40">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Type</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code className="font-mono text-xs">list</code>
                  </td>
                  <td>Component</td>
                  <td>Vertical flex shell for rows</td>
                </tr>
                <tr>
                  <td>
                    <code className="font-mono text-xs">list-row</code>
                  </td>
                  <td>Component</td>
                  <td>Horizontal grid item</td>
                </tr>
                <tr>
                  <td>
                    <code className="font-mono text-xs">list-col-grow</code>
                  </td>
                  <td>Modifier</td>
                  <td>Child fills remaining space</td>
                </tr>
                <tr>
                  <td>
                    <code className="font-mono text-xs">list-col-wrap</code>
                  </td>
                  <td>Modifier</td>
                  <td>Child wraps to next line</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            <ClassLabel value="list · list-row · list-col-grow · list-col-wrap" />
          </p>
        </Section>
      </div>
    </>
  )
}
