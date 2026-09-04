import type { ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
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
          size, and layout modifier.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base card"
          description="Body, title, and actions with the default surface"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"card + card-body + card-title + card-actions\">\n            <div className=\"card w-full max-w-sm bg-base-100 shadow-sm\">\n              <div className=\"card-body\">\n                <h2 className=\"card-title font-display\">Coastal fog plate</h2>\n                <p className=\"text-sm text-ink-muted\">\n                  Soft cerulean wash over warm paper. Quiet hierarchy, no extra\n                  pigment.\n                </p>\n                <div className=\"card-actions justify-end\">\n                  <button type=\"button\" className=\"btn btn-primary cursor-pointer\">\n                    Open\n                  </button>\n                </div>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="02 · Styles"
          title="Border and dash"
          description="Solid border and dashed outline variants"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n            {styles.map((s) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n            {styles.map((s) => (\n              <Sample\n                key={s.name}\n                label={s.className ? `card ${s.className}` : 'card'}\n              >\n                <div\n                  className={`card w-full bg-base-100 shadow-sm ${s.className}`}\n                >\n                  <div className=\"card-body\">\n                    <h2 className=\"card-title font-display text-lg\">{s.name}</h2>\n                    <p className=\"text-sm text-ink-muted\">\n                      Style sample for studio plate cards.\n                    </p>\n                    <div className=\"card-actions justify-end\">\n                      <button type=\"button\" className=\"btn btn-sm cursor-pointer\">\n                        View\n                      </button>\n                    </div>\n                  </div>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="From compact notes to XL display cards"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"grid gap-4 sm:grid-cols-2 xl:grid-cols-3\">\n            {sizes.map((s) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"grid gap-4 sm:grid-cols-2 xl:grid-cols-3\">\n            {sizes.map((s) => (\n              <Sample key={s.name} label={`card ${s.className}`}>\n                <div\n                  className={`card card-border w-full bg-base-100 ${s.className}`}\n                >\n                  <div className=\"card-body\">\n                    <h2 className=\"card-title font-display\">{s.name}</h2>\n                    <p>Sized body copy and actions.</p>\n                    <div className=\"card-actions\">\n                      <button type=\"button\" className=\"btn cursor-pointer\">\n                        Action\n                      </button>\n                    </div>\n                  </div>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="04 · Figure"
          title="Image on top"
          description="Figure before body places the image above the content"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"grid gap-6 md:grid-cols-2\">\n            <!-- Sample -->\n\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"grid gap-6 md:grid-cols-2\">\n            <Sample label=\"card + figure + card-body\">\n              <div className=\"card card-border w-full max-w-md bg-base-100\">\n                <figure>\n                  <img\n                    src=\"https://picsum.photos/id/1015/640/360\"\n                    alt=\"Mountain lake watercolor reference\"\n                    className=\"h-48 w-full object-cover\"\n                    width={640}\n                    height={360}\n                  />\n                </figure>\n                <div className=\"card-body\">\n                  <h2 className=\"card-title font-display\">Alpine study</h2>\n                  <p className=\"text-sm text-ink-muted\">\n                    Cool wash reference for distant ridges and sky.\n                  </p>\n                  <div className=\"card-actions justify-end\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-primary cursor-pointer\"\n                    >\n                      Buy now\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n\n            <Sample label=\"figure after card-body (image bottom)\">\n              <div className=\"card card-border w-full max-w-md bg-base-100\">\n                <div className=\"card-body\">\n                  <h2 className=\"card-title font-display\">Harbor light</h2>\n                  <p className=\"text-sm text-ink-muted\">\n                    Image after the body sits under the copy.\n                  </p>\n                  <div className=\"card-actions justify-end\">\n                    <button type=\"button\" className=\"btn cursor-pointer\">\n                      Details\n                    </button>\n                  </div>\n                </div>\n                <figure>\n                  <img\n                    src=\"https://picsum.photos/id/1016/640/360\"\n                    alt=\"Harbor boats watercolor reference\"\n                    className=\"h-48 w-full object-cover\"\n                    width={640}\n                    height={360}\n                  />\n                </figure>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="05 · Side"
          title="Horizontal layout"
          description="card-side places figure and body in a row"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"card card-side\">\n            <div className=\"card card-side card-border w-full max-w-2xl bg-base-100\">\n              <figure className=\"shrink-0\">\n                <img\n                  src=\"https://picsum.photos/id/1025/280/320\"\n                  alt=\"Dog portrait study reference\"\n                  className=\"h-full max-h-56 w-40 object-cover sm:w-48\"\n                  width={280}\n                  height={320}\n                />\n              </figure>\n              <div className=\"card-body\">\n                <h2 className=\"card-title font-display\">Portrait wash</h2>\n                <p className=\"text-sm text-ink-muted\">\n                  Side layout for compact catalog rows and plate previews.\n                </p>\n                <div className=\"card-actions justify-end\">\n                  <button\n                    type=\"button\"\n                    className=\"btn btn-primary cursor-pointer\"\n                  >\n                    Watch\n                  </button>\n                </div>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="06 · Responsive side"
          title="sm:card-side"
          description="Stacks on small screens, then goes horizontal from sm up"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"card sm:card-side\">\n            <div className=\"card sm:card-side card-border w-full max-w-2xl bg-base-100\">\n              <figure>\n                <img\n                  src=\"https://picsum.photos/id/1043/480/320\"\n                  alt=\"Forest path wash reference\"\n                  className=\"h-48 w-full object-cover sm:h-full sm:max-h-56 sm:w-48\"\n                  width={480}\n                  height={320}\n                />\n              </figure>\n              <div className=\"card-body\">\n                <h2 className=\"card-title font-display\">Responsive plate</h2>\n                <p className=\"text-sm text-ink-muted\">\n                  Vertical on phones. Side-by-side from the sm breakpoint.\n                </p>\n                <div className=\"card-actions justify-end\">\n                  <button type=\"button\" className=\"btn cursor-pointer\">\n                    Open\n                  </button>\n                </div>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="07 · Image full"
          title="Overlay content"
          description="image-full places body copy over the figure"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"card image-full\" className=\"max-w-md\">\n            <div className=\"card image-full w-full bg-base-100 shadow-sm\">\n              <figure>\n                <img\n                  src=\"https://picsum.photos/id/1018/640/420\"\n                  alt=\"Valley mist overlaid card\"\n                  className=\"h-64 w-full object-cover\"\n                  width={640}\n                  height={420}\n                />\n              </figure>\n              <div className=\"card-body justify-end\">\n                <h2 className=\"card-title font-display\">Mist overlay</h2>\n                <p className=\"text-sm\">\n                  Title and actions sit on the wash of the image.\n                </p>\n                <div className=\"card-actions\">\n                  <button\n                    type=\"button\"\n                    className=\"btn btn-primary cursor-pointer\"\n                  >\n                    Explore\n                  </button>\n                </div>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="08 · Badges & actions"
          title="Badges, buttons, and joins"
          description="Common card chrome: badge in the title, multiple actions"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"grid gap-6 md:grid-cols-2\">\n            <!-- Sample -->\n\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"grid gap-6 md:grid-cols-2\">\n            <Sample label=\"card-title + badge\">\n              <div className=\"card card-border w-full bg-base-100\">\n                <div className=\"card-body\">\n                  <h2 className=\"card-title font-display\">\n                    Series ledger\n                    <div className=\"badge badge-secondary\">NEW</div>\n                  </h2>\n                  <p className=\"text-sm text-ink-muted\">\n                    Tag a plate status without cluttering the body.\n                  </p>\n                  <div className=\"card-actions justify-end\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-ghost cursor-pointer\"\n                    >\n                      Deny\n                    </button>\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-primary cursor-pointer\"\n                    >\n                      Accept\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n\n            <Sample label=\"card-actions + btn-outline\">\n              <div className=\"card card-border w-full bg-base-100\">\n                <figure>\n                  <img\n                    src=\"https://picsum.photos/id/1039/640/280\"\n                    alt=\"Studio shelf reference\"\n                    className=\"h-36 w-full object-cover\"\n                    width={640}\n                    height={280}\n                  />\n                </figure>\n                <div className=\"card-body\">\n                  <h2 className=\"card-title font-display\">\n                    Pigment kit\n                    <div className=\"badge badge-outline\">WS-12</div>\n                  </h2>\n                  <p className=\"text-sm text-ink-muted\">\n                    Outline action for secondary paths.\n                  </p>\n                  <div className=\"card-actions justify-between\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-outline cursor-pointer\"\n                    >\n                      Save\n                    </button>\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-primary cursor-pointer\"\n                    >\n                      Add\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="09 · Centered"
          title="Centered content"
          description="items-center text-center for quiet marketing-style cards"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"card items-center text-center\" className=\"max-w-sm\">\n            <div className=\"card card-border w-full items-center bg-base-100 text-center\">\n              <div className=\"card-body items-center\">\n                <h2 className=\"card-title font-display\">Empty ledger</h2>\n                <p className=\"text-sm text-ink-muted\">\n                  No plates yet. Start a wash series when you are ready.\n                </p>\n                <div className=\"card-actions\">\n                  <button\n                    type=\"button\"\n                    className=\"btn btn-primary cursor-pointer\"\n                  >\n                    Create plate\n                  </button>\n                </div>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="10 · Compact grid"
          title="Border × size"
          description="Bordered cards across the size scale in one view"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-wrap items-start gap-4\">\n            {sizes.map((s) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-start gap-4\">\n            {sizes.map((s) => (\n              <Sample key={s.name} label={`card card-border ${s.className}`}>\n                <div\n                  className={`card card-border w-44 bg-base-100 ${s.className}`}\n                >\n                  <div className=\"card-body\">\n                    <h2 className=\"card-title font-display\">{s.name}</h2>\n                    <p>Bordered</p>\n                  </div>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>
      </div>
    </>
  )
}
