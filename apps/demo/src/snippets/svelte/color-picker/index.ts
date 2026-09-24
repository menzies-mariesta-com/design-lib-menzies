import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import wheel from './ColorPickerWheel.svelte?raw'
import page from './+page.svelte?raw'

export const colorPickerSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'ColorPickerWheel.svelte', code: wheel },
  { name: '+page.svelte', code: page },
])

/** Static class markup mirroring the gallery full + compact layouts (no Wash props). */
export const colorPickerHtml = `<div class="grid gap-6 lg:grid-cols-2">
  <div class="rounded-box border border-ink-border/70 bg-base-100/70 p-4">
    <p class="mb-3 text-xs font-medium uppercase tracking-wide text-ink-muted">Full picker</p>
    <div class="inline-flex max-w-full flex-col items-center gap-2">
      <div
        role="group"
        aria-label="Full color picker"
        tabindex="0"
        class="relative size-[220px] touch-none select-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
      >
        <div
          class="block size-full rounded-full border border-ink-border/70 bg-base-100 shadow-sm"
          style="background: conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);"
          aria-hidden="true"
        ></div>
        <div
          class="pointer-events-none absolute left-1/2 top-1/2 size-[140px] -translate-x-1/2 -translate-y-1/2 rounded-box border border-ink-border/80 shadow-inner"
          style="background: linear-gradient(to bottom, #fff, transparent), linear-gradient(to right, #000, #276c8e);"
          aria-hidden="true"
        ></div>
        <span
          class="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-base-100 shadow"
          style="left:78%;top:28%;background:#276c8e"
          aria-hidden="true"
        ></span>
      </div>
      <div class="flex w-full max-w-xs items-center gap-2">
        <span class="size-9 shrink-0 rounded-box border border-ink-border shadow-sm" style="background:#276c8e" aria-hidden="true"></span>
        <input
          type="text"
          class="input input-bordered input-sm w-full font-mono cursor-text"
          value="#276c8e"
          aria-label="Hex color value"
        />
      </div>
    </div>
  </div>
  <div class="rounded-box border border-ink-border/70 bg-base-100/70 p-4">
    <p class="mb-3 text-xs font-medium uppercase tracking-wide text-ink-muted">Compact (paint splash layout)</p>
    <div class="flex flex-wrap items-end gap-4">
      <div
        role="group"
        aria-label="Compact splash color"
        tabindex="0"
        class="relative size-[140px] touch-none select-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div
          class="block size-full rounded-full border border-ink-border/70 bg-base-100 shadow-sm"
          style="background: conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);"
          aria-hidden="true"
        ></div>
        <div
          class="pointer-events-none absolute left-1/2 top-1/2 size-[88px] -translate-x-1/2 -translate-y-1/2 rounded-box border border-ink-border/80 shadow-inner"
          style="background: linear-gradient(to bottom, #fff, transparent), linear-gradient(to right, #000, #b87524);"
          aria-hidden="true"
        ></div>
      </div>
      <label class="form-control min-w-[8rem] flex-1 cursor-default" for="compact-hex">
        <span class="label py-1"><span class="label-text text-sm">Hex</span></span>
        <input
          id="compact-hex"
          type="text"
          class="input input-bordered input-sm w-full font-mono cursor-text"
          value="#b87524"
          aria-label="Hex"
        />
      </label>
      <span class="size-10 shrink-0 rounded-box border border-ink-border shadow-sm" style="background:#b87524" aria-hidden="true"></span>
    </div>
  </div>
</div>`

export const colorPickerJsx = colorPickerHtml
  .replace(/class=/g, 'className=')
  .replace(/tabindex=/g, 'tabIndex=')
  .replace(/\sfor=/g, ' htmlFor=')
  .replace(/tabIndex="(\d+)"/g, 'tabIndex={$1}')
