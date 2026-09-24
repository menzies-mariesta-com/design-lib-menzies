import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  Plus,
  Camera,
  Image,
  Mic,
  X,
  Pencil,
  Heart,
  Mail,
  FilePlus,
  List,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const colors = [
  { name: 'Default', btn: '', tip: '' },
  { name: 'Neutral', btn: 'btn-neutral', tip: 'tooltip-neutral' },
  { name: 'Primary', btn: 'btn-primary', tip: 'tooltip-primary' },
  { name: 'Secondary', btn: 'btn-secondary', tip: 'tooltip-secondary' },
  { name: 'Accent', btn: 'btn-accent', tip: 'tooltip-accent' },
  { name: 'Info', btn: 'btn-info', tip: 'tooltip-info' },
  { name: 'Success', btn: 'btn-success', tip: 'tooltip-success' },
  { name: 'Warning', btn: 'btn-warning', tip: 'tooltip-warning' },
  { name: 'Error', btn: 'btn-error', tip: 'tooltip-error' },
] as const

const sizes = [
  { name: 'XS', className: 'btn-xs' },
  { name: 'SM', className: 'btn-sm' },
  { name: 'MD', className: 'btn-md' },
  { name: 'LG', className: 'btn-lg' },
  { name: 'XL', className: 'btn-xl' },
] as const

const styles = [
  { name: 'Solid', className: '' },
  { name: 'Outline', className: 'btn-outline' },
  { name: 'Soft', className: 'btn-soft' },
  { name: 'Ghost', className: 'btn-ghost' },
  { name: 'Dash', className: 'btn-dash' },
] as const

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

/** Contain fixed FABs inside gallery panels via absolute override. */
function FabStage({
  children,
  className = '',
  hint = 'Click or focus the FAB',
}: {
  children: ReactNode
  className?: string
  hint?: string
}) {
  return (
    <div
      className={`relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40 ${className}`}
    >
      <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">{hint}</p>
      {children}
    </div>
  )
}

const fabPos = 'fab absolute! end-4 bottom-4 z-10'

const defaultHtml = `<div class="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10">
    <div class="tooltip tooltip-primary tooltip-left" data-tip="New">
      <button type="button" class="btn btn-lg btn-circle btn-primary cursor-pointer" aria-label="New"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
    </div>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-lg btn-circle btn-primary</code></p>`

const defaultJsx = `<div className="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10">
    <div className="tooltip tooltip-primary tooltip-left" data-tip="New">
      <button type="button" className="btn btn-lg btn-circle btn-primary cursor-pointer" aria-label="New"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
    </div>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-lg btn-circle btn-primary</code></p>`

const speedHtml = `<div class="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div class="tooltip tooltip-left" data-tip="Camera"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="Camera"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div class="tooltip tooltip-left" data-tip="Gallery"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="Gallery"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div class="tooltip tooltip-left" data-tip="Voice"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="Voice"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab + [tabindex] trigger + action buttons</code></p>`

const speedJsx = `<div className="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div className="tooltip tooltip-left" data-tip="Camera"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="Camera"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div className="tooltip tooltip-left" data-tip="Gallery"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="Gallery"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div className="tooltip tooltip-left" data-tip="Voice"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="Voice"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab + [tabindex] trigger + action buttons</code></p>`

const iconsSecHtml = `<div class="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-secondary tooltip tooltip-secondary tooltip-left cursor-pointer" data-tip="New" aria-label="New"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div class="tooltip tooltip-left" data-tip="Camera"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="Camera"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div class="tooltip tooltip-left" data-tip="Gallery"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="Gallery"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div class="tooltip tooltip-left" data-tip="Voice"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="Voice"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab + Lucide icons + tooltip</code></p>`

const iconsSecJsx = `<div className="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle btn-secondary tooltip tooltip-secondary tooltip-left cursor-pointer" data-tip="New" aria-label="New"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div className="tooltip tooltip-left" data-tip="Camera"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="Camera"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div className="tooltip tooltip-left" data-tip="Gallery"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="Gallery"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div className="tooltip tooltip-left" data-tip="Voice"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="Voice"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab + Lucide icons + tooltip</code></p>`

