import type { ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
const picsum = (id: number, size = 200) =>
  `https://picsum.photos/id/${id}/${size}/${size}`

const sizes = [
  { name: 'XL', className: 'w-32', alt: 'Studio artist portrait, extra large' },
  { name: 'LG', className: 'w-24', alt: 'Studio artist portrait, large' },
  { name: 'MD', className: 'w-16', alt: 'Studio artist portrait, medium' },
  { name: 'SM', className: 'w-12', alt: 'Studio artist portrait, small' },
  { name: 'XS', className: 'w-8', alt: 'Studio artist portrait, extra small' },
] as const

const masks = [
  { name: 'Squircle', className: 'mask mask-squircle', alt: 'Artist in squircle mask' },
  { name: 'Hexagon', className: 'mask mask-hexagon', alt: 'Artist in hexagon mask' },
  { name: 'Triangle', className: 'mask mask-triangle', alt: 'Artist in triangle mask' },
  { name: 'Circle', className: 'rounded-full', alt: 'Artist in circle crop' },
] as const

const rings = [
  { name: 'Primary', ring: 'ring-primary', alt: 'Artist with primary presence ring' },
  { name: 'Secondary', ring: 'ring-secondary', alt: 'Artist with secondary presence ring' },
  { name: 'Accent', ring: 'ring-accent', alt: 'Artist with accent presence ring' },
  { name: 'Success', ring: 'ring-success', alt: 'Artist with success presence ring' },
] as const

const groupIds = [64, 65, 91, 177] as const

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
      {value || 'avatar'}
    </code>
  )
}

