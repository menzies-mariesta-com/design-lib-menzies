import type { ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
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

function RequiredMark() {
  return (
    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
      *
    </span>
  )
}

const floatingSizes = [
  { name: 'XS', className: 'input-xs' },
  { name: 'SM', className: 'input-sm' },
  { name: 'MD', className: 'input-md' },
  { name: 'LG', className: 'input-lg' },
  { name: 'XL', className: 'input-xl' },
] as const

export default function LabelPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Label
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">label</span> and <span className="font-mono text-xs">floating-label</span> and floating-label for naming fields, helpers, and control captions.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Label and input"
          description="Stacked label above a text field, linked with htmlFor and id"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex max-w-md flex-col gap-2">
                          <label className="label" htmlFor="lbl-basic-title">
                            Plate title
                          </label>
                          <input
                            id="lbl-basic-title"
                            type="text"
                            className="input w-full cursor-text border-ink-border"
                            placeholder="Coastal fog"
                          />
                          <ClassLabel value="label + input" />
                        </div>
            
              </>
            }
            html={`<div class="flex max-w-md flex-col gap-2">
            <label class="label" for="lbl-basic-title">
              Plate title
            </label>
            <input
              id="lbl-basic-title"
              type="text"
              class="input w-full cursor-text border-ink-border"
              placeholder="Coastal fog" />
            <!-- ClassLabel -->
          </div>`}
            jsx={`<div className="flex max-w-md flex-col gap-2">
            <label className="label" htmlFor="lbl-basic-title">
              Plate title
            </label>
            <input
              id="lbl-basic-title"
              type="text"
              className="input w-full cursor-text border-ink-border"
              placeholder="Coastal fog"
            />
            <ClassLabel value="label + input" />
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="02 · Helper"
          title="Helper and alt text"
          description="Primary label above; daisyUI label helper below"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid max-w-lg gap-6">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-3">
                              <label className="label" htmlFor="lbl-helper-series">
                                <span className="label-text">Series name</span>
                              </label>
                              <span className="label text-xs">Optional</span>
                            </div>
                            <input
                              id="lbl-helper-series"
                              type="text"
                              className="input w-full cursor-text border-ink-border"
                              placeholder="Atlantic Studies"
                            />
                            <p className="label">Shown on shared plate sheets</p>
                            <ClassLabel value="label + label-text + p.label helper" />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="input w-full cursor-text border-ink-border">
                              <span className="label">https://</span>
                              <input
                                type="text"
                                className="cursor-text grow"
                                placeholder="menzies.design"
                                aria-label="Studio URL"
                              />
                            </label>
                            <ClassLabel value="input + span.label prefix" />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="input w-full cursor-text border-ink-border">
                              <input
                                type="text"
                                className="cursor-text grow"
                                placeholder="menzies"
                                aria-label="Domain name"
                              />
                              <span className="label">.studio</span>
                            </label>
                            <ClassLabel value="input + span.label suffix" />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="select w-full cursor-pointer border-ink-border">
                              <span className="label">Type</span>
                              <select className="cursor-pointer grow" defaultValue="personal" aria-label="Account type">
                                <option value="personal">Personal</option>
                                <option value="business">Studio</option>
                              </select>
                            </label>
                            <ClassLabel value="select + span.label" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="grid max-w-lg gap-6">
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between gap-3">
                <label class="label" for="lbl-helper-series">
                  <span class="label-text">Series name</span>
                </label>
                <span class="label text-xs">Optional</span>
              </div>
              <input
                id="lbl-helper-series"
                type="text"
                class="input w-full cursor-text border-ink-border"
                placeholder="Atlantic Studies" />
              <p class="label">Shown on shared plate sheets</p>
              <!-- ClassLabel -->
            </div>

            <div class="flex flex-col gap-2">
              <label class="input w-full cursor-text border-ink-border">
                <span class="label">https://</span>
                <input
                  type="text"
                  class="cursor-text grow"
                  placeholder="menzies.design"
                  aria-label="Studio URL" />
              </label>
              <!-- ClassLabel -->
            </div>

            <div class="flex flex-col gap-2">
              <label class="input w-full cursor-text border-ink-border">
                <input
                  type="text"
                  class="cursor-text grow"
                  placeholder="menzies"
                  aria-label="Domain name" />
                <span class="label">.studio</span>
              </label>
              <!-- ClassLabel -->
            </div>

            <div class="flex flex-col gap-2">
              <label class="select w-full cursor-pointer border-ink-border">
                <span class="label">Type</span>
                <select class="cursor-pointer grow" value="personal" aria-label="Account type">
                  <option value="personal">Personal</option>
                  <option value="business">Studio</option>
                </select>
              </label>
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="grid max-w-lg gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <label className="label" htmlFor="lbl-helper-series">
                  <span className="label-text">Series name</span>
                </label>
                <span className="label text-xs">Optional</span>
              </div>
              <input
                id="lbl-helper-series"
                type="text"
                className="input w-full cursor-text border-ink-border"
                placeholder="Atlantic Studies"
              />
              <p className="label">Shown on shared plate sheets</p>
              <ClassLabel value="label + label-text + p.label helper" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="input w-full cursor-text border-ink-border">
                <span className="label">https://</span>
                <input
                  type="text"
                  className="cursor-text grow"
                  placeholder="menzies.design"
                  aria-label="Studio URL"
                />
              </label>
              <ClassLabel value="input + span.label prefix" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="input w-full cursor-text border-ink-border">
                <input
                  type="text"
                  className="cursor-text grow"
                  placeholder="menzies"
                  aria-label="Domain name"
                />
                <span className="label">.studio</span>
              </label>
              <ClassLabel value="input + span.label suffix" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="select w-full cursor-pointer border-ink-border">
                <span className="label">Type</span>
                <select className="cursor-pointer grow" defaultValue="personal" aria-label="Account type">
                  <option value="personal">Personal</option>
                  <option value="business">Studio</option>
                </select>
              </label>
              <ClassLabel value="select + span.label" />
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="03 · Required"
          title="Required field asterisk"
          description="Error-colored asterisk beside the label text, paired"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid max-w-md gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="label" htmlFor="lbl-req-pigment">
                              Pigment
                              <RequiredMark />
                            </label>
                            <input
                              id="lbl-req-pigment"
                              type="text"
                              className="input input-primary w-full cursor-text"
                              placeholder="Ultramarine"
                              required
                            />
                            <ClassLabel value="label + text-error * + required" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="label" htmlFor="lbl-req-notes">
                              Notes
                            </label>
                            <input
                              id="lbl-req-notes"
                              type="text"
                              className="input w-full cursor-text border-ink-border"
                              placeholder="Optional glaze notes"
                            />
                            <p className="label">Optional fields omit the asterisk</p>
                            <ClassLabel value="label (optional, no asterisk)" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="grid max-w-md gap-4">
            <div class="flex flex-col gap-2">
              <label class="label" for="lbl-req-pigment">
                Pigment
                <!-- RequiredMark -->
              </label>
              <input
                id="lbl-req-pigment"
                type="text"
                class="input input-primary w-full cursor-text"
                placeholder="Ultramarine"
                required />
              <!-- ClassLabel -->
            </div>
            <div class="flex flex-col gap-2">
              <label class="label" for="lbl-req-notes">
                Notes
              </label>
              <input
                id="lbl-req-notes"
                type="text"
                class="input w-full cursor-text border-ink-border"
                placeholder="Optional glaze notes" />
              <p class="label">Optional fields omit the asterisk</p>
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="grid max-w-md gap-4">
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="lbl-req-pigment">
                Pigment
                <RequiredMark />
              </label>
              <input
                id="lbl-req-pigment"
                type="text"
                className="input input-primary w-full cursor-text"
                placeholder="Ultramarine"
                required
              />
              <ClassLabel value="label + text-error * + required" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="lbl-req-notes">
                Notes
              </label>
              <input
                id="lbl-req-notes"
                type="text"
                className="input w-full cursor-text border-ink-border"
                placeholder="Optional glaze notes"
              />
              <p className="label">Optional fields omit the asterisk</p>
              <ClassLabel value="label (optional, no asterisk)" />
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="04 · Floating"
          title="Floating label"
          description="floating-label lifts the caption when the field is focused"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid max-w-lg gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="floating-label">
                              <span>Studio email</span>
                              <input
                                type="email"
                                placeholder="you@menzies.design"
                                className="input input-md w-full cursor-text border-ink-border"
                              />
                            </label>
                            <ClassLabel value="floating-label + input" />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="floating-label">
                              <span>
                                Recipe name
                                <RequiredMark />
                              </span>
                              <input
                                type="text"
                                placeholder="Cerulean glaze"
                                className="input input-primary input-md w-full cursor-text"
                                required
                              />
                            </label>
                            <ClassLabel value="floating-label + required *" />
                          </div>

                          <div className="flex flex-col gap-3">
                            {floatingSizes.map((s) => (
                              <div key={s.name} className="flex flex-col gap-1">
                                <label className="floating-label">
                                  <input
                                    type="text"
                                    placeholder={s.name}
                                    className={`input input-primary w-full cursor-text ${s.className}`}
                                  />
                                  <span>{s.name}</span>
                                </label>
                                <ClassLabel value={`floating-label + input ${s.className}`} />
                              </div>
                            ))}
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="grid max-w-lg gap-4">
            <div class="flex flex-col gap-2">
              <label class="floating-label">
                <span>Studio email</span>
                <input
                  type="email"
                  placeholder="you@menzies.design"
                  class="input input-md w-full cursor-text border-ink-border" />
              </label>
              <!-- ClassLabel -->
            </div>

            <div class="flex flex-col gap-2">
              <label class="floating-label">
                <span>
                  Recipe name
                  <!-- RequiredMark -->
                </span>
                <input
                  type="text"
                  placeholder="Cerulean glaze"
                  class="input input-primary input-md w-full cursor-text"
                  required />
              </label>
              <!-- ClassLabel -->
            </div>

            <div class="flex flex-col gap-3">
              {floatingSizes.map((s) => (
                <div key= class="flex flex-col gap-1">
                  <label class="floating-label">
                    <input
                      type="text"
                      placeholder=
                      class= />
                    <span></span>
                  </label>
                  <!-- ClassLabel -->
                </div>
              ))}
            </div>
          </div>`}
            jsx={`<div className="grid max-w-lg gap-4">
            <div className="flex flex-col gap-2">
              <label className="floating-label">
                <span>Studio email</span>
                <input
                  type="email"
                  placeholder="you@menzies.design"
                  className="input input-md w-full cursor-text border-ink-border"
                />
              </label>
              <ClassLabel value="floating-label + input" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="floating-label">
                <span>
                  Recipe name
                  <RequiredMark />
                </span>
                <input
                  type="text"
                  placeholder="Cerulean glaze"
                  className="input input-primary input-md w-full cursor-text"
                  required
                />
              </label>
              <ClassLabel value="floating-label + required *" />
            </div>

            <div className="flex flex-col gap-3">
              {floatingSizes.map((s) => (
                <div key={s.name} className="flex flex-col gap-1">
                  <label className="floating-label">
                    <input
                      type="text"
                      placeholder={s.name}
                      className={\`input input-primary w-full cursor-text \${s.className}\`}
                    />
                    <span>{s.name}</span>
                  </label>
                  <ClassLabel value={\`floating-label + input \${s.className}\`} />
                </div>
              ))}
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="05 · Controls"
          title="Checkbox, toggle, and radio"
          description="Wrap controls in label so the caption is clickable"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          <div className="flex flex-col gap-3">
                            <label className="label cursor-pointer justify-start gap-3">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-primary cursor-pointer"
                                defaultChecked
                              />
                              <span className="label-text">Allow wet-on-wet bloom</span>
                            </label>
                            <label className="label cursor-pointer justify-start gap-3">
                              <input type="checkbox" className="checkbox cursor-pointer" />
                              <span className="label-text">Lock layer after dry</span>
                            </label>
                            <ClassLabel value="label + checkbox + label-text" />
                          </div>

                          <div className="flex flex-col gap-3">
                            <label className="label cursor-pointer justify-start gap-3">
                              <input
                                type="checkbox"
                                className="toggle toggle-primary cursor-pointer"
                                defaultChecked
                              />
                              <span className="label-text">Show grid overlay</span>
                            </label>
                            <label className="label cursor-pointer justify-start gap-3">
                              <input type="checkbox" className="toggle cursor-pointer" />
                              <span className="label-text">Snap to wash guides</span>
                            </label>
                            <ClassLabel value="label + toggle + label-text" />
                          </div>

                          <div className="flex flex-col gap-3">
                            <label className="label cursor-pointer justify-start gap-3">
                              <input
                                type="radio"
                                name="lbl-paper"
                                className="radio radio-primary cursor-pointer"
                                defaultChecked
                              />
                              <span className="label-text">Cold press</span>
                            </label>
                            <label className="label cursor-pointer justify-start gap-3">
                              <input
                                type="radio"
                                name="lbl-paper"
                                className="radio radio-primary cursor-pointer"
                              />
                              <span className="label-text">Hot press</span>
                            </label>
                            <label className="label cursor-pointer justify-start gap-3">
                              <input
                                type="radio"
                                name="lbl-paper"
                                className="radio radio-primary cursor-pointer"
                              />
                              <span className="label-text">Rough</span>
                            </label>
                            <ClassLabel value="label + radio + label-text" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col gap-3">
              <label class="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary cursor-pointer"
                  checked />
                <span class="label-text">Allow wet-on-wet bloom</span>
              </label>
              <label class="label cursor-pointer justify-start gap-3">
                <input type="checkbox" class="checkbox cursor-pointer" />
                <span class="label-text">Lock layer after dry</span>
              </label>
              <!-- ClassLabel -->
            </div>

            <div class="flex flex-col gap-3">
              <label class="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  class="toggle toggle-primary cursor-pointer"
                  checked />
                <span class="label-text">Show grid overlay</span>
              </label>
              <label class="label cursor-pointer justify-start gap-3">
                <input type="checkbox" class="toggle cursor-pointer" />
                <span class="label-text">Snap to wash guides</span>
              </label>
              <!-- ClassLabel -->
            </div>

            <div class="flex flex-col gap-3">
              <label class="label cursor-pointer justify-start gap-3">
                <input
                  type="radio"
                  name="lbl-paper"
                  class="radio radio-primary cursor-pointer"
                  checked />
                <span class="label-text">Cold press</span>
              </label>
              <label class="label cursor-pointer justify-start gap-3">
                <input
                  type="radio"
                  name="lbl-paper"
                  class="radio radio-primary cursor-pointer" />
                <span class="label-text">Hot press</span>
              </label>
              <label class="label cursor-pointer justify-start gap-3">
                <input
                  type="radio"
                  name="lbl-paper"
                  class="radio radio-primary cursor-pointer" />
                <span class="label-text">Rough</span>
              </label>
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-3">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary cursor-pointer"
                  defaultChecked
                />
                <span className="label-text">Allow wet-on-wet bloom</span>
              </label>
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="checkbox cursor-pointer" />
                <span className="label-text">Lock layer after dry</span>
              </label>
              <ClassLabel value="label + checkbox + label-text" />
            </div>

            <div className="flex flex-col gap-3">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="toggle toggle-primary cursor-pointer"
                  defaultChecked
                />
                <span className="label-text">Show grid overlay</span>
              </label>
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="toggle cursor-pointer" />
                <span className="label-text">Snap to wash guides</span>
              </label>
              <ClassLabel value="label + toggle + label-text" />
            </div>

            <div className="flex flex-col gap-3">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="radio"
                  name="lbl-paper"
                  className="radio radio-primary cursor-pointer"
                  defaultChecked
                />
                <span className="label-text">Cold press</span>
              </label>
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="radio"
                  name="lbl-paper"
                  className="radio radio-primary cursor-pointer"
                />
                <span className="label-text">Hot press</span>
              </label>
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="radio"
                  name="lbl-paper"
                  className="radio radio-primary cursor-pointer"
                />
                <span className="label-text">Rough</span>
              </label>
              <ClassLabel value="label + radio + label-text" />
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="06 · Studio form"
          title="Wash recipe labels"
          description="Create form with required asterisks, helpers, and a primary title"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mx-auto w-full max-w-xl">
                          <div className="card bg-base-100/90 shadow-sm">
                            <div className="card-body gap-4">
                              <h2 className="card-title text-primary font-bold">Add wash recipe</h2>

                              <div className="flex flex-col gap-2">
                                <label className="label" htmlFor="lbl-studio-pigment">
                                  Pigment
                                  <RequiredMark />
                                </label>
                                <input
                                  id="lbl-studio-pigment"
                                  type="text"
                                  className="input input-primary w-full cursor-text"
                                  placeholder="Ultramarine"
                                  required
                                />
                              </div>

                              <div className="flex flex-col gap-2">
                                <label className="label" htmlFor="lbl-studio-dilution">
                                  Dilution
                                  <RequiredMark />
                                </label>
                                <select
                                  id="lbl-studio-dilution"
                                  className="select select-primary w-full cursor-pointer"
                                  defaultValue=""
                                  required
                                >
                                  <option disabled value="">
                                    Pick dilution…
                                  </option>
                                  <option value="glaze">Glaze</option>
                                  <option value="wash">Wash</option>
                                  <option value="body">Body color</option>
                                </select>
                              </div>

                              <div className="flex flex-col gap-2">
                                <label className="floating-label">
                                  <span>Paper weight</span>
                                  <input
                                    type="text"
                                    placeholder="300 gsm cold press"
                                    className="input w-full cursor-text border-ink-border"
                                  />
                                </label>
                                <p className="label">Optional. Defaults to studio stock.</p>
                              </div>

                              <label className="label cursor-pointer justify-start gap-3">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-primary cursor-pointer"
                                  defaultChecked
                                />
                                <span className="label-text">Allow wet-on-wet bloom</span>
                              </label>

                              <p className="label">Asterisk marks required fields</p>

                              <div className="card-actions justify-end">
                                <button type="button" className="btn btn-ghost cursor-pointer">
                                  Cancel
                                </button>
                                <button type="button" className="btn btn-primary cursor-pointer">
                                  Save recipe
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3">
                          <ClassLabel value="card-title text-primary + label + floating-label" />
                        </p>
            
              </>
            }
            html={`<div class="mx-auto w-full max-w-xl">
            <div class="card bg-base-100/90 shadow-sm">
              <div class="card-body gap-4">
                <h2 class="card-title text-primary font-bold">Add wash recipe</h2>

                <div class="flex flex-col gap-2">
                  <label class="label" for="lbl-studio-pigment">
                    Pigment
                    <!-- RequiredMark -->
                  </label>
                  <input
                    id="lbl-studio-pigment"
                    type="text"
                    class="input input-primary w-full cursor-text"
                    placeholder="Ultramarine"
                    required />
                </div>

                <div class="flex flex-col gap-2">
                  <label class="label" for="lbl-studio-dilution">
                    Dilution
                    <!-- RequiredMark -->
                  </label>
                  <select
                    id="lbl-studio-dilution"
                    class="select select-primary w-full cursor-pointer"
                    value=""
                    required
                  >
                    <option disabled value="">
                      Pick dilution…
                    </option>
                    <option value="glaze">Glaze</option>
                    <option value="wash">Wash</option>
                    <option value="body">Body color</option>
                  </select>
                </div>

                <div class="flex flex-col gap-2">
                  <label class="floating-label">
                    <span>Paper weight</span>
                    <input
                      type="text"
                      placeholder="300 gsm cold press"
                      class="input w-full cursor-text border-ink-border" />
                  </label>
                  <p class="label">Optional. Defaults to studio stock.</p>
                </div>

                <label class="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-primary cursor-pointer"
                    checked />
                  <span class="label-text">Allow wet-on-wet bloom</span>
                </label>

                <p class="label">Asterisk marks required fields</p>

                <div class="card-actions justify-end">
                  <button type="button" class="btn btn-ghost cursor-pointer">
                    Cancel
                  </button>
                  <button type="button" class="btn btn-primary cursor-pointer">
                    Save recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<div className="mx-auto w-full max-w-xl">
            <div className="card bg-base-100/90 shadow-sm">
              <div className="card-body gap-4">
                <h2 className="card-title text-primary font-bold">Add wash recipe</h2>

                <div className="flex flex-col gap-2">
                  <label className="label" htmlFor="lbl-studio-pigment">
                    Pigment
                    <RequiredMark />
                  </label>
                  <input
                    id="lbl-studio-pigment"
                    type="text"
                    className="input input-primary w-full cursor-text"
                    placeholder="Ultramarine"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label" htmlFor="lbl-studio-dilution">
                    Dilution
                    <RequiredMark />
                  </label>
                  <select
                    id="lbl-studio-dilution"
                    className="select select-primary w-full cursor-pointer"
                    defaultValue=""
                    required
                  >
                    <option disabled value="">
                      Pick dilution…
                    </option>
                    <option value="glaze">Glaze</option>
                    <option value="wash">Wash</option>
                    <option value="body">Body color</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="floating-label">
                    <span>Paper weight</span>
                    <input
                      type="text"
                      placeholder="300 gsm cold press"
                      className="input w-full cursor-text border-ink-border"
                    />
                  </label>
                  <p className="label">Optional. Defaults to studio stock.</p>
                </div>

                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary cursor-pointer"
                    defaultChecked
                  />
                  <span className="label-text">Allow wet-on-wet bloom</span>
                </label>

                <p className="label">Asterisk marks required fields</p>

                <div className="card-actions justify-end">
                  <button type="button" className="btn btn-ghost cursor-pointer">
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary cursor-pointer">
                    Save recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3">
            <ClassLabel value="card-title text-primary + label + floating-label" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Breakpoint-aware floating labels"
          description="Stacks on small screens; floating fields grow from xs to xl across"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-4 md:grid-cols-2">
                          <div className="flex flex-col gap-3 rounded-box border border-base-300 bg-base-200 p-4">
                            <label className="floating-label">
                              <input
                                type="text"
                                placeholder="Plate title"
                                className="input input-xs w-full cursor-text sm:input-sm md:input-md lg:input-lg xl:input-xl"
                                defaultValue="Evening tide"
                              />
                              <span>Plate title</span>
                            </label>
                            <label className="floating-label">
                              <textarea
                                placeholder="Notes"
                                className="textarea textarea-xs w-full cursor-text sm:textarea-sm md:textarea-md lg:textarea-lg xl:textarea-xl"
                                rows={3}
                                defaultValue="Cool wash over warm underpainting"
                              />
                              <span>Notes</span>
                            </label>
                            <ClassLabel value="floating-label + responsive input/textarea sizes" />
                          </div>

                          <div className="flex flex-col gap-3 rounded-box border border-ink-border bg-base-100/80 p-4">
                            <label className="floating-label">
                              <select
                                className="select select-xs w-full cursor-pointer sm:select-sm md:select-md lg:select-lg xl:select-xl"
                                defaultValue="drying"
                              >
                                <option value="draft">Draft</option>
                                <option value="drying">Drying</option>
                                <option value="varnished">Varnished</option>
                              </select>
                              <span>Status</span>
                            </label>
                            <label className="label" htmlFor="lbl-resp-tags">
                              Tags
                            </label>
                            <input
                              id="lbl-resp-tags"
                              type="text"
                              className="input w-full cursor-text border-ink-border"
                              placeholder="coastal, fog, cool"
                            />
                            <p className="label">Comma-separated pigment tags</p>
                            <ClassLabel value="floating-label select + stacked label" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="grid gap-4 md:grid-cols-2">
            <div class="flex flex-col gap-3 rounded-box border border-base-300 bg-base-200 p-4">
              <label class="floating-label">
                <input
                  type="text"
                  placeholder="Plate title"
                  class="input input-xs w-full cursor-text sm:input-sm md:input-md lg:input-lg xl:input-xl"
                  value="Evening tide" />
                <span>Plate title</span>
              </label>
              <label class="floating-label">
                <textarea
                  placeholder="Notes"
                  class="textarea textarea-xs w-full cursor-text sm:textarea-sm md:textarea-md lg:textarea-lg xl:textarea-xl"
                  rows={3}
                  value="Cool wash over warm underpainting" />
                <span>Notes</span>
              </label>
              <!-- ClassLabel -->
            </div>

            <div class="flex flex-col gap-3 rounded-box border border-ink-border bg-base-100/80 p-4">
              <label class="floating-label">
                <select
                  class="select select-xs w-full cursor-pointer sm:select-sm md:select-md lg:select-lg xl:select-xl"
                  value="drying"
                >
                  <option value="draft">Draft</option>
                  <option value="drying">Drying</option>
                  <option value="varnished">Varnished</option>
                </select>
                <span>Status</span>
              </label>
              <label class="label" for="lbl-resp-tags">
                Tags
              </label>
              <input
                id="lbl-resp-tags"
                type="text"
                class="input w-full cursor-text border-ink-border"
                placeholder="coastal, fog, cool" />
              <p class="label">Comma-separated pigment tags</p>
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-box border border-base-300 bg-base-200 p-4">
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="Plate title"
                  className="input input-xs w-full cursor-text sm:input-sm md:input-md lg:input-lg xl:input-xl"
                  defaultValue="Evening tide"
                />
                <span>Plate title</span>
              </label>
              <label className="floating-label">
                <textarea
                  placeholder="Notes"
                  className="textarea textarea-xs w-full cursor-text sm:textarea-sm md:textarea-md lg:textarea-lg xl:textarea-xl"
                  rows={3}
                  defaultValue="Cool wash over warm underpainting"
                />
                <span>Notes</span>
              </label>
              <ClassLabel value="floating-label + responsive input/textarea sizes" />
            </div>

            <div className="flex flex-col gap-3 rounded-box border border-ink-border bg-base-100/80 p-4">
              <label className="floating-label">
                <select
                  className="select select-xs w-full cursor-pointer sm:select-sm md:select-md lg:select-lg xl:select-xl"
                  defaultValue="drying"
                >
                  <option value="draft">Draft</option>
                  <option value="drying">Drying</option>
                  <option value="varnished">Varnished</option>
                </select>
                <span>Status</span>
              </label>
              <label className="label" htmlFor="lbl-resp-tags">
                Tags
              </label>
              <input
                id="lbl-resp-tags"
                type="text"
                className="input w-full cursor-text border-ink-border"
                placeholder="coastal, fog, cool"
              />
              <p className="label">Comma-separated pigment tags</p>
              <ClassLabel value="floating-label select + stacked label" />
            </div>
          </div>`}
          />
        
        </Section>
      </div>
    </>
  )
}
