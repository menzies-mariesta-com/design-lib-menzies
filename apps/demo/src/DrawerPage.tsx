import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  Home,
  Layers,
  Menu,
  Paintbrush,
  Palette,
  X,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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

/** Height-boxed frame so nested drawers do not claim the app viewport. */
const demoFrame =
  'relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30'

const demoDrawer = 'drawer absolute inset-0 h-full'

const sidePanel =
  'menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm'

function DemoMenu({
  items = ['Home', 'Palette', 'Layers'],
}: {
  items?: string[]
}) {
  return (
    <ul className={sidePanel}>
      {items.map((label) => (
        <li key={label}>
          <button type="button" className="cursor-pointer">
            {label}
          </button>
        </li>
      ))}
    </ul>
  )
}

function IconToggle({
  htmlFor,
  tip,
  color = 'primary',
  close = false,
}: {
  htmlFor: string
  tip: string
  color?: 'primary' | 'secondary' | 'ghost'
  close?: boolean
}) {
  const tipClass =
    color === 'ghost'
      ? 'tooltip'
      : color === 'secondary'
        ? 'tooltip tooltip-secondary'
        : 'tooltip tooltip-primary'
  const btnClass =
    color === 'ghost'
      ? 'btn btn-ghost btn-square cursor-pointer drawer-button'
      : color === 'secondary'
        ? 'btn btn-ghost btn-square btn-secondary cursor-pointer drawer-button'
        : 'btn btn-ghost btn-square btn-primary cursor-pointer drawer-button'

  return (
    <div className={tipClass} data-tip={tip}>
      <label htmlFor={htmlFor} className={btnClass} aria-label={tip}>
        {close ? (
          <X className="size-5" strokeWidth={2} />
        ) : (
          <Menu className="size-5" strokeWidth={2} />
        )}
      </label>
    </div>
  )
}

const basicHtml = `<div class="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30">
  <div class="drawer absolute inset-0 h-full">
    <input id="gallery-drawer-basic" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center gap-3 p-4">
      <p class="text-sm text-ink-muted">Main content area</p>
      <div class="flex items-center gap-2">
        <label for="gallery-drawer-basic" class="btn btn-primary cursor-pointer drawer-button">Open drawer</label>
        <div class="tooltip tooltip-primary" data-tip="Open menu">
  <label for="gallery-drawer-basic" class="btn btn-ghost btn-square btn-primary cursor-pointer drawer-button" aria-label="Open menu">
    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
      </div>
    </div>
    <div class="drawer-side z-20">
      <label for="gallery-drawer-basic" aria-label="Close sidebar" class="drawer-overlay"></label>
      <div class="relative flex min-h-full">
        <ul class="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
    <li><button type="button" class="cursor-pointer">Home</button></li>
    <li><button type="button" class="cursor-pointer">Palette</button></li>
    <li><button type="button" class="cursor-pointer">Layers</button></li>
  </ul>
        <div class="absolute top-2 right-2">
          <div class="tooltip tooltip-secondary" data-tip="Close menu">
  <label for="gallery-drawer-basic" class="btn btn-ghost btn-square btn-secondary cursor-pointer drawer-button" aria-label="Close menu">
    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  </label>
</div>
        </div>
      </div>
    </div>
  </div>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">drawer + drawer-toggle + drawer-content + drawer-side</code>
</p>`

const basicJsx = `<div className="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30">
  <div className="drawer absolute inset-0 h-full">
    <input id="gallery-drawer-basic" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center gap-3 p-4">
      <p className="text-sm text-ink-muted">Main content area</p>
      <div className="flex items-center gap-2">
        <label htmlFor="gallery-drawer-basic" className="btn btn-primary cursor-pointer drawer-button">Open drawer</label>
        <div className="tooltip tooltip-primary" data-tip="Open menu">
  <label htmlFor="gallery-drawer-basic" className="btn btn-ghost btn-square btn-primary cursor-pointer drawer-button" aria-label="Open menu">
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
      </div>
    </div>
    <div className="drawer-side z-20">
      <label htmlFor="gallery-drawer-basic" aria-label="Close sidebar" className="drawer-overlay"></label>
      <div className="relative flex min-h-full">
        <ul className="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
    <li><button type="button" className="cursor-pointer">Home</button></li>
    <li><button type="button" className="cursor-pointer">Palette</button></li>
    <li><button type="button" className="cursor-pointer">Layers</button></li>
  </ul>
        <div className="absolute top-2 right-2">
          <div className="tooltip tooltip-secondary" data-tip="Close menu">
  <label htmlFor="gallery-drawer-basic" className="btn btn-ghost btn-square btn-secondary cursor-pointer drawer-button" aria-label="Close menu">
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  </label>
</div>
        </div>
      </div>
    </div>
  </div>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">drawer + drawer-toggle + drawer-content + drawer-side</code>
</p>`

