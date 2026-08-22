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

function Sample({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

export default function TextRotatePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Text rotate
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">text-rotate</span> cycles
          2 to 6 lines in a single line-height slot. Default loop is 10s;
          hover pauses. Motion flattens when{' '}
          <span className="font-mono text-xs">prefers-reduced-motion</span> is
          set.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Rotating word list"
          description="Three words in the official nested span structure. Hover to pause."
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="text-rotate" className="items-start">
                            <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                              <span className="text-rotate">
                                <span>
                                  <span>Wash</span>
                                  <span>Glaze</span>
                                  <span>Bloom</span>
                                </span>
                              </span>
                            </p>
                          </Sample>
              </>
            }
            html={`<p class="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              <span class="text-rotate">
                <span>
                  <span>Wash</span>
                  <span>Glaze</span>
                  <span>Bloom</span>
                </span>
              </span>
            </p>`}
            jsx={`<p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-rotate">
                <span>
                  <span>Wash</span>
                  <span>Glaze</span>
                  <span>Bloom</span>
                </span>
              </span>
            </p>`}
          />
        </Section>

        <Section
          eyebrow="02 · Variants"
          title="Centered, duration, sentence, and leading"
          description="Documented presentation patterns: justify-items-center, duration-*, inline sentence colors, and leading-[2]."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 lg:grid-cols-2">
                            <Sample
                              label="text-rotate text-5xl + justify-items-center"
                              className="items-center text-center"
                            >
                              <span className="text-rotate max-md:text-3xl text-5xl font-display font-semibold md:text-6xl">
                                <span className="justify-items-center">
                                  <span>LAYER</span>
                                  <span>SOFTEN</span>
                                  <span>LIFT</span>
                                  <span>EDGE</span>
                                  <span>DRY</span>
                                  <span>REPEAT</span>
                                </span>
                              </span>
                            </Sample>
                
                            <Sample
                              label="text-rotate duration-6000"
                              className="items-center text-center"
                            >
                              <span className="text-rotate text-4xl font-display font-semibold duration-6000 md:text-5xl">
                                <span className="justify-items-center">
                                  <span>Soft</span>
                                  <span className="px-2 font-bold italic">edge first</span>
                                </span>
                              </span>
                            </Sample>
                
                            <Sample label="inline text-rotate + per-word color" className="items-start">
                              <p className="text-base md:text-lg">
                                Mixing plates for{' '}
                                <span className="text-rotate">
                                  <span>
                                    <span className="rounded-field bg-wash-blue px-2 text-base-content">
                                      fog
                                    </span>
                                    <span className="rounded-field bg-wash-rose px-2 text-base-content">
                                      bloom
                                    </span>
                                    <span className="rounded-field bg-wash-ochre px-2 text-base-content">
                                      grain
                                    </span>
                                  </span>
                                </span>
                              </p>
                            </Sample>
                
                            <Sample
                              label="text-rotate leading-[2]"
                              className="items-center text-center"
                            >
                              <span className="text-rotate text-3xl font-display font-semibold leading-[2] md:text-4xl">
                                <span className="justify-items-center">
                                  <span>Wet in wet</span>
                                  <span>Dry brush</span>
                                  <span>Lift wash</span>
                                  <span>Hard edge</span>
                                </span>
                              </span>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="grid gap-8 lg:grid-cols-2">
            
              <span class="text-rotate max-md:text-3xl text-5xl font-display font-semibold md:text-6xl">
                <span class="justify-items-center">
                  <span>LAYER</span>
                  <span>SOFTEN</span>
                  <span>LIFT</span>
                  <span>EDGE</span>
                  <span>DRY</span>
                  <span>REPEAT</span>
                </span>
              </span>
            

            
              <span class="text-rotate text-4xl font-display font-semibold duration-6000 md:text-5xl">
                <span class="justify-items-center">
                  <span>Soft</span>
                  <span class="px-2 font-bold italic">edge first</span>
                </span>
              </span>
            

            
              <p class="text-base md:text-lg">
                Mixing plates for
                <span class="text-rotate">
                  <span>
                    <span class="rounded-field bg-wash-blue px-2 text-base-content">
                      fog
                    </span>
                    <span class="rounded-field bg-wash-rose px-2 text-base-content">
                      bloom
                    </span>
                    <span class="rounded-field bg-wash-ochre px-2 text-base-content">
                      grain
                    </span>
                  </span>
                </span>
              </p>
            

            
              <span class="text-rotate text-3xl font-display font-semibold leading-[2] md:text-4xl">
                <span class="justify-items-center">
                  <span>Wet in wet</span>
                  <span>Dry brush</span>
                  <span>Lift wash</span>
                  <span>Hard edge</span>
                </span>
              </span>
            
          </div>`}
            jsx={`<div className="grid gap-8 lg:grid-cols-2">
            
              <span className="text-rotate max-md:text-3xl text-5xl font-display font-semibold md:text-6xl">
                <span className="justify-items-center">
                  <span>LAYER</span>
                  <span>SOFTEN</span>
                  <span>LIFT</span>
                  <span>EDGE</span>
                  <span>DRY</span>
                  <span>REPEAT</span>
                </span>
              </span>
            

            
              <span className="text-rotate text-4xl font-display font-semibold duration-6000 md:text-5xl">
                <span className="justify-items-center">
                  <span>Soft</span>
                  <span className="px-2 font-bold italic">edge first</span>
                </span>
              </span>
            

            
              <p className="text-base md:text-lg">
                Mixing plates for{' '}
                <span className="text-rotate">
                  <span>
                    <span className="rounded-field bg-wash-blue px-2 text-base-content">
                      fog
                    </span>
                    <span className="rounded-field bg-wash-rose px-2 text-base-content">
                      bloom
                    </span>
                    <span className="rounded-field bg-wash-ochre px-2 text-base-content">
                      grain
                    </span>
                  </span>
                </span>
              </p>
            

            
              <span className="text-rotate text-3xl font-display font-semibold leading-[2] md:text-4xl">
                <span className="justify-items-center">
                  <span>Wet in wet</span>
                  <span>Dry brush</span>
                  <span>Lift wash</span>
                  <span>Hard edge</span>
                </span>
              </span>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Sizes and colors"
          title="Type scale and semantic ink"
          description="Size with Tailwind text utilities. Color the rotating span or each line."
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Sample label="text-rotate text-xl" className="items-start">
                              <span className="text-rotate text-xl font-semibold">
                                <span>
                                  <span>Cerulean</span>
                                  <span>Ultramarine</span>
                                  <span>Indigo</span>
                                </span>
                              </span>
                            </Sample>
                            <Sample label="text-rotate text-3xl" className="items-start">
                              <span className="text-rotate text-3xl font-display font-semibold">
                                <span>
                                  <span>Ochre</span>
                                  <span>Sienna</span>
                                  <span>Umber</span>
                                </span>
                              </span>
                            </Sample>
                            <Sample label="text-rotate text-5xl" className="items-start">
                              <span className="text-rotate text-5xl font-display font-semibold">
                                <span>
                                  <span>Rose</span>
                                  <span>Madder</span>
                                  <span>Carmine</span>
                                </span>
                              </span>
                            </Sample>
                            <Sample label="text-rotate text-primary" className="items-start">
                              <span className="text-rotate text-2xl font-semibold text-primary">
                                <span>
                                  <span>Primary</span>
                                  <span>wash</span>
                                  <span>ink</span>
                                </span>
                              </span>
                            </Sample>
                            <Sample label="text-rotate text-secondary" className="items-start">
                              <span className="text-rotate text-2xl font-semibold text-secondary">
                                <span>
                                  <span>Secondary</span>
                                  <span>glaze</span>
                                  <span>tint</span>
                                </span>
                              </span>
                            </Sample>
                            <Sample label="text-rotate text-accent" className="items-start">
                              <span className="text-rotate text-2xl font-semibold text-accent">
                                <span>
                                  <span>Accent</span>
                                  <span>bloom</span>
                                  <span>edge</span>
                                </span>
                              </span>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
              <span class="text-rotate text-xl font-semibold">
                <span>
                  <span>Cerulean</span>
                  <span>Ultramarine</span>
                  <span>Indigo</span>
                </span>
              </span>
            
            
              <span class="text-rotate text-3xl font-display font-semibold">
                <span>
                  <span>Ochre</span>
                  <span>Sienna</span>
                  <span>Umber</span>
                </span>
              </span>
            
            
              <span class="text-rotate text-5xl font-display font-semibold">
                <span>
                  <span>Rose</span>
                  <span>Madder</span>
                  <span>Carmine</span>
                </span>
              </span>
            
            
              <span class="text-rotate text-2xl font-semibold text-primary">
                <span>
                  <span>Primary</span>
                  <span>wash</span>
                  <span>ink</span>
                </span>
              </span>
            
            
              <span class="text-rotate text-2xl font-semibold text-secondary">
                <span>
                  <span>Secondary</span>
                  <span>glaze</span>
                  <span>tint</span>
                </span>
              </span>
            
            
              <span class="text-rotate text-2xl font-semibold text-accent">
                <span>
                  <span>Accent</span>
                  <span>bloom</span>
                  <span>edge</span>
                </span>
              </span>
            
          </div>`}
            jsx={`<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
              <span className="text-rotate text-xl font-semibold">
                <span>
                  <span>Cerulean</span>
                  <span>Ultramarine</span>
                  <span>Indigo</span>
                </span>
              </span>
            
            
              <span className="text-rotate text-3xl font-display font-semibold">
                <span>
                  <span>Ochre</span>
                  <span>Sienna</span>
                  <span>Umber</span>
                </span>
              </span>
            
            
              <span className="text-rotate text-5xl font-display font-semibold">
                <span>
                  <span>Rose</span>
                  <span>Madder</span>
                  <span>Carmine</span>
                </span>
              </span>
            
            
              <span className="text-rotate text-2xl font-semibold text-primary">
                <span>
                  <span>Primary</span>
                  <span>wash</span>
                  <span>ink</span>
                </span>
              </span>
            
            
              <span className="text-rotate text-2xl font-semibold text-secondary">
                <span>
                  <span>Secondary</span>
                  <span>glaze</span>
                  <span>tint</span>
                </span>
              </span>
            
            
              <span className="text-rotate text-2xl font-semibold text-accent">
                <span>
                  <span>Accent</span>
                  <span>bloom</span>
                  <span>edge</span>
                </span>
              </span>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Studio"
          title="Menzies Design headline"
          description="Rotating watercolor verbs and pigment names inside a studio hero line."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="hero line + text-rotate" className="items-stretch">
                            <div className="rounded-box bg-base-200/70 px-5 py-10 text-center md:px-10 md:py-14">
                              <p className="label-ink mb-3">Menzies Design</p>
                              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                                Learn to{' '}
                                <span className="text-rotate text-primary">
                                  <span className="justify-items-center">
                                    <span>wet</span>
                                    <span>lift</span>
                                    <span>glaze</span>
                                    <span>bloom</span>
                                    <span>grain</span>
                                    <span>rest</span>
                                  </span>
                                </span>
                              </h2>
                              <p className="mx-auto mt-4 max-w-lg text-sm text-ink-muted md:text-base">
                                One rotating verb keeps the headline calm while the pigment desk
                                cycles studio language.
                              </p>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="rounded-box bg-base-200/70 px-5 py-10 text-center md:px-10 md:py-14">
              <p class="label-ink mb-3">Menzies Design</p>
              <h2 class="font-display text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Learn to
                <span class="text-rotate text-primary">
                  <span class="justify-items-center">
                    <span>wet</span>
                    <span>lift</span>
                    <span>glaze</span>
                    <span>bloom</span>
                    <span>grain</span>
                    <span>rest</span>
                  </span>
                </span>
              </h2>
              <p class="mx-auto mt-4 max-w-lg text-sm text-ink-muted md:text-base">
                One rotating verb keeps the headline calm while the pigment desk
                cycles studio language.
              </p>
            </div>`}
            jsx={`<div className="rounded-box bg-base-200/70 px-5 py-10 text-center md:px-10 md:py-14">
              <p className="label-ink mb-3">Menzies Design</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Learn to{' '}
                <span className="text-rotate text-primary">
                  <span className="justify-items-center">
                    <span>wet</span>
                    <span>lift</span>
                    <span>glaze</span>
                    <span>bloom</span>
                    <span>grain</span>
                    <span>rest</span>
                  </span>
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-ink-muted md:text-base">
                One rotating verb keeps the headline calm while the pigment desk
                cycles studio language.
              </p>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Responsive"
          title="Scale down on small screens"
          description="Use max-md:text-* with larger desktop type so the slot stays one line high."
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample
                            label="text-rotate max-md:text-2xl text-6xl"
                            className="items-center text-center"
                          >
                            <span className="text-rotate max-md:text-2xl text-6xl font-display font-semibold">
                              <span className="justify-items-center">
                                <span>Plate</span>
                                <span>Series</span>
                                <span>Study</span>
                                <span>Field</span>
                              </span>
                            </span>
                          </Sample>
                          <p className="mt-4 text-sm text-ink-muted">
                            On narrow viewports the type drops to{' '}
                            <span className="font-mono text-xs">text-2xl</span>; from{' '}
                            <span className="font-mono text-xs">md</span> up it grows to{' '}
                            <span className="font-mono text-xs">text-6xl</span>.
                          </p>
              </>
            }
            html={`<span class="text-rotate max-md:text-2xl text-6xl font-display font-semibold">
              <span class="justify-items-center">
                <span>Plate</span>
                <span>Series</span>
                <span>Study</span>
                <span>Field</span>
              </span>
            </span>
          
          <p class="mt-4 text-sm text-ink-muted">
            On narrow viewports the type drops to
            <span class="font-mono text-xs">text-2xl</span>; from
            <span class="font-mono text-xs">md</span> up it grows to
            <span class="font-mono text-xs">text-6xl</span>.
          </p>`}
            jsx={`<span className="text-rotate max-md:text-2xl text-6xl font-display font-semibold">
              <span className="justify-items-center">
                <span>Plate</span>
                <span>Series</span>
                <span>Study</span>
                <span>Field</span>
              </span>
            </span>
          
          <p className="mt-4 text-sm text-ink-muted">
            On narrow viewports the type drops to{' '}
            <span className="font-mono text-xs">text-2xl</span>; from{' '}
            <span className="font-mono text-xs">md</span> up it grows to{' '}
            <span className="font-mono text-xs">text-6xl</span>.
          </p>`}
          />
        </Section>

        <Section
          eyebrow="06 · Reduced motion"
          title="Pause and flatten"
          description="Under prefers-reduced-motion: reduce, gallery CSS stops the rotator and keeps the first line visible. text-rotate-static forces the same flat state for demos."
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 md:grid-cols-2">
                            <Sample label="text-rotate (system preference)" className="items-start">
                              <p className="text-sm text-ink-muted">
                                Live rotator. Flattens automatically when the OS asks for reduced
                                motion.
                              </p>
                              <span className="text-rotate text-2xl font-display font-semibold">
                                <span>
                                  <span>Animate</span>
                                  <span>Pause</span>
                                  <span>Flatten</span>
                                </span>
                              </span>
                            </Sample>
                            <Sample label="text-rotate text-rotate-static" className="items-start">
                              <p className="text-sm text-ink-muted">
                                Always flat companion: first word only, no loop.
                              </p>
                              <span className="text-rotate text-rotate-static text-2xl font-display font-semibold">
                                <span>
                                  <span>Animate</span>
                                  <span>Pause</span>
                                  <span>Flatten</span>
                                </span>
                              </span>
                            </Sample>
                          </div>
                          <div className="alert mt-6 text-sm">
                            <span>
                              Official daisyUI still ships a stepped fallback under reduced
                              motion. This gallery overrides that with pause and flatten so the
                              headline stays still.
                            </span>
                          </div>
              </>
            }
            html={`<div class="grid gap-6 md:grid-cols-2">
            
              <p class="text-sm text-ink-muted">
                Live rotator. Flattens automatically when the OS asks for reduced
                motion.
              </p>
              <span class="text-rotate text-2xl font-display font-semibold">
                <span>
                  <span>Animate</span>
                  <span>Pause</span>
                  <span>Flatten</span>
                </span>
              </span>
            
            
              <p class="text-sm text-ink-muted">
                Always flat companion: first word only, no loop.
              </p>
              <span class="text-rotate text-rotate-static text-2xl font-display font-semibold">
                <span>
                  <span>Animate</span>
                  <span>Pause</span>
                  <span>Flatten</span>
                </span>
              </span>
            
          </div>
          <div class="alert mt-6 text-sm">
            <span>
              Official daisyUI still ships a stepped fallback under reduced
              motion. This gallery overrides that with pause and flatten so the
              headline stays still.
            </span>
          </div>`}
            jsx={`<div className="grid gap-6 md:grid-cols-2">
            
              <p className="text-sm text-ink-muted">
                Live rotator. Flattens automatically when the OS asks for reduced
                motion.
              </p>
              <span className="text-rotate text-2xl font-display font-semibold">
                <span>
                  <span>Animate</span>
                  <span>Pause</span>
                  <span>Flatten</span>
                </span>
              </span>
            
            
              <p className="text-sm text-ink-muted">
                Always flat companion: first word only, no loop.
              </p>
              <span className="text-rotate text-rotate-static text-2xl font-display font-semibold">
                <span>
                  <span>Animate</span>
                  <span>Pause</span>
                  <span>Flatten</span>
                </span>
              </span>
            
          </div>
          <div className="alert mt-6 text-sm">
            <span>
              Official daisyUI still ships a stepped fallback under reduced
              motion. This gallery overrides that with pause and flatten so the
              headline stays still.
            </span>
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
