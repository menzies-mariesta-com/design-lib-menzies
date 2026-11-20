import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import {
  Calendar,
  CalendarDay,
  CalendarGrid,
  CalendarHeading,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  type CalendarValue,
} from '@ui-sdk/react/calendar'
import { ChevronDown, ChevronLeft, ChevronRight } from '../icons'
import { useDetailsDropdownPlacement } from '../hooks/useDropdownPlacement'
import {
  DROPDOWN_PANEL_OVERFLOW,
  DROPDOWN_PANEL_Z,
  dropdownPanelStyle,
} from '../lib/dropdownPlacement'
import {
  buildCalendarYearRange,
  calendarValueToWash,
  clampISODate,
  currentTimeRounded,
  DEFAULT_CALENDAR_TIME,
  formatDateTimeLocal,
  monthToViewISO,
  normalizeTime,
  parseDateTimeLocal,
  parseISODate,
  toISODate,
  toISODateFromDateTime,
  viewISOToMonth,
  washCalendarModeToUi,
  washValueToCalendar,
} from '../lib/calendarDate'
import { WashTimePicker } from './WashTimePicker'

export type WashCalendarMode = 'single' | 'range' | 'multi'

export type WashCalendarDayMeta = {
  marked?: boolean
  className?: string
}

export type WashCalendarProps = {
  mode?: WashCalendarMode
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  viewDate?: string
  defaultViewDate?: string
  onViewDateChange?: (iso: string) => void
  min?: string
  max?: string
  isDateDisallowed?: (date: Date) => boolean
  markedDates?: Iterable<string>
  getDayMeta?: (iso: string, date: Date) => WashCalendarDayMeta | undefined
  showOutsideDays?: boolean
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
  maxYears?: number
  size?: 'md' | 'sm'
  bordered?: boolean
  includeTime?: boolean
  defaultTime?: string
  timeStep?: number
  className?: string
  id?: string
  'aria-label'?: string
}

function joinClass(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function useControllableString(
  controlled: string | undefined,
  fallback: string,
  onChange?: (value: string) => void,
): [string, (next: string) => void] {
  const [internal, setInternal] = useState(fallback)
  const value = controlled ?? internal
  const setValue = useCallback(
    (next: string) => {
      if (controlled === undefined) setInternal(next)
      onChange?.(next)
    },
    [controlled, onChange],
  )
  return [value, setValue]
}

type NavOption = { value: number; label: string }

function monthOptions(locale: string): NavOption[] {
  const fmt = new Intl.DateTimeFormat(locale, { month: 'long' })
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: fmt.format(new Date(2024, i, 1)),
  }))
}

