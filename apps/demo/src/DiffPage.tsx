import type { ReactNode } from 'react'

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

/** Soft watercolor plate: CSS wash only, no remote image URLs. */
function WashPlate({
  tone,
  label,
  variant = 'wet',
}: {
  tone: 'blue' | 'ochre' | 'rose' | 'ink'
  label: string
  variant?: 'wet' | 'dry'
}) {
  const tones = {
    blue: {
      wet: 'from-[#b8dce8] via-[#d9eef5] to-[#eef6f9]',
      dry: 'from-[#7aa8b8] via-[#a8c9d4] to-[#c5dde6]',
    },
    ochre: {
      wet: 'from-[#e8d2a8] via-[#f2e1c6] to-[#f8f0e0]',
      dry: 'from-[#c4a06a] via-[#d4b888] to-[#e8d4b0]',
    },
    rose: {
      wet: 'from-[#dcb0a8] via-[#e8c9c3] to-[#f4e4e0]',
      dry: 'from-[#b87870] via-[#c99890] to-[#e0b8b0]',
    },
    ink: {
      wet: 'from-base-300 via-base-200 to-base-100',
      dry: 'from-base-content/40 via-base-300 to-base-200',
    },
  } as const

  const grain =
    variant === 'wet'
      ? 'opacity-90'
      : 'opacity-100 contrast-110 saturate-75'

  return (
    <div
      className={`relative grid h-full w-full place-content-center bg-gradient-to-br ${tones[tone][variant]} ${grain}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            variant === 'wet'
              ? 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.55) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.35) 0%, transparent 50%)'
              : 'radial-gradient(ellipse at 40% 30%, rgba(0,0,0,0.08) 0%, transparent 45%)',
        }}
        aria-hidden="true"
      />
      <div className="relative px-4 text-center">
        <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {label}
        </p>
        <p className="mt-1 text-xs uppercase tracking-widest text-base-content/60">
          {variant === 'wet' ? 'Wet wash' : 'Dried pigment'}
        </p>
      </div>
    </div>
  )
}

export default function DiffPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Diff
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">diff</span> before and
          after comparisons with a resizable handle on watercolor paper.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Two sides and a resizer"
          description="Core parts: diff-item-1, diff-item-2, and the draggable diff-resizer."
        >
          <Sample label="diff + diff-item-1 + diff-item-2 + diff-resizer">
            <figure className="diff aspect-16/9 w-full cursor-col-resize" tabIndex={0}>
              <div className="diff-item-1" role="img" tabIndex={0}>
                <WashPlate tone="blue" label="Cerulean" variant="wet" />
              </div>
              <div className="diff-item-2" role="img">
                <WashPlate tone="blue" label="Cerulean" variant="dry" />
              </div>
              <div className="diff-resizer" />
            </figure>
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Aspect ratios"
          title="Frame proportions"
          description="Keep the figure ratio with Tailwind aspect utilities on the diff container."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Sample label="diff aspect-16/9" className="min-w-0">
              <figure className="diff aspect-16/9 w-full cursor-col-resize" tabIndex={0}>
                <div className="diff-item-1" role="img" tabIndex={0}>
                  <WashPlate tone="ochre" label="16:9" variant="wet" />
                </div>
                <div className="diff-item-2" role="img">
                  <WashPlate tone="ochre" label="16:9" variant="dry" />
                </div>
                <div className="diff-resizer" />
              </figure>
            </Sample>
            <Sample label="diff aspect-4/3" className="min-w-0">
              <figure className="diff aspect-4/3 w-full cursor-col-resize" tabIndex={0}>
                <div className="diff-item-1" role="img" tabIndex={0}>
                  <WashPlate tone="rose" label="4:3" variant="wet" />
                </div>
                <div className="diff-item-2" role="img">
                  <WashPlate tone="rose" label="4:3" variant="dry" />
                </div>
                <div className="diff-resizer" />
              </figure>
            </Sample>
            <Sample label="diff aspect-square" className="min-w-0 sm:col-span-2 lg:col-span-1">
              <figure className="diff aspect-square w-full max-w-xs cursor-col-resize mx-auto sm:mx-0" tabIndex={0}>
                <div className="diff-item-1" role="img" tabIndex={0}>
                  <WashPlate tone="ink" label="1:1" variant="wet" />
                </div>
                <div className="diff-item-2" role="img">
                  <WashPlate tone="ink" label="1:1" variant="dry" />
                </div>
                <div className="diff-resizer" />
              </figure>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="03 · Image compare"
          title="Pigment wash plates"
          description="CSS wash plates stand in for imagery so comparisons stay offline and URL-safe."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Sample label="diff aspect-16/9 · blue wash plate">
              <figure className="diff aspect-16/9 w-full cursor-col-resize" tabIndex={0}>
                <div className="diff-item-1" role="img" tabIndex={0} aria-label="Wet cerulean wash plate">
                  <WashPlate tone="blue" label="Coastal fog" variant="wet" />
                </div>
                <div className="diff-item-2" role="img" aria-label="Dried cerulean wash plate">
                  <WashPlate tone="blue" label="Coastal fog" variant="dry" />
                </div>
                <div className="diff-resizer" />
              </figure>
            </Sample>
            <Sample label="diff aspect-16/9 · rose wash plate">
              <figure className="diff aspect-16/9 w-full cursor-col-resize" tabIndex={0}>
                <div className="diff-item-1" role="img" tabIndex={0} aria-label="Wet rose madder wash plate">
                  <WashPlate tone="rose" label="Rose madder" variant="wet" />
                </div>
                <div className="diff-item-2" role="img" aria-label="Dried rose madder wash plate">
                  <WashPlate tone="rose" label="Rose madder" variant="dry" />
                </div>
                <div className="diff-resizer" />
              </figure>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="04 · Text / figure"
          title="Typography compare"
          description="Diff works with any content: large type blocks, not only images."
          panel="wash-panel-rose"
        >
          <Sample label="diff aspect-16/9 · text figures">
            <figure className="diff aspect-16/9 w-full cursor-col-resize" tabIndex={0}>
              <div className="diff-item-1" role="img" tabIndex={0}>
                <div className="grid h-full w-full place-content-center bg-primary text-primary-content">
                  <span className="font-display text-6xl font-black tracking-tight md:text-8xl lg:text-9xl">
                    WASH
                  </span>
                </div>
              </div>
              <div className="diff-item-2" role="img">
                <div className="grid h-full w-full place-content-center bg-base-200 text-base-content">
                  <span className="font-display text-6xl font-black tracking-tight md:text-8xl lg:text-9xl">
                    WASH
                  </span>
                </div>
              </div>
              <div className="diff-resizer" />
            </figure>
          </Sample>
        </Section>

        <Section
          eyebrow="05 · Studio"
          title="Wet wash vs dried pigment"
          description="Narrative before and after for a studio plate: saturated wet edge against settled dry pigment."
        >
          <Sample label="diff aspect-21/9 · studio narrative">
            <figure className="diff aspect-[21/9] w-full min-h-40 cursor-col-resize sm:min-h-0" tabIndex={0}>
              <div className="diff-item-1" role="img" tabIndex={0}>
                <div className="relative grid h-full w-full place-content-center overflow-hidden bg-gradient-to-br from-[#9ec8d8] via-[#c5e0ea] to-[#e8f4f8]">
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(ellipse at 25% 55%, rgba(255,255,255,0.7) 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, rgba(180,220,235,0.9) 0%, transparent 50%)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative px-6 text-center">
                    <p className="label-ink text-base-content/70">Before</p>
                    <p className="mt-1 font-display text-2xl font-semibold md:text-4xl">
                      Wet wash
                    </p>
                    <p className="mt-2 max-w-xs text-sm text-base-content/65">
                      Soft blooms and pooled pigment while the paper is still damp.
                    </p>
                  </div>
                </div>
              </div>
              <div className="diff-item-2" role="img">
                <div className="relative grid h-full w-full place-content-center overflow-hidden bg-gradient-to-br from-[#6a8f9e] via-[#8fb0bc] to-[#b8cfd8]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        'radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0.12) 0%, transparent 50%)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative px-6 text-center">
                    <p className="label-ink text-base-content/70">After</p>
                    <p className="mt-1 font-display text-2xl font-semibold md:text-4xl">
                      Dried pigment
                    </p>
                    <p className="mt-2 max-w-xs text-sm text-base-content/65">
                      Settled edges, quieter chroma, and paper tooth showing through.
                    </p>
                  </div>
                </div>
              </div>
              <div className="diff-resizer" />
            </figure>
          </Sample>
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Fluid width"
          description="Diff fills its column. Nested layouts stay readable from phone to desktop."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Sample label="diff aspect-4/3 · full width of column">
              <figure className="diff aspect-4/3 w-full cursor-col-resize" tabIndex={0}>
                <div className="diff-item-1" role="img" tabIndex={0}>
                  <WashPlate tone="ochre" label="Raw sienna" variant="wet" />
                </div>
                <div className="diff-item-2" role="img">
                  <WashPlate tone="ochre" label="Raw sienna" variant="dry" />
                </div>
                <div className="diff-resizer" />
              </figure>
            </Sample>
            <div className="flex flex-col justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/50 p-5">
              <p className="font-display text-lg font-semibold">Touch and narrow viewports</p>
              <p className="text-sm text-ink-muted">
                Drag the handle horizontally. On small screens the figure spans the
                full content width; the two-column layout stacks so each compare stays
                large enough to use.
              </p>
              <ul className="list-inside list-disc text-sm text-ink-muted">
                <li>
                  <span className="font-mono text-xs">w-full</span> on the figure
                </li>
                <li>
                  Aspect classes keep height proportional
                </li>
                <li>
                  <span className="font-mono text-xs">md:grid-cols-2</span> for desk
                </li>
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