const labelsHtml = `<div class="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer" data-tip="Open" aria-label="Open">F</div>
    <div>Camera<button type="button" class="btn btn-lg btn-circle cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div>Gallery<button type="button" class="btn btn-lg btn-circle cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div>Voice<button type="button" class="btn btn-lg btn-circle cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab + label wrapper + btn-circle</code></p>`

const labelsJsx = `<div className="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer" data-tip="Open" aria-label="Open">F</div>
    <div>Camera<button type="button" className="btn btn-lg btn-circle cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div>Gallery<button type="button" className="btn btn-lg btn-circle cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div>Voice<button type="button" className="btn btn-lg btn-circle cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab + label wrapper + btn-circle</code></p>`

const rectHtml = `<div class="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-accent tooltip tooltip-accent tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <button type="button" class="btn btn-lg cursor-pointer">New wash</button>
    <button type="button" class="btn btn-lg cursor-pointer">Import plate</button>
    <button type="button" class="btn btn-lg cursor-pointer">Share series</button>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-lg (no circle on actions)</code></p>`

const rectJsx = `<div className="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle btn-accent tooltip tooltip-accent tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <button type="button" className="btn btn-lg cursor-pointer">New wash</button>
    <button type="button" className="btn btn-lg cursor-pointer">Import plate</button>
    <button type="button" className="btn btn-lg cursor-pointer">Share series</button>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-lg (no circle on actions)</code></p>`

const closeHtml = `<div class="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-info tooltip tooltip-info tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div class="fab-close">Close<span class="btn btn-circle btn-lg btn-error cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span></div>
    <div>Camera<button type="button" class="btn btn-lg btn-circle cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div>Gallery<button type="button" class="btn btn-lg btn-circle cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div>Voice<button type="button" class="btn btn-lg btn-circle cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab + fab-close + btn-error</code></p>`

const closeJsx = `<div className="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle btn-info tooltip tooltip-info tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div className="fab-close">Close<span className="btn btn-circle btn-lg btn-error cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span></div>
    <div>Camera<button type="button" className="btn btn-lg btn-circle cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div>Gallery<button type="button" className="btn btn-lg btn-circle cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div>Voice<button type="button" className="btn btn-lg btn-circle cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab + fab-close + btn-error</code></p>`

const mainHtml = `<div class="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div class="fab-main-action">Compose<button type="button" class="btn btn-circle btn-secondary btn-lg cursor-pointer" aria-label="Compose"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></button></div>
    <div>Camera<button type="button" class="btn btn-lg btn-circle cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div>Gallery<button type="button" class="btn btn-lg btn-circle cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div>File<button type="button" class="btn btn-lg btn-circle cursor-pointer"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M9 15h6"/><path d="M12 18v-6"/></svg></button></div>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab + fab-main-action</code></p>`

const mainJsx = `<div className="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div className="fab-main-action">Compose<button type="button" className="btn btn-circle btn-secondary btn-lg cursor-pointer" aria-label="Compose"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></button></div>
    <div>Camera<button type="button" className="btn btn-lg btn-circle cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div>Gallery<button type="button" className="btn btn-lg btn-circle cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div>File<button type="button" className="btn btn-lg btn-circle cursor-pointer"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M9 15h6"/><path d="M12 18v-6"/></svg></button></div>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab + fab-main-action</code></p>`

const flowerHtml = `<div class="relative h-64 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Flower opens into a quarter circle</p>
  <div class="fab absolute! end-4 bottom-4 z-10 fab-flower">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <button type="button" class="fab-main-action btn btn-circle btn-lg cursor-pointer" aria-label="Main">M</button>
    <button type="button" class="btn btn-lg btn-circle cursor-pointer">A</button>
    <button type="button" class="btn btn-lg btn-circle cursor-pointer">B</button>
    <button type="button" class="btn btn-lg btn-circle cursor-pointer">C</button>
    <button type="button" class="btn btn-lg btn-circle cursor-pointer">D</button>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab fab-flower + fab-main-action</code></p>`

