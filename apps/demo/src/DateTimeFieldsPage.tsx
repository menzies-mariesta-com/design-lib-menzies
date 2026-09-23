import { ShowcaseTabs } from './components/ShowcaseTabs'
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
  WashCalendar,
  WashTimePicker,
  useDetailsDropdownPlacement,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import { toISODate, shiftISODate } from './data/dates'

const todayISO = toISODate(new Date())

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
          Native WashTimePicker (analog clock) beside WashCalendar date and range pickers.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Time"
          title="Time field"
          description="WashTimePicker analog clock (hour, minute, second). Same control used by WashCalendar includeTime."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                  <fieldset className="fieldset max-w-xs">
                    <legend className="fieldset-legend">Session start</legend>
                    <WashTimePicker
                      value={timeValue}
                      onChange={setTimeValue}
                      aria-label="Session start time"
                    />
                    <p className="label">Analog dial · HH:mm:ss</p>
                    <ClassLabel value="WashTimePicker" />
                    <LiveValue value={timeValue ? formatTime12(timeValue) : ''} />
                  </fieldset>

                  <div className="space-y-4">
                    <p className="label-ink">Sizes</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="label-ink w-8 shrink-0">SM</span>
                          <WashTimePicker
                            size="sm"
                            value={timeSizeDemo}
                            onChange={setTimeSizeDemo}
                            aria-label="Time SM"
                            className="max-w-xs"
                          />
                        </div>
                        <ClassLabel value='WashTimePicker size="sm"' />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="label-ink w-8 shrink-0">MD</span>
                          <WashTimePicker
                            size="md"
                            value={timeSizeDemo}
                            onChange={setTimeSizeDemo}
                            aria-label="Time MD"
                            className="max-w-xs"
                          />
                        </div>
                        <ClassLabel value='WashTimePicker size="md"' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="label-ink mb-3">Trigger colors</p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {timeColors.map((c) => (
                      <div key={c.name} className="flex flex-col gap-2">
                        <WashTimePicker
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
            html={`<WashTimePicker value="{time}" on-change="…" />`}
            jsx={`<WashTimePicker
  value={timeValue}
  onChange={setTimeValue}
  size="md"
  triggerClassName="input-primary"
  aria-label="Session start time"
/>`}
          />
        </Section>

        <Section
          eyebrow="02 · Date"
          title="Date field"
          description="Native date input and a WashCalendar dropdown picker"
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
                                <WashCalendar
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
                            <ClassLabel value="details.dropdown + WashCalendar" />
                            <LiveValue value={washDate ? formatDisplayDate(washDate) : ''} />
                          </fieldset>
                        </div>
            
              </>
            }
            html={`<input type="date" /> + <WashCalendar mode="single" size="sm" bordered={false} />`}
            jsx={`<WashCalendar
  mode="single"
  size="sm"
  bordered={false}
  value={washDate}
  onChange={setWashDate}
/>`}
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
                              <WashTimePicker
                                value={composedTime}
                                onChange={setComposedTime}
                                aria-label="Composed time"
                              />
                            </div>
                            <ClassLabel value="type=date + WashTimePicker" />
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
            html={`<div class="grid gap-6 lg:grid-cols-2">
            <fieldset class="fieldset max-w-sm">
              <legend class="fieldset-legend">Native datetime-local</legend>
              <input
                type="datetime-local"
                value=
                
                class="input input-bordered w-full cursor-text border-ink-border"
                aria-label="Date and time" />
              <!-- ClassLabel -->
              <!-- LiveValue -->
            </fieldset>

            <fieldset class="fieldset max-w-sm">
              <legend class="fieldset-legend">Composed date + time</legend>
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  type="date"
                  value=
                  
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Composed date" />
                <input
                  type="time"
                  value=
                  
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Composed time" />
              </div>
              <!-- ClassLabel -->
              <!-- LiveValue -->
            </fieldset>
          </div>`}
            jsx={`<div className="grid gap-6 lg:grid-cols-2">
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
                <WashTimePicker
                  value={composedTime}
                  onChange={setComposedTime}
                  aria-label="Composed time"
                />
              </div>
              <ClassLabel value='type="date" + type="time"' />
              <LiveValue
                value={
                  composedDate && composedTime
                    ? \`\${formatDisplayDate(composedDate)} · \${formatTime12(composedTime)}\`
                    : ''
                }
              />
            </fieldset>
          </div>`}
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
                              <WashTimePicker
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
                              <WashTimePicker
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
                          <ClassLabel value="WashTimePicker + WashTimePicker" />
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
            html={`<fieldset class="fieldset max-w-lg">
            <legend class="fieldset-legend">Studio session hours</legend>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div class="flex min-w-0 flex-1 flex-col gap-1">
                <label class="label" for="session-start">
                  <span class="label-text">Start</span>
                </label>
                <input
                  id="session-start"
                  type="time"
                  value=
                  
                  class="input input-bordered w-full cursor-text border-ink-border" />
              </div>
              <span class="hidden pb-3 text-ink-muted sm:inline" aria-hidden="true">
                to
              </span>
              <div class="flex min-w-0 flex-1 flex-col gap-1">
                <label class="label" for="session-end">
                  <span class="label-text">End</span>
                </label>
                <input
                  id="session-end"
                  type="time"
                  value=
                  
                  class="input input-bordered w-full cursor-text border-ink-border" />
              </div>
            </div>
            {!timeRangeOk ? (
              <p class="label text-error">End should be at or after start.</p>
            ) : (
              <p class="label">Inclusive window for open studio</p>
            )}
            <!-- ClassLabel -->
            <!-- LiveValue -->
          </fieldset>`}
            jsx={`<fieldset className="fieldset max-w-lg">
            <legend className="fieldset-legend">Studio session hours</legend>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <label className="label" htmlFor="session-start">
                  <span className="label-text">Start</span>
                </label>
                <WashTimePicker
                  id="session-start"
                  value={sessionStart}
                  onChange={setSessionStart}
                />
              </div>
              <span className="hidden pb-3 text-ink-muted sm:inline" aria-hidden="true">
                to
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <label className="label" htmlFor="session-end">
                  <span className="label-text">End</span>
                </label>
                <WashTimePicker
                  id="session-end"
                  value={sessionEnd}
                  onChange={setSessionEnd}
                />
              </div>
            </div>
            {!timeRangeOk ? (
              <p className="label text-error">End should be at or after start.</p>
            ) : (
              <p className="label">Inclusive window for open studio</p>
            )}
            <ClassLabel value="time + time (inclusive)" />
            <LiveValue
              value={
                sessionStart && sessionEnd
                  ? \`\${formatTime12(sessionStart)} to \${formatTime12(sessionEnd)}\`
                  : ''
              }
            />
          </fieldset>`}
          />
        
        </Section>

        <Section
          eyebrow="05 · Date range"
          title="Date range"
          description="WashCalendar range mode with YYYY-MM-DD/YYYY-MM-DD value"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                          <WashCalendar
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
                            <ClassLabel value='WashCalendar mode="range"' />
                          </div>
                        </div>
            
              </>
            }
            html={`<WashCalendar mode="range" value={dateRange} onChange={setDateRange} />`}
            jsx={`<WashCalendar
  mode="range"
  value={dateRange}
  onChange={setDateRange}
/>`}
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
                              <WashTimePicker
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
                              <WashTimePicker
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
            html={`<div class="grid gap-6 lg:grid-cols-2">
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Range start</legend>
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  type="date"
                  value=
                  
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Range start date" />
                <input
                  type="time"
                  value=
                  
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Range start time" />
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Range end</legend>
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  type="date"
                  value=
                  
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Range end date" />
                <input
                  type="time"
                  value=
                  
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Range end time" />
              </div>
            </fieldset>
          </div>
          <div class="mt-4 rounded-box border border-ink-border/80 bg-base-100/60 px-4 py-3">
            <p class="label-ink">Live summary</p>
            <p class="mt-1 text-sm font-medium"></p>
            <!-- ClassLabel -->
          </div>`}
            jsx={`<div className="grid gap-6 lg:grid-cols-2">
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
                <WashTimePicker
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
                <WashTimePicker
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
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="07 · Studio"
          title="Wash dry window and critique"
          description="Book a drying window, then schedule a critique with WashCalendar includeTime"
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
                                <WashTimePicker
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
                                <WashTimePicker
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
                                  <WashCalendar
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
                            <ClassLabel value="WashCalendar includeTime" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="grid gap-6 lg:grid-cols-2">
            <div class="space-y-4">
              <h3 class="card-title text-primary font-bold text-base">
                Dry window
              </h3>
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Starts drying</legend>
                <div class="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="date"
                    value=
                    
                    class="input input-bordered w-full cursor-text border-ink-border"
                    aria-label="Dry start date" />
                  <input
                    type="time"
                    value=
                    
                    class="input input-bordered w-full cursor-text border-ink-border"
                    aria-label="Dry start time" />
                </div>
              </fieldset>
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Ready by</legend>
                <div class="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="date"
                    value=
                    
                    class="input input-bordered w-full cursor-text border-ink-border"
                    aria-label="Dry end date" />
                  <input
                    type="time"
                    value=
                    
                    class="input input-bordered w-full cursor-text border-ink-border"
                    aria-label="Dry end time" />
                </div>
              </fieldset>
              <!-- LiveValue -->
            </div>

            <div class="space-y-4">
              <h3 class="card-title text-secondary font-bold text-base">
                Critique booking
              </h3>
              <fieldset class="fieldset max-w-xs">
                <legend class="fieldset-legend">Date and time</legend>
                <details class="dropdown">
                  <summary class="input input-bordered cursor-pointer">
                    <!-- selected datetime label -->
                  </summary>
                  <div class="dropdown-content z-50 rounded-box border border-ink-border bg-base-100 p-1">
                    <!-- WashCalendar mode="single" includeTime size="sm" bordered={false} -->
                  </div>
                </details>
              </fieldset>
              <!-- LiveValue -->
              <!-- ClassLabel WashCalendar includeTime -->
            </div>
          </div>`}
            jsx={`<div className="grid gap-6 lg:grid-cols-2">
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
                  <WashTimePicker
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
                  <WashTimePicker
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
                    className={\`dropdown-content z-50 rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)] \${DROPDOWN_PANEL_OVERFLOW} \${
                      critiquePlacement.top ? 'bottom-full mb-2 mt-0' : 'mt-2'
                    }\`}
                  >
                    <WashCalendar
                      mode="single"
                      includeTime
                      size="sm"
                      bordered={false}
                      value={critiqueValue}
                      onChange={setCritiqueValue}
                      aria-label="Critique date and time"
                    />
                  </div>
                </details>
              </fieldset>
              <LiveValue
                label="Critique"
                value={formatDateTimeLocal(critiqueValue)}
              />
              <ClassLabel value="WashCalendar includeTime" />
            </div>
          </div>`}
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
                              <WashTimePicker
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
                              <WashTimePicker
                                value="16:00:00"
                                disabled
                                aria-label="Locked time"
                              />
                              <ClassLabel value="WashTimePicker disabled" />
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
            html={`<div class="grid gap-6 lg:grid-cols-2">
            <form
              class="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                setRequiredTouched(true)
              }}
            >
              <fieldset class="fieldset max-w-xs">
                <legend class="fieldset-legend">
                  Delivery date
                  <!-- RequiredMark -->
                </legend>
                <input
                  type="date"
                  value=
                  
                  required
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Delivery date" />
                {requiredTouched && !requiredDate ? (
                  <p class="label text-error">Date is required</p>
                ) : null}
              </fieldset>
              <fieldset class="fieldset max-w-xs">
                <legend class="fieldset-legend">
                  Pickup time
                  <!-- RequiredMark -->
                </legend>
                <input
                  type="time"
                  value=
                  
                  required
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Pickup time" />
                {requiredTouched && !requiredTime ? (
                  <p class="label text-error">Time is required</p>
                ) : null}
              </fieldset>
              <button
                type="submit"
                class="btn btn-primary cursor-pointer"
                
              >
                Check required
              </button>
              <!-- LiveValue -->
            </form>

            <div class="space-y-4">
              <fieldset class="fieldset max-w-xs opacity-70">
                <legend class="fieldset-legend">Locked date</legend>
                <input
                  type="date"
                  value=
                  disabled
                  class="input input-bordered w-full cursor-not-allowed border-ink-border"
                  aria-label="Locked date" />
                <!-- ClassLabel -->
              </fieldset>
              <fieldset class="fieldset max-w-xs opacity-70">
                <legend class="fieldset-legend">Locked time</legend>
                <WashTimePicker
                  value="16:00:00"
                  disabled
                  aria-label="Locked time"
                />
                <!-- ClassLabel -->
              </fieldset>
              <fieldset class="fieldset max-w-xs opacity-70">
                <legend class="fieldset-legend">Locked datetime</legend>
                <input
                  type="datetime-local"
                  value=
                  disabled
                  class="input input-bordered w-full cursor-not-allowed border-ink-border"
                  aria-label="Locked datetime" />
              </fieldset>
            </div>
          </div>`}
            jsx={`<div className="grid gap-6 lg:grid-cols-2">
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
                <WashTimePicker
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
                <WashTimePicker
                  value="16:00:00"
                  disabled
                  aria-label="Locked time"
                />
                <ClassLabel value="WashTimePicker disabled" />
              </fieldset>
              <fieldset className="fieldset max-w-xs opacity-70">
                <legend className="fieldset-legend">Locked datetime</legend>
                <input
                  type="datetime-local"
                  value={\`\${todayISO}T16:00\`}
                  disabled
                  className="input input-bordered w-full cursor-not-allowed border-ink-border"
                  aria-label="Locked datetime"
                />
              </fieldset>
            </div>
          </div>`}
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
                              <WashTimePicker
                                defaultValue="10:00:00"
                                aria-label="Open from"
                              />
                              <WashTimePicker
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
            html={`<div class="mx-auto w-full max-w-sm space-y-4 rounded-box border border-dashed border-ink-border/80 p-4">
            <p class="label-ink">~360px phone column</p>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Open hours</legend>
              <div class="flex flex-col gap-3">
                <input
                  type="time"
                  value="10:00"
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Open from" />
                <input
                  type="time"
                  value="18:00"
                  class="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Open until" />
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Workshop day</legend>
              <input
                type="date"
                value="todayISO"
                class="input input-bordered w-full cursor-text border-ink-border"
                aria-label="Workshop day" />
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Check-in</legend>
              <input
                type="datetime-local"
                value="\`\${todayISO"T10:00\`}
                class="input input-bordered w-full cursor-text border-ink-border"
                aria-label="Check-in" />
            </fieldset>
            <!-- ClassLabel -->
          </div>`}
            jsx={`<div className="mx-auto w-full max-w-sm space-y-4 rounded-box border border-dashed border-ink-border/80 p-4">
            <p className="label-ink">~360px phone column</p>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Open hours</legend>
              <div className="flex flex-col gap-3">
                <input
                  type="time"
                  defaultValue="10:00"
                  className="input input-bordered w-full cursor-text border-ink-border"
                  aria-label="Open from"
                />
                <input
                  type="time"
                  defaultValue="18:00"
                  className="input input-bordered w-full cursor-text border-ink-border"
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
                defaultValue={\`\${todayISO}T10:00\`}
                className="input input-bordered w-full cursor-text border-ink-border"
                aria-label="Check-in"
              />
            </fieldset>
            <ClassLabel value="flex-col + w-full (no horizontal overflow)" />
          </div>`}
          />
        
        </Section>
      </div>
    </>
  )
}
