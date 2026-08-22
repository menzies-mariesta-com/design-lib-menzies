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
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-col gap-4 lg:flex-row lg:items-start\">\n            <div class=\"flex flex-wrap gap-2\">\n              <div class=\"tooltip tooltip-primary\" data-tip=\"Previous month\">\n                <button\n                  type=\"button\"\n                  class=\"btn btn-ghost btn-square btn-primary cursor-pointer\"\n                  aria-label=\"Previous month\"\n                  \n                >\n                  <!-- ChevronLeft -->\n                </button>\n              </div>\n              <div class=\"tooltip tooltip-primary\" data-tip=\"Next month\">\n                <button\n                  type=\"button\"\n                  class=\"btn btn-ghost btn-square btn-primary cursor-pointer\"\n                  aria-label=\"Next month\"\n                  \n                >\n                  <!-- ChevronRight -->\n                </button>\n              </div>\n              <button\n                type=\"button\"\n                class=\"btn btn-soft btn-primary cursor-pointer\"\n                \n              >\n                Today\n              </button>\n            </div>\n            <div class=\"min-w-0 flex-1\">\n              <calendar-date\n                \n                class=\"cally studio-cal w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n                value={monthValue}\n                focusedDate={monthFocus}\n                onchange={(e) => {\n                  const v = (e.target as HTMLInputElement).value\n                  setMonthValue(v)\n                  setMonthFocus(v)\n                }}\n              >\n                <!-- NavIcons -->\n                <calendar-month />\n              </calendar-date>\n              <p class=\"mt-3 text-sm text-ink-muted\">\n                Selected:{' '}\n                <span class=\"font-medium text-base-content\">\n                  {formatDisplayDate(monthValue)}\n                </span>{' '}\n                <span class=\"font-mono text-xs\">({monthValue})</span>\n              </p>\n              <!-- ClassLabel -->\n            </div>\n          </div>"}
            jsx={"<div className=\"flex flex-col gap-4 lg:flex-row lg:items-start\">\n            <div className=\"flex flex-wrap gap-2\">\n              <div className=\"tooltip tooltip-primary\" data-tip=\"Previous month\">\n                <button\n                  type=\"button\"\n                  className=\"btn btn-ghost btn-square btn-primary cursor-pointer\"\n                  aria-label=\"Previous month\"\n                  onClick={() => shiftMonth(-1)}\n                >\n                  <ChevronLeft className=\"size-5\" strokeWidth={2} />\n                </button>\n              </div>\n              <div className=\"tooltip tooltip-primary\" data-tip=\"Next month\">\n                <button\n                  type=\"button\"\n                  className=\"btn btn-ghost btn-square btn-primary cursor-pointer\"\n                  aria-label=\"Next month\"\n                  onClick={() => shiftMonth(1)}\n                >\n                  <ChevronRight className=\"size-5\" strokeWidth={2} />\n                </button>\n              </div>\n              <button\n                type=\"button\"\n                className=\"btn btn-soft btn-primary cursor-pointer\"\n                onClick={goToday}\n              >\n                Today\n              </button>\n            </div>\n            <div className=\"min-w-0 flex-1\">\n              <calendar-date\n                ref={monthRef}\n                className=\"cally studio-cal w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n                value={monthValue}\n                focusedDate={monthFocus}\n                onchange={(e) => {\n                  const v = (e.target as HTMLInputElement).value\n                  setMonthValue(v)\n                  setMonthFocus(v)\n                }}\n              >\n                <NavIcons />\n                <calendar-month />\n              </calendar-date>\n              <p className=\"mt-3 text-sm text-ink-muted\">\n                Selected:{' '}\n                <span className=\"font-medium text-base-content\">\n                  {formatDisplayDate(monthValue)}\n                </span>{' '}\n                <span className=\"font-mono text-xs\">({monthValue})</span>\n              </p>\n              <ClassLabel value=\"calendar-date.cally + calendar-month\" />\n            </div>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="02 · Date picker"
          title="Single date select"
          description="Bound value updates as you pick a day."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"max-w-sm\">\n            <calendar-date\n              class=\"cally w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n              value={pickedDate}\n              onchange={(e) =>\n                setPickedDate((e.target as HTMLInputElement).value)\n              }\n            >\n              <!-- NavIcons -->\n              <calendar-month />\n            </calendar-date>\n            <p class=\"mt-3 text-sm\">\n              Picked:{' '}\n              <span class=\"badge badge-primary badge-soft\">\n                {formatDisplayDate(pickedDate)}\n              </span>\n            </p>\n            <!-- ClassLabel -->\n          </div>"}
            jsx={"<div className=\"max-w-sm\">\n            <calendar-date\n              className=\"cally w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n              value={pickedDate}\n              onchange={(e) =>\n                setPickedDate((e.target as HTMLInputElement).value)\n              }\n            >\n              <NavIcons />\n              <calendar-month />\n            </calendar-date>\n            <p className=\"mt-3 text-sm\">\n              Picked:{' '}\n              <span className=\"badge badge-primary badge-soft\">\n                {formatDisplayDate(pickedDate)}\n              </span>\n            </p>\n            <ClassLabel value=\"calendar-date value={YYYY-MM-DD}\" />\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="03 · Date range"
          title="Inclusive range"
          description="calendar-range uses YYYY-MM-DD/YYYY-MM-DD. Start and end are inclusive."
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"max-w-md\">\n            <calendar-range\n              class=\"cally studio-cal w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n              value={rangeValue}\n              onchange={(e) =>\n                setRangeValue((e.target as HTMLInputElement).value)\n              }\n            >\n              <!-- NavIcons -->\n              <calendar-month />\n            </calendar-range>\n            <div class=\"mt-3 flex flex-wrap gap-2 text-sm\">\n              <span class=\"badge badge-outline\">\n                Start: {formatDisplayDate(rangeParts.start)}\n              </span>\n              <span class=\"badge badge-outline\">\n                End: {formatDisplayDate(rangeParts.end || rangeParts.start)}\n              </span>\n            </div>\n            <p class=\"mt-2 font-mono text-xs text-ink-muted\">{rangeValue}</p>\n            <!-- ClassLabel -->\n          </div>"}
            jsx={"<div className=\"max-w-md\">\n            <calendar-range\n              className=\"cally studio-cal w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n              value={rangeValue}\n              onchange={(e) =>\n                setRangeValue((e.target as HTMLInputElement).value)\n              }\n            >\n              <NavIcons />\n              <calendar-month />\n            </calendar-range>\n            <div className=\"mt-3 flex flex-wrap gap-2 text-sm\">\n              <span className=\"badge badge-outline\">\n                Start: {formatDisplayDate(rangeParts.start)}\n              </span>\n              <span className=\"badge badge-outline\">\n                End: {formatDisplayDate(rangeParts.end || rangeParts.start)}\n              </span>\n            </div>\n            <p className=\"mt-2 font-mono text-xs text-ink-muted\">{rangeValue}</p>\n            <ClassLabel value=\"calendar-range.cally\" />\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="04 · Popover"
          title="Inline dropdown picker"
          description="Calendar inside a details dropdown. Closes on outside click or Escape."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<details\n            \n            class={popoverDropdownClass}\n            onToggle={onPopoverToggle}\n          >\n            <summary\n              class=\"input input-bordered flex w-full max-w-xs cursor-pointer items-center justify-between gap-2 border-ink-border [&::-webkit-details-marker]:hidden\"\n              aria-controls={popoverId}\n            >\n              <span class={popoverDate ? 'text-base-content' : 'text-ink-muted'}>\n                {popoverDate\n                  ? formatDisplayDate(popoverDate)\n                  : 'Pick a studio date'}\n              </span>\n              <span class=\"label-ink text-xs\">Open</span>\n            </summary>\n            <div\n              id={popoverId}\n              class={`dropdown-content z-50 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW} ${\n                popoverPlacement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'\n              }`}\n            >\n              <calendar-date\n                class=\"cally bg-base-100\"\n                value={popoverDate}\n                onchange={(e) => {\n                  const v = (e.target as HTMLInputElement).value\n                  setPopoverDate(v)\n                  if (popoverRef.current) popoverRef.current.open = false\n                }}\n              >\n                <!-- NavIcons -->\n                <calendar-month />\n              </calendar-date>\n            </div>\n          </details>\n          <p class=\"mt-3 text-sm text-ink-muted\">\n            Value:{' '}\n            <span class=\"font-mono text-xs text-base-content\">\n              {popoverDate || '(none)'}\n            </span>\n          </p>\n          <!-- ClassLabel -->"}
            jsx={"<details\n            ref={popoverRef}\n            className={popoverDropdownClass}\n            onToggle={onPopoverToggle}\n          >\n            <summary\n              className=\"input input-bordered flex w-full max-w-xs cursor-pointer items-center justify-between gap-2 border-ink-border [&::-webkit-details-marker]:hidden\"\n              aria-controls={popoverId}\n            >\n              <span className={popoverDate ? 'text-base-content' : 'text-ink-muted'}>\n                {popoverDate\n                  ? formatDisplayDate(popoverDate)\n                  : 'Pick a studio date'}\n              </span>\n              <span className=\"label-ink text-xs\">Open</span>\n            </summary>\n            <div\n              id={popoverId}\n              className={`dropdown-content z-50 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW} ${\n                popoverPlacement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'\n              }`}\n            >\n              <calendar-date\n                className=\"cally bg-base-100\"\n                value={popoverDate}\n                onchange={(e) => {\n                  const v = (e.target as HTMLInputElement).value\n                  setPopoverDate(v)\n                  if (popoverRef.current) popoverRef.current.open = false\n                }}\n              >\n                <NavIcons />\n                <calendar-month />\n              </calendar-date>\n            </div>\n          </details>\n          <p className=\"mt-3 text-sm text-ink-muted\">\n            Value:{' '}\n            <span className=\"font-mono text-xs text-base-content\">\n              {popoverDate || '(none)'}\n            </span>\n          </p>\n          <ClassLabel value=\"details.dropdown + vertical placement + calendar-date.cally\" />"}
          />
        
        </Section>

        <Section
          eyebrow="05 · Studio schedule"
          title="Events on selected days"
          description="Sample watercolor studio sessions. Days with events show a primary underline. Click a day to filter, then add a session."
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr]\">\n            <div class=\"studio-cal-events min-w-0\">\n              <calendar-date\n                \n                class=\"cally w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n                value={scheduleDay}\n                onchange={(e) =>\n                  setScheduleDay((e.target as HTMLInputElement).value)\n                }\n              >\n                <!-- NavIcons -->\n                <calendar-month />\n              </calendar-date>\n              <!-- ClassLabel -->\n            </div>\n\n            <div class=\"flex min-w-0 flex-col gap-4\">\n              <div>\n                <p class=\"label-ink mb-2\">\n                  Sessions for {formatDisplayDate(scheduleDay)}\n                </p>\n                {dayEvents.length === 0 ? (\n                  <p class=\"text-sm text-ink-muted\">\n                    No sessions on this day. Add one below.\n                  </p>\n                ) : (\n                  <ul class=\"space-y-2\">\n                    {dayEvents.map((item) => (\n                      <li\n                        key={item.id}\n                        class=\"rounded-box border border-ink-border/80 bg-base-100/80 px-3 py-2\"\n                      >\n                        <p class=\"font-medium\">{item.title}</p>\n                        <p class=\"text-sm text-ink-muted\">{item.note}</p>\n                      </li>\n                    ))}\n                  </ul>\n                )}\n              </div>\n\n              <form\n                class=\"rounded-box border border-ink-border/80 bg-base-100/60 p-4\"\n                onSubmit={onAddEvent}\n              >\n                <h3 class=\"card-title text-primary font-bold text-base\">\n                  Add studio session\n                </h3>\n                <div class=\"mt-3 flex flex-col gap-3\">\n                  <label class=\"form-control w-full\" for=\"session-title\">\n                    <span class=\"label-text mb-1\">\n                      Title\n                      <span\n                        class=\"text-error align-top text-sm leading-none\"\n                        aria-hidden=\"true\"\n                      >\n                        *\n                      </span>\n                    </span>\n                    <input\n                      id=\"session-title\"\n                      class=\"input input-bordered w-full cursor-text border-ink-border\"\n                      value={newTitle}\n                      \n                      required\n                      placeholder=\"Glazing demo\" />\n                  </label>\n                  <label class=\"form-control w-full\" for=\"session-note\">\n                    <span class=\"label-text mb-1\">Note</span>\n                    <input\n                      id=\"session-note\"\n                      class=\"input input-bordered w-full cursor-text border-ink-border\"\n                      value={newNote}\n                      \n                      placeholder=\"Optional detail\" />\n                  </label>\n                  <p class=\"text-xs text-ink-muted\">\n                    Date locked to selected day:{' '}\n                    <span class=\"font-mono\">{scheduleDay}</span>\n                  </p>\n                  <button type=\"submit\" class=\"btn btn-primary cursor-pointer self-start\">\n                    Add session\n                  </button>\n                </div>\n              </form>\n            </div>\n          </div>"}
            jsx={"<div className=\"grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr]\">\n            <div className=\"studio-cal-events min-w-0\">\n              <calendar-date\n                ref={scheduleRef}\n                className=\"cally w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n                value={scheduleDay}\n                onchange={(e) =>\n                  setScheduleDay((e.target as HTMLInputElement).value)\n                }\n              >\n                <NavIcons />\n                <calendar-month />\n              </calendar-date>\n              <ClassLabel value=\"getDayParts \u2192 ::part(event)\" />\n            </div>\n\n            <div className=\"flex min-w-0 flex-col gap-4\">\n              <div>\n                <p className=\"label-ink mb-2\">\n                  Sessions for {formatDisplayDate(scheduleDay)}\n                </p>\n                {dayEvents.length === 0 ? (\n                  <p className=\"text-sm text-ink-muted\">\n                    No sessions on this day. Add one below.\n                  </p>\n                ) : (\n                  <ul className=\"space-y-2\">\n                    {dayEvents.map((item) => (\n                      <li\n                        key={item.id}\n                        className=\"rounded-box border border-ink-border/80 bg-base-100/80 px-3 py-2\"\n                      >\n                        <p className=\"font-medium\">{item.title}</p>\n                        <p className=\"text-sm text-ink-muted\">{item.note}</p>\n                      </li>\n                    ))}\n                  </ul>\n                )}\n              </div>\n\n              <form\n                className=\"rounded-box border border-ink-border/80 bg-base-100/60 p-4\"\n                onSubmit={onAddEvent}\n              >\n                <h3 className=\"card-title text-primary font-bold text-base\">\n                  Add studio session\n                </h3>\n                <div className=\"mt-3 flex flex-col gap-3\">\n                  <label className=\"form-control w-full\" htmlFor=\"session-title\">\n                    <span className=\"label-text mb-1\">\n                      Title\n                      <span\n                        className=\"text-error align-top text-sm leading-none\"\n                        aria-hidden=\"true\"\n                      >\n                        *\n                      </span>\n                    </span>\n                    <input\n                      id=\"session-title\"\n                      className=\"input input-bordered w-full cursor-text border-ink-border\"\n                      value={newTitle}\n                      onChange={(e) => setNewTitle(e.target.value)}\n                      required\n                      placeholder=\"Glazing demo\"\n                    />\n                  </label>\n                  <label className=\"form-control w-full\" htmlFor=\"session-note\">\n                    <span className=\"label-text mb-1\">Note</span>\n                    <input\n                      id=\"session-note\"\n                      className=\"input input-bordered w-full cursor-text border-ink-border\"\n                      value={newNote}\n                      onChange={(e) => setNewNote(e.target.value)}\n                      placeholder=\"Optional detail\"\n                    />\n                  </label>\n                  <p className=\"text-xs text-ink-muted\">\n                    Date locked to selected day:{' '}\n                    <span className=\"font-mono\">{scheduleDay}</span>\n                  </p>\n                  <button type=\"submit\" className=\"btn btn-primary cursor-pointer self-start\">\n                    Add session\n                  </button>\n                </div>\n              </form>\n            </div>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="06 · Sizes and variants"
          title="Layout modifiers"
          description="Common Cally and daisyUI compositions with class labels."
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"grid gap-6 sm:grid-cols-2 xl:grid-cols-3\">\n            <div class=\"flex flex-col gap-2\">\n              <calendar-date class=\"cally max-w-[14rem] rounded-box border border-base-300 bg-base-100 p-1 shadow-sm\">\n                <!-- NavIcons -->\n                <calendar-month />\n              </calendar-date>\n              <!-- ClassLabel -->\n            </div>\n\n            <div class=\"flex flex-col gap-2\">\n              <calendar-date\n                class=\"cally w-full rounded-box border border-primary bg-base-100 shadow-lg\"\n                showOutsideDays\n              >\n                <!-- NavIcons -->\n                <calendar-month />\n              </calendar-date>\n              <!-- ClassLabel -->\n            </div>\n\n            <div class=\"flex flex-col gap-2\">\n              <calendar-date\n                class=\"cally w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n                showWeekNumbers\n                formatWeekday=\"short\"\n              >\n                <!-- NavIcons -->\n                <calendar-month />\n              </calendar-date>\n              <!-- ClassLabel -->\n            </div>\n\n            <div class=\"flex flex-col gap-2 sm:col-span-2\">\n              <calendar-range\n                class=\"cally studio-cal w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n                months={2}\n                value={`${todayISO}/${shiftISODate(todayISO, 10)}`}\n              >\n                <!-- NavIcons -->\n                <calendar-month />\n                <calendar-month offset={1} />\n              </calendar-range>\n              <!-- ClassLabel -->\n            </div>\n\n            <div class=\"flex flex-col gap-2\">\n              <label class=\"form-control w-full max-w-xs\">\n                <span class=\"label-text mb-1\">Native date input</span>\n                <input\n                  type=\"date\"\n                  class=\"input input-bordered cursor-pointer border-ink-border\"\n                  value=\"todayISO\" />\n              </label>\n              <!-- ClassLabel -->\n            </div>\n          </div>"}
            jsx={"<div className=\"grid gap-6 sm:grid-cols-2 xl:grid-cols-3\">\n            <div className=\"flex flex-col gap-2\">\n              <calendar-date className=\"cally max-w-[14rem] rounded-box border border-base-300 bg-base-100 p-1 shadow-sm\">\n                <NavIcons />\n                <calendar-month />\n              </calendar-date>\n              <ClassLabel value=\"cally max-w-[14rem] shadow-sm\" />\n            </div>\n\n            <div className=\"flex flex-col gap-2\">\n              <calendar-date\n                className=\"cally w-full rounded-box border border-primary bg-base-100 shadow-lg\"\n                showOutsideDays\n              >\n                <NavIcons />\n                <calendar-month />\n              </calendar-date>\n              <ClassLabel value=\"cally show-outside-days border-primary\" />\n            </div>\n\n            <div className=\"flex flex-col gap-2\">\n              <calendar-date\n                className=\"cally w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n                showWeekNumbers\n                formatWeekday=\"short\"\n              >\n                <NavIcons />\n                <calendar-month />\n              </calendar-date>\n              <ClassLabel value=\"show-week-numbers format-weekday=short\" />\n            </div>\n\n            <div className=\"flex flex-col gap-2 sm:col-span-2\">\n              <calendar-range\n                className=\"cally studio-cal w-full rounded-box border border-base-300 bg-base-100 shadow-lg\"\n                months={2}\n                value={`${todayISO}/${shiftISODate(todayISO, 10)}`}\n              >\n                <NavIcons />\n                <calendar-month />\n                <calendar-month offset={1} />\n              </calendar-range>\n              <ClassLabel value=\"calendar-range months={2} + offset={1}\" />\n            </div>\n\n            <div className=\"flex flex-col gap-2\">\n              <label className=\"form-control w-full max-w-xs\">\n                <span className=\"label-text mb-1\">Native date input</span>\n                <input\n                  type=\"date\"\n                  className=\"input input-bordered cursor-pointer border-ink-border\"\n                  defaultValue={todayISO}\n                />\n              </label>\n              <ClassLabel value=\"input[type=date]\" />\n            </div>\n          </div>"}
          />
        
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
