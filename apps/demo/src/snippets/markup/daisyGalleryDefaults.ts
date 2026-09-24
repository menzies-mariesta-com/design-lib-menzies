/**
 * Full gallery paste defaults for pages that still had stub HTML.
 * Used when wiring ShowcaseTabs html/jsx; Svelte is derived via wrapDaisyAsSvelte.
 */
export const daisyAlertHtml = `<div class="grid gap-4">
  <div role="alert" class="alert alert-info"><span>New software update available.</span></div>
  <div role="alert" class="alert alert-success"><span>Your purchase has been confirmed!</span></div>
  <div role="alert" class="alert alert-warning"><span>Warning: Invalid email address!</span></div>
  <div role="alert" class="alert alert-error"><span>Error! Task failed successfully.</span></div>
</div>`

export const daisyBadgeHtml = `<div class="flex flex-wrap gap-2">
  <span class="badge">Default</span>
  <span class="badge badge-primary">Primary</span>
  <span class="badge badge-secondary">Secondary</span>
  <span class="badge badge-accent">Accent</span>
  <span class="badge badge-ghost">Ghost</span>
  <span class="badge badge-outline badge-primary">Outline</span>
</div>`

export const daisyAvatarHtml = `<div class="flex items-center gap-4">
  <div class="avatar"><div class="w-16 rounded-full"><img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" /></div></div>
  <div class="avatar placeholder"><div class="bg-neutral text-neutral-content w-16 rounded-full"><span>WY</span></div></div>
</div>`

export const daisyCardHtml = `<div class="card w-full max-w-sm bg-base-100 shadow-[var(--shadow-paper-md)]">
  <div class="card-body">
    <h2 class="card-title text-primary font-bold">Coastal fog</h2>
    <p class="text-sm text-base-content/70">A soft wash plate ready for review.</p>
    <div class="card-actions justify-end"><button type="button" class="btn btn-primary cursor-pointer">Open</button></div>
  </div>
</div>`

export const daisyChipHtml = `<div class="flex flex-wrap gap-2">
  <div class="badge badge-lg gap-2">Ultramarine<button type="button" class="cursor-pointer" aria-label="Remove">×</button></div>
  <div class="badge badge-lg badge-primary gap-2">Viridian<button type="button" class="cursor-pointer" aria-label="Remove">×</button></div>
</div>`

export const daisyGenericHtml = `<div class="rounded-box border border-ink-border bg-base-100 p-4">
  <p class="text-sm">Gallery section sample. Mirror the Preview classes.</p>
  <button type="button" class="btn btn-primary btn-sm mt-3 cursor-pointer">Action</button>
</div>`

export function daisyToJsx(html: string): string {
  return html.replace(/class=/g, 'className=')
}
