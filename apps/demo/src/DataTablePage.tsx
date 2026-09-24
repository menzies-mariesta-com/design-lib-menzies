import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  dataTableEmptyHtml,
  dataTableEmptyJsx,
  dataTableHtml,
  dataTableJsx,
  dataTableLegendsHtml,
  dataTableLegendsJsx,
  dataTableMiniBorderedHtml,
  dataTableMiniBorderedJsx,
  dataTableMiniHtml,
  dataTableMiniJsx,
  dataTableMiniZebraHtml,
  dataTableMiniZebraJsx,
  dataTableResponsiveHtml,
  dataTableResponsiveJsx,
  dataTableSvelteFiles,
} from './snippets/svelte/data-table'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  DataTableExportMenu,
  DataTableFooterBar,
  DataTableHeader,
  DataTableLegendsRow,
  DROPDOWN_PANEL_OVERFLOW,
  DROPDOWN_PANEL_Z,
  resolveColumnLegends,
  Select,
  useDetailsDropdownPlacement,
  CalendarMonth,
  washRecipes,
  type DataTableColumnDef,
  type DataTableExportFormat,
} from '#plain'
import {
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  studioPlates,
  type PlateStatus,
  type StudioPlate,
} from './data/studio'
import { formatShortDate, formatShortDateTime } from './data/dates'
import {
  exportTable,
  type TableExportColumn,
  type TableExportRow,
} from './lib/tableExport'

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

const EXPORT_COLUMNS: TableExportColumn[] = [
  { key: 'no', header: 'No' },
  { key: 'name', header: 'Name' },
  { key: 'tags', header: 'Tags' },
  { key: 'status', header: 'Status' },
  { key: 'created', header: 'Created' },
  { key: 'updated', header: 'Updated' },
  { key: 'series', header: 'Series' },
  { key: 'washes', header: 'Washes' },
]

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

/** Table chrome lift/wash on hover (see washRecipes.tableChrome). No tbody row tint. */
const tableChromeCardClassName = washRecipes.tableChrome

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

/** Shared col widths so header + body tables stay aligned when split. */
const PLATE_COL_WIDTHS = [
  '7rem',
  '3rem',
  '12rem',
  '9rem',
  '7.5rem',
  '9.5rem',
  '9.5rem',
  '7rem',
  '4.5rem',
] as const

