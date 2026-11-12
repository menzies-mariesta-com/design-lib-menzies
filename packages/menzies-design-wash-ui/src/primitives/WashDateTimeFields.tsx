import type { ReactNode } from 'react'
import type { WashDatePickerProps } from './WashDatePicker'
import type { WashTimePickerProps } from './WashTimePicker'
import { WashDatePicker } from './WashDatePicker'
import { WashTimePicker } from './WashTimePicker'

export type WashDateTimeFieldsProps = {
  date: string
  time: string
  onDateChange: (isoDate: string) => void
  onTimeChange: (time: string) => void
  dateProps?: Omit<
    WashDatePickerProps,
    'value' | 'onChange' | 'defaultValue'
  >
  timeProps?: Omit<
    WashTimePickerProps,
    'value' | 'onChange' | 'defaultValue'
  >
  className?: string
  children?: ReactNode
}

function joinClass(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Side-by-side {@link WashDatePicker} + {@link WashTimePicker} for composed
 * local date/time (no native `type="date"`).
 */
export function WashDateTimeFields({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateProps,
  timeProps,
  className,
  children,
}: WashDateTimeFieldsProps) {
  return (
    <div
      className={joinClass(
        'wash-datetime-fields flex flex-col gap-3 sm:flex-row sm:items-stretch',
        className,
      )}
    >
      <WashDatePicker
        value={date}
        onChange={onDateChange}
        className="min-w-0 flex-1"
        {...dateProps}
      />
      <WashTimePicker
        value={time}
        onChange={onTimeChange}
        className="min-w-0 flex-1"
        {...timeProps}
      />
      {children}
    </div>
  )
}
