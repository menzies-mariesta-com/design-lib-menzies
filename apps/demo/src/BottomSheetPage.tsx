import type { FormEvent, ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { X } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const basicHtml = "<button type=\"button\" class=\"btn btn-primary cursor-pointer\" onclick=\"document.getElementById('bs-basic').showModal()\">\n  Open bottom sheet\n</button>\n<dialog id=\"bs-basic\" class=\"modal modal-bottom\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Wash notes</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">A bottom sheet anchors to the lower edge with rounded top corners. Press Escape or use Close.</p>\n    <div class=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" class=\"btn cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n</dialog>"

const basicJsx = "<button type=\"button\" className=\"btn btn-primary cursor-pointer\" onClick={() => document.getElementById('bs-basic')?.showModal()}>\n  Open bottom sheet\n</button>\n<dialog id=\"bs-basic\" className=\"modal modal-bottom\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Wash notes</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">A bottom sheet anchors to the lower edge with rounded top corners. Press Escape or use Close.</p>\n    <div className=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" className=\"btn cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n</dialog>"

const backdropHtml = "<button type=\"button\" class=\"btn btn-secondary cursor-pointer\" onclick=\"document.getElementById('bs-backdrop').showModal()\">\n  Open with backdrop dismiss\n</button>\n<dialog id=\"bs-backdrop\" class=\"modal modal-bottom\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Tap outside</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Escape, backdrop click, or the button below will close this sheet.</p>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\">\n    <button type=\"submit\" class=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const backdropJsx = "<button type=\"button\" className=\"btn btn-secondary cursor-pointer\" onClick={() => document.getElementById('bs-backdrop')?.showModal()}>\n  Open with backdrop dismiss\n</button>\n<dialog id=\"bs-backdrop\" className=\"modal modal-bottom\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Tap outside</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Escape, backdrop click, or the button below will close this sheet.</p>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\">\n    <button type=\"submit\" className=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const cornerHtml = "<button type=\"button\" class=\"btn btn-accent cursor-pointer\" onclick=\"document.getElementById('bs-corner').showModal()\">\n  Open with corner close\n</button>\n<dialog id=\"bs-corner\" class=\"modal modal-bottom\">\n  <div class=\"modal-box\">\n    <form method=\"dialog\">\n      <button type=\"submit\" class=\"btn btn-sm btn-circle btn-ghost absolute end-2 top-2 cursor-pointer\" aria-label=\"Close\">\n        <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>\n      </button>\n    </form>\n    <h3 class=\"font-display text-lg font-bold\">Corner dismiss</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Use the X, Escape, or click outside.</p>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\">\n    <button type=\"submit\" class=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const cornerJsx = "<button type=\"button\" className=\"btn btn-accent cursor-pointer\" onClick={() => document.getElementById('bs-corner')?.showModal()}>\n  Open with corner close\n</button>\n<dialog id=\"bs-corner\" className=\"modal modal-bottom\">\n  <div className=\"modal-box\">\n    <form method=\"dialog\">\n      <button type=\"submit\" className=\"btn btn-sm btn-circle btn-ghost absolute end-2 top-2 cursor-pointer\" aria-label=\"Close\">\n        <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>\n      </button>\n    </form>\n    <h3 className=\"font-display text-lg font-bold\">Corner dismiss</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Use the X, Escape, or click outside.</p>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\">\n    <button type=\"submit\" className=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const heightsHtml = "<div class=\"flex flex-wrap gap-2\">\n  <button type=\"button\" class=\"btn btn-outline cursor-pointer\" onclick=\"document.getElementById('bs-short').showModal()\">Short</button>\n  <button type=\"button\" class=\"btn btn-outline cursor-pointer\" onclick=\"document.getElementById('bs-half').showModal()\">Half</button>\n  <button type=\"button\" class=\"btn btn-outline cursor-pointer\" onclick=\"document.getElementById('bs-tall').showModal()\">Tall</button>\n</div>\n\n<dialog id=\"bs-short\" class=\"modal modal-bottom\">\n  <div class=\"modal-box h-40 max-h-40\">\n    <h3 class=\"font-display text-lg font-bold\">Short sheet</h3>\n    <p class=\"pt-2 text-sm text-ink-muted\">Fixed low height for quick confirmations.</p>\n    <div class=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" class=\"btn btn-sm cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\">\n    <button type=\"submit\" class=\"cursor-pointer\">close</button>\n  </form>\n</dialog>\n\n<dialog id=\"bs-half\" class=\"modal modal-bottom\">\n  <div class=\"modal-box h-[50vh]\">\n    <h3 class=\"font-display text-lg font-bold\">Half height</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">About half the viewport. Useful for filters and pickers.</p>\n    <div class=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" class=\"btn cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\">\n    <button type=\"submit\" class=\"cursor-pointer\">close</button>\n  </form>\n</dialog>\n\n<dialog id=\"bs-tall\" class=\"modal modal-bottom\">\n  <div class=\"modal-box h-[85vh] max-h-[calc(100vh-5em)]\">\n    <h3 class=\"font-display text-lg font-bold\">Tall sheet</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Near full height for longer content. Scrolls inside modal-box.</p>\n    <ul class=\"menu rounded-box bg-base-200 text-sm\">\n        <li><span class=\"cursor-default\">Layer wash 1</span></li>\n        <li><span class=\"cursor-default\">Layer wash 2</span></li>\n        <li><span class=\"cursor-default\">Layer wash 3</span></li>\n        <li><span class=\"cursor-default\">Layer wash 4</span></li>\n        <li><span class=\"cursor-default\">Layer wash 5</span></li>\n        <li><span class=\"cursor-default\">Layer wash 6</span></li>\n        <li><span class=\"cursor-default\">Layer wash 7</span></li>\n        <li><span class=\"cursor-default\">Layer wash 8</span></li>\n        <li><span class=\"cursor-default\">Layer wash 9</span></li>\n        <li><span class=\"cursor-default\">Layer wash 10</span></li>\n        <li><span class=\"cursor-default\">Layer wash 11</span></li>\n        <li><span class=\"cursor-default\">Layer wash 12</span></li>\n    </ul>\n    <div class=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" class=\"btn cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\">\n    <button type=\"submit\" class=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const heightsJsx = "<div className=\"flex flex-wrap gap-2\">\n  <button type=\"button\" className=\"btn btn-outline cursor-pointer\" onClick={() => document.getElementById('bs-short')?.showModal()}>Short</button>\n  <button type=\"button\" className=\"btn btn-outline cursor-pointer\" onClick={() => document.getElementById('bs-half')?.showModal()}>Half</button>\n  <button type=\"button\" className=\"btn btn-outline cursor-pointer\" onClick={() => document.getElementById('bs-tall')?.showModal()}>Tall</button>\n</div>\n\n<dialog id=\"bs-short\" className=\"modal modal-bottom\">\n  <div className=\"modal-box h-40 max-h-40\">\n    <h3 className=\"font-display text-lg font-bold\">Short sheet</h3>\n    <p className=\"pt-2 text-sm text-ink-muted\">Fixed low height for quick confirmations.</p>\n    <div className=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" className=\"btn btn-sm cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\">\n    <button type=\"submit\" className=\"cursor-pointer\">close</button>\n  </form>\n</dialog>\n\n<dialog id=\"bs-half\" className=\"modal modal-bottom\">\n  <div className=\"modal-box h-[50vh]\">\n    <h3 className=\"font-display text-lg font-bold\">Half height</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">About half the viewport. Useful for filters and pickers.</p>\n    <div className=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" className=\"btn cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\">\n    <button type=\"submit\" className=\"cursor-pointer\">close</button>\n  </form>\n</dialog>\n\n<dialog id=\"bs-tall\" className=\"modal modal-bottom\">\n  <div className=\"modal-box h-[85vh] max-h-[calc(100vh-5em)]\">\n    <h3 className=\"font-display text-lg font-bold\">Tall sheet</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Near full height for longer content. Scrolls inside modal-box.</p>\n    <ul className=\"menu rounded-box bg-base-200 text-sm\">\n        <li><span className=\"cursor-default\">Layer wash 1</span></li>\n        <li><span className=\"cursor-default\">Layer wash 2</span></li>\n        <li><span className=\"cursor-default\">Layer wash 3</span></li>\n        <li><span className=\"cursor-default\">Layer wash 4</span></li>\n        <li><span className=\"cursor-default\">Layer wash 5</span></li>\n        <li><span className=\"cursor-default\">Layer wash 6</span></li>\n        <li><span className=\"cursor-default\">Layer wash 7</span></li>\n        <li><span className=\"cursor-default\">Layer wash 8</span></li>\n        <li><span className=\"cursor-default\">Layer wash 9</span></li>\n        <li><span className=\"cursor-default\">Layer wash 10</span></li>\n        <li><span className=\"cursor-default\">Layer wash 11</span></li>\n        <li><span className=\"cursor-default\">Layer wash 12</span></li>\n    </ul>\n    <div className=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" className=\"btn cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\">\n    <button type=\"submit\" className=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const createHtml = "<button type=\"button\" class=\"btn btn-primary cursor-pointer\" onclick=\"document.getElementById('bs-create').showModal()\">\n  Add wash plate\n</button>\n<dialog id=\"bs-create\" class=\"modal modal-bottom\">\n  <div class=\"modal-box\">\n    <h3 class=\"card-title font-bold text-primary\">Add wash plate</h3>\n    <form class=\"mt-4 space-y-4\" onsubmit=\"event.preventDefault(); this.closest('dialog').close()\">\n      <div class=\"form-control\">\n        <label class=\"label\" for=\"bs-create-name\">\n          <span class=\"label-text\">Name<span class=\"align-top text-sm leading-none text-error\" aria-hidden=\"true\">*</span></span>\n        </label>\n        <input id=\"bs-create-name\" name=\"name\" class=\"input input-bordered w-full cursor-text\" required placeholder=\"Cerulean study\" />\n      </div>\n      <div class=\"form-control\">\n        <label class=\"label\" for=\"bs-create-notes\">\n          <span class=\"label-text\">Notes</span>\n        </label>\n        <textarea id=\"bs-create-notes\" name=\"notes\" class=\"textarea textarea-bordered w-full cursor-text\" rows=\"3\" placeholder=\"Optional glaze notes\"></textarea>\n      </div>\n      <div class=\"modal-action\">\n        <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('bs-create').close()\">Cancel</button>\n        <button type=\"submit\" class=\"btn btn-primary cursor-pointer\">Create</button>\n      </div>\n    </form>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\">\n    <button type=\"submit\" class=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const createJsx = "<button type=\"button\" className=\"btn btn-primary cursor-pointer\" onClick={() => document.getElementById('bs-create')?.showModal()}>\n  Add wash plate\n</button>\n<dialog id=\"bs-create\" className=\"modal modal-bottom\">\n  <div className=\"modal-box\">\n    <h3 className=\"card-title font-bold text-primary\">Add wash plate</h3>\n    <form className=\"mt-4 space-y-4\" onSubmit={(e) => { e.preventDefault(); e.currentTarget.closest('dialog')?.close() }}>\n      <div className=\"form-control\">\n        <label className=\"label\" htmlFor=\"bs-create-name\">\n          <span className=\"label-text\">Name<span className=\"align-top text-sm leading-none text-error\" aria-hidden=\"true\">*</span></span>\n        </label>\n        <input id=\"bs-create-name\" name=\"name\" className=\"input input-bordered w-full cursor-text\" required placeholder=\"Cerulean study\" />\n      </div>\n      <div className=\"form-control\">\n        <label className=\"label\" htmlFor=\"bs-create-notes\">\n          <span className=\"label-text\">Notes</span>\n        </label>\n        <textarea id=\"bs-create-notes\" name=\"notes\" className=\"textarea textarea-bordered w-full cursor-text\" rows={3} placeholder=\"Optional glaze notes\"></textarea>\n      </div>\n      <div className=\"modal-action\">\n        <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('bs-create')?.close()}>Cancel</button>\n        <button type=\"submit\" className=\"btn btn-primary cursor-pointer\">Create</button>\n      </div>\n    </form>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\">\n    <button type=\"submit\" className=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const editHtml = "<button type=\"button\" class=\"btn btn-secondary cursor-pointer\" onclick=\"document.getElementById('bs-edit').showModal()\">\n  Edit wash plate\n</button>\n<dialog id=\"bs-edit\" class=\"modal modal-bottom\">\n  <div class=\"modal-box\">\n    <h3 class=\"card-title font-bold text-secondary\">Edit wash plate</h3>\n    <form class=\"mt-4 space-y-4\" onsubmit=\"event.preventDefault(); this.closest('dialog').close()\">\n      <div class=\"form-control\">\n        <label class=\"label\" for=\"bs-edit-name\">\n          <span class=\"label-text\">Name<span class=\"align-top text-sm leading-none text-error\" aria-hidden=\"true\">*</span></span>\n        </label>\n        <input id=\"bs-edit-name\" name=\"name\" class=\"input input-bordered w-full cursor-text\" required value=\"Cerulean study\" />\n      </div>\n      <div class=\"form-control\">\n        <label class=\"label\" for=\"bs-edit-status\">\n          <span class=\"label-text\">Status<span class=\"align-top text-sm leading-none text-error\" aria-hidden=\"true\">*</span></span>\n        </label>\n        <select id=\"bs-edit-status\" name=\"status\" class=\"select select-bordered w-full cursor-pointer\" required>\n          <option value=\"wet\">Wet</option>\n          <option value=\"drying\" selected>Drying</option>\n          <option value=\"dry\">Dry</option>\n        </select>\n      </div>\n      <div class=\"modal-action\">\n        <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('bs-edit').close()\">Cancel</button>\n        <button type=\"submit\" class=\"btn btn-secondary cursor-pointer\">Save</button>\n      </div>\n    </form>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\">\n    <button type=\"submit\" class=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const editJsx = "<button type=\"button\" className=\"btn btn-secondary cursor-pointer\" onClick={() => document.getElementById('bs-edit')?.showModal()}>\n  Edit wash plate\n</button>\n<dialog id=\"bs-edit\" className=\"modal modal-bottom\">\n  <div className=\"modal-box\">\n    <h3 className=\"card-title font-bold text-secondary\">Edit wash plate</h3>\n    <form className=\"mt-4 space-y-4\" onSubmit={(e) => { e.preventDefault(); e.currentTarget.closest('dialog')?.close() }}>\n      <div className=\"form-control\">\n        <label className=\"label\" htmlFor=\"bs-edit-name\">\n          <span className=\"label-text\">Name<span className=\"align-top text-sm leading-none text-error\" aria-hidden=\"true\">*</span></span>\n        </label>\n        <input id=\"bs-edit-name\" name=\"name\" className=\"input input-bordered w-full cursor-text\" required defaultValue=\"Cerulean study\" />\n      </div>\n      <div className=\"form-control\">\n        <label className=\"label\" htmlFor=\"bs-edit-status\">\n          <span className=\"label-text\">Status<span className=\"align-top text-sm leading-none text-error\" aria-hidden=\"true\">*</span></span>\n        </label>\n        <select id=\"bs-edit-status\" name=\"status\" className=\"select select-bordered w-full cursor-pointer\" required defaultValue=\"drying\">\n          <option value=\"wet\">Wet</option>\n          <option value=\"drying\">Drying</option>\n          <option value=\"dry\">Dry</option>\n        </select>\n      </div>\n      <div className=\"modal-action\">\n        <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('bs-edit')?.close()}>Cancel</button>\n        <button type=\"submit\" className=\"btn btn-secondary cursor-pointer\">Save</button>\n      </div>\n    </form>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\">\n    <button type=\"submit\" className=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const deleteHtml = "<button type=\"button\" class=\"btn btn-error cursor-pointer\" onclick=\"document.getElementById('bs-delete').showModal()\">\n  Delete wash plate\n</button>\n<dialog id=\"bs-delete\" class=\"modal modal-bottom\">\n  <div class=\"modal-box\">\n    <h3 class=\"card-title font-bold text-error\">Delete wash plate</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">This removes \"Cerulean study\" from the studio board. You cannot undo this action.</p>\n    <div class=\"modal-action\">\n      <form method=\"dialog\" class=\"flex gap-2\">\n        <button type=\"submit\" class=\"btn cursor-pointer\">Cancel</button>\n        <button type=\"submit\" class=\"btn btn-error cursor-pointer\">Delete</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\">\n    <button type=\"submit\" class=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const deleteJsx = "<button type=\"button\" className=\"btn btn-error cursor-pointer\" onClick={() => document.getElementById('bs-delete')?.showModal()}>\n  Delete wash plate\n</button>\n<dialog id=\"bs-delete\" className=\"modal modal-bottom\">\n  <div className=\"modal-box\">\n    <h3 className=\"card-title font-bold text-error\">Delete wash plate</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">This removes \"Cerulean study\" from the studio board. You cannot undo this action.</p>\n    <div className=\"modal-action\">\n      <form method=\"dialog\" className=\"flex gap-2\">\n        <button type=\"submit\" className=\"btn cursor-pointer\">Cancel</button>\n        <button type=\"submit\" className=\"btn btn-error cursor-pointer\">Delete</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\">\n    <button type=\"submit\" className=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const responsiveHtml = "<button type=\"button\" class=\"btn btn-primary cursor-pointer\" onclick=\"document.getElementById('bs-responsive').showModal()\">\n  Open responsive sheet\n</button>\n<dialog id=\"bs-responsive\" class=\"modal modal-bottom sm:modal-middle\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Responsive modal</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">On small viewports this sits at the bottom. From the <span class=\"font-mono text-xs\">sm</span> breakpoint up it centers like a standard dialog.</p>\n    <div class=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" class=\"btn cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\">\n    <button type=\"submit\" class=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const responsiveJsx = "<button type=\"button\" className=\"btn btn-primary cursor-pointer\" onClick={() => document.getElementById('bs-responsive')?.showModal()}>\n  Open responsive sheet\n</button>\n<dialog id=\"bs-responsive\" className=\"modal modal-bottom sm:modal-middle\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Responsive modal</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">On small viewports this sits at the bottom. From the <span className=\"font-mono text-xs\">sm</span> breakpoint up it centers like a standard dialog.</p>\n    <div className=\"modal-action\">\n      <form method=\"dialog\">\n        <button type=\"submit\" className=\"btn cursor-pointer\">Close</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\">\n    <button type=\"submit\" className=\"cursor-pointer\">close</button>\n  </form>\n</dialog>"

const popoverHtml = "<button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('bs-popover').showPopover()\">\n  Open popover sheet\n</button>\n<div id=\"bs-popover\" class=\"modal modal-bottom\" popover=\"auto\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Popover sheet</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Background stays interactive. Prefer dialog when you need a focus trap.</p>\n    <div class=\"modal-action\">\n      <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('bs-popover').hidePopover()\">Close</button>\n    </div>\n  </div>\n  <div class=\"modal-backdrop\">\n    <button type=\"button\" class=\"cursor-pointer\" onclick=\"document.getElementById('bs-popover').hidePopover()\">close</button>\n  </div>\n</div>"

const popoverJsx = "<button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('bs-popover')?.showPopover()}>\n  Open popover sheet\n</button>\n<div id=\"bs-popover\" className=\"modal modal-bottom\" popover=\"auto\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Popover sheet</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Background stays interactive. Prefer dialog when you need a focus trap.</p>\n    <div className=\"modal-action\">\n      <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('bs-popover')?.hidePopover()}>Close</button>\n    </div>\n  </div>\n  <div className=\"modal-backdrop\">\n    <button type=\"button\" className=\"cursor-pointer\" onClick={() => document.getElementById('bs-popover')?.hidePopover()}>close</button>\n  </div>\n</div>"

const checkboxHtml = "<label for=\"bs-toggle\" class=\"btn btn-neutral cursor-pointer\">Open checkbox sheet</label>\n<input type=\"checkbox\" id=\"bs-toggle\" class=\"modal-toggle\" />\n<div class=\"modal modal-bottom\" role=\"dialog\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Checkbox sheet</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Legacy pattern. Prefer the HTML dialog method for Escape and focus management.</p>\n    <div class=\"modal-action\">\n      <label for=\"bs-toggle\" class=\"btn cursor-pointer\">Close</label>\n    </div>\n  </div>\n  <label class=\"modal-backdrop cursor-pointer\" for=\"bs-toggle\">Close</label>\n</div>"

const checkboxJsx = "<label htmlFor=\"bs-toggle\" className=\"btn btn-neutral cursor-pointer\">Open checkbox sheet</label>\n<input type=\"checkbox\" id=\"bs-toggle\" className=\"modal-toggle\" />\n<div className=\"modal modal-bottom\" role=\"dialog\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Checkbox sheet</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Legacy pattern. Prefer the HTML dialog method for Escape and focus management.</p>\n    <div className=\"modal-action\">\n      <label htmlFor=\"bs-toggle\" className=\"btn cursor-pointer\">Close</label>\n    </div>\n  </div>\n  <label className=\"modal-backdrop cursor-pointer\" htmlFor=\"bs-toggle\">Close</label>\n</div>"

function openSheet(id: string) {
  const el = document.getElementById(id)
  if (el instanceof HTMLDialogElement) el.showModal()
}

function openPopover(id: string) {
  const el = document.getElementById(id)
  if (el && 'showPopover' in el) {
    ;(el as HTMLElement).showPopover()
  }
}

function hidePopover(id: string) {
  const el = document.getElementById(id)
  if (el && 'hidePopover' in el) {
    ;(el as HTMLElement).hidePopover()
  }
}

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

function ReqStar() {
  return (
    <span
      className="align-top text-sm leading-none text-error"
      aria-hidden="true"
    >
      *
    </span>
  )
}

export default function BottomSheetPage() {
  function onCreateSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const dialog = e.currentTarget.closest('dialog')
    dialog?.close()
  }

  function onEditSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const dialog = e.currentTarget.closest('dialog')
    dialog?.close()
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Bottom sheet
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">modal modal-bottom</span> sheets.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Open and close with actions"
          description="HTML dialog + modal-bottom"
        >
          <ShowcaseTabs
            preview={
              <>
                <button
                            type="button"
                            className="btn btn-primary cursor-pointer"
                            onClick={() => openSheet('bs-basic')}
                          >
                            Open bottom sheet
                          </button>
                          <dialog id="bs-basic" className="modal modal-bottom">
                            <div className="modal-box">
                              <h3 className="font-display text-lg font-bold">Wash notes</h3>
                              <p className="py-4 text-sm text-ink-muted">
                                A bottom sheet anchors to the lower edge with rounded top
                                corners. Press Escape or use Close.
                              </p>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button type="submit" className="btn cursor-pointer">
                                    Close
                                  </button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                          <p className="mt-3">
                            <ClassLabel value="modal modal-bottom + modal-box + modal-action" />
                          </p>
              </>
            }
            html={basicHtml}
            jsx={basicJsx}
          />
        
        </Section>

        <Section
          eyebrow="02 · Backdrop"
          title="Dismiss on outside click"
          description="A modal-backdrop form covers the page so clicking outside closes the"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <button
                            type="button"
                            className="btn btn-secondary cursor-pointer"
                            onClick={() => openSheet('bs-backdrop')}
                          >
                            Open with backdrop dismiss
                          </button>
                          <dialog id="bs-backdrop" className="modal modal-bottom">
                            <div className="modal-box">
                              <h3 className="font-display text-lg font-bold">Tap outside</h3>
                              <p className="py-4 text-sm text-ink-muted">
                                Escape, backdrop click, or the button below will close this
                                sheet.
                              </p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button type="submit" className="cursor-pointer">
                                close
                              </button>
                            </form>
                          </dialog>
                          <p className="mt-3">
                            <ClassLabel value="form.modal-backdrop method=dialog" />
                          </p>
              </>
            }
            html={backdropHtml}
            jsx={backdropJsx}
          />
        
        </Section>

        <Section
          eyebrow="03 · Corner close"
          title="Ghost close in the corner"
          description="Absolute circle button in the top-right of modal-box"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <button
                            type="button"
                            className="btn btn-accent cursor-pointer"
                            onClick={() => openSheet('bs-corner')}
                          >
                            Open with corner close
                          </button>
                          <dialog id="bs-corner" className="modal modal-bottom">
                            <div className="modal-box">
                              <form method="dialog">
                                <button
                                  type="submit"
                                  className="btn btn-sm btn-circle btn-ghost absolute end-2 top-2 cursor-pointer"
                                  aria-label="Close"
                                >
                                  <X className="size-4" strokeWidth={2} />
                                </button>
                              </form>
                              <h3 className="font-display text-lg font-bold">Corner dismiss</h3>
                              <p className="py-4 text-sm text-ink-muted">
                                Use the X, Escape, or click outside.
                              </p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button type="submit" className="cursor-pointer">
                                close
                              </button>
                            </form>
                          </dialog>
                          <p className="mt-3">
                            <ClassLabel value="btn btn-sm btn-circle btn-ghost absolute end-2 top-2" />
                          </p>
              </>
            }
            html={cornerHtml}
            jsx={cornerJsx}
          />
        
        </Section>

        <Section
          eyebrow="04 · Heights"
          title="Short, half, and tall sheets"
          description="Override modal-box height"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="btn btn-outline cursor-pointer"
                              onClick={() => openSheet('bs-short')}
                            >
                              Short
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline cursor-pointer"
                              onClick={() => openSheet('bs-half')}
                            >
                              Half
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline cursor-pointer"
                              onClick={() => openSheet('bs-tall')}
                            >
                              Tall
                            </button>
                          </div>

                          <dialog id="bs-short" className="modal modal-bottom">
                            <div className="modal-box h-40 max-h-40">
                              <h3 className="font-display text-lg font-bold">Short sheet</h3>
                              <p className="pt-2 text-sm text-ink-muted">
                                Fixed low height for quick confirmations.
                              </p>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button type="submit" className="btn btn-sm cursor-pointer">
                                    Close
                                  </button>
                                </form>
                              </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button type="submit" className="cursor-pointer">
                                close
                              </button>
                            </form>
                          </dialog>

                          <dialog id="bs-half" className="modal modal-bottom">
                            <div className="modal-box h-[50vh]">
                              <h3 className="font-display text-lg font-bold">Half height</h3>
                              <p className="py-4 text-sm text-ink-muted">
                                About half the viewport. Useful for filters and pickers.
                              </p>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button type="submit" className="btn cursor-pointer">
                                    Close
                                  </button>
                                </form>
                              </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button type="submit" className="cursor-pointer">
                                close
                              </button>
                            </form>
                          </dialog>

                          <dialog id="bs-tall" className="modal modal-bottom">
                            <div className="modal-box h-[85vh] max-h-[calc(100vh-5em)]">
                              <h3 className="font-display text-lg font-bold">Tall sheet</h3>
                              <p className="py-4 text-sm text-ink-muted">
                                Near full height for longer content. Scrolls inside modal-box.
                              </p>
                              <ul className="menu rounded-box bg-base-200 text-sm">
                                {Array.from({ length: 12 }, (_, i) => (
                                  <li key={i}>
                                    <span className="cursor-default">Layer wash {i + 1}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button type="submit" className="btn cursor-pointer">
                                    Close
                                  </button>
                                </form>
                              </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button type="submit" className="cursor-pointer">
                                close
                              </button>
                            </form>
                          </dialog>

                          <p className="mt-3">
                            <ClassLabel value="modal-box h-40 | h-[50vh] | h-[85vh]" />
                          </p>
              </>
            }
            html={heightsHtml}
            jsx={heightsJsx}
          />
        
        </Section>

        <Section
          eyebrow="05 · Create"
          title="Form sheet (create)"
          description="Primary title color for create flows"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <button
                            type="button"
                            className="btn btn-primary cursor-pointer"
                            onClick={() => openSheet('bs-create')}
                          >
                            Add wash plate
                          </button>
                          <dialog id="bs-create" className="modal modal-bottom">
                            <div className="modal-box">
                              <h3 className="card-title font-bold text-primary">Add wash plate</h3>
                              <form className="mt-4 space-y-4" onSubmit={onCreateSubmit}>
                                <div className="form-control">
                                  <label className="label" htmlFor="bs-create-name">
                                    <span className="label-text">
                                      Name
                                      <ReqStar />
                                    </span>
                                  </label>
                                  <input
                                    id="bs-create-name"
                                    name="name"
                                    className="input input-bordered w-full cursor-text"
                                    required
                                    placeholder="Cerulean study"
                                  />
                                </div>
                                <div className="form-control">
                                  <label className="label" htmlFor="bs-create-notes">
                                    <span className="label-text">Notes</span>
                                  </label>
                                  <textarea
                                    id="bs-create-notes"
                                    name="notes"
                                    className="textarea textarea-bordered w-full cursor-text"
                                    rows={3}
                                    placeholder="Optional glaze notes"
                                  />
                                </div>
                                <div className="modal-action">
                                  <button
                                    type="button"
                                    className="btn cursor-pointer"
                                    onClick={() =>
                                      (document.getElementById('bs-create') as HTMLDialogElement | null)?.close()
                                    }
                                  >
                                    Cancel
                                  </button>
                                  <button type="submit" className="btn btn-primary cursor-pointer">
                                    Create
                                  </button>
                                </div>
                              </form>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button type="submit" className="cursor-pointer">
                                close
                              </button>
                            </form>
                          </dialog>
                          <p className="mt-3">
                            <ClassLabel value="card-title text-primary font-bold" />
                          </p>
              </>
            }
            html={createHtml}
            jsx={createJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Edit"
          title="Form sheet (edit)"
          description="Secondary title color for edit flows"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <button
                            type="button"
                            className="btn btn-secondary cursor-pointer"
                            onClick={() => openSheet('bs-edit')}
                          >
                            Edit wash plate
                          </button>
                          <dialog id="bs-edit" className="modal modal-bottom">
                            <div className="modal-box">
                              <h3 className="card-title font-bold text-secondary">
                                Edit wash plate
                              </h3>
                              <form className="mt-4 space-y-4" onSubmit={onEditSubmit}>
                                <div className="form-control">
                                  <label className="label" htmlFor="bs-edit-name">
                                    <span className="label-text">
                                      Name
                                      <ReqStar />
                                    </span>
                                  </label>
                                  <input
                                    id="bs-edit-name"
                                    name="name"
                                    className="input input-bordered w-full cursor-text"
                                    required
                                    defaultValue="Cerulean study"
                                  />
                                </div>
                                <div className="form-control">
                                  <label className="label" htmlFor="bs-edit-status">
                                    <span className="label-text">
                                      Status
                                      <ReqStar />
                                    </span>
                                  </label>
                                  <select
                                    id="bs-edit-status"
                                    name="status"
                                    className="select select-bordered w-full cursor-pointer"
                                    required
                                    defaultValue="drying"
                                  >
                                    <option value="wet">Wet</option>
                                    <option value="drying">Drying</option>
                                    <option value="dry">Dry</option>
                                  </select>
                                </div>
                                <div className="modal-action">
                                  <button
                                    type="button"
                                    className="btn cursor-pointer"
                                    onClick={() =>
                                      (document.getElementById('bs-edit') as HTMLDialogElement | null)?.close()
                                    }
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-secondary cursor-pointer"
                                  >
                                    Save
                                  </button>
                                </div>
                              </form>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button type="submit" className="cursor-pointer">
                                close
                              </button>
                            </form>
                          </dialog>
                          <p className="mt-3">
                            <ClassLabel value="card-title text-secondary font-bold" />
                          </p>
              </>
            }
            html={editHtml}
            jsx={editJsx}
          />
        
        </Section>

        <Section
          eyebrow="07 · Delete"
          title="Destructive confirm sheet"
          description="Error-colored title for delete confirmation"
        >
          <ShowcaseTabs
            preview={
              <>
                <button
                            type="button"
                            className="btn btn-error cursor-pointer"
                            onClick={() => openSheet('bs-delete')}
                          >
                            Delete wash plate
                          </button>
                          <dialog id="bs-delete" className="modal modal-bottom">
                            <div className="modal-box">
                              <h3 className="card-title font-bold text-error">
                                Delete wash plate
                              </h3>
                              <p className="py-4 text-sm text-ink-muted">
                                This removes &ldquo;Cerulean study&rdquo; from the studio board.
                                You cannot undo this action.
                              </p>
                              <div className="modal-action">
                                <form method="dialog" className="flex gap-2">
                                  <button type="submit" className="btn cursor-pointer">
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-error cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </form>
                              </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button type="submit" className="cursor-pointer">
                                close
                              </button>
                            </form>
                          </dialog>
                          <p className="mt-3">
                            <ClassLabel value="card-title text-error font-bold" />
                          </p>
              </>
            }
            html={deleteHtml}
            jsx={deleteJsx}
          />
        
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Bottom on small, middle on larger"
          description="modal-bottom by default; sm:modal-middle recenters on wider screens"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <button
                            type="button"
                            className="btn btn-primary cursor-pointer"
                            onClick={() => openSheet('bs-responsive')}
                          >
                            Open responsive sheet
                          </button>
                          <dialog
                            id="bs-responsive"
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <h3 className="font-display text-lg font-bold">Responsive modal</h3>
                              <p className="py-4 text-sm text-ink-muted">
                                On small viewports this sits at the bottom. From the{' '}
                                <span className="font-mono text-xs">sm</span> breakpoint up it
                                centers like a standard dialog.
                              </p>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button type="submit" className="btn cursor-pointer">
                                    Close
                                  </button>
                                </form>
                              </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button type="submit" className="cursor-pointer">
                                close
                              </button>
                            </form>
                          </dialog>
                          <p className="mt-3">
                            <ClassLabel value="modal modal-bottom sm:modal-middle" />
                          </p>
              </>
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        
        </Section>

        <Section
          eyebrow="09 · Popover"
          title="Popover API bottom sheet"
          description="No focus trap on the background"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <button
                            type="button"
                            className="btn cursor-pointer"
                            onClick={() => openPopover('bs-popover')}
                          >
                            Open popover sheet
                          </button>
                          <div id="bs-popover" className="modal modal-bottom" popover="auto">
                            <div className="modal-box">
                              <h3 className="font-display text-lg font-bold">Popover sheet</h3>
                              <p className="py-4 text-sm text-ink-muted">
                                Background stays interactive. Prefer dialog when you need a
                                focus trap.
                              </p>
                              <div className="modal-action">
                                <button
                                  type="button"
                                  className="btn cursor-pointer"
                                  onClick={() => hidePopover('bs-popover')}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                            <div className="modal-backdrop">
                              <button
                                type="button"
                                className="cursor-pointer"
                                onClick={() => hidePopover('bs-popover')}
                              >
                                close
                              </button>
                            </div>
                          </div>
                          <p className="mt-3">
                            <ClassLabel value="modal modal-bottom popover=auto" />
                          </p>
              </>
            }
            html={popoverHtml}
            jsx={popoverJsx}
          />
        
        </Section>

        <Section
          eyebrow="10 · Checkbox"
          title="Legacy checkbox toggle"
          description="Hidden modal-toggle checkbox"
        >
          <ShowcaseTabs
            preview={
              <>
                <label
                            htmlFor="bs-toggle"
                            className="btn btn-neutral cursor-pointer"
                          >
                            Open checkbox sheet
                          </label>
                          <input type="checkbox" id="bs-toggle" className="modal-toggle" />
                          <div className="modal modal-bottom" role="dialog">
                            <div className="modal-box">
                              <h3 className="font-display text-lg font-bold">Checkbox sheet</h3>
                              <p className="py-4 text-sm text-ink-muted">
                                Legacy pattern. Prefer the HTML dialog method for Escape and
                                focus management.
                              </p>
                              <div className="modal-action">
                                <label htmlFor="bs-toggle" className="btn cursor-pointer">
                                  Close
                                </label>
                              </div>
                            </div>
                            <label className="modal-backdrop cursor-pointer" htmlFor="bs-toggle">
                              Close
                            </label>
                          </div>
                          <p className="mt-3">
                            <ClassLabel value="modal-toggle + modal modal-bottom" />
                          </p>
              </>
            }
            html={checkboxHtml}
            jsx={checkboxJsx}
          />
        
        </Section>
      </div>
    </>
  )
}