const flowerJsx = `<div className="relative h-64 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Flower opens into a quarter circle</p>
  <div className="fab absolute! end-4 bottom-4 z-10 fab-flower">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <button type="button" className="fab-main-action btn btn-circle btn-lg cursor-pointer" aria-label="Main">M</button>
    <button type="button" className="btn btn-lg btn-circle cursor-pointer">A</button>
    <button type="button" className="btn btn-lg btn-circle cursor-pointer">B</button>
    <button type="button" className="btn btn-lg btn-circle cursor-pointer">C</button>
    <button type="button" className="btn btn-lg btn-circle cursor-pointer">D</button>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab fab-flower + fab-main-action</code></p>`

const flowerOnlyHtml = `<div class="relative h-64 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10 fab-flower">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <button type="button" class="btn btn-lg btn-circle cursor-pointer">A</button>
    <button type="button" class="btn btn-lg btn-circle cursor-pointer">B</button>
    <button type="button" class="btn btn-lg btn-circle cursor-pointer">C</button>
    <button type="button" class="btn btn-lg btn-circle cursor-pointer">D</button>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab fab-flower (no fab-main-action)</code></p>`

const flowerOnlyJsx = `<div className="relative h-64 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10 fab-flower">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer" data-tip="Open" aria-label="Open"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <button type="button" className="btn btn-lg btn-circle cursor-pointer">A</button>
    <button type="button" className="btn btn-lg btn-circle cursor-pointer">B</button>
    <button type="button" className="btn btn-lg btn-circle cursor-pointer">C</button>
    <button type="button" className="btn btn-lg btn-circle cursor-pointer">D</button>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab fab-flower (no fab-main-action)</code></p>`

const flowerIconsHtml = `<div class="relative h-64 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10 fab-flower">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle tooltip tooltip-left cursor-pointer" data-tip="New" aria-label="New"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <button type="button" class="fab-main-action btn btn-circle btn-lg btn-primary cursor-pointer" aria-label="Compose"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></button>
    <div class="tooltip tooltip-left" data-tip="Camera"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="Camera"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div class="tooltip tooltip-left" data-tip="List"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="List"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg></button></div>
    <div class="tooltip tooltip-left" data-tip="Gallery"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="Gallery"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div class="tooltip tooltip-left" data-tip="Voice"><button type="button" class="btn btn-lg btn-circle cursor-pointer" aria-label="Voice"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab fab-flower + tooltip tooltip-left</code></p>`

const flowerIconsJsx = `<div className="relative h-64 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10 fab-flower">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle tooltip tooltip-left cursor-pointer" data-tip="New" aria-label="New"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <button type="button" className="fab-main-action btn btn-circle btn-lg btn-primary cursor-pointer" aria-label="Compose"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></button>
    <div className="tooltip tooltip-left" data-tip="Camera"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="Camera"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button></div>
    <div className="tooltip tooltip-left" data-tip="List"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="List"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg></button></div>
    <div className="tooltip tooltip-left" data-tip="Gallery"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="Gallery"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button></div>
    <div className="tooltip tooltip-left" data-tip="Voice"><button type="button" className="btn btn-lg btn-circle cursor-pointer" aria-label="Voice"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button></div>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab fab-flower + tooltip tooltip-left</code></p>`

