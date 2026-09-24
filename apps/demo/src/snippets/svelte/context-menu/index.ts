import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import panel from './ContextMenu.svelte?raw'
import page from './+page.svelte?raw'

export const contextMenuSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'ContextMenu.svelte', code: panel },
  { name: '+page.svelte', code: page },
])

/** Surface only: menu is portaled on open (do not dump always-visible menus). */
export const basicHtml = `<div class="flex flex-col gap-3">
  <div role="application" tabindex="0" class="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-base-200/30 px-4 py-8 text-center outline-none focus-visible:dry-brush" aria-label="Right-click or long-press for basic context menu">
    <p class="text-sm font-medium">Right-click this surface</p>
    <p class="mt-1 text-xs text-ink-muted">Touch: long-press. Keyboard: Shift+F10 when focused.</p>
  </div>
  <p class="text-sm text-ink-muted">Last action: <span class="font-medium text-base-content">None yet</span></p>
  <!-- Menu is portaled to body when open: menu menu-sm fixed z-[80] … -->
</div>`

export const basicJsx = basicHtml
  .replace(/class=/g, 'className=')
  .replace(/tabindex=/g, 'tabIndex=')
  .replace(/<!--[\s\S]*?-->/g, '')

export const iconsHtml = `<div class="flex flex-col gap-3">
  <div role="application" tabindex="0" class="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-wash-blue/20 px-4 py-8 text-center outline-none focus-visible:dry-brush" aria-label="Right-click for icons and shortcuts context menu">
    <p class="text-sm font-medium">Brush plate</p>
    <p class="mt-1 text-xs text-ink-muted">Icons and kbd hints in the menu</p>
  </div>
  <p class="text-sm text-ink-muted">Last action: <span class="font-medium text-base-content">None yet</span></p>
</div>`

export const iconsJsx = iconsHtml
  .replace(/class=/g, 'className=')
  .replace(/tabindex=/g, 'tabIndex=')

export const nestedHtml = `<div class="flex flex-col gap-3">
  <div role="application" tabindex="0" class="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-wash-rose/15 px-4 py-8 text-center outline-none focus-visible:dry-brush" aria-label="Right-click for nested and destructive context menu">
    <p class="text-sm font-medium">Layer stack target</p>
    <p class="mt-1 text-xs text-ink-muted">Nested Export, plus Delete in error color</p>
  </div>
  <p class="text-sm text-ink-muted">Last action: <span class="font-medium text-base-content">None yet</span></p>
</div>`

export const nestedJsx = nestedHtml
  .replace(/class=/g, 'className=')
  .replace(/tabindex=/g, 'tabIndex=')

export const studioHtml = `<div class="flex flex-col gap-3">
  <div role="application" tabindex="0" class="wash-panel wash-panel-blue relative flex min-h-44 cursor-context-menu flex-col justify-between overflow-hidden outline-none focus-visible:dry-brush" aria-label="Right-click wash plate for studio actions">
    <div>
      <p class="label-ink">Wash plate</p>
      <h3 class="font-display mt-1 text-xl font-semibold">Cerulean field</h3>
      <p class="mt-1 text-sm text-ink-muted">Right-click or long-press for Duplicate, Lock, Delete wash.</p>
    </div>
    <span class="badge badge-sm border-ink-border bg-base-100/60">Editable</span>
  </div>
  <p class="text-sm text-ink-muted">No studio action yet.</p>
</div>`

export const studioJsx = studioHtml
  .replace(/class=/g, 'className=')
  .replace(/tabindex=/g, 'tabIndex=')

export const keyboardHtml = `<ul class="list-inside list-disc space-y-2 text-sm text-ink-muted">
  <li><span class="font-medium text-base-content">Escape</span> closes the open menu and clears nested state.</li>
  <li><span class="font-medium text-base-content">Outside click</span> (pointerdown outside the menu) closes it.</li>
  <li><span class="font-medium text-base-content">Shift+F10</span> or the ContextMenu key opens when the surface is focused.</li>
  <li>Listeners for dismiss are attached only while open and removed on unmount.</li>
</ul>`

export const keyboardJsx = keyboardHtml.replace(/class=/g, 'className=')

export const responsiveHtml = `<div class="grid gap-3 sm:grid-cols-2">
  <div class="rounded-box border border-ink-border/60 bg-base-200/30 p-4">
    <p class="label-ink">Desktop</p>
    <p class="mt-2 text-sm text-ink-muted">Right-click or Shift+F10 on a focused target.</p>
  </div>
  <div class="rounded-box border border-ink-border/60 bg-base-200/30 p-4">
    <p class="label-ink">Touch</p>
    <p class="mt-2 text-sm text-ink-muted">Long-press the surface. Drag cancels before the menu opens.</p>
  </div>
</div>`

export const responsiveJsx = responsiveHtml.replace(/class=/g, 'className=')
