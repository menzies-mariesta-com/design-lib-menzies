import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import washCalendarSvelte from './WashCalendar.svelte?raw'
import calendarMonthTs from './calendar-month.ts?raw'
import calendarPageSvelte from './+page.svelte?raw'

/** Full SvelteKit kit for Wash month calendar + analog time (copy all three files). */
export const washCalendarSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'WashCalendar.svelte', code: washCalendarSvelte },
  { name: 'calendar-month.ts', code: calendarMonthTs },
  { name: '+page.svelte', code: calendarPageSvelte },
])