const endHtml = `<div class="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30">
  <div class="drawer absolute inset-0 h-full drawer-end">
    <input id="gallery-drawer-end" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center gap-3 p-4">
      <p class="text-sm text-ink-muted">Content stays left</p>
      <div class="flex items-center gap-2">
        <label for="gallery-drawer-end" class="btn btn-secondary cursor-pointer drawer-button">Open right panel</label>
        <div class="tooltip tooltip-secondary" data-tip="Open right menu">
  <label for="gallery-drawer-end" class="btn btn-ghost btn-square btn-secondary cursor-pointer drawer-button" aria-label="Open right menu">
    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
      </div>
    </div>
    <div class="drawer-side z-20">
      <label for="gallery-drawer-end" aria-label="Close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
    <li><button type="button" class="cursor-pointer">Pigments</button></li>
    <li><button type="button" class="cursor-pointer">Washes</button></li>
    <li><button type="button" class="cursor-pointer">Series</button></li>
  </ul>
    </div>
  </div>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">drawer drawer-end</code>
</p>`

const endJsx = `<div className="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30">
  <div className="drawer absolute inset-0 h-full drawer-end">
    <input id="gallery-drawer-end" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center gap-3 p-4">
      <p className="text-sm text-ink-muted">Content stays left</p>
      <div className="flex items-center gap-2">
        <label htmlFor="gallery-drawer-end" className="btn btn-secondary cursor-pointer drawer-button">Open right panel</label>
        <div className="tooltip tooltip-secondary" data-tip="Open right menu">
  <label htmlFor="gallery-drawer-end" className="btn btn-ghost btn-square btn-secondary cursor-pointer drawer-button" aria-label="Open right menu">
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
      </div>
    </div>
    <div className="drawer-side z-20">
      <label htmlFor="gallery-drawer-end" aria-label="Close sidebar" className="drawer-overlay"></label>
      <ul className="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
    <li><button type="button" className="cursor-pointer">Pigments</button></li>
    <li><button type="button" className="cursor-pointer">Washes</button></li>
    <li><button type="button" className="cursor-pointer">Series</button></li>
  </ul>
    </div>
  </div>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">drawer drawer-end</code>
</p>`

const responsiveHtml = `<div class="mb-3 flex flex-wrap gap-2">
  <code class="font-mono text-[0.65rem] text-ink-muted">drawer lg:drawer-open</code>
  <code class="font-mono text-[0.65rem] text-ink-muted">drawer-button lg:hidden</code>
</div>
<div class="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 h-80">
  <div class="drawer absolute inset-0 h-full lg:drawer-open">
    <input id="gallery-drawer-responsive" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col p-3">
      <div class="mb-2 flex items-center gap-2">
        <label for="gallery-drawer-responsive" class="btn btn-ghost btn-sm cursor-pointer drawer-button lg:hidden">Toggle</label>
        <span class="text-sm text-ink-muted">Resize below lg to use the toggle</span>
      </div>
      <div class="flex flex-1 items-center justify-center rounded-box border border-dashed border-ink-border/50 bg-base-100/50 p-4 text-sm text-ink-muted">Page content</div>
    </div>
    <div class="drawer-side z-20">
      <label for="gallery-drawer-responsive" aria-label="Close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
    <li><button type="button" class="cursor-pointer">Overview</button></li>
    <li><button type="button" class="cursor-pointer">Plates</button></li>
    <li><button type="button" class="cursor-pointer">Archive</button></li>
  </ul>
    </div>
  </div>
</div>
<p class="mt-3 text-sm text-ink-muted">
  This app shell uses the same pattern:
  <span class="font-mono text-xs">drawer lg:drawer-open</span> with a mobile-only menu control.
</p>`

