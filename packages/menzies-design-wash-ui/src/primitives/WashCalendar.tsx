import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from '../icons'
import { useDetailsDropdownPlacement } from '../hooks/useDropdownPlacement'
import {
  DROPDOWN_PANEL_OVERFLOW,
  DROPDOWN_PANEL_Z,
  dropdownPanelStyle,
} from '../lib/dropdownPlacement'
import {
  addMonths,
  clampISODate,
  compareISODate,
  daysInMonth,
  formatMultiValue,
  formatRangeValue,
  isISOInRange,
  parseISODate,
  parseMultiValue,
  parseRangeValue,
  shiftISODate,
  startOfMonth,
  toISODate,
  weekdayColumn,
} from '../lib/calendarDate'

export type WashCalendarMode = 'single' | 'range' | 'multi'

export type WashCalendarDayMeta = {
  /** Show a primary event marker under the day number. */
  marked?: boolean
  /** Extra class on the day cell button. */
  className?: string
}

export type WashCalendarProps = {
  mode?: WashCalendarMode
  /**
   * Selection value:
   * - single: `YYYY-MM-DD`
   * - range: `YYYY-MM-DD/YYYY-MM-DD` (end optional while picking)
   * - multi: space-separated `YYYY-MM-DD` list
   */
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** Visible month (any day in that month as ISO). Controlled optional. */
  viewDate?: string
  defaultViewDate?: string
  onViewDateChange?: (iso: string) => void
  min?: string
  max?: string
  /** Return true to disallow selection (still focusable unless outside range). */
  isDateDisallowed?: (date: Date) => boolean
  /** ISO dates that show an event marker. */
  markedDates?: Iterable<string>
  getDayMeta?: (iso: string, date: Date) => WashCalendarDayMeta | undefined
  showOutsideDays?: boolean
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
  /** Year span around the focused year for the year select (default 50). */
  maxYears?: number
  size?: 'md' | 'sm'
  bordered?: boolean
  className?: string
  id?: string
  'aria-label'?: string
}

type Cell = {
  iso: string
  date: Date
  inMonth: boolean
  day: number
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

function buildMonthCells(
  view: Date,
  firstDayOfWeek: number,
  showOutsideDays: boolean,
): Cell[] {
  const year = view.getFullYear()
  const month = view.getMonth()
  const first = new Date(year, month, 1)
  const lead = weekdayColumn(first.getDay(), firstDayOfWeek)
  const dim = daysInMonth(year, month)
  const cells: Cell[] = []

  const prev = addMonths(view, -1)
  const prevDim = daysInMonth(prev.getFullYear(), prev.getMonth())
  for (let i = 0; i < lead; i++) {
    const day = prevDim - lead + i + 1
    const date = new Date(prev.getFullYear(), prev.getMonth(), day)
    cells.push({
      iso: toISODate(date),
      date,
      inMonth: false,
      day,
    })
  }

  for (let day = 1; day <= dim; day++) {
    const date = new Date(year, month, day)
    cells.push({
      iso: toISODate(date),
      date,
      inMonth: true,
      day,
    })
  }

  const trail = (7 - (cells.length % 7)) % 7
  const next = addMonths(view, 1)
  for (let i = 0; i < trail; i++) {
    const day = i + 1
    const date = new Date(next.getFullYear(), next.getMonth(), day)
    cells.push({
      iso: toISODate(date),
      date,
      inMonth: false,
      day,
    })
  }

  if (!showOutsideDays) {
    return cells.map((c) =>
      c.inMonth
        ? c
        : {
            ...c,
            iso: '',
            day: 0,
          },
    )
  }

  return cells
}

function weekdayLabels(locale: string, firstDayOfWeek: number): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  // 2024-01-07 is a Sunday
  const labels: string[] = []
  for (let i = 0; i < 7; i++) {
    const dow = (firstDayOfWeek + i) % 7
    const d = new Date(2024, 0, 7 + dow)
    labels.push(fmt.format(d))
  }
  return labels
}

