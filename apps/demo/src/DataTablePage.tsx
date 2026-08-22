import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Eye, Pencil, Trash2 } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import 'cally'
import {
  studioPlates,
  type PlateStatus,
  type StudioPlate,
} from './data/studio'
import { formatShortDate, formatShortDateTime } from './data/dates'

const PLATE_STATUSES: PlateStatus[] = [
  'Draft',
  'In wash',
  'Review',
  'Archived',
]

const ROW_H = 48

const variantRows = studioPlates.slice(0, 3)

function statusBadge(status: PlateStatus) {
  if (status === 'Review') return 'badge badge-soft badge-primary'
  if (status === 'In wash') return 'badge badge-soft badge-warning'
  if (status === 'Draft') return 'badge badge-soft badge-secondary'
  return 'badge badge-ghost'
}

function dayKey(iso: string): string {
  return iso.slice(0, 10)
}

function inDateRange(iso: string, range: string): boolean {
  if (!range.includes('/')) return true
  const [start = '', end = ''] = range.split('/')
  if (!start && !end) return true
  const day = dayKey(iso)
  if (start && day < start) return false
  if (end && day > end) return false
  return true
}

function rangeLabel(range: string): string {
  if (!range.includes('/')) return 'Any dates'
  const [start = '', end = ''] = range.split('/')
  if (!start && !end) return 'Any dates'
  if (start && end) {
    return `${formatShortDate(start)} to ${formatShortDate(end)}`
  }
  if (start) return `From ${formatShortDate(start)}`
  return `Through ${formatShortDate(end)}`
}