const colorsHtml = `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
<div class="flex flex-col gap-2">
  <div class="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Default</p>
  <div class="fab absolute! end-4 bottom-4 z-10"><div class="tooltip tooltip-left" data-tip="Default"><button type="button" class="btn btn-circle btn-lg cursor-pointer" aria-label="Default"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle</code>
</div>
<div class="flex flex-col gap-2">
  <div class="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Neutral</p>
  <div class="fab absolute! end-4 bottom-4 z-10"><div class="tooltip tooltip-left tooltip-neutral" data-tip="Neutral"><button type="button" class="btn btn-circle btn-lg cursor-pointer btn-neutral" aria-label="Neutral"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-neutral</code>
</div>
<div class="flex flex-col gap-2">
  <div class="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Primary</p>
  <div class="fab absolute! end-4 bottom-4 z-10"><div class="tooltip tooltip-left tooltip-primary" data-tip="Primary"><button type="button" class="btn btn-circle btn-lg cursor-pointer btn-primary" aria-label="Primary"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-primary</code>
</div>
<div class="flex flex-col gap-2">
  <div class="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Secondary</p>
  <div class="fab absolute! end-4 bottom-4 z-10"><div class="tooltip tooltip-left tooltip-secondary" data-tip="Secondary"><button type="button" class="btn btn-circle btn-lg cursor-pointer btn-secondary" aria-label="Secondary"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-secondary</code>
</div>
<div class="flex flex-col gap-2">
  <div class="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Accent</p>
  <div class="fab absolute! end-4 bottom-4 z-10"><div class="tooltip tooltip-left tooltip-accent" data-tip="Accent"><button type="button" class="btn btn-circle btn-lg cursor-pointer btn-accent" aria-label="Accent"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-accent</code>
</div>
<div class="flex flex-col gap-2">
  <div class="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Info</p>
  <div class="fab absolute! end-4 bottom-4 z-10"><div class="tooltip tooltip-left tooltip-info" data-tip="Info"><button type="button" class="btn btn-circle btn-lg cursor-pointer btn-info" aria-label="Info"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-info</code>
</div>
<div class="flex flex-col gap-2">
  <div class="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Success</p>
  <div class="fab absolute! end-4 bottom-4 z-10"><div class="tooltip tooltip-left tooltip-success" data-tip="Success"><button type="button" class="btn btn-circle btn-lg cursor-pointer btn-success" aria-label="Success"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-success</code>
</div>
<div class="flex flex-col gap-2">
  <div class="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Warning</p>
  <div class="fab absolute! end-4 bottom-4 z-10"><div class="tooltip tooltip-left tooltip-warning" data-tip="Warning"><button type="button" class="btn btn-circle btn-lg cursor-pointer btn-warning" aria-label="Warning"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-warning</code>
</div>
<div class="flex flex-col gap-2">
  <div class="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Error</p>
  <div class="fab absolute! end-4 bottom-4 z-10"><div class="tooltip tooltip-left tooltip-error" data-tip="Error"><button type="button" class="btn btn-circle btn-lg cursor-pointer btn-error" aria-label="Error"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code class="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-error</code>
</div>
</div>`

const colorsJsx = `<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
<div className="flex flex-col gap-2">
  <div className="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Default</p>
  <div className="fab absolute! end-4 bottom-4 z-10"><div className="tooltip tooltip-left" data-tip="Default"><button type="button" className="btn btn-circle btn-lg cursor-pointer" aria-label="Default"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle</code>
</div>
<div className="flex flex-col gap-2">
  <div className="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Neutral</p>
  <div className="fab absolute! end-4 bottom-4 z-10"><div className="tooltip tooltip-left tooltip-neutral" data-tip="Neutral"><button type="button" className="btn btn-circle btn-lg cursor-pointer btn-neutral" aria-label="Neutral"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-neutral</code>
</div>
<div className="flex flex-col gap-2">
  <div className="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Primary</p>
  <div className="fab absolute! end-4 bottom-4 z-10"><div className="tooltip tooltip-left tooltip-primary" data-tip="Primary"><button type="button" className="btn btn-circle btn-lg cursor-pointer btn-primary" aria-label="Primary"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-primary</code>
</div>
<div className="flex flex-col gap-2">
  <div className="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Secondary</p>
  <div className="fab absolute! end-4 bottom-4 z-10"><div className="tooltip tooltip-left tooltip-secondary" data-tip="Secondary"><button type="button" className="btn btn-circle btn-lg cursor-pointer btn-secondary" aria-label="Secondary"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-secondary</code>
</div>
<div className="flex flex-col gap-2">
  <div className="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Accent</p>
  <div className="fab absolute! end-4 bottom-4 z-10"><div className="tooltip tooltip-left tooltip-accent" data-tip="Accent"><button type="button" className="btn btn-circle btn-lg cursor-pointer btn-accent" aria-label="Accent"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-accent</code>
</div>
<div className="flex flex-col gap-2">
  <div className="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Info</p>
  <div className="fab absolute! end-4 bottom-4 z-10"><div className="tooltip tooltip-left tooltip-info" data-tip="Info"><button type="button" className="btn btn-circle btn-lg cursor-pointer btn-info" aria-label="Info"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-info</code>
</div>
<div className="flex flex-col gap-2">
  <div className="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Success</p>
  <div className="fab absolute! end-4 bottom-4 z-10"><div className="tooltip tooltip-left tooltip-success" data-tip="Success"><button type="button" className="btn btn-circle btn-lg cursor-pointer btn-success" aria-label="Success"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-success</code>
</div>
<div className="flex flex-col gap-2">
  <div className="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Warning</p>
  <div className="fab absolute! end-4 bottom-4 z-10"><div className="tooltip tooltip-left tooltip-warning" data-tip="Warning"><button type="button" className="btn btn-circle btn-lg cursor-pointer btn-warning" aria-label="Warning"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-warning</code>
</div>
<div className="flex flex-col gap-2">
  <div className="relative h-36 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Error</p>
  <div className="fab absolute! end-4 bottom-4 z-10"><div className="tooltip tooltip-left tooltip-error" data-tip="Error"><button type="button" className="btn btn-circle btn-lg cursor-pointer btn-error" aria-label="Error"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
</div>
  <code className="font-mono text-[0.65rem] text-ink-muted">fab + btn btn-circle btn-error</code>
</div>
</div>`

