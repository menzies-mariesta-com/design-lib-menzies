import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import {
  DROPDOWN_PANEL_OVERFLOW,
  WashCalendar,
  WashTimePicker,
  useDetailsDropdownPlacement,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import {
  CircleCheck,
  CircleX,
  Pencil,
  Trash2,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  getSeedStudioEvents,
  type StudioEvent,
} from './data/calendar-events'
import { shiftISODate, toISODate } from './data/dates'

function formatDisplayDate(iso: string): string {
  if (!iso) return 'None'
  const day = iso.includes('T') ? iso.slice(0, 10) : iso
  const [y, m, d] = day.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTime12(hhmm: string): string {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm)
  if (!m) return hhmm
  let h = Number(m[1])
  const min = m[2]
  const period = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${min} ${period}`
}

function parseScheduleValue(value: string): { date: string; time: string } {
  const [datePart = '', timePart = ''] = value.split('T')
  const time = timePart.slice(0, 5)
  return {
    date: datePart || toISODate(new Date()),
    time: /^\d{2}:\d{2}$/.test(time) ? time : '09:00',
  }
}

function compareTime(a: string, b: string): number {
  return a.localeCompare(b)
}

function addMinutesToTime(hhmm: string, minutes: number): string {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm)
  if (!m) return '10:00'
  const total = Number(m[1]) * 60 + Number(m[2]) + minutes
  const clamped = Math.max(0, Math.min(23 * 60 + 55, total))
  const hh = String(Math.floor(clamped / 60)).padStart(2, '0')
  const mm = String(clamped % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

function parseRange(value: string): { start: string; end: string } {
  const [start = '', end = ''] = value.split('/')
  return { start, end }
}

function shiftYears(iso: string, years: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  return toISODate(new Date(y + years, m - 1, d))
}

function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

function inclusiveDayCount(start: string, end: string): number {
  if (!start) return 0
  const a = start
  const b = end || start
  const [ys, ms, ds] = a.split('-').map(Number)
  const [ye, me, de] = b.split('-').map(Number)
  const t0 = Date.UTC(ys, ms - 1, ds)
  const t1 = Date.UTC(ye, me - 1, de)
  return Math.floor(Math.abs(t1 - t0) / 86400000) + 1
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

const todayISO = toISODate(new Date())
const calMin = shiftYears(todayISO, -25)
const calMax = shiftYears(todayISO, 25)
const seedEvents = getSeedStudioEvents()

export default function CalendarPage() {
  const [scheduleValue, setScheduleValue] = useState(`${todayISO}T09:00:00`)
  const scheduleParts = useMemo(
    () => parseScheduleValue(scheduleValue),
    [scheduleValue],
  )
  const scheduleDay = scheduleParts.date

  const [events, setEvents] = useState<StudioEvent[]>(() => [...seedEvents])
  const [newTitle, setNewTitle] = useState('')
  const [newNote, setNewNote] = useState('')
  const [newStart, setNewStart] = useState('09:00')
  const [newEnd, setNewEnd] = useState('10:00')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    tone: 'success' | 'error'
  } | null>(null)

  const [rangeValue, setRangeValue] = useState(
    `${todayISO}/${shiftISODate(todayISO, 6)}`,
  )
  const rangeParts = parseRange(rangeValue)

  const [multiValue, setMultiValue] = useState(
    `${todayISO} ${shiftISODate(todayISO, 2)} ${shiftISODate(todayISO, 5)}`,
  )
  const multiDays = useMemo(
    () => multiValue.split(/\s+/).filter(Boolean).sort(),
    [multiValue],
  )

  const bookMin = todayISO
  const bookMax = shiftISODate(todayISO, 45)
  const [bookValue, setBookValue] = useState('')

  const fieldId = useId()
  const fieldRef = useRef<HTMLDetailsElement>(null)
  const {
    placement: fieldPlacement,
    className: fieldDropdownClass,
    onToggle: onFieldToggle,
  } = useDetailsDropdownPlacement(fieldRef, {
    panelWidth: 288,
    panelHeight: 340,
  })
  const [fieldDate, setFieldDate] = useState(todayISO)

  const markedDates = useMemo(
    () => new Set(events.map((e) => e.date)),
    [events],
  )

  const dayAgenda = useMemo(
    () =>
      events
        .filter((e) => e.date === scheduleDay)
        .sort((a, b) => {
          const t = compareTime(a.startTime, b.startTime)
          return t !== 0 ? t : a.title.localeCompare(b.title)
        }),
    [events, scheduleDay],
  )

  const timeRangeOk = compareTime(newStart, newEnd) <= 0

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3500)
    return () => window.clearTimeout(t)
  }, [toast])

  const onScheduleChange = useCallback(
    (next: string) => {
      setScheduleValue(next)
      if (editingId) return
      const { time } = parseScheduleValue(next)
      setNewStart(time)
      setNewEnd(addMinutesToTime(time, 60))
    },
    [editingId],
  )

  const resetForm = useCallback(() => {
    setNewTitle('')
    setNewNote('')
    setNewStart(scheduleParts.time)
    setNewEnd(addMinutesToTime(scheduleParts.time, 60))
    setEditingId(null)
  }, [scheduleParts.time])

  const startEdit = useCallback((ev: StudioEvent) => {
    setEditingId(ev.id)
    setNewTitle(ev.title)
    setNewNote(ev.note)
    setNewStart(ev.startTime)
    setNewEnd(ev.endTime)
    setScheduleValue(`${ev.date}T${ev.startTime}`)
  }, [])

  const removeEvent = useCallback(
    (ev: StudioEvent) => {
      setEvents((prev) => prev.filter((e) => e.id !== ev.id))
      setToast({ message: `Removed "${ev.title}"`, tone: 'success' })
      if (editingId === ev.id) {
        setNewTitle('')
        setNewNote('')
        setNewStart(scheduleParts.time)
        setNewEnd(addMinutesToTime(scheduleParts.time, 60))
        setEditingId(null)
      }
    },
    [editingId, scheduleParts.time],
  )

  const onSubmitSession = (e: FormEvent) => {
    e.preventDefault()
    const title = newTitle.trim()
    if (!title) {
      setToast({ message: 'Title is required', tone: 'error' })
      return
    }
    if (!timeRangeOk) {
      setToast({ message: 'End time must be at or after start', tone: 'error' })
      return
    }
    setSubmitting(true)
    try {
      if (editingId) {
        setEvents((prev) =>
          prev.map((ev) =>
            ev.id === editingId
              ? {
                  ...ev,
                  date: scheduleDay,
                  startTime: newStart,
                  endTime: newEnd,
                  title,
                  note: newNote.trim() || 'Studio session',
                }
              : ev,
          ),
        )
        setToast({ message: `Updated "${title}"`, tone: 'success' })
      } else {
        const entry: StudioEvent = {
          id: `e-${Date.now()}`,
          date: scheduleDay,
          startTime: newStart,
          endTime: newEnd,
          title,
          note: newNote.trim() || 'Studio session',
        }
        setEvents((prev) => [...prev, entry])
        setToast({ message: `Added "${title}"`, tone: 'success' })
      }
      resetForm()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Calendar
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Studio schedule on WashCalendar with includeTime, a timed day
          timeline, range and multi modes, constrained booking, and a field
          popover.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Studio schedule"
          title="Month, timeline, sessions"
          description="Pick a day and time, then manage sessions on a vertical day timeline. Event days show a primary marker."
        >
          <ShowcaseTabs
            preview={
              <div className="grid gap-6 lg:grid-cols-[minmax(0,21rem)_1fr]">
                <div className="min-w-0">
                  <WashCalendar
                    mode="single"
                    includeTime
                    value={scheduleValue}
                    onChange={onScheduleChange}
                    min={calMin}
                    max={calMax}
                    showOutsideDays
                    markedDates={markedDates}
                    aria-label="Studio schedule month"
                  />
                  <ClassLabel value="WashCalendar includeTime + markedDates" />
                </div>

                <div className="flex min-w-0 flex-col gap-4">
                  <div>
                    <h3 className="card-title text-secondary font-bold text-base">
                      {formatDisplayDate(scheduleDay)}
                    </h3>
                    <p className="text-sm text-ink-muted">
                      {dayAgenda.length === 0
                        ? 'No sessions this day.'
                        : `${dayAgenda.length} session${dayAgenda.length === 1 ? '' : 's'} · selected ${formatTime12(scheduleParts.time)}`}
                    </p>
                  </div>

                  <div className="relative min-h-[12rem] rounded-box border border-base-300 bg-base-100/80 px-3 py-4 sm:px-4">
                    {dayAgenda.length === 0 ? (
                      <p className="py-10 text-center text-sm text-ink-muted">
                        No sessions. Add one below or pick another day.
                      </p>
                    ) : (
                      <ol className="relative space-y-0 border-l-2 border-primary/35 pl-5 sm:pl-6">
                        {dayAgenda.map((ev) => (
                          <li key={ev.id} className="relative pb-5 last:pb-0">
                            <span
                              className="absolute -left-[1.4rem] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-base-100 sm:-left-[1.65rem]"
                              aria-hidden
                            />
                            <div className="flex items-start justify-between gap-2 rounded-box border border-base-300/80 bg-base-100 px-3 py-2.5 shadow-[var(--shadow-paper-sm)]">
                              <div className="min-w-0">
                                <p className="font-mono text-[0.7rem] font-semibold tracking-wide text-primary">
                                  {formatTime12(ev.startTime)}
                                  <span className="mx-1 text-ink-muted">-</span>
                                  {formatTime12(ev.endTime)}
                                </p>
                                <p className="mt-0.5 font-medium leading-snug">
                                  {ev.title}
                                </p>
                                <p className="text-sm text-ink-muted">{ev.note}</p>
                              </div>
                              <div className="flex shrink-0 gap-1">
                                <div
                                  className="tooltip tooltip-secondary tooltip-left"
                                  data-tip="Edit"
                                >
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer"
                                    aria-label="Edit"
                                    onClick={() => startEdit(ev)}
                                  >
                                    <Pencil className="size-4" aria-hidden />
                                  </button>
                                </div>
                                <div
                                  className="tooltip tooltip-error tooltip-left"
                                  data-tip="Delete"
                                >
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-square btn-sm btn-error cursor-pointer"
                                    aria-label="Delete"
                                    onClick={() => removeEvent(ev)}
                                  >
                                    <Trash2 className="size-4" aria-hidden />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>

                  <form
                    className="rounded-box border border-base-300 bg-base-100 p-4"
                    onSubmit={onSubmitSession}
                  >
                    <h3
                      className={
                        editingId
                          ? 'card-title text-secondary mb-3 font-bold text-base'
                          : 'card-title text-primary mb-3 font-bold text-base'
                      }
                    >
                      {editingId ? 'Edit session' : 'Add session'}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="form-control w-full sm:col-span-2">
                        <span className="label-text">
                          Title
                          <span
                            className="text-error align-top text-sm leading-none"
                            aria-hidden="true"
                          >
                            *
                          </span>
                        </span>
                        <input
                          className="input input-bordered w-full cursor-text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          required
                          disabled={submitting}
                        />
                      </label>
                      <label className="form-control w-full">
                        <span className="label-text">
                          Start
                          <span
                            className="text-error align-top text-sm leading-none"
                            aria-hidden="true"
                          >
                            *
                          </span>
                        </span>
                        <WashTimePicker
                          value={`${newStart}:00`}
                          onChange={(v) => setNewStart(v.slice(0, 5))}
                          size="sm"
                          disabled={submitting}
                          aria-label="Session start"
                        />
                      </label>
                      <label className="form-control w-full">
                        <span className="label-text">
                          End
                          <span
                            className="text-error align-top text-sm leading-none"
                            aria-hidden="true"
                          >
                            *
                          </span>
                        </span>
                        <WashTimePicker
                          value={`${newEnd}:00`}
                          onChange={(v) => setNewEnd(v.slice(0, 5))}
                          size="sm"
                          disabled={submitting}
                          aria-label="Session end"
                        />
                      </label>
                      <label className="form-control w-full sm:col-span-2">
                        <span className="label-text">Note</span>
                        <input
                          className="input input-bordered w-full cursor-text"
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          disabled={submitting}
                        />
                      </label>
                    </div>
                    {!timeRangeOk ? (
                      <p className="mt-2 text-sm text-error">
                        End time must be at or after start.
                      </p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="submit"
                        className={`btn btn-primary ${submitting ? 'loading btn-disabled cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={submitting || !timeRangeOk}
                        aria-busy={submitting}
                      >
                        {editingId ? 'Save changes' : 'Add session'}
                      </button>
                      {editingId ? (
                        <button
                          type="button"
                          className="btn btn-ghost cursor-pointer"
                          disabled={submitting}
                          onClick={resetForm}
                        >
                          Cancel
                        </button>
                      ) : null}
                    </div>
                  </form>
                </div>
              </div>
            }
            html={`<!-- Studio schedule: WashCalendar includeTime + day timeline + session form -->
<WashCalendar
  mode="single"
  include-time
  value="{scheduleValue}"
  min="{calMin}"
  max="{calMax}"
  show-outside-days
  marked-dates="{markedDates}"
  aria-label="Studio schedule month"
/>`}
            jsx={`<WashCalendar
  mode="single"
  includeTime
  value={scheduleValue}
  onChange={setScheduleValue}
  min={calMin}
  max={calMax}
  showOutsideDays
  markedDates={markedDates}
  aria-label="Studio schedule month"
/>`}
          />
        </Section>

        <Section
          eyebrow="02 · Range planner"
          title="Inclusive span"
          description="Click start, then end. Escape clears a half-picked range."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="max-w-sm">
                <WashCalendar
                  mode="range"
                  value={rangeValue}
                  onChange={setRangeValue}
                  min={calMin}
                  max={calMax}
                  aria-label="Range planner"
                />
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  <span className="badge badge-outline">
                    Start: {formatDisplayDate(rangeParts.start)}
                  </span>
                  <span className="badge badge-outline">
                    End: {formatDisplayDate(rangeParts.end || rangeParts.start)}
                  </span>
                  <span className="badge badge-primary badge-soft">
                    {inclusiveDayCount(rangeParts.start, rangeParts.end)} day
                    {inclusiveDayCount(rangeParts.start, rangeParts.end) === 1
                      ? ''
                      : 's'}
                  </span>
                </div>
                <p className="mt-2 font-mono text-xs text-ink-muted">
                  {rangeValue}
                </p>
                <ClassLabel value='WashCalendar mode="range"' />
              </div>
            }
            html={`<!-- Range value: YYYY-MM-DD/YYYY-MM-DD -->
<WashCalendar
  mode="range"
  value="{rangeValue}"
  min="{calMin}"
  max="{calMax}"
  aria-label="Range planner"
/>`}
            jsx={`<WashCalendar
  mode="range"
  value={rangeValue}
  onChange={setRangeValue}
  min={calMin}
  max={calMax}
  aria-label="Range planner"
/>`}
          />
        </Section>

        <Section
          eyebrow="03 · Multi-day batch"
          title="Pick several days"
          description="Toggle days on and off. Selection is a space-separated ISO list."
        >
          <ShowcaseTabs
            preview={
              <div className="max-w-sm">
                <WashCalendar
                  mode="multi"
                  value={multiValue}
                  onChange={setMultiValue}
                  min={calMin}
                  max={calMax}
                  aria-label="Multi-day batch"
                />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {multiDays.map((d) => (
                    <span key={d} className="badge badge-outline badge-sm">
                      {formatDisplayDate(d)}
                    </span>
                  ))}
                </div>
                <ClassLabel value='WashCalendar mode="multi"' />
              </div>
            }
            html={`<!-- Multi value: space-separated YYYY-MM-DD list -->
<WashCalendar
  mode="multi"
  value="{multiValue}"
  min="{calMin}"
  max="{calMax}"
  aria-label="Multi-day batch"
/>`}
            jsx={`<WashCalendar
  mode="multi"
  value={multiValue}
  onChange={setMultiValue}
  min={calMin}
  max={calMax}
  aria-label="Multi-day batch"
/>`}
          />
        </Section>

        <Section
          eyebrow="04 · Constrained booking"
          title="Weekends blocked"
          description="Weekends are disallowed; booking window is today through 45 days."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="max-w-sm">
                <WashCalendar
                  mode="single"
                  value={bookValue}
                  onChange={setBookValue}
                  min={bookMin}
                  max={bookMax}
                  isDateDisallowed={isWeekend}
                  aria-label="Constrained booking"
                />
                <p className="mt-3 text-sm text-ink-muted">
                  Booked:{' '}
                  <span className="font-medium text-base-content">
                    {bookValue ? formatDisplayDate(bookValue) : 'None'}
                  </span>
                </p>
                <ClassLabel value="isDateDisallowed + min/max" />
              </div>
            }
            html={`<!-- Weekends blocked via isDateDisallowed; min/max window -->
<WashCalendar
  mode="single"
  value="{bookValue}"
  min="{bookMin}"
  max="{bookMax}"
  aria-label="Constrained booking"
/>
<!-- isDateDisallowed={(date) => weekend} -->`}
            jsx={`function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

<WashCalendar
  mode="single"
  value={bookValue}
  onChange={setBookValue}
  min={bookMin}
  max={bookMax}
  isDateDisallowed={isWeekend}
  aria-label="Constrained booking"
/>`}
          />
        </Section>

        <Section
          eyebrow="05 · Field popover"
          title="Compact picker in a dropdown"
          description="Same placement helpers as Data table date filters. size=sm, bordered=false."
        >
          <ShowcaseTabs
            preview={
              <>
                <details
                  ref={fieldRef}
                  className={`${fieldDropdownClass} w-full max-w-xs`}
                  onToggle={onFieldToggle}
                >
                  <summary
                    className="input input-bordered flex w-full max-w-xs cursor-pointer items-center justify-between gap-2 border-ink-border [&::-webkit-details-marker]:hidden"
                    aria-controls={fieldId}
                  >
                    <span>{formatDisplayDate(fieldDate)}</span>
                    <span className="label-ink text-xs">Open</span>
                  </summary>
                  <div
                    id={fieldId}
                    className={`dropdown-content z-50 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW} ${
                      fieldPlacement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'
                    }`}
                  >
                    <WashCalendar
                      mode="single"
                      size="sm"
                      bordered={false}
                      value={fieldDate}
                      onChange={(v) => {
                        setFieldDate(v)
                        if (fieldRef.current) fieldRef.current.open = false
                      }}
                      aria-label="Field date"
                    />
                  </div>
                </details>
                <div className="mt-2">
                  <ClassLabel value="details.dropdown + WashCalendar size=sm" />
                </div>
              </>
            }
            html={`<details class="dropdown">
  <summary class="input input-bordered cursor-pointer">
    <!-- selected date label -->
  </summary>
  <div class="dropdown-content z-50 rounded-box border border-ink-border bg-base-100 p-1">
    <WashCalendar
      mode="single"
      size="sm"
      bordered="false"
      value="{fieldDate}"
      aria-label="Field date"
    />
  </div>
</details>`}
            jsx={`<details
  ref={fieldRef}
  className={fieldDropdownClass}
  onToggle={onFieldToggle}
>
  <summary className="input input-bordered cursor-pointer">
    {formatDisplayDate(fieldDate)}
  </summary>
  <div className={\`dropdown-content \${DROPDOWN_PANEL_OVERFLOW}\`}>
    <WashCalendar
      mode="single"
      size="sm"
      bordered={false}
      value={fieldDate}
      onChange={(v) => {
        setFieldDate(v)
        if (fieldRef.current) fieldRef.current.open = false
      }}
      aria-label="Field date"
    />
  </div>
</details>`}
          />
        </Section>
      </div>

      {toast ? (
        <div className="toast toast-bottom toast-end z-[100]">
          <div
            className={`alert shadow-lg ${
              toast.tone === 'success' ? 'alert-success' : 'alert-error'
            }`}
          >
            {toast.tone === 'success' ? (
              <CircleCheck className="h-5 w-5 shrink-0" strokeWidth={2} />
            ) : (
              <CircleX className="h-5 w-5 shrink-0" strokeWidth={2} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      ) : null}
    </>
  )
}
