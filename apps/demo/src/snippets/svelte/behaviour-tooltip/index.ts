import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import { daisyTooltip } from '../../../components/daisyUiPasteMarkup'
import smartTooltip from './SmartTooltip.svelte?raw'
import page from './+page.svelte?raw'

export const behaviourTooltipSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'SmartTooltip.svelte', code: smartTooltip },
  { name: '+page.svelte', code: page },
])

export const behaviourTooltipHtml = daisyTooltip(false)
export const behaviourTooltipJsx = daisyTooltip(true)
