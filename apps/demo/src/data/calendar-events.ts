import { shiftISODate, toISODate } from './dates'

export type StudioEvent = {
  id: string
  date: string
  title: string
  note: string
}

/** Seed schedule for Menzies Design desk. Relative to "today" so demos stay current. */
export function getSeedStudioEvents(today = new Date()): StudioEvent[] {
  const todayISO = toISODate(today)
  return [
    {
      id: 'e1',
      date: todayISO,
      title: 'Morning wash study',
      note: 'Wet-on-wet sky practice',
    },
    {
      id: 'e2',
      date: shiftISODate(todayISO, 2),
      title: 'Pigment mixing lab',
      note: 'Ultramarine and ochre ratios',
    },
    {
      id: 'e3',
      date: shiftISODate(todayISO, 5),
      title: 'Series critique',
      note: 'Coastal plates review',
    },
    {
      id: 'e4',
      date: shiftISODate(todayISO, -3),
      title: 'Paper stretch',
      note: '300gsm cold press prep',
    },
    {
      id: 'e5',
      date: shiftISODate(todayISO, 1),
      title: 'Dry-time check',
      note: 'Harbor dawn second glaze',
    },
    {
      id: 'e6',
      date: shiftISODate(todayISO, 4),
      title: 'Archive stamping',
      note: 'Mineral Notes series plates',
    },
  ]
}

export const studioEvents: StudioEvent[] = getSeedStudioEvents()
