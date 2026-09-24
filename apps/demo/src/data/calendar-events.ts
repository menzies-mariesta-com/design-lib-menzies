import { shiftISODate, toISODate } from './dates'

export type StudioEvent = {
  id: string
  date: string
  startTime: string
  endTime: string
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
      startTime: '09:00',
      endTime: '10:30',
      title: 'Morning wash study',
      note: 'Wet-on-wet sky practice',
    },
    {
      id: 'e2',
      date: shiftISODate(todayISO, 2),
      startTime: '13:00',
      endTime: '15:00',
      title: 'Pigment mixing lab',
      note: 'Ultramarine and ochre ratios',
    },
    {
      id: 'e3',
      date: shiftISODate(todayISO, 5),
      startTime: '15:30',
      endTime: '17:00',
      title: 'Series critique',
      note: 'Coastal plates review',
    },
    {
      id: 'e4',
      date: shiftISODate(todayISO, -3),
      startTime: '10:00',
      endTime: '11:00',
      title: 'Paper stretch',
      note: '300gsm cold press prep',
    },
    {
      id: 'e5',
      date: shiftISODate(todayISO, 1),
      startTime: '08:30',
      endTime: '09:45',
      title: 'Dry-time check',
      note: 'Harbor dawn second glaze',
    },
    {
      id: 'e6',
      date: shiftISODate(todayISO, 4),
      startTime: '11:00',
      endTime: '12:30',
      title: 'Archive stamping',
      note: 'Mineral Notes series plates',
    },
    {
      id: 'e7',
      date: todayISO,
      startTime: '14:00',
      endTime: '15:30',
      title: 'Glaze review',
      note: 'Second wash on riverside plate',
    },
  ]
}

export const studioEvents: StudioEvent[] = getSeedStudioEvents()