const responsiveJsx = `<div className="mb-3 flex flex-wrap gap-2">
  <code className="font-mono text-[0.65rem] text-ink-muted">drawer lg:drawer-open</code>
  <code className="font-mono text-[0.65rem] text-ink-muted">drawer-button lg:hidden</code>
</div>
<div className="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 h-80">
  <div className="drawer absolute inset-0 h-full lg:drawer-open">
    <input id="gallery-drawer-responsive" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col p-3">
      <div className="mb-2 flex items-center gap-2">
        <label htmlFor="gallery-drawer-responsive" className="btn btn-ghost btn-sm cursor-pointer drawer-button lg:hidden">Toggle</label>
        <span className="text-sm text-ink-muted">Resize below lg to use the toggle</span>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-box border border-dashed border-ink-border/50 bg-base-100/50 p-4 text-sm text-ink-muted">Page content</div>
    </div>
    <div className="drawer-side z-20">
      <label htmlFor="gallery-drawer-responsive" aria-label="Close sidebar" className="drawer-overlay"></label>
      <ul className="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
    <li><button type="button" className="cursor-pointer">Overview</button></li>
    <li><button type="button" className="cursor-pointer">Plates</button></li>
    <li><button type="button" className="cursor-pointer">Archive</button></li>
  </ul>
    </div>
  </div>
</div>
<p className="mt-3 text-sm text-ink-muted">
  This app shell uses the same pattern:
  <span className="font-mono text-xs">drawer lg:drawer-open</span> with a mobile-only menu control.
</p>`

const overlayHtml = `<div class="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30">
  <div class="drawer absolute inset-0 h-full">
    <input id="gallery-drawer-overlay" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center gap-3 p-4">
      <p class="max-w-xs text-center text-sm text-ink-muted">Open the drawer, then click the dimmed area to dismiss.</p>
      <div class="tooltip tooltip-primary" data-tip="Open overlay demo">
  <label for="gallery-drawer-overlay" class="btn btn-ghost btn-square btn-primary cursor-pointer drawer-button" aria-label="Open overlay demo">
    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
    </div>
    <div class="drawer-side z-20">
      <label for="gallery-drawer-overlay" aria-label="Close sidebar" class="drawer-overlay cursor-pointer"></label>
      <ul class="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
        <li class="menu-title">Overlay closes me</li>
        <li><button type="button" class="cursor-pointer">Sketchbook</button></li>
        <li><button type="button" class="cursor-pointer">Wet media</button></li>
      </ul>
    </div>
  </div>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">label.drawer-overlay[for=toggle-id]</code>
</p>`

const overlayJsx = `<div className="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30">
  <div className="drawer absolute inset-0 h-full">
    <input id="gallery-drawer-overlay" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center gap-3 p-4">
      <p className="max-w-xs text-center text-sm text-ink-muted">Open the drawer, then click the dimmed area to dismiss.</p>
      <div className="tooltip tooltip-primary" data-tip="Open overlay demo">
  <label htmlFor="gallery-drawer-overlay" className="btn btn-ghost btn-square btn-primary cursor-pointer drawer-button" aria-label="Open overlay demo">
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
    </div>
    <div className="drawer-side z-20">
      <label htmlFor="gallery-drawer-overlay" aria-label="Close sidebar" className="drawer-overlay cursor-pointer"></label>
      <ul className="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
        <li className="menu-title">Overlay closes me</li>
        <li><button type="button" className="cursor-pointer">Sketchbook</button></li>
        <li><button type="button" className="cursor-pointer">Wet media</button></li>
      </ul>
    </div>
  </div>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">label.drawer-overlay[for=toggle-id]</code>
</p>`

const navbarHtml = `<div class="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 h-80">
  <div class="drawer absolute inset-0 h-full">
    <input id="gallery-drawer-navbar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <header class="navbar min-h-12 border-b border-ink-border/60 bg-base-100/90 px-2">
        <div class="navbar-start gap-1">
          <div class="tooltip" data-tip="Open studio menu">
  <label for="gallery-drawer-navbar" class="btn btn-ghost btn-square cursor-pointer drawer-button" aria-label="Open studio menu">
    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
          <span class="font-display text-lg font-semibold tracking-tight">Menzies Design</span>
        </div>
        <div class="navbar-end">
          <span class="label-ink px-2">Studio</span>
        </div>
      </header>
      <div class="flex flex-1 flex-col items-center justify-center gap-2 p-4">
        <p class="font-display text-xl font-semibold">Pigment desk</p>
        <p class="text-sm text-ink-muted">Open the sidebar for studio tools</p>
      </div>
    </div>
    <div class="drawer-side z-20">
      <label for="gallery-drawer-navbar" aria-label="Close sidebar" class="drawer-overlay"></label>
      <aside class="flex min-h-full w-56 flex-col bg-base-100">
        <div class="border-b border-ink-border px-4 py-3">
          <p class="font-display text-lg font-semibold">Studio</p>
          <p class="label-ink mt-0.5">Quick links</p>
        </div>
        <ul class="menu w-full flex-1 gap-1 p-2">
          <li><button type="button" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> Home</button></li>
          <li><button type="button" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg> Palette</button></li>
          <li><button type="button" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg> Layers</button></li>
          <li><button type="button" class="cursor-pointer"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg> Brushes</button></li>
        </ul>
      </aside>
    </div>
  </div>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">navbar + drawer-side + menu</code>
</p>`

