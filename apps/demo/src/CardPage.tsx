import type { ReactNode } from 'react'

const sizes = [
  { name: 'XS', className: 'card-xs' },
  { name: 'SM', className: 'card-sm' },
  { name: 'MD', className: 'card-md' },
  { name: 'LG', className: 'card-lg' },
  { name: 'XL', className: 'card-xl' },
] as const

const styles = [
  { name: 'Default', className: '' },
  { name: 'Border', className: 'card-border' },
  { name: 'Dash', className: 'card-dash' },
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
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'card'}
    </code>
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

export default function CardPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Cards
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">card</span> style,
          size, and layout modifier, printed on watercolor paper.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base card"
          description="Body, title, and actions with the default surface."
        >
          <Sample label="card + card-body + card-title + card-actions">
            <div className="card w-full max-w-sm bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title font-display">Coastal fog plate</h2>
                <p className="text-sm text-ink-muted">
                  Soft cerulean wash over warm paper. Quiet hierarchy, no extra
                  pigment.
                </p>
                <div className="card-actions justify-end">
                  <button type="button" className="btn btn-primary cursor-pointer">
                    Open
                  </button>
                </div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Styles"
          title="Border and dash"
          description="Solid border and dashed outline variants."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {styles.map((s) => (
              <Sample
                key={s.name}
                label={s.className ? `card ${s.className}` : 'card'}
              >
                <div
                  className={`card w-full bg-base-100 shadow-sm ${s.className}`}
                >
                  <div className="card-body">
                    <h2 className="card-title font-display text-lg">{s.name}</h2>
                    <p className="text-sm text-ink-muted">
                      Style sample for studio plate cards.
                    </p>
                    <div className="card-actions justify-end">
                      <button type="button" className="btn btn-sm cursor-pointer">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="From compact notes to XL display cards."
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sizes.map((s) => (
              <Sample key={s.name} label={`card ${s.className}`}>
                <div
                  className={`card card-border w-full bg-base-100 ${s.className}`}
                >
                  <div className="card-body">
                    <h2 className="card-title font-display">{s.name}</h2>
                    <p>Sized body copy and actions.</p>
                    <div className="card-actions">
                      <button type="button" className="btn cursor-pointer">
                        Action
                      </button>
                    </div>
                  </div>
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Figure"
          title="Image on top"
          description="Figure before body places the image above the content."
          panel="wash-panel-rose"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Sample label="card + figure + card-body">
              <div className="card card-border w-full max-w-md bg-base-100">
                <figure>
                  <img
                    src="https://picsum.photos/id/1015/640/360"
                    alt="Mountain lake watercolor reference"
                    className="h-48 w-full object-cover"
                    width={640}
                    height={360}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title font-display">Alpine study</h2>
                  <p className="text-sm text-ink-muted">
                    Cool wash reference for distant ridges and sky.
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      type="button"
                      className="btn btn-primary cursor-pointer"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </Sample>

            <Sample label="figure after card-body (image bottom)">
              <div className="card card-border w-full max-w-md bg-base-100">
                <div className="card-body">
                  <h2 className="card-title font-display">Harbor light</h2>
                  <p className="text-sm text-ink-muted">
                    Image after the body sits under the copy.
                  </p>
                  <div className="card-actions justify-end">
                    <button type="button" className="btn cursor-pointer">
                      Details
                    </button>
                  </div>
                </div>
                <figure>
                  <img
                    src="https://picsum.photos/id/1016/640/360"
                    alt="Harbor boats watercolor reference"
                    className="h-48 w-full object-cover"
                    width={640}
                    height={360}
                  />
                </figure>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="05 · Side"
          title="Horizontal layout"
          description="card-side places figure and body in a row."
        >
          <Sample label="card card-side">
            <div className="card card-side card-border w-full max-w-2xl bg-base-100">
              <figure className="shrink-0">
                <img
                  src="https://picsum.photos/id/1025/280/320"
                  alt="Dog portrait study reference"
                  className="h-full max-h-56 w-40 object-cover sm:w-48"
                  width={280}
                  height={320}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-display">Portrait wash</h2>
                <p className="text-sm text-ink-muted">
                  Side layout for compact catalog rows and plate previews.
                </p>
                <div className="card-actions justify-end">
                  <button
                    type="button"
                    className="btn btn-primary cursor-pointer"
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="06 · Responsive side"
          title="sm:card-side"
          description="Stacks on small screens, then goes horizontal from sm up."
          panel="wash-panel-ochre"
        >
          <Sample label="card sm:card-side">
            <div className="card sm:card-side card-border w-full max-w-2xl bg-base-100">
              <figure>
                <img
                  src="https://picsum.photos/id/1043/480/320"
                  alt="Forest path wash reference"
                  className="h-48 w-full object-cover sm:h-full sm:max-h-56 sm:w-48"
                  width={480}
                  height={320}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-display">Responsive plate</h2>
                <p className="text-sm text-ink-muted">
                  Vertical on phones. Side-by-side from the sm breakpoint.
                </p>
                <div className="card-actions justify-end">
                  <button type="button" className="btn cursor-pointer">
                    Open
                  </button>
                </div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="07 · Image full"
          title="Overlay content"
          description="image-full places body copy over the figure."
        >
          <Sample label="card image-full" className="max-w-md">
            <div className="card image-full w-full bg-base-100 shadow-sm">
              <figure>
                <img
                  src="https://picsum.photos/id/1018/640/420"
                  alt="Valley mist overlaid card"
                  className="h-64 w-full object-cover"
                  width={640}
                  height={420}
                />
              </figure>
              <div className="card-body justify-end">
                <h2 className="card-title font-display">Mist overlay</h2>
                <p className="text-sm">
                  Title and actions sit on the wash of the image.
                </p>
                <div className="card-actions">
                  <button
                    type="button"
                    className="btn btn-primary cursor-pointer"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="08 · Badges & actions"
          title="Badges, buttons, and joins"
          description="Common card chrome: badge in the title, multiple actions."
          panel="wash-panel-rose"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Sample label="card-title + badge">
              <div className="card card-border w-full bg-base-100">
                <div className="card-body">
                  <h2 className="card-title font-display">
                    Series ledger
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p className="text-sm text-ink-muted">
                    Tag a plate status without cluttering the body.
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      type="button"
                      className="btn btn-ghost cursor-pointer"
                    >
                      Deny
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary cursor-pointer"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </Sample>

            <Sample label="card-actions + btn-outline">
              <div className="card card-border w-full bg-base-100">
                <figure>
                  <img
                    src="https://picsum.photos/id/1039/640/280"
                    alt="Studio shelf reference"
                    className="h-36 w-full object-cover"
                    width={640}
                    height={280}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title font-display">
                    Pigment kit
                    <div className="badge badge-outline">WS-12</div>
                  </h2>
                  <p className="text-sm text-ink-muted">
                    Outline action for secondary paths.
                  </p>
                  <div className="card-actions justify-between">
                    <button
                      type="button"
                      className="btn btn-outline cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="09 · Centered"
          title="Centered content"
          description="items-center text-center for quiet marketing-style cards."
        >
          <Sample label="card items-center text-center" className="max-w-sm">
            <div className="card card-border w-full items-center bg-base-100 text-center">
              <div className="card-body items-center">
                <h2 className="card-title font-display">Empty ledger</h2>
                <p className="text-sm text-ink-muted">
                  No plates yet. Start a wash series when you are ready.
                </p>
                <div className="card-actions">
                  <button
                    type="button"
                    className="btn btn-primary cursor-pointer"
                  >
                    Create plate
                  </button>
                </div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="10 · Compact grid"
          title="Border × size"
          description="Bordered cards across the size scale in one view."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-start gap-4">
            {sizes.map((s) => (
              <Sample key={s.name} label={`card card-border ${s.className}`}>
                <div
                  className={`card card-border w-44 bg-base-100 ${s.className}`}
                >
                  <div className="card-body">
                    <h2 className="card-title font-display">{s.name}</h2>
                    <p>Bordered</p>
                  </div>
                </div>
              </Sample>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
