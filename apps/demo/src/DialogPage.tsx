import { useState, type ReactNode } from 'react'
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
    <article className={`wash-panel paper-grain soak-in ${panel}`}>
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
          daisyUI <span className="font-mono text-xs">modal</span> patterns:
          native <span className="font-mono text-xs">&lt;dialog&gt;</span>,
          checkbox toggle, popover, placements, sizes, forms, and confirms.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default dialog"
          title="HTML dialog element"
          description="Recommended. Open with showModal(); close via form method=dialog or Esc."
        >
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
        </Section>

        <Section
          eyebrow="02 · Backdrop"
          title="Close on outside click"
          description="A second form with modal-backdrop covers the page for click-outside dismiss."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="03 · Corner close"
          title="Ghost circle dismiss"
          description="Absolute btn-circle in the modal-box corner via form method=dialog."
        >
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
        </Section>

        <Section
          eyebrow="04 · Sizes"
          title="Custom modal width"
          description="Any w- / max-w- utilities on modal-box. No dedicated size classes."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="05 · Placement"
          title="Top, middle, bottom, start, end"
          description="Placement modifiers on the modal root. Middle is the default."
        >
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
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Bottom on small, middle on sm+"
          description="Combine modal-bottom with sm:modal-middle for mobile sheets."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="07 · Force open"
          title="modal-open modifier"
          description="Keeps the modal visible via class. Toggle on for a live demo; Esc will not clear the class."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="08 · Checkbox (legacy)"
          title="modal-toggle + label"
          description="Hidden checkbox controls open state. Labels toggle it open and closed."
        >
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
        </Section>

        <Section
          eyebrow="09 · Popover"
          title="Popover API modal"
          description="Does not trap focus. Close with Esc, hide action, or backdrop target."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="10 · Form dialog"
          title="Create wash entry"
          description="Form inside modal-box with required labels and primary title styling."
        >
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
        </Section>

        <Section
          eyebrow="11 · Alert confirm"
          title="Destructive confirm"
          description="Alert-style confirm with text-error font-bold title per form-crud-ui."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="12 · Parts reference"
          title="Class map"
          description="Component, parts, modifier, and placement classes from daisyUI modal."
        >
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
        </Section>
      </div>
    </>
  )
}
