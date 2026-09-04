import { useState, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'textarea-neutral' },
  { name: 'Primary', className: 'textarea-primary' },
  { name: 'Secondary', className: 'textarea-secondary' },
  { name: 'Accent', className: 'textarea-accent' },
  { name: 'Info', className: 'textarea-info' },
  { name: 'Success', className: 'textarea-success' },
  { name: 'Warning', className: 'textarea-warning' },
  { name: 'Error', className: 'textarea-error' },
] as const

const sizes = [
  { name: 'XS', className: 'textarea-xs' },
  { name: 'SM', className: 'textarea-sm' },
  { name: 'MD', className: 'textarea-md' },
  { name: 'LG', className: 'textarea-lg' },
  { name: 'XL', className: 'textarea-xl' },
] as const

const NOTES_MAX = 280

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
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'textarea'}
    </code>
  )
}

function RequiredMark() {
  return (
    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
      *
    </span>
  )
}

export default function TextareaPage() {
  const [notes, setNotes] = useState('')
  const [critique, setCritique] = useState('')

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Textarea
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">textarea</span> size,
          color, and state for multi-line studio notes.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Default textarea"
          description="Multi-line field with placeholder"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex max-w-md flex-col gap-2">
                            <textarea
                              className="textarea w-full cursor-text border-ink-border"
                              placeholder="Describe the wash…"
                              rows={4}
                            />
                            <ClassLabel value="textarea" />
                          </div>
              </>
            }
            html={`<div class="flex max-w-md flex-col gap-2">
            <textarea
              class="textarea w-full cursor-text border-ink-border"
              placeholder="Describe the wash…"
              rows=
            />
            
          </div>`}
            jsx={`<div className="flex max-w-md flex-col gap-2">
            <textarea
              className="textarea w-full cursor-text border-ink-border"
              placeholder="Describe the wash…"
              rows={4}
            />
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Size scale"
          description="From compact notes to XL critique blocks"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex max-w-lg flex-col gap-4">
                            {sizes.map((s) => (
                              <div key={s.name} className="flex flex-col gap-1">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                                  <span className="label-ink w-8 shrink-0 pt-2">{s.name}</span>
                                  <textarea
                                    className={`textarea textarea-primary w-full cursor-text ${s.className}`}
                                    placeholder={`${s.name} textarea`}
                                    rows={2}
                                    aria-label={`${s.name} textarea`}
                                  />
                                </div>
                                <ClassLabel value={`textarea ${s.className}`} />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex max-w-lg flex-col gap-4">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex max-w-lg flex-col gap-4">
            {sizes.map((s) => (
              <div key={s.name} className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                  <span className="label-ink w-8 shrink-0 pt-2">{s.name}</span>
                  <textarea
                    className={\`textarea textarea-primary w-full cursor-text \${s.className}\`}
                    placeholder={\`\${s.name} textarea\`}
                    rows={2}
                    aria-label={\`\${s.name} textarea\`}
                  />
                </div>
                
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Colors & ghost"
          title="Semantic colors and ghost"
          description="Neutral through error accents, plus borderless ghost"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {colors.map((c) => (
                              <div key={c.name} className="flex flex-col gap-2">
                                <textarea
                                  className={`textarea w-full cursor-text ${c.className}`}
                                  placeholder={c.name}
                                  rows={3}
                                  aria-label={c.name}
                                />
                                <ClassLabel
                                  value={c.className ? `textarea ${c.className}` : 'textarea'}
                                />
                              </div>
                            ))}
                            <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-3">
                              <textarea
                                className="textarea textarea-ghost w-full max-w-md cursor-text"
                                placeholder="Ghost textarea…"
                                rows={3}
                                aria-label="Ghost textarea"
                              />
                              <ClassLabel value="textarea textarea-ghost" />
                            </div>
                          </div>
              </>
            }
            html={`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <!-- repeat for each item -->
            <div class="flex flex-col gap-2 sm:col-span-2 lg:col-span-3">
              <textarea
                class="textarea textarea-ghost w-full max-w-md cursor-text"
                placeholder="Ghost textarea…"
                rows=
                aria-label="Ghost textarea"
              />
              
            </div>
          </div>`}
            jsx={`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <textarea
                  className={\`textarea w-full cursor-text \${c.className}\`}
                  placeholder={c.name}
                  rows={3}
                  aria-label={c.name}
                />
                
              </div>
            ))}
            <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-3">
              <textarea
                className="textarea textarea-ghost w-full max-w-md cursor-text"
                placeholder="Ghost textarea…"
                rows={3}
                aria-label="Ghost textarea"
              />
              
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · States"
          title="Disabled and readonly"
          description="Locked fields for archived plate notes"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid max-w-lg gap-4 sm:grid-cols-2 sm:max-w-none">
                            <div className="flex flex-col gap-2">
                              <textarea
                                className="textarea w-full border-ink-border cursor-not-allowed"
                                placeholder="Disabled…"
                                rows={3}
                                disabled
                              />
                              <ClassLabel value="disabled" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <textarea
                                className="textarea w-full cursor-default border-ink-border"
                                rows={3}
                                defaultValue="WS-214 · Coastal fog. Soft cobalt underpainting held overnight."
                                readOnly
                              />
                              <ClassLabel value="readOnly" />
                            </div>
                          </div>
              </>
            }
            html={`<div class="grid max-w-lg gap-4 sm:grid-cols-2 sm:max-w-none">
            <div class="flex flex-col gap-2">
              <textarea
                class="textarea w-full border-ink-border cursor-not-allowed"
                placeholder="Disabled…"
                rows=
                disabled
              />
              
            </div>
            <div class="flex flex-col gap-2">
              <textarea
                class="textarea w-full cursor-default border-ink-border"
                rows=
                value="WS-214 · Coastal fog. Soft cobalt underpainting held overnight."
                readOnly
              />
              
            </div>
          </div>`}
            jsx={`<div className="grid max-w-lg gap-4 sm:grid-cols-2 sm:max-w-none">
            <div className="flex flex-col gap-2">
              <textarea
                className="textarea w-full border-ink-border cursor-not-allowed"
                placeholder="Disabled…"
                rows={3}
                disabled
              />
              
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                className="textarea w-full cursor-default border-ink-border"
                rows={3}
                defaultValue="WS-214 · Coastal fog. Soft cobalt underpainting held overnight."
                readOnly
              />
              
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Labels & fieldset"
          title="Labeled fields"
          description="Fieldset with required asterisk beside the label text"
        >
          <ShowcaseTabs
            preview={
              <>
                <fieldset className="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
                            <legend className="fieldset-legend">Plate notes</legend>
                            <label className="label" htmlFor="ta-summary">
                              <span className="label-text">
                                Summary
                                <RequiredMark />
                              </span>
                            </label>
                            <textarea
                              id="ta-summary"
                              className="textarea textarea-primary w-full cursor-text"
                              placeholder="One sentence for the ledger…"
                              rows={3}
                              required
                            />
                            <label className="label" htmlFor="ta-process">
                              <span className="label-text">Process</span>
                            </label>
                            <textarea
                              id="ta-process"
                              className="textarea w-full cursor-text border-ink-border"
                              placeholder="Optional process notes…"
                              rows={3}
                            />
                            <p className="label">Asterisk marks required fields</p>
                          </fieldset>
                          <p className="mt-3">
                            <ClassLabel value="fieldset + label + textarea" />
                          </p>
              </>
            }
            html={`<fieldset class="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
            <legend class="fieldset-legend">Plate notes</legend>
            <label class="label" for="ta-summary">
              <span class="label-text">
                Summary
                <RequiredMark />
              </span>
            </label>
            <textarea
              id="ta-summary"
              class="textarea textarea-primary w-full cursor-text"
              placeholder="One sentence for the ledger…"
              rows=
              required
            />
            <label class="label" for="ta-process">
              <span class="label-text">Process</span>
            </label>
            <textarea
              id="ta-process"
              class="textarea w-full cursor-text border-ink-border"
              placeholder="Optional process notes…"
              rows=
            />
            <p class="label">Asterisk marks required fields</p>
          </fieldset>
          <p class="mt-3">
            
          </p>`}
            jsx={`<fieldset className="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
            <legend className="fieldset-legend">Plate notes</legend>
            <label className="label" htmlFor="ta-summary">
              <span className="label-text">
                Summary
                <RequiredMark />
              </span>
            </label>
            <textarea
              id="ta-summary"
              className="textarea textarea-primary w-full cursor-text"
              placeholder="One sentence for the ledger…"
              rows={3}
              required
            />
            <label className="label" htmlFor="ta-process">
              <span className="label-text">Process</span>
            </label>
            <textarea
              id="ta-process"
              className="textarea w-full cursor-text border-ink-border"
              placeholder="Optional process notes…"
              rows={3}
            />
            <p className="label">Asterisk marks required fields</p>
          </fieldset>
          <p className="mt-3">
            
          </p>`}
          />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Wash notes and critique"
          description="Create-style form with required fields and optional character count"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="mx-auto w-full max-w-xl">
                            <div className="card bg-base-100/90 shadow-sm">
                              <div className="card-body gap-4">
                                <h2 className="card-title text-primary font-bold">Add critique</h2>
                                <p className="text-sm text-ink-muted">
                                  Capture wash notes and a short critique for the plate ledger.
                                </p>
                
                                <div className="flex flex-col gap-1">
                                  <label className="label" htmlFor="studio-notes">
                                    <span className="label-text">
                                      Wash notes
                                      <RequiredMark />
                                    </span>
                                  </label>
                                  <textarea
                                    id="studio-notes"
                                    className="textarea textarea-primary w-full cursor-text"
                                    placeholder="Pigment mixes, drying times, paper tooth…"
                                    rows={4}
                                    required
                                    maxLength={NOTES_MAX}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                  />
                                  <div className="flex justify-between gap-2">
                                    <span className="label-text-alt text-ink-muted">Required</span>
                                    <span className="label-text-alt tabular-nums text-ink-muted">
                                      {notes.length}/{NOTES_MAX}
                                    </span>
                                  </div>
                                </div>
                
                                <div className="flex flex-col gap-1">
                                  <label className="label" htmlFor="studio-critique">
                                    <span className="label-text">
                                      Critique
                                      <RequiredMark />
                                    </span>
                                  </label>
                                  <textarea
                                    id="studio-critique"
                                    className="textarea w-full cursor-text border-ink-border"
                                    placeholder="What holds, what needs another pass…"
                                    rows={5}
                                    required
                                    value={critique}
                                    onChange={(e) => setCritique(e.target.value)}
                                  />
                                  <span className="label-text-alt text-ink-muted">
                                    No character limit on critique
                                  </span>
                                </div>
                
                                <div className="card-actions justify-end pt-2">
                                  <button type="button" className="btn btn-ghost cursor-pointer">
                                    Clear
                                  </button>
                                  <button type="button" className="btn btn-primary cursor-pointer">
                                    Save critique
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
              </>
            }
            html={`<div class="mx-auto w-full max-w-xl">
            <div class="card bg-base-100/90 shadow-sm">
              <div class="card-body gap-4">
                <h2 class="card-title text-primary font-bold">Add critique</h2>
                <p class="text-sm text-ink-muted">
                  Capture wash notes and a short critique for the plate ledger.
                </p>

                <div class="flex flex-col gap-1">
                  <label class="label" for="studio-notes">
                    <span class="label-text">
                      Wash notes
                      <RequiredMark />
                    </span>
                  </label>
                  <textarea
                    id="studio-notes"
                    class="textarea textarea-primary w-full cursor-text"
                    placeholder="Pigment mixes, drying times, paper tooth…"
                    rows=
                    required
                    maxLength=
                    value=
                    onChange=
                  />
                  <div class="flex justify-between gap-2">
                    <span class="label-text-alt text-ink-muted">Required</span>
                    <span class="label-text-alt tabular-nums text-ink-muted">
                      /
                    </span>
                  </div>
                </div>

                <div class="flex flex-col gap-1">
                  <label class="label" for="studio-critique">
                    <span class="label-text">
                      Critique
                      <RequiredMark />
                    </span>
                  </label>
                  <textarea
                    id="studio-critique"
                    class="textarea w-full cursor-text border-ink-border"
                    placeholder="What holds, what needs another pass…"
                    rows=
                    required
                    value=
                    onChange=
                  />
                  <span class="label-text-alt text-ink-muted">
                    No character limit on critique
                  </span>
                </div>

                <div class="card-actions justify-end pt-2">
                  <button type="button" class="btn btn-ghost cursor-pointer">
                    Clear
                  </button>
                  <button type="button" class="btn btn-primary cursor-pointer">
                    Save critique
                  </button>
                </div>
              </div>
            </div>
          </div>`}
            jsx={`<div className="mx-auto w-full max-w-xl">
            <div className="card bg-base-100/90 shadow-sm">
              <div className="card-body gap-4">
                <h2 className="card-title text-primary font-bold">Add critique</h2>
                <p className="text-sm text-ink-muted">
                  Capture wash notes and a short critique for the plate ledger.
                </p>

                <div className="flex flex-col gap-1">
                  <label className="label" htmlFor="studio-notes">
                    <span className="label-text">
                      Wash notes
                      <RequiredMark />
                    </span>
                  </label>
                  <textarea
                    id="studio-notes"
                    className="textarea textarea-primary w-full cursor-text"
                    placeholder="Pigment mixes, drying times, paper tooth…"
                    rows={4}
                    required
                    maxLength={NOTES_MAX}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="flex justify-between gap-2">
                    <span className="label-text-alt text-ink-muted">Required</span>
                    <span className="label-text-alt tabular-nums text-ink-muted">
                      {notes.length}/{NOTES_MAX}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="label" htmlFor="studio-critique">
                    <span className="label-text">
                      Critique
                      <RequiredMark />
                    </span>
                  </label>
                  <textarea
                    id="studio-critique"
                    className="textarea w-full cursor-text border-ink-border"
                    placeholder="What holds, what needs another pass…"
                    rows={5}
                    required
                    value={critique}
                    onChange={(e) => setCritique(e.target.value)}
                  />
                  <span className="label-text-alt text-ink-muted">
                    No character limit on critique
                  </span>
                </div>

                <div className="card-actions justify-end pt-2">
                  <button type="button" className="btn btn-ghost cursor-pointer">
                    Clear
                  </button>
                  <button type="button" className="btn btn-primary cursor-pointer">
                    Save critique
                  </button>
                </div>
              </div>
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Fluid width"
          description="Textareas span full width on mobile and cap on larger screens"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <label className="label" htmlFor="ta-mobile">
                                <span className="label-text">Mobile-first note</span>
                              </label>
                              <textarea
                                id="ta-mobile"
                                className="textarea w-full cursor-text border-ink-border"
                                placeholder="Full width on small screens…"
                                rows={4}
                              />
                              <ClassLabel value="textarea w-full" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="label" htmlFor="ta-desktop">
                                <span className="label-text">Desktop companion</span>
                              </label>
                              <textarea
                                id="ta-desktop"
                                className="textarea textarea-secondary w-full cursor-text md:min-h-32"
                                placeholder="Stacks beside on md+…"
                                rows={4}
                              />
                              <ClassLabel value="textarea w-full md:min-h-32" />
                            </div>
                          </div>
              </>
            }
            html={`<div class="grid gap-4 md:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label class="label" for="ta-mobile">
                <span class="label-text">Mobile-first note</span>
              </label>
              <textarea
                id="ta-mobile"
                class="textarea w-full cursor-text border-ink-border"
                placeholder="Full width on small screens…"
                rows=
              />
              
            </div>
            <div class="flex flex-col gap-2">
              <label class="label" for="ta-desktop">
                <span class="label-text">Desktop companion</span>
              </label>
              <textarea
                id="ta-desktop"
                class="textarea textarea-secondary w-full cursor-text md:min-h-32"
                placeholder="Stacks beside on md+…"
                rows=
              />
              
            </div>
          </div>`}
            jsx={`<div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="ta-mobile">
                <span className="label-text">Mobile-first note</span>
              </label>
              <textarea
                id="ta-mobile"
                className="textarea w-full cursor-text border-ink-border"
                placeholder="Full width on small screens…"
                rows={4}
              />
              
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="ta-desktop">
                <span className="label-text">Desktop companion</span>
              </label>
              <textarea
                id="ta-desktop"
                className="textarea textarea-secondary w-full cursor-text md:min-h-32"
                placeholder="Stacks beside on md+…"
                rows={4}
              />
              
            </div>
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
