import { useState, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  Calendar,
  Home,
  Layers,
  Paintbrush,
  Palette,
  Settings,
  Inbox,
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

/** Unfix dock so gallery demos stay inside the panel (not viewport). */
const dockDemo =
  'dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm'

const sizes = [
  { name: 'xs', className: 'dock-xs' },
  { name: 'sm', className: 'dock-sm' },
  { name: 'md', className: 'dock-md' },
  { name: 'lg', className: 'dock-lg' },
  { name: 'xl', className: 'dock-xl' },
] as const

function DemoDock({
  className = '',
  active = 1,
  showLabels = true,
}: {
  className?: string
  active?: number
  showLabels?: boolean
}) {
  const items = [
    { label: 'Home', Icon: Home },
    { label: 'Inbox', Icon: Inbox },
    { label: 'Settings', Icon: Settings },
  ]

  return (
    <div className={`${dockDemo} ${className}`}>
      {items.map(({ label, Icon }, i) => (
        <button
          key={label}
          type="button"
          className={`cursor-pointer ${i === active ? 'dock-active' : ''}`}
          aria-current={i === active ? 'page' : undefined}
        >
          <Icon className="size-[1.2em]" strokeWidth={2} />
          {showLabels ? <span className="dock-label">{label}</span> : null}
        </button>
      ))}
    </div>
  )
}

const studioTools = [
  { id: 'palette', label: 'Palette', Icon: Palette },
  { id: 'layers', label: 'Layers', Icon: Layers },
  { id: 'brushes', label: 'Brushes', Icon: Paintbrush },
  { id: 'calendar', label: 'Calendar', Icon: Calendar },
] as const

function StudioDock() {
  const [active, setActive] = useState<(typeof studioTools)[number]['id']>('palette')
  const current = studioTools.find((t) => t.id === active) ?? studioTools[0]

  return (
    <div className="w-full max-w-md space-y-3">
      <p className="rounded-box border border-ink-border/50 bg-base-200/40 px-4 py-3 text-sm text-ink-muted">
        Selected: <span className="font-medium text-base-content">{current.label}</span>
      </p>
      <div className={dockDemo}>
        {studioTools.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={`cursor-pointer ${active === id ? 'dock-active' : ''}`}
            aria-current={active === id ? 'page' : undefined}
            onClick={() => setActive(id)}
          >
            <Icon className="size-[1.2em]" strokeWidth={2} />
            <span className="dock-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const basicHtml = `<div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock + button + dock-label</code>
</p>`

const basicJsx = `<div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock + button + dock-label</code>
</p>`

const activeHtml = `<div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
  <div class="space-y-2">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock-active on Home</code>
  <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
</div>
  <div class="space-y-2">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock-active on Inbox</code>
  <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
</div>
  <div class="space-y-2">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock-active on Settings</code>
  <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
</div>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">button.dock-active</code>
</p>`

const activeJsx = `<div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
  <div className="space-y-2">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock-active on Home</code>
  <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
</div>
  <div className="space-y-2">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock-active on Inbox</code>
  <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
</div>
  <div className="space-y-2">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock-active on Settings</code>
  <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
</div>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">button.dock-active</code>
</p>`

const sizesHtml = `<div class="flex flex-col gap-5">
<div class="space-y-2">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock dock-xs</code>
  <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-xs">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    
  </button>
</div>
</div>
<div class="space-y-2">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock dock-sm</code>
  <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-sm">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    
  </button>
</div>
</div>
<div class="space-y-2">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock dock-md</code>
  <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-md">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
</div>
<div class="space-y-2">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock dock-lg</code>
  <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-lg">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
</div>
<div class="space-y-2">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock dock-xl</code>
  <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-xl">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
</div>
</div>`

const sizesJsx = `<div className="flex flex-col gap-5">
<div className="space-y-2">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock dock-xs</code>
  <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-xs">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    
  </button>
</div>
</div>
<div className="space-y-2">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock dock-sm</code>
  <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-sm">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    
  </button>
</div>
</div>
<div className="space-y-2">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock dock-md</code>
  <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-md">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
</div>
<div className="space-y-2">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock dock-lg</code>
  <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-lg">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
</div>
<div className="space-y-2">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock dock-xl</code>
  <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm dock-xl">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
</div>
</div>`

const colorsHtml = `<div class="flex flex-col gap-5">
  <div class="space-y-2">
    <code class="font-mono text-[0.65rem] text-ink-muted">dock bg-neutral text-neutral-content</code>
    <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm bg-neutral text-neutral-content border-neutral">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
  </div>
  <div class="space-y-2">
    <code class="font-mono text-[0.65rem] text-ink-muted">dock bg-primary text-primary-content</code>
    <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm border-primary bg-primary text-primary-content">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
  </div>
  <div class="space-y-2">
    <code class="font-mono text-[0.65rem] text-ink-muted">dock bg-secondary text-secondary-content</code>
    <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm border-secondary bg-secondary text-secondary-content">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
  </div>
  <div class="space-y-2">
    <code class="font-mono text-[0.65rem] text-ink-muted">dock glass</code>
    <div class="rounded-box bg-gradient-to-br from-wash-blue/40 via-base-200 to-wash-rose/30 p-3">
      <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm glass border-base-content/10">
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>
    </div>
  </div>
</div>`

const colorsJsx = `<div className="flex flex-col gap-5">
  <div className="space-y-2">
    <code className="font-mono text-[0.65rem] text-ink-muted">dock bg-neutral text-neutral-content</code>
    <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm bg-neutral text-neutral-content border-neutral">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
  </div>
  <div className="space-y-2">
    <code className="font-mono text-[0.65rem] text-ink-muted">dock bg-primary text-primary-content</code>
    <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm border-primary bg-primary text-primary-content">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
  </div>
  <div className="space-y-2">
    <code className="font-mono text-[0.65rem] text-ink-muted">dock bg-secondary text-secondary-content</code>
    <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm border-secondary bg-secondary text-secondary-content">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
  </div>
  <div className="space-y-2">
    <code className="font-mono text-[0.65rem] text-ink-muted">dock glass</code>
    <div className="rounded-box bg-gradient-to-br from-wash-blue/40 via-base-200 to-wash-rose/30 p-3">
      <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm glass border-base-content/10">
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label">Home</span>
  </button>
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label">Settings</span>
  </button>
</div>
    </div>
  </div>
</div>`

const studioHtml = `<div class="w-full max-w-md space-y-3">
  <p class="rounded-box border border-ink-border/50 bg-base-200/40 px-4 py-3 text-sm text-ink-muted">
    Selected: <span class="font-medium text-base-content">Palette</span>
  </p>
  <div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" class="cursor-pointer dock-active" aria-current="page">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
    <span class="dock-label">Palette</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
    <span class="dock-label">Layers</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg>
    <span class="dock-label">Brushes</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
    <span class="dock-label">Calendar</span>
  </button>
  </div>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock + Lucide icons + dock-active (state)</code>
</p>`

const studioJsx = `<div className="w-full max-w-md space-y-3">
  <p className="rounded-box border border-ink-border/50 bg-base-200/40 px-4 py-3 text-sm text-ink-muted">
    Selected: <span className="font-medium text-base-content">Palette</span>
  </p>
  <div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm">
  <button type="button" className="cursor-pointer dock-active" aria-current="page">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
    <span className="dock-label">Palette</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
    <span className="dock-label">Layers</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg>
    <span className="dock-label">Brushes</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
    <span className="dock-label">Calendar</span>
  </button>
  </div>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock + Lucide icons + dock-active (state)</code>
</p>`

const placementHtml = `<ul class="list-inside list-disc space-y-2 text-sm text-ink-muted">
  <li>
    Default <span class="font-mono text-xs">dock</span> is
    <span class="font-mono text-xs">position: fixed</span> at the viewport bottom.
  </li>
  <li>
    Use <span class="font-mono text-xs">viewport-fit=cover</span> on iOS so safe-area insets apply.
  </li>
  <li>
    These wash-panel demos use <span class="font-mono text-xs">relative!</span> so they do not fight the studio drawer.
  </li>
</ul>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock (fixed) vs dock relative! (demo)</code>
</p>`

const placementJsx = `<ul className="list-inside list-disc space-y-2 text-sm text-ink-muted">
  <li>
    Default <span className="font-mono text-xs">dock</span> is
    <span className="font-mono text-xs">position: fixed</span> at the viewport bottom.
  </li>
  <li>
    Use <span className="font-mono text-xs">viewport-fit=cover</span> on iOS so safe-area insets apply.
  </li>
  <li>
    These wash-panel demos use <span className="font-mono text-xs">relative!</span> so they do not fight the studio drawer.
  </li>
</ul>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock (fixed) vs dock relative! (demo)</code>
</p>`

const responsiveHtml = `<div class="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm max-w-full">
  <button type="button" class="dock-active cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span class="dock-label hidden sm:inline">Home</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span class="dock-label hidden sm:inline">Inbox</span>
  </button>
  <button type="button" class="cursor-pointer">
    <svg class="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span class="dock-label hidden sm:inline">Settings</span>
  </button>
</div>
<p class="mt-3">
  <code class="font-mono text-[0.65rem] text-ink-muted">dock-label hidden sm:inline</code>
</p>`

const responsiveJsx = `<div className="dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm max-w-full">
  <button type="button" className="dock-active cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    <span className="dock-label hidden sm:inline">Home</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    <span className="dock-label hidden sm:inline">Inbox</span>
  </button>
  <button type="button" className="cursor-pointer">
    <svg className="size-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    <span className="dock-label hidden sm:inline">Settings</span>
  </button>
</div>
<p className="mt-3">
  <code className="font-mono text-[0.65rem] text-ink-muted">dock-label hidden sm:inline</code>
</p>`

export default function DockPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Dock
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">dock</span> bottom navigation bar: sizes, active state, colors, and a studio tool strip.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Icons and labels"
          description="Buttons inside dock"
        >
          <ShowcaseTabs
            preview={
              <>

              <DemoDock />
                        <p className="mt-3">
                          <ClassLabel value="dock + button + dock-label" />
                        </p>
            
              </>
            }
          
            html={basicHtml}
            jsx={basicJsx}
          />
        
        </Section>

        <Section
          eyebrow="02 · Active"
          title="Highlight one item"
          description="Add dock-active on the current destination"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                          <div className="space-y-2">
                            <ClassLabel value="dock-active on Home" />
                            <DemoDock active={0} />
                          </div>
                          <div className="space-y-2">
                            <ClassLabel value="dock-active on Inbox" />
                            <DemoDock active={1} />
                          </div>
                          <div className="space-y-2">
                            <ClassLabel value="dock-active on Settings" />
                            <DemoDock active={2} />
                          </div>
                        </div>
                        <p className="mt-3">
                          <ClassLabel value="button.dock-active" />
                        </p>
            
              </>
            }
          
            html={activeHtml}
            jsx={activeJsx}
          />
        
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="xs through xl"
          description="Size modifiers change bar height and label scale"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-col gap-5">
                          {sizes.map(({ name, className }) => (
                            <div key={name} className="space-y-2">
                              <ClassLabel value={`dock ${className}`} />
                              <DemoDock
                                className={className}
                                showLabels={name !== 'xs' && name !== 'sm'}
                              />
                            </div>
                          ))}
                        </div>
            
              </>
            }
          
          
            html={sizesHtml}
            jsx={sizesJsx}
          />
        
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic fills and glass"
          description="Override background and text with daisyUI color utilities"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-col gap-5">
                          <div className="space-y-2">
                            <ClassLabel value="dock bg-neutral text-neutral-content" />
                            <DemoDock className="bg-neutral text-neutral-content border-neutral" />
                          </div>
                          <div className="space-y-2">
                            <ClassLabel value="dock bg-primary text-primary-content" />
                            <DemoDock className="border-primary bg-primary text-primary-content" />
                          </div>
                          <div className="space-y-2">
                            <ClassLabel value="dock bg-secondary text-secondary-content" />
                            <DemoDock className="border-secondary bg-secondary text-secondary-content" />
                          </div>
                          <div className="space-y-2">
                            <ClassLabel value="dock glass" />
                            <div className="rounded-box bg-gradient-to-br from-wash-blue/40 via-base-200 to-wash-rose/30 p-3">
                              <DemoDock className="glass border-base-content/10" />
                            </div>
                          </div>
                        </div>
            
              </>
            }
          
            html={colorsHtml}
            jsx={colorsJsx}
          />
        
        </Section>

        <Section
          eyebrow="05 · Studio dock"
          title="Watercolor tools"
          description="Interactive dock for palette, layers, brushes"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <StudioDock />
                        <p className="mt-3">
                          <ClassLabel value="dock + Lucide icons + dock-active (state)" />
                        </p>
            
              </>
            }
          
            html={studioHtml}
            jsx={studioJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Placement note"
          title="Fixed in apps, relative in demos"
          description="Production docks stick to the screen bottom with safe-area padding"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <ul className="list-inside list-disc space-y-2 text-sm text-ink-muted">
                          <li>
                            Default <span className="font-mono text-xs">dock</span> is{' '}
                            <span className="font-mono text-xs">position: fixed</span> at the
                            viewport bottom.
                          </li>
                          <li>
                            Use{' '}
                            <span className="font-mono text-xs">
                              viewport-fit=cover
                            </span>{' '}
                            on iOS so safe-area insets apply.
                          </li>
                          <li>
                            These wash-panel demos use{' '}
                            <span className="font-mono text-xs">relative!</span> so they do not
                            fight the studio drawer.
                          </li>
                        </ul>
                        <p className="mt-3">
                          <ClassLabel value="dock (fixed) vs dock relative! (demo)" />
                        </p>
            
              </>
            }
          
            html={placementHtml}
            jsx={placementJsx}
          />
        
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Labels from sm up"
          description="Hide dock-label on very small widths"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className={`${dockDemo} max-w-full`}>
                          <button type="button" className="dock-active cursor-pointer">
                            <Home className="size-[1.2em]" strokeWidth={2} />
                            <span className="dock-label hidden sm:inline">Home</span>
                          </button>
                          <button type="button" className="cursor-pointer">
                            <Inbox className="size-[1.2em]" strokeWidth={2} />
                            <span className="dock-label hidden sm:inline">Inbox</span>
                          </button>
                          <button type="button" className="cursor-pointer">
                            <Settings className="size-[1.2em]" strokeWidth={2} />
                            <span className="dock-label hidden sm:inline">Settings</span>
                          </button>
                        </div>
                        <p className="mt-3">
                          <ClassLabel value="dock-label hidden sm:inline" />
                        </p>
            
              </>
            }
          
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        
        </Section>
      </div>
    </>
  )
}