function Sample({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

export default function AvatarPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Avatar
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">avatar</span>{' '}
          shape, size, presence, and group pattern on watercolor paper. Images
          from picsum.photos with descriptive alt text.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base avatar"
          description="Thumbnail portrait with rounded corners and a size utility."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            <Sample label="avatar">
                              <div className="avatar">
                                <div className="w-24 rounded">
                                  <img src={picsum(64)} alt="Watercolor studio artist portrait" />
                                </div>
                              </div>
                            </Sample>
                            <Sample label="avatar + rounded-xl">
                              <div className="avatar">
                                <div className="w-24 rounded-xl">
                                  <img
                                    src={picsum(65)}
                                    alt="Watercolor studio artist, soft rounded frame"
                                  />
                                </div>
                              </div>
                            </Sample>
                            <Sample label="avatar + rounded-full">
                              <div className="avatar">
                                <div className="w-24 rounded-full">
                                  <img
                                    src={picsum(91)}
                                    alt="Watercolor studio artist, circular crop"
                                  />
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-6\">\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-6\">\n            <Sample label=\"avatar\">\n              <div className=\"avatar\">\n                <div className=\"w-24 rounded\">\n                  <img src={picsum(64)} alt=\"Watercolor studio artist portrait\" />\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"avatar + rounded-xl\">\n              <div className=\"avatar\">\n                <div className=\"w-24 rounded-xl\">\n                  <img\n                    src={picsum(65)}\n                    alt=\"Watercolor studio artist, soft rounded frame\"\n                  />\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"avatar + rounded-full\">\n              <div className=\"avatar\">\n                <div className=\"w-24 rounded-full\">\n                  <img\n                    src={picsum(91)}\n                    alt=\"Watercolor studio artist, circular crop\"\n                  />\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Custom sizes"
          description="Set width with Tailwind w-* (height follows the square crop)."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            {sizes.map((s, i) => (
                              <Sample key={s.name} label={`avatar ${s.className}`}>
                                <div className="avatar">
                                  <div className={`${s.className} rounded`}>
                                    <img src={picsum(100 + i)} alt={s.alt} />
                                  </div>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-6\">\n            {sizes.map((s, i) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-6\">\n            {sizes.map((s, i) => (\n              <Sample key={s.name} label={`avatar ${s.className}`}>\n                <div className=\"avatar\">\n                  <div className={`${s.className} rounded`}>\n                    <img src={picsum(100 + i)} alt={s.alt} />\n                  </div>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="03 · Presence"
          title="Online and offline"
          description="avatar-online shows a green dot; avatar-offline shows gray."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                            <Sample label="avatar avatar-online">
                              <div className="avatar avatar-online">
                                <div className="w-24 rounded-full">
                                  <img
                                    src={picsum(177)}
                                    alt="Online studio collaborator portrait"
                                  />
                                </div>
                              </div>
                            </Sample>
                            <Sample label="avatar avatar-offline">
                              <div className="avatar avatar-offline">
                                <div className="w-24 rounded-full">
                                  <img
                                    src={picsum(201)}
                                    alt="Offline studio collaborator portrait"
                                  />
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-8\">\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-8\">\n            <Sample label=\"avatar avatar-online\">\n              <div className=\"avatar avatar-online\">\n                <div className=\"w-24 rounded-full\">\n                  <img\n                    src={picsum(177)}\n                    alt=\"Online studio collaborator portrait\"\n                  />\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"avatar avatar-offline\">\n              <div className=\"avatar avatar-offline\">\n                <div className=\"w-24 rounded-full\">\n                  <img\n                    src={picsum(201)}\n                    alt=\"Offline studio collaborator portrait\"\n                  />\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="04 · Placeholder"
          title="Letter placeholders"
          description="avatar-placeholder for initials when no photo is available."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            <Sample label="avatar avatar-placeholder">
                              <div className="avatar avatar-placeholder">
                                <div className="w-24 rounded-full bg-neutral text-neutral-content">
                                  <span className="text-3xl">D</span>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="avatar avatar-online avatar-placeholder">
                              <div className="avatar avatar-online avatar-placeholder">
                                <div className="w-16 rounded-full bg-neutral text-neutral-content">
                                  <span className="text-xl">AI</span>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="avatar avatar-placeholder">
                              <div className="avatar avatar-placeholder">
                                <div className="w-12 rounded-full bg-wash-blue text-base-content">
                                  <span>SY</span>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="avatar avatar-placeholder">
                              <div className="avatar avatar-placeholder">
                                <div className="w-8 rounded-full bg-primary text-primary-content">
                                  <span className="text-xs">UI</span>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-6\">\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-6\">\n            <Sample label=\"avatar avatar-placeholder\">\n              <div className=\"avatar avatar-placeholder\">\n                <div className=\"w-24 rounded-full bg-neutral text-neutral-content\">\n                  <span className=\"text-3xl\">D</span>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"avatar avatar-online avatar-placeholder\">\n              <div className=\"avatar avatar-online avatar-placeholder\">\n                <div className=\"w-16 rounded-full bg-neutral text-neutral-content\">\n                  <span className=\"text-xl\">AI</span>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"avatar avatar-placeholder\">\n              <div className=\"avatar avatar-placeholder\">\n                <div className=\"w-12 rounded-full bg-wash-blue text-base-content\">\n                  <span>SY</span>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"avatar avatar-placeholder\">\n              <div className=\"avatar avatar-placeholder\">\n                <div className=\"w-8 rounded-full bg-primary text-primary-content\">\n                  <span className=\"text-xs\">UI</span>\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="05 · Masks"
          title="Shape masks"
          description="squircle, hexagon, triangle from daisyUI mask; circle via rounded-full."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            {masks.map((m, i) => (
                              <Sample key={m.name} label={`avatar ${m.className}`}>
                                <div className="avatar">
                                  <div className={`${m.className} w-24`}>
                                    <img src={picsum(237 + i)} alt={m.alt} />
                                  </div>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-6\">\n            {masks.map((m, i) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-6\">\n            {masks.map((m, i) => (\n              <Sample key={m.name} label={`avatar ${m.className}`}>\n                <div className=\"avatar\">\n                  <div className={`${m.className} w-24`}>\n                    <img src={picsum(237 + i)} alt={m.alt} />\n                  </div>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="06 · Rings"
          title="Presence rings"
          description="ring-* with ring-offset for a colored presence frame around the crop."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                            {rings.map((r, i) => (
                              <Sample
                                key={r.name}
                                label={`avatar ring-2 ring-offset-2 ${r.ring}`}
                              >
                                <div className="avatar">
                                  <div
                                    className={`w-24 rounded-full ring-2 ring-offset-2 ring-offset-base-100 ${r.ring}`}
                                  >
                                    <img src={picsum(338 + i)} alt={r.alt} />
                                  </div>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-8\">\n            {rings.map((r, i) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-8\">\n            {rings.map((r, i) => (\n              <Sample\n                key={r.name}\n                label={`avatar ring-2 ring-offset-2 ${r.ring}`}\n              >\n                <div className=\"avatar\">\n                  <div\n                    className={`w-24 rounded-full ring-2 ring-offset-2 ring-offset-base-100 ${r.ring}`}\n                  >\n                    <img src={picsum(338 + i)} alt={r.alt} />\n                  </div>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="07 · Group"
          title="Avatar group"
          description="avatar-group with negative space overlap for stacked portraits."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8">
                            <Sample label="avatar-group -space-x-6">
                              <div className="avatar-group -space-x-6">
                                {groupIds.map((id) => (
                                  <div key={id} className="avatar">
                                    <div className="w-12">
                                      <img
                                        src={picsum(id, 96)}
                                        alt={`Team member portrait ${id}`}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Sample>
                            <Sample label="avatar-group + counter placeholder">
                              <div className="avatar-group -space-x-6">
                                {groupIds.slice(0, 3).map((id) => (
                                  <div key={id} className="avatar">
                                    <div className="w-12">
                                      <img
                                        src={picsum(id, 96)}
                                        alt={`Team member portrait ${id}`}
                                      />
                                    </div>
                                  </div>
                                ))}
                                <div className="avatar avatar-placeholder">
                                  <div className="w-12 bg-neutral text-neutral-content">
                                    <span>+99</span>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"flex flex-col gap-8\">\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-col gap-8\">\n            <Sample label=\"avatar-group -space-x-6\">\n              <div className=\"avatar-group -space-x-6\">\n                {groupIds.map((id) => (\n                  <div key={id} className=\"avatar\">\n                    <div className=\"w-12\">\n                      <img\n                        src={picsum(id, 96)}\n                        alt={`Team member portrait ${id}`}\n                      />\n                    </div>\n                  </div>\n                ))}\n              </div>\n            </Sample>\n            <Sample label=\"avatar-group + counter placeholder\">\n              <div className=\"avatar-group -space-x-6\">\n                {groupIds.slice(0, 3).map((id) => (\n                  <div key={id} className=\"avatar\">\n                    <div className=\"w-12\">\n                      <img\n                        src={picsum(id, 96)}\n                        alt={`Team member portrait ${id}`}\n                      />\n                    </div>\n                  </div>\n                ))}\n                <div className=\"avatar avatar-placeholder\">\n                  <div className=\"w-12 bg-neutral text-neutral-content\">\n                    <span>+99</span>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>
      </div>
    </>
  )
}