const sizesHtml = `<div class="flex flex-wrap items-end gap-4">
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-primary" data-tip="XS">
    <button type="button" class="btn btn-circle btn-primary cursor-pointer btn-xs" aria-label="XS"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-xs</code>
</div>
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-primary" data-tip="SM">
    <button type="button" class="btn btn-circle btn-primary cursor-pointer btn-sm" aria-label="SM"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-sm</code>
</div>
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-primary" data-tip="MD">
    <button type="button" class="btn btn-circle btn-primary cursor-pointer btn-md" aria-label="MD"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-md</code>
</div>
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-primary" data-tip="LG">
    <button type="button" class="btn btn-circle btn-primary cursor-pointer btn-lg" aria-label="LG"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-lg</code>
</div>
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-primary" data-tip="XL">
    <button type="button" class="btn btn-circle btn-primary cursor-pointer btn-xl" aria-label="XL"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-xl</code>
</div>
</div>`

const sizesJsx = `<div className="flex flex-wrap items-end gap-4">
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-primary" data-tip="XS">
    <button type="button" className="btn btn-circle btn-primary cursor-pointer btn-xs" aria-label="XS"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-xs</code>
</div>
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-primary" data-tip="SM">
    <button type="button" className="btn btn-circle btn-primary cursor-pointer btn-sm" aria-label="SM"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-sm</code>
</div>
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-primary" data-tip="MD">
    <button type="button" className="btn btn-circle btn-primary cursor-pointer btn-md" aria-label="MD"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-md</code>
</div>
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-primary" data-tip="LG">
    <button type="button" className="btn btn-circle btn-primary cursor-pointer btn-lg" aria-label="LG"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-lg</code>
</div>
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-primary" data-tip="XL">
    <button type="button" className="btn btn-circle btn-primary cursor-pointer btn-xl" aria-label="XL"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-xl</code>
</div>
</div>`

const stylesHtml = `<div class="flex flex-wrap items-end gap-4">
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-secondary" data-tip="Solid">
    <button type="button" class="btn btn-circle btn-lg btn-secondary cursor-pointer" aria-label="Solid"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary</code>
</div>
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-secondary" data-tip="Outline">
    <button type="button" class="btn btn-circle btn-lg btn-secondary cursor-pointer btn-outline" aria-label="Outline"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary btn-outline</code>
</div>
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-secondary" data-tip="Soft">
    <button type="button" class="btn btn-circle btn-lg btn-secondary cursor-pointer btn-soft" aria-label="Soft"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary btn-soft</code>
</div>
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-secondary" data-tip="Ghost">
    <button type="button" class="btn btn-circle btn-lg btn-secondary cursor-pointer btn-ghost" aria-label="Ghost"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary btn-ghost</code>
</div>
<div class="flex flex-col items-center gap-2">
  <div class="tooltip tooltip-secondary" data-tip="Dash">
    <button type="button" class="btn btn-circle btn-lg btn-secondary cursor-pointer btn-dash" aria-label="Dash"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code class="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary btn-dash</code>
</div>
</div>`

