import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  CheckCircle2,
  Clock3,
  Droplets,
  Eye,
  Layers,
  MessageSquareWarning,
  Moon,
  Palette,
  Pencil,
  Sun,
  Trash2,
} from 'menzies-design-wash-ui/icons'
import {
  applyTheme,
  readStoredMode,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  watercolorThemes,
  type ThemeChangeDetail,
  type ThemeMode,
  type WatercolorThemeId,
} from './themes'
import { studioEvents } from './data/calendar-events'
import {
  formatPeriodLabel,
  formatShortDate,
  formatShortDateTime,
} from './data/dates'
import {
  STUDIO_NAME,
  computeStudioKpis,
  dryQueue,
  getPigmentUsage,
  pigmentMeta,
  studioActivity,
  studioPlates,
  upcomingEvents,
  type PlateStatus,
  type StudioPlate,
} from './data/studio'

const ROW_H = 48
const PLATE_STATUSES: PlateStatus[] = ['Draft', 'In wash', 'Review', 'Archived']

function statusBadge(status: PlateStatus) {
  if (status === 'Review') return 'badge badge-soft badge-primary'
  if (status === 'In wash') return 'badge badge-soft badge-warning'
  if (status === 'Draft') return 'badge badge-soft badge-secondary'
  return 'badge badge-ghost'
}