function CalendarNavDropdown({
  id,
  label,
  value,
  options,
  onSelect,
  year,
  compact,
}: {
  id: string
  label: string
  value: number
  options: NavOption[]
  onSelect: (value: number) => void
  year?: boolean
  compact?: boolean
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const panelHeight = year ? 240 : 320
  const { placement, className: dropdownClass, onToggle } =
    useDetailsDropdownPlacement(
      detailsRef,
      {
        panelWidth: year ? 96 : 160,
        panelHeight,
        vertical: 'bottom',
        boundarySelector: '.wash-calendar',
        hover: false,
        minBottom: 72,
      },
      Boolean(year),
    )

  const selected = options.find((o) => o.value === value)
  const triggerLabel = selected?.label ?? String(value)

  function pick(next: number) {
    onSelect(next)
    if (detailsRef.current) detailsRef.current.open = false
  }

  return (
    <details
      ref={detailsRef}
      className={joinClass(
        dropdownClass,
        'dropdown-no-hover',
        'wash-calendar__nav-dropdown',
        year && 'wash-calendar__nav-dropdown--year',
      )}
      onToggle={(event) => {
        onToggle(event)
        if (event.currentTarget.open) {
          requestAnimationFrame(() => {
            event.currentTarget
              .querySelector<HTMLElement>('[aria-selected="true"]')
              ?.scrollIntoView({ block: 'nearest' })
          })
        }
      }}
    >
      <summary
        id={id}
        className={joinClass(
          'btn btn-ghost btn-sm wash-calendar__nav-trigger cursor-pointer',
          compact && 'btn-xs',
        )}
        aria-label={`${label}: ${triggerLabel}`}
      >
        <span className="min-w-0 truncate">{triggerLabel}</span>
        <ChevronDown className="wash-calendar__nav-chevron size-3.5 shrink-0" aria-hidden />
      </summary>
      <ul
        className={joinClass(
          'menu menu-sm dropdown-content wash-scroll-native wash-calendar__nav-menu',
          DROPDOWN_PANEL_Z,
          DROPDOWN_PANEL_OVERFLOW,
          'rounded-box border border-ink-border bg-base-100 shadow-[var(--shadow-paper-md)]',
          placement.top ? 'mb-1' : 'mt-1',
        )}
        style={dropdownPanelStyle(placement) as CSSProperties}
        role="listbox"
        aria-label={label}
        tabIndex={-1}
      >
        {options.map((opt) => {
          const active = opt.value === value
          return (
            <li key={opt.value}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                className={joinClass(
                  'cursor-pointer',
                  active && 'menu-wash-active font-semibold',
                )}
                onClick={() => pick(opt.value)}
              >
                {opt.label}
              </button>
            </li>
          )
        })}
      </ul>
    </details>
  )
}

/**
 * Wash month calendar: ui-sdk grid + daisyUI details dropdown month/year nav.
 */
export function WashCalendar({
  mode = 'single',
  value: valueProp,
  defaultValue = '',
  onChange,
  viewDate: viewDateProp,
  defaultViewDate,
  onViewDateChange,
  min,
  max,
  isDateDisallowed,
  markedDates,
  getDayMeta,
  showOutsideDays = true,
  firstDayOfWeek = 0,
  locale,
  maxYears = 50,
  size = 'md',
  bordered = true,
  includeTime = false,
  defaultTime = DEFAULT_CALENDAR_TIME,
  timeStep = 300,
  className,
  id,
  'aria-label': ariaLabel = 'Calendar',
}: WashCalendarProps) {
  const reactId = useId()
  const rootId = id ?? `wash-cal-${reactId}`
  const timeInputId = `${rootId}-time`
  const resolvedLocale =
    locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')

  const todayISO = useMemo(() => toISODate(new Date()), [])
  const withTime = includeTime && mode === 'single'
  const resolvedDefaultTime =
    normalizeTime(defaultTime) ?? DEFAULT_CALENDAR_TIME
  const uiMode = washCalendarModeToUi(mode)
  const compact = size === 'sm'

  const [value, setValue] = useControllableString(
    valueProp,
    defaultValue,
    onChange,
  )

  const selectedDay = useMemo(() => {
    const raw = withTime
      ? toISODateFromDateTime(value) || ''
      : value.trim()
    return raw
  }, [value, withTime])

  const selectedTime = useMemo(() => {
    if (!withTime) return resolvedDefaultTime
    return parseDateTimeLocal(value, resolvedDefaultTime).time
  }, [withTime, value, resolvedDefaultTime])

  const initialView =
    defaultViewDate ?? (selectedDay || todayISO)

  const [viewISO, setViewISO] = useControllableString(
    viewDateProp,
    toISODateFromDateTime(initialView) || initialView || todayISO,
    onViewDateChange,
  )

  const month = useMemo(() => viewISOToMonth(viewISO), [viewISO])
  const [yearPart, monthPart] = month.split('-')
  const viewMonthIndex = Math.max(0, Math.min(11, Number(monthPart) - 1))
  const viewYear = Number(yearPart) || new Date().getFullYear()

  const markedSet = useMemo(() => {
    const set = new Set<string>()
    if (markedDates) {
      for (const d of markedDates) set.add(d)
    }
    return set
  }, [markedDates])

  const months = useMemo(() => monthOptions(resolvedLocale), [resolvedLocale])
  const years = useMemo(
    () =>
      buildCalendarYearRange({
        viewISO: monthToViewISO(month),
        min,
        max,
        maxYears,
      }),
    [month, min, max, maxYears],
  )

  const calendarValue = useMemo(
    () => washValueToCalendar(mode, value),
    [mode, value],
  )

  const unavailable = useMemo(() => {
    if (!isDateDisallowed) return undefined
    return (iso: string) => {
      const d = parseISODate(iso)
      return d ? isDateDisallowed(d) : false
    }
  }, [isDateDisallowed])

  const handleValueChange = useCallback(
    (next: CalendarValue) => {
      const wash = calendarValueToWash(mode, next, {
        includeTime: withTime,
        time: selectedTime,
      })
      setValue(wash)
    },
    [mode, withTime, selectedTime, setValue],
  )

  const handleMonthChange = useCallback(
    (nextMonth: string) => {
      setViewISO(monthToViewISO(nextMonth))
    },
    [setViewISO],
  )

  const setTimePart = useCallback(
    (time: string) => {
      if (!withTime) return
      const t = normalizeTime(time) ?? selectedTime
      const day = selectedDay || todayISO
      setValue(formatDateTimeLocal(day, t))
    },
    [withTime, selectedTime, selectedDay, todayISO, setValue],
  )

  const goToday = useCallback(() => {
    const t = clampISODate(todayISO, min, max)
    setViewISO(t)
    if (mode === 'single') {
      if (withTime) {
        setValue(formatDateTimeLocal(t, currentTimeRounded(timeStep)))
      } else {
        setValue(t)
      }
    }
  }, [todayISO, min, max, setViewISO, mode, withTime, timeStep, setValue])

  const shell = joinClass(
    'wash-calendar',
    compact && 'wash-calendar--sm',
    withTime && 'wash-calendar--with-time',
    'rounded-box border bg-base-100',
    bordered
      ? 'border-base-300 shadow-[var(--shadow-paper-sm)]'
      : 'border-transparent shadow-none',
    compact ? 'p-2' : 'p-3',
    className,
  )

  const prevNextClass =
    'btn btn-ghost btn-square btn-sm btn-primary cursor-pointer wash-calendar__step'

  return (
    <div
      id={rootId}
      className={shell}
      role="application"
      aria-label={ariaLabel}
    >
      <Calendar
        mode={uiMode}
        value={calendarValue}
        onValueChange={handleValueChange}
        month={month}
        onMonthChange={handleMonthChange}
        min={min}
        max={max}
        unavailable={unavailable}
        weekStartsOn={firstDayOfWeek}
        locale={resolvedLocale}
        showOutsideDays={showOutsideDays}
        weekdayFormat="short"
        className="wash-calendar__ui"
      >
          <div className="wash-calendar__header">
            <div className="tooltip tooltip-primary tooltip-bottom" data-tip="Previous month">
              <CalendarPrevious
                className={prevNextClass}
                aria-label="Previous month"
                render={
                  <button type="button" className={prevNextClass}>
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>
                }
              />
            </div>

            <CalendarNavDropdown
              id={`${rootId}-month`}
              label="Month"
              value={viewMonthIndex}
              options={months}
              compact={compact}
              onSelect={(monthIndex) => {
                handleMonthChange(
                  `${yearPart}-${String(monthIndex + 1).padStart(2, '0')}`,
                )
              }}
            />

            <CalendarNavDropdown
              id={`${rootId}-year`}
              label="Year"
              value={viewYear}
              options={years.map((y) => ({ value: y, label: String(y) }))}
              year
              compact={compact}
              onSelect={(year) => {
                handleMonthChange(`${year}-${monthPart}`)
              }}
            />

            <div className="tooltip tooltip-primary tooltip-bottom" data-tip="Next month">
              <CalendarNext
                className={prevNextClass}
                aria-label="Next month"
                render={
                  <button type="button" className={prevNextClass}>
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                }
              />
            </div>

            <button
              type="button"
              className="wash-calendar__today btn btn-ghost btn-sm cursor-pointer"
              onClick={goToday}
            >
              Today
            </button>
          </div>

        <CalendarHeading className="wash-calendar__caption" />

        <CalendarGrid className="wash-calendar__grid">
          <CalendarWeekdays>
            {(index) => (
              <CalendarWeekday
                index={index}
                className="wash-calendar__weekday"
              />
            )}
          </CalendarWeekdays>
          <CalendarWeeks>
            {(cell) => {
              if (cell.hidden) {
                return (
                  <CalendarDay
                    key={cell.date}
                    value={cell.date}
                    className="wash-calendar__day-empty"
                    aria-hidden
                  />
                )
              }
              const date = parseISODate(cell.date)
              const meta = date ? getDayMeta?.(cell.date, date) : undefined
              const marked = Boolean(
                meta?.marked || markedSet.has(cell.date),
              )
              return (
                <CalendarDay key={cell.date} value={cell.date}>
                  {(state) => (
                    <span
                      className={joinClass(
                        'wash-calendar__day',
                        state.outside && 'wash-calendar__day--outside',
                        state.today &&
                          !state.selected &&
                          'wash-calendar__day--today',
                        state.inRange &&
                          !state.rangeStart &&
                          !state.rangeEnd &&
                          'wash-calendar__day--in-range',
                        (state.selected ||
                          state.rangeStart ||
                          state.rangeEnd) &&
                          'wash-calendar__day--selected',
                        state.disabled && 'wash-calendar__day--disabled',
                        meta?.className,
                      )}
                    >
                      <span>{state.label}</span>
                      {marked ? (
                        <span className="wash-calendar__mark" aria-hidden />
                      ) : null}
                    </span>
                  )}
                </CalendarDay>
              )
            }}
          </CalendarWeeks>
        </CalendarGrid>
      </Calendar>

      {withTime ? (
        <div className="wash-calendar__time">
          <span className="wash-calendar__time-label" id={`${timeInputId}-label`}>
            Time
          </span>
          <WashTimePicker
            id={timeInputId}
            value={selectedTime}
            onChange={setTimePart}
            locale={resolvedLocale}
            size={compact ? 'sm' : 'md'}
            aria-label="Time"
          />
        </div>
      ) : null}
    </div>
  )
}