const navbarJsx = `<div className="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 h-80">
  <div className="drawer absolute inset-0 h-full">
    <input id="gallery-drawer-navbar" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      <header className="navbar min-h-12 border-b border-ink-border/60 bg-base-100/90 px-2">
        <div className="navbar-start gap-1">
          <div className="tooltip" data-tip="Open studio menu">
  <label htmlFor="gallery-drawer-navbar" className="btn btn-ghost btn-square cursor-pointer drawer-button" aria-label="Open studio menu">
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
          <span className="font-display text-lg font-semibold tracking-tight">Menzies Design</span>
        </div>
        <div className="navbar-end">
          <span className="label-ink px-2">Studio</span>
        </div>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4">
        <p className="font-display text-xl font-semibold">Pigment desk</p>
        <p className="text-sm text-ink-muted">Open the sidebar for studio tools</p>
      </div>
    </div>
    <div className="drawer-side z-20">
      <label htmlFor="gallery-drawer-navbar" aria-label="Close sidebar" className="drawer-overlay"></label>
      <aside className="flex min-h-full w-56 flex-col bg-base-100">
        <div className="border-b border-ink-border px-4 py-3">
          <p className="font-display text-lg font-semibold">Studio</p>
          <p className="label-ink mt-0.5">Quick links</p>
        </div>
        <ul className="menu w-full flex-1 gap-1 p-2">
          <li><button type="button" className="cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> Home</button></li>
          <li><button type="button" className="cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg> Palette</button></li>
          <li><button type="button" className="cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg> Layers</button></li>
          <li><button type="button" className="cursor-pointer"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg> Brushes</button></li>
        </ul>
      </aside>
    </div>
  </div>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">navbar + drawer-side + menu</code>
</p>`

const sizesHtml = `<div class="grid gap-4 sm:grid-cols-2">
  <div class="space-y-2">
    <code class="font-mono text-[0.65rem] text-ink-muted">frame h-48</code>
    <div class="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 h-48">
      <div class="drawer absolute inset-0 h-full">
        <input id="gallery-drawer-size-sm" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex items-center justify-center p-3">
          <label for="gallery-drawer-size-sm" class="btn btn-sm cursor-pointer drawer-button">Short frame</label>
        </div>
        <div class="drawer-side z-20">
          <label for="gallery-drawer-size-sm" aria-label="Close sidebar" class="drawer-overlay"></label>
          <ul class="menu min-h-full w-40 bg-base-100 p-3">
            <li><button type="button" class="cursor-pointer">A</button></li>
            <li><button type="button" class="cursor-pointer">B</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="space-y-2">
    <code class="font-mono text-[0.65rem] text-ink-muted">frame h-64 + drawer-end</code>
    <div class="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 h-64">
      <div class="drawer absolute inset-0 h-full drawer-end">
        <input id="gallery-drawer-size-end" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex items-center justify-center p-3">
          <label for="gallery-drawer-size-end" class="btn btn-sm btn-secondary cursor-pointer drawer-button">Tall end panel</label>
        </div>
        <div class="drawer-side z-20">
          <label for="gallery-drawer-size-end" aria-label="Close sidebar" class="drawer-overlay"></label>
          <ul class="menu min-h-full w-44 bg-base-100 p-3">
            <li><button type="button" class="cursor-pointer">Right A</button></li>
            <li><button type="button" class="cursor-pointer">Right B</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<ul class="mt-4 list-inside list-disc space-y-2 text-sm text-ink-muted">
  <li>Demo frames use <span class="font-mono text-xs">relative</span> height and <span class="font-mono text-xs">overflow-hidden</span>.</li>
  <li>Side width is set on the menu or aside (e.g. <span class="font-mono text-xs">w-56</span>), not by a drawer size class.</li>
  <li>Avoid nesting a full-viewport drawer inside another without unique toggle ids and a contained frame.</li>
</ul>`

