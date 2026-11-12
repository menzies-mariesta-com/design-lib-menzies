import { ShowcaseTabs } from './components/ShowcaseTabs'
import { washCalendarSvelteFiles } from './snippets/svelte/calendar'
import { timeSvelteFiles } from './snippets/svelte/time'
import { useState, type ReactNode } from 'react'
import {
  CalendarMonth,
  TimeClockDial,
  DatePicker,
  DateTimePicker,
  DateTimeFields,
} from '#plain'
import {
  WashDatePicker,
  WashDateTimePicker,
  WashTimePicker,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import {
  daisyCalendar,
  daisyDatePicker,
  daisyDateTimePicker,
  daisyTime,
} from './components/daisyUiPasteMarkup'
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
const pasteDate = daisyDatePicker(false)
const pasteDateTime = daisyDateTimePicker(false)
const pasteCal = stripCalendarTime(daisyCalendar(false))
const pasteToday = '2026-09-23'
const pasteComposed = `<div class="wash-datetime-fields flex flex-col gap-3 sm:flex-row">${pasteDate}${pasteTime}</div>`

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
    <legend class="fieldset-legend">Delivery date</legend>
    ${pasteDate}
    <p class="label">Wash calendar dropdown · YYYY-MM-DD</p>
  </fieldset>
  <fieldset class="fieldset max-w-xs">
    <legend class="fieldset-legend">Compact size</legend>
    ${pasteDate.replace('wash-date w-full', 'wash-date w-full max-w-xs')}
  </fieldset>
</div>`
const dateFieldJsx = toPasteJsx(dateFieldHtml)

const dateTimeFieldHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <fieldset class="fieldset max-w-sm">
    <legend class="fieldset-legend">Date and time field</legend>
    ${pasteDateTime}
  </fieldset>
  <fieldset class="fieldset max-w-sm">
    <legend class="fieldset-legend">Composed date + time</legend>
    ${pasteComposed}
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
    ${pasteComposed}
  </fieldset>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Range end</legend>
    <div class="wash-datetime-fields flex flex-col gap-3 sm:flex-row">${pasteDate}${pasteTime.replaceAll('09:00:00', '17:00:00').replace('>09</button>', '>17</button>')}</div>
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
      ${pasteComposed}
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Ready by</legend>
      <div class="wash-datetime-fields flex flex-col gap-3 sm:flex-row">${pasteDate}${pasteTime.replaceAll('09:00:00', '18:00:00').replace('>09</button>', '>18</button>')}</div>
    </fieldset>
  </div>
  <div class="space-y-4">
    <h3 class="card-title text-secondary font-bold text-base">Critique booking</h3>
    <fieldset class="fieldset max-w-xs">
      <legend class="fieldset-legend">Date and time</legend>
      ${pasteDateTime}
    </fieldset>
  </div>
</div>`
const studioJsx = toPasteJsx(studioHtml)

const statesHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <form class="space-y-4">
    <fieldset class="fieldset max-w-xs">
      <legend class="fieldset-legend">Delivery date<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></legend>
      ${pasteDate}
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
      ${pasteDate.replace('cursor-pointer', 'cursor-not-allowed opacity-70')}
    </fieldset>
    <fieldset class="fieldset max-w-xs opacity-70">
      <legend class="fieldset-legend">Locked time</legend>
      ${pasteTime.replaceAll('09:00:00', '16:00:00').replace('>09</button>', '>16</button>').replace(' open', '')}
    </fieldset>
    <fieldset class="fieldset max-w-xs opacity-70">
      <legend class="fieldset-legend">Locked datetime</legend>
      ${pasteDateTime.replace('cursor-pointer', 'cursor-not-allowed opacity-70')}
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
    ${pasteDate}
  </fieldset>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Check-in</legend>
    ${pasteDateTime}
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

export default function DateTimeFieldsPage() {
  const [timeValue, setTimeValue] = useState('09:30:00')
  const [timeColorDemo, setTimeColorDemo] = useState('14:00:00')
  const [timeSizeDemo, setTimeSizeDemo] = useState('11:15:00')

  const [washDate, setWashDate] = useState(todayISO)
  const [washDateSm, setWashDateSm] = useState(todayISO)
  const [datetimeLocal, setDatetimeLocal] = useState(`${todayISO}T10:00:00`)
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
  const [packageDate, setPackageDate] = useState(todayISO)
  const [packageTime, setPackageTime] = useState('11:00:00')
  const [packageDateTime, setPackageDateTime] = useState(
    `${todayISO}T11:30:00`,
  )

  const [requiredDate, setRequiredDate] = useState('')
  const [requiredTime, setRequiredTime] = useState('')
  const [requiredTouched, setRequiredTouched] = useState(false)
  const [workshopDay, setWorkshopDay] = useState(todayISO)
  const [checkInValue, setCheckInValue] = useState(`${todayISO}T10:00:00`)

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
          Wash date and time fields: calendar dropdowns, analog clock, and range
          pickers—no native browser date inputs.
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
          description="DatePicker dropdown with CalendarMonth (ISO day values)"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                  <fieldset className="fieldset max-w-xs">
                    <legend className="fieldset-legend">Delivery date</legend>
                    <DatePicker
                      value={washDate}
                      onChange={setWashDate}
                      aria-label="Delivery date"
                    />
                    <ClassLabel value="DatePicker" />
                    <LiveValue value={washDate ? formatDisplayDate(washDate) : ''} />
                  </fieldset>

                  <fieldset className="fieldset max-w-xs">
                    <legend className="fieldset-legend">Compact size</legend>
                    <DatePicker
                      size="sm"
                      value={washDateSm}
                      onChange={setWashDateSm}
                      aria-label="Compact date"
                    />
                    <ClassLabel value='DatePicker size="sm"' />
                    <LiveValue
                      value={washDateSm ? formatDisplayDate(washDateSm) : ''}
                    />
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
          description="DateTimePicker (includeTime) and DateTimeFields composition"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                  <fieldset className="fieldset max-w-sm">
                    <legend className="fieldset-legend">Date and time field</legend>
                    <DateTimePicker
                      value={datetimeLocal}
                      onChange={setDatetimeLocal}
                      aria-label="Date and time"
                    />
                    <ClassLabel value="DateTimePicker" />
                    <LiveValue value={formatDateTimeLocal(datetimeLocal)} />
                  </fieldset>

                  <fieldset className="fieldset max-w-sm">
                    <legend className="fieldset-legend">Composed date + time</legend>
                    <DateTimeFields
                      date={composedDate}
                      time={composedTime}
                      onDateChange={setComposedDate}
                      onTimeChange={setComposedTime}
                    />
                    <ClassLabel value="DateTimeFields" />
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
                            <DateTimeFields
                              date={rangeStartDate}
                              time={rangeStartTime}
                              onDateChange={setRangeStartDate}
                              onTimeChange={setRangeStartTime}
                            />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Range end</legend>
                            <DateTimeFields
                              date={rangeEndDate}
                              time={rangeEndTime}
                              onDateChange={setRangeEndDate}
                              onTimeChange={setRangeEndTime}
                            />
                          </fieldset>
                        </div>
                        <div className="mt-4 rounded-box border border-ink-border/80 bg-base-100/60 px-4 py-3">
                          <p className="label-ink">Live summary</p>
                          <p className="mt-1 text-sm font-medium">{dtRangeSummary}</p>
                          <ClassLabel value="DateTimeFields × 2" />
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
                              <DateTimeFields
                                date={dryStartDate}
                                time={dryStartTime}
                                onDateChange={setDryStartDate}
                                onTimeChange={setDryStartTime}
                              />
                            </fieldset>
                            <fieldset className="fieldset">
                              <legend className="fieldset-legend">Ready by</legend>
                              <DateTimeFields
                                date={dryEndDate}
                                time={dryEndTime}
                                onDateChange={setDryEndDate}
                                onTimeChange={setDryEndTime}
                              />
                            </fieldset>
                            <LiveValue label="Dry window" value={drySummary} />
                          </div>

                          <div className="space-y-4">
                            <h3 className="card-title text-secondary font-bold text-base">
                              Critique booking
                            </h3>
                            <fieldset className="fieldset max-w-xs">
                              <legend className="fieldset-legend">Date and time</legend>
                              <DateTimePicker
                                value={critiqueValue}
                                onChange={setCritiqueValue}
                                aria-label="Critique date and time"
                              />
                            </fieldset>
                            <LiveValue
                              label="Critique"
                              value={formatDateTimeLocal(critiqueValue)}
                            />
                            <ClassLabel value="DateTimePicker" />
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
                              <DatePicker
                                value={requiredDate}
                                onChange={setRequiredDate}
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
                              <DatePicker
                                value={todayISO}
                                disabled
                                aria-label="Locked date"
                              />
                              <ClassLabel value="DatePicker disabled" />
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
                              <DateTimePicker
                                value={`${todayISO}T16:00:00`}
                                disabled
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
                            <DatePicker
                              value={workshopDay}
                              onChange={setWorkshopDay}
                              aria-label="Workshop day"
                            />
                          </fieldset>
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Check-in</legend>
                            <DateTimePicker
                              value={checkInValue}
                              onChange={setCheckInValue}
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

        <Section
          eyebrow="10 · Package"
          title="Published npm imports"
          description="Smoke row imports WashDatePicker, WashTimePicker, and WashDateTimePicker from the built package entry (not #plain)."
          panel="wash-panel-blue"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">WashDatePicker</legend>
              <WashDatePicker
                value={packageDate}
                onChange={setPackageDate}
                aria-label="Package date"
              />
              <ClassLabel value="WashDatePicker" />
              <LiveValue value={formatDisplayDate(packageDate)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">WashTimePicker</legend>
              <WashTimePicker
                value={packageTime}
                onChange={setPackageTime}
                aria-label="Package time"
              />
              <ClassLabel value="WashTimePicker" />
              <LiveValue value={formatTime12(packageTime)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">WashDateTimePicker</legend>
              <WashDateTimePicker
                value={packageDateTime}
                onChange={setPackageDateTime}
                aria-label="Package date and time"
              />
              <ClassLabel value="WashDateTimePicker" />
              <LiveValue value={formatDateTimeLocal(packageDateTime)} />
            </fieldset>
          </div>
        </Section>
      </div>
    </>
  )
}
