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
  CircleCheck,
  CircleX,
  ChevronLeft,
  ChevronRight,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import 'cally'
import {
  getSeedStudioEvents,
  type StudioEvent,
} from './data/calendar-events'
import { shiftISODate, toISODate } from './data/dates'
import {
  DROPDOWN_PANEL_OVERFLOW,
  useDetailsDropdownPlacement,
} from './dropdownPlacement'

function formatDisplayDate(iso: string): string {
  if (!iso) return 'None'
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function parseRange(value: string): { start: string; end: string } {
  const [start = '', end = ''] = value.split('/')
  return { start, end }
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
        <path
          fill="currentColor"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
      <svg
        aria-label="Next"
        className="size-4 fill-current"
        slot="next"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
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
const seedEvents = getSeedStudioEvents()

export default function CalendarPage() {
  const [monthValue, setMonthValue] = useState(todayISO)
  const [monthFocus, setMonthFocus] = useState(todayISO)
  const monthRef = useRef<HTMLElement>(null)

  const [pickedDate, setPickedDate] = useState(todayISO)

  const [rangeValue, setRangeValue] = useState(
    `${todayISO}/${shiftISODate(todayISO, 6)}`,
  )
  const rangeParts = parseRange(rangeValue)

  const [popoverDate, setPopoverDate] = useState('')
  const popoverRef = useRef<HTMLDetailsElement>(null)
  const popoverId = useId()
  const { placement: popoverPlacement, className: popoverDropdownClass, onToggle: onPopoverToggle } =
    useDetailsDropdownPlacement(popoverRef, { panelWidth: 288, panelHeight: 340 })

  const [events, setEvents] = useState<StudioEvent[]>(seedEvents)
  const [scheduleDay, setScheduleDay] = useState(todayISO)
  const [newTitle, setNewTitle] = useState('')
  const [newNote, setNewNote] = useState('')
  const [toast, setToast] = useState<{
    message: string
    tone: 'success' | 'error'
  } | null>(null)
  const scheduleRef = useRef<HTMLElement>(null)

  const eventDates = useMemo(() => {
    const set = new Set(events.map((e) => e.date))
    return set
  }, [events])

  const getEventDayParts = useCallback(
    (date: Date) => (eventDates.has(toISODate(date)) ? 'event' : ''),
    [eventDates],
  )

  const dayEvents = useMemo(
    () =>
      events
        .filter((e) => e.date === scheduleDay)
        .sort((a, b) => a.title.localeCompare(b.title)),
    [events, scheduleDay],
  )

  useEffect(() => {
    const el = scheduleRef.current as
      | (HTMLElement & { getDayParts?: (d: Date) => string })
      | null
    if (el) el.getDayParts = getEventDayParts
  }, [getEventDayParts])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = popoverRef.current
      if (!el?.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && popoverRef.current?.open) {
        popoverRef.current.open = false
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3500)
    return () => window.clearTimeout(t)
  }, [toast])

  function goToday() {
    const t = toISODate(new Date())
    setMonthValue(t)
    setMonthFocus(t)
    const host = monthRef.current as
      | (HTMLElement & { focus?: (o?: { target?: string }) => void })
      | null
    host?.focus?.({ target: 'day' })
  }

  function shiftMonth(delta: number) {
    const [y, m] = monthFocus.split('-').map(Number)
    const next = new Date(y, m - 1 + delta, 1)
    setMonthFocus(toISODate(next))
  }

  function onAddEvent(event: FormEvent) {
    event.preventDefault()
    const title = newTitle.trim()
    if (!title) {
      setToast({ message: 'Title is required', tone: 'error' })
      return
    }
    const entry: StudioEvent = {
      id: `e-${Date.now()}`,
      date: scheduleDay,
      title,
      note: newNote.trim() || 'Studio session',
    }
    setEvents((prev) => [...prev, entry])
    setNewTitle('')
    setNewNote('')
    setToast({ message: `Added "${title}"`, tone: 'success' })
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Calendar
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">cally</span> date,
          range, and popover patterns for the studio desk. Values stay date-only
          as <span className="font-mono text-xs">YYYY-MM-DD</span>.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Month"
          title="Month calendar"
          description="Navigable month view with previous, next, and today."
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
            <div className="flex flex-wrap gap-2">
              <div className="tooltip tooltip-primary" data-tip="Previous month">
                <button
                  type="button"
                  className="btn btn-ghost btn-square btn-primary cursor-pointer"
                  aria-label="Previous month"
                  onClick={() => shiftMonth(-1)}
                >
                  <ChevronLeft className="size-5" strokeWidth={2} />
                </button>
              </div>
              <div className="tooltip tooltip-primary" data-tip="Next month">
                <button
                  type="button"
                  className="btn btn-ghost btn-square btn-primary cursor-pointer"
                  aria-label="Next month"
                  onClick={() => shiftMonth(1)}
                >
                  <ChevronRight className="size-5" strokeWidth={2} />
                </button>
              </div>
              <button
                type="button"
                className="btn btn-soft btn-primary cursor-pointer"
                onClick={goToday}
              >
                Today
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <calendar-date
                ref={monthRef}
                className="cally studio-cal w-full rounded-box border border-base-300 bg-base-100 shadow-lg"
                value={monthValue}
                focusedDate={monthFocus}
                onchange={(e) => {
                  const v = (e.target as HTMLInputElement).value
                  setMonthValue(v)
                  setMonthFocus(v)
                }}
              >
                <NavIcons />
                <calendar-month />
              </calendar-date>
              <p className="mt-3 text-sm text-ink-muted">
                Selected:{' '}
                <span className="font-medium text-base-content">
                  {formatDisplayDate(monthValue)}
                </span>{' '}
                <span className="font-mono text-xs">({monthValue})</span>
              </p>
              <ClassLabel value="calendar-date.cally + calendar-month" />
            </div>
          </div>
        </Section>

        <Section
          eyebrow="02 · Date picker"
          title="Single date select"
          description="Bound value updates as you pick a day."
          panel="wash-panel-ochre"
        >
          <div className="max-w-sm">
            <calendar-date
              className="cally w-full rounded-box border border-base-300 bg-base-100 shadow-lg"
              value={pickedDate}
              onchange={(e) =>
                setPickedDate((e.target as HTMLInputElement).value)
              }
            >
              <NavIcons />
              <calendar-month />
            </calendar-date>
            <p className="mt-3 text-sm">
              Picked:{' '}
              <span className="badge badge-primary badge-soft">
                {formatDisplayDate(pickedDate)}
              </span>
            </p>
            <ClassLabel value="calendar-date value={YYYY-MM-DD}" />
          </div>
        </Section>

        <Section
          eyebrow="03 · Date range"
          title="Inclusive range"
          description="calendar-range uses YYYY-MM-DD/YYYY-MM-DD. Start and end are inclusive."
        >
          <div className="max-w-md">
            <calendar-range
              className="cally studio-cal w-full rounded-box border border-base-300 bg-base-100 shadow-lg"
              value={rangeValue}
              onchange={(e) =>
                setRangeValue((e.target as HTMLInputElement).value)
              }
            >
              <NavIcons />
              <calendar-month />
            </calendar-range>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="badge badge-outline">
                Start: {formatDisplayDate(rangeParts.start)}
              </span>
              <span className="badge badge-outline">
                End: {formatDisplayDate(rangeParts.end || rangeParts.start)}
              </span>
            </div>
            <p className="mt-2 font-mono text-xs text-ink-muted">{rangeValue}</p>
            <ClassLabel value="calendar-range.cally" />
          </div>
        </Section>

        <Section
          eyebrow="04 · Popover"
          title="Inline dropdown picker"
          description="Calendar inside a details dropdown. Closes on outside click or Escape."
          panel="wash-panel-rose"
        >
          <details
            ref={popoverRef}
            className={popoverDropdownClass}
            onToggle={onPopoverToggle}
          >
            <summary
              className="input input-bordered flex w-full max-w-xs cursor-pointer items-center justify-between gap-2 border-ink-border [&::-webkit-details-marker]:hidden"
              aria-controls={popoverId}
            >
              <span className={popoverDate ? 'text-base-content' : 'text-ink-muted'}>
                {popoverDate
                  ? formatDisplayDate(popoverDate)
                  : 'Pick a studio date'}
              </span>
              <span className="label-ink text-xs">Open</span>
            </summary>
            <div
              id={popoverId}
              className={`dropdown-content z-50 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW} ${
                popoverPlacement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'
              }`}
            >
              <calendar-date
                className="cally bg-base-100"
                value={popoverDate}
                onchange={(e) => {
                  const v = (e.target as HTMLInputElement).value
                  setPopoverDate(v)
                  if (popoverRef.current) popoverRef.current.open = false
                }}
              >
                <NavIcons />
                <calendar-month />
              </calendar-date>
            </div>
          </details>
          <p className="mt-3 text-sm text-ink-muted">
            Value:{' '}
            <span className="font-mono text-xs text-base-content">
              {popoverDate || '(none)'}
            </span>
          </p>
          <ClassLabel value="details.dropdown + vertical placement + calendar-date.cally" />
        </Section>

        <Section
          eyebrow="05 · Studio schedule"
          title="Events on selected days"
          description="Sample watercolor studio sessions. Days with events show a primary underline. Click a day to filter, then add a session."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr]">
            <div className="studio-cal-events min-w-0">
              <calendar-date
                ref={scheduleRef}
                className="cally w-full rounded-box border border-base-300 bg-base-100 shadow-lg"
                value={scheduleDay}
                onchange={(e) =>
                  setScheduleDay((e.target as HTMLInputElement).value)
                }
              >
                <NavIcons />
                <calendar-month />
              </calendar-date>
              <ClassLabel value="getDayParts → ::part(event)" />
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              <div>
                <p className="label-ink mb-2">
                  Sessions for {formatDisplayDate(scheduleDay)}
                </p>
                {dayEvents.length === 0 ? (
                  <p className="text-sm text-ink-muted">
                    No sessions on this day. Add one below.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {dayEvents.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-box border border-ink-border/80 bg-base-100/80 px-3 py-2"
                      >
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-ink-muted">{item.note}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <form
                className="rounded-box border border-ink-border/80 bg-base-100/60 p-4"
                onSubmit={onAddEvent}
              >
                <h3 className="card-title text-primary font-bold text-base">
                  Add studio session
                </h3>
                <div className="mt-3 flex flex-col gap-3">
                  <label className="form-control w-full" htmlFor="session-title">
                    <span className="label-text mb-1">
                      Title
                      <span
                        className="text-error align-top text-sm leading-none"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </span>
                    <input
                      id="session-title"
                      className="input input-bordered w-full cursor-text border-ink-border"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      placeholder="Glazing demo"
                    />
                  </label>
                  <label className="form-control w-full" htmlFor="session-note">
                    <span className="label-text mb-1">Note</span>
                    <input
                      id="session-note"
                      className="input input-bordered w-full cursor-text border-ink-border"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Optional detail"
                    />
                  </label>
                  <p className="text-xs text-ink-muted">
                    Date locked to selected day:{' '}
                    <span className="font-mono">{scheduleDay}</span>
                  </p>
                  <button type="submit" className="btn btn-primary cursor-pointer self-start">
                    Add session
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="06 · Sizes and variants"
          title="Layout modifiers"
          description="Common Cally and daisyUI compositions with class labels."
        >
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <div className="flex flex-col gap-2">
              <calendar-date className="cally max-w-[14rem] rounded-box border border-base-300 bg-base-100 p-1 shadow-sm">
                <NavIcons />
                <calendar-month />
              </calendar-date>
              <ClassLabel value="cally max-w-[14rem] shadow-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <calendar-date
                className="cally w-full rounded-box border border-primary bg-base-100 shadow-lg"
                showOutsideDays
              >
                <NavIcons />
                <calendar-month />
              </calendar-date>
              <ClassLabel value="cally show-outside-days border-primary" />
            </div>

            <div className="flex flex-col gap-2">
              <calendar-date
                className="cally w-full rounded-box border border-base-300 bg-base-100 shadow-lg"
                showWeekNumbers
                formatWeekday="short"
              >
                <NavIcons />
                <calendar-month />
              </calendar-date>
              <ClassLabel value="show-week-numbers format-weekday=short" />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <calendar-range
                className="cally studio-cal w-full rounded-box border border-base-300 bg-base-100 shadow-lg"
                months={2}
                value={`${todayISO}/${shiftISODate(todayISO, 10)}`}
              >
                <NavIcons />
                <calendar-month />
                <calendar-month offset={1} />
              </calendar-range>
              <ClassLabel value="calendar-range months={2} + offset={1}" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-control w-full max-w-xs">
                <span className="label-text mb-1">Native date input</span>
                <input
                  type="date"
                  className="input input-bordered cursor-pointer border-ink-border"
                  defaultValue={todayISO}
                />
              </label>
              <ClassLabel value="input[type=date]" />
            </div>
          </div>
        </Section>
      </div>

      {toast ? (
        <div className="toast toast-bottom toast-end z-[100]">
          <div
            className={`alert shadow-lg ${toast.tone === 'success' ? 'alert-success' : 'alert-error'}`}
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
