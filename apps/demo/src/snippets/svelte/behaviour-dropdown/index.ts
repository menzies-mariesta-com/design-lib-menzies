import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import dropdownSvelte from './SmartDetailsDropdown.svelte?raw'
import page from './+page.svelte?raw'

export const behaviourDropdownSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'SmartDetailsDropdown.svelte', code: dropdownSvelte },
  { name: '+page.svelte', code: page },
])

/** Space-aware details.dropdown (auto placement pages). */
export const behaviourDropdownHtml = `<details class="dropdown">
  <summary class="btn cursor-pointer border-ink-border [&::-webkit-details-marker]:hidden">Pigment menu</summary>
  <div class="dropdown-content z-50 mt-1 min-w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <ul class="menu p-0">
      <li><button type="button" class="cursor-pointer">Ultramarine</button></li>
      <li><button type="button" class="cursor-pointer">Viridian</button></li>
      <li><button type="button" class="cursor-pointer">Ochre</button></li>
    </ul>
  </div>
</details>`

export const behaviourDropdownJsx = `<details className="dropdown">
  <summary className="btn cursor-pointer border-ink-border [&::-webkit-details-marker]:hidden">Pigment menu</summary>
  <div className="dropdown-content z-50 mt-1 min-w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <ul className="menu p-0">
      <li><button type="button" className="cursor-pointer">Ultramarine</button></li>
      <li><button type="button" className="cursor-pointer">Viridian</button></li>
      <li><button type="button" className="cursor-pointer">Ochre</button></li>
    </ul>
  </div>
</details>`

/** Focus/hover menu markup for Dropdown on hover gallery. */
export const behaviourDropdownHoverHtml = `<div class="dropdown">
  <div tabindex="0" role="button" class="btn cursor-pointer border-ink-border">
    Hover me
  </div>
  <ul tabindex="-1" class="menu dropdown-content z-50 mt-1 w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <li><button type="button" class="cursor-pointer">Ultramarine</button></li>
    <li><button type="button" class="cursor-pointer">Yellow ochre</button></li>
    <li><button type="button" class="cursor-pointer">Viridian</button></li>
  </ul>
</div>`

export const behaviourDropdownHoverJsx = `<div className="dropdown">
  <div tabIndex={0} role="button" className="btn cursor-pointer border-ink-border">
    Hover me
  </div>
  <ul tabIndex={-1} className="menu dropdown-content z-50 mt-1 w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <li><button type="button" className="cursor-pointer">Ultramarine</button></li>
    <li><button type="button" className="cursor-pointer">Yellow ochre</button></li>
    <li><button type="button" className="cursor-pointer">Viridian</button></li>
  </ul>
</div>`

export const behaviourDropdownNoHoverHtml = `<div class="dropdown dropdown-no-hover">
  <div tabindex="0" role="button" class="btn cursor-pointer border-ink-border">
    Focus / click only
  </div>
  <ul tabindex="-1" class="menu dropdown-content z-50 mt-1 w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <li><button type="button" class="cursor-pointer">Still opens on focus</button></li>
  </ul>
</div>`

export const behaviourDropdownNoHoverJsx = `<div className="dropdown dropdown-no-hover">
  <div tabIndex={0} role="button" className="btn cursor-pointer border-ink-border">
    Focus / click only
  </div>
  <ul tabIndex={-1} className="menu dropdown-content z-50 mt-1 w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <li><button type="button" className="cursor-pointer">Still opens on focus</button></li>
  </ul>
</div>`
