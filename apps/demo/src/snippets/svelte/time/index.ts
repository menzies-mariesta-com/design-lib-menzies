import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import { daisyTime } from '../../../components/daisyUiPasteMarkup'
import timeSvelte from './TimeClockDial.svelte?raw'
import timePage from './+page.svelte?raw'

export const timeSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'TimeClockDial.svelte', code: timeSvelte },
  { name: '+page.svelte', code: timePage },
])

export const timeHtml = daisyTime(false)
export const timeJsx = daisyTime(true)
