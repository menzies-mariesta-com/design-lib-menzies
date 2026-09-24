import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import panel from './FloatingPanel.svelte?raw'
import page from './+page.svelte?raw'

export const floatingPanelSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'FloatingPanel.svelte', code: panel },
  { name: '+page.svelte', code: page },
])

const frame =
  'relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 sm:h-80'

const canvas = `<div class="pointer-events-none absolute inset-0 p-4 sm:p-6">
    <div class="h-full rounded-box border border-dashed border-ink-border/50 bg-base-100/40 p-4">
      <p class="label-ink">Canvas</p>
      <p class="mt-2 max-w-xs text-sm text-ink-muted">Sketch area behind a wash panel.</p>
    </div>
  </div>`

const closeBtn = `<div class="tooltip tooltip-left tooltip-error" data-tip="Close">
          <button type="button" class="btn btn-ghost btn-square btn-error btn-xs cursor-pointer" aria-label="Close">✕</button>
        </div>`

function panelChrome(
  title: string,
  body: string,
  opts: {
    left?: number
    top?: number
    width?: number
    height?: number
    z?: number
    panelClass?: string
    actions?: string
    grab?: boolean
  } = {},
): string {
  const left = opts.left ?? 16
  const top = opts.top ?? 16
  const width = opts.width ?? 260
  const height = opts.height ?? 168
  const z = opts.z ?? 20
  const panelClass = opts.panelClass ? ` ${opts.panelClass}` : ''
  const grab = opts.grab !== false
  const titleCursor = grab
    ? 'cursor-grab active:cursor-grabbing'
    : ''
  const actions = opts.actions ?? ''
  return `<div class="floating-panel absolute flex flex-col overflow-hidden shadow-lg outline-none" style="left:${left}px;top:${top}px;width:${width}px;height:${height}px;z-index:${z}" role="dialog" aria-label="${title}">
  <div class="wash-panel paper-grain flex h-full min-h-0 w-full flex-col overflow-hidden${panelClass}">
    <div class="flex shrink-0 items-center gap-1 border-b border-ink-border/70 px-2 py-1.5 select-none ${titleCursor}">
      <p class="min-w-0 flex-1 truncate px-1 text-sm font-semibold">${title}</p>
      <div class="flex shrink-0 items-center gap-0.5" data-no-drag>
        ${actions}${closeBtn}
      </div>
    </div>
    <div class="min-h-0 flex-1 overflow-auto p-3 text-sm" data-no-drag>
      ${body}
    </div>
  </div>
</div>`
}

export const floatingPanelBasicHtml = `<div class="${frame}">
  ${canvas}
  ${panelChrome(
    'Notes',
    `<p class="text-ink-muted">Absolute within the frame. Soft wash edge, no modal lock.</p>
      <p class="mt-2 text-xs text-ink-muted">Esc closes this panel. Drag and resize are off for the basic demo.</p>`,
    { left: 48, top: 16, width: 260, height: 168, grab: false },
  )}
</div>`

export const floatingPanelDragHtml = `<div class="${frame}">
  ${canvas}
  ${panelChrome(
    'Studio float',
    `<p class="text-ink-muted">Title bar uses <span class="font-mono text-xs">cursor-grab</span> / <span class="font-mono text-xs">cursor-grabbing</span>.</p>
      <p class="mt-2 text-xs text-ink-muted">Reset restores the default rect. Esc closes.</p>
      <p class="mt-2 font-mono text-xs text-ink-muted">x:24 y:24 w:300 h:220</p>`,
    {
      left: 24,
      top: 24,
      width: 300,
      height: 220,
      actions: `<div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Reset position">
          <button type="button" class="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer" aria-label="Reset position">↺</button>
        </div>`,
    },
  )}
</div>`

export const floatingPanelActionsHtml = `<div class="${frame}">
  ${canvas}
  ${panelChrome(
    'Wash tools',
    `<ul class="space-y-1.5 text-ink-muted">
        <li class="flex items-center justify-between gap-2"><span>Pinned</span><span class="font-mono text-xs">yes</span></li>
        <li class="flex items-center justify-between gap-2"><span>Preview</span><span class="font-mono text-xs">on</span></li>
      </ul>`,
    {
      left: 16,
      top: 16,
      width: 280,
      height: 200,
      actions: `<div class="tooltip tooltip-bottom tooltip-primary" data-tip="Unpin">
          <button type="button" class="btn btn-ghost btn-square btn-primary btn-xs cursor-pointer" aria-label="Unpin" aria-pressed="true">Pin</button>
        </div>
        <div class="tooltip tooltip-bottom tooltip-primary" data-tip="Hide">
          <button type="button" class="btn btn-ghost btn-square btn-primary btn-xs cursor-pointer" aria-label="Hide" aria-pressed="true">Eye</button>
        </div>
        <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="More">
          <button type="button" class="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer" aria-label="More">⋯</button>
        </div>
        <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Reset position">
          <button type="button" class="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer" aria-label="Reset position">↺</button>
        </div>`,
    },
  )}
</div>`

