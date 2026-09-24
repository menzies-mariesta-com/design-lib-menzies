import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import bg from './WashBackground.svelte?raw'
import page from './+page.svelte?raw'

export const backgroundSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'WashBackground.svelte', code: bg },
  { name: '+page.svelte', code: page },
])

export const backgroundWithGrainHtml = `<div class="page-wash paper-grain flex min-h-56 items-end overflow-hidden rounded-box border border-ink-border p-5">
  <div>
    <p class="font-display text-lg font-semibold">Studio paper</p>
    <p class="mt-1 text-sm text-ink-muted">Wash A / B / C blooms over base-100.</p>
  </div>
</div>`

export const backgroundFlatHtml = `<div class="page-wash flex min-h-56 items-end overflow-hidden rounded-box border border-ink-border p-5">
  <div>
    <p class="font-display text-lg font-semibold">Flat pigment</p>
    <p class="mt-1 text-sm text-ink-muted">Same washes, no paper-grain overlay.</p>
  </div>
</div>`

/** @deprecated Prefer section-specific html; kept for any leftover imports. */
export const backgroundHtml = backgroundWithGrainHtml
export const backgroundJsx = backgroundWithGrainHtml.replace(/class=/g, 'className=')