const sizesJsx = `<div className="grid gap-4 sm:grid-cols-2">
  <div className="space-y-2">
    <code className="font-mono text-[0.65rem] text-ink-muted">frame h-48</code>
    <div className="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 h-48">
      <div className="drawer absolute inset-0 h-full">
        <input id="gallery-drawer-size-sm" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex items-center justify-center p-3">
          <label htmlFor="gallery-drawer-size-sm" className="btn btn-sm cursor-pointer drawer-button">Short frame</label>
        </div>
        <div className="drawer-side z-20">
          <label htmlFor="gallery-drawer-size-sm" aria-label="Close sidebar" className="drawer-overlay"></label>
          <ul className="menu min-h-full w-40 bg-base-100 p-3">
            <li><button type="button" className="cursor-pointer">A</button></li>
            <li><button type="button" className="cursor-pointer">B</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div className="space-y-2">
    <code className="font-mono text-[0.65rem] text-ink-muted">frame h-64 + drawer-end</code>
    <div className="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 h-64">
      <div className="drawer absolute inset-0 h-full drawer-end">
        <input id="gallery-drawer-size-end" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex items-center justify-center p-3">
          <label htmlFor="gallery-drawer-size-end" className="btn btn-sm btn-secondary cursor-pointer drawer-button">Tall end panel</label>
        </div>
        <div className="drawer-side z-20">
          <label htmlFor="gallery-drawer-size-end" aria-label="Close sidebar" className="drawer-overlay"></label>
          <ul className="menu min-h-full w-44 bg-base-100 p-3">
            <li><button type="button" className="cursor-pointer">Right A</button></li>
            <li><button type="button" className="cursor-pointer">Right B</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<ul className="mt-4 list-inside list-disc space-y-2 text-sm text-ink-muted">
  <li>Demo frames use <span className="font-mono text-xs">relative</span> height and <span className="font-mono text-xs">overflow-hidden</span>.</li>
  <li>Side width is set on the menu or aside (e.g. <span className="font-mono text-xs">w-56</span>), not by a drawer size class.</li>
  <li>Avoid nesting a full-viewport drawer inside another without unique toggle ids and a contained frame.</li>
</ul>`

const iconsHtml = `<div class="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30">
  <div class="drawer absolute inset-0 h-full">
    <input id="gallery-drawer-icons" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center gap-4 p-4">
      <p class="text-sm text-ink-muted">Prefer tooltips on icon-only drawer buttons</p>
      <div class="flex items-center gap-3">
        <div class="tooltip tooltip-primary" data-tip="Open menu">
  <label for="gallery-drawer-icons" class="btn btn-ghost btn-square btn-primary cursor-pointer drawer-button" aria-label="Open menu">
    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
        <div class="tooltip tooltip-secondary" data-tip="Toggle sidebar">
  <label for="gallery-drawer-icons" class="btn btn-ghost btn-square btn-secondary cursor-pointer drawer-button" aria-label="Toggle sidebar">
    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
      </div>
    </div>
    <div class="drawer-side z-20">
      <label for="gallery-drawer-icons" aria-label="Close sidebar" class="drawer-overlay"></label>
      <div class="relative flex min-h-full">
        <ul class="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
    <li><button type="button" class="cursor-pointer">Open</button></li>
    <li><button type="button" class="cursor-pointer">Close</button></li>
    <li><button type="button" class="cursor-pointer">Repeat</button></li>
  </ul>
        <div class="absolute top-2 right-2">
          <div class="tooltip tooltip-secondary" data-tip="Close menu">
  <label for="gallery-drawer-icons" class="btn btn-ghost btn-square btn-secondary cursor-pointer drawer-button" aria-label="Close menu">
    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  </label>
</div>
        </div>
      </div>
    </div>
  </div>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">tooltip + btn-ghost btn-square + Menu / X</code>
</p>`

const iconsJsx = `<div className="relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30">
  <div className="drawer absolute inset-0 h-full">
    <input id="gallery-drawer-icons" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center gap-4 p-4">
      <p className="text-sm text-ink-muted">Prefer tooltips on icon-only drawer buttons</p>
      <div className="flex items-center gap-3">
        <div className="tooltip tooltip-primary" data-tip="Open menu">
  <label htmlFor="gallery-drawer-icons" className="btn btn-ghost btn-square btn-primary cursor-pointer drawer-button" aria-label="Open menu">
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
        <div className="tooltip tooltip-secondary" data-tip="Toggle sidebar">
  <label htmlFor="gallery-drawer-icons" className="btn btn-ghost btn-square btn-secondary cursor-pointer drawer-button" aria-label="Toggle sidebar">
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
  </label>
</div>
      </div>
    </div>
    <div className="drawer-side z-20">
      <label htmlFor="gallery-drawer-icons" aria-label="Close sidebar" className="drawer-overlay"></label>
      <div className="relative flex min-h-full">
        <ul className="menu min-h-full w-56 bg-base-100 p-4 text-base-content shadow-sm">
    <li><button type="button" className="cursor-pointer">Open</button></li>
    <li><button type="button" className="cursor-pointer">Close</button></li>
    <li><button type="button" className="cursor-pointer">Repeat</button></li>
  </ul>
        <div className="absolute top-2 right-2">
          <div className="tooltip tooltip-secondary" data-tip="Close menu">
  <label htmlFor="gallery-drawer-icons" className="btn btn-ghost btn-square btn-secondary cursor-pointer drawer-button" aria-label="Close menu">
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  </label>
</div>
        </div>
      </div>
    </div>
  </div>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">tooltip + btn-ghost btn-square + Menu / X</code>
</p>`

