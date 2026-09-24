import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  AppWindow,
  Brush,
  Calendar,
  Droplets,
  Eraser,
  Layers,
  Paintbrush,
  Palette,
  Pencil,
  SquareStack,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

function toJsxMarkup(html: string): string {
  return daisyToJsx(html)
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/popovertarget=/gi, 'popoverTarget=')
}

const basicHtml = `<div class="rounded-box border border-ink-border/60 bg-base-200/20 p-3 sm:p-4">
  <button type="button" class="btn btn-sm cursor-pointer sm:hidden" popovertarget="mm-basic">Menu</button>
  <div class="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2" id="mm-basic" popover="auto">
    <span class="megamenu-active"></span>
    <button type="button" class="cursor-pointer" popovertarget="mm-basic-pigments">Pigments</button>
    <div id="mm-basic-pigments" popover="auto">
      <div class="flex max-sm:flex-col items-start">
        <ul class="menu w-full md:menu-horizontal">
          <li><a href="#megamenu-demo" class="cursor-pointer">Blues</a><ul><li><a href="#megamenu-demo" class="cursor-pointer">Ultramarine</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Cerulean</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Indigo</a></li></ul></li>
          <li><a href="#megamenu-demo" class="cursor-pointer">Earths</a><ul><li><a href="#megamenu-demo" class="cursor-pointer">Yellow ochre</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Burnt sienna</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Raw umber</a></li></ul></li>
          <li><a href="#megamenu-demo" class="cursor-pointer">Reds</a><ul><li><a href="#megamenu-demo" class="cursor-pointer">Alizarin</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Cadmium red</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Rose madder</a></li></ul></li>
        </ul>
      </div>
    </div>
    <button type="button" class="cursor-pointer" popovertarget="mm-basic-tools">Tools</button>
    <div id="mm-basic-tools" popover="auto">
      <div class="flex max-sm:flex-col items-start">
        <ul class="menu w-full md:menu-horizontal">
          <li><a href="#megamenu-demo" class="cursor-pointer">Brushes</a><ul><li><a href="#megamenu-demo" class="cursor-pointer">Round 6</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Flat 12</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Rigger</a></li></ul></li>
          <li><a href="#megamenu-demo" class="cursor-pointer">Paper</a><ul><li><a href="#megamenu-demo" class="cursor-pointer">Cold press</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Hot press</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Rough</a></li></ul></li>
        </ul>
      </div>
    </div>
    <button type="button" class="cursor-pointer" popovertarget="mm-basic-series">Series</button>
    <div id="mm-basic-series" popover="auto">
      <ul class="menu"><li><a href="#megamenu-demo" class="cursor-pointer">Harbor light</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Mist meadow</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Ink study</a></li></ul>
    </div>
  </div>
</div>
<div class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">megamenu megamenu-wide max-sm:megamenu-vertical</code></div>`

const iconsHtml = `<div class="rounded-box border border-ink-border/60 bg-base-200/20 p-3 sm:p-4">
  <button type="button" class="btn btn-sm cursor-pointer sm:hidden" popovertarget="mm-icons">Menu</button>
  <div class="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2" id="mm-icons" popover="auto">
    <span class="megamenu-active"></span>
    <button type="button" class="cursor-pointer" popovertarget="mm-icons-kit">Kit</button>
    <div id="mm-icons-kit" popover="auto">
      <ul class="menu w-full md:menu-horizontal">
        <li><span class="menu-title">Media</span>
          <ul>
            <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg> Round brush</a></li>
            <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg> Graphite pencil</a></li>
            <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg> Wash dropper</a></li>
            <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg> Kneaded eraser</a></li>
          </ul>
        </li>
        <li><span class="menu-title">Surface</span>
          <ul>
            <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> Palette plate</a></li>
            <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg> Layer stack</a></li>
            <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg> Dry brush</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <button type="button" class="cursor-pointer" popovertarget="mm-icons-desk">Desk</button>
    <div id="mm-icons-desk" popover="auto">
      <ul class="menu">
        <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> Studio calendar</a></li>
        <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><rect width="8" height="8" x="14" y="14" rx="2"/></svg> Component shelf</a></li>
        <li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/></svg> Dock preview</a></li>
      </ul>
    </div>
  </div>
</div>
<div class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">menu + Lucide size-4 in links</code></div>`

