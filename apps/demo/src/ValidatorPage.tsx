import { useState, type FormEvent, type ReactNode } from 'react'
import { CircleCheck, CircleX } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
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

type ToastTone = 'success' | 'error'

export default function ValidatorPage() {
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(
    null,
  )

  function showToast(tone: ToastTone, message: string) {
    setToast({ tone, message })
    window.setTimeout(() => setToast(null), 2800)
  }

  function onStudioSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      showToast('error', 'Fix pigment fields before saving')
      return
    }
    showToast('success', 'Pigment mix saved')
    form.reset()
  }

  function onSelectDemoSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      showToast('error', 'Pick a wash style first')
      return
    }
    showToast('success', 'Wash style locked in')
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Validator
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">validator</span> and <span className="font-mono text-xs">validator-hint</span> and validator-hint patterns.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Email with hint"
          description="Add validator to an input"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex max-w-md flex-col gap-1">
                            <input
                              type="email"
                              className="input validator w-full cursor-text border-ink-border"
                              required
                              placeholder="studio@atelier.test"
                              aria-label="Email"
                            />
                            <div className="validator-hint">Enter a valid email address</div>
                            <ClassLabel value="input validator + validator-hint" />
                          </div>
              </>
            }
            html={`<div class="flex max-w-md flex-col gap-1">
            <input
              type="email"
              class="input validator w-full cursor-text border-ink-border"
              required
              placeholder="studio@atelier.test"
              aria-label="Email"
            />
            <div class="validator-hint">Enter a valid email address</div>
            
          </div>`}
            jsx={`<div className="flex max-w-md flex-col gap-1">
            <input
              type="email"
              className="input validator w-full cursor-text border-ink-border"
              required
              placeholder="studio@atelier.test"
              aria-label="Email"
            />
            <div className="validator-hint">Enter a valid email address</div>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Patterns"
          title="Email, password, and required shapes"
          description="Common HTML constraint patterns from the daisyUI docs, tuned"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 md:grid-cols-2">
                            <fieldset className="fieldset">
                              <label className="label" htmlFor="val-password">
                                <span className="label-text">
                                  Password
                                  <RequiredMark />
                                </span>
                              </label>
                              <input
                                id="val-password"
                                type="password"
                                className="input validator w-full cursor-text"
                                required
                                placeholder="Password"
                                minLength={8}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                              />
                              <p className="validator-hint">
                                Must be more than 8 characters, including
                                <br />
                                At least one number
                                <br />
                                At least one lowercase letter
                                <br />
                                At least one uppercase letter
                              </p>
                              <ClassLabel value="input validator type=password pattern" />
                            </fieldset>
                
                            <fieldset className="fieldset">
                              <label className="label" htmlFor="val-username">
                                <span className="label-text">
                                  Username
                                  <RequiredMark />
                                </span>
                              </label>
                              <input
                                id="val-username"
                                type="text"
                                className="input validator w-full cursor-text"
                                required
                                placeholder="Username"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength={3}
                                maxLength={30}
                                title="Only letters, numbers or dash"
                              />
                              <p className="validator-hint">
                                Must be 3 to 30 characters
                                <br />
                                containing only letters, numbers or dash
                              </p>
                              <ClassLabel value="input validator pattern username" />
                            </fieldset>
                
                            <fieldset className="fieldset">
                              <label className="label" htmlFor="val-phone">
                                <span className="label-text">
                                  Phone
                                  <RequiredMark />
                                </span>
                              </label>
                              <input
                                id="val-phone"
                                type="tel"
                                className="input validator w-full cursor-text tabular-nums"
                                required
                                placeholder="Phone"
                                pattern="[0-9]*"
                                minLength={10}
                                maxLength={10}
                                title="Must be 10 digits"
                              />
                              <p className="validator-hint">Must be 10 digits</p>
                              <ClassLabel value="input validator type=tel" />
                            </fieldset>
                
                            <fieldset className="fieldset">
                              <label className="label" htmlFor="val-url">
                                <span className="label-text">
                                  Portfolio URL
                                  <RequiredMark />
                                </span>
                              </label>
                              <input
                                id="val-url"
                                type="url"
                                className="input validator w-full cursor-text"
                                required
                                placeholder="https://"
                                defaultValue="https://"
                                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
                                title="Must be valid URL"
                              />
                              <p className="validator-hint">Must be a valid URL</p>
                              <ClassLabel value="input validator type=url" />
                            </fieldset>
                
                            <fieldset className="fieldset">
                              <label className="label" htmlFor="val-date">
                                <span className="label-text">
                                  Session date
                                  <RequiredMark />
                                </span>
                              </label>
                              <input
                                id="val-date"
                                type="date"
                                className="input validator w-full cursor-text"
                                required
                                min="2025-01-01"
                                max="2025-12-31"
                                title="Must be in 2025"
                              />
                              <p className="validator-hint">Must be in 2025</p>
                              <ClassLabel value="input validator type=date min max" />
                            </fieldset>
                
                            <fieldset className="fieldset">
                              <label className="label" htmlFor="val-number">
                                <span className="label-text">
                                  Layer count
                                  <RequiredMark />
                                </span>
                              </label>
                              <input
                                id="val-number"
                                type="number"
                                className="input validator w-full cursor-text"
                                required
                                placeholder="1 to 10"
                                min={1}
                                max={10}
                                title="Must be between 1 and 10"
                              />
                              <p className="validator-hint">Must be between 1 and 10</p>
                              <ClassLabel value="input validator type=number" />
                            </fieldset>
                          </div>
              </>
            }
            html={`<div class="grid gap-6 md:grid-cols-2">
            <fieldset class="fieldset">
              <label class="label" for="val-password">
                <span class="label-text">
                  Password
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-password"
                type="password"
                class="input validator w-full cursor-text"
                required
                placeholder="Password"
                minLength=
                pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])."
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
              <p class="validator-hint">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
              
            </fieldset>

            <fieldset class="fieldset">
              <label class="label" for="val-username">
                <span class="label-text">
                  Username
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-username"
                type="text"
                class="input validator w-full cursor-text"
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\\-]*"
                minLength=
                maxLength=
                title="Only letters, numbers or dash"
              />
              <p class="validator-hint">
                Must be 3 to 30 characters
                <br />
                containing only letters, numbers or dash
              </p>
              
            </fieldset>

            <fieldset class="fieldset">
              <label class="label" for="val-phone">
                <span class="label-text">
                  Phone
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-phone"
                type="tel"
                class="input validator w-full cursor-text tabular-nums"
                required
                placeholder="Phone"
                pattern="[0-9]*"
                minLength=
                maxLength=
                title="Must be 10 digits"
              />
              <p class="validator-hint">Must be 10 digits</p>
              
            </fieldset>

            <fieldset class="fieldset">
              <label class="label" for="val-url">
                <span class="label-text">
                  Portfolio URL
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-url"
                type="url"
                class="input validator w-full cursor-text"
                required
                placeholder="https://"
                value="https://"
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
                title="Must be valid URL"
              />
              <p class="validator-hint">Must be a valid URL</p>
              
            </fieldset>

            <fieldset class="fieldset">
              <label class="label" for="val-date">
                <span class="label-text">
                  Session date
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-date"
                type="date"
                class="input validator w-full cursor-text"
                required
                min="2025-01-01"
                max="2025-12-31"
                title="Must be in 2025"
              />
              <p class="validator-hint">Must be in 2025</p>
              
            </fieldset>

            <fieldset class="fieldset">
              <label class="label" for="val-number">
                <span class="label-text">
                  Layer count
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-number"
                type="number"
                class="input validator w-full cursor-text"
                required
                placeholder="1 to 10"
                min=
                max=
                title="Must be between 1 and 10"
              />
              <p class="validator-hint">Must be between 1 and 10</p>
              
            </fieldset>
          </div>`}
            jsx={`<div className="grid gap-6 md:grid-cols-2">
            <fieldset className="fieldset">
              <label className="label" htmlFor="val-password">
                <span className="label-text">
                  Password
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-password"
                type="password"
                className="input validator w-full cursor-text"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
              <p className="validator-hint">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
              
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="val-username">
                <span className="label-text">
                  Username
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-username"
                type="text"
                className="input validator w-full cursor-text"
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\\-]*"
                minLength={3}
                maxLength={30}
                title="Only letters, numbers or dash"
              />
              <p className="validator-hint">
                Must be 3 to 30 characters
                <br />
                containing only letters, numbers or dash
              </p>
              
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="val-phone">
                <span className="label-text">
                  Phone
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-phone"
                type="tel"
                className="input validator w-full cursor-text tabular-nums"
                required
                placeholder="Phone"
                pattern="[0-9]*"
                minLength={10}
                maxLength={10}
                title="Must be 10 digits"
              />
              <p className="validator-hint">Must be 10 digits</p>
              
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="val-url">
                <span className="label-text">
                  Portfolio URL
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-url"
                type="url"
                className="input validator w-full cursor-text"
                required
                placeholder="https://"
                defaultValue="https://"
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
                title="Must be valid URL"
              />
              <p className="validator-hint">Must be a valid URL</p>
              
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="val-date">
                <span className="label-text">
                  Session date
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-date"
                type="date"
                className="input validator w-full cursor-text"
                required
                min="2025-01-01"
                max="2025-12-31"
                title="Must be in 2025"
              />
              <p className="validator-hint">Must be in 2025</p>
              
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="val-number">
                <span className="label-text">
                  Layer count
                  <RequiredMark />
                </span>
              </label>
              <input
                id="val-number"
                type="number"
                className="input validator w-full cursor-text"
                required
                placeholder="1 to 10"
                min={1}
                max={10}
                title="Must be between 1 and 10"
              />
              <p className="validator-hint">Must be between 1 and 10</p>
              
            </fieldset>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · States"
          title="Success and error"
          description="Valid values take the success color"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-1">
                              <label className="label" htmlFor="val-success">
                                <span className="label-text">Valid email (prefilled)</span>
                              </label>
                              <input
                                id="val-success"
                                type="email"
                                className="input validator w-full cursor-text"
                                required
                                defaultValue="wash@atelier.test"
                                placeholder="studio@atelier.test"
                              />
                              <div className="validator-hint">Enter a valid email address</div>
                              <ClassLabel value="validator (valid → success)" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="label" htmlFor="val-error">
                                <span className="label-text">Invalid email (prefilled)</span>
                              </label>
                              <input
                                id="val-error"
                                type="email"
                                className="input validator w-full cursor-text"
                                required
                                defaultValue="not-an-email"
                                placeholder="studio@atelier.test"
                              />
                              <div className="validator-hint">Enter a valid email address</div>
                              <ClassLabel value="validator (invalid → error + hint)" />
                            </div>
                          </div>
                          <p className="mt-4 text-sm text-ink-muted">
                            Hints stay in the layout by default so the page does not jump. Add{' '}
                            <span className="font-mono text-xs">hidden</span> on{' '}
                            <span className="font-mono text-xs">validator-hint</span> if you
                            prefer zero height until invalid.
                          </p>
              </>
            }
            html={`<div class="grid gap-6 md:grid-cols-2">
            <div class="flex flex-col gap-1">
              <label class="label" for="val-success">
                <span class="label-text">Valid email (prefilled)</span>
              </label>
              <input
                id="val-success"
                type="email"
                class="input validator w-full cursor-text"
                required
                value="wash@atelier.test"
                placeholder="studio@atelier.test"
              />
              <div class="validator-hint">Enter a valid email address</div>
              
            </div>
            <div class="flex flex-col gap-1">
              <label class="label" for="val-error">
                <span class="label-text">Invalid email (prefilled)</span>
              </label>
              <input
                id="val-error"
                type="email"
                class="input validator w-full cursor-text"
                required
                value="not-an-email"
                placeholder="studio@atelier.test"
              />
              <div class="validator-hint">Enter a valid email address</div>
              
            </div>
          </div>
          <p class="mt-4 text-sm text-ink-muted">
            Hints stay in the layout by default so the page does not jump. Add
            <span class="font-mono text-xs">hidden</span> on
            <span class="font-mono text-xs">validator-hint</span> if you
            prefer zero height until invalid.
          </p>`}
            jsx={`<div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="label" htmlFor="val-success">
                <span className="label-text">Valid email (prefilled)</span>
              </label>
              <input
                id="val-success"
                type="email"
                className="input validator w-full cursor-text"
                required
                defaultValue="wash@atelier.test"
                placeholder="studio@atelier.test"
              />
              <div className="validator-hint">Enter a valid email address</div>
              
            </div>
            <div className="flex flex-col gap-1">
              <label className="label" htmlFor="val-error">
                <span className="label-text">Invalid email (prefilled)</span>
              </label>
              <input
                id="val-error"
                type="email"
                className="input validator w-full cursor-text"
                required
                defaultValue="not-an-email"
                placeholder="studio@atelier.test"
              />
              <div className="validator-hint">Enter a valid email address</div>
              
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            Hints stay in the layout by default so the page does not jump. Add{' '}
            <span className="font-mono text-xs">hidden</span> on{' '}
            <span className="font-mono text-xs">validator-hint</span> if you
            prefer zero height until invalid.
          </p>`}
          />
        </Section>

        <Section
          eyebrow="04 · Controls"
          title="Checkbox, toggle, select, textarea"
          description="Validator works on checkbox, toggle, select, and textarea when they"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 lg:grid-cols-2">
                            <div className="space-y-6">
                              <fieldset className="fieldset">
                                <label className="label cursor-pointer justify-start gap-3">
                                  <input
                                    type="checkbox"
                                    className="checkbox validator cursor-pointer"
                                    required
                                    title="Required"
                                  />
                                  <span className="label-text">
                                    Accept studio terms
                                    <RequiredMark />
                                  </span>
                                </label>
                                <p className="validator-hint">Required</p>
                                <ClassLabel value="checkbox validator" />
                              </fieldset>
                
                              <fieldset className="fieldset">
                                <label className="label cursor-pointer justify-start gap-3">
                                  <input
                                    type="checkbox"
                                    className="toggle validator cursor-pointer"
                                    required
                                    title="Required"
                                  />
                                  <span className="label-text">
                                    Enable wet-edge alerts
                                    <RequiredMark />
                                  </span>
                                </label>
                                <p className="validator-hint">Required</p>
                                <ClassLabel value="toggle validator" />
                              </fieldset>
                            </div>
                
                            <div className="space-y-6">
                              <form className="flex max-w-md flex-col gap-2" onSubmit={onSelectDemoSubmit} noValidate>
                                <label className="label" htmlFor="val-select">
                                  <span className="label-text">
                                    Wash style
                                    <RequiredMark />
                                  </span>
                                </label>
                                <select
                                  id="val-select"
                                  className="select validator w-full cursor-pointer"
                                  required
                                  defaultValue=""
                                >
                                  <option disabled value="">
                                    Choose:
                                  </option>
                                  <option>Flat wash</option>
                                  <option>Graded wash</option>
                                  <option>Variegated</option>
                                </select>
                                <p className="validator-hint">Required</p>
                                <button type="submit" className="btn btn-neutral w-fit cursor-pointer">
                                  Submit form
                                </button>
                                <ClassLabel value="select validator + submit" />
                              </form>
                
                              <fieldset className="fieldset max-w-md">
                                <label className="label" htmlFor="val-textarea">
                                  <span className="label-text">
                                    Mixing notes
                                    <RequiredMark />
                                  </span>
                                </label>
                                <textarea
                                  id="val-textarea"
                                  className="textarea validator w-full cursor-text"
                                  required
                                  minLength={12}
                                  placeholder="Describe the wash in at least 12 characters…"
                                  rows={3}
                                />
                                <p className="validator-hint">At least 12 characters</p>
                                <ClassLabel value="textarea validator" />
                              </fieldset>
                            </div>
                          </div>
              </>
            }
            html={`<div class="grid gap-8 lg:grid-cols-2">
            <div class="space-y-6">
              <fieldset class="fieldset">
                <label class="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    class="checkbox validator cursor-pointer"
                    required
                    title="Required"
                  />
                  <span class="label-text">
                    Accept studio terms
                    <RequiredMark />
                  </span>
                </label>
                <p class="validator-hint">Required</p>
                
              </fieldset>

              <fieldset class="fieldset">
                <label class="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    class="toggle validator cursor-pointer"
                    required
                    title="Required"
                  />
                  <span class="label-text">
                    Enable wet-edge alerts
                    <RequiredMark />
                  </span>
                </label>
                <p class="validator-hint">Required</p>
                
              </fieldset>
            </div>

            <div class="space-y-6">
              <form class="flex max-w-md flex-col gap-2" onSubmit= noValidate>
                <label class="label" for="val-select">
                  <span class="label-text">
                    Wash style
                    <RequiredMark />
                  </span>
                </label>
                <select
                  id="val-select"
                  class="select validator w-full cursor-pointer"
                  required
                  value=""
                >
                  <option disabled value="">
                    Choose:
                  </option>
                  <option>Flat wash</option>
                  <option>Graded wash</option>
                  <option>Variegated</option>
                </select>
                <p class="validator-hint">Required</p>
                <button type="submit" class="btn btn-neutral w-fit cursor-pointer">
                  Submit form
                </button>
                
              </form>

              <fieldset class="fieldset max-w-md">
                <label class="label" for="val-textarea">
                  <span class="label-text">
                    Mixing notes
                    <RequiredMark />
                  </span>
                </label>
                <textarea
                  id="val-textarea"
                  class="textarea validator w-full cursor-text"
                  required
                  minLength=
                  placeholder="Describe the wash in at least 12 characters…"
                  rows=
                />
                <p class="validator-hint">At least 12 characters</p>
                
              </fieldset>
            </div>
          </div>`}
            jsx={`<div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <fieldset className="fieldset">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox validator cursor-pointer"
                    required
                    title="Required"
                  />
                  <span className="label-text">
                    Accept studio terms
                    <RequiredMark />
                  </span>
                </label>
                <p className="validator-hint">Required</p>
                
              </fieldset>

              <fieldset className="fieldset">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="toggle validator cursor-pointer"
                    required
                    title="Required"
                  />
                  <span className="label-text">
                    Enable wet-edge alerts
                    <RequiredMark />
                  </span>
                </label>
                <p className="validator-hint">Required</p>
                
              </fieldset>
            </div>

            <div className="space-y-6">
              <form className="flex max-w-md flex-col gap-2" onSubmit={onSelectDemoSubmit} noValidate>
                <label className="label" htmlFor="val-select">
                  <span className="label-text">
                    Wash style
                    <RequiredMark />
                  </span>
                </label>
                <select
                  id="val-select"
                  className="select validator w-full cursor-pointer"
                  required
                  defaultValue=""
                >
                  <option disabled value="">
                    Choose:
                  </option>
                  <option>Flat wash</option>
                  <option>Graded wash</option>
                  <option>Variegated</option>
                </select>
                <p className="validator-hint">Required</p>
                <button type="submit" className="btn btn-neutral w-fit cursor-pointer">
                  Submit form
                </button>
                
              </form>

              <fieldset className="fieldset max-w-md">
                <label className="label" htmlFor="val-textarea">
                  <span className="label-text">
                    Mixing notes
                    <RequiredMark />
                  </span>
                </label>
                <textarea
                  id="val-textarea"
                  className="textarea validator w-full cursor-text"
                  required
                  minLength={12}
                  placeholder="Describe the wash in at least 12 characters…"
                  rows={3}
                />
                <p className="validator-hint">At least 12 characters</p>
                
              </fieldset>
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Studio form"
          title="Pigment mix"
          description="Create-demo form with pigment name and dilution checks"
        >
          <ShowcaseTabs
            preview={
              <>
                <form
                            className="card max-w-lg border border-ink-border/60 bg-base-100"
                            onSubmit={onStudioSubmit}
                            noValidate
                          >
                            <div className="card-body gap-4">
                              <h2 className="card-title text-primary font-bold">Add pigment mix</h2>
                
                              <fieldset className="fieldset">
                                <label className="label" htmlFor="pigment-name">
                                  <span className="label-text">
                                    Pigment name
                                    <RequiredMark />
                                  </span>
                                </label>
                                <input
                                  id="pigment-name"
                                  name="pigmentName"
                                  type="text"
                                  className="input validator w-full cursor-text"
                                  required
                                  minLength={2}
                                  maxLength={40}
                                  pattern="[A-Za-z][A-Za-z0-9 \-]*"
                                  placeholder="Ultramarine"
                                  title="Letters, numbers, spaces, or dash"
                                />
                                <p className="validator-hint hidden">
                                  2 to 40 characters. Start with a letter.
                                </p>
                              </fieldset>
                
                              <fieldset className="fieldset">
                                <label className="label" htmlFor="dilution">
                                  <span className="label-text">
                                    Dilution ratio
                                    <RequiredMark />
                                  </span>
                                </label>
                                <input
                                  id="dilution"
                                  name="dilution"
                                  type="number"
                                  className="input validator w-full cursor-text"
                                  required
                                  min={1}
                                  max={20}
                                  step={1}
                                  placeholder="1 to 20"
                                  title="Whole number from 1 to 20"
                                />
                                <p className="validator-hint hidden">Enter a whole number from 1 to 20</p>
                              </fieldset>
                
                              <fieldset className="fieldset">
                                <label className="label" htmlFor="finish-notes">
                                  <span className="label-text">Finish notes (optional)</span>
                                </label>
                                <textarea
                                  id="finish-notes"
                                  name="notes"
                                  className="textarea w-full cursor-text"
                                  rows={2}
                                  placeholder="Granulation, staining, opacity…"
                                />
                              </fieldset>
                
                              <div className="card-actions mt-2 justify-end">
                                <button type="reset" className="btn btn-ghost cursor-pointer">
                                  Reset
                                </button>
                                <button type="submit" className="btn btn-primary cursor-pointer">
                                  Save mix
                                </button>
                              </div>
                              <ClassLabel value="fieldset + input validator + validator-hint hidden" />
                            </div>
                          </form>
              </>
            }
            html={`<form
            class="card max-w-lg border border-ink-border/60 bg-base-100"
            onSubmit=
            noValidate
          >
            <div class="card-body gap-4">
              <h2 class="card-title text-primary font-bold">Add pigment mix</h2>

              <fieldset class="fieldset">
                <label class="label" for="pigment-name">
                  <span class="label-text">
                    Pigment name
                    <RequiredMark />
                  </span>
                </label>
                <input
                  id="pigment-name"
                  name="pigmentName"
                  type="text"
                  class="input validator w-full cursor-text"
                  required
                  minLength=
                  maxLength=
                  pattern="[A-Za-z][A-Za-z0-9 \\-]*"
                  placeholder="Ultramarine"
                  title="Letters, numbers, spaces, or dash"
                />
                <p class="validator-hint hidden">
                  2 to 40 characters. Start with a letter.
                </p>
              </fieldset>

              <fieldset class="fieldset">
                <label class="label" for="dilution">
                  <span class="label-text">
                    Dilution ratio
                    <RequiredMark />
                  </span>
                </label>
                <input
                  id="dilution"
                  name="dilution"
                  type="number"
                  class="input validator w-full cursor-text"
                  required
                  min=
                  max=
                  step=
                  placeholder="1 to 20"
                  title="Whole number from 1 to 20"
                />
                <p class="validator-hint hidden">Enter a whole number from 1 to 20</p>
              </fieldset>

              <fieldset class="fieldset">
                <label class="label" for="finish-notes">
                  <span class="label-text">Finish notes (optional)</span>
                </label>
                <textarea
                  id="finish-notes"
                  name="notes"
                  class="textarea w-full cursor-text"
                  rows=
                  placeholder="Granulation, staining, opacity…"
                />
              </fieldset>

              <div class="card-actions mt-2 justify-end">
                <button type="reset" class="btn btn-ghost cursor-pointer">
                  Reset
                </button>
                <button type="submit" class="btn btn-primary cursor-pointer">
                  Save mix
                </button>
              </div>
              
            </div>
          </form>`}
            jsx={`<form
            className="card max-w-lg border border-ink-border/60 bg-base-100"
            onSubmit={onStudioSubmit}
            noValidate
          >
            <div className="card-body gap-4">
              <h2 className="card-title text-primary font-bold">Add pigment mix</h2>

              <fieldset className="fieldset">
                <label className="label" htmlFor="pigment-name">
                  <span className="label-text">
                    Pigment name
                    <RequiredMark />
                  </span>
                </label>
                <input
                  id="pigment-name"
                  name="pigmentName"
                  type="text"
                  className="input validator w-full cursor-text"
                  required
                  minLength={2}
                  maxLength={40}
                  pattern="[A-Za-z][A-Za-z0-9 \\-]*"
                  placeholder="Ultramarine"
                  title="Letters, numbers, spaces, or dash"
                />
                <p className="validator-hint hidden">
                  2 to 40 characters. Start with a letter.
                </p>
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="dilution">
                  <span className="label-text">
                    Dilution ratio
                    <RequiredMark />
                  </span>
                </label>
                <input
                  id="dilution"
                  name="dilution"
                  type="number"
                  className="input validator w-full cursor-text"
                  required
                  min={1}
                  max={20}
                  step={1}
                  placeholder="1 to 20"
                  title="Whole number from 1 to 20"
                />
                <p className="validator-hint hidden">Enter a whole number from 1 to 20</p>
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="finish-notes">
                  <span className="label-text">Finish notes (optional)</span>
                </label>
                <textarea
                  id="finish-notes"
                  name="notes"
                  className="textarea w-full cursor-text"
                  rows={2}
                  placeholder="Granulation, staining, opacity…"
                />
              </fieldset>

              <div className="card-actions mt-2 justify-end">
                <button type="reset" className="btn btn-ghost cursor-pointer">
                  Reset
                </button>
                <button type="submit" className="btn btn-primary cursor-pointer">
                  Save mix
                </button>
              </div>
              
            </div>
          </form>`}
          />
        </Section>

        <Section
          eyebrow="06 · Compact form"
          title="Login shell"
          description="Nested fieldsets with hidden hints, matching the daisyUI form"
        >
          <ShowcaseTabs
            preview={
              <>
                <form className="fieldset w-full max-w-xs rounded-box border border-base-300 bg-base-200 p-4">
                            <fieldset className="fieldset">
                              <label className="label" htmlFor="login-email">
                                <span className="label-text">
                                  Email
                                  <RequiredMark />
                                </span>
                              </label>
                              <input
                                id="login-email"
                                type="email"
                                className="input validator w-full cursor-text"
                                placeholder="Email"
                                required
                              />
                              <p className="validator-hint hidden">Required</p>
                            </fieldset>
                
                            <label className="fieldset" htmlFor="login-password">
                              <span className="label">
                                Password
                                <RequiredMark />
                              </span>
                              <input
                                id="login-password"
                                type="password"
                                className="input validator w-full cursor-text"
                                placeholder="Password"
                                required
                              />
                              <span className="validator-hint hidden">Required</span>
                            </label>
                
                            <button type="submit" className="btn btn-neutral mt-4 cursor-pointer">
                              Login
                            </button>
                            <button type="reset" className="btn btn-ghost mt-1 cursor-pointer">
                              Reset
                            </button>
                            <ClassLabel value="fieldset form + validator-hint hidden" />
                          </form>
              </>
            }
            html={`<form class="fieldset w-full max-w-xs rounded-box border border-base-300 bg-base-200 p-4">
            <fieldset class="fieldset">
              <label class="label" for="login-email">
                <span class="label-text">
                  Email
                  <RequiredMark />
                </span>
              </label>
              <input
                id="login-email"
                type="email"
                class="input validator w-full cursor-text"
                placeholder="Email"
                required
              />
              <p class="validator-hint hidden">Required</p>
            </fieldset>

            <label class="fieldset" for="login-password">
              <span class="label">
                Password
                <RequiredMark />
              </span>
              <input
                id="login-password"
                type="password"
                class="input validator w-full cursor-text"
                placeholder="Password"
                required
              />
              <span class="validator-hint hidden">Required</span>
            </label>

            <button type="submit" class="btn btn-neutral mt-4 cursor-pointer">
              Login
            </button>
            <button type="reset" class="btn btn-ghost mt-1 cursor-pointer">
              Reset
            </button>
            
          </form>`}
            jsx={`<form className="fieldset w-full max-w-xs rounded-box border border-base-300 bg-base-200 p-4">
            <fieldset className="fieldset">
              <label className="label" htmlFor="login-email">
                <span className="label-text">
                  Email
                  <RequiredMark />
                </span>
              </label>
              <input
                id="login-email"
                type="email"
                className="input validator w-full cursor-text"
                placeholder="Email"
                required
              />
              <p className="validator-hint hidden">Required</p>
            </fieldset>

            <label className="fieldset" htmlFor="login-password">
              <span className="label">
                Password
                <RequiredMark />
              </span>
              <input
                id="login-password"
                type="password"
                className="input validator w-full cursor-text"
                placeholder="Password"
                required
              />
              <span className="validator-hint hidden">Required</span>
            </label>

            <button type="submit" className="btn btn-neutral mt-4 cursor-pointer">
              Login
            </button>
            <button type="reset" className="btn btn-ghost mt-1 cursor-pointer">
              Reset
            </button>
            
          </form>`}
          />
        </Section>
      </div>

      {toast ? (
        <div className="toast toast-bottom toast-end z-[100]">
          <div
            className={`alert shadow-lg ${toast.tone === 'success' ? 'alert-success' : 'alert-error'}`}
          >
            {toast.tone === 'success' ? (
              <CircleCheck className="h-5 w-5" aria-hidden="true" />
            ) : (
              <CircleX className="h-5 w-5" aria-hidden="true" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      ) : null}
    </>
  )
}