function PlateLedger({ plates }: { plates: StudioPlate[] }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [nameFilter, setNameFilter] = useState('')
  const [tagsFilter, setTagsFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'' | PlateStatus>('')

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
    const nameQ = nameFilter.trim().toLowerCase()
    const tagsQ = tagsFilter.trim().toLowerCase()
    return plates.filter((row) => {
      if (nameQ && !row.name.toLowerCase().includes(nameQ)) return false
      if (tagsQ && !row.tags.some((t) => t.toLowerCase().includes(tagsQ))) {
        return false
      }
      if (statusFilter && row.status !== statusFilter) return false
      return true
    })
  }, [plates, nameFilter, tagsFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)

  useEffect(() => {
    setPage(1)
  }, [nameFilter, tagsFilter, statusFilter])

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
    <article className="wash-panel paper-grain soak-in soak-delay-3 flex min-h-[360px] flex-col overflow-hidden">
      <div className="shrink-0 border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">Plate ledger</p>
        <h2 className="font-display text-xl font-semibold">Active studies</h2>
        <p className="mt-1 text-sm text-ink-muted">
          {plates.length} plates from the Menzies Design desk. Filter without leaving
          the overview.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div ref={bodyRef} className="min-h-0 flex-1 overflow-auto">
          <table className="table table-zebra table-sm [&_tbody_tr]:hover:bg-primary/40">
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
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {slice.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-sm text-ink-muted">
                    No plates match these filters.
                  </td>
                </tr>
              ) : (
                slice.map((row, i) => {
                  const no = (safePage - 1) * pageSize + i + 1
                  return (
                    <tr key={row.id}>
                      <td>
                        <div className="flex items-center gap-0.5">
                          <div
                            className="tooltip tooltip-primary tooltip-right"
                            data-tip="View"
                          >
                            <button
                              type="button"
                              className="btn btn-ghost btn-square btn-xs btn-primary cursor-pointer"
                              aria-label="View"
                            >
                              <Eye className="size-3.5" strokeWidth={2} />
                            </button>
                          </div>
                          <div
                            className="tooltip tooltip-secondary tooltip-right"
                            data-tip="Edit"
                          >
                            <button
                              type="button"
                              className="btn btn-ghost btn-square btn-xs btn-secondary cursor-pointer"
                              aria-label="Edit"
                            >
                              <Pencil className="size-3.5" strokeWidth={2} />
                            </button>
                          </div>
                          <div
                            className="tooltip tooltip-error tooltip-right"
                            data-tip="Delete"
                          >
                            <button
                              type="button"
                              className="btn btn-ghost btn-square btn-xs btn-error cursor-pointer"
                              aria-label="Delete"
                            >
                              <Trash2 className="size-3.5" strokeWidth={2} />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="font-mono text-xs">{no}</td>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-medium">{row.name}</span>
                          <span className="font-mono text-[0.65rem] text-ink-muted">
                            {row.id} · {row.washes} washes
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
                      <td className="font-mono text-xs text-ink-muted whitespace-nowrap">
                        {formatShortDateTime(row.created)}
                      </td>
                      <td className="font-mono text-xs text-ink-muted whitespace-nowrap">
                        {formatShortDateTime(row.updated)}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="border-ink-border/70 bg-base-100 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t px-3 py-2">
          <p className="font-mono text-xs text-ink-muted">
            Showing {from}-{to} of {filtered.length}
          </p>
          <div className="join">
            <button
              type="button"
              className="btn btn-sm join-item cursor-pointer"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (n) =>
                  n === 1 ||
                  n === totalPages ||
                  Math.abs(n - safePage) <= 1,
              )
              .map((n, idx, arr) => {
                const prev = arr[idx - 1]
                const showEllipsis = prev != null && n - prev > 1
                return (
                  <span key={n} className="contents">
                    {showEllipsis ? (
                      <button
                        type="button"
                        className="btn btn-sm join-item btn-disabled cursor-not-allowed"
                        tabIndex={-1}
                      >
                        …
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className={`btn btn-sm join-item cursor-pointer ${
                        n === safePage ? 'btn-active' : ''
                      }`}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  </span>
                )
              })}
            <button
              type="button"
              className="btn btn-sm join-item cursor-pointer"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function DashboardPage() {
  const [pigment, setPigment] = useState<WatercolorThemeId>(() =>
    readStoredTheme(),
  )
  const [mode, setMode] = useState<ThemeMode>(() => readStoredMode())

  useEffect(() => {
    function onThemeChange(event: Event) {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail
      if (!detail) return
      setPigment(detail.pigment)
      setMode(detail.mode)
    }

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange)
  }, [])

  const theme = watercolorThemes.find((t) => t.id === pigment) ?? watercolorThemes[0]
  const kpis = useMemo(() => computeStudioKpis(studioEvents), [])
  const usage = useMemo(() => getPigmentUsage().slice(0, 6), [])
  const maxWashes = usage[0]?.washes ?? 1
  const schedule = useMemo(() => upcomingEvents(studioEvents, new Date(), 5), [])
  const activity = useMemo(
    () =>
      [...studioActivity].sort(
        (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
      ),
    [],
  )

  function selectPigment(id: WatercolorThemeId) {
    setPigment(id)
    applyTheme(id, mode)
  }

  return (
    <>
      <section className="wash-panel paper-grain mb-6 overflow-hidden soak-in">
        <div className="relative px-5 py-6 md:px-7 md:py-8">
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-90"
            aria-hidden
          >
            <span className="absolute -left-8 -top-10 size-48 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_65%,transparent)_0%,transparent_70%)] blur-2xl" />
            <span className="absolute -bottom-12 right-0 size-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-b)_55%,transparent)_0%,transparent_70%)] blur-2xl" />
          </div>
          <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="label-ink mb-2">{formatPeriodLabel()}</p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-base-content md:text-4xl">
                {STUDIO_NAME}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-ink-muted md:text-base">
                Studio desk for washes, critiques, and pigment themes. Live
                palette follows ThemeSwitcher.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-soft badge-primary gap-1.5 px-3 py-3">
                <span
                  className="size-3 rounded-full border border-ink-border"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${theme.swatch} 60%, color-mix(in oklab, ${theme.swatch} 70%, black) 100%)`,
                  }}
                  aria-hidden
                />
                {theme.label}
              </span>
              <span className="badge badge-ghost gap-1.5 px-3 py-3">
                {mode === 'dark' ? (
                  <Moon className="size-3.5" strokeWidth={2} />
                ) : (
                  <Sun className="size-3.5" strokeWidth={2} />
                )}
                {mode === 'dark' ? 'Dark paper' : 'Light paper'}
              </span>
              <span className="badge badge-ghost font-mono text-xs">
                {theme.note}
              </span>
            </div>
          </div>
        </div>
      </section>

      {kpis.openCritiques > 0 ? (
        <div
          role="alert"
          className="alert alert-soft alert-info mb-6 border border-ink-border splatter soak-in soak-delay-1"
        >
          <Droplets className="size-5 shrink-0" strokeWidth={1.75} />
          <div>
            <p className="font-medium">
              {kpis.openCritiques} plate
              {kpis.openCritiques === 1 ? '' : 's'} await review
            </p>
            <p className="text-sm opacity-80">
              Open critiques are counted from the plate ledger status Review.
            </p>
          </div>
        </div>
      ) : null}

      <section className="stats stats-vertical mb-6 w-full border border-ink-border bg-base-100 shadow-none soak-in soak-delay-1 sm:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-primary">
            <CheckCircle2 className="size-7 opacity-80" strokeWidth={1.5} />
          </div>
          <div className="stat-title">Washes completed</div>
          <div className="stat-value font-display text-3xl">
            {kpis.washesCompleted}
          </div>
          <div className="stat-desc">Sum of plate wash layers</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Palette className="size-7 opacity-80" strokeWidth={1.5} />
          </div>
          <div className="stat-title">Pigments in use</div>
          <div className="stat-value font-display text-3xl">
            {kpis.pigmentsInUse}
          </div>
          <div className="stat-desc">
            of {kpis.pigmentsAvailable} themes
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-warning">
            <MessageSquareWarning className="size-7 opacity-80" strokeWidth={1.5} />
          </div>
          <div className="stat-title">Open critiques</div>
          <div className="stat-value font-display text-3xl">
            {kpis.openCritiques}
          </div>
          <div className="stat-desc">{kpis.openPlates} open plates</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-accent">
            <Clock3 className="size-7 opacity-80" strokeWidth={1.5} />
          </div>
          <div className="stat-title">Dry-time queue</div>
          <div className="stat-value font-display text-3xl">
            {kpis.dryQueueCount}
          </div>
          <div className="stat-desc">
            {kpis.upcomingSessions} upcoming sessions
          </div>
        </div>
      </section>

      <div className="mb-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <article className="wash-panel paper-grain soak-in soak-delay-2 p-5">
          <p className="label-ink mb-1">Recent activity</p>
          <h2 className="font-display text-xl font-semibold">Desk timeline</h2>
          <ul className="timeline timeline-vertical timeline-compact mt-5">
            {activity.map((item, index) => (
              <li key={item.id}>
                {index > 0 ? <hr className="bg-ink-border" /> : null}
                <div className="timeline-start font-mono text-xs text-ink-muted whitespace-nowrap">
                  {formatShortDateTime(item.at)}
                </div>
                <div className="timeline-middle">
                  <span className="bg-primary size-2.5 rounded-full" />
                </div>
                <div className="timeline-end timeline-box border-ink-border bg-base-100/90 mb-2">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-ink-muted">{item.detail}</p>
                </div>
                {index < activity.length - 1 ? (
                  <hr className="bg-ink-border" />
                ) : null}
              </li>
            ))}
          </ul>
        </article>

        <div className="space-y-6">
          <article className="wash-panel wash-panel-ochre paper-grain soak-in soak-delay-2 p-5">
            <p className="label-ink mb-1">Pigment usage</p>
            <h2 className="font-display text-xl font-semibold">Top pigments</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Tallied from plate washes. Click to apply the theme.
            </p>
            <ul className="mt-4 space-y-3">
              {usage.map((row) => {
                const meta = pigmentMeta(row.pigmentId)
                const active = row.pigmentId === pigment
                const pct = Math.round((row.washes / maxWashes) * 100)
                return (
                  <li key={row.pigmentId}>
                    <button
                      type="button"
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-box border px-3 py-2.5 text-left transition-colors ${
                        active
                          ? 'border-primary bg-primary/10'
                          : 'border-ink-border/70 bg-base-100/80 hover:bg-primary/10'
                      }`}
                      onClick={() => selectPigment(row.pigmentId)}
                      aria-pressed={active}
                      aria-label={`Apply ${meta.label} theme`}
                    >
                      <span
                        className="size-8 shrink-0 rounded-full border border-ink-border"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${meta.swatch} 60%, color-mix(in oklab, ${meta.swatch} 70%, black) 100%)`,
                        }}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">
                            {meta.label}
                          </p>
                          <p className="font-mono text-xs text-ink-muted shrink-0">
                            {row.washes} washes
                          </p>
                        </div>
                        <progress
                          className="progress progress-primary progress-wash mt-1.5 h-1.5 w-full"
                          value={pct}
                          max={100}
                        />
                        <p className="font-mono mt-1 text-[0.65rem] text-ink-muted">
                          {row.plates} plate{row.plates === 1 ? '' : 's'} ·{' '}
                          {meta.note}
                        </p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </article>

          <article className="wash-panel wash-panel-rose paper-grain soak-in soak-delay-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="label-ink mb-1">Dry-time queue</p>
                <h2 className="font-display text-xl font-semibold">
                  Still drying
                </h2>
              </div>
              <Layers className="size-5 text-primary opacity-70" strokeWidth={1.5} />
            </div>
            <ul className="mt-4 space-y-3">
              {dryQueue.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 border-b border-ink-border/50 pb-2 last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="font-mono text-xs text-ink-muted">
                      {item.plateId} · {item.layer}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-ink-muted shrink-0">
                    {item.remainingMin} min
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <article className="wash-panel paper-grain soak-in soak-delay-3 p-5">
          <p className="label-ink mb-1">Upcoming schedule</p>
          <h2 className="font-display text-xl font-semibold">Studio calendar</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Shared with the Calendar page seed events.
          </p>
          <ul className="mt-4 space-y-3">
            {schedule.map((event) => (
              <li
                key={event.id}
                className="flex gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-3 py-2.5"
              >
                <div className="bg-primary/15 text-primary flex size-12 shrink-0 flex-col items-center justify-center rounded-box">
                  <span className="font-mono text-[0.65rem] leading-none opacity-80">
                    {formatShortDate(event.date).split(' ')[0]}
                  </span>
                  <span className="font-display text-lg leading-none font-semibold">
                    {formatShortDate(event.date).split(' ')[1]}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-ink-muted">{event.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="wash-panel paper-grain soak-in soak-delay-4 p-5">
          <p className="label-ink mb-1">Studio snapshot</p>
          <h2 className="font-display text-xl font-semibold">Desk totals</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-3 border-b border-ink-border/60 pb-2">
              <dt className="text-ink-muted">Archived plates</dt>
              <dd className="font-mono text-xs">{kpis.archivedPlates}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-ink-border/60 pb-2">
              <dt className="text-ink-muted">Themes available</dt>
              <dd className="font-mono text-xs">{kpis.pigmentsAvailable}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-ink-border/60 pb-2">
              <dt className="text-ink-muted">Schedule seeds</dt>
              <dd className="font-mono text-xs">{studioEvents.length}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-muted">Active theme</dt>
              <dd>{theme.label}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            KPIs and usage charts read from{' '}
            <span className="font-mono text-xs">src/data/studio.ts</span>. No
            remote API is required for this desk.
          </p>
        </article>
      </div>

      <PlateLedger plates={studioPlates} />
    </>
  )
}
