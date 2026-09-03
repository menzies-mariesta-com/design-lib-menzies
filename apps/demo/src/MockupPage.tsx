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

export default function MockupPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Mockups
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">mockup-browser</span> and <span className="font-mono text-xs">mockup-code</span> mockup-phone, and mockup-window frames.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Browser"
          title="Bordered browser"
          description="Toolbar with an address bar input and bordered content pane"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mockup-browser w-full border border-base-300">
                            <div className="mockup-browser-toolbar">
                              <div className="input">https://menzies.design/plates</div>
                            </div>
                            <div className="grid h-64 place-content-center border-t border-base-300 bg-base-200/40 px-6 text-center">
                              <p className="font-display text-2xl font-semibold">Plate archive</p>
                              <p className="mt-2 max-w-sm text-sm text-ink-muted">
                                Browse coastal fog series, pigment notes, and wash recipes from
                                the studio desk.
                              </p>
                              <button type="button" className="btn btn-primary mt-4 cursor-pointer">
                                Open catalog
                              </button>
                            </div>
                          </div>
            
              </>
            }
            html={`<div class="mockup-browser w-full border border-base-300">
              <div class="mockup-browser-toolbar">
                <div class="input">https://menzies.design/plates</div>
              </div>
              <div class="grid h-64 place-content-center border-t border-base-300 bg-base-200/40 px-6 text-center">
                <p class="font-display text-2xl font-semibold">Plate archive</p>
                <p class="mt-2 max-w-sm text-sm text-ink-muted">
                  Browse coastal fog series, pigment notes, and wash recipes from
                  the studio desk.
                </p>
                <button type="button" class="btn btn-primary mt-4 cursor-pointer">
                  Open catalog
                </button>
              </div>
            </div>`}
            jsx={`<div className="mockup-browser w-full border border-base-300">
              <div className="mockup-browser-toolbar">
                <div className="input">https://menzies.design/plates</div>
              </div>
              <div className="grid h-64 place-content-center border-t border-base-300 bg-base-200/40 px-6 text-center">
                <p className="font-display text-2xl font-semibold">Plate archive</p>
                <p className="mt-2 max-w-sm text-sm text-ink-muted">
                  Browse coastal fog series, pigment notes, and wash recipes from
                  the studio desk.
                </p>
                <button type="button" className="btn btn-primary mt-4 cursor-pointer">
                  Open catalog
                </button>
              </div>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Browser"
          title="Tinted browser"
          description="Same chrome with a base surface fill behind the viewport"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mockup-browser w-full border border-base-300 bg-base-100">
                            <div className="mockup-browser-toolbar">
                              <div className="input">https://menzies.design/series/cerulean</div>
                            </div>
                            <div className="grid h-64 place-content-center px-6 text-center">
                              <p className="label-ink">Series · Cerulean</p>
                              <p className="mt-2 font-display text-xl font-semibold">
                                Soft blue over warm paper
                              </p>
                              <p className="mt-2 max-w-sm text-sm text-ink-muted">
                                Quiet hierarchy. Ink weight before more pigment.
                              </p>
                            </div>
                          </div>
            
              </>
            }
            html={`<div class="mockup-browser w-full border border-base-300 bg-base-100">
              <div class="mockup-browser-toolbar">
                <div class="input">https://menzies.design/series/cerulean</div>
              </div>
              <div class="grid h-64 place-content-center px-6 text-center">
                <p class="label-ink">Series · Cerulean</p>
                <p class="mt-2 font-display text-xl font-semibold">
                  Soft blue over warm paper
                </p>
                <p class="mt-2 max-w-sm text-sm text-ink-muted">
                  Quiet hierarchy. Ink weight before more pigment.
                </p>
              </div>
            </div>`}
            jsx={`<div className="mockup-browser w-full border border-base-300 bg-base-100">
              <div className="mockup-browser-toolbar">
                <div className="input">https://menzies.design/series/cerulean</div>
              </div>
              <div className="grid h-64 place-content-center px-6 text-center">
                <p className="label-ink">Series · Cerulean</p>
                <p className="mt-2 font-display text-xl font-semibold">
                  Soft blue over warm paper
                </p>
                <p className="mt-2 max-w-sm text-sm text-ink-muted">
                  Quiet hierarchy. Ink weight before more pigment.
                </p>
              </div>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Code"
          title="Line prefix"
          description="Terminal-style prefix via data-prefix on each pre line"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mockup-code w-full">
                            <pre data-prefix="$">
                              <code>npm i daisyui@5.7.9</code>
                            </pre>
                          </div>
            
              </>
            }
            html={`<div class="mockup-code w-full">
              <pre data-prefix="$">
                <code>npm i daisyui@5.7.9</code>
              </pre>
            </div>`}
            jsx={`<div className="mockup-code w-full">
              <pre data-prefix="$">
                <code>npm i daisyui@5.7.9</code>
              </pre>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Code"
          title="Multi-line output"
          description="Command plus status lines with warning and success tint"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mockup-code w-full">
                            <pre data-prefix="$">
                              <code>pnpm paint:wash coastal-fog</code>
                            </pre>
                            <pre data-prefix=">" className="text-warning">
                              <code>layering pigment…</code>
                            </pre>
                            <pre data-prefix=">" className="text-success">
                              <code>Done! Plate #1842 dried.</code>
                            </pre>
                          </div>
            
              </>
            }
            html={`<div class="mockup-code w-full">
              <pre data-prefix="$">
                <code>pnpm paint:wash coastal-fog</code>
              </pre>
              <pre data-prefix=">" class="text-warning">
                <code>layering pigment…</code>
              </pre>
              <pre data-prefix=">" class="text-success">
                <code>Done! Plate #1842 dried.</code>
              </pre>
            </div>`}
            jsx={`<div className="mockup-code w-full">
              <pre data-prefix="$">
                <code>pnpm paint:wash coastal-fog</code>
              </pre>
              <pre data-prefix=">" className="text-warning">
                <code>layering pigment…</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>Done! Plate #1842 dried.</code>
              </pre>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Code"
          title="Highlighted line"
          description="Numbered prefixes with a warning highlight on the error row"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mockup-code w-full">
                            <pre data-prefix="1">
                              <code>const wash = mix('cerulean', 0.4)</code>
                            </pre>
                            <pre data-prefix="2">
                              <code>paper.soak(wash)</code>
                            </pre>
                            <pre data-prefix="3" className="bg-warning text-warning-content">
                              <code>throw new Error('Bleed past the margin')</code>
                            </pre>
                          </div>
            
              </>
            }
            html={`<div class="mockup-code w-full">
              <pre data-prefix="1">
                <code>const wash = mix('cerulean', 0.4)</code>
              </pre>
              <pre data-prefix="2">
                <code>paper.soak(wash)</code>
              </pre>
              <pre data-prefix="3" class="bg-warning text-warning-content">
                <code>throw new Error('Bleed past the margin')</code>
              </pre>
            </div>`}
            jsx={`<div className="mockup-code w-full">
              <pre data-prefix="1">
                <code>const wash = mix('cerulean', 0.4)</code>
              </pre>
              <pre data-prefix="2">
                <code>paper.soak(wash)</code>
              </pre>
              <pre data-prefix="3" className="bg-warning text-warning-content">
                <code>throw new Error('Bleed past the margin')</code>
              </pre>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Code"
          title="Long line scroll"
          description="Overflowing lines stay in the mockup and scroll horizontally"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mockup-code w-full max-w-full">
                            <pre data-prefix="~">
                              <code>
                                Soft cerulean wash over warm paper with quiet hierarchy, ink
                                weight before pigment, and a long recipe note that scrolls
                                inside the frame instead of wrapping the chrome.
                              </code>
                            </pre>
                          </div>
            
              </>
            }
            html={`<div class="mockup-code w-full max-w-full">
              <pre data-prefix="~">
                <code>
                  Soft cerulean wash over warm paper with quiet hierarchy, ink
                  weight before pigment, and a long recipe note that scrolls
                  inside the frame instead of wrapping the chrome.
                </code>
              </pre>
            </div>`}
            jsx={`<div className="mockup-code w-full max-w-full">
              <pre data-prefix="~">
                <code>
                  Soft cerulean wash over warm paper with quiet hierarchy, ink
                  weight before pigment, and a long recipe note that scrolls
                  inside the frame instead of wrapping the chrome.
                </code>
              </pre>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Code"
          title="Without prefix"
          description="Plain pre/code block inside the editor chrome"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseTabs
            preview={
              <>

              <div className="mockup-code w-full">
                              <pre>
                                <code>export const studio = 'Menzies Design'</code>
                              </pre>
                            </div>
            
              </>
            }
            html={`<div class="mockup-code w-full">
                <pre>
                  <code>export const studio = 'Menzies Design'</code>
                </pre>
              </div>`}
            jsx={`<div className="mockup-code w-full">
                <pre>
                  <code>export const studio = 'Menzies Design'</code>
                </pre>
              </div>`}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="mockup-code w-full bg-primary text-primary-content">
                              <pre>
                                <code>Pigment desk ready</code>
                              </pre>
                            </div>
            
              </>
            }
            html={`<div class="mockup-code w-full bg-primary text-primary-content">
                <pre>
                  <code>Pigment desk ready</code>
                </pre>
              </div>`}
            jsx={`<div className="mockup-code w-full bg-primary text-primary-content">
                <pre>
                  <code>Pigment desk ready</code>
                </pre>
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="08 · Phone"
          title="iPhone frame"
          description="Camera notch plus display surface for mobile compositions"
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-start justify-center gap-8">
            <ShowcaseTabs
            preview={
              <>

              <div className="mockup-phone">
                              <div className="mockup-phone-camera" />
                              <div className="mockup-phone-display grid place-content-center bg-neutral text-neutral-content">
                                <div className="px-6 text-center">
                                  <p className="label-ink text-neutral-content/70">Menzies Design</p>
                                  <p className="mt-2 font-display text-xl font-semibold">
                                    Field notes
                                  </p>
                                  <p className="mt-2 text-sm text-neutral-content/80">
                                    Capture pigment mixes on the go.
                                  </p>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-primary mt-4 cursor-pointer"
                                  >
                                    New note
                                  </button>
                                </div>
                              </div>
                            </div>
            
              </>
            }
            html={`<div class="mockup-phone">
                <div class="mockup-phone-camera" />
                <div class="mockup-phone-display grid place-content-center bg-neutral text-neutral-content">
                  <div class="px-6 text-center">
                    <p class="label-ink text-neutral-content/70">Menzies Design</p>
                    <p class="mt-2 font-display text-xl font-semibold">
                      Field notes
                    </p>
                    <p class="mt-2 text-sm text-neutral-content/80">
                      Capture pigment mixes on the go.
                    </p>
                    <button
                      type="button"
                      class="btn btn-sm btn-primary mt-4 cursor-pointer"
                    >
                      New note
                    </button>
                  </div>
                </div>
              </div>`}
            jsx={`<div className="mockup-phone">
                <div className="mockup-phone-camera" />
                <div className="mockup-phone-display grid place-content-center bg-neutral text-neutral-content">
                  <div className="px-6 text-center">
                    <p className="label-ink text-neutral-content/70">Menzies Design</p>
                    <p className="mt-2 font-display text-xl font-semibold">
                      Field notes
                    </p>
                    <p className="mt-2 text-sm text-neutral-content/80">
                      Capture pigment mixes on the go.
                    </p>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary mt-4 cursor-pointer"
                    >
                      New note
                    </button>
                  </div>
                </div>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="mockup-phone border-primary">
                              <div className="mockup-phone-camera" />
                              <div className="mockup-phone-display">
                                <img
                                  alt="Soft watercolor wash wallpaper for phone mockup"
                                  className="h-full w-full object-cover"
                                  src="https://img.daisyui.com/images/stock/453966.webp"
                                />
                              </div>
                            </div>
            
              </>
            }
            html={`<div class="mockup-phone border-primary">
                <div class="mockup-phone-camera" />
                <div class="mockup-phone-display">
                  <img
                    alt="Soft watercolor wash wallpaper for phone mockup"
                    class="h-full w-full object-cover"
                    src="https://img.daisyui.com/images/stock/453966.webp" />
                </div>
              </div>`}
            jsx={`<div className="mockup-phone border-primary">
                <div className="mockup-phone-camera" />
                <div className="mockup-phone-display">
                  <img
                    alt="Soft watercolor wash wallpaper for phone mockup"
                    className="h-full w-full object-cover"
                    src="https://img.daisyui.com/images/stock/453966.webp"
                  />
                </div>
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="09 · Window"
          title="OS window border"
          description="Desktop window chrome with a bordered content area"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mockup-window w-full border border-base-300">
                            <div className="grid h-64 place-content-center border-t border-base-300 px-6 text-center">
                              <p className="font-display text-2xl font-semibold">
                                Studio mixer
                              </p>
                              <p className="mt-2 max-w-md text-sm text-ink-muted">
                                Blend washes, export recipes, and keep plates in one OS-style
                                frame.
                              </p>
                              <div className="mt-4 flex flex-wrap justify-center gap-2">
                                <button type="button" className="btn btn-sm cursor-pointer">
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary cursor-pointer"
                                >
                                  Save wash
                                </button>
                              </div>
                            </div>
                          </div>
            
              </>
            }
            html={`<div class="mockup-window w-full border border-base-300">
              <div class="grid h-64 place-content-center border-t border-base-300 px-6 text-center">
                <p class="font-display text-2xl font-semibold">
                  Studio mixer
                </p>
                <p class="mt-2 max-w-md text-sm text-ink-muted">
                  Blend washes, export recipes, and keep plates in one OS-style
                  frame.
                </p>
                <div class="mt-4 flex flex-wrap justify-center gap-2">
                  <button type="button" class="btn btn-sm cursor-pointer">
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-primary cursor-pointer"
                  >
                    Save wash
                  </button>
                </div>
              </div>
            </div>`}
            jsx={`<div className="mockup-window w-full border border-base-300">
              <div className="grid h-64 place-content-center border-t border-base-300 px-6 text-center">
                <p className="font-display text-2xl font-semibold">
                  Studio mixer
                </p>
                <p className="mt-2 max-w-md text-sm text-ink-muted">
                  Blend washes, export recipes, and keep plates in one OS-style
                  frame.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button type="button" className="btn btn-sm cursor-pointer">
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary cursor-pointer"
                  >
                    Save wash
                  </button>
                </div>
              </div>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="10 · Window"
          title="Tinted window"
          description="Window mockup with a filled base surface behind the body"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="mockup-window w-full border border-base-300 bg-base-100">
                            <div className="grid h-64 place-content-center px-6 text-center">
                              <p className="label-ink">Preferences</p>
                              <p className="mt-2 font-display text-xl font-semibold">
                                Paper grain & ink weight
                              </p>
                              <p className="mt-2 max-w-sm text-sm text-ink-muted">
                                Toggle soak intensity and dry-brush focus rings for the desk
                                UI.
                              </p>
                            </div>
                          </div>
            
              </>
            }
            html={`<div class="mockup-window w-full border border-base-300 bg-base-100">
              <div class="grid h-64 place-content-center px-6 text-center">
                <p class="label-ink">Preferences</p>
                <p class="mt-2 font-display text-xl font-semibold">
                  Paper grain & ink weight
                </p>
                <p class="mt-2 max-w-sm text-sm text-ink-muted">
                  Toggle soak intensity and dry-brush focus rings for the desk
                  UI.
                </p>
              </div>
            </div>`}
            jsx={`<div className="mockup-window w-full border border-base-300 bg-base-100">
              <div className="grid h-64 place-content-center px-6 text-center">
                <p className="label-ink">Preferences</p>
                <p className="mt-2 font-display text-xl font-semibold">
                  Paper grain & ink weight
                </p>
                <p className="mt-2 max-w-sm text-sm text-ink-muted">
                  Toggle soak intensity and dry-brush focus rings for the desk
                  UI.
                </p>
              </div>
            </div>`}
          />
        </Section>
      </div>
    </>
  )
}
