import { useState, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { X } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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

const defaultDlgHtml = "<div class=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-default').showModal()\">Open dialog</button>\n</div>\n<dialog id=\"dlg-default\" class=\"modal\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Hello!</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Press Esc or click Close. Native dialog locks background focus.</p>\n    <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n  </div>\n</dialog>"
const defaultDlgJsx = "<div className=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-default')?.showModal()}>Open dialog</button>\n</div>\n<dialog id=\"dlg-default\" className=\"modal\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Hello!</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Press Esc or click Close. Native dialog locks background focus.</p>\n    <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n  </div>\n</dialog>"

const backdropHtml = "<div class=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" class=\"btn btn-primary cursor-pointer\" onclick=\"document.getElementById('dlg-backdrop').showModal()\">Open with backdrop</button>\n</div>\n<dialog id=\"dlg-backdrop\" class=\"modal\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Outside click</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Press Esc or click outside the box to close.</p>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n</dialog>"
const backdropJsx = "<div className=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" className=\"btn btn-primary cursor-pointer\" onClick={() => document.getElementById('dlg-backdrop')?.showModal()}>Open with backdrop</button>\n</div>\n<dialog id=\"dlg-backdrop\" className=\"modal\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Outside click</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Press Esc or click outside the box to close.</p>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n</dialog>"

const cornerHtml = "<div class=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-corner').showModal()\">Open corner close</button>\n</div>\n<dialog id=\"dlg-corner\" class=\"modal\">\n  <div class=\"modal-box\">\n    <form method=\"dialog\">\n      <button type=\"submit\" class=\"btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer\" aria-label=\"Close\"><svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path></svg></button>\n    </form>\n    <h3 class=\"font-display text-lg font-bold\">Corner dismiss</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Esc or the corner control closes this dialog.</p>\n  </div>\n</dialog>"
const cornerJsx = "<div className=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-corner')?.showModal()}>Open corner close</button>\n</div>\n<dialog id=\"dlg-corner\" className=\"modal\">\n  <div className=\"modal-box\">\n    <form method=\"dialog\">\n      <button type=\"submit\" className=\"btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer\" aria-label=\"Close\"><svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path></svg></button>\n    </form>\n    <h3 className=\"font-display text-lg font-bold\">Corner dismiss</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Esc or the corner control closes this dialog.</p>\n  </div>\n</dialog>"

const sizesHtml = "<div class=\"flex flex-wrap gap-3\">\n  <div class=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-w-xs').showModal()\">Narrow</button>\n  <dialog id=\"dlg-w-xs\" class=\"modal\">\n    <div class=\"modal-box w-11/12 max-w-xs\">\n      <h3 class=\"font-display text-lg font-bold\">Narrow</h3>\n      <p class=\"py-4 text-sm text-ink-muted\">Width tuned with Tailwind utilities on modal-box.</p>\n      <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div class=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-w-default').showModal()\">Default</button>\n  <dialog id=\"dlg-w-default\" class=\"modal\">\n    <div class=\"modal-box\">\n      <h3 class=\"font-display text-lg font-bold\">Default</h3>\n      <p class=\"py-4 text-sm text-ink-muted\">Width tuned with Tailwind utilities on modal-box.</p>\n      <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div class=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-w-wide').showModal()\">Wide</button>\n  <dialog id=\"dlg-w-wide\" class=\"modal\">\n    <div class=\"modal-box w-11/12 max-w-5xl\">\n      <h3 class=\"font-display text-lg font-bold\">Wide</h3>\n      <p class=\"py-4 text-sm text-ink-muted\">Width tuned with Tailwind utilities on modal-box.</p>\n      <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n</div>"
const sizesJsx = "<div className=\"flex flex-wrap gap-3\">\n  <div className=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-w-xs')?.showModal()}>Narrow</button>\n  <dialog id=\"dlg-w-xs\" className=\"modal\">\n    <div className=\"modal-box w-11/12 max-w-xs\">\n      <h3 className=\"font-display text-lg font-bold\">Narrow</h3>\n      <p className=\"py-4 text-sm text-ink-muted\">Width tuned with Tailwind utilities on modal-box.</p>\n      <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div className=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-w-default')?.showModal()}>Default</button>\n  <dialog id=\"dlg-w-default\" className=\"modal\">\n    <div className=\"modal-box\">\n      <h3 className=\"font-display text-lg font-bold\">Default</h3>\n      <p className=\"py-4 text-sm text-ink-muted\">Width tuned with Tailwind utilities on modal-box.</p>\n      <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div className=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-w-wide')?.showModal()}>Wide</button>\n  <dialog id=\"dlg-w-wide\" className=\"modal\">\n    <div className=\"modal-box w-11/12 max-w-5xl\">\n      <h3 className=\"font-display text-lg font-bold\">Wide</h3>\n      <p className=\"py-4 text-sm text-ink-muted\">Width tuned with Tailwind utilities on modal-box.</p>\n      <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n</div>"

const placementHtml = "<div class=\"flex flex-wrap gap-3\">\n  <div class=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-place-top').showModal()\">Top</button>\n  <dialog id=\"dlg-place-top\" class=\"modal modal-top\">\n    <div class=\"modal-box\">\n      <h3 class=\"font-display text-lg font-bold\">Top</h3>\n      <p class=\"py-4 text-sm text-ink-muted\">Anchored with <span class=\"font-mono text-xs\">modal-top</span>.</p>\n      <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div class=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-place-middle').showModal()\">Middle</button>\n  <dialog id=\"dlg-place-middle\" class=\"modal modal-middle\">\n    <div class=\"modal-box\">\n      <h3 class=\"font-display text-lg font-bold\">Middle</h3>\n      <p class=\"py-4 text-sm text-ink-muted\">Anchored with <span class=\"font-mono text-xs\">modal-middle</span>.</p>\n      <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div class=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-place-bottom').showModal()\">Bottom</button>\n  <dialog id=\"dlg-place-bottom\" class=\"modal modal-bottom\">\n    <div class=\"modal-box\">\n      <h3 class=\"font-display text-lg font-bold\">Bottom</h3>\n      <p class=\"py-4 text-sm text-ink-muted\">Anchored with <span class=\"font-mono text-xs\">modal-bottom</span>.</p>\n      <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div class=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-place-start').showModal()\">Start</button>\n  <dialog id=\"dlg-place-start\" class=\"modal modal-start\">\n    <div class=\"modal-box\">\n      <h3 class=\"font-display text-lg font-bold\">Start</h3>\n      <p class=\"py-4 text-sm text-ink-muted\">Anchored with <span class=\"font-mono text-xs\">modal-start</span>.</p>\n      <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div class=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-place-end').showModal()\">End</button>\n  <dialog id=\"dlg-place-end\" class=\"modal modal-end\">\n    <div class=\"modal-box\">\n      <h3 class=\"font-display text-lg font-bold\">End</h3>\n      <p class=\"py-4 text-sm text-ink-muted\">Anchored with <span class=\"font-mono text-xs\">modal-end</span>.</p>\n      <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n</div>"
const placementJsx = "<div className=\"flex flex-wrap gap-3\">\n  <div className=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-place-top')?.showModal()}>Top</button>\n  <dialog id=\"dlg-place-top\" className=\"modal modal-top\">\n    <div className=\"modal-box\">\n      <h3 className=\"font-display text-lg font-bold\">Top</h3>\n      <p className=\"py-4 text-sm text-ink-muted\">Anchored with <span className=\"font-mono text-xs\">modal-top</span>.</p>\n      <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div className=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-place-middle')?.showModal()}>Middle</button>\n  <dialog id=\"dlg-place-middle\" className=\"modal modal-middle\">\n    <div className=\"modal-box\">\n      <h3 className=\"font-display text-lg font-bold\">Middle</h3>\n      <p className=\"py-4 text-sm text-ink-muted\">Anchored with <span className=\"font-mono text-xs\">modal-middle</span>.</p>\n      <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div className=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-place-bottom')?.showModal()}>Bottom</button>\n  <dialog id=\"dlg-place-bottom\" className=\"modal modal-bottom\">\n    <div className=\"modal-box\">\n      <h3 className=\"font-display text-lg font-bold\">Bottom</h3>\n      <p className=\"py-4 text-sm text-ink-muted\">Anchored with <span className=\"font-mono text-xs\">modal-bottom</span>.</p>\n      <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div className=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-place-start')?.showModal()}>Start</button>\n  <dialog id=\"dlg-place-start\" className=\"modal modal-start\">\n    <div className=\"modal-box\">\n      <h3 className=\"font-display text-lg font-bold\">Start</h3>\n      <p className=\"py-4 text-sm text-ink-muted\">Anchored with <span className=\"font-mono text-xs\">modal-start</span>.</p>\n      <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n  <div className=\"flex flex-col items-start gap-2\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-place-end')?.showModal()}>End</button>\n  <dialog id=\"dlg-place-end\" className=\"modal modal-end\">\n    <div className=\"modal-box\">\n      <h3 className=\"font-display text-lg font-bold\">End</h3>\n      <p className=\"py-4 text-sm text-ink-muted\">Anchored with <span className=\"font-mono text-xs\">modal-end</span>.</p>\n      <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n    </div>\n    <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n  </dialog>\n</div>\n</div>"

const responsiveHtml = "<div class=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"document.getElementById('dlg-responsive').showModal()\">Open responsive</button>\n</div>\n<dialog id=\"dlg-responsive\" class=\"modal modal-bottom sm:modal-middle\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Responsive sheet</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Bottom sheet on narrow viewports; centered from sm up.</p>\n    <div class=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" class=\"btn cursor-pointer\">Close</button></form></div>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n</dialog>"
const responsiveJsx = "<div className=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" className=\"btn cursor-pointer\" onClick={() => document.getElementById('dlg-responsive')?.showModal()}>Open responsive</button>\n</div>\n<dialog id=\"dlg-responsive\" className=\"modal modal-bottom sm:modal-middle\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Responsive sheet</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Bottom sheet on narrow viewports; centered from sm up.</p>\n    <div className=\"modal-action\"><form method=\"dialog\"><button type=\"submit\" className=\"btn cursor-pointer\">Close</button></form></div>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n</dialog>"

const forceHtml = "<div class=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" class=\"btn btn-secondary cursor-pointer\">Force open</button>\n</div>\n<div class=\"modal modal-open\" role=\"dialog\" aria-modal=\"true\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Forced open</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Visible while <span class=\"font-mono text-xs\">modal-open</span> is applied. Clear the class to dismiss.</p>\n    <div class=\"modal-action\"><button type=\"button\" class=\"btn cursor-pointer\">Close</button></div>\n  </div>\n  <button type=\"button\" class=\"modal-backdrop cursor-pointer\" aria-label=\"Close\"></button>\n</div>"
const forceJsx = "<div className=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" className=\"btn btn-secondary cursor-pointer\">Force open</button>\n</div>\n<div className=\"modal modal-open\" role=\"dialog\" aria-modal=\"true\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Forced open</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Visible while <span className=\"font-mono text-xs\">modal-open</span> is applied. Clear the class to dismiss.</p>\n    <div className=\"modal-action\"><button type=\"button\" className=\"btn cursor-pointer\">Close</button></div>\n  </div>\n  <button type=\"button\" className=\"modal-backdrop cursor-pointer\" aria-label=\"Close\"></button>\n</div>"

const checkboxHtml = "<div class=\"flex flex-wrap items-center gap-4\">\n  <label for=\"dlg-check\" class=\"btn cursor-pointer\">Open checkbox modal</label>\n</div>\n<input type=\"checkbox\" id=\"dlg-check\" class=\"modal-toggle\" />\n<div class=\"modal\" role=\"dialog\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Checkbox modal</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Legacy pattern using a hidden checkbox and label.</p>\n    <div class=\"modal-action\"><label for=\"dlg-check\" class=\"btn cursor-pointer\">Close</label></div>\n  </div>\n  <label class=\"modal-backdrop cursor-pointer\" for=\"dlg-check\">Close</label>\n</div>"
const checkboxJsx = "<div className=\"flex flex-wrap items-center gap-4\">\n  <label htmlFor=\"dlg-check\" className=\"btn cursor-pointer\">Open checkbox modal</label>\n</div>\n<input type=\"checkbox\" id=\"dlg-check\" className=\"modal-toggle\" />\n<div className=\"modal\" role=\"dialog\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Checkbox modal</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Legacy pattern using a hidden checkbox and label.</p>\n    <div className=\"modal-action\"><label htmlFor=\"dlg-check\" className=\"btn cursor-pointer\">Close</label></div>\n  </div>\n  <label className=\"modal-backdrop cursor-pointer\" htmlFor=\"dlg-check\">Close</label>\n</div>"

const popoverHtml = "<div class=\"flex flex-wrap gap-3\">\n  <button type=\"button\" class=\"btn cursor-pointer\" popovertarget=\"dlg-popover\">Open popover</button>\n  <button type=\"button\" class=\"btn btn-outline cursor-pointer\" popovertarget=\"dlg-popover-backdrop\">Popover + backdrop</button>\n</div>\n<div class=\"modal\" id=\"dlg-popover\" popover=\"auto\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Popover modal</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Background stays interactive. Esc or Close hides it.</p>\n    <div class=\"modal-action\">\n      <button type=\"button\" class=\"btn cursor-pointer\" popovertarget=\"dlg-popover\" popovertargetaction=\"hide\">Close</button>\n    </div>\n  </div>\n</div>\n<div class=\"modal\" id=\"dlg-popover-backdrop\" popover=\"auto\">\n  <div class=\"modal-box\">\n    <h3 class=\"font-display text-lg font-bold\">Popover with backdrop</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">Includes a backdrop label for outside dismiss.</p>\n    <div class=\"modal-action\">\n      <button type=\"button\" class=\"btn cursor-pointer\" popovertarget=\"dlg-popover-backdrop\" popovertargetaction=\"hide\">Close</button>\n    </div>\n  </div>\n  <button type=\"button\" class=\"modal-backdrop cursor-pointer\" popovertarget=\"dlg-popover-backdrop\" popovertargetaction=\"hide\" aria-label=\"Close\"></button>\n</div>"
const popoverJsx = "<div className=\"flex flex-wrap gap-3\">\n  <button type=\"button\" className=\"btn cursor-pointer\" popovertarget=\"dlg-popover\">Open popover</button>\n  <button type=\"button\" className=\"btn btn-outline cursor-pointer\" popovertarget=\"dlg-popover-backdrop\">Popover + backdrop</button>\n</div>\n<div className=\"modal\" id=\"dlg-popover\" popover=\"auto\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Popover modal</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Background stays interactive. Esc or Close hides it.</p>\n    <div className=\"modal-action\">\n      <button type=\"button\" className=\"btn cursor-pointer\" popovertarget=\"dlg-popover\" popovertargetaction=\"hide\">Close</button>\n    </div>\n  </div>\n</div>\n<div className=\"modal\" id=\"dlg-popover-backdrop\" popover=\"auto\">\n  <div className=\"modal-box\">\n    <h3 className=\"font-display text-lg font-bold\">Popover with backdrop</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">Includes a backdrop label for outside dismiss.</p>\n    <div className=\"modal-action\">\n      <button type=\"button\" className=\"btn cursor-pointer\" popovertarget=\"dlg-popover-backdrop\" popovertargetaction=\"hide\">Close</button>\n    </div>\n  </div>\n  <button type=\"button\" className=\"modal-backdrop cursor-pointer\" popovertarget=\"dlg-popover-backdrop\" popovertargetaction=\"hide\" aria-label=\"Close\"></button>\n</div>"

const formHtml = "<div class=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" class=\"btn btn-primary cursor-pointer\" onclick=\"document.getElementById('dlg-form').showModal()\">Add plate</button>\n</div>\n<dialog id=\"dlg-form\" class=\"modal\">\n  <div class=\"modal-box\">\n    <h3 class=\"card-title text-primary font-bold\">Add plate</h3>\n    <form class=\"mt-4 space-y-4\" onsubmit=\"event.preventDefault(); this.closest('dialog').close()\">\n      <div class=\"form-control w-full\">\n        <label class=\"label\" for=\"dlg-plate-name\">\n          <span class=\"label-text\">Name<span class=\"text-error align-top text-sm leading-none\" aria-hidden=\"true\">*</span></span>\n        </label>\n        <input id=\"dlg-plate-name\" name=\"name\" required class=\"input input-bordered w-full cursor-text\" />\n      </div>\n      <div class=\"form-control w-full\">\n        <label class=\"label\" for=\"dlg-plate-notes\"><span class=\"label-text\">Notes</span></label>\n        <textarea id=\"dlg-plate-notes\" name=\"notes\" class=\"textarea textarea-bordered w-full cursor-text\" rows=\"3\"></textarea>\n      </div>\n      <div class=\"modal-action\">\n        <button type=\"button\" class=\"btn cursor-pointer\" onclick=\"this.closest('dialog').close()\">Cancel</button>\n        <button type=\"submit\" class=\"btn btn-primary cursor-pointer\">Save plate</button>\n      </div>\n    </form>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n</dialog>"
const formJsx = "<div className=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" className=\"btn btn-primary cursor-pointer\" onClick={() => document.getElementById('dlg-form')?.showModal()}>Add plate</button>\n</div>\n<dialog id=\"dlg-form\" className=\"modal\">\n  <div className=\"modal-box\">\n    <h3 className=\"card-title text-primary font-bold\">Add plate</h3>\n    <form className=\"mt-4 space-y-4\" onSubmit={(e) => { e.preventDefault(); (e.currentTarget.closest('dialog') as HTMLDialogElement | null)?.close() }}>\n      <div className=\"form-control w-full\">\n        <label className=\"label\" htmlFor=\"dlg-plate-name\">\n          <span className=\"label-text\">Name<span className=\"text-error align-top text-sm leading-none\" aria-hidden=\"true\">*</span></span>\n        </label>\n        <input id=\"dlg-plate-name\" name=\"name\" required className=\"input input-bordered w-full cursor-text\" />\n      </div>\n      <div className=\"form-control w-full\">\n        <label className=\"label\" htmlFor=\"dlg-plate-notes\"><span className=\"label-text\">Notes</span></label>\n        <textarea id=\"dlg-plate-notes\" name=\"notes\" className=\"textarea textarea-bordered w-full cursor-text\" rows=\"3\"></textarea>\n      </div>\n      <div className=\"modal-action\">\n        <button type=\"button\" className=\"btn cursor-pointer\" onClick={(e) => (e.currentTarget.closest('dialog') as HTMLDialogElement | null)?.close()}>Cancel</button>\n        <button type=\"submit\" className=\"btn btn-primary cursor-pointer\">Save plate</button>\n      </div>\n    </form>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n</dialog>"

const alertHtml = "<div class=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" class=\"btn btn-error cursor-pointer\" onclick=\"document.getElementById('dlg-alert').showModal()\">Delete series</button>\n</div>\n<dialog id=\"dlg-alert\" class=\"modal\">\n  <div class=\"modal-box\">\n    <h3 class=\"card-title text-error font-bold\">Delete series?</h3>\n    <p class=\"py-4 text-sm text-ink-muted\">This removes the pigment series and its washes. This cannot be undone.</p>\n    <div class=\"modal-action\">\n      <form method=\"dialog\" class=\"flex gap-2\">\n        <button type=\"submit\" class=\"btn cursor-pointer\">Cancel</button>\n        <button type=\"submit\" class=\"btn btn-error cursor-pointer\">Delete</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" class=\"modal-backdrop\"><button type=\"submit\" class=\"cursor-pointer\">close</button></form>\n</dialog>"
const alertJsx = "<div className=\"flex flex-wrap items-center gap-4\">\n  <button type=\"button\" className=\"btn btn-error cursor-pointer\" onClick={() => document.getElementById('dlg-alert')?.showModal()}>Delete series</button>\n</div>\n<dialog id=\"dlg-alert\" className=\"modal\">\n  <div className=\"modal-box\">\n    <h3 className=\"card-title text-error font-bold\">Delete series?</h3>\n    <p className=\"py-4 text-sm text-ink-muted\">This removes the pigment series and its washes. This cannot be undone.</p>\n    <div className=\"modal-action\">\n      <form method=\"dialog\" className=\"flex gap-2\">\n        <button type=\"submit\" className=\"btn cursor-pointer\">Cancel</button>\n        <button type=\"submit\" className=\"btn btn-error cursor-pointer\">Delete</button>\n      </form>\n    </div>\n  </div>\n  <form method=\"dialog\" className=\"modal-backdrop\"><button type=\"submit\" className=\"cursor-pointer\">close</button></form>\n</dialog>"

const partsHtml = "<ul class=\"grid gap-2 sm:grid-cols-2\">\n  <li class=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code class=\"font-mono text-[0.65rem] text-ink-muted\">modal</code><span class=\"text-sm text-ink-muted\">Component root</span></li>\n  <li class=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code class=\"font-mono text-[0.65rem] text-ink-muted\">modal-box</code><span class=\"text-sm text-ink-muted\">Content panel</span></li>\n  <li class=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code class=\"font-mono text-[0.65rem] text-ink-muted\">modal-action</code><span class=\"text-sm text-ink-muted\">Action row</span></li>\n  <li class=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code class=\"font-mono text-[0.65rem] text-ink-muted\">modal-backdrop</code><span class=\"text-sm text-ink-muted\">Outside dismiss layer</span></li>\n  <li class=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code class=\"font-mono text-[0.65rem] text-ink-muted\">modal-toggle</code><span class=\"text-sm text-ink-muted\">Hidden checkbox control</span></li>\n  <li class=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code class=\"font-mono text-[0.65rem] text-ink-muted\">modal-open</code><span class=\"text-sm text-ink-muted\">Force visible</span></li>\n  <li class=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code class=\"font-mono text-[0.65rem] text-ink-muted\">modal-top / middle / bottom</code><span class=\"text-sm text-ink-muted\">Vertical placement</span></li>\n  <li class=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code class=\"font-mono text-[0.65rem] text-ink-muted\">modal-start / end</code><span class=\"text-sm text-ink-muted\">Horizontal placement</span></li>\n</ul>"
const partsJsx = "<ul className=\"grid gap-2 sm:grid-cols-2\">\n  <li className=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code className=\"font-mono text-[0.65rem] text-ink-muted\">modal</code><span className=\"text-sm text-ink-muted\">Component root</span></li>\n  <li className=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code className=\"font-mono text-[0.65rem] text-ink-muted\">modal-box</code><span className=\"text-sm text-ink-muted\">Content panel</span></li>\n  <li className=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code className=\"font-mono text-[0.65rem] text-ink-muted\">modal-action</code><span className=\"text-sm text-ink-muted\">Action row</span></li>\n  <li className=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code className=\"font-mono text-[0.65rem] text-ink-muted\">modal-backdrop</code><span className=\"text-sm text-ink-muted\">Outside dismiss layer</span></li>\n  <li className=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code className=\"font-mono text-[0.65rem] text-ink-muted\">modal-toggle</code><span className=\"text-sm text-ink-muted\">Hidden checkbox control</span></li>\n  <li className=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code className=\"font-mono text-[0.65rem] text-ink-muted\">modal-open</code><span className=\"text-sm text-ink-muted\">Force visible</span></li>\n  <li className=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code className=\"font-mono text-[0.65rem] text-ink-muted\">modal-top / middle / bottom</code><span className=\"text-sm text-ink-muted\">Vertical placement</span></li>\n  <li className=\"flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2\"><code className=\"font-mono text-[0.65rem] text-ink-muted\">modal-start / end</code><span className=\"text-sm text-ink-muted\">Horizontal placement</span></li>\n</ul>"


function openDialog(id: string) {
  const el = document.getElementById(id)
  if (el instanceof HTMLDialogElement) el.showModal()
}

const placements = [
  { name: 'Top', className: 'modal-top', id: 'dlg-place-top' },
  { name: 'Middle', className: 'modal-middle', id: 'dlg-place-middle' },
  { name: 'Bottom', className: 'modal-bottom', id: 'dlg-place-bottom' },
  { name: 'Start', className: 'modal-start', id: 'dlg-place-start' },
  { name: 'End', className: 'modal-end', id: 'dlg-place-end' },
] as const

const widths = [
  { name: 'Narrow', box: 'w-11/12 max-w-xs', id: 'dlg-w-xs' },
  { name: 'Default', box: '', id: 'dlg-w-default' },
  { name: 'Wide', box: 'w-11/12 max-w-5xl', id: 'dlg-w-wide' },
] as const

export default function DialogPage() {
  const [forceOpen, setForceOpen] = useState(false)

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Dialog
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">modal</span> and <span className="font-mono text-xs">&lt;dialog&gt;</span> patterns: native &lt;dialog&gt;, checkbox toggle, popover, placements.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default dialog"
          title="HTML dialog element"
          description="Recommended"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            className="btn cursor-pointer"
                            onClick={() => openDialog('dlg-default')}
                          >
                            Open dialog
                          </button>
                          <ClassLabel value="dialog.modal + modal-box + modal-action" />
                        </div>

                        <dialog id="dlg-default" className="modal">
                          <div className="modal-box">
                            <h3 className="font-display text-lg font-bold">Hello!</h3>
                            <p className="py-4 text-sm text-ink-muted">
                              Press Esc or click Close. Native dialog locks background focus.
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
            
              </>
            }
            html={defaultDlgHtml}
            jsx={defaultDlgJsx}
          />
        
        </Section>

        <Section
          eyebrow="02 · Backdrop"
          title="Close on outside click"
          description="A second form with modal-backdrop covers the page"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            className="btn btn-primary cursor-pointer"
                            onClick={() => openDialog('dlg-backdrop')}
                          >
                            Open with backdrop
                          </button>
                          <ClassLabel value="form.modal-backdrop method=dialog" />
                        </div>

                        <dialog id="dlg-backdrop" className="modal">
                          <div className="modal-box">
                            <h3 className="font-display text-lg font-bold">Outside click</h3>
                            <p className="py-4 text-sm text-ink-muted">
                              Press Esc or click outside the box to close.
                            </p>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button type="submit" className="cursor-pointer">
                              close
                            </button>
                          </form>
                        </dialog>
            
              </>
            }
            html={backdropHtml}
            jsx={backdropJsx}
          />
        
        </Section>

        <Section
          eyebrow="03 · Corner close"
          title="Ghost circle dismiss"
          description="Absolute btn-circle in the modal-box corner via form method=dialog"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            className="btn cursor-pointer"
                            onClick={() => openDialog('dlg-corner')}
                          >
                            Open corner close
                          </button>
                          <ClassLabel value="btn-sm btn-circle btn-ghost absolute right-2 top-2" />
                        </div>

                        <dialog id="dlg-corner" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button
                                type="submit"
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer"
                                aria-label="Close"
                              >
                                <X className="size-4" strokeWidth={2} />
                              </button>
                            </form>
                            <h3 className="font-display text-lg font-bold">Corner dismiss</h3>
                            <p className="py-4 text-sm text-ink-muted">
                              Esc or the corner control closes this dialog.
                            </p>
                          </div>
                        </dialog>
            
              </>
            }
            html={cornerHtml}
            jsx={cornerJsx}
          />
        
        </Section>

        <Section
          eyebrow="04 · Sizes"
          title="Custom modal width"
          description="Any w- / max-w- utilities on modal-box"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap gap-3">
                          {widths.map((w) => (
                            <div key={w.id} className="flex flex-col items-start gap-2">
                              <button
                                type="button"
                                className="btn cursor-pointer"
                                onClick={() => openDialog(w.id)}
                              >
                                {w.name}
                              </button>
                              <ClassLabel
                                value={
                                  w.box
                                    ? `modal-box ${w.box}`
                                    : 'modal-box (default)'
                                }
                              />
                              <dialog id={w.id} className="modal">
                                <div className={`modal-box ${w.box}`.trim()}>
                                  <h3 className="font-display text-lg font-bold">{w.name}</h3>
                                  <p className="py-4 text-sm text-ink-muted">
                                    Width tuned with Tailwind utilities on modal-box.
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
          eyebrow="05 · Placement"
          title="Top, middle, bottom, start, end"
          description="Placement modifiers on the modal root"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap gap-3">
                          {placements.map((p) => (
                            <div key={p.id} className="flex flex-col items-start gap-2">
                              <button
                                type="button"
                                className="btn cursor-pointer"
                                onClick={() => openDialog(p.id)}
                              >
                                {p.name}
                              </button>
                              <ClassLabel value={`modal ${p.className}`} />
                              <dialog id={p.id} className={`modal ${p.className}`}>
                                <div className="modal-box">
                                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                                  <p className="py-4 text-sm text-ink-muted">
                                    Anchored with <span className="font-mono text-xs">{p.className}</span>.
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
                            </div>
                          ))}
                        </div>
            
              </>
            }
            html={placementHtml}
            jsx={placementJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Bottom on small, middle on sm+"
          description="Combine modal-bottom with sm:modal-middle for mobile sheets"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            className="btn cursor-pointer"
                            onClick={() => openDialog('dlg-responsive')}
                          >
                            Open responsive
                          </button>
                          <ClassLabel value="modal modal-bottom sm:modal-middle" />
                        </div>

                        <dialog id="dlg-responsive" className="modal modal-bottom sm:modal-middle">
                          <div className="modal-box">
                            <h3 className="font-display text-lg font-bold">Responsive sheet</h3>
                            <p className="py-4 text-sm text-ink-muted">
                              Bottom sheet on narrow viewports; centered from sm up.
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
            
              </>
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        
        </Section>

        <Section
          eyebrow="07 · Force open"
          title="modal-open modifier"
          description="Keeps the modal visible via class"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            className="btn btn-secondary cursor-pointer"
                            onClick={() => setForceOpen(true)}
                          >
                            Force open
                          </button>
                          <ClassLabel value="modal modal-open" />
                        </div>

                        <div
                          className={`modal ${forceOpen ? 'modal-open' : ''}`}
                          role="dialog"
                          aria-modal={forceOpen || undefined}
                        >
                          <div className="modal-box">
                            <h3 className="font-display text-lg font-bold">Forced open</h3>
                            <p className="py-4 text-sm text-ink-muted">
                              Visible while <span className="font-mono text-xs">modal-open</span>{' '}
                              is applied. Clear the class to dismiss.
                            </p>
                            <div className="modal-action">
                              <button
                                type="button"
                                className="btn cursor-pointer"
                                onClick={() => setForceOpen(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="modal-backdrop cursor-pointer"
                            aria-label="Close"
                            onClick={() => setForceOpen(false)}
                          />
                        </div>
            
              </>
            }
            html={forceHtml}
            jsx={forceJsx}
          />
        
        </Section>

        <Section
          eyebrow="08 · Checkbox (legacy)"
          title="modal-toggle + label"
          description="Hidden checkbox controls open state"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-center gap-4">
                          <label htmlFor="dlg-check" className="btn cursor-pointer">
                            Open checkbox modal
                          </label>
                          <ClassLabel value="input.modal-toggle + label[for]" />
                        </div>

                        <input type="checkbox" id="dlg-check" className="modal-toggle" />
                        <div className="modal" role="dialog">
                          <div className="modal-box">
                            <h3 className="font-display text-lg font-bold">Checkbox modal</h3>
                            <p className="py-4 text-sm text-ink-muted">
                              Legacy pattern. No Esc dismiss; use the action or backdrop label.
                            </p>
                            <div className="modal-action">
                              <label htmlFor="dlg-check" className="btn cursor-pointer">
                                Close
                              </label>
                            </div>
                          </div>
                          <label className="modal-backdrop cursor-pointer" htmlFor="dlg-check">
                            Close
                          </label>
                        </div>
            
              </>
            }
            html={checkboxHtml}
            jsx={checkboxJsx}
          />
        
        </Section>

        <Section
          eyebrow="09 · Popover"
          title="Popover API modal"
          description="Does not trap focus"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap gap-3">
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              className="btn cursor-pointer"
                              popoverTarget="dlg-popover"
                            >
                              Open popover
                            </button>
                            <ClassLabel value="modal[popover] + popoverTarget" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              className="btn btn-outline cursor-pointer"
                              popoverTarget="dlg-popover-backdrop"
                            >
                              Popover + backdrop
                            </button>
                            <ClassLabel value="modal-backdrop + popoverTargetAction=hide" />
                          </div>
                        </div>

                        <div className="modal" id="dlg-popover" popover="auto">
                          <div className="modal-box">
                            <h3 className="font-display text-lg font-bold">Popover modal</h3>
                            <p className="py-4 text-sm text-ink-muted">
                              Background stays interactive. Esc or Close hides it.
                            </p>
                            <div className="modal-action">
                              <button
                                type="button"
                                className="btn cursor-pointer"
                                popoverTarget="dlg-popover"
                                popoverTargetAction="hide"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="modal" id="dlg-popover-backdrop" popover="auto">
                          <div className="modal-box">
                            <h3 className="font-display text-lg font-bold">Popover backdrop</h3>
                            <p className="py-4 text-sm text-ink-muted">
                              Click outside via modal-backdrop to hide.
                            </p>
                          </div>
                          <div className="modal-backdrop">
                            <button
                              type="button"
                              className="cursor-pointer"
                              popoverTarget="dlg-popover-backdrop"
                              popoverTargetAction="hide"
                            >
                              close
                            </button>
                          </div>
                        </div>
            
              </>
            }
            html={popoverHtml}
            jsx={popoverJsx}
          />
        
        </Section>

        <Section
          eyebrow="10 · Form dialog"
          title="Create wash entry"
          description="Form inside modal-box with required labels and primary title"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            className="btn btn-primary cursor-pointer"
                            onClick={() => openDialog('dlg-form')}
                          >
                            Add plate
                          </button>
                          <ClassLabel value="modal-box + form + modal-action" />
                        </div>

                        <dialog id="dlg-form" className="modal">
                          <div className="modal-box">
                            <h3 className="card-title text-primary font-bold">Add plate</h3>
                            <form
                              className="mt-4 space-y-4"
                              onSubmit={(e) => {
                                e.preventDefault()
                                const dlg = document.getElementById('dlg-form')
                                if (dlg instanceof HTMLDialogElement) dlg.close()
                              }}
                            >
                              <div className="form-control w-full">
                                <label className="label" htmlFor="dlg-plate-name">
                                  <span className="label-text">
                                    Name
                                    <span
                                      className="align-top text-sm leading-none text-error"
                                      aria-hidden="true"
                                    >
                                      *
                                    </span>
                                  </span>
                                </label>
                                <input
                                  id="dlg-plate-name"
                                  name="name"
                                  type="text"
                                  required
                                  className="input input-bordered w-full cursor-text"
                                  placeholder="Coastal fog"
                                />
                              </div>
                              <div className="form-control w-full">
                                <label className="label" htmlFor="dlg-plate-notes">
                                  <span className="label-text">Notes</span>
                                </label>
                                <textarea
                                  id="dlg-plate-notes"
                                  name="notes"
                                  className="textarea textarea-bordered w-full cursor-text"
                                  rows={3}
                                  placeholder="Optional wash notes"
                                />
                              </div>
                              <div className="modal-action">
                                <button
                                  type="button"
                                  className="btn cursor-pointer"
                                  onClick={() => {
                                    const dlg = document.getElementById('dlg-form')
                                    if (dlg instanceof HTMLDialogElement) dlg.close()
                                  }}
                                >
                                  Cancel
                                </button>
                                <button type="submit" className="btn btn-primary cursor-pointer">
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
            
              </>
            }
            html={formHtml}
            jsx={formJsx}
          />
        
        </Section>

        <Section
          eyebrow="11 · Alert confirm"
          title="Destructive confirm"
          description="Alert-style confirm with text-error font-bold title per"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            className="btn btn-error cursor-pointer"
                            onClick={() => openDialog('dlg-alert')}
                          >
                            Delete series
                          </button>
                          <ClassLabel value="card-title text-error font-bold" />
                        </div>

                        <dialog id="dlg-alert" className="modal">
                          <div className="modal-box">
                            <h3 className="card-title text-error font-bold">Delete series?</h3>
                            <p className="py-4 text-sm text-ink-muted">
                              This removes the pigment series and its washes. This cannot be
                              undone.
                            </p>
                            <div className="modal-action">
                              <form method="dialog" className="flex gap-2">
                                <button type="submit" className="btn cursor-pointer">
                                  Cancel
                                </button>
                                <button type="submit" className="btn btn-error cursor-pointer">
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
            
              </>
            }
            html={alertHtml}
            jsx={alertJsx}
          />
        
        </Section>

        <Section
          eyebrow="12 · Parts reference"
          title="Class map"
          description="Component, parts, modifier, and placement classes from daisyUI"
        >
          <ShowcaseTabs
            preview={
              <>

              <ul className="grid gap-2 sm:grid-cols-2">
                          {[
                            ['modal', 'Component root'],
                            ['modal-box', 'Content panel'],
                            ['modal-action', 'Action row'],
                            ['modal-backdrop', 'Outside dismiss layer'],
                            ['modal-toggle', 'Hidden checkbox control'],
                            ['modal-open', 'Force visible'],
                            ['modal-top / middle / bottom', 'Vertical placement'],
                            ['modal-start / end', 'Horizontal placement'],
                          ].map(([cls, note]) => (
                            <li
                              key={cls}
                              className="flex flex-col gap-0.5 rounded-box border border-ink-border/60 px-3 py-2"
                            >
                              <ClassLabel value={cls} />
                              <span className="text-sm text-ink-muted">{note}</span>
                            </li>
                          ))}
                        </ul>
            
              </>
            }
            html={partsHtml}
            jsx={partsJsx}
          />
        
        </Section>
      </div>
    </>
  )
}
