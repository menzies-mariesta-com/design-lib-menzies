import type { ShowcaseSvelteFile } from '../../../../components/showcaseTypes'
import { kitFiles } from '../../../../components/kitFiles'
import shell from './CodeEditorShell.svelte?raw'
import page from './+page.svelte?raw'

export const codeEditorSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'CodeEditorShell.svelte', code: shell },
  { name: '+page.svelte', code: page },
])

export const codeEditorHtml = `<div class="wash-code-editor overflow-hidden rounded-box border border-ink-border bg-base-100 shadow-[var(--shadow-paper-sm)]" style="min-height:22rem">
  <div class="wash-code-titlebar flex flex-wrap items-center gap-2 border-b border-base-300 bg-base-200 px-3 py-2">
    <div class="wash-code-dots flex gap-1" aria-hidden="true">
      <span class="size-2.5 rounded-full bg-error/70"></span>
      <span class="size-2.5 rounded-full bg-warning/70"></span>
      <span class="size-2.5 rounded-full bg-success/70"></span>
    </div>
    <div class="wash-code-tabs flex min-w-0 flex-1 flex-wrap gap-1" role="tablist">
      <button type="button" role="tab" aria-selected="true" class="wash-code-tab btn btn-ghost btn-xs cursor-pointer" data-active="true">app.ts</button>
      <button type="button" role="tab" aria-selected="false" class="wash-code-tab btn btn-ghost btn-xs cursor-pointer" data-active="false">theme.json</button>
      <button type="button" role="tab" aria-selected="false" class="wash-code-tab btn btn-ghost btn-xs cursor-pointer" data-active="false">NOTES.md</button>
    </div>
    <div class="wash-code-lang-select">
      <select class="select select-xs select-bordered cursor-pointer" aria-label="Language">
        <option selected>TypeScript</option>
        <option>JSON</option>
        <option>Markdown</option>
      </select>
    </div>
  </div>
  <div class="wash-code-body flex min-h-[16rem]">
    <div class="wash-code-gutter select-none border-e border-base-300 bg-base-200/50 px-2 py-3 text-right font-mono text-xs text-ink-muted" aria-hidden="true">
      <div class="wash-code-gutter-line">1</div>
      <div class="wash-code-gutter-line">2</div>
      <div class="wash-code-gutter-line">3</div>
      <div class="wash-code-gutter-line">4</div>
      <div class="wash-code-gutter-line">5</div>
    </div>
    <pre class="wash-code-pane min-h-0 flex-1 overflow-auto p-3 font-mono text-sm leading-relaxed"><code>import { initWash } from '@menzies-mariesta-com/menzies-design-wash-ui/brand'

export function boot(): boolean {
  initWash({ pigment: 'mineral', mode: 'light' })
  return true
}</code></pre>
  </div>
  <div class="wash-code-statusbar flex items-center justify-between border-t border-base-300 bg-base-200/60 px-3 py-1.5 font-mono text-[0.65rem] text-ink-muted">
    <span>Ln 1, Col 1</span>
    <span class="uppercase">typescript</span>
  </div>
</div>`

export const codeEditorJsx = codeEditorHtml
  .replace(/class=/g, 'className=')
  .replace(
    '<select className="select select-xs select-bordered cursor-pointer" aria-label="Language">\n        <option selected>TypeScript</option>',
    '<select className="select select-xs select-bordered cursor-pointer" aria-label="Language" defaultValue="TypeScript">\n        <option>TypeScript</option>',
  )