const studioHtml = `<div class="rounded-box border border-ink-border/60 bg-base-200/20 p-3 sm:p-4">
  <button type="button" class="btn btn-sm cursor-pointer sm:hidden" popovertarget="mm-studio">Menu</button>
  <div class="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2" id="mm-studio" popover="auto">
    <span class="megamenu-active"></span>
    <button type="button" class="cursor-pointer" popovertarget="mm-studio-explore">Explore</button>
    <div id="mm-studio-explore" popover="auto">
      <div class="flex max-sm:flex-col items-start">
        <ul class="menu w-full md:menu-horizontal">
          <li><ul><li class="menu-title">Palette</li><li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> Pigment chart</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Mix notes</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Swatch racks</a></li></ul></li>
          <li><ul><li class="menu-title">Layers</li><li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg> Wash stack</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Masking film</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Glaze order</a></li></ul></li>
          <li><ul><li class="menu-title">Brushes</li><li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg> Round set</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Flat wash</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Detail tips</a></li></ul></li>
          <li><ul><li class="menu-title">Calendar</li><li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> Session plan</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Drying windows</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Critique dates</a></li></ul></li>
          <li><ul><li class="menu-title">Components</li><li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><rect width="8" height="8" x="14" y="14" rx="2"/></svg> Gallery pages</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Form controls</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Feedback chrome</a></li></ul></li>
        </ul>
      </div>
    </div>
    <button type="button" class="cursor-pointer" popovertarget="mm-studio-guides">Guides</button>
    <div id="mm-studio-guides" popover="auto">
      <ul class="menu"><li><a href="#megamenu-demo" class="cursor-pointer">Wet on wet</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Dry brush edges</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Granulation tips</a></li></ul>
    </div>
  </div>
</div>
<div class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">menu-title columns: Palette, Layers, Brushes, Calendar, Components</code></div>`

const navHtml = `<div class="rounded-box border border-ink-border/60 bg-base-200/20 p-3 sm:p-4 overflow-visible">
  <div class="navbar rounded-box border border-ink-border/70 bg-base-100 px-2 shadow-sm sm:px-3">
    <div class="navbar-start">
      <a href="#megamenu-demo" class="btn btn-ghost cursor-pointer text-lg font-display">Menzies Design</a>
    </div>
    <div class="navbar-center hidden sm:flex">
      <div class="megamenu megamenu-full max-sm:megamenu-vertical p-1" id="mm-nav" popover="auto">
        <span class="megamenu-active"></span>
        <button type="button" class="cursor-pointer" popovertarget="mm-nav-studio">Studio</button>
        <div id="mm-nav-studio" popover="auto">
          <div class="flex max-sm:flex-col items-start">
            <ul class="menu w-full md:menu-horizontal">
              <li><a href="#megamenu-demo" class="cursor-pointer">Workspace</a><ul><li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> Palette</a></li><li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg> Layers</a></li><li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg> Brushes</a></li></ul></li>
              <li><a href="#megamenu-demo" class="cursor-pointer">Schedule</a><ul><li><a href="#megamenu-demo" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> Calendar</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Critiques</a></li></ul></li>
            </ul>
          </div>
        </div>
        <button type="button" class="cursor-pointer" popovertarget="mm-nav-library">Library</button>
        <div id="mm-nav-library" popover="auto">
          <ul class="menu"><li><a href="#megamenu-demo" class="cursor-pointer">Reference plates</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Wash recipes</a></li><li><a href="#megamenu-demo" class="cursor-pointer">Paper grades</a></li></ul>
        </div>
      </div>
    </div>
    <div class="navbar-end gap-1">
      <button type="button" class="btn btn-sm cursor-pointer hidden sm:inline-flex">Sign in</button>
      <button type="button" class="btn btn-sm cursor-pointer sm:hidden" popovertarget="mm-nav">Menu</button>
    </div>
  </div>
</div>
<div class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">navbar + megamenu megamenu-full</code></div>`

