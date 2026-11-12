import { useCallback, useId, useRef, type CSSProperties } from 'react'
import { CalendarClock } from '../icons'
import { useDetailsDropdownPlacement } from '../hooks/useDropdownPlacement'
import { DROPDOWN_PANEL_Z, dropdownPanelStyle } from '../lib/dropdownPlacement'
import {
  formatDateTimeLocal,
  normalizeTime,
  parseDateTimeLocal,
  parseISODate,
} from '../lib/calendarDate'
import { WashCalendar } from './WashCalendar'

export type WashDateTimePickerProps = {
  /** Controlled `YYYY-MM-DDTHH:mm:ss` (or day-only / partial time). */
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  min?: string
  max?: string
  defaultTime?: string
  isDateDisallowed?: (date: Date) => boolean
  locale?: string
  size?: 'md' | 'sm'
  disabled?: boolean
  id?: string
  className?: string
  triggerClassName?: string
  /** Close after full date+time selection from calendar footer. Default false. */
  closeOnSelect?: boolean
  'aria-label'?: string
}

function joinClass(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function formatDateTimeDisplay(value: string, locale?: string): string {
  if (!value) return ''
  const { date, time } = parseDateTimeLocal(value)
  if (!date) return value
  const parsed = parseISODate(date)
  const datePart = parsed
    ? parsed.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : date
  const t = normalizeTime(time)
  if (!t) return datePart
  const [hh, mm] = t.split(':')
  const h = Number(hh)
  const m = Number(mm)
  if (Number.isNaN(h) || Number.isNaN(m)) return `${datePart} · ${t}`
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${datePart} · ${hour12}:${String(m).padStart(2, '0')} ${period}`
}

/**
 * Date and time in one dropdown via {@link WashCalendar} `includeTime`.
 * Emits `YYYY-MM-DDTHH:mm:ss`.
 */
export function WashDateTimePicker({
  value,
  defaultValue,
  onChange,
  min,
  max,
  defaultTime,
  isDateDisallowed,
  locale,
  size = 'md',
  disabled = false,
  id,
  className,
  triggerClassName,
  closeOnSelect = false,
  'aria-label': ariaLabel,
}: WashDateTimePickerProps) {
  const reactId = useId()
  const rootId = id ?? `wash-datetime-${reactId}`
  const panelId = `${rootId}-panel`
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const compact = size === 'sm'

  const resolved = value ?? defaultValue ?? ''
  const display = formatDateTimeDisplay(resolved, locale)

  const {
    placement,
    className: dropdownClass,
    onToggle,
    panelStyle,
  } = useDetailsDropdownPlacement(
    detailsRef,
    {
      panelWidth: compact ? 300 : 320,
      panelHeight: compact ? 400 : 420,
      hover: false,
    },
    false,
  )

  const setValue = useCallback(
    (next: string) => {
      const { date, time } = parseDateTimeLocal(next, defaultTime)
      const formatted = date ? formatDateTimeLocal(date, time) : next
      onChange?.(formatted)
      if (closeOnSelect && detailsRef.current) {
        detailsRef.current.open = false
      }
    },
    [onChange, defaultTime, closeOnSelect],
  )

  return (
    <details
      ref={detailsRef}
      className={joinClass(
        dropdownClass,
        'wash-datetime w-full dropdown-no-hover',
        disabled && 'pointer-events-none opacity-60',
        className,
      )}
      onToggle={(event) => {
        if (disabled) {
          event.currentTarget.open = false
          return
        }
        onToggle(event)
      }}
    >
      <summary
        id={rootId}
        className={joinClass(
          'wash-datetime__trigger input input-bordered flex w-full items-center justify-between gap-2 border-ink-border [&::-webkit-details-marker]:hidden',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          compact && 'input-sm',
          triggerClassName,
        )}
        aria-controls={panelId}
        aria-label={ariaLabel ?? (display ? `Date and time: ${display}` : 'Pick date and time')}
        aria-haspopup="dialog"
        aria-disabled={disabled || undefined}
      >
        <span className="min-w-0 truncate text-sm text-base-content">
          {display || 'Pick date and time'}
        </span>
        <CalendarClock className="size-4 shrink-0 opacity-55" aria-hidden />
      </summary>
      <div
        id={panelId}
        className={joinClass(
          'dropdown-content wash-date__panel rounded-box border border-ink-border bg-base-100 p-1 shadow-[var(--shadow-paper-md)]',
          DROPDOWN_PANEL_Z,
          placement.top ? 'bottom-full mb-2 mt-0' : 'mt-2',
        )}
        style={{ ...dropdownPanelStyle(placement), ...panelStyle } as CSSProperties}
        role="dialog"
        aria-label="Choose date and time"
      >
        <WashCalendar
          mode="single"
          includeTime
          size={compact ? 'sm' : 'md'}
          bordered={false}
          value={resolved}
          defaultValue={defaultValue}
          onChange={setValue}
          min={min}
          max={max}
          defaultTime={defaultTime}
          isDateDisallowed={isDateDisallowed}
          locale={locale}
          aria-label="Date and time calendar"
        />
      </div>
    </details>
  )
}
