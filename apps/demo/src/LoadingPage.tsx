import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { Droplets, Palette } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  BrushStrokeLoader,
  BrushTipLoader,
  InkWordmarkLoader,
  PigmentBloomLoader,
  PigmentMark,
} from './StudioLoading'

const types = [
  { name: 'Spinner', className: 'loading-spinner' },
  { name: 'Dots', className: 'loading-dots' },
  { name: 'Ring', className: 'loading-ring' },
  { name: 'Ball', className: 'loading-ball' },
  { name: 'Bars', className: 'loading-bars' },
  { name: 'Infinity', className: 'loading-infinity' },
] as const

const sizes = [
  { name: 'XS', className: 'loading-xs' },
  { name: 'SM', className: 'loading-sm' },
  { name: 'MD', className: 'loading-md' },
  { name: 'LG', className: 'loading-lg' },
  { name: 'XL', className: 'loading-xl' },
] as const

const colors = [
  { name: 'Primary', className: 'text-primary' },
  { name: 'Secondary', className: 'text-secondary' },
  { name: 'Accent', className: 'text-accent' },
  { name: 'Neutral', className: 'text-neutral' },
  { name: 'Info', className: 'text-info' },
  { name: 'Success', className: 'text-success' },
  { name: 'Warning', className: 'text-warning' },
  { name: 'Error', className: 'text-error' },
] as const

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

