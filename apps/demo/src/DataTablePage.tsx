import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  DataTableFooterBar,
  DataTableHeader,
  DataTableLegendsRow,
  resolveColumnLegends,
  washRecipes,
  type DataTableColumnDef,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import {
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
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

const PAGE_SIZE_OPTIONS = ['auto', '5', '10', '25', '50'] as const
type PageSizeChoice = (typeof PAGE_SIZE_OPTIONS)[number]

/**
 * Column defs for the ledger. Set `legend` to mark a column for the
 * legends row under the footer (`true` or `{ label?, swatch?, icon? }`).
 */
const PLATE_COLUMNS: DataTableColumnDef[] = [
  { id: 'actions', header: 'Actions' },
  { id: 'no', header: 'No' },
  { id: 'name', header: 'Name' },
  { id: 'tags', header: 'Tags', legend: { swatch: 'bg-base-300' } },
  { id: 'status', header: 'Status', legend: { swatch: 'bg-primary' } },
  { id: 'created', header: 'Created' },
  { id: 'updated', header: 'Updated' },
  { id: 'series', header: 'Series' },
  { id: 'washes', header: 'Washes' },
]

const PLATE_LEGENDS = resolveColumnLegends(PLATE_COLUMNS)

const variantRows = studioPlates.slice(0, 3)

const crudTableHtml = `<div class="border-base-300 rounded-box flex min-h-0 flex-col overflow-hidden border bg-base-100 shadow-sm transition-[box-shadow,transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:border-primary/40 focus-within:bg-primary/5 focus-within:shadow-md h-[360px]">
  <!-- Header section: title + description (optional actions on the right) -->
  <div class="border-b px-3 py-2.5 flex shrink-0 items-start justify-between gap-3">
    <div class="min-w-0 flex-1">
      <h2 class="text-base font-bold leading-tight">Studio plates</h2>
      <p class="mt-0.5 text-xs text-ink-muted">Plate ledger for wash studio work</p>
    </div>
    <!-- optional actions slot -->
  </div>
  <div class="min-h-0 flex-1 overflow-auto">
    <table class="table table-zebra [&_tbody_tr]:hover:bg-primary/40">
      <thead class="bg-base-100 sticky top-0 z-10">
        <!-- Row 1: column headers -->
        <tr>
          <th>Actions</th><th>No</th><th>Name</th><th>Tags</th><th>Status</th>…
        </tr>
        <!-- Row 2: per-column filters -->
        <tr>
          <th></th><th></th>
          <th><input class="input input-xs" placeholder="Filter…" /></th>
          <th><input class="input input-xs" placeholder="Filter…" /></th>
          <th><select class="select select-xs"><option>All</option></select></th>
          …
        </tr>
      </thead>
      <tbody><!-- rows --></tbody>
    </table>
  </div>
  <!-- Footer: Per page + paginator | Showing | Refresh + icon Add -->
  <div class="border-t px-3 py-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
    <div class="flex gap-2">
      <select class="select select-sm">…</select>
      <div class="join"><!-- paginator --></div>
    </div>
    <p class="font-mono text-xs text-center">Showing 1-5 of 12</p>
    <div class="flex justify-end gap-1">
      <!-- Refresh tooltip + Add (icon-only, tooltip-primary) -->
    </div>
  </div>
  <!-- Legends under footer (border-t divider): only columns with legend marked -->
  <div class="border-t flex justify-center gap-3 px-3 pt-3 pb-2"><!-- Status, Tags swatches --></div>
</div>`

const crudTableJsx = `import {
  DataTableHeader,
  resolveColumnLegends,
  type DataTableColumnDef,
} from '@menzies-mariesta-com/menzies-design-wash-ui'

const columns: DataTableColumnDef[] = [
  { id: 'actions', header: 'Actions' },
  { id: 'tags', header: 'Tags', legend: { swatch: 'bg-base-300' } },
  { id: 'status', header: 'Status', legend: { swatch: 'bg-primary' } },
  // …
]

const legends = resolveColumnLegends(columns)

{/* Inside the bordered chrome card, above the scroll body: */}
<DataTableHeader
  title="Studio plates"
  description="Plate ledger for wash studio work"
/>
{/* then sticky thead + body, DataTableFooterBar, DataTableLegendsRow */}
<PlateLedgerTable plates={studioPlates} />`

const miniTableHtml = `<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-medium">Coastal fog</td>
        <td><span class="badge badge-soft badge-primary">Review</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 2, 09:14</td>
      </tr>
    </tbody>
  </table>
</div>`

const miniTableJsx = `<MiniVariantTable className="table" />`

const miniTableBorderedJsx = `<MiniVariantTable className="table" bordered />`

const miniTableZebraJsx = `<MiniVariantTable className="table table-sm table-zebra [&_tbody_tr]:hover:bg-primary/40" />`

const emptyTableJsx = `<PlateLedgerTable
  plates={studioPlates}
  forceEmpty
  heightClass="h-[280px]"
/>`

const responsiveTableJsx = `<PlateLedgerTable
  plates={studioPlates}
  heightClass="h-[300px] max-w-full"
/>`

const legendsApiJsx = `import {
  DataTableLegendsRow,
  resolveColumnLegends,
  type DataTableColumnDef,
} from '@menzies-mariesta-com/menzies-design-wash-ui'

const columns: DataTableColumnDef[] = [
  { id: 'name', header: 'Name' },
  // Mark columns that should appear in the legends row under the footer:
  { id: 'tags', header: 'Tags', legend: true },
  { id: 'status', header: 'Status', legend: { label: 'Status', swatch: 'bg-primary' } },
]

const legends = resolveColumnLegends(columns)
// => [{ columnId: 'tags', label: 'Tags' }, { columnId: 'status', label: 'Status', swatch: 'bg-primary' }]

<DataTableLegendsRow legends={legends} />`

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

/** Shared bordered pane hover: lift + shadow + primary wash (see washRecipes.paneCard). */
const tableChromeCardClassName = washRecipes.paneCard

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
    <article
      className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}
    >
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
  showLegends = true,
}: {
  plates: StudioPlate[]
  forceEmpty?: boolean
  heightClass?: string
  showLegends?: boolean
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [pageSizeChoice, setPageSizeChoice] = useState<PageSizeChoice>('auto')
  const [autoPageSize, setAutoPageSize] = useState(5)
  const [nameFilter, setNameFilter] = useState('')
  const [tagsFilter, setTagsFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'' | PlateStatus>('')
  const [createdRange, setCreatedRange] = useState('')
  const [updatedRange, setUpdatedRange] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [adding, setAdding] = useState(false)

  const pageSize =
    pageSizeChoice === 'auto'
      ? autoPageSize
      : Math.max(1, Number(pageSizeChoice))

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return

    function measure() {
      if (!el) return
      setAutoPageSize(Math.max(1, Math.floor(el.clientHeight / ROW_H)))
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

  async function handleRefresh() {
    if (refreshing) return
    setRefreshing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 700))
      setNameFilter('')
      setTagsFilter('')
      setStatusFilter('')
      setCreatedRange('')
      setUpdatedRange('')
      setPage(1)
    } finally {
      setRefreshing(false)
    }
  }

  async function handleAdd() {
    if (adding) return
    setAdding(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
    } finally {
      setAdding(false)
    }
  }

  const legends = showLegends ? PLATE_LEGENDS : []

  return (
    <div
      className={`border-base-300 rounded-box flex min-h-0 flex-col overflow-hidden border bg-base-100 ${tableChromeCardClassName} ${heightClass}`}
    >
      <DataTableHeader
        title="Studio plates"
        description="Plate ledger for wash studio work"
      />

      <div ref={bodyRef} className="min-h-0 flex-1 overflow-auto">
        <div className="min-w-[52rem]">
          <table className="table table-zebra [&_tbody_tr]:hover:bg-primary/40">
            <thead className="bg-base-100 sticky top-0 z-10">
              <tr>
                <th className="w-28">Actions</th>
                <th className="w-12">No</th>
                <th>Name</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Series</th>
                <th>Washes</th>
              </tr>
              <tr className="font-normal">
                <th aria-hidden className="p-2" />
                <th aria-hidden className="p-2" />
                <th className="p-2">
                  <input
                    type="text"
                    className="input input-xs input-bordered w-full max-w-[10rem] cursor-text"
                    placeholder="Filter…"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    aria-label="Filter by name"
                  />
                </th>
                <th className="p-2">
                  <input
                    type="text"
                    className="input input-xs input-bordered w-full max-w-[8rem] cursor-text"
                    placeholder="Filter…"
                    value={tagsFilter}
                    onChange={(e) => setTagsFilter(e.target.value)}
                    aria-label="Filter by tags"
                  />
                </th>
                <th className="p-2">
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
                </th>
                <th className="p-2">
                  <DateRangeFilter
                    label="Created"
                    value={createdRange}
                    onChange={setCreatedRange}
                  />
                </th>
                <th className="p-2">
                  <DateRangeFilter
                    label="Updated"
                    value={updatedRange}
                    onChange={setUpdatedRange}
                  />
                </th>
                <th aria-hidden className="p-2" />
                <th aria-hidden className="p-2" />
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

      <DataTableFooterBar
        start={
          <>
            <label className="flex items-center gap-1.5 text-xs text-ink-muted">
              <span className="whitespace-nowrap">Per page</span>
              <select
                className="select select-sm select-bordered w-auto min-w-[4.5rem] cursor-pointer"
                value={pageSizeChoice}
                onChange={(e) => {
                  setPageSizeChoice(e.target.value as PageSizeChoice)
                  setPage(1)
                }}
                aria-label="Rows per page"
              >
                {PAGE_SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === 'auto' ? 'Auto' : opt}
                  </option>
                ))}
              </select>
            </label>
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
          </>
        }
        summary={`Showing ${from}-${to} of ${filtered.length}`}
        controls={
          <div className="flex shrink-0 items-center gap-1">
            <div className="tooltip tooltip-secondary" data-tip="Refresh">
              <button
                type="button"
                className={`btn btn-ghost btn-square btn-sm btn-secondary ${
                  refreshing
                    ? 'btn-disabled cursor-not-allowed loading'
                    : 'cursor-pointer'
                }`}
                aria-label="Refresh"
                aria-busy={refreshing}
                disabled={refreshing}
                onClick={() => void handleRefresh()}
              >
                {!refreshing ? (
                  <RefreshCw className="size-4" strokeWidth={2} />
                ) : null}
              </button>
            </div>
            <div className="tooltip tooltip-primary" data-tip="Add">
              <button
                type="button"
                className={`btn btn-ghost btn-square btn-sm btn-primary ${
                  adding
                    ? 'btn-disabled cursor-not-allowed loading'
                    : 'cursor-pointer'
                }`}
                aria-label="Add"
                aria-busy={adding}
                disabled={adding}
                onClick={() => void handleAdd()}
              >
                {!adding ? <Plus className="size-4" strokeWidth={2} /> : null}
              </button>
            </div>
          </div>
        }
      />

      <DataTableLegendsRow legends={legends} />
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
          ? `rounded-box border border-base-content/10 bg-base-100 ${tableChromeCardClassName}`
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
          Full CRUD ledger shell: title header, two-row thead (headers then
          filters), three-section footer, and a centered legends row under it.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Studio ledger"
          title="CRUD plate table"
          description="Header title strip, then sticky thead; footer: Per page + paginator left, Showing center, Refresh + icon Add right; legends under the footer"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <PlateLedgerTable plates={studioPlates} />
              </>
            }
            html={crudTableHtml}
            jsx={crudTableJsx}
          />
        </Section>

        <Section
          eyebrow="02 · Column legends"
          title="Mark columns for the legends row"
          description="Only columns with legend set contribute. Use resolveColumnLegends(columns)."
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <div className="border-base-300 rounded-box overflow-hidden border bg-base-100">
                <DataTableLegendsRow legends={PLATE_LEGENDS} />
                <p className="px-3 py-3 text-sm text-ink-muted">
                  In this template, Tags and Status are marked. Other columns
                  stay off the legends row.
                </p>
              </div>
            }
            html={`<!-- Mark on column defs, then render -->
<ul class="flex gap-3 text-xs">
  <li><span class="bg-base-300 size-2.5 rounded-full"></span> Tags</li>
  <li><span class="bg-primary size-2.5 rounded-full"></span> Status</li>
</ul>`}
            jsx={legendsApiJsx}
          />
        </Section>

        <Section
          eyebrow="03 · Variants"
          title="Basic, bordered, compact"
          description="daisyUI sizes and a bordered frame"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <ShowcaseTabs
              preview={
                <>
                  <MiniVariantTable className="table" />
                </>
              }
              html={miniTableHtml}
              jsx={miniTableJsx}
            />
            <ShowcaseTabs
              preview={
                <>
                  <MiniVariantTable className="table" bordered />
                </>
              }
              html={`<div class="overflow-x-auto rounded-box border border-base-content/10 bg-base-100 shadow-sm transition-[box-shadow,transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:border-primary/40 focus-within:bg-primary/5 focus-within:shadow-md">
  <!-- table markup -->
</div>`}
              jsx={miniTableBorderedJsx}
            />
            <ShowcaseTabs
              preview={
                <>
                  <MiniVariantTable className="table table-sm table-zebra [&_tbody_tr]:hover:bg-primary/40" />
                </>
              }
              html={`<div class="overflow-x-auto">
  <table class="table table-sm table-zebra">
    <!-- rows -->
  </table>
</div>`}
              jsx={miniTableZebraJsx}
            />
          </div>
        </Section>

        <Section
          eyebrow="04 · Empty filters"
          title="Chrome stays mounted"
          description="Empty body; filters, footer, and legends stay"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <PlateLedgerTable
                  plates={studioPlates}
                  forceEmpty
                  heightClass="h-[280px]"
                />
              </>
            }
            html={`${crudTableHtml.replace('Coastal fog', 'No plates match these filters.')}`}
            jsx={emptyTableJsx}
          />
        </Section>

        <Section
          eyebrow="05 · Responsive"
          title="Horizontal scroll region"
          description="Wide ledgers scroll inside the body pane; footer stays one horizontal row"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <PlateLedgerTable
                  plates={studioPlates}
                  heightClass="h-[300px] max-w-full"
                />
              </>
            }
            html={crudTableHtml}
            jsx={responsiveTableJsx}
          />
          <p className="mt-3 text-sm text-ink-muted">
            Action tooltips prefer tooltip-right so tips open into the row.
            Date range dropdowns flip to dropdown-end or dropdown-top when near
            the viewport edge. Per page Auto uses ResizeObserver on the body
            pane; fixed sizes override it.
          </p>
        </Section>
      </div>
    </>
  )
}
