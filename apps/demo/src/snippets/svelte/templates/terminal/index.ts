import type { ShowcaseSvelteFile } from '../../../../components/showcaseTypes'
import { kitFiles } from '../../../../components/kitFiles'
import term from './TerminalLog.svelte?raw'
import page from './+page.svelte?raw'

export const terminalSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'TerminalLog.svelte', code: term },
  { name: '+page.svelte', code: page },
])

export const terminalHtml = `<div class="rounded-box bg-base-200/50 p-4 sm:p-6">
  <div class="flex min-h-[280px] w-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
    <header class="flex shrink-0 flex-wrap items-center gap-3 border-b border-base-300 bg-base-200/70 px-3 py-2.5 sm:px-4">
      <div class="flex min-w-0 flex-1 items-center gap-2">
        <h2 class="truncate font-display text-sm font-semibold sm:text-base">Studio terminal</h2>
        <span class="flex items-center gap-1.5 text-xs text-ink-muted">
          <span class="status status-xs status-success" aria-hidden="true"></span>
          Live
        </span>
      </div>
      <div class="flex flex-wrap items-center gap-1">
        <button type="button" class="btn btn-ghost btn-xs cursor-pointer gap-1" aria-label="Clear log">Clear</button>
        <button type="button" class="btn btn-ghost btn-xs cursor-pointer gap-1" aria-label="Pause stream">Pause</button>
        <button type="button" class="btn btn-ghost btn-xs cursor-pointer gap-1" aria-label="Copy log">Copy</button>
      </div>
    </header>
    <div class="flex shrink-0 flex-wrap gap-1.5 border-b border-base-300 bg-base-200/40 px-3 py-2 sm:px-4">
      <button type="button" class="btn btn-primary btn-xs cursor-pointer capitalize">All</button>
      <button type="button" class="btn btn-ghost btn-xs cursor-pointer capitalize">info</button>
      <button type="button" class="btn btn-ghost btn-xs cursor-pointer capitalize">success</button>
      <button type="button" class="btn btn-ghost btn-xs cursor-pointer capitalize">warn</button>
      <button type="button" class="btn btn-ghost btn-xs cursor-pointer capitalize">error</button>
    </div>
    <div class="min-h-0 flex-1 overflow-auto bg-neutral px-3 py-3 font-mono text-xs leading-relaxed text-neutral-content sm:px-4 sm:text-sm" role="log" aria-live="polite" aria-relevant="additions">
      <div class="flex flex-wrap gap-x-2 gap-y-0.5 py-0.5">
        <span class="shrink-0 text-neutral-content/50">Aug 1, 16:02</span>
        <span class="shrink-0 uppercase text-info">info</span>
        <span class="min-w-0 break-words">Starting studio build for wash-demo…</span>
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-0.5 py-0.5">
        <span class="shrink-0 text-neutral-content/50">Aug 1, 16:02</span>
        <span class="shrink-0 uppercase text-info">info</span>
        <span class="min-w-0 break-words">Resolving pigment tokens from @menzies/design-wash-ui</span>
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-0.5 py-0.5">
        <span class="shrink-0 text-neutral-content/50">Aug 1, 16:03</span>
        <span class="shrink-0 uppercase text-success">success</span>
        <span class="min-w-0 break-words">Pigment mix complete: ultramarine, ochre, rose</span>
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-0.5 py-0.5">
        <span class="shrink-0 text-neutral-content/50">Aug 1, 16:04</span>
        <span class="shrink-0 uppercase text-warning">warn</span>
        <span class="min-w-0 break-words">Plate #1842 dry time extended (+12s humidity offset)</span>
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-0.5 py-0.5">
        <span class="shrink-0 text-neutral-content/50">Aug 1, 16:06</span>
        <span class="shrink-0 uppercase text-error">error</span>
        <span class="min-w-0 break-words">Thumbnail export failed: missing og-image asset</span>
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-0.5 py-0.5">
        <span class="shrink-0 text-neutral-content/50">Aug 1, 16:07</span>
        <span class="shrink-0 uppercase text-success">success</span>
        <span class="min-w-0 break-words">Preview URL ready: https://studio.menzies.design/preview/1842</span>
      </div>
    </div>
  </div>
</div>`

export const terminalJsx = terminalHtml.replace(/class=/g, 'className=')
