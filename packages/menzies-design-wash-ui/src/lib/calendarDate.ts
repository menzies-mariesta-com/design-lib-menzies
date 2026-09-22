/** ISO calendar-day helpers (local timezone, no time). */

export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseISODate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim())
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  const date = new Date(y, mo - 1, d)
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== mo - 1 ||
    date.getDate() !== d
  ) {
    return null
  }
  return date
}

export function shiftISODate(iso: string, days: number): string {
  const date = parseISODate(iso)
  if (!date) return iso
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

export function compareISODate(a: string, b: string): number {
  if (a === b) return 0
  return a < b ? -1 : 1
}

export function clampISODate(iso: string, min?: string, max?: string): string {
  let next = iso
  if (min && compareISODate(next, min) < 0) next = min
  if (max && compareISODate(next, max) > 0) next = max
  return next
}

export function startOfMonth(isoOrDate: string | Date): Date {
  const d =
    typeof isoOrDate === 'string' ? parseISODate(isoOrDate) : new Date(isoOrDate)
  if (!d) {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  }
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1)
}

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate()
}

/** Weekday index 0=Sun … 6=Sat, adjusted so `firstDayOfWeek` is column 0. */
export function weekdayColumn(dayOfWeek: number, firstDayOfWeek: number): number {
  return (dayOfWeek - firstDayOfWeek + 7) % 7
}

export function parseRangeValue(value: string): { start: string; end: string } {
  const [start = '', end = ''] = value.split('/')
  return { start: start.trim(), end: end.trim() }
}

export function formatRangeValue(start: string, end: string): string {
  if (!start) return ''
  if (!end) return start
  return compareISODate(start, end) <= 0 ? `${start}/${end}` : `${end}/${start}`
}

export function parseMultiValue(value: string): string[] {
  return value
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function formatMultiValue(dates: string[]): string {
  return [...new Set(dates)].sort().join(' ')
}

export function isISOInRange(iso: string, start: string, end: string): boolean {
  if (!start || !end) return false
  const a = compareISODate(start, end) <= 0 ? start : end
  const b = compareISODate(start, end) <= 0 ? end : start
  return compareISODate(iso, a) >= 0 && compareISODate(iso, b) <= 0
}
