import type { FormEvent, ReactNode } from 'react'
import { X } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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
          daisyUI{' '}
          <span className="font-mono text-xs">modal modal-bottom</span> sheets
          that slide up from the edge: actions, forms, heights, and backdrop
          dismiss.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Open and close with actions"
          description="HTML dialog + modal-bottom. Close via modal-action buttons or Escape."
        >
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
        </Section>

        <Section
          eyebrow="02 · Backdrop"
          title="Dismiss on outside click"
          description="A modal-backdrop form covers the page so clicking outside closes the sheet."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="03 · Corner close"
          title="Ghost close in the corner"
          description="Absolute circle button in the top-right of modal-box."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="04 · Heights"
          title="Short, half, and tall sheets"
          description="Override modal-box height. Default max-height is calc(100vh - 5em)."
        >
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
        </Section>

        <Section
          eyebrow="05 · Create"
          title="Form sheet (create)"
          description="Primary title color for create flows. Required fields use a text-error asterisk."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="06 · Edit"
          title="Form sheet (edit)"
          description="Secondary title color for edit flows."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="07 · Delete"
          title="Destructive confirm sheet"
          description="Error-colored title for delete confirmation."
        >
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
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Bottom on small, middle on larger"
          description="modal-bottom by default; sm:modal-middle recenters on wider screens."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="09 · Popover"
          title="Popover API bottom sheet"
          description="No focus trap on the background. Esc and backdrop still dismiss."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="10 · Checkbox"
          title="Legacy checkbox toggle"
          description="Hidden modal-toggle checkbox. Labels open and close without JavaScript."
        >
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
        </Section>
      </div>
    </>
  )
}