const stylesJsx = `<div className="flex flex-wrap items-end gap-4">
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-secondary" data-tip="Solid">
    <button type="button" className="btn btn-circle btn-lg btn-secondary cursor-pointer" aria-label="Solid"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary</code>
</div>
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-secondary" data-tip="Outline">
    <button type="button" className="btn btn-circle btn-lg btn-secondary cursor-pointer btn-outline" aria-label="Outline"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary btn-outline</code>
</div>
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-secondary" data-tip="Soft">
    <button type="button" className="btn btn-circle btn-lg btn-secondary cursor-pointer btn-soft" aria-label="Soft"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary btn-soft</code>
</div>
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-secondary" data-tip="Ghost">
    <button type="button" className="btn btn-circle btn-lg btn-secondary cursor-pointer btn-ghost" aria-label="Ghost"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary btn-ghost</code>
</div>
<div className="flex flex-col items-center gap-2">
  <div className="tooltip tooltip-secondary" data-tip="Dash">
    <button type="button" className="btn btn-circle btn-lg btn-secondary cursor-pointer btn-dash" aria-label="Dash"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
  </div>
  <code className="font-mono text-[0.65rem] text-ink-muted">btn btn-circle btn-secondary btn-dash</code>
</div>
</div>`

const mixedHtml = `<div class="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p class="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div class="fab absolute! end-4 bottom-4 z-10">
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-neutral tooltip tooltip-neutral tooltip-left cursor-pointer" data-tip="Actions" aria-label="Actions"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div class="tooltip tooltip-info tooltip-left" data-tip="Mail"><button type="button" class="btn btn-lg btn-circle btn-info cursor-pointer" aria-label="Mail"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg></button></div>
    <div class="tooltip tooltip-warning tooltip-left" data-tip="Favorite"><button type="button" class="btn btn-lg btn-circle btn-warning cursor-pointer" aria-label="Favorite"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button></div>
    <div class="tooltip tooltip-error tooltip-left" data-tip="Close menu"><button type="button" class="btn btn-lg btn-circle btn-error cursor-pointer" aria-label="Close menu"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button></div>
  </div>
</div>
<p class="mt-3"><code class="font-mono text-[0.65rem] text-ink-muted">fab + btn-info / btn-warning / btn-error actions</code></p>`

const mixedJsx = `<div className="relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40">
  <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">Click or focus the FAB</p>
  <div className="fab absolute! end-4 bottom-4 z-10">
    <div tabIndex="0" role="button" className="btn btn-lg btn-circle btn-neutral tooltip tooltip-neutral tooltip-left cursor-pointer" data-tip="Actions" aria-label="Actions"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></div>
    <div className="tooltip tooltip-info tooltip-left" data-tip="Mail"><button type="button" className="btn btn-lg btn-circle btn-info cursor-pointer" aria-label="Mail"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg></button></div>
    <div className="tooltip tooltip-warning tooltip-left" data-tip="Favorite"><button type="button" className="btn btn-lg btn-circle btn-warning cursor-pointer" aria-label="Favorite"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button></div>
    <div className="tooltip tooltip-error tooltip-left" data-tip="Close menu"><button type="button" className="btn btn-lg btn-circle btn-error cursor-pointer" aria-label="Close menu"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button></div>
  </div>
</div>
<p className="mt-3"><code className="font-mono text-[0.65rem] text-ink-muted">fab + btn-info / btn-warning / btn-error actions</code></p>`