const responsiveHtml = `<ul class="list space-y-2 text-sm text-ink-muted">
  <li class="list-row items-start gap-3 px-0">
    <span class="font-mono text-[0.7rem] text-base-content">sm:hidden</span>
    <span>Show a single Menu button that targets the megamenu popover on phones.</span>
  </li>
  <li class="list-row items-start gap-3 px-0">
    <span class="font-mono text-[0.7rem] text-base-content">max-sm:megamenu-vertical</span>
    <span>Collapse the bar into a vertical sheet when the popover opens.</span>
  </li>
  <li class="list-row items-start gap-3 px-0">
    <span class="font-mono text-[0.7rem] text-base-content">max-sm:flex-col</span>
    <span>Stack multi-column panels so titles and links remain readable.</span>
  </li>
  <li class="list-row items-start gap-3 px-0">
    <span class="font-mono text-[0.7rem] text-base-content">popover</span>
    <span>Item panels use the Popover API, so outside click and Escape dismiss without sticky open classes.</span>
  </li>
</ul>
<div class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">responsive: button + max-sm:megamenu-vertical + stacked columns</code></div>`


function Section({
  eyebrow,
  title,
  description,
  children,
  panel = '',
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  panel?: string
}) {
  return (
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function DemoLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="#megamenu-demo"
      className="cursor-pointer"
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  )
}

function IconLink({
  icon: Icon,
  children,
}: {
  icon: typeof Palette
  children: ReactNode
}) {
  return (
    <a
      href="#megamenu-demo"
      className="cursor-pointer"
      onClick={(e) => e.preventDefault()}
    >
      <Icon className="size-4" strokeWidth={2} />
      {children}
    </a>
  )
}

const shell =
  'rounded-box border border-ink-border/60 bg-base-200/20 p-3 sm:p-4'

