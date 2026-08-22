import type {
  CalendarRangeProps,
  CalendarMonthProps,
  CalendarDateProps,
  CalendarMultiProps,
} from 'cally'
import type { HTMLAttributes, RefAttributes } from 'react'

type MapEvents<T> = {
  [K in keyof T as K extends `on${infer E}` ? `on${Lowercase<E>}` : K]: T[K]
}

type CallyElement<P> = MapEvents<P> &
  HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'calendar-month': CallyElement<CalendarMonthProps>
      'calendar-range': CallyElement<CalendarRangeProps>
      'calendar-date': CallyElement<CalendarDateProps>
      'calendar-multi': CallyElement<CalendarMultiProps>
    }
  }
}

export {}