function monthOptions(locale: string): Array<{ value: number; label: string }> {
  const fmt = new Intl.DateTimeFormat(locale, { month: 'long' })
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: fmt.format(new Date(2024, i, 1)),
  }))
}

type NavOption = { value: number; label: string }

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
  // panelHeight caps dropdown max-height (px); CSS mirrors 320→20rem / 240→15rem
  const panelHeight = year ? 240 : 320
  const { placement, className: dropdownClass, onToggle } =
    useDetailsDropdownPlacement(
      detailsRef,
      {
        panelWidth: year ? 96 : 160,
        panelHeight,
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
          'btn btn-ghost btn-sm border border-base-300 wash-calendar__nav-trigger cursor-pointer [&::-webkit-details-marker]:hidden',
          compact && 'btn-xs',
        )}
        aria-label={`${label}: ${triggerLabel}`}
      >
        <span className="min-w-0 truncate">{triggerLabel}</span>
        <ChevronDown className="size-3.5 shrink-0 opacity-60" aria-hidden />
      </summary>
      <ul
        className={joinClass(
          'menu menu-sm dropdown-content wash-calendar__nav-menu',
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
 * Native Wash month calendar: month/year dropdowns, single / range / multi modes.
 * No third-party calendar dependency.
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
  className,
  id,
  'aria-label': ariaLabel = 'Calendar',
}: WashCalendarProps) {
  const reactId = useId()
  const rootId = id ?? `wash-cal-${reactId}`
  const resolvedLocale =
    locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')

  const todayISO = useMemo(() => toISODate(new Date()), [])

  const [value, setValue] = useControllableString(
    valueProp,
    defaultValue,
    onChange,
  )

  const initialView =
    defaultViewDate ??
    (mode === 'range'
      ? parseRangeValue(value).start || todayISO
      : mode === 'multi'
        ? parseMultiValue(value)[0] || todayISO
        : value || todayISO)

  const [viewISO, setViewISO] = useControllableString(
    viewDateProp,
    initialView,
    onViewDateChange,
  )

  const viewMonth = startOfMonth(viewISO)
  const [focusISO, setFocusISO] = useState(() =>
    clampISODate(
      mode === 'range'
        ? parseRangeValue(value).start || todayISO
        : mode === 'multi'
          ? parseMultiValue(value)[0] || todayISO
          : value || todayISO,
      min,
      max,
    ),
  )
  const [rangeAnchor, setRangeAnchor] = useState<string | null>(null)

  const markedSet = useMemo(() => {
    const set = new Set<string>()
    if (markedDates) {
      for (const d of markedDates) set.add(d)
    }
    return set
  }, [markedDates])

  const months = useMemo(() => monthOptions(resolvedLocale), [resolvedLocale])
  const weekdays = useMemo(
    () => weekdayLabels(resolvedLocale, firstDayOfWeek),
    [resolvedLocale, firstDayOfWeek],
  )

  const yearCenter = useMemo(() => new Date().getFullYear(), [])
  const years = useMemo(() => {
    const start = yearCenter - Math.floor(maxYears / 2)
    return Array.from({ length: maxYears + 1 }, (_, i) => start + i)
  }, [yearCenter, maxYears])

  const cells = useMemo(
    () => buildMonthCells(viewMonth, firstDayOfWeek, showOutsideDays),
    [viewMonth, firstDayOfWeek, showOutsideDays],
  )

  const rangeParsed = mode === 'range' ? parseRangeValue(value) : null
  const multiSet =
    mode === 'multi' ? new Set(parseMultiValue(value)) : null

  const isDisabled = useCallback(
    (iso: string, date: Date) => {
      if (!iso) return true
      if (min && compareISODate(iso, min) < 0) return true
      if (max && compareISODate(iso, max) > 0) return true
      if (isDateDisallowed?.(date)) return true
      return false
    },
    [min, max, isDateDisallowed],
  )

  const moveViewTo = useCallback(
    (iso: string) => {
      const clamped = clampISODate(iso, min, max)
      setViewISO(clamped)
      setFocusISO(clamped)
    },
    [min, max, setViewISO],
  )

  const selectDay = useCallback(
    (iso: string, date: Date) => {
      if (isDisabled(iso, date)) return
      if (mode === 'single') {
        setValue(iso)
        setFocusISO(iso)
        return
      }
      if (mode === 'multi') {
        const next = new Set(parseMultiValue(value))
        if (next.has(iso)) next.delete(iso)
        else next.add(iso)
        setValue(formatMultiValue([...next]))
        setFocusISO(iso)
        return
      }
      // range
      if (!rangeAnchor || (rangeParsed?.start && rangeParsed.end)) {
        setRangeAnchor(iso)
        setValue(iso)
        setFocusISO(iso)
        return
      }
      const next = formatRangeValue(rangeAnchor, iso)
      setValue(next)
      setRangeAnchor(null)
      setFocusISO(iso)
    },
    [
      isDisabled,
      mode,
      rangeAnchor,
      rangeParsed?.end,
      rangeParsed?.start,
      setValue,
      value,
    ],
  )

  const goToday = useCallback(() => {
    const t = clampISODate(todayISO, min, max)
    moveViewTo(t)
    if (mode === 'single') setValue(t)
  }, [todayISO, min, max, moveViewTo, mode, setValue])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const focus = focusISO || todayISO
      let next: string | null = null
      switch (e.key) {
        case 'ArrowLeft':
          next = shiftISODate(focus, -1)
          break
        case 'ArrowRight':
          next = shiftISODate(focus, 1)
          break
        case 'ArrowUp':
          next = shiftISODate(focus, -7)
          break
        case 'ArrowDown':
          next = shiftISODate(focus, 7)
          break
        case 'Home': {
          const d = parseISODate(focus)
          if (d) next = toISODate(new Date(d.getFullYear(), d.getMonth(), 1))
          break
        }
        case 'End': {
          const d = parseISODate(focus)
          if (d) {
            next = toISODate(
              new Date(d.getFullYear(), d.getMonth(), daysInMonth(d.getFullYear(), d.getMonth())),
            )
          }
          break
        }
        case 'PageUp': {
          const d = parseISODate(focus)
          if (d) {
            const n = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate())
            next = toISODate(n)
          }
          break
        }
        case 'PageDown': {
          const d = parseISODate(focus)
          if (d) {
            const n = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate())
            next = toISODate(n)
          }
          break
        }
        case 'Enter':
        case ' ': {
          e.preventDefault()
          const d = parseISODate(focus)
          if (d) selectDay(focus, d)
          return
        }
        case 'Escape':
          if (
            e.target instanceof Element &&
            e.currentTarget.querySelector('details.wash-calendar__nav-dropdown[open]')
          ) {
            return
          }
          if (mode === 'range' && rangeAnchor) {
            e.preventDefault()
            setRangeAnchor(null)
            setValue('')
          }
          return
        default:
          return
      }
      if (!next) return
      e.preventDefault()
      const clamped = clampISODate(next, min, max)
      setFocusISO(clamped)
      const focusDate = parseISODate(clamped)
      const view = startOfMonth(viewISO)
      if (
        focusDate &&
        (focusDate.getFullYear() !== view.getFullYear() ||
          focusDate.getMonth() !== view.getMonth())
      ) {
        setViewISO(clamped)
      }
    },
    [
      focusISO,
      todayISO,
      selectDay,
      mode,
      rangeAnchor,
      setValue,
      min,
      max,
      viewISO,
      setViewISO,
    ],
  )

  const compact = size === 'sm'
  const shell = joinClass(
    'wash-calendar',
    compact && 'wash-calendar--sm',
    'rounded-box border bg-base-100',
    bordered ? 'border-base-300 shadow-[var(--shadow-paper-sm)]' : 'border-transparent shadow-none',
    compact ? 'p-2' : 'p-3',
    className,
  )

  let headerNav: ReactNode = null
  headerNav = (
    <div className="wash-calendar__header">
      <div className="tooltip tooltip-primary tooltip-bottom" data-tip="Previous month">
        <button
          type="button"
          className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
          aria-label="Previous month"
          onClick={() => {
            const next = addMonths(viewMonth, -1)
            moveViewTo(toISODate(next))
          }}
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
      </div>

      <label className="wash-calendar__caption" htmlFor={`${rootId}-month`}>
        Month
      </label>
      <CalendarNavDropdown
        id={`${rootId}-month`}
        label="Month"
        value={viewMonth.getMonth()}
        options={months}
        compact={compact}
        onSelect={(month) => {
          const next = new Date(viewMonth.getFullYear(), month, 1)
          moveViewTo(toISODate(next))
        }}
      />

      <label className="wash-calendar__caption" htmlFor={`${rootId}-year`}>
        Year
      </label>
      <CalendarNavDropdown
        id={`${rootId}-year`}
        label="Year"
        value={viewMonth.getFullYear()}
        options={years.map((y) => ({ value: y, label: String(y) }))}
        year
        compact={compact}
        onSelect={(year) => {
          const next = new Date(year, viewMonth.getMonth(), 1)
          moveViewTo(toISODate(next))
        }}
      />

      <div className="tooltip tooltip-primary tooltip-bottom" data-tip="Next month">
        <button
          type="button"
          className="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer"
          aria-label="Next month"
          onClick={() => {
            const next = addMonths(viewMonth, 1)
            moveViewTo(toISODate(next))
          }}
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>

      <button
        type="button"
        className="btn btn-ghost btn-sm cursor-pointer"
        onClick={goToday}
      >
        Today
      </button>
    </div>
  )

  return (
    <div
      id={rootId}
      className={shell}
      role="application"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {headerNav}

      <div id={`${rootId}-caption`} className="wash-calendar__caption">
        {months[viewMonth.getMonth()]?.label} {viewMonth.getFullYear()}
      </div>

      <div
        className="wash-calendar__grid"
        role="grid"
        aria-labelledby={`${rootId}-caption`}
      >
        {weekdays.map((label) => (
          <div
            key={label}
            className="wash-calendar__weekday"
            role="columnheader"
            aria-label={label}
          >
            {label}
          </div>
        ))}
        {cells.map((cell, index) => {
          if (!cell.iso) {
            return (
              <div
                key={`empty-${index}`}
                className="wash-calendar__day-empty"
                aria-hidden
              />
            )
          }

          const disabled = isDisabled(cell.iso, cell.date)
          const isToday = cell.iso === todayISO
          const isFocus = cell.iso === focusISO
          let selected = false
          let inRange = false
          let rangeEdge = false

          if (mode === 'single') {
            selected = value === cell.iso
          } else if (mode === 'multi' && multiSet) {
            selected = multiSet.has(cell.iso)
          } else if (mode === 'range' && rangeParsed) {
            const start = rangeParsed.start
            const end = rangeParsed.end || rangeAnchor || ''
            if (start && end) {
              inRange = isISOInRange(cell.iso, start, end)
              rangeEdge = cell.iso === start || cell.iso === end
              selected = rangeEdge
            } else if (start) {
              selected = cell.iso === start
            }
          }

          const meta = getDayMeta?.(cell.iso, cell.date)
          const marked = Boolean(meta?.marked || markedSet.has(cell.iso))

          return (
            <button
              key={cell.iso}
              type="button"
              role="gridcell"
              tabIndex={isFocus ? 0 : -1}
              aria-selected={selected || inRange}
              aria-current={isToday ? 'date' : undefined}
              aria-disabled={disabled || undefined}
              disabled={disabled}
              className={joinClass(
                'wash-calendar__day',
                !cell.inMonth && 'wash-calendar__day--outside',
                isToday && !selected && 'wash-calendar__day--today',
                inRange && !rangeEdge && 'wash-calendar__day--in-range',
                selected && 'wash-calendar__day--selected',
                disabled && 'wash-calendar__day--disabled',
                meta?.className,
              )}
              onClick={() => selectDay(cell.iso, cell.date)}
              onFocus={() => setFocusISO(cell.iso)}
            >
              <span>{cell.day}</span>
              {marked ? (
                <span className="wash-calendar__mark" aria-hidden />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