export default function MegamenuPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Megamenu
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">megamenu</span> panels: wide multi-column links, icons, Menzies Design studio columns.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Wide multi-column panel"
          description="megamenu-wide with nested menu columns"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={shell}>
                          <button
                            type="button"
                            className="btn btn-sm cursor-pointer sm:hidden"
                            popoverTarget="mm-basic"
                          >
                            Menu
                          </button>
                          <div
                            className="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
                            id="mm-basic"
                            popover="auto"
                          >
                            <span className="megamenu-active" />
                            <button type="button" className="cursor-pointer" popoverTarget="mm-basic-pigments">
                              Pigments
                            </button>
                            <div id="mm-basic-pigments" popover="auto">
                              <div className="flex max-sm:flex-col items-start">
                                <ul className="menu w-full md:menu-horizontal">
                                  <li>
                                    <DemoLink>Blues</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Ultramarine</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Cerulean</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Indigo</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <DemoLink>Earths</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Yellow ochre</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Burnt sienna</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Raw umber</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <DemoLink>Reds</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Alizarin</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Cadmium red</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Rose madder</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <button type="button" className="cursor-pointer" popoverTarget="mm-basic-tools">
                              Tools
                            </button>
                            <div id="mm-basic-tools" popover="auto">
                              <div className="flex max-sm:flex-col items-start">
                                <ul className="menu w-full md:menu-horizontal">
                                  <li>
                                    <DemoLink>Brushes</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Round 6</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Flat 12</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Rigger</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <DemoLink>Paper</DemoLink>
                                    <ul>
                                      <li>
                                        <DemoLink>Cold press</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Hot press</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Rough</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <button type="button" className="cursor-pointer" popoverTarget="mm-basic-series">
                              Series
                            </button>
                            <div id="mm-basic-series" popover="auto">
                              <ul className="menu">
                                <li>
                                  <DemoLink>Harbor light</DemoLink>
                                </li>
                                <li>
                                  <DemoLink>Mist meadow</DemoLink>
                                </li>
                                <li>
                                  <DemoLink>Ink study</DemoLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ClassLabel value="megamenu megamenu-wide max-sm:megamenu-vertical" />
                        </div>
            
              </>
            }
            html={basicHtml}
            jsx={toJsxMarkup(basicHtml)}
          />
        
        </Section>

        <Section
          eyebrow="02 · Icons"
          title="Lucide icons in link rows"
          description="Same megamenu structure with icons beside each link"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={shell}>
                          <button
                            type="button"
                            className="btn btn-sm cursor-pointer sm:hidden"
                            popoverTarget="mm-icons"
                          >
                            Menu
                          </button>
                          <div
                            className="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
                            id="mm-icons"
                            popover="auto"
                          >
                            <span className="megamenu-active" />
                            <button type="button" className="cursor-pointer" popoverTarget="mm-icons-kit">
                              Kit
                            </button>
                            <div id="mm-icons-kit" popover="auto">
                              <ul className="menu w-full md:menu-horizontal">
                                <li>
                                  <span className="menu-title">Media</span>
                                  <ul>
                                    <li>
                                      <IconLink icon={Paintbrush}>Round brush</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Pencil}>Graphite pencil</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Droplets}>Wash dropper</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Eraser}>Kneaded eraser</IconLink>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <span className="menu-title">Surface</span>
                                  <ul>
                                    <li>
                                      <IconLink icon={Palette}>Palette plate</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Layers}>Layer stack</IconLink>
                                    </li>
                                    <li>
                                      <IconLink icon={Brush}>Dry brush</IconLink>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>

                            <button type="button" className="cursor-pointer" popoverTarget="mm-icons-desk">
                              Desk
                            </button>
                            <div id="mm-icons-desk" popover="auto">
                              <ul className="menu">
                                <li>
                                  <IconLink icon={Calendar}>Studio calendar</IconLink>
                                </li>
                                <li>
                                  <IconLink icon={SquareStack}>Component shelf</IconLink>
                                </li>
                                <li>
                                  <IconLink icon={AppWindow}>Dock preview</IconLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ClassLabel value="menu + Lucide size-4 in links" />
                        </div>
            
              </>
            }
            html={iconsHtml}
            jsx={toJsxMarkup(iconsHtml)}
          />
        
        </Section>

        <Section
          eyebrow="03 · Studio"
          title="Menzies Design section columns"
          description="One open panel with Palette, Layers, Brushes, Calendar"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={shell}>
                          <button
                            type="button"
                            className="btn btn-sm cursor-pointer sm:hidden"
                            popoverTarget="mm-studio"
                          >
                            Menu
                          </button>
                          <div
                            className="megamenu megamenu-wide max-sm:megamenu-vertical w-full border border-base-300 p-2"
                            id="mm-studio"
                            popover="auto"
                          >
                            <span className="megamenu-active" />
                            <button type="button" className="cursor-pointer" popoverTarget="mm-studio-explore">
                              Explore
                            </button>
                            <div id="mm-studio-explore" popover="auto">
                              <div className="flex max-sm:flex-col items-start">
                                <ul className="menu w-full md:menu-horizontal">
                                  <li>
                                    <ul>
                                      <li className="menu-title">Palette</li>
                                      <li>
                                        <IconLink icon={Palette}>Pigment chart</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Mix notes</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Swatch racks</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul>
                                      <li className="menu-title">Layers</li>
                                      <li>
                                        <IconLink icon={Layers}>Wash stack</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Masking film</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Glaze order</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul>
                                      <li className="menu-title">Brushes</li>
                                      <li>
                                        <IconLink icon={Paintbrush}>Round set</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Flat wash</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Detail tips</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul>
                                      <li className="menu-title">Calendar</li>
                                      <li>
                                        <IconLink icon={Calendar}>Session plan</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Drying windows</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Critique dates</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <ul>
                                      <li className="menu-title">Components</li>
                                      <li>
                                        <IconLink icon={SquareStack}>Gallery pages</IconLink>
                                      </li>
                                      <li>
                                        <DemoLink>Form controls</DemoLink>
                                      </li>
                                      <li>
                                        <DemoLink>Feedback chrome</DemoLink>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <button type="button" className="cursor-pointer" popoverTarget="mm-studio-guides">
                              Guides
                            </button>
                            <div id="mm-studio-guides" popover="auto">
                              <ul className="menu">
                                <li>
                                  <DemoLink>Wet on wet</DemoLink>
                                </li>
                                <li>
                                  <DemoLink>Dry brush edges</DemoLink>
                                </li>
                                <li>
                                  <DemoLink>Granulation tips</DemoLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ClassLabel value="menu-title columns: Palette, Layers, Brushes, Calendar, Components" />
                        </div>
            
              </>
            }
            html={studioHtml}
            jsx={toJsxMarkup(studioHtml)}
          />
        
        </Section>

        <Section
          eyebrow="04 · Navbar"
          title="Mini navbar host"
          description="A self-contained navbar inside the wash-panel hosts megamenu-full in"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={`${shell} overflow-visible`}>
                          <div className="navbar rounded-box border border-ink-border/70 bg-base-100 px-2 shadow-sm sm:px-3">
                            <div className="navbar-start">
                              <a
                                href="#megamenu-demo"
                                className="btn btn-ghost cursor-pointer text-lg font-display"
                                onClick={(e) => e.preventDefault()}
                              >
                                Menzies Design
                              </a>
                            </div>
                            <div className="navbar-center hidden sm:flex">
                              <div
                                className="megamenu megamenu-full max-sm:megamenu-vertical p-1"
                                id="mm-nav"
                                popover="auto"
                              >
                                <span className="megamenu-active" />
                                <button type="button" className="cursor-pointer" popoverTarget="mm-nav-studio">
                                  Studio
                                </button>
                                <div id="mm-nav-studio" popover="auto">
                                  <div className="flex max-sm:flex-col items-start">
                                    <ul className="menu w-full md:menu-horizontal">
                                      <li>
                                        <DemoLink>Workspace</DemoLink>
                                        <ul>
                                          <li>
                                            <IconLink icon={Palette}>Palette</IconLink>
                                          </li>
                                          <li>
                                            <IconLink icon={Layers}>Layers</IconLink>
                                          </li>
                                          <li>
                                            <IconLink icon={Paintbrush}>Brushes</IconLink>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <DemoLink>Schedule</DemoLink>
                                        <ul>
                                          <li>
                                            <IconLink icon={Calendar}>Calendar</IconLink>
                                          </li>
                                          <li>
                                            <DemoLink>Critiques</DemoLink>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <button type="button" className="cursor-pointer" popoverTarget="mm-nav-library">
                                  Library
                                </button>
                                <div id="mm-nav-library" popover="auto">
                                  <ul className="menu">
                                    <li>
                                      <DemoLink>Reference plates</DemoLink>
                                    </li>
                                    <li>
                                      <DemoLink>Wash recipes</DemoLink>
                                    </li>
                                    <li>
                                      <DemoLink>Paper grades</DemoLink>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="navbar-end gap-1">
                              <button type="button" className="btn btn-sm cursor-pointer hidden sm:inline-flex">
                                Sign in
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm cursor-pointer sm:hidden"
                                popoverTarget="mm-nav"
                              >
                                Menu
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <ClassLabel value="navbar + megamenu megamenu-full" />
                        </div>
            
              </>
            }
            html={navHtml}
            jsx={toJsxMarkup(navHtml)}
          />
        
        </Section>

        <Section
          eyebrow="05 · Responsive"
          title="Small screen notes"
          description="Megamenu prefers large screens"
        >
          <ShowcaseTabs
            preview={
              <>

              <ul className="list space-y-2 text-sm text-ink-muted">
                          <li className="list-row items-start gap-3 px-0">
                            <span className="font-mono text-[0.7rem] text-base-content">sm:hidden</span>
                            <span>
                              Show a single Menu button that targets the megamenu popover on
                              phones.
                            </span>
                          </li>
                          <li className="list-row items-start gap-3 px-0">
                            <span className="font-mono text-[0.7rem] text-base-content">
                              max-sm:megamenu-vertical
                            </span>
                            <span>
                              Collapse the bar into a vertical sheet when the popover opens.
                            </span>
                          </li>
                          <li className="list-row items-start gap-3 px-0">
                            <span className="font-mono text-[0.7rem] text-base-content">
                              max-sm:flex-col
                            </span>
                            <span>
                              Stack multi-column panels so titles and links remain readable.
                            </span>
                          </li>
                          <li className="list-row items-start gap-3 px-0">
                            <span className="font-mono text-[0.7rem] text-base-content">popover</span>
                            <span>
                              Item panels use the Popover API, so outside click and Escape
                              dismiss without sticky open classes.
                            </span>
                          </li>
                        </ul>
                        <div className="mt-3">
                          <ClassLabel value="responsive: button + max-sm:megamenu-vertical + stacked columns" />
                        </div>
            
              </>
            }
            html={responsiveHtml}
            jsx={toJsxMarkup(responsiveHtml)}
          />
        
        </Section>
      </div>
    </>
  )
}