function PlateColGroup() {
  return (
    <colgroup>
      {PLATE_COL_WIDTHS.map((width, i) => (
        <col key={i} style={{ width }} />
      ))}
    </colgroup>
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
  // Click/tap only in table headers (hover would open while crossing cells).
  // Absolute daisyUI panel; overflow unlock via wash-allow-dropdown-overflow.
  const {
    placement,
    className: dropdownClass,
    onToggle,
    panelStyle,
  } = useDetailsDropdownPlacement(detailsRef, {
    panelWidth: 280,
    panelHeight: 380,
    hover: false,
  })

  return (
    <details
      ref={detailsRef}
      className={`${dropdownClass} relative w-full max-w-[9.5rem]`}
      onToggle={onToggle}
    >
      <summary
        className="btn btn-ghost btn-xs h-7 min-h-7 w-full cursor-pointer justify-start border border-base-300 px-2 font-normal [&::-webkit-details-marker]:hidden"
        aria-label={`Filter ${label} by date range`}
      >
        <span className="truncate text-xs">{rangeLabel(value)}</span>
      </summary>
      <div
        className={`dropdown-content ${DROPDOWN_PANEL_Z} ${placement.top ? 'mb-1' : 'mt-1'} rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW}`}
        style={panelStyle}
      >
        <CalendarMonth
          mode="range"
          size="sm"
          bordered={false}
          className="bg-base-100"
          value={value.includes('/') ? value : ''}
          onChange={(next) => {
            onChange(next)
          }}
        />
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
  const headScrollRef = useRef<HTMLDivElement>(null)
  const bodyScrollRef = useRef<HTMLDivElement>(null)
  const syncingScroll = useRef(false)
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
  const [exporting, setExporting] = useState(false)

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

  function syncHorizontalScroll(source: 'head' | 'body') {
    if (syncingScroll.current) return
    const head = headScrollRef.current
    const body = bodyScrollRef.current
    if (!head || !body) return
    syncingScroll.current = true
    if (source === 'head') body.scrollLeft = head.scrollLeft
    else head.scrollLeft = body.scrollLeft
    requestAnimationFrame(() => {
      syncingScroll.current = false
    })
  }

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

  async function handleExport(format: DataTableExportFormat) {
    if (exporting || filtered.length === 0) return
    setExporting(true)
    try {
      const rows: TableExportRow[] = filtered.map((row, index) => ({
        no: index + 1,
        name: row.name,
        tags: row.tags.join(', '),
        status: row.status,
        created: formatShortDateTime(row.created),
        updated: formatShortDateTime(row.updated),
        series: row.series,
        washes: row.washes,
      }))
      exportTable(format, EXPORT_COLUMNS, rows, 'studio-plates')
    } finally {
      setExporting(false)
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
        actions={
          <>
            <DataTableExportMenu
              disabled={filtered.length === 0}
              exporting={exporting}
              onExport={(format) => void handleExport(format)}
            />
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
          </>
        }
      />

      {/*
        Header filters sit outside the vertical scrollport so opening Select /
        calendar panels does not unlock body overflow or stretch the chrome.
        Head/body share horizontal scroll via scrollLeft sync.
      */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div
          ref={headScrollRef}
          className="wash-allow-dropdown-overflow shrink-0 overflow-x-auto border-b border-base-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={() => syncHorizontalScroll('head')}
        >
          <div className="min-w-[52rem]">
            <table className="table table-fixed w-full">
              <PlateColGroup />
              <thead className="bg-base-100">
                <tr>
                  <th>Actions</th>
                  <th>No</th>
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
                  <th className="overflow-visible p-2">
                    <div className="max-w-[7.5rem] min-w-0">
                      <Select
                        className="select-xs select-bordered"
                        value={statusFilter}
                        onChange={(next) =>
                          setStatusFilter(next as '' | PlateStatus)
                        }
                        aria-label="Filter by status"
                        options={[
                          { value: '', label: 'All' },
                          ...PLATE_STATUSES.map((s) => ({
                            value: s,
                            label: s,
                          })),
                        ]}
                      />
                    </div>
                  </th>
                  <th className="overflow-visible p-2">
                    <DateRangeFilter
                      label="Created"
                      value={createdRange}
                      onChange={setCreatedRange}
                    />
                  </th>
                  <th className="overflow-visible p-2">
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
            </table>
          </div>
        </div>

        <div
          ref={(node) => {
            bodyRef.current = node
            bodyScrollRef.current = node
          }}
          className="min-h-0 flex-1 overflow-auto"
          onScroll={() => syncHorizontalScroll('body')}
        >
          <div className="min-w-[52rem]">
            <table className="table table-fixed table-zebra w-full">
              <PlateColGroup />
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
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate font-medium">
                              {row.name}
                            </span>
                            <span className="truncate font-mono text-[0.65rem] text-ink-muted">
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
                        <td className="truncate text-sm">{row.series}</td>
                        <td className="tabular-nums text-sm">{row.washes}</td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DataTableFooterBar
        start={
          <label className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span className="whitespace-nowrap">Per page</span>
            <Select
              className="select-sm select-bordered w-auto min-w-[4.5rem]"
              value={pageSizeChoice}
              onChange={(next) => {
                setPageSizeChoice(next as PageSizeChoice)
                setPage(1)
              }}
              aria-label="Rows per page"
              options={PAGE_SIZE_OPTIONS.map((opt) => ({
                value: opt,
                label: opt === 'auto' ? 'Auto' : opt,
              }))}
            />
          </label>
        }
        paginator={
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
        }
        summary={`Showing ${from}-${to} of ${filtered.length}`}
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
          Full CRUD ledger shell: title header with Export, Refresh, and Add
          (Excel / CSV / ODS of filtered rows), two-row thead (headers then
          filters), footer with Per page left, Showing centered (hidden below
          sm), paginator right, and a centered legends row under it.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Studio ledger"
          title="CRUD plate table"
          description="Header title strip with Export, Refresh, and Add side by side (Export menu exports filtered rows only), then sticky thead; footer: Per page left, Showing centered (hidden below sm), join paginator right (1fr auto 1fr); legends under the footer"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <PlateLedgerTable plates={studioPlates} />
              </>
            }
            html={dataTableHtml}
            jsx={dataTableJsx}
            svelteFiles={dataTableSvelteFiles}
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
            html={dataTableLegendsHtml}
            jsx={dataTableLegendsJsx}
            svelteFiles={dataTableSvelteFiles}
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
              html={dataTableMiniHtml}
              jsx={dataTableMiniJsx}
              svelteFiles={dataTableSvelteFiles}
            />
            <ShowcaseTabs
              preview={
                <>
                  <MiniVariantTable className="table" bordered />
                </>
              }
              html={dataTableMiniBorderedHtml}
              jsx={dataTableMiniBorderedJsx}
              svelteFiles={dataTableSvelteFiles}
            />
            <ShowcaseTabs
              preview={
                <>
                  <MiniVariantTable className="table table-sm table-zebra" />
                </>
              }
              html={dataTableMiniZebraHtml}
              jsx={dataTableMiniZebraJsx}
              svelteFiles={dataTableSvelteFiles}
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
            html={dataTableEmptyHtml}
            jsx={dataTableEmptyJsx}
            svelteFiles={dataTableSvelteFiles}
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
            html={dataTableResponsiveHtml}
            jsx={dataTableResponsiveJsx}
            svelteFiles={dataTableSvelteFiles}
          />
          <p className="mt-3 text-sm text-ink-muted">
            Action tooltips prefer tooltip-right so tips open into the row.
            Header filters sit above the row scrollport so Select and calendar
            panels overlay without stretching the chrome; they flip to
            dropdown-end or dropdown-top near the viewport edge. Per page Auto
            uses ResizeObserver on the body pane; fixed sizes override it.
          </p>
        </Section>
      </div>
    </>
  )
}
