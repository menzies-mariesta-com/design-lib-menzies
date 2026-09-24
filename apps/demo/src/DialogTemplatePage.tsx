import { useState } from 'react'
import {
  Button,
  DialogTemplate,
} from '#plain'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  dialogConfirmHtml,
  dialogConfirmJsx,
  dialogFormHtml,
  dialogFormJsx,
  dialogInfoHtml,
  dialogInfoJsx,
  dialogSvelteFiles,
} from './snippets/svelte/dialog'

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
          Composed modal recipes using daisyUI{' '}
          <code className="font-mono text-xs">modal</code> /{' '}
          <code className="font-mono text-xs">&lt;dialog&gt;</code> with header, body, and actions.
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
          html={dialogConfirmHtml}
          jsx={dialogConfirmJsx}
          svelteFiles={dialogSvelteFiles}
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
          html={dialogFormHtml}
          jsx={dialogFormJsx}
          svelteFiles={dialogSvelteFiles}
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
          html={dialogInfoHtml}
          jsx={dialogInfoJsx}
          svelteFiles={dialogSvelteFiles}
        />
      </GallerySection>
    </div>
  )
}
