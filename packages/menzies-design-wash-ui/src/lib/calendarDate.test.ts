import { describe, expect, it } from 'vitest'
import {
  buildCalendarYearRange,
  formatDateTimeLocal,
  normalizeTime,
  parseDateTimeLocal,
  toISODateFromDateTime,
} from './calendarDate'

describe('calendarDate', () => {
  it('normalizeTime accepts HH:mm and pads seconds', () => {
    expect(normalizeTime('09:30')).toBe('09:30:00')
    expect(normalizeTime('09:30:45')).toBe('09:30:45')
    expect(normalizeTime('bad')).toBeNull()
  })

  it('parseDateTimeLocal splits day and time', () => {
    expect(parseDateTimeLocal('2026-03-15T14:05:00')).toEqual({
      date: '2026-03-15',
      time: '14:05:00',
    })
    expect(parseDateTimeLocal('2026-03-15')).toEqual({
      date: '2026-03-15',
      time: '09:00:00',
    })
  })

  it('formatDateTimeLocal joins ISO datetime', () => {
    expect(formatDateTimeLocal('2026-03-15', '10:00')).toBe(
      '2026-03-15T10:00:00',
    )
  })

  it('toISODateFromDateTime extracts day', () => {
    expect(toISODateFromDateTime('2026-03-15T10:00:00')).toBe('2026-03-15')
  })

  it('buildCalendarYearRange includes years before 2001 when viewing 2026', () => {
    const years = buildCalendarYearRange({ viewISO: '2026-06-01', maxYears: 50 })
    expect(years[0]).toBeLessThanOrEqual(1976)
    expect(years).toContain(2000)
    expect(years).toContain(2026)
  })

  it('buildCalendarYearRange keeps years before min for navigation', () => {
    const years = buildCalendarYearRange({
      viewISO: '2026-06-01',
      min: '2001-06-01',
      max: '2051-06-01',
      maxYears: 50,
    })
    expect(years[0]).toBeLessThan(2001)
    expect(years).toContain(2001)
    expect(years).toContain(2026)
  })

  it('buildCalendarYearRange widens through distant min and max', () => {
    const years = buildCalendarYearRange({
      viewISO: '2020-01-01',
      min: '1995-01-01',
      max: '2040-12-31',
      maxYears: 50,
    })
    expect(years[0]).toBeLessThanOrEqual(1995)
    expect(years[years.length - 1]).toBeGreaterThanOrEqual(2040)
  })
})
