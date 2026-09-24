import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import { daisyMarquee } from '../../../components/daisyUiPasteMarkup'
import marquee from './OverflowMarquee.svelte?raw'
import page from './+page.svelte?raw'

export const behaviourMarqueeSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'OverflowMarquee.svelte', code: marquee },
  { name: '+page.svelte', code: page },
])

export const behaviourMarqueeHtml = daisyMarquee(false)
export const behaviourMarqueeJsx = daisyMarquee(true)