export const floatingPanelAnchoredHtml = `<div class="${frame} flex items-center justify-center">
  <div class="relative">
    <button type="button" class="btn btn-primary cursor-pointer gap-2" aria-expanded="true" aria-haspopup="dialog">Pigment tip</button>
    <div class="absolute left-1/2 top-full z-20 mt-2 w-[min(calc(100vw-3rem),16rem)] -translate-x-1/2 sm:left-full sm:top-0 sm:mt-0 sm:ml-3 sm:translate-x-0" role="dialog" aria-label="Pigment tip">
      <div class="wash-panel wash-panel-ochre paper-grain shadow-lg">
        <div class="flex items-center justify-between border-b border-ink-border/70 px-3 py-2">
          <p class="text-sm font-semibold">Cadmium note</p>
          <div class="tooltip tooltip-left tooltip-error" data-tip="Close">
            <button type="button" class="btn btn-ghost btn-square btn-error btn-xs cursor-pointer" aria-label="Close">✕</button>
          </div>
        </div>
        <p class="p-3 text-sm text-ink-muted">Anchored beside the trigger on larger screens; stacks under the button on narrow frames. Esc or outside click dismisses.</p>
      </div>
    </div>
  </div>
</div>`

export const floatingPanelStudioHtml = `<div class="${frame} sm:h-96">
  ${canvas}
  ${panelChrome(
    'Layer properties',
    `<div class="space-y-3">
        <div class="flex items-center gap-1.5 text-ink-muted">
          <span class="text-xs">Menzies Design layer sheet</span>
        </div>
        <label class="form-control w-full">
          <span class="label-text mb-1 text-xs">Name</span>
          <input class="input input-sm input-bordered w-full cursor-text" value="Wash · ultramarine" />
        </label>
        <label class="form-control w-full">
          <div class="mb-1 flex items-center justify-between">
            <span class="label-text text-xs">Opacity</span>
            <span class="font-mono text-xs text-ink-muted">72%</span>
          </div>
          <input type="range" min="0" max="100" value="72" class="range range-xs range-primary cursor-pointer" aria-label="Opacity" />
        </label>
        <label class="form-control w-full">
          <span class="label-text mb-1 text-xs">Blend</span>
          <select class="select select-sm select-bordered w-full cursor-pointer">
            <option value="normal">Normal</option>
            <option value="multiply" selected>Multiply</option>
            <option value="screen">Screen</option>
            <option value="overlay">Overlay</option>
          </select>
        </label>
        <div class="flex items-center gap-2">
          <span class="size-8 rounded-box border border-ink-border bg-wash-blue" style="opacity:0.72" aria-hidden="true"></span>
          <p class="text-xs text-ink-muted">Live glaze preview for the active wash layer.</p>
        </div>
      </div>`,
    {
      left: 40,
      top: 48,
      width: 280,
      height: 300,
      panelClass: 'wash-panel-rose',
      actions: `<div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Settings">
          <button type="button" class="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer" aria-label="Settings">⚙</button>
        </div>
        <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Lock">
          <button type="button" class="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer" aria-label="Lock" aria-pressed="false">Lock</button>
        </div>
        <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Reset position">
          <button type="button" class="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer" aria-label="Reset position">↺</button>
        </div>`,
    },
  )}
</div>`

export const floatingPanelStackHtml = `<div class="${frame}">
  ${canvas}
  ${panelChrome('Notes', '<p class="text-xs text-ink-muted">z-10</p>', {
    left: 12,
    top: 12,
    width: 200,
    height: 140,
    z: 10,
  })}
  ${panelChrome('Layers', '<p class="text-xs text-ink-muted">z-11</p>', {
    left: 64,
    top: 48,
    width: 220,
    height: 150,
    z: 11,
    panelClass: 'wash-panel-ochre',
  })}
  ${panelChrome('Reference', '<p class="text-xs text-ink-muted">z-12</p>', {
    left: 120,
    top: 96,
    width: 200,
    height: 140,
    z: 12,
    panelClass: 'wash-panel-rose',
  })}
</div>`

export const floatingPanelResponsiveHtml = `<div class="${frame} sm:h-96">
  ${canvas}
  ${panelChrome(
    'Responsive panel',
    `<p class="text-ink-muted">Desktop: corner float with drag and resize. Expand reveals extra fields.</p>`,
    {
      left: 200,
      top: 80,
      width: 240,
      height: 160,
      actions: `<div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Expand">
          <button type="button" class="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer" aria-label="Expand">⛶</button>
        </div>
        <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Reset position">
          <button type="button" class="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer" aria-label="Reset position">↺</button>
        </div>`,
    },
  )}
</div>`

/** @deprecated Prefer section-specific exports; kept for any leftover imports. */
export const floatingPanelHtml = floatingPanelBasicHtml

export const floatingPanelJsx = floatingPanelHtml.replace(/class=/g, 'className=')
