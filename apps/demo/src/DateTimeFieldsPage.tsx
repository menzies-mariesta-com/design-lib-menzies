import { ShowcaseTabs } from './components/ShowcaseTabs'
import { washCalendarSvelteFiles } from './snippets/svelte/calendar'
import { timeSvelteFiles } from './snippets/svelte/time'
import { daisyCalendar, daisyTime } from './components/daisyUiPasteMarkup'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  DROPDOWN_PANEL_OVERFLOW,
  CalendarMonth,
  TimeClockDial,
  useDetailsDropdownPlacement,
} from '#plain'
import { toISODate, shiftISODate } from './data/dates'

const todayISO = toISODate(new Date())

function stripCalendarTime(html: string) {
  return html
    .replace(/ wash-calendar--with-time/g, '')
    .replace(/\n  <div [^>]*wash-calendar__time[^>]*>[\s\S]*?\n  <\/div>(?=\n<\/div>)/, '')
}

function toPasteJsx(html: string) {
  return html
    .replace(/class=/g, 'className=')
    .replace(/ stroke-width=/g, ' strokeWidth=')
    .replace(/\stabindex="/g, ' tabIndex="')
    .replace(/ tabIndex="(\d+)"/g, ' tabIndex={$1}')
    .replace(/\sfor=/g, ' htmlFor=')
    .replace(/(<input[^>]*?)\schecked(\s|\/|>)/g, '$1 defaultChecked$2')
}

const pasteTime = daisyTime(false)
const pasteCal = stripCalendarTime(daisyCalendar(false))
const pasteCalTime = daisyCalendar(false)
const pasteToday = '2026-09-23'

const timeFieldHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <fieldset class="fieldset max-w-xs">
    <legend class="fieldset-legend">Session start</legend>
    ${pasteTime}
    <p class="label">Analog dial · HH:mm:ss</p>
    <p class="mt-3 text-sm text-ink-muted">Value: <span class="font-mono text-xs text-base-content">9:00:00 AM</span></p>
  </fieldset>
  <div class="space-y-4">
    <p class="label-ink">Sizes</p>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <span class="label-ink w-8 shrink-0">SM</span>
        <div class="max-w-xs flex-1">${pasteTime}</div>
      </div>
      <div class="flex items-center gap-3">
        <span class="label-ink w-8 shrink-0">MD</span>
        <div class="max-w-xs flex-1">${pasteTime}</div>
      </div>
    </div>
  </div>
</div>
<div class="mt-6">
  <p class="label-ink mb-3">Trigger colors</p>
  <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <div>${pasteTime}</div>
    <div>${pasteTime.replace('input-bordered', 'input-bordered input-primary')}</div>
    <div>${pasteTime.replace('input-bordered', 'input-bordered input-secondary')}</div>
    <div>${pasteTime.replace('input-bordered', 'input-bordered input-accent')}</div>
  </div>
</div>`
const timeFieldJsx = toPasteJsx(timeFieldHtml)

const dateFieldHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <fieldset class="fieldset max-w-xs">
    <legend class="fieldset-legend">Native date</legend>
    <input type="date" value="${pasteToday}" class="input input-bordered w-full cursor-text border-ink-border" aria-label="Native date" />
  </fieldset>
  <fieldset class="fieldset max-w-xs">
    <legend class="fieldset-legend">Wash calendar dropdown</legend>
    <details class="dropdown w-full">
      <summary class="input input-bordered flex w-full cursor-pointer items-center justify-between gap-2 border-ink-border [&::-webkit-details-marker]:hidden">
        <span class="text-base-content">${pasteToday}</span>
        <span class="label-ink text-xs">Open</span>
      </summary>
      <div class="dropdown-content z-50 mt-2 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)]">
        ${pasteCal}
      </div>
    </details>
  </fieldset>
</div>`
const dateFieldJsx = toPasteJsx(dateFieldHtml)

const dateTimeFieldHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <fieldset class="fieldset max-w-sm">
    <legend class="fieldset-legend">Native datetime-local</legend>
    <input type="datetime-local" value="${pasteToday}T09:00" class="input input-bordered w-full cursor-text border-ink-border" aria-label="Date and time" />
  </fieldset>
  <fieldset class="fieldset max-w-sm">
    <legend class="fieldset-legend">Composed date + time</legend>
    <div class="flex flex-col gap-3 sm:flex-row">
      <input type="date" value="${pasteToday}" class="input input-bordered w-full cursor-text border-ink-border" aria-label="Composed date" />
      ${pasteTime}
    </div>
  </fieldset>
</div>`
const dateTimeFieldJsx = toPasteJsx(dateTimeFieldHtml)

const timeRangeHtml = `<fieldset class="fieldset max-w-lg">
  <legend class="fieldset-legend">Studio session hours</legend>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <label class="label" for="session-start"><span class="label-text">Start</span></label>
      ${pasteTime}
    </div>
    <span class="hidden pb-3 text-ink-muted sm:inline" aria-hidden="true">to</span>
    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <label class="label" for="session-end"><span class="label-text">End</span></label>
      ${pasteTime.replaceAll('09:00:00', '17:00:00').replace('>09</button>', '>17</button>')}
    </div>
  </div>
  <p class="label">Inclusive window for open studio</p>
</fieldset>`
const timeRangeJsx = toPasteJsx(timeRangeHtml)

const dateRangeHtml = `<div class="flex flex-col gap-4 lg:flex-row lg:items-start">
  ${pasteCal}
  <div class="min-w-0 space-y-2">
    <p class="label-ink">Selected range</p>
    <p class="text-sm">Start: <span class="font-mono text-xs">${pasteToday}</span></p>
    <p class="text-sm">End: <span class="font-mono text-xs">(none)</span></p>
  </div>
</div>`
const dateRangeJsx = toPasteJsx(dateRangeHtml)

const dateTimeRangeHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Range start</legend>
    <div class="flex flex-col gap-3 sm:flex-row">
      <input type="date" value="${pasteToday}" class="input input-bordered w-full cursor-text border-ink-border" aria-label="Range start date" />
      ${pasteTime}
    </div>
  </fieldset>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Range end</legend>
    <div class="flex flex-col gap-3 sm:flex-row">
      <input type="date" value="${pasteToday}" class="input input-bordered w-full cursor-text border-ink-border" aria-label="Range end date" />
      ${pasteTime.replaceAll('09:00:00', '17:00:00').replace('>09</button>', '>17</button>')}
    </div>
  </fieldset>
</div>
<div class="mt-4 rounded-box border border-ink-border/80 bg-base-100/60 px-4 py-3">
  <p class="label-ink">Live summary</p>
  <p class="mt-1 text-sm font-medium">Sep 23, 9:00:00 AM to Sep 23, 5:00:00 PM</p>
</div>`
const dateTimeRangeJsx = toPasteJsx(dateTimeRangeHtml)

const studioHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <div class="space-y-4">
    <h3 class="card-title text-primary font-bold text-base">Dry window</h3>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Starts drying</legend>
      <div class="flex flex-col gap-3 sm:flex-row">
        <input type="date" value="${pasteToday}" class="input input-bordered w-full cursor-text border-ink-border" aria-label="Dry start date" />
        ${pasteTime}
      </div>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Ready by</legend>
      <div class="flex flex-col gap-3 sm:flex-row">
        <input type="date" value="${pasteToday}" class="input input-bordered w-full cursor-text border-ink-border" aria-label="Dry end date" />
        ${pasteTime.replaceAll('09:00:00', '18:00:00').replace('>09</button>', '>18</button>')}
      </div>
    </fieldset>
  </div>
  <div class="space-y-4">
    <h3 class="card-title text-secondary font-bold text-base">Critique booking</h3>
    <fieldset class="fieldset max-w-xs">
      <legend class="fieldset-legend">Date and time</legend>
      <details class="dropdown w-full" open>
        <summary class="input input-bordered flex w-full cursor-pointer items-center justify-between gap-2 border-ink-border [&::-webkit-details-marker]:hidden">
          <span class="text-base-content">${pasteToday}T09:00</span>
          <span class="label-ink text-xs">Open</span>
        </summary>
        <div class="dropdown-content z-50 mt-2 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)]">
          ${pasteCalTime}
        </div>
      </details>
    </fieldset>
  </div>
</div>`
const studioJsx = toPasteJsx(studioHtml)

const statesHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <form class="space-y-4">
    <fieldset class="fieldset max-w-xs">
      <legend class="fieldset-legend">Delivery date<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></legend>
      <input type="date" required class="input input-bordered w-full cursor-text border-ink-border" aria-label="Delivery date" />
    </fieldset>
    <fieldset class="fieldset max-w-xs">
      <legend class="fieldset-legend">Pickup time<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></legend>
      ${pasteTime}
    </fieldset>
    <button type="submit" class="btn btn-primary cursor-pointer">Check required</button>
  </form>
  <div class="space-y-4">
    <fieldset class="fieldset max-w-xs opacity-70">
      <legend class="fieldset-legend">Locked date</legend>
      <input type="date" value="${pasteToday}" disabled class="input input-bordered w-full cursor-not-allowed border-ink-border" aria-label="Locked date" />
    </fieldset>
    <fieldset class="fieldset max-w-xs opacity-70">
      <legend class="fieldset-legend">Locked time</legend>
      ${pasteTime.replaceAll('09:00:00', '16:00:00').replace('>09</button>', '>16</button>').replace(' open', '')}
    </fieldset>
    <fieldset class="fieldset max-w-xs opacity-70">
      <legend class="fieldset-legend">Locked datetime</legend>
      <input type="datetime-local" value="${pasteToday}T16:00" disabled class="input input-bordered w-full cursor-not-allowed border-ink-border" aria-label="Locked datetime" />
    </fieldset>
  </div>
</div>`
const statesJsx = toPasteJsx(statesHtml)

const responsiveHtml = `<div class="mx-auto w-full max-w-sm space-y-4 rounded-box border border-dashed border-ink-border/80 p-4">
  <p class="label-ink">~360px phone column</p>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Open hours</legend>
    <div class="flex flex-col gap-3">
      ${pasteTime.replaceAll('09:00:00', '10:00:00').replace('>09</button>', '>10</button>')}
      ${pasteTime.replaceAll('09:00:00', '18:00:00').replace('>09</button>', '>18</button>')}
    </div>
  </fieldset>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Workshop day</legend>
    <input type="date" value="${pasteToday}" class="input input-bordered w-full cursor-text border-ink-border" aria-label="Workshop day" />
  </fieldset>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Check-in</legend>
    <input type="datetime-local" value="${pasteToday}T10:00" class="input input-bordered w-full cursor-text border-ink-border" aria-label="Check-in" />
  </fieldset>
</div>`
const responsiveJsx = toPasteJsx(responsiveHtml)

const timeColors = [
  { name: 'Default', className: '' },
  { name: 'Primary', className: 'input-primary' },
  { name: 'Secondary', className: 'input-secondary' },
  { name: 'Accent', className: 'input-accent' },
] as const

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

function LiveValue({ label, value }: { label?: string; value: string }) {
  return (
    <p className="mt-3 text-sm text-ink-muted">
      {label ?? 'Value'}:{' '}
      <span className="font-mono text-xs text-base-content">
        {value || '(none)'}
      </span>
    </p>
  )
}

function RequiredMark() {
  return (
    <span
      className="text-error align-top text-sm leading-none"
      aria-hidden="true"
    >
      *
    </span>
  )
}

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

function formatTime12(hhmm: string): string {
  if (!hhmm) return '(none)'
  const parts = hhmm.split(':')
  const h = Number(parts[0])
  const m = Number(parts[1])
  const s = parts[2] != null ? Number(parts[2]) : null
  if (Number.isNaN(h) || Number.isNaN(m)) return hhmm
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  const base = `${hour12}:${String(m).padStart(2, '0')}`
  if (s != null && !Number.isNaN(s)) {
    return `${base}:${String(s).padStart(2, '0')} ${period}`
  }
  return `${base} ${period}`
}

function formatDateTimeLocal(value: string): string {
  if (!value) return '(none)'
  const [datePart, timePart] = value.split('T')
  if (!datePart || !timePart) return value
  return `${formatDisplayDate(datePart)} · ${formatTime12(timePart.slice(0, 5))}`
}

function compareTime(a: string, b: string): number {
  if (!a || !b) return 0
  return a.localeCompare(b)
}

function useOutsideCloseDetails(ref: RefObject<HTMLDetailsElement | null>) {
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = ref.current
      if (!el?.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.open = false
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [ref])
}

export default function DateTimeFieldsPage() {
  const [timeValue, setTimeValue] = useState('09:30:00')
  const [timeColorDemo, setTimeColorDemo] = useState('14:00:00')
  const [timeSizeDemo, setTimeSizeDemo] = useState('11:15:00')

  const [nativeDate, setNativeDate] = useState(todayISO)
  const [washDate, setWashDate] = useState(todayISO)
  const datePickerRef = useRef<HTMLDetailsElement>(null)
  const datePickerId = useId()
  const {
    placement: datePlacement,
    className: dateDropdownClass,
    onToggle: onDateToggle,
  } = useDetailsDropdownPlacement(datePickerRef, {
    panelWidth: 288,
    panelHeight: 340,
  })
  useOutsideCloseDetails(datePickerRef)

  const [datetimeLocal, setDatetimeLocal] = useState(`${todayISO}T10:00`)
  const [composedDate, setComposedDate] = useState(todayISO)
  const [composedTime, setComposedTime] = useState('10:00:00')

  const [sessionStart, setSessionStart] = useState('09:00:00')
  const [sessionEnd, setSessionEnd] = useState('12:00:00')

  const [dateRange, setDateRange] = useState(
    `${todayISO}/${shiftISODate(todayISO, 4)}`,
  )
  const rangeParts = parseRange(dateRange)

  const [rangeStartDate, setRangeStartDate] = useState(todayISO)
  const [rangeStartTime, setRangeStartTime] = useState('09:00:00')
  const [rangeEndDate, setRangeEndDate] = useState(shiftISODate(todayISO, 0))
  const [rangeEndTime, setRangeEndTime] = useState('17:00:00')

  const [dryStartDate, setDryStartDate] = useState(todayISO)
  const [dryStartTime, setDryStartTime] = useState('10:00:00')
  const [dryEndDate, setDryEndDate] = useState(shiftISODate(todayISO, 1))
  const [dryEndTime, setDryEndTime] = useState('14:00:00')
  const [critiqueValue, setCritiqueValue] = useState(
    `${shiftISODate(todayISO, 2)}T15:30:00`,
  )
  const critiqueRef = useRef<HTMLDetailsElement>(null)
  const critiqueId = useId()
  const {
    placement: critiquePlacement,
    className: critiqueDropdownClass,
    onToggle: onCritiqueToggle,
  } = useDetailsDropdownPlacement(critiqueRef, {
    panelWidth: 320,
    panelHeight: 420,
  })
  useOutsideCloseDetails(critiqueRef)

  const [requiredDate, setRequiredDate] = useState('')
  const [requiredTime, setRequiredTime] = useState('')
  const [requiredTouched, setRequiredTouched] = useState(false)

  const timeRangeOk =
    !sessionStart || !sessionEnd || compareTime(sessionStart, sessionEnd) <= 0

  const dtRangeSummary = `${formatDisplayDate(rangeStartDate)} ${formatTime12(rangeStartTime)} to ${formatDisplayDate(rangeEndDate)} ${formatTime12(rangeEndTime)}`

  const drySummary = `${formatDisplayDate(dryStartDate)} ${formatTime12(dryStartTime)} to ${formatDisplayDate(dryEndDate)} ${formatTime12(dryEndTime)}`

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Date and time
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Native TimeClockDial (analog clock) beside CalendarMonth date and range pickers.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Time"
          title="Time field"
          description="TimeClockDial analog clock (hour, minute, second). Same control used by CalendarMonth includeTime."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                  <fieldset className="fieldset max-w-xs">
                    <legend className="fieldset-legend">Session start</legend>
                    <TimeClockDial
                      value={timeValue}
                      onChange={setTimeValue}
                      aria-label="Session start time"
                    />
                    <p className="label">Analog dial · HH:mm:ss</p>
                    <ClassLabel value="TimeClockDial" />
                    <LiveValue value={timeValue ? formatTime12(timeValue) : ''} />
                  </fieldset>

                  <div className="space-y-4">
                    <p className="label-ink">Sizes</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="label-ink w-8 shrink-0">SM</span>
                          <TimeClockDial
                            size="sm"
                            value={timeSizeDemo}
                            onChange={setTimeSizeDemo}
                            aria-label="Time SM"
                            className="max-w-xs"
                          />
                        </div>
                        <ClassLabel value='TimeClockDial size="sm"' />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="label-ink w-8 shrink-0">MD</span>
                          <TimeClockDial
                            size="md"
                            value={timeSizeDemo}
                            onChange={setTimeSizeDemo}
                            aria-label="Time MD"
                            className="max-w-xs"
                          />
                        </div>
                        <ClassLabel value='TimeClockDial size="md"' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="label-ink mb-3">Trigger colors</p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {timeColors.map((c) => (
                      <div key={c.name} className="flex flex-col gap-2">
                        <TimeClockDial
                          value={timeColorDemo}
                          onChange={setTimeColorDemo}
                          triggerClassName={c.className}
                          aria-label={`Time ${c.name}`}
                        />
                        <ClassLabel
                          value={
                            c.className
                              ? `triggerClassName="${c.className}"`
                              : 'default trigger'
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <LiveValue
                    label="Shared color demo"
                    value={timeColorDemo ? formatTime12(timeColorDemo) : ''}
                  />
                </div>
              </>
            }
          
            html={timeFieldHtml}
            jsx={timeFieldJsx}
            svelteFiles={timeSvelteFiles}
          />
        </Section>

        <Section
          eyebrow="02 · Date"
          title="Date field"
          description="Native date input and a CalendarMonth dropdown picker"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-6 lg:grid-cols-2">
                          <fieldset className="fieldset max-w-xs">
                            <legend className="fieldset-legend">Native date</legend>
                            <input
                              type="date"
                              value={nativeDate}
                              onChange={(e) => setNativeDate(e.target.value)}
                              className="input input-bordered w-full cursor-text border-ink-border"
                              aria-label="Native date"
                            />
                            <ClassLabel value='input type="date"' />
                            <LiveValue value={nativeDate ? formatDisplayDate(nativeDate) : ''} />
                          </fieldset>

                          <fieldset className="fieldset max-w-xs">
                            <legend className="fieldset-legend">Wash calendar dropdown</legend>
                            <details
                              ref={datePickerRef}
                              className={dateDropdownClass}
                              onToggle={onDateToggle}
                            >
                              <summary
                                className="input input-bordered flex w-full cursor-pointer items-center justify-between gap-2 border-ink-border [&::-webkit-details-marker]:hidden"
                                aria-controls={datePickerId}
                              >
                                <span
                                  className={
                                    washDate ? 'text-base-content' : 'text-ink-muted'
                                  }
                                >
                                  {washDate
                                    ? formatDisplayDate(washDate)
                                    : 'Pick a date'}
                                </span>
                                <span className="label-ink text-xs">Open</span>
                              </summary>
                              <div
                                id={datePickerId}
                                className={`dropdown-content z-50 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW} ${
                                  datePlacement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'
                                }`}
                              >
                                <CalendarMonth
                                  mode="single"
                                  size="sm"
                                  bordered={false}
                                  value={washDate}
                                  onChange={(v) => {
                                    setWashDate(v)
                                    if (datePickerRef.current) datePickerRef.current.open = false
                                  }}
                                  />
                              </div>
                            </details>
                            <ClassLabel value="details.dropdown + CalendarMonth" />
                            <LiveValue value={washDate ? formatDisplayDate(washDate) : ''} />
                          </fieldset>
                        </div>
            
              </>
            }
          
            html={dateFieldHtml}
            jsx={dateFieldJsx}
            svelteFiles={washCalendarSvelteFiles}
          />
        
        </Section>

        <Section
          eyebrow="03 · Date time"
          title="Date time field"
          description="Native datetime-local plus a composed date and time pair"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-6 lg:grid-cols-2">
                          <fieldset className="fieldset max-w-sm">
                            <legend className="fieldset-legend">Native datetime-local</legend>
                            <input
                              type="datetime-local"
                              value={datetimeLocal}
                              onChange={(e) => setDatetimeLocal(e.target.value)}
                              className="input input-bordered w-full cursor-text border-ink-border"
                              aria-label="Date and time"
                            />
                            <ClassLabel value='input type="datetime-local"' />
                            <LiveValue value={formatDateTimeLocal(datetimeLocal)} />
                          </fieldset>

                          <fieldset className="fieldset max-w-sm">
                            <legend className="fieldset-legend">Composed date + time</legend>
                            <div className="flex flex-col gap-3 sm:flex-row">
                              <input
                                type="date"
                                value={composedDate}
                                onChange={(e) => setComposedDate(e.target.value)}
                                className="input input-bordered w-full cursor-text border-ink-border"
                                aria-label="Composed date"
                              />
                              <TimeClockDial
                                value={composedTime}
                                onChange={setComposedTime}
                                aria-label="Composed time"
                              />
                            </div>
                            <ClassLabel value="type=date + TimeClockDial" />
                            <LiveValue
                              value={
                                composedDate && composedTime
                                  ? `${formatDisplayDate(composedDate)} · ${formatTime12(composedTime)}`
                                  : ''
                              }
                            />
                          </fieldset>
                        </div>
            
              </>
            }
          
            html={dateTimeFieldHtml}
            jsx={dateTimeFieldJsx}
            svelteFiles={timeSvelteFiles}
          />
        
        </Section>

        <Section
          eyebrow="04 · Time range"
          title="Time range"
          description="Inclusive studio session hours with start and end time inputs"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <fieldset className="fieldset max-w-lg">
                          <legend className="fieldset-legend">Studio session hours</legend>
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <label className="label" htmlFor="session-start">
                                <span className="label-text">Start</span>
                              </label>
                              <TimeClockDial
                                id="session-start"
                                value={sessionStart}
                                onChange={setSessionStart}
                                aria-label="Session start"
                              />
                            </div>
                            <span className="hidden pb-3 text-ink-muted sm:inline" aria-hidden="true">
                              to
                            </span>
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <label className="label" htmlFor="session-end">
                                <span className="label-text">End</span>
                              </label>
                              <TimeClockDial
                                id="session-end"
                                value={sessionEnd}
                                onChange={setSessionEnd}
                                aria-label="Session end"
                              />
                            </div>
                          </div>
                          {!timeRangeOk ? (
                            <p className="label text-error">End should be at or after start.</p>
                          ) : (
                            <p className="label">Inclusive window for open studio</p>
                          )}
                          <ClassLabel value="TimeClockDial + TimeClockDial" />
                          <LiveValue
                            value={
                              sessionStart && sessionEnd
                                ? `${formatTime12(sessionStart)} to ${formatTime12(sessionEnd)}`
                                : ''
                            }
                          />
                        </fieldset>
            
              </>
            }
          
            html={timeRangeHtml}
            jsx={timeRangeJsx}
            svelteFiles={timeSvelteFiles}
          />
        
        </Section>

        <Section
          eyebrow="05 · Date range"
          title="Date range"
          description="CalendarMonth range mode with YYYY-MM-DD/YYYY-MM-DD value"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                          <CalendarMonth
                            mode="range"
                            className="w-full max-w-sm"
                            value={dateRange}
                            onChange={setDateRange}
                          />
                          <div className="min-w-0 space-y-2">
                            <p className="label-ink">Selected range</p>
                            <p className="text-sm">
                              Start:{' '}
                              <span className="font-mono text-xs">
                                {rangeParts.start
                                  ? formatDisplayDate(rangeParts.start)
                                  : '(none)'}
                              </span>
                            </p>
                            <p className="text-sm">
                              End:{' '}
                              <span className="font-mono text-xs">
                                {rangeParts.end
                                  ? formatDisplayDate(rangeParts.end)
                                  : '(none)'}
                              </span>
                            </p>
                            <LiveValue label="Raw" value={dateRange} />
                            <ClassLabel value='CalendarMonth mode="range"' />
                          </div>
                        </div>
            
              </>
            }
          
            html={dateRangeHtml}
            jsx={dateRangeJsx}
            svelteFiles={washCalendarSvelteFiles}
          />
        
        </Section>

        <Section
          eyebrow="06 · Date time range"
          title="Date time range"
          description="Composed start and end date+time controls with a live summary"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-6 lg:grid-cols-2">
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Range start</legend>
                            <div className="flex flex-col gap-3 sm:flex-row">
                              <input
                                type="date"
                                value={rangeStartDate}
                                onChange={(e) => setRangeStartDate(e.target.value)}
                                className="input input-bordered w-full cursor-text border-ink-border"
                                aria-label="Range start date"
                              />
                              <TimeClockDial
                                value={rangeStartTime}
                                onChange={setRangeStartTime}
                                aria-label="Range start time"
                              />
                            </div>
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Range end</legend>
                            <div className="flex flex-col gap-3 sm:flex-row">
                              <input
                                type="date"
                                value={rangeEndDate}
                                onChange={(e) => setRangeEndDate(e.target.value)}
                                className="input input-bordered w-full cursor-text border-ink-border"
                                aria-label="Range end date"
                              />
                              <TimeClockDial
                                value={rangeEndTime}
                                onChange={setRangeEndTime}
                                aria-label="Range end time"
                              />
                            </div>
                          </fieldset>
                        </div>
                        <div className="mt-4 rounded-box border border-ink-border/80 bg-base-100/60 px-4 py-3">
                          <p className="label-ink">Live summary</p>
                          <p className="mt-1 text-sm font-medium">{dtRangeSummary}</p>
                          <ClassLabel value="date+time × 2" />
                        </div>
            
              </>
            }
          
            html={dateTimeRangeHtml}
            jsx={dateTimeRangeJsx}
            svelteFiles={timeSvelteFiles}
          />
        
        </Section>

        <Section
          eyebrow="07 · Studio"
          title="Wash dry window and critique"
          description="Book a drying window, then schedule a critique with CalendarMonth includeTime"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-6 lg:grid-cols-2">
                          <div className="space-y-4">
                            <h3 className="card-title text-primary font-bold text-base">
                              Dry window
                            </h3>
                            <fieldset className="fieldset">
                              <legend className="fieldset-legend">Starts drying</legend>
                              <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                  type="date"
                                  value={dryStartDate}
                                  onChange={(e) => setDryStartDate(e.target.value)}
                                  className="input input-bordered w-full cursor-text border-ink-border"
                                  aria-label="Dry start date"
                                />
                                <TimeClockDial
                                  value={dryStartTime}
                                  onChange={setDryStartTime}
                                  aria-label="Dry start time"
                                />
                              </div>
                            </fieldset>
                            <fieldset className="fieldset">
                              <legend className="fieldset-legend">Ready by</legend>
                              <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                  type="date"
                                  value={dryEndDate}
                                  onChange={(e) => setDryEndDate(e.target.value)}
                                  className="input input-bordered w-full cursor-text border-ink-border"
                                  aria-label="Dry end date"
                                />
                                <TimeClockDial
                                  value={dryEndTime}
                                  onChange={setDryEndTime}
                                  aria-label="Dry end time"
                                />
                              </div>
                            </fieldset>
                            <LiveValue label="Dry window" value={drySummary} />
                          </div>

                          <div className="space-y-4">
                            <h3 className="card-title text-secondary font-bold text-base">
                              Critique booking
                            </h3>
                            <fieldset className="fieldset max-w-xs">
                              <legend className="fieldset-legend">Date and time</legend>
                              <details
                                ref={critiqueRef}
                                className={critiqueDropdownClass}
                                onToggle={onCritiqueToggle}
                              >
                                <summary
                                  className="input input-bordered flex w-full cursor-pointer items-center justify-between gap-2 border-ink-border [&::-webkit-details-marker]:hidden"
                                  aria-controls={critiqueId}
                                >
                                  <span className="text-base-content">
                                    {formatDateTimeLocal(critiqueValue)}
                                  </span>
                                  <span className="label-ink text-xs">Open</span>
                                </summary>
                                <div
                                  id={critiqueId}
                                  className={`dropdown-content z-50 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW} ${
                                    critiquePlacement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'
                                  }`}
                                >
                                  <CalendarMonth
                                    mode="single"
                                    includeTime
                                    size="sm"
                                    bordered={false}
                                    value={critiqueValue}
                                    onChange={(v) => {
                                      setCritiqueValue(v)
                                    }}
                                    aria-label="Critique date and time"
                                  />
                                </div>
                              </details>
                            </fieldset>
                            <LiveValue
                              label="Critique"
                              value={formatDateTimeLocal(critiqueValue)}
                            />
                            <ClassLabel value="CalendarMonth includeTime" />
                          </div>
                        </div>
            
              </>
            }
          
            html={studioHtml}
            jsx={studioJsx}
            svelteFiles={washCalendarSvelteFiles}
          />
        
        </Section>

        <Section
          eyebrow="08 · States"
          title="Required and disabled"
          description="Required fields show an error-colored asterisk"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-6 lg:grid-cols-2">
                          <form
                            className="space-y-4"
                            onSubmit={(e) => {
                              e.preventDefault()
                              setRequiredTouched(true)
                            }}
                          >
                            <fieldset className="fieldset max-w-xs">
                              <legend className="fieldset-legend">
                                Delivery date
                                <RequiredMark />
                              </legend>
                              <input
                                type="date"
                                value={requiredDate}
                                onChange={(e) => setRequiredDate(e.target.value)}
                                required
                                className="input input-bordered w-full cursor-text border-ink-border"
                                aria-label="Delivery date"
                              />
                              {requiredTouched && !requiredDate ? (
                                <p className="label text-error">Date is required</p>
                              ) : null}
                            </fieldset>
                            <fieldset className="fieldset max-w-xs">
                              <legend className="fieldset-legend">
                                Pickup time
                                <RequiredMark />
                              </legend>
                              <TimeClockDial
                                value={requiredTime}
                                onChange={setRequiredTime}
                                aria-label="Pickup time"
                              />
                              {requiredTouched && !requiredTime ? (
                                <p className="label text-error">Time is required</p>
                              ) : null}
                            </fieldset>
                            <button
                              type="submit"
                              className="btn btn-primary cursor-pointer"
                              onClick={() => setRequiredTouched(true)}
                            >
                              Check required
                            </button>
                            <LiveValue
                              value={
                                requiredDate || requiredTime
                                  ? [
                                      requiredDate
                                        ? formatDisplayDate(requiredDate)
                                        : null,
                                      requiredTime ? formatTime12(requiredTime) : null,
                                    ]
                                      .filter(Boolean)
                                      .join(' · ')
                                  : ''
                              }
                            />
                          </form>

                          <div className="space-y-4">
                            <fieldset className="fieldset max-w-xs opacity-70">
                              <legend className="fieldset-legend">Locked date</legend>
                              <input
                                type="date"
                                value={todayISO}
                                disabled
                                className="input input-bordered w-full cursor-not-allowed border-ink-border"
                                aria-label="Locked date"
                              />
                              <ClassLabel value="input disabled cursor-not-allowed" />
                            </fieldset>
                            <fieldset className="fieldset max-w-xs opacity-70">
                              <legend className="fieldset-legend">Locked time</legend>
                              <TimeClockDial
                                value="16:00:00"
                                disabled
                                aria-label="Locked time"
                              />
                              <ClassLabel value="TimeClockDial disabled" />
                            </fieldset>
                            <fieldset className="fieldset max-w-xs opacity-70">
                              <legend className="fieldset-legend">Locked datetime</legend>
                              <input
                                type="datetime-local"
                                value={`${todayISO}T16:00`}
                                disabled
                                className="input input-bordered w-full cursor-not-allowed border-ink-border"
                                aria-label="Locked datetime"
                              />
                            </fieldset>
                          </div>
                        </div>
            
              </>
            }
          
            html={statesHtml}
            jsx={statesJsx}
            svelteFiles={timeSvelteFiles}
          />
        
        </Section>

        <Section
          eyebrow="09 · Responsive"
          title="Narrow layout"
          description="Fields stack on small screens"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mx-auto w-full max-w-sm space-y-4 rounded-box border border-dashed border-ink-border/80 p-4">
                          <p className="label-ink">~360px phone column</p>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Open hours</legend>
                            <div className="flex flex-col gap-3">
                              <TimeClockDial
                                defaultValue="10:00:00"
                                aria-label="Open from"
                              />
                              <TimeClockDial
                                defaultValue="18:00:00"
                                aria-label="Open until"
                              />
                            </div>
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Workshop day</legend>
                            <input
                              type="date"
                              defaultValue={todayISO}
                              className="input input-bordered w-full cursor-text border-ink-border"
                              aria-label="Workshop day"
                            />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Check-in</legend>
                            <input
                              type="datetime-local"
                              defaultValue={`${todayISO}T10:00`}
                              className="input input-bordered w-full cursor-text border-ink-border"
                              aria-label="Check-in"
                            />
                          </fieldset>
                          <ClassLabel value="flex-col + w-full (no horizontal overflow)" />
                        </div>
            
              </>
            }
          
            html={responsiveHtml}
            jsx={responsiveJsx}
            svelteFiles={timeSvelteFiles}
          />
        
        </Section>
      </div>
    </>
  )
}
