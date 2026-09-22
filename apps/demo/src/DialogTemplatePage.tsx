import { useState } from 'react'
import {
  Button,
  DialogTemplate,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function RequiredMark() {
  return (
    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
      *
    </span>
  )
}

export default function DialogTemplatePage() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [formSaving, setFormSaving] = useState(false)

  return (
    <div className="space-y-8 soak-in">
      <header className="space-y-3">
        <p className="label-ink">Templates · Layout</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Dialog
        </h1>
        <p className="max-w-2xl text-sm text-ink-muted md:text-base">
          Composed modal recipes using{' '}
          <code className="font-mono text-xs">DialogTemplate</code> with{' '}
          <code className="font-mono text-xs">header</code>,{' '}
          <code className="font-mono text-xs">desc</code>,{' '}
          <code className="font-mono text-xs">contents</code>, and{' '}
          <code className="font-mono text-xs">actions</code>.
        </p>
      </header>

      <GallerySection
        eyebrow="01 · Confirm"
        title="Destructive confirm"
        description="Error tone header with cancel and delete actions"
        panel="wash-panel-rose"
      >
        <ShowcaseTabs
          preview={
            <>
              <Button
                type="button"
                variant="error"
                className="cursor-pointer"
                onClick={() => setConfirmOpen(true)}
              >
                Delete plate
              </Button>
              <DialogTemplate
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                tone="error"
                header="Delete plate"
                desc="This cannot be undone. The plate and its wash history will be removed."
                contents={
                  <p className="text-sm">
                    Plate <span className="font-mono text-xs">coastal-fog-12</span> is
                    linked to 3 review comments.
                  </p>
                }
                actions={
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      className="cursor-pointer"
                      onClick={() => setConfirmOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="error"
                      className="cursor-pointer"
                      onClick={() => setConfirmOpen(false)}
                    >
                      Delete
                    </Button>
                  </>
                }
              />
            </>
          }
          html={`<button type="button" class="btn btn-error cursor-pointer">Delete plate</button>

<dialog class="modal" open>
  <div class="modal-box flex max-h-[min(90vh,40rem)] flex-col border border-ink-border bg-base-100 p-0" role="document">
    <div class="shrink-0 px-4 pt-4 pb-3">
      <h2 class="card-title text-error font-bold">Delete plate</h2>
      <p class="mt-0.5 text-xs text-ink-muted">
        This cannot be undone. The plate and its wash history will be removed.
      </p>
    </div>
    <div class="shrink-0 border-t border-base-300" role="separator"></div>
    <div class="min-h-0 flex-1 overflow-y-auto px-4 py-3">
      <p class="text-sm">
        Plate <span class="font-mono text-xs">coastal-fog-12</span> is linked to 3 review comments.
      </p>
    </div>
    <div class="shrink-0 border-t border-base-300" role="separator"></div>
    <div class="modal-action mt-0 shrink-0 px-4 py-3">
      <button type="button" class="btn btn-ghost cursor-pointer">Cancel</button>
      <button type="button" class="btn btn-error cursor-pointer">Delete</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button type="submit" class="cursor-pointer" aria-label="Close">close</button>
  </form>
</dialog>`}
          jsx={`import { useState } from 'react'
import { Button, DialogTemplate } from '@menzies-mariesta-com/menzies-design-wash-ui'

function ConfirmDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="button" variant="error" onClick={() => setOpen(true)}>
        Delete plate
      </Button>
      <DialogTemplate
        open={open}
        onClose={() => setOpen(false)}
        tone="error"
        header="Delete plate"
        desc="This cannot be undone. The plate and its wash history will be removed."
        contents={
          <p className="text-sm">
            Plate <span className="font-mono text-xs">coastal-fog-12</span> is
            linked to 3 review comments.
          </p>
        }
        actions={
          <>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="error" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      />
    </>
  )
}`}
        />
      </GallerySection>

      <GallerySection
        eyebrow="02 · Form"
        title="Edit in a dialog"
        description="Secondary tone with required fields and busy submit"
        panel="wash-panel-ochre"
      >
        <ShowcaseTabs
          preview={
            <>
              <Button
                type="button"
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setFormOpen(true)}
              >
                Rename plate
              </Button>
              <DialogTemplate
                open={formOpen}
                onClose={() => {
                  if (formSaving) return
                  setFormOpen(false)
                }}
                tone="secondary"
                header="Rename plate"
                desc="Update the studio label shown in the plate library."
                contents={
                  <fieldset className="fieldset mt-2">
                    <label className="label" htmlFor="dialog-plate-name">
                      <span className="label-text">
                        Plate name
                        <RequiredMark />
                      </span>
                    </label>
                    <input
                      id="dialog-plate-name"
                      name="name"
                      type="text"
                      className="input w-full cursor-text"
                      defaultValue="Coastal fog plate"
                      required
                      disabled={formSaving}
                    />
                  </fieldset>
                }
                actions={
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      className={formSaving ? 'cursor-not-allowed' : 'cursor-pointer'}
                      disabled={formSaving}
                      onClick={() => setFormOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className={formSaving ? 'cursor-not-allowed' : 'cursor-pointer'}
                      loading={formSaving}
                      disabled={formSaving}
                      aria-busy={formSaving}
                      onClick={() => {
                        setFormSaving(true)
                        window.setTimeout(() => {
                          setFormSaving(false)
                          setFormOpen(false)
                        }, 600)
                      }}
                    >
                      Save changes
                    </Button>
                  </>
                }
              />
            </>
          }
          html={`<button type="button" class="btn btn-secondary cursor-pointer">Rename plate</button>

<dialog class="modal" open>
  <div class="modal-box flex max-h-[min(90vh,40rem)] flex-col border border-ink-border bg-base-100 p-0" role="document">
    <div class="shrink-0 px-4 pt-4 pb-3">
      <h2 class="card-title text-secondary font-bold">Rename plate</h2>
      <p class="mt-0.5 text-xs text-ink-muted">
        Update the studio label shown in the plate library.
      </p>
    </div>
    <div class="shrink-0 border-t border-base-300" role="separator"></div>
    <div class="min-h-0 flex-1 overflow-y-auto px-4 py-3">
      <fieldset class="fieldset mt-2">
        <label class="label" for="dialog-plate-name">
          <span class="label-text">Plate name<span class="text-error" aria-hidden="true">*</span></span>
        </label>
        <input id="dialog-plate-name" name="name" type="text" class="input w-full cursor-text" value="Coastal fog plate" required />
      </fieldset>
    </div>
    <div class="shrink-0 border-t border-base-300" role="separator"></div>
    <div class="modal-action mt-0 shrink-0 px-4 py-3">
      <button type="button" class="btn btn-ghost cursor-pointer">Cancel</button>
      <button type="button" class="btn btn-secondary cursor-pointer">Save changes</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button type="submit" class="cursor-pointer" aria-label="Close">close</button>
  </form>
</dialog>`}
          jsx={`import { useState } from 'react'
import { Button, DialogTemplate } from '@menzies-mariesta-com/menzies-design-wash-ui'

function FormDialog() {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        Rename plate
      </Button>
      <DialogTemplate
        open={open}
        onClose={() => {
          if (saving) return
          setOpen(false)
        }}
        tone="secondary"
        header="Rename plate"
        desc="Update the studio label shown in the plate library."
        contents={
          <fieldset className="fieldset mt-2">
            <label className="label" htmlFor="dialog-plate-name">
              <span className="label-text">
                Plate name
                <span className="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
              </span>
            </label>
            <input
              id="dialog-plate-name"
              name="name"
              type="text"
              className="input w-full cursor-text"
              defaultValue="Coastal fog plate"
              required
              disabled={saving}
            />
          </fieldset>
        }
        actions={
          <>
            <Button type="button" variant="ghost" disabled={saving} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="secondary"
              loading={saving}
              disabled={saving}
              aria-busy={saving}
              onClick={() => {
                setSaving(true)
                window.setTimeout(() => {
                  setSaving(false)
                  setOpen(false)
                }, 600)
              }}
            >
              Save changes
            </Button>
          </>
        }
      />
    </>
  )
}`}
        />
      </GallerySection>

      <GallerySection
        eyebrow="03 · Info"
        title="Simple notice"
        description="Primary tone with short body and a single OK action"
        panel="wash-panel-blue"
      >
        <ShowcaseTabs
          preview={
            <>
              <Button
                type="button"
                variant="primary"
                className="cursor-pointer"
                onClick={() => setInfoOpen(true)}
              >
                Show notice
              </Button>
              <DialogTemplate
                open={infoOpen}
                onClose={() => setInfoOpen(false)}
                tone="primary"
                header="Wash export ready"
                desc="Your pigment pack finished rendering."
                contents={
                  <p className="text-sm">
                    Download starts from the studio desk Downloads folder.
                  </p>
                }
                actions={
                  <Button
                    type="button"
                    variant="primary"
                    className="cursor-pointer"
                    onClick={() => setInfoOpen(false)}
                  >
                    OK
                  </Button>
                }
              />
            </>
          }
          html={`<button type="button" class="btn btn-primary cursor-pointer">Show notice</button>

<dialog class="modal" open>
  <div class="modal-box flex max-h-[min(90vh,40rem)] flex-col border border-ink-border bg-base-100 p-0" role="document">
    <div class="shrink-0 px-4 pt-4 pb-3">
      <h2 class="card-title text-primary font-bold">Wash export ready</h2>
      <p class="mt-0.5 text-xs text-ink-muted">Your pigment pack finished rendering.</p>
    </div>
    <div class="shrink-0 border-t border-base-300" role="separator"></div>
    <div class="min-h-0 flex-1 overflow-y-auto px-4 py-3">
      <p class="text-sm">Download starts from the studio desk Downloads folder.</p>
    </div>
    <div class="shrink-0 border-t border-base-300" role="separator"></div>
    <div class="modal-action mt-0 shrink-0 px-4 py-3">
      <button type="button" class="btn btn-primary cursor-pointer">OK</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button type="submit" class="cursor-pointer" aria-label="Close">close</button>
  </form>
</dialog>`}
          jsx={`import { useState } from 'react'
import { Button, DialogTemplate } from '@menzies-mariesta-com/menzies-design-wash-ui'

function InfoDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="button" variant="primary" onClick={() => setOpen(true)}>
        Show notice
      </Button>
      <DialogTemplate
        open={open}
        onClose={() => setOpen(false)}
        tone="primary"
        header="Wash export ready"
        desc="Your pigment pack finished rendering."
        contents={
          <p className="text-sm">
            Download starts from the studio desk Downloads folder.
          </p>
        }
        actions={
          <Button type="button" variant="primary" onClick={() => setOpen(false)}>
            OK
          </Button>
        }
      />
    </>
  )
}`}
        />
      </GallerySection>
    </div>
  )
}