export default function DrawerPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Drawer
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">drawer</span> sidebars: checkbox toggle, end placement, responsive open, overlay, and a.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Checkbox toggle"
          description="drawer-toggle checkbox, drawer-content, and drawer-side"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={demoFrame}>
                          <div className={demoDrawer}>
                            <input
                              id="gallery-drawer-basic"
                              type="checkbox"
                              className="drawer-toggle"
                            />
                            <div className="drawer-content flex flex-col items-center justify-center gap-3 p-4">
                              <p className="text-sm text-ink-muted">Main content area</p>
                              <div className="flex items-center gap-2">
                                <label
                                  htmlFor="gallery-drawer-basic"
                                  className="btn btn-primary cursor-pointer drawer-button"
                                >
                                  Open drawer
                                </label>
                                <IconToggle htmlFor="gallery-drawer-basic" tip="Open menu" />
                              </div>
                            </div>
                            <div className="drawer-side z-20">
                              <label
                                htmlFor="gallery-drawer-basic"
                                aria-label="Close sidebar"
                                className="drawer-overlay"
                              />
                              <div className="relative flex min-h-full">
                                <DemoMenu />
                                <div className="absolute top-2 right-2">
                                  <IconToggle
                                    htmlFor="gallery-drawer-basic"
                                    tip="Close menu"
                                    color="secondary"
                                    close
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3">
                          <ClassLabel value="drawer + drawer-toggle + drawer-content + drawer-side" />
                        </p>
            
              </>
            }
            html={basicHtml}
            jsx={basicJsx}
          />
        
        </Section>

        <Section
          eyebrow="02 · drawer-end"
          title="Panel from the right"
          description="Add drawer-end so the side panel slides in from the right edge"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={demoFrame}>
                          <div className={`${demoDrawer} drawer-end`}>
                            <input
                              id="gallery-drawer-end"
                              type="checkbox"
                              className="drawer-toggle"
                            />
                            <div className="drawer-content flex flex-col items-center justify-center gap-3 p-4">
                              <p className="text-sm text-ink-muted">Content stays left</p>
                              <div className="flex items-center gap-2">
                                <label
                                  htmlFor="gallery-drawer-end"
                                  className="btn btn-secondary cursor-pointer drawer-button"
                                >
                                  Open right panel
                                </label>
                                <IconToggle
                                  htmlFor="gallery-drawer-end"
                                  tip="Open right menu"
                                  color="secondary"
                                />
                              </div>
                            </div>
                            <div className="drawer-side z-20">
                              <label
                                htmlFor="gallery-drawer-end"
                                aria-label="Close sidebar"
                                className="drawer-overlay"
                              />
                              <DemoMenu items={['Pigments', 'Washes', 'Series']} />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3">
                          <ClassLabel value="drawer drawer-end" />
                        </p>
            
              </>
            }
            html={endHtml}
            jsx={endJsx}
          />
        
        </Section>

        <Section
          eyebrow="03 · Responsive"
          title="Always open on large screens"
          description="lg:drawer-open keeps the sidebar visible from the lg breakpoint"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mb-3 flex flex-wrap gap-2">
                          <ClassLabel value="drawer lg:drawer-open" />
                          <ClassLabel value="drawer-button lg:hidden" />
                        </div>
                        <div className={`${demoFrame} h-80`}>
                          <div className={`${demoDrawer} lg:drawer-open`}>
                            <input
                              id="gallery-drawer-responsive"
                              type="checkbox"
                              className="drawer-toggle"
                            />
                            <div className="drawer-content flex flex-col p-3">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="gallery-drawer-responsive"
                                  className="btn btn-ghost btn-sm cursor-pointer drawer-button lg:hidden"
                                >
                                  Toggle
                                </label>
                                <span className="text-sm text-ink-muted">
                                  Resize below lg to use the toggle
                                </span>
                              </div>
                              <div className="flex flex-1 items-center justify-center rounded-box border border-dashed border-ink-border/50 bg-base-100/50 p-4 text-sm text-ink-muted">
                                Page content
                              </div>
                            </div>
                            <div className="drawer-side z-20">
                              <label
                                htmlFor="gallery-drawer-responsive"
                                aria-label="Close sidebar"
                                className="drawer-overlay"
                              />
                              <DemoMenu items={['Overview', 'Plates', 'Archive']} />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-ink-muted">
                          This app shell uses the same pattern:{' '}
                          <span className="font-mono text-xs">drawer lg:drawer-open</span> with
                          a mobile-only menu control.
                        </p>
            
              </>
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        
        </Section>

        <Section
          eyebrow="04 · Mobile overlay"
          title="drawer-overlay dismiss"
          description="The overlay sits behind the side panel"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={demoFrame}>
                          <div className={demoDrawer}>
                            <input
                              id="gallery-drawer-overlay"
                              type="checkbox"
                              className="drawer-toggle"
                            />
                            <div className="drawer-content flex flex-col items-center justify-center gap-3 p-4">
                              <p className="max-w-xs text-center text-sm text-ink-muted">
                                Open the drawer, then click the dimmed area to dismiss.
                              </p>
                              <IconToggle
                                htmlFor="gallery-drawer-overlay"
                                tip="Open overlay demo"
                              />
                            </div>
                            <div className="drawer-side z-20">
                              <label
                                htmlFor="gallery-drawer-overlay"
                                aria-label="Close sidebar"
                                className="drawer-overlay cursor-pointer"
                              />
                              <ul className={sidePanel}>
                                <li className="menu-title">Overlay closes me</li>
                                <li>
                                  <button type="button" className="cursor-pointer">
                                    Sketchbook
                                  </button>
                                </li>
                                <li>
                                  <button type="button" className="cursor-pointer">
                                    Wet media
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3">
                          <ClassLabel value="label.drawer-overlay[for=toggle-id]" />
                        </p>
            
              </>
            }
            html={overlayHtml}
            jsx={overlayJsx}
          />
        
        </Section>

        <Section
          eyebrow="05 · Navbar + sidebar"
          title="Watercolor studio mini demo"
          description="A compact navbar with menu toggle and a side menu of studio links"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={`${demoFrame} h-80`}>
                          <div className={demoDrawer}>
                            <input
                              id="gallery-drawer-navbar"
                              type="checkbox"
                              className="drawer-toggle"
                            />
                            <div className="drawer-content flex flex-col">
                              <header className="navbar min-h-12 border-b border-ink-border/60 bg-base-100/90 px-2">
                                <div className="navbar-start gap-1">
                                  <IconToggle
                                    htmlFor="gallery-drawer-navbar"
                                    tip="Open studio menu"
                                    color="ghost"
                                  />
                                  <span className="font-display text-lg font-semibold tracking-tight">
                                    Menzies Design
                                  </span>
                                </div>
                                <div className="navbar-end">
                                  <span className="label-ink px-2">Studio</span>
                                </div>
                              </header>
                              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4">
                                <p className="font-display text-xl font-semibold">
                                  Pigment desk
                                </p>
                                <p className="text-sm text-ink-muted">
                                  Open the sidebar for studio tools
                                </p>
                              </div>
                            </div>
                            <div className="drawer-side z-20">
                              <label
                                htmlFor="gallery-drawer-navbar"
                                aria-label="Close sidebar"
                                className="drawer-overlay"
                              />
                              <aside className="flex min-h-full w-56 flex-col bg-base-100">
                                <div className="border-b border-ink-border px-4 py-3">
                                  <p className="font-display text-lg font-semibold">Studio</p>
                                  <p className="label-ink mt-0.5">Quick links</p>
                                </div>
                                <ul className="menu w-full flex-1 gap-1 p-2">
                                  <li>
                                    <button type="button" className="cursor-pointer">
                                      <Home className="size-4" strokeWidth={2} />
                                      Home
                                    </button>
                                  </li>
                                  <li>
                                    <button type="button" className="cursor-pointer">
                                      <Palette className="size-4" strokeWidth={2} />
                                      Palette
                                    </button>
                                  </li>
                                  <li>
                                    <button type="button" className="cursor-pointer">
                                      <Layers className="size-4" strokeWidth={2} />
                                      Layers
                                    </button>
                                  </li>
                                  <li>
                                    <button type="button" className="cursor-pointer">
                                      <Paintbrush className="size-4" strokeWidth={2} />
                                      Brushes
                                    </button>
                                  </li>
                                </ul>
                              </aside>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3">
                          <ClassLabel value="navbar + drawer-side + menu" />
                        </p>
            
              </>
            }
            html={navbarHtml}
            jsx={navbarJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Sizes and placement"
          title="Height-constrained demo frames"
          description="Gallery drawers sit in relative frames so page scroll still works"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <ClassLabel value="frame h-48" />
                            <div className={`${demoFrame} h-48`}>
                              <div className={demoDrawer}>
                                <input
                                  id="gallery-drawer-size-sm"
                                  type="checkbox"
                                  className="drawer-toggle"
                                />
                                <div className="drawer-content flex items-center justify-center p-3">
                                  <label
                                    htmlFor="gallery-drawer-size-sm"
                                    className="btn btn-sm cursor-pointer drawer-button"
                                  >
                                    Short frame
                                  </label>
                                </div>
                                <div className="drawer-side z-20">
                                  <label
                                    htmlFor="gallery-drawer-size-sm"
                                    aria-label="Close sidebar"
                                    className="drawer-overlay"
                                  />
                                  <ul className="menu min-h-full w-40 bg-base-100 p-3">
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        A
                                      </button>
                                    </li>
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        B
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <ClassLabel value="frame h-64 + drawer-end" />
                            <div className={`${demoFrame} h-64`}>
                              <div className={`${demoDrawer} drawer-end`}>
                                <input
                                  id="gallery-drawer-size-end"
                                  type="checkbox"
                                  className="drawer-toggle"
                                />
                                <div className="drawer-content flex items-center justify-center p-3">
                                  <label
                                    htmlFor="gallery-drawer-size-end"
                                    className="btn btn-sm btn-secondary cursor-pointer drawer-button"
                                  >
                                    Tall end panel
                                  </label>
                                </div>
                                <div className="drawer-side z-20">
                                  <label
                                    htmlFor="gallery-drawer-size-end"
                                    aria-label="Close sidebar"
                                    className="drawer-overlay"
                                  />
                                  <ul className="menu min-h-full w-44 bg-base-100 p-3">
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        Right A
                                      </button>
                                    </li>
                                    <li>
                                      <button type="button" className="cursor-pointer">
                                        Right B
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-ink-muted">
                          <li>
                            Demo frames use{' '}
                            <span className="font-mono text-xs">relative</span> height and{' '}
                            <span className="font-mono text-xs">overflow-hidden</span>.
                          </li>
                          <li>
                            Side width is set on the menu or aside (e.g.{' '}
                            <span className="font-mono text-xs">w-56</span>), not by a drawer
                            size class.
                          </li>
                          <li>
                            Avoid nesting a full-viewport drawer inside another without unique
                            toggle ids and a contained frame.
                          </li>
                        </ul>
            
              </>
            }
            html={sizesHtml}
            jsx={sizesJsx}
          />
        
        </Section>

        <Section
          eyebrow="07 · Icon toggles"
          title="Menu and close with tooltips"
          description="Icon-only controls use Lucide Menu / X inside daisyUI tooltips"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={demoFrame}>
                          <div className={demoDrawer}>
                            <input
                              id="gallery-drawer-icons"
                              type="checkbox"
                              className="drawer-toggle"
                            />
                            <div className="drawer-content flex flex-col items-center justify-center gap-4 p-4">
                              <p className="text-sm text-ink-muted">
                                Prefer tooltips on icon-only drawer buttons
                              </p>
                              <div className="flex items-center gap-3">
                                <IconToggle
                                  htmlFor="gallery-drawer-icons"
                                  tip="Open menu"
                                  color="primary"
                                />
                                <IconToggle
                                  htmlFor="gallery-drawer-icons"
                                  tip="Toggle sidebar"
                                  color="secondary"
                                />
                              </div>
                            </div>
                            <div className="drawer-side z-20">
                              <label
                                htmlFor="gallery-drawer-icons"
                                aria-label="Close sidebar"
                                className="drawer-overlay"
                              />
                              <div className="relative flex min-h-full">
                                <DemoMenu items={['Open', 'Close', 'Repeat']} />
                                <div className="absolute top-2 right-2">
                                  <IconToggle
                                    htmlFor="gallery-drawer-icons"
                                    tip="Close menu"
                                    color="secondary"
                                    close
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3">
                          <ClassLabel value="tooltip + btn-ghost btn-square + Menu / X" />
                        </p>
            
              </>
            }
            html={iconsHtml}
            jsx={iconsJsx}
          />
        
        </Section>
      </div>
    </>
  )
}