export default function LoadingPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Loading
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Studio loaders built from stroke, pigment bloom, and the Menzies
          mark, plus daisyUI{' '}
          <span className="font-mono text-xs">loading</span> spinners.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="00 · Studio identity"
          title="Stroke, pigment, and logo"
          description="Custom busy states that share wash tokens with the desk"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <BrushStrokeLoader decorative />
                            <p className="font-display text-base font-semibold">Stroke sweep</p>
                            <p className="text-center text-sm text-ink-muted">
                              A round tip draws across the paper, then
                              lifts.
                            </p>
                            <ClassLabel value="studio-load-stroke" />
                          </div>

                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <BrushTipLoader decorative />
                            <p className="font-display text-base font-semibold">Tip pulse</p>
                            <p className="text-center text-sm text-ink-muted">
                              Blob size tracks desk px. Edge soft follows water and hardness.
                            </p>
                            <ClassLabel value="studio-load-tip + --brush-*" />
                          </div>

                          <div
                            className="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/25 px-4 py-8"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <PigmentBloomLoader decorative />
                            <p className="font-display text-base font-semibold">Wash bloom</p>
                            <p className="text-center text-sm text-ink-muted">
                              Droplet and pigment pools pulse with wash-a / wash-b / wash-c.
                            </p>
                            <ClassLabel value="studio-load-bloom + wash tokens" />
                          </div>

                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/20 px-4 py-8 sm:col-span-2 xl:col-span-1"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <InkWordmarkLoader decorative />
                            <ClassLabel value="studio-load-ink + pigment mark" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="mb-5">
          </div>

          <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div
              class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <!-- BrushStrokeLoader -->
              <p class="font-display text-base font-semibold">Stroke sweep</p>
              <p class="text-center text-sm text-ink-muted">
                A round tip draws across the paper, then
                lifts.
              </p>
              <!-- ClassLabel -->
            </div>

            <div
              class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <!-- BrushTipLoader -->
              <p class="font-display text-base font-semibold">Tip pulse</p>
              <p class="text-center text-sm text-ink-muted">
                Blob size tracks desk px. Edge soft follows water and hardness.
              </p>
              <!-- ClassLabel -->
            </div>

            <div
              class="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/25 px-4 py-8"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <!-- PigmentBloomLoader -->
              <p class="font-display text-base font-semibold">Wash bloom</p>
              <p class="text-center text-sm text-ink-muted">
                Droplet and pigment pools pulse with wash-a / wash-b / wash-c.
              </p>
              <!-- ClassLabel -->
            </div>

            <div
              class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/20 px-4 py-8 sm:col-span-2 xl:col-span-1"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <!-- InkWordmarkLoader -->
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div
              className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <BrushStrokeLoader decorative />
              <p className="font-display text-base font-semibold">Stroke sweep</p>
              <p className="text-center text-sm text-ink-muted">
                A round tip draws across the paper, then
                lifts.
              </p>
              <ClassLabel value="studio-load-stroke" />
            </div>

            <div
              className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <BrushTipLoader decorative />
              <p className="font-display text-base font-semibold">Tip pulse</p>
              <p className="text-center text-sm text-ink-muted">
                Blob size tracks desk px. Edge soft follows water and hardness.
              </p>
              <ClassLabel value="studio-load-tip + --brush-*" />
            </div>

            <div
              className="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/25 px-4 py-8"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <PigmentBloomLoader decorative />
              <p className="font-display text-base font-semibold">Wash bloom</p>
              <p className="text-center text-sm text-ink-muted">
                Droplet and pigment pools pulse with wash-a / wash-b / wash-c.
              </p>
              <ClassLabel value="studio-load-bloom + wash tokens" />
            </div>

            <div
              className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/20 px-4 py-8 sm:col-span-2 xl:col-span-1"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <InkWordmarkLoader decorative />
              <ClassLabel value="studio-load-ink + pigment mark" />
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="01 · Studio states"
          title="Busy panels that follow the desk"
          description="Full-bleed studio states"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-4 md:grid-cols-2">
                          <div
                            className="flex min-h-52 cursor-wait flex-col items-center justify-center gap-4 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-10"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <BrushStrokeLoader decorative />
                            <p className="font-display text-lg font-semibold">Laying wash</p>
                            <p className="max-w-xs text-center text-sm text-ink-muted">
                              Soft edges settling with default studio load.
                            </p>
                          </div>

                          <div
                            className="relative flex min-h-52 cursor-progress flex-col items-center justify-center gap-4 overflow-hidden rounded-box border border-ink-border/60 px-6 py-10"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <div
                              className="pointer-events-none absolute inset-0 bg-wash-blue/20"
                              aria-hidden
                            />
                            <span
                              className="pointer-events-none absolute -left-8 -top-10 size-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_75%,transparent)_0%,transparent_70%)] opacity-80 blur-2xl"
                              aria-hidden
                            />
                            <span
                              className="pointer-events-none absolute -bottom-12 -right-6 size-36 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-c)_70%,transparent)_0%,transparent_70%)] opacity-70 blur-2xl"
                              aria-hidden
                            />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                              <div className="flex items-center gap-4">
                                <BrushTipLoader decorative />
                                <PigmentBloomLoader decorative />
                              </div>
                              <p className="font-display text-lg font-semibold">Pigment mix</p>
                              <p className="max-w-xs text-center text-sm text-ink-muted">
                                Bloom radius follows flow and water from wash CSS vars.
                              </p>
                            </div>
                          </div>

                          <div
                            className="flex min-h-48 cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-200/50 px-6 py-10 md:col-span-2"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <div className="flex flex-wrap items-center justify-center gap-6">
                              <PigmentMark size={64} />
                              <InkWordmarkLoader decorative />
                            </div>
                            <p className="max-w-md text-center text-sm text-ink-muted">
                              Logo soak uses the pigment mark from the favicon palette and an
                              ink-fill wordmark timed to{' '}
                              <span className="font-mono text-xs">--brush-soak-duration</span>.
                            </p>
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="grid gap-4 md:grid-cols-2">
            <div
              class="flex min-h-52 cursor-wait flex-col items-center justify-center gap-4 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-10"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <!-- BrushStrokeLoader -->
              <p class="font-display text-lg font-semibold">Laying wash</p>
              <p class="max-w-xs text-center text-sm text-ink-muted">
                Soft edges settling with default studio load.
              </p>
            </div>

            <div
              className="relative flex min-h-52 cursor-progress flex-col items-center justify-center gap-4 overflow-hidden rounded-box border border-ink-border/60 px-6 py-10"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-wash-blue/20"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -left-8 -top-10 size-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_75%,transparent)_0%,transparent_70%)] opacity-80 blur-2xl"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -bottom-12 -right-6 size-36 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-c)_70%,transparent)_0%,transparent_70%)] opacity-70 blur-2xl"
                aria-hidden
              />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <BrushTipLoader decorative />
                  <PigmentBloomLoader decorative />
                </div>
                <p className="font-display text-lg font-semibold">Pigment mix</p>
                <p className="max-w-xs text-center text-sm text-ink-muted">
                  Bloom radius follows flow and water from wash CSS vars.
                </p>
              </div>
            </div>

            <div
              className="flex min-h-48 cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-200/50 px-6 py-10 md:col-span-2"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <div className="flex flex-wrap items-center justify-center gap-6">
                <PigmentMark size={64} />
                <InkWordmarkLoader decorative />
              </div>
              <p className="max-w-md text-center text-sm text-ink-muted">
                Logo soak uses the pigment mark from the favicon palette and an
                ink-fill wordmark timed to{' '}
                <span className="font-mono text-xs">--brush-soak-duration</span>.
              </p>
            </div>
          </div>`}
            jsx={`<div className="grid gap-4 md:grid-cols-2">
            <div
              className="flex min-h-52 cursor-wait flex-col items-center justify-center gap-4 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-10"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <BrushStrokeLoader decorative />
              <p className="font-display text-lg font-semibold">Laying wash</p>
              <p className="max-w-xs text-center text-sm text-ink-muted">
                Soft edges settling with default studio load.
              </p>
            </div>

            <div
              className="relative flex min-h-52 cursor-progress flex-col items-center justify-center gap-4 overflow-hidden rounded-box border border-ink-border/60 px-6 py-10"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-wash-blue/20"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -left-8 -top-10 size-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_75%,transparent)_0%,transparent_70%)] opacity-80 blur-2xl"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -bottom-12 -right-6 size-36 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-c)_70%,transparent)_0%,transparent_70%)] opacity-70 blur-2xl"
                aria-hidden
              />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <BrushTipLoader decorative />
                  <PigmentBloomLoader decorative />
                </div>
                <p className="font-display text-lg font-semibold">Pigment mix</p>
                <p className="max-w-xs text-center text-sm text-ink-muted">
                  Bloom radius follows flow and water from wash CSS vars.
                </p>
              </div>
            </div>

            <div
              className="flex min-h-48 cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-200/50 px-6 py-10 md:col-span-2"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <div className="flex flex-wrap items-center justify-center gap-6">
                <PigmentMark size={64} />
                <InkWordmarkLoader decorative />
              </div>
              <p className="max-w-md text-center text-sm text-ink-muted">
                Logo soak uses the pigment mark from the favicon palette and an
                ink-fill wordmark timed to{' '}
                <span className="font-mono text-xs">--brush-soak-duration</span>.
              </p>
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="02 · Types"
          title="daisyUI animation styles"
          description="All six daisyUI 5 loading styles with class labels"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {types.map((t) => (
              <ShowcaseTabs
            preview={
              <>

              <span
                                className={`loading ${t.className} loading-lg text-primary`}
                                aria-label={`${t.name} loading`}
                              />
            
              </>
            }
            html={`<span
                  class=
                  aria-label="Label" loading\`} />`}
            jsx={`<span
                  className={\`loading \${t.className} loading-lg text-primary\`}
                  aria-label={\`\${t.name} loading\`}
                />`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="loading-xs through loading-xl on the default spinner"
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            {sizes.map((s) => (
              <ShowcaseTabs
            preview={
              <>

              <span
                                className={`loading loading-spinner ${s.className} text-primary`}
                                aria-label={`${s.name} spinner`}
                              />
            
              </>
            }
            html={`<span
                  class=
                  aria-label="Label" spinner\`} />`}
            jsx={`<span
                  className={\`loading loading-spinner \${s.className} text-primary\`}
                  aria-label={\`\${s.name} spinner\`}
                />`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic colors"
          description="Color via text-* utilities"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
            {colors.map((c) => (
              <ShowcaseTabs
            preview={
              <>

              <span
                                className={`loading loading-spinner loading-lg ${c.className}`}
                                aria-label={`${c.name} loading`}
                              />
            
              </>
            }
            html={`<span
                  class=
                  aria-label="Label" loading\`} />`}
            jsx={`<span
                  className={\`loading loading-spinner loading-lg \${c.className}\`}
                  aria-label={\`\${c.name} loading\`}
                />`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Types × colors"
          title="Style matrix"
          description="Each animation style across primary through error"
          panel="wash-panel-rose"
        >
          <div className="overflow-x-auto">
            <div className="flex min-w-[36rem] flex-col gap-5">
              {types.map((t) => (
                <div key={t.name}>
                  <p className="label-ink mb-3">{t.name}</p>
                  <div className="flex flex-wrap items-end gap-5">
                    {colors.map((c) => (
                      <ShowcaseTabs
            preview={
              <>

              <span
                                        className={`loading ${t.className} loading-md ${c.className}`}
                                        aria-label={`${t.name} ${c.name}`}
                                      />
            
              </>
            }
            html={`<span
                          class=
                          aria-label="Label" $\`} />`}
            jsx={`<span
                          className={\`loading \${t.className} loading-md \${c.className}\`}
                          aria-label={\`\${t.name} \${c.name}\`}
                        />`}
          />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          eyebrow="06 · In buttons"
          title="Loading button states"
          description="Busy buttons use studio marks or daisyUI loading, disabled state"
        >
          <div className="flex flex-wrap items-end gap-4">
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn cursor-wait gap-2"
                              disabled
                              aria-busy="true"
                            >
                              <span className="inline-block w-14 shrink-0" aria-hidden>
                                <BrushStrokeLoader
                                 
                                  decorative
                                  className="h-3! max-w-none"
                                />
                              </span>
                              Mixing
                            </button>
            
              </>
            }
            html={`<button
                type="button"
                class="btn cursor-wait gap-2"
                disabled
                aria-busy="true"
              >
                <span class="inline-block w-14 shrink-0" aria-hidden>
                  <!-- BrushStrokeLoader -->
                </span>
                Mixing
              </button>`}
            jsx={`<button
                type="button"
                className="btn cursor-wait gap-2"
                disabled
                aria-busy="true"
              >
                <span className="inline-block w-14 shrink-0" aria-hidden>
                  <BrushStrokeLoader
                   
                    decorative
                    className="h-3! max-w-none"
                  />
                </span>
                Mixing
              </button>`}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-primary cursor-wait gap-2"
                              disabled
                              aria-busy="true"
                            >
                              <PigmentMark size={22} className="shrink-0" />
                              Saving plate
                            </button>
            
              </>
            }
            html={`<button
                type="button"
                class="btn btn-primary cursor-wait gap-2"
                disabled
                aria-busy="true"
              >
                <!-- PigmentMark -->
                Saving plate
              </button>`}
            jsx={`<button
                type="button"
                className="btn btn-primary cursor-wait gap-2"
                disabled
                aria-busy="true"
              >
                <PigmentMark size={22} className="shrink-0" />
                Saving plate
              </button>`}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-secondary cursor-wait gap-2"
                              disabled
                              aria-busy="true"
                            >
                              <BrushTipLoader
                               
                                decorative
                                className="scale-[0.45] origin-center"
                              />
                              Syncing
                            </button>
            
              </>
            }
            html={`<button
                type="button"
                class="btn btn-secondary cursor-wait gap-2"
                disabled
                aria-busy="true"
              >
                <!-- BrushTipLoader -->
                Syncing
              </button>`}
            jsx={`<button
                type="button"
                className="btn btn-secondary cursor-wait gap-2"
                disabled
                aria-busy="true"
              >
                <BrushTipLoader
                 
                  decorative
                  className="scale-[0.45] origin-center"
                />
                Syncing
              </button>`}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-accent btn-outline cursor-progress"
                              disabled
                              aria-busy="true"
                            >
                              <span className="loading loading-bars loading-sm" aria-hidden />
                              Exporting
                            </button>
            
              </>
            }
            html={`<button
                type="button"
                class="btn btn-accent btn-outline cursor-progress"
                disabled
                aria-busy="true"
              >
                <span class="loading loading-bars loading-sm" aria-hidden />
                Exporting
              </button>`}
            jsx={`<button
                type="button"
                className="btn btn-accent btn-outline cursor-progress"
                disabled
                aria-busy="true"
              >
                <span className="loading loading-bars loading-sm" aria-hidden />
                Exporting
              </button>`}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-ghost btn-circle cursor-wait"
                              disabled
                              aria-busy="true"
                              aria-label="Loading"
                            >
                              <PigmentMark size={20} />
                            </button>
            
              </>
            }
            html={`<button
                type="button"
                class="btn btn-ghost btn-circle cursor-wait"
                disabled
                aria-busy="true"
                aria-label="Loading"
              >
                <!-- PigmentMark -->
              </button>`}
            jsx={`<button
                type="button"
                className="btn btn-ghost btn-circle cursor-wait"
                disabled
                aria-busy="true"
                aria-label="Loading"
              >
                <PigmentMark size={20} />
              </button>`}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-soft btn-info cursor-progress"
                              disabled
                              aria-busy="true"
                            >
                              <span className="loading loading-infinity" aria-hidden />
                              Drying wash
                            </button>
            
              </>
            }
            html={`<button
                type="button"
                class="btn btn-soft btn-info cursor-progress"
                disabled
                aria-busy="true"
              >
                <span class="loading loading-infinity" aria-hidden />
                Drying wash
              </button>`}
            jsx={`<button
                type="button"
                className="btn btn-soft btn-info cursor-progress"
                disabled
                aria-busy="true"
              >
                <span className="loading loading-infinity" aria-hidden />
                Drying wash
              </button>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="07 · Studio panels"
          title="Wash drying panels"
          description="Full-bleed busy states mixing studio loaders with daisyUI accents"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-4 md:grid-cols-2">
                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-12"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <BrushStrokeLoader decorative />
                            <p className="font-display text-lg font-semibold">Wash drying</p>
                            <p className="text-center text-sm text-ink-muted">
                              Soft edges are settling. Leave the plate undisturbed.
                            </p>
                            <ClassLabel value="studio-load-stroke" />
                          </div>

                          <div
                            className="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/30 px-6 py-12"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <PigmentBloomLoader decorative />
                            <p className="font-display text-lg font-semibold">Pigment mix</p>
                            <p className="text-center text-sm text-ink-muted">
                              Blending ultramarine and ochre for the next glaze.
                            </p>
                            <ClassLabel value="studio-load-bloom" />
                          </div>

                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/25 px-6 py-12 md:col-span-2 lg:col-span-1"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <div className="flex items-center gap-3">
                              <Droplets className="size-5 text-accent" strokeWidth={2} aria-hidden />
                              <PigmentMark size={36} />
                              <Palette className="size-5 text-accent" strokeWidth={2} aria-hidden />
                            </div>
                            <p className="font-display text-lg font-semibold">Series sync</p>
                            <p className="text-center text-sm text-ink-muted">
                              Pulling the latest plates into your studio shelf.
                            </p>
                            <ClassLabel value="pigment mark + Lucide" />
                          </div>

                          <div
                            className="relative flex min-h-48 cursor-progress flex-col items-center justify-center gap-3 overflow-hidden rounded-box border border-ink-border/60 px-6 py-12 md:col-span-2 lg:col-span-1"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <div
                              className="absolute inset-0 bg-base-300/40 backdrop-blur-[1px]"
                              aria-hidden
                            />
                            <div className="relative z-10 flex flex-col items-center gap-3">
                              <InkWordmarkLoader decorative />
                              <p className="text-center text-sm text-ink-muted">
                                Content stays in place under a light wash veil.
                              </p>
                              <ClassLabel value="studio-load-ink + overlay" />
                            </div>
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="grid gap-4 md:grid-cols-2">
            <div
              class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-12"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <!-- BrushStrokeLoader -->
              <p class="font-display text-lg font-semibold">Wash drying</p>
              <p class="text-center text-sm text-ink-muted">
                Soft edges are settling. Leave the plate undisturbed.
              </p>
              <!-- ClassLabel -->
            </div>

            <div
              class="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/30 px-6 py-12"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <!-- PigmentBloomLoader -->
              <p class="font-display text-lg font-semibold">Pigment mix</p>
              <p class="text-center text-sm text-ink-muted">
                Blending ultramarine and ochre for the next glaze.
              </p>
              <!-- ClassLabel -->
            </div>

            <div
              class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/25 px-6 py-12 md:col-span-2 lg:col-span-1"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <div class="flex items-center gap-3">
                <!-- Droplets -->
                <!-- PigmentMark -->
                <!-- Palette -->
              </div>
              <p class="font-display text-lg font-semibold">Series sync</p>
              <p class="text-center text-sm text-ink-muted">
                Pulling the latest plates into your studio shelf.
              </p>
              <!-- ClassLabel -->
            </div>

            <div
              class="relative flex min-h-48 cursor-progress flex-col items-center justify-center gap-3 overflow-hidden rounded-box border border-ink-border/60 px-6 py-12 md:col-span-2 lg:col-span-1"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <div
                class="absolute inset-0 bg-base-300/40 backdrop-blur-[1px]"
                aria-hidden />
              <div class="relative z-10 flex flex-col items-center gap-3">
                <!-- InkWordmarkLoader -->
                <p class="text-center text-sm text-ink-muted">
                  Content stays in place under a light wash veil.
                </p>
                <!-- ClassLabel -->
              </div>
            </div>
          </div>`}
            jsx={`<div className="grid gap-4 md:grid-cols-2">
            <div
              className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-12"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <BrushStrokeLoader decorative />
              <p className="font-display text-lg font-semibold">Wash drying</p>
              <p className="text-center text-sm text-ink-muted">
                Soft edges are settling. Leave the plate undisturbed.
              </p>
              <ClassLabel value="studio-load-stroke" />
            </div>

            <div
              className="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/30 px-6 py-12"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <PigmentBloomLoader decorative />
              <p className="font-display text-lg font-semibold">Pigment mix</p>
              <p className="text-center text-sm text-ink-muted">
                Blending ultramarine and ochre for the next glaze.
              </p>
              <ClassLabel value="studio-load-bloom" />
            </div>

            <div
              className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/25 px-6 py-12 md:col-span-2 lg:col-span-1"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <div className="flex items-center gap-3">
                <Droplets className="size-5 text-accent" strokeWidth={2} aria-hidden />
                <PigmentMark size={36} />
                <Palette className="size-5 text-accent" strokeWidth={2} aria-hidden />
              </div>
              <p className="font-display text-lg font-semibold">Series sync</p>
              <p className="text-center text-sm text-ink-muted">
                Pulling the latest plates into your studio shelf.
              </p>
              <ClassLabel value="pigment mark + Lucide" />
            </div>

            <div
              className="relative flex min-h-48 cursor-progress flex-col items-center justify-center gap-3 overflow-hidden rounded-box border border-ink-border/60 px-6 py-12 md:col-span-2 lg:col-span-1"
              role="status"
              aria-busy="true"
              aria-live="polite"
            >
              <div
                className="absolute inset-0 bg-base-300/40 backdrop-blur-[1px]"
                aria-hidden
              />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <InkWordmarkLoader decorative />
                <p className="text-center text-sm text-ink-muted">
                  Content stays in place under a light wash veil.
                </p>
                <ClassLabel value="studio-load-ink + overlay" />
              </div>
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Adaptive busy rows"
          description="Stacked on mobile, side by side from md up"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                          <div className="flex flex-1 cursor-wait items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
                            <BrushTipLoader
                             
                              decorative
                              className="shrink-0 scale-75"
                            />
                            <div className="min-w-0">
                              <p className="font-medium">Thumbnail bake</p>
                              <p className="text-sm text-ink-muted">
                                Compressing preview for the shelf grid with{' '}
                                round tip.
                              </p>
                              <ClassLabel value="studio-load-tip" />
                            </div>
                          </div>
                          <div className="flex flex-1 cursor-progress items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
                            <PigmentMark size={40} className="shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium">Cloud archive</p>
                              <p className="text-sm text-ink-muted">
                                Uploading high-res scan in the background.
                              </p>
                              <ClassLabel value="studio-load-mark" />
                            </div>
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="flex flex-col gap-4 md:flex-row md:items-stretch">
            <div class="flex flex-1 cursor-wait items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
              <!-- BrushTipLoader -->
              <div class="min-w-0">
                <p class="font-medium">Thumbnail bake</p>
                <p class="text-sm text-ink-muted">
                  Compressing preview for the shelf grid with{' '}
                  round tip.
                </p>
                <!-- ClassLabel -->
              </div>
            </div>
            <div class="flex flex-1 cursor-progress items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
              <!-- PigmentMark -->
              <div class="min-w-0">
                <p class="font-medium">Cloud archive</p>
                <p class="text-sm text-ink-muted">
                  Uploading high-res scan in the background.
                </p>
                <!-- ClassLabel -->
              </div>
            </div>
          </div>`}
            jsx={`<div className="flex flex-col gap-4 md:flex-row md:items-stretch">
            <div className="flex flex-1 cursor-wait items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
              <BrushTipLoader
               
                decorative
                className="shrink-0 scale-75"
              />
              <div className="min-w-0">
                <p className="font-medium">Thumbnail bake</p>
                <p className="text-sm text-ink-muted">
                  Compressing preview for the shelf grid with{' '}
                  round tip.
                </p>
                <ClassLabel value="studio-load-tip" />
              </div>
            </div>
            <div className="flex flex-1 cursor-progress items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
              <PigmentMark size={40} className="shrink-0" />
              <div className="min-w-0">
                <p className="font-medium">Cloud archive</p>
                <p className="text-sm text-ink-muted">
                  Uploading high-res scan in the background.
                </p>
                <ClassLabel value="studio-load-mark" />
              </div>
            </div>
          </div>`}
          />
        
        </Section>
      </div>
    </>
  )
}