function NavIcons() {
  return (
    <>
      <svg
        aria-label="Previous"
        className="size-4 fill-current"
        slot="previous"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <svg
        aria-label="Next"
        className="size-4 fill-current"
        slot="next"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </>
  )
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
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          {title}
        </h2>
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

function DateRangeFilter({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (next: string) => void
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const [end, setEnd] = useState(false)
  const [top, setTop] = useState(false)

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = detailsRef.current
      if (!el?.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && detailsRef.current?.open) {
        detailsRef.current.open = false
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function measurePlacement() {
    const el = detailsRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const panelW = 288
    const panelH = 340
    setEnd(rect.left + panelW > window.innerWidth - 12)
    setTop(rect.bottom + panelH > window.innerHeight - 12)
  }

  return (
    <div className="flex flex-col gap-1 font-normal">
      <span className="font-bold">{label}</span>
      <details
        ref={detailsRef}
        className={`dropdown ${end ? 'dropdown-end' : ''} ${top ? 'dropdown-top' : ''}`}
        onToggle={(e) => {
          if ((e.target as HTMLDetailsElement).open) measurePlacement()
        }}
      >
        <summary
          className="btn btn-ghost btn-xs h-7 min-h-7 w-full max-w-[9.5rem] cursor-pointer justify-start border border-base-300 px-2 font-normal [&::-webkit-details-marker]:hidden"
          aria-label={`Filter ${label} by date range`}
        >
          <span className="truncate text-xs">{rangeLabel(value)}</span>
        </summary>
        <div className="dropdown-content z-50 mt-1 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)]">
          <calendar-range
            className="cally bg-base-100"
            value={value.includes('/') ? value : ''}
            onchange={(e) => {
              const next = (e.target as HTMLInputElement).value
              onChange(next)
            }}
          >
            <NavIcons />
            <calendar-month />
          </calendar-range>
          <div className="flex justify-end gap-1 border-t border-ink-border/60 p-1">
            <button
              type="button"
              className="btn btn-ghost btn-xs cursor-pointer"
              onClick={() => {
                onChange('')
                if (detailsRef.current) detailsRef.current.open = false
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </details>
    </div>
  )
}

function ActionButtons({ disabled = false }: { disabled?: boolean }) {
  const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  return (
    <div className="flex items-center gap-0.5">
      <div className="tooltip tooltip-primary tooltip-right" data-tip="View">
        <button
          type="button"
          className={`btn btn-ghost btn-square btn-xs btn-primary ${cursor}`}
          aria-label="View"
          disabled={disabled}
        >
          <Eye className="size-3.5" strokeWidth={2} />
        </button>
      </div>
      <div className="tooltip tooltip-secondary tooltip-right" data-tip="Edit">
        <button
          type="button"
          className={`btn btn-ghost btn-square btn-xs btn-secondary ${cursor}`}
          aria-label="Edit"
          disabled={disabled}
        >
          <Pencil className="size-3.5" strokeWidth={2} />
        </button>
      </div>
      <div className="tooltip tooltip-error tooltip-right" data-tip="Delete">
        <button
          type="button"
          className={`btn btn-ghost btn-square btn-xs btn-error ${cursor}`}
          aria-label="Delete"
          disabled={disabled}
        >
          <Trash2 className="size-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

function PlateLedgerTable({
  plates,
  forceEmpty = false,
  heightClass = 'h-[360px]',
}: {
  plates: StudioPlate[]
  forceEmpty?: boolean
  heightClass?: string
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [nameFilter, setNameFilter] = useState('')
  const [tagsFilter, setTagsFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'' | PlateStatus>('')
  const [createdRange, setCreatedRange] = useState('')
  const [updatedRange, setUpdatedRange] = useState('')

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return

    function measure() {
      if (!el) return
      setPageSize(Math.max(1, Math.floor(el.clientHeight / ROW_H)))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const filtered = useMemo(() => {
    if (forceEmpty) return []
    const nameQ = nameFilter.trim().toLowerCase()
    const tagsQ = tagsFilter.trim().toLowerCase()
    return plates.filter((row) => {
      if (nameQ && !row.name.toLowerCase().includes(nameQ)) return false
      if (tagsQ && !row.tags.some((t) => t.toLowerCase().includes(tagsQ))) {
        return false
      }
      if (statusFilter && row.status !== statusFilter) return false
      if (!inDateRange(row.created, createdRange)) return false
      if (!inDateRange(row.updated, updatedRange)) return false
      return true
    })
  }, [
    plates,
    nameFilter,
    tagsFilter,
    statusFilter,
    createdRange,
    updatedRange,
    forceEmpty,
  ])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)

  useEffect(() => {
    setPage(1)
  }, [nameFilter, tagsFilter, statusFilter, createdRange, updatedRange])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages, pageSize])

  const slice = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  )
  const from = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1
  const to = Math.min(safePage * pageSize, filtered.length)

  return (
    <div
      className={`border-base-300 rounded-box flex min-h-0 flex-col overflow-hidden border bg-base-100 ${heightClass}`}
    >
      <div ref={bodyRef} className="min-h-0 flex-1 overflow-auto">
        <div className="min-w-[52rem]">
          <table className="table table-zebra [&_tbody_tr]:hover:bg-primary/40">
            <thead className="bg-base-100 sticky top-0 z-10">
              <tr>
                <th className="w-28">Actions</th>
                <th className="w-12">No</th>
                <th>
                  <div className="flex flex-col gap-1 font-normal">
                    <span className="font-bold">Name</span>
                    <input
                      type="text"
                      className="input input-xs input-bordered w-full max-w-[10rem] cursor-text"
                      placeholder="Filter…"
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                      aria-label="Filter by name"
                    />
                  </div>
                </th>
                <th>
                  <div className="flex flex-col gap-1 font-normal">
                    <span className="font-bold">Tags</span>
                    <input
                      type="text"
                      className="input input-xs input-bordered w-full max-w-[8rem] cursor-text"
                      placeholder="Filter…"
                      value={tagsFilter}
                      onChange={(e) => setTagsFilter(e.target.value)}
                      aria-label="Filter by tags"
                    />
                  </div>
                </th>
                <th>
                  <div className="flex flex-col gap-1 font-normal">
                    <span className="font-bold">Status</span>
                    <select
                      className="select select-xs select-bordered w-full max-w-[7.5rem] cursor-pointer"
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(e.target.value as '' | PlateStatus)
                      }
                      aria-label="Filter by status"
                    >
                      <option value="">All</option>
                      {PLATE_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </th>
                <th>
                  <DateRangeFilter
                    label="Created"
                    value={createdRange}
                    onChange={setCreatedRange}
                  />
                </th>
                <th>
                  <DateRangeFilter
                    label="Updated"
                    value={updatedRange}
                    onChange={setUpdatedRange}
                  />
                </th>
                <th>
                  <span className="font-bold">Series</span>
                </th>
                <th>
                  <span className="font-bold">Washes</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {slice.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center text-sm text-ink-muted"
                  >
                    No plates match these filters.
                  </td>
                </tr>
              ) : (
                slice.map((row, i) => {
                  const no = (safePage - 1) * pageSize + i + 1
                  return (
                    <tr key={row.id}>
                      <td>
                        <ActionButtons />
                      </td>
                      <td className="font-mono text-xs tabular-nums">{no}</td>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-medium">{row.name}</span>
                          <span className="font-mono text-[0.65rem] text-ink-muted">
                            {row.id}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {row.tags.map((tag) => (
                            <span
                              key={tag}
                              className="badge badge-ghost badge-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className={statusBadge(row.status)}>
                          {row.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap font-mono text-xs text-ink-muted">
                        {formatShortDateTime(row.created)}
                      </td>
                      <td className="whitespace-nowrap font-mono text-xs text-ink-muted">
                        {formatShortDateTime(row.updated)}
                      </td>
                      <td className="text-sm">{row.series}</td>
                      <td className="tabular-nums text-sm">{row.washes}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-base-300 bg-base-100 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t px-3 py-2">
        <p className="font-mono text-xs text-ink-muted">
          Showing {from}-{to} of {filtered.length}
        </p>
        <div className="join">
          <button
            type="button"
            className={`btn btn-sm join-item ${
              safePage <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={`btn btn-sm join-item cursor-pointer ${
                n === safePage ? 'btn-active' : ''
              }`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className={`btn btn-sm join-item ${
              safePage >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            »
          </button>
        </div>
      </div>
    </div>
  )
}

function MiniVariantTable({
  className,
  bordered = false,
}: {
  className: string
  bordered?: boolean
}) {
  return (
    <div
      className={`overflow-x-auto ${
        bordered
          ? 'rounded-box border border-base-content/10 bg-base-100'
          : ''
      }`}
    >
      <table className={className}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {variantRows.map((row) => (
            <tr key={row.id}>
              <td className="font-medium">{row.name}</td>
              <td>
                <span className={statusBadge(row.status)}>{row.status}</span>
              </td>
              <td className="whitespace-nowrap text-sm text-ink-muted">
                {formatShortDateTime(row.updated)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DataTablePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Data tables
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Full CRUD ledger shell for Menzies Design plates: sticky header, body
          scroll, height-based page size, header filters, and daisyUI join
          pagination. Basic table modifiers live on the Table gallery.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Studio ledger"
          title="CRUD plate table"
          description="Actions → No → Name → Tags → Status → Created → Updated, plus Series and Washes. Data from studioPlates. Page size follows the body pane height."
          panel="wash-panel-ochre"
        >
          <Sample label="table table-zebra + sticky thead + join paginator + Cally ranges">
            <PlateLedgerTable plates={studioPlates} />
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Variants"
          title="Basic, bordered, compact"
          description="daisyUI sizes and a bordered frame. Zebra hover wash stays available when you add table-zebra."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <Sample label="table">
              <MiniVariantTable className="table" />
            </Sample>
            <Sample label="rounded-box border + table">
              <MiniVariantTable className="table" bordered />
            </Sample>
            <Sample label="table table-sm table-zebra">
              <MiniVariantTable className="table table-sm table-zebra [&_tbody_tr]:hover:bg-primary/40" />
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="03 · Empty filters"
          title="Chrome stays mounted"
          description="When filters match nothing, header filters and the join paginator remain visible. Only the body shows the empty message."
          panel="wash-panel-rose"
        >
          <Sample label="empty filtered state (header + paginator kept)">
            <PlateLedgerTable
              plates={studioPlates}
              forceEmpty
              heightClass="h-[280px]"
            />
          </Sample>
        </Section>

        <Section
          eyebrow="04 · Responsive"
          title="Horizontal scroll region"
          description="Wide ledgers scroll inside the body pane. The page itself should not scroll sideways on phones."
          panel="wash-panel-blue"
        >
          <Sample label="overflow-auto body + min-w table (no page x-scroll)">
            <PlateLedgerTable
              plates={studioPlates}
              heightClass="h-[300px] max-w-full"
            />
          </Sample>
          <p className="mt-3 text-sm text-ink-muted">
            Action tooltips prefer tooltip-right so tips open into the row.
            Smart placement flips the side when an overflow shell or the
            viewport would clip. Date range dropdowns flip to dropdown-end or
            dropdown-top when near the viewport edge.
          </p>
        </Section>
      </div>
    </>
  )
}