export default function FabPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          FAB
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">fab</span> floating action buttons and speed dials: vertical, flower, close, and main.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Single FAB"
          description="One circle button in the corner. No speed dial"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div className="tooltip tooltip-primary tooltip-left" data-tip="New">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle btn-primary cursor-pointer"
                                aria-label="New"
                              >
                                <Plus className="size-6" strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + btn btn-lg btn-circle btn-primary" />
                        </p>
            
              </>
            }
          
            html={defaultHtml}
            jsx={defaultJsx}
          />
        
        </Section>

        <Section
          eyebrow="02 · Speed dial"
          title="Vertical speed dial"
          description="Focusable trigger opens additional circle actions upward"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Camera">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Camera"
                              >
                                <Camera className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Gallery">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Gallery"
                              >
                                <Image className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Voice">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Voice"
                              >
                                <Mic className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + [tabindex] trigger + action buttons" />
                        </p>
            
              </>
            }
          
            html={speedHtml}
            jsx={speedJsx}
          />
        
        </Section>

        <Section
          eyebrow="03 · Icons"
          title="Speed dial with Lucide icons"
          description="Secondary trigger and icon-only actions with matching tooltips"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-secondary tooltip tooltip-secondary tooltip-left cursor-pointer"
                              data-tip="New"
                              aria-label="New"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Camera">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Camera"
                              >
                                <Camera className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Gallery">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Gallery"
                              >
                                <Image className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Voice">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Voice"
                              >
                                <Mic className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + Lucide icons + tooltip" />
                        </p>
            
              </>
            }
          
            html={iconsSecHtml}
            jsx={iconsSecJsx}
          />
        
        </Section>

        <Section
          eyebrow="04 · Labels"
          title="Speed dial with text labels"
          description="Label wrappers sit beside each action button"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              F
                            </div>
                            <div>
                              Camera
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Camera className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Gallery
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Image className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Voice
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Mic className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + label wrapper + btn-circle" />
                        </p>
            
              </>
            }
          
            html={labelsHtml}
            jsx={labelsJsx}
          />
        
        </Section>

        <Section
          eyebrow="05 · Rectangle"
          title="Rectangle action buttons"
          description="Drop btn-circle on actions for wider text buttons"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-accent tooltip tooltip-accent tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <button type="button" className="btn btn-lg cursor-pointer">
                              New wash
                            </button>
                            <button type="button" className="btn btn-lg cursor-pointer">
                              Import plate
                            </button>
                            <button type="button" className="btn btn-lg cursor-pointer">
                              Share series
                            </button>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + btn btn-lg (no circle on actions)" />
                        </p>
            
              </>
            }
          
            html={rectHtml}
            jsx={rectJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Close"
          title="fab-close replacement"
          description="When open, the trigger fades and a close control appears"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-info tooltip tooltip-info tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="fab-close">
                              Close
                              <span className="btn btn-circle btn-lg btn-error cursor-pointer">
                                <X className="size-5" strokeWidth={2} aria-hidden />
                              </span>
                            </div>
                            <div>
                              Camera
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Camera className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Gallery
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Image className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Voice
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Mic className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + fab-close + btn-error" />
                        </p>
            
              </>
            }
          
            html={closeHtml}
            jsx={closeJsx}
          />
        
        </Section>

        <Section
          eyebrow="07 · Main action"
          title="fab-main-action replacement"
          description="Open state swaps the trigger for a primary action (not both"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="fab-main-action">
                              Compose
                              <button
                                type="button"
                                className="btn btn-circle btn-secondary btn-lg cursor-pointer"
                                aria-label="Compose"
                              >
                                <Pencil className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Camera
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Camera className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Gallery
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Image className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              File
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <FilePlus className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + fab-main-action" />
                        </p>
            
              </>
            }
          
            html={mainHtml}
            jsx={mainJsx}
          />
        
        </Section>

        <Section
          eyebrow="08 · Flower"
          title="fab-flower quarter circle"
          description="Actions fan into an arc instead of a vertical stack"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage className="h-64" hint="Flower opens into a quarter circle">
                          <div className={`${fabPos} fab-flower`}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <button
                              type="button"
                              className="fab-main-action btn btn-circle btn-lg cursor-pointer"
                              aria-label="Main"
                            >
                              M
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              A
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              B
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              C
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              D
                            </button>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab fab-flower + fab-main-action" />
                        </p>
            
              </>
            }
          
            html={flowerHtml}
            jsx={flowerJsx}
          />
        
        </Section>

        <Section
          eyebrow="09 · Flower only"
          title="Flower without main action"
          description="Without fab-main-action, the first action also sits on the arc"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage className="h-64">
                          <div className={`${fabPos} fab-flower`}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              A
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              B
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              C
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              D
                            </button>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab fab-flower (no fab-main-action)" />
                        </p>
            
              </>
            }
          
            html={flowerOnlyHtml}
            jsx={flowerOnlyJsx}
          />
        
        </Section>

        <Section
          eyebrow="10 · Flower icons"
          title="Flower with icons and tooltips"
          description="Quarter circle has no room for text labels; use tooltip-left"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage className="h-64">
                          <div className={`${fabPos} fab-flower`}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle tooltip tooltip-left cursor-pointer"
                              data-tip="New"
                              aria-label="New"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <button
                              type="button"
                              className="fab-main-action btn btn-circle btn-lg btn-primary cursor-pointer"
                              aria-label="Compose"
                            >
                              <Pencil className="size-5" strokeWidth={1.75} />
                            </button>
                            <div className="tooltip tooltip-left" data-tip="Camera">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Camera"
                              >
                                <Camera className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="List">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="List"
                              >
                                <List className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Gallery">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Gallery"
                              >
                                <Image className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Voice">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Voice"
                              >
                                <Mic className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab fab-flower + tooltip tooltip-left" />
                        </p>
            
              </>
            }
          
            html={flowerIconsHtml}
            jsx={flowerIconsJsx}
          />
        
        </Section>

        <Section
          eyebrow="11 · Colors"
          title="Semantic FAB colors"
          description="Color comes from nested btn classes, not fab itself"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {colors.map((c) => (
                            <div key={c.name} className="flex flex-col gap-2">
                              <FabStage className="h-36" hint={c.name}>
                                <div className={fabPos}>
                                  <div
                                    className={`tooltip tooltip-left ${c.tip}`}
                                    data-tip={c.name}
                                  >
                                    <button
                                      type="button"
                                      className={`btn btn-circle btn-lg cursor-pointer ${c.btn}`}
                                      aria-label={c.name}
                                    >
                                      <Plus className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              </FabStage>
                              <ClassLabel
                                value={
                                  c.btn
                                    ? `fab + btn btn-circle ${c.btn}`
                                    : 'fab + btn btn-circle'
                                }
                              />
                            </div>
                          ))}
                        </div>
            
              </>
            }
          
          
            html={colorsHtml}
            jsx={colorsJsx}
          />
        
        </Section>

        <Section
          eyebrow="12 · Sizes"
          title="Button size scale"
          description="FAB actions inherit btn size modifiers"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-end gap-4">
                          {sizes.map((s) => (
                            <div key={s.name} className="flex flex-col items-center gap-2">
                              <div className="tooltip tooltip-primary" data-tip={s.name}>
                                <button
                                  type="button"
                                  className={`btn btn-circle btn-primary cursor-pointer ${s.className}`}
                                  aria-label={s.name}
                                >
                                  <Plus className="size-4" strokeWidth={2} />
                                </button>
                              </div>
                              <ClassLabel value={`btn btn-circle ${s.className}`} />
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
          eyebrow="13 · Styles"
          title="Style variants on FAB triggers"
          description="Outline, soft, ghost, and dash on circle FAB buttons"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-end gap-4">
                          {styles.map((style) => (
                            <div key={style.name} className="flex flex-col items-center gap-2">
                              <div className="tooltip tooltip-secondary" data-tip={style.name}>
                                <button
                                  type="button"
                                  className={`btn btn-circle btn-lg btn-secondary cursor-pointer ${style.className}`}
                                  aria-label={style.name}
                                >
                                  <Heart className="size-5" strokeWidth={1.75} />
                                </button>
                              </div>
                              <ClassLabel
                                value={
                                  style.className
                                    ? `btn btn-circle btn-secondary ${style.className}`
                                    : 'btn btn-circle btn-secondary'
                                }
                              />
                            </div>
                          ))}
                        </div>
            
              </>
            }
          
          
            html={stylesHtml}
            jsx={stylesJsx}
          />
        
        </Section>

        <Section
          eyebrow="14 · Mixed palette"
          title="Colored speed dial actions"
          description="Each dial action can use its own semantic color"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-neutral tooltip tooltip-neutral tooltip-left cursor-pointer"
                              data-tip="Actions"
                              aria-label="Actions"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="tooltip tooltip-info tooltip-left" data-tip="Mail">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle btn-info cursor-pointer"
                                aria-label="Mail"
                              >
                                <Mail className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-warning tooltip-left" data-tip="Favorite">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle btn-warning cursor-pointer"
                                aria-label="Favorite"
                              >
                                <Heart className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-error tooltip-left" data-tip="Close menu">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle btn-error cursor-pointer"
                                aria-label="Close menu"
                              >
                                <X className="size-5" strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + btn-info / btn-warning / btn-error actions" />
                        </p>
            
              </>
            }
          
            html={mixedHtml}
            jsx={mixedJsx}
          />
        
        </Section>
      </div>
    </>
  )
}
