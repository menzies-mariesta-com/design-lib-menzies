import {
  watercolorThemes,
  type WatercolorThemeId,
} from '../themes'
import { studioEvents, type StudioEvent } from './calendar-events'
import { toISODate } from './dates'

export const STUDIO_NAME = 'Menzies Design'

export type PlateStatus = 'Draft' | 'In wash' | 'Review' | 'Archived'

export type StudioPlate = {
  id: string
  name: string
  tags: string[]
  status: PlateStatus
  washes: number
  series: string
  pigmentId: WatercolorThemeId
  created: string
  updated: string
}

export type StudioActivity = {
  id: string
  at: string
  title: string
  detail: string
  kind: 'wash' | 'critique' | 'palette' | 'archive' | 'prep'
}

export type PigmentUsage = {
  pigmentId: WatercolorThemeId
  washes: number
  plates: number
}

export type DryQueueItem = {
  id: string
  plateId: string
  name: string
  remainingMin: number
  layer: string
}

/** Active plate ledger for the Overview desk. */
export const studioPlates: StudioPlate[] = [
  {
    id: 'WS-214',
    name: 'Coastal fog plate',
    tags: ['coastal', 'mist'],
    status: 'Review',
    washes: 7,
    series: 'Atlantic Studies',
    pigmentId: 'mineral',
    created: '2026-08-04T10:18:00',
    updated: '2026-08-21T09:14:00',
  },
  {
    id: 'WS-208',
    name: 'Ochre cliff margin',
    tags: ['mineral', 'earth'],
    status: 'In wash',
    washes: 4,
    series: 'Mineral Notes',
    pigmentId: 'ochre',
    created: '2026-08-02T14:05:00',
    updated: '2026-08-20T16:42:00',
  },
  {
    id: 'WS-201',
    name: 'Rose field bloom',
    tags: ['botanical', 'rose'],
    status: 'Review',
    washes: 9,
    series: 'Botanical Index',
    pigmentId: 'madder',
    created: '2026-07-28T11:40:00',
    updated: '2026-08-19T11:05:00',
  },
  {
    id: 'WS-196',
    name: 'Harbor dawn plate',
    tags: ['coastal', 'blue'],
    status: 'In wash',
    washes: 5,
    series: 'Atlantic Studies',
    pigmentId: 'cerulean',
    created: '2026-07-22T09:02:00',
    updated: '2026-08-21T07:50:00',
  },
  {
    id: 'WS-188',
    name: 'Indigo pool study',
    tags: ['indigo', 'water'],
    status: 'Archived',
    washes: 5,
    series: 'Atlantic Studies',
    pigmentId: 'indigo',
    created: '2026-07-12T08:30:00',
    updated: '2026-08-12T08:30:00',
  },
  {
    id: 'WS-182',
    name: 'Cedar wash test',
    tags: ['pine', 'test'],
    status: 'In wash',
    washes: 3,
    series: 'Mineral Notes',
    pigmentId: 'pine',
    created: '2026-08-15T13:20:00',
    updated: '2026-08-21T08:12:00',
  },
  {
    id: 'WS-175',
    name: 'Viridian fen edge',
    tags: ['green', 'wetland'],
    status: 'Draft',
    washes: 2,
    series: 'Botanical Index',
    pigmentId: 'viridian',
    created: '2026-08-18T15:45:00',
    updated: '2026-08-20T10:08:00',
  },
  {
    id: 'WS-169',
    name: 'Sepia archive stamp',
    tags: ['archive', 'ink'],
    status: 'Archived',
    washes: 6,
    series: 'Mineral Notes',
    pigmentId: 'sepia',
    created: '2026-06-30T16:00:00',
    updated: '2026-08-08T12:22:00',
  },
  {
    id: 'WS-161',
    name: 'Ultramarine cove',
    tags: ['coastal', 'deep'],
    status: 'Review',
    washes: 8,
    series: 'Atlantic Studies',
    pigmentId: 'ultramarine',
    created: '2026-07-05T10:10:00',
    updated: '2026-08-17T14:33:00',
  },
  {
    id: 'WS-154',
    name: 'Saffron grain field',
    tags: ['ochre', 'field'],
    status: 'Draft',
    washes: 1,
    series: 'Botanical Index',
    pigmentId: 'saffron',
    created: '2026-08-19T09:55:00',
    updated: '2026-08-19T17:20:00',
  },
]

