/** Calendar-day helpers shared by Overview and Calendar. */

export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function shiftISODate(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

/** Short grid datetime, e.g. Aug 1, 16:02 */
export function formatShortDateTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const month = date.toLocaleDateString(undefined, { month: 'short' })
  const day = date.getDate()
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${month} ${day}, ${hh}:${mm}`
}

/** Short calendar day, e.g. Aug 21 */
export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

export function formatPeriodLabel(d = new Date()): string {
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
