import type { ShowcaseSvelteFile } from '../../../../components/showcaseTypes'
import { kitFiles } from '../../../../components/kitFiles'
import editor from './RichTextEditor.svelte?raw'
import page from './+page.svelte?raw'

export const richTextSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'RichTextEditor.svelte', code: editor },
  { name: '+page.svelte', code: page },
])

export const richTextHtml = `<div class="wash-rte overflow-hidden rounded-box border border-ink-border bg-base-100 shadow-[var(--shadow-paper-sm)]">
  <div class="wash-rte-toolbar flex flex-wrap gap-1 border-b border-base-300 bg-base-200 p-2" role="toolbar" aria-label="Rich text formatting">
    <div class="join">
      <button type="button" class="btn btn-ghost btn-square btn-xs join-item cursor-pointer" aria-label="Undo">↶</button>
      <button type="button" class="btn btn-ghost btn-square btn-xs join-item cursor-pointer" aria-label="Redo">↷</button>
    </div>
    <div class="join">
      <button type="button" class="btn btn-ghost btn-square btn-xs join-item cursor-pointer" aria-label="Bold"><strong>B</strong></button>
      <button type="button" class="btn btn-ghost btn-square btn-xs join-item cursor-pointer" aria-label="Italic"><em>I</em></button>
      <button type="button" class="btn btn-ghost btn-square btn-xs join-item cursor-pointer" aria-label="Underline"><span class="underline">U</span></button>
      <button type="button" class="btn btn-ghost btn-square btn-xs join-item cursor-pointer" aria-label="Strikethrough"><span class="line-through">S</span></button>
    </div>
    <div class="join">
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Paragraph">P</button>
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Heading 1">H1</button>
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Heading 2">H2</button>
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Heading 3">H3</button>
    </div>
    <div class="join">
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Bullet list">• List</button>
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Numbered list">1. List</button>
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Blockquote">Quote</button>
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Horizontal rule">HR</button>
    </div>
    <div class="join">
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Insert link">Link</button>
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Remove link">Unlink</button>
      <button type="button" class="btn btn-ghost btn-xs join-item cursor-pointer" aria-label="Clear formatting">Clear</button>
    </div>
  </div>
  <div class="wash-rte-surface min-h-[22rem] cursor-text p-4 prose max-w-none" contenteditable="true" role="textbox" aria-multiline="true" aria-label="Rich text">
    <h1>Rich text</h1>
    <p>Draft product copy with toolbar formatting, lists, and links.</p>
    <p>Wash rich text is <em>from-scratch</em>: contenteditable chrome and paste sanitize, not TipTap or Lexical.</p>
  </div>
</div>`

export const richTextJsx = richTextHtml.replace(/class=/g, 'className=')
