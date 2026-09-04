import type { ReactNode } from 'react'
import heroPlate from './assets/hero.png'
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

export default function HeroPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Hero
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">hero</span> and <span className="font-mono text-xs">hero-content</span> and hero-overlay banners nested in wash panels so studio.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Title, copy, and CTA"
          description="Minimal hero with content block and a primary action"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="hero + hero-content">
                  <div className="hero min-h-72 rounded-box bg-base-200">
                    <div className="hero-content text-center">
                      <div className="max-w-md">
                        <h2 className="font-display text-3xl font-bold md:text-4xl">
                          Soft morning wash
                        </h2>
                        <p className="py-5 text-sm text-ink-muted md:text-base">
                          Lay a quiet cerulean field, then ink the hierarchy. One
                          headline, one sentence, one clear next step.
                        </p>
                        <button type="button" className="btn btn-primary cursor-pointer">
                          Open plate
                        </button>
                      </div>
                    </div>
                  </div>
                </Sample>
              </>
            }
            html={'<div class="hero min-h-72 rounded-box bg-base-200">\n  <div class="hero-content text-center">\n    <div class="max-w-md">\n      <h2 class="font-display text-3xl font-bold md:text-4xl">Soft morning wash</h2>\n      <p class="py-5 text-sm text-ink-muted md:text-base">\n        Lay a quiet cerulean field, then ink the hierarchy. One headline, one sentence, one clear next step.\n      </p>\n      <button type="button" class="btn btn-primary cursor-pointer">Open plate</button>\n    </div>\n  </div>\n</div>'}
            jsx={'<div className="hero min-h-72 rounded-box bg-base-200">\n  <div className="hero-content text-center">\n    <div className="max-w-md">\n      <h2 className="font-display text-3xl font-bold md:text-4xl">Soft morning wash</h2>\n      <p className="py-5 text-sm text-ink-muted md:text-base">\n        Lay a quiet cerulean field, then ink the hierarchy. One headline, one sentence, one clear next step.\n      </p>\n      <button type="button" className="btn btn-primary cursor-pointer">Open plate</button>\n    </div>\n  </div>\n</div>'}
          />
        </Section>

        <Section
          eyebrow="02 · Figure"
          title="Hero with image"
          description="Stacks on mobile, then sits beside the plate on large screens"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="hero-content flex-col lg:flex-row">
                  <div className="hero min-h-72 rounded-box bg-base-200">
                    <div className="hero-content flex-col gap-8 lg:flex-row">
                      <img
                        src={heroPlate}
                        alt="Menzies Design watercolor plate"
                        className="max-w-xs rounded-lg shadow-md"
                        width={343}
                        height={361}
                      />
                      <div className="max-w-md text-center lg:text-left">
                        <h2 className="font-display text-3xl font-bold md:text-4xl">
                          Coastal fog plate
                        </h2>
                        <p className="py-5 text-sm text-ink-muted md:text-base">
                          Pair a local wash plate with copy. No remote stock URLs, so
                          the gallery stays offline-safe.
                        </p>
                        <button type="button" className="btn btn-primary cursor-pointer">
                          View series
                        </button>
                      </div>
                    </div>
                  </div>
                </Sample>
              </>
            }
            html={'<div class="hero min-h-72 rounded-box bg-base-200">\n  <div class="hero-content flex-col gap-8 lg:flex-row">\n    <img src="/hero.png" alt="Menzies Design watercolor plate" class="max-w-xs rounded-lg shadow-md" width="343" height="361" />\n    <div class="max-w-md text-center lg:text-left">\n      <h2 class="font-display text-3xl font-bold md:text-4xl">Coastal fog plate</h2>\n      <p class="py-5 text-sm text-ink-muted md:text-base">\n        Pair a local wash plate with copy. No remote stock URLs, so the gallery stays offline-safe.\n      </p>\n      <button type="button" class="btn btn-primary cursor-pointer">View series</button>\n    </div>\n  </div>\n</div>'}
            jsx={'<div className="hero min-h-72 rounded-box bg-base-200">\n  <div className="hero-content flex-col gap-8 lg:flex-row">\n    <img\n      src={heroPlate}\n      alt="Menzies Design watercolor plate"\n      className="max-w-xs rounded-lg shadow-md"\n      width={343}\n      height={361}\n    />\n    <div className="max-w-md text-center lg:text-left">\n      <h2 className="font-display text-3xl font-bold md:text-4xl">Coastal fog plate</h2>\n      <p className="py-5 text-sm text-ink-muted md:text-base">\n        Pair a local wash plate with copy. No remote stock URLs, so the gallery stays offline-safe.\n      </p>\n      <button type="button" className="btn btn-primary cursor-pointer">View series</button>\n    </div>\n  </div>\n</div>'}
          />
        </Section>

        <Section
          eyebrow="03 · Reverse figure"
          title="Image on the trailing edge"
          description="Same stack on mobile; figure flips to the right from lg up"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="hero-content flex-col lg:flex-row-reverse">
                  <div className="hero min-h-72 rounded-box bg-base-200">
                    <div className="hero-content flex-col gap-8 lg:flex-row-reverse">
                      <div
                        className="wash-bloom flex h-48 w-full max-w-xs items-center justify-center rounded-lg shadow-md"
                        aria-hidden="true"
                      >
                        <span className="font-display text-2xl font-semibold text-base-content/70">
                          Wash plate
                        </span>
                      </div>
                      <div className="max-w-md text-center lg:text-left">
                        <h2 className="font-display text-3xl font-bold md:text-4xl">
                          Ochre undertone
                        </h2>
                        <p className="py-5 text-sm text-ink-muted md:text-base">
                          A CSS wash bloom stands in for media when you want pigment
                          atmosphere without a bitmap.
                        </p>
                        <button type="button" className="btn btn-secondary cursor-pointer">
                          Mix pigment
                        </button>
                      </div>
                    </div>
                  </div>
                </Sample>
              </>
            }
            html={'<div class="hero min-h-72 rounded-box bg-base-200">\n  <div class="hero-content flex-col gap-8 lg:flex-row-reverse">\n    <div class="wash-bloom flex h-48 w-full max-w-xs items-center justify-center rounded-lg shadow-md" aria-hidden="true">\n      <span class="font-display text-2xl font-semibold text-base-content/70">Wash plate</span>\n    </div>\n    <div class="max-w-md text-center lg:text-left">\n      <h2 class="font-display text-3xl font-bold md:text-4xl">Ochre undertone</h2>\n      <p class="py-5 text-sm text-ink-muted md:text-base">\n        A CSS wash bloom stands in for media when you want pigment atmosphere without a bitmap.\n      </p>\n      <button type="button" class="btn btn-secondary cursor-pointer">Mix pigment</button>\n    </div>\n  </div>\n</div>'}
            jsx={'<div className="hero min-h-72 rounded-box bg-base-200">\n  <div className="hero-content flex-col gap-8 lg:flex-row-reverse">\n    <div\n      className="wash-bloom flex h-48 w-full max-w-xs items-center justify-center rounded-lg shadow-md"\n      aria-hidden="true"\n    >\n      <span className="font-display text-2xl font-semibold text-base-content/70">Wash plate</span>\n    </div>\n    <div className="max-w-md text-center lg:text-left">\n      <h2 className="font-display text-3xl font-bold md:text-4xl">Ochre undertone</h2>\n      <p className="py-5 text-sm text-ink-muted md:text-base">\n        A CSS wash bloom stands in for media when you want pigment atmosphere without a bitmap.\n      </p>\n      <button type="button" className="btn btn-secondary cursor-pointer">Mix pigment</button>\n    </div>\n  </div>\n</div>'}
          />
        </Section>

        <Section
          eyebrow="04 · Overlay"
          title="Wash field with hero-overlay"
          description="Tinted overlay over a wash gradient for readable light text"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="hero + hero-overlay + hero-content">
                  <div
                    className="hero min-h-80 rounded-box"
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, color-mix(in oklab, var(--wash-a) 88%, transparent), color-mix(in oklab, var(--wash-c) 72%, transparent) 55%, color-mix(in oklab, var(--wash-b) 80%, transparent))',
                    }}
                  >
                    <div className="hero-overlay rounded-box bg-neutral/55" />
                    <div className="hero-content text-center text-neutral-content">
                      <div className="max-w-md">
                        <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                          Evening glaze
                        </h2>
                        <p className="mb-5 text-sm opacity-90 md:text-base">
                          Overlay softens the wash so type stays crisp. Keep the CTA
                          primary and the sentence short.
                        </p>
                        <button type="button" className="btn btn-primary cursor-pointer">
                          Enter studio
                        </button>
                      </div>
                    </div>
                  </div>
                </Sample>
              </>
            }
            html={'<div class="hero min-h-80 rounded-box" style="background-image: linear-gradient(135deg, color-mix(in oklab, var(--wash-a) 88%, transparent), color-mix(in oklab, var(--wash-c) 72%, transparent) 55%, color-mix(in oklab, var(--wash-b) 80%, transparent));">\n  <div class="hero-overlay rounded-box bg-neutral/55"></div>\n  <div class="hero-content text-center text-neutral-content">\n    <div class="max-w-md">\n      <h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">Evening glaze</h2>\n      <p class="mb-5 text-sm opacity-90 md:text-base">\n        Overlay softens the wash so type stays crisp. Keep the CTA primary and the sentence short.\n      </p>\n      <button type="button" class="btn btn-primary cursor-pointer">Enter studio</button>\n    </div>\n  </div>\n</div>'}
            jsx={'<div\n  className="hero min-h-80 rounded-box"\n  style={{\n    backgroundImage:\n      \'linear-gradient(135deg, color-mix(in oklab, var(--wash-a) 88%, transparent), color-mix(in oklab, var(--wash-c) 72%, transparent) 55%, color-mix(in oklab, var(--wash-b) 80%, transparent))\',\n  }}\n>\n  <div className="hero-overlay rounded-box bg-neutral/55" />\n  <div className="hero-content text-center text-neutral-content">\n    <div className="max-w-md">\n      <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Evening glaze</h2>\n      <p className="mb-5 text-sm opacity-90 md:text-base">\n        Overlay softens the wash so type stays crisp. Keep the CTA primary and the sentence short.\n      </p>\n      <button type="button" className="btn btn-primary cursor-pointer">Enter studio</button>\n    </div>\n  </div>\n</div>'}
          />
        </Section>

        <Section
          eyebrow="05 · Centered height"
          title="Centered and min-height"
          description="Taller stage with centered copy"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                  <Sample label="hero min-h-96 + text-center">
                    <div className="hero min-h-96 rounded-box bg-base-200">
                      <div className="hero-content text-center">
                        <div className="max-w-sm">
                          <h2 className="font-display text-3xl font-bold">Tall center</h2>
                          <p className="py-4 text-sm text-ink-muted">
                            Use <span className="font-mono text-xs">min-h-*</span> inside
                            the panel, not full viewport height.
                          </p>
                          <button type="button" className="btn btn-primary cursor-pointer">
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </Sample>
                  <Sample label="hero min-h-60 bg-base-200">
                    <div className="hero min-h-60 rounded-box bg-base-200">
                      <div className="hero-content">
                        <div className="max-w-sm">
                          <h2 className="font-display text-2xl font-bold">Compact band</h2>
                          <p className="py-3 text-sm text-ink-muted">
                            Shorter min-height for inline marketing strips and tool
                            headers.
                          </p>
                          <button type="button" className="btn btn-outline cursor-pointer">
                            Learn more
                          </button>
                        </div>
                      </div>
                    </div>
                  </Sample>
                </div>
              </>
            }
            html={'<div class="grid gap-6 lg:grid-cols-2">\n  <div class="hero min-h-96 rounded-box bg-base-200">\n    <div class="hero-content text-center">\n      <div class="max-w-sm">\n        <h2 class="font-display text-3xl font-bold">Tall center</h2>\n        <p class="py-4 text-sm text-ink-muted">Use min-h-* inside the panel, not full viewport height.</p>\n        <button type="button" class="btn btn-primary cursor-pointer">Continue</button>\n      </div>\n    </div>\n  </div>\n  <div class="hero min-h-60 rounded-box bg-base-200">\n    <div class="hero-content">\n      <div class="max-w-sm">\n        <h2 class="font-display text-2xl font-bold">Compact band</h2>\n        <p class="py-3 text-sm text-ink-muted">Shorter min-height for inline marketing strips and tool headers.</p>\n        <button type="button" class="btn btn-outline cursor-pointer">Learn more</button>\n      </div>\n    </div>\n  </div>\n</div>'}
            jsx={'<div className="grid gap-6 lg:grid-cols-2">\n  <div className="hero min-h-96 rounded-box bg-base-200">\n    <div className="hero-content text-center">\n      <div className="max-w-sm">\n        <h2 className="font-display text-3xl font-bold">Tall center</h2>\n        <p className="py-4 text-sm text-ink-muted">\n          Use <span className="font-mono text-xs">min-h-*</span> inside the panel, not full viewport height.\n        </p>\n        <button type="button" className="btn btn-primary cursor-pointer">Continue</button>\n      </div>\n    </div>\n  </div>\n  <div className="hero min-h-60 rounded-box bg-base-200">\n    <div className="hero-content">\n      <div className="max-w-sm">\n        <h2 className="font-display text-2xl font-bold">Compact band</h2>\n        <p className="py-3 text-sm text-ink-muted">\n          Shorter min-height for inline marketing strips and tool headers.\n        </p>\n        <button type="button" className="btn btn-outline cursor-pointer">Learn more</button>\n      </div>\n    </div>\n  </div>\n</div>'}
          />
        </Section>

        <Section
          eyebrow="06 · Studio landing"
          title="Menzies Design brand hero"
          description="Brand-forward mini landing: strong name, one headline, one sentence"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="hero + brand-forward hero-content">
                  <div className="hero min-h-80 overflow-hidden rounded-box page-wash">
                    <div className="hero-content w-full max-w-2xl flex-col py-10 text-center">
                      <p className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                        Menzies Design
                      </p>
                      <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                        Pigment desk for quiet hierarchy
                      </h2>
                      <p className="mt-3 max-w-lg text-sm text-ink-muted md:text-base">
                        Build pages with ink weight and wash opacity. Start from the
                        overview and keep every control on paper.
                      </p>
                      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <button type="button" className="btn btn-primary cursor-pointer">
                          Open overview
                        </button>
                        <button type="button" className="btn btn-ghost cursor-pointer">
                          Browse palette
                        </button>
                      </div>
                    </div>
                  </div>
                </Sample>
              </>
            }
            html={'<div class="hero min-h-80 overflow-hidden rounded-box page-wash">\n  <div class="hero-content w-full max-w-2xl flex-col py-10 text-center">\n    <p class="font-display text-4xl font-semibold tracking-tight md:text-5xl">Menzies Design</p>\n    <h2 class="mt-3 font-display text-2xl font-semibold md:text-3xl">Pigment desk for quiet hierarchy</h2>\n    <p class="mt-3 max-w-lg text-sm text-ink-muted md:text-base">\n      Build pages with ink weight and wash opacity. Start from the overview and keep every control on paper.\n    </p>\n    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">\n      <button type="button" class="btn btn-primary cursor-pointer">Open overview</button>\n      <button type="button" class="btn btn-ghost cursor-pointer">Browse palette</button>\n    </div>\n  </div>\n</div>'}
            jsx={'<div className="hero min-h-80 overflow-hidden rounded-box page-wash">\n  <div className="hero-content w-full max-w-2xl flex-col py-10 text-center">\n    <p className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Menzies Design</p>\n    <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">Pigment desk for quiet hierarchy</h2>\n    <p className="mt-3 max-w-lg text-sm text-ink-muted md:text-base">\n      Build pages with ink weight and wash opacity. Start from the overview and keep every control on paper.\n    </p>\n    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">\n      <button type="button" className="btn btn-primary cursor-pointer">Open overview</button>\n      <button type="button" className="btn btn-ghost cursor-pointer">Browse palette</button>\n    </div>\n  </div>\n</div>'}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Stack then split"
          description="Content stacks on small screens"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="flex-col lg:flex-row (responsive)">
                  <div className="hero min-h-72 rounded-box bg-base-200">
                    <div className="hero-content w-full flex-col gap-6 lg:flex-row lg:gap-10">
                      <div className="w-full max-w-sm shrink-0">
                        <div className="wash-panel wash-panel-rose flex aspect-[4/3] items-end rounded-lg">
                          <p className="font-display text-lg font-semibold">
                            Series wall
                          </p>
                        </div>
                      </div>
                      <div className="w-full max-w-md text-center lg:text-left">
                        <h2 className="font-display text-3xl font-bold">
                          Mobile stacks first
                        </h2>
                        <p className="py-4 text-sm text-ink-muted md:text-base">
                          On narrow viewports the figure sits above the copy. Widen the
                          pane to see the row layout.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                          <button type="button" className="btn btn-primary cursor-pointer">
                            Start
                          </button>
                          <button type="button" className="btn btn-outline cursor-pointer">
                            Specs
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Sample>
              </>
            }
            html={'<div class="hero min-h-72 rounded-box bg-base-200">\n  <div class="hero-content w-full flex-col gap-6 lg:flex-row lg:gap-10">\n    <div class="w-full max-w-sm shrink-0">\n      <div class="wash-panel wash-panel-rose flex aspect-[4/3] items-end rounded-lg">\n        <p class="font-display text-lg font-semibold">Series wall</p>\n      </div>\n    </div>\n    <div class="w-full max-w-md text-center lg:text-left">\n      <h2 class="font-display text-3xl font-bold">Mobile stacks first</h2>\n      <p class="py-4 text-sm text-ink-muted md:text-base">\n        On narrow viewports the figure sits above the copy. Widen the pane to see the row layout.\n      </p>\n      <div class="flex flex-wrap justify-center gap-2 lg:justify-start">\n        <button type="button" class="btn btn-primary cursor-pointer">Start</button>\n        <button type="button" class="btn btn-outline cursor-pointer">Specs</button>\n      </div>\n    </div>\n  </div>\n</div>'}
            jsx={'<div className="hero min-h-72 rounded-box bg-base-200">\n  <div className="hero-content w-full flex-col gap-6 lg:flex-row lg:gap-10">\n    <div className="w-full max-w-sm shrink-0">\n      <div className="wash-panel wash-panel-rose flex aspect-[4/3] items-end rounded-lg">\n        <p className="font-display text-lg font-semibold">Series wall</p>\n      </div>\n    </div>\n    <div className="w-full max-w-md text-center lg:text-left">\n      <h2 className="font-display text-3xl font-bold">Mobile stacks first</h2>\n      <p className="py-4 text-sm text-ink-muted md:text-base">\n        On narrow viewports the figure sits above the copy. Widen the pane to see the row layout.\n      </p>\n      <div className="flex flex-wrap justify-center gap-2 lg:justify-start">\n        <button type="button" className="btn btn-primary cursor-pointer">Start</button>\n        <button type="button" className="btn btn-outline cursor-pointer">Specs</button>\n      </div>\n    </div>\n  </div>\n</div>'}
          />
        </Section>
      </div>
    </>
  )
}