/** Dated desk activity derived from real plate / pigment work. */
export const studioActivity: StudioActivity[] = [
  {
    id: 'a1',
    at: '2026-08-21T09:14:00',
    title: 'Critique opened',
    detail: 'Coastal fog plate moved to Review',
    kind: 'critique',
  },
  {
    id: 'a2',
    at: '2026-08-21T08:12:00',
    title: 'Wash laid',
    detail: 'Cedar wash test: pine glaze drying',
    kind: 'wash',
  },
  {
    id: 'a3',
    at: '2026-08-21T07:50:00',
    title: 'Second glaze',
    detail: 'Harbor dawn plate: cerulean edge',
    kind: 'wash',
  },
  {
    id: 'a4',
    at: '2026-08-20T16:42:00',
    title: 'Pigment restain',
    detail: 'Ochre theme applied for cliff margin',
    kind: 'palette',
  },
  {
    id: 'a5',
    at: '2026-08-19T11:05:00',
    title: 'Plate submitted',
    detail: 'Rose field bloom queued for critique',
    kind: 'critique',
  },
  {
    id: 'a6',
    at: '2026-08-18T15:45:00',
    title: 'Draft started',
    detail: 'Viridian fen edge on cold-press',
    kind: 'prep',
  },
  {
    id: 'a7',
    at: '2026-08-12T08:30:00',
    title: 'Archived',
    detail: 'Indigo pool study stamped to Mineral Notes',
    kind: 'archive',
  },
]

/**
 * Usage tallies from plate washes. Pigment ids match watercolorThemes
 * so Overview can call applyTheme on click.
 */
export function getPigmentUsage(): PigmentUsage[] {
  const map = new Map<WatercolorThemeId, PigmentUsage>()

  for (const plate of studioPlates) {
    const prev = map.get(plate.pigmentId) ?? {
      pigmentId: plate.pigmentId,
      washes: 0,
      plates: 0,
    }
    prev.washes += plate.washes
    prev.plates += 1
    map.set(plate.pigmentId, prev)
  }

  return [...map.values()].sort((a, b) => b.washes - a.washes)
}

export const dryQueue: DryQueueItem[] = studioPlates
  .filter((p) => p.status === 'In wash')
  .map((p, i) => ({
    id: `dry-${p.id}`,
    plateId: p.id,
    name: p.name,
    remainingMin: [12, 28, 41][i] ?? 15 + i * 9,
    layer: i === 0 ? 'Edge glaze' : i === 1 ? 'Sky band' : 'Ground wash',
  }))

export type StudioKpis = {
  washesCompleted: number
  pigmentsInUse: number
  pigmentsAvailable: number
  openCritiques: number
  dryQueueCount: number
  openPlates: number
  archivedPlates: number
  upcomingSessions: number
}

export function computeStudioKpis(
  events: StudioEvent[] = studioEvents,
  today = new Date(),
): StudioKpis {
  const todayISO = toISODate(today)
  const washesCompleted = studioPlates.reduce((sum, p) => sum + p.washes, 0)
  const pigmentsInUse = new Set(studioPlates.map((p) => p.pigmentId)).size
  const openCritiques = studioPlates.filter((p) => p.status === 'Review').length
  const openPlates = studioPlates.filter(
    (p) => p.status === 'Draft' || p.status === 'In wash' || p.status === 'Review',
  ).length
  const archivedPlates = studioPlates.filter((p) => p.status === 'Archived').length
  const upcomingSessions = events.filter((e) => e.date >= todayISO).length

  return {
    washesCompleted,
    pigmentsInUse,
    pigmentsAvailable: watercolorThemes.length,
    openCritiques,
    dryQueueCount: dryQueue.length,
    openPlates,
    archivedPlates,
    upcomingSessions,
  }
}

export function upcomingEvents(
  events: StudioEvent[] = studioEvents,
  today = new Date(),
  limit = 5,
): StudioEvent[] {
  const todayISO = toISODate(today)
  return events
    .filter((e) => e.date >= todayISO)
    .sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title))
    .slice(0, limit)
}

export function pigmentMeta(id: WatercolorThemeId) {
  return watercolorThemes.find((t) => t.id === id) ?? watercolorThemes[0]
}
