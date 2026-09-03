import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { Check } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const styles = [
  { name: 'Default', className: '' },
  { name: 'Dual', className: 'aura-dual' },
  { name: 'Rainbow', className: 'aura-rainbow' },
  { name: 'Holo', className: 'aura-holo' },
  { name: 'Gold', className: 'aura-gold' },
  { name: 'Silver', className: 'aura-silver' },
  { name: 'Glow', className: 'aura-glow' },
] as const

const sizes = [
  { name: 'XS', className: 'aura-xs' },
  { name: 'SM', className: 'aura-sm' },
  { name: 'MD', className: 'aura-md' },
  { name: 'LG', className: 'aura-lg' },
  { name: 'XL', className: 'aura-xl' },
] as const

const themeColors = [
  { name: 'Primary', className: 'text-primary' },
  { name: 'Secondary', className: 'text-secondary' },
  { name: 'Accent', className: 'text-accent' },
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
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'aura'}
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
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function auraLabel(...parts: string[]) {
  return ['aura', ...parts.filter(Boolean)].join(' ')
}

export default function AuraPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Aura
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Decorative border light that wraps one child (card, button, avatar).
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Aura around a card"
          description="Base rotating border"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="aura">
                            <div className="aura">
                              <div className="card w-full max-w-sm bg-base-100 shadow-sm">
                                <div className="card-body">
                                  <h2 className="card-title font-display">Coastal fog plate</h2>
                                  <p className="text-sm text-ink-muted">
                                    Soft rotating light around the card surface.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Sample>
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"aura\">\n            <div className=\"aura\">\n              <div className=\"card w-full max-w-sm bg-base-100 shadow-sm\">\n                <div className=\"card-body\">\n                  <h2 className=\"card-title font-display\">Coastal fog plate</h2>\n                  <p className=\"text-sm text-ink-muted\">\n                    Soft rotating light around the card surface.\n                  </p>\n                </div>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="02 · Buttons"
          title="Aura around a button"
          description="Highlight a primary CTA with a light ring"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            <Sample label="aura + btn">
                              <div className="aura">
                                <button type="button" className="btn cursor-pointer">
                                  Button with aura
                                </button>
                              </div>
                            </Sample>
                            <Sample label="aura text-primary + btn-primary">
                              <div className="aura text-primary">
                                <button type="button" className="btn btn-primary cursor-pointer">
                                  Primary highlight
                                </button>
                              </div>
                            </Sample>
                            <Sample label="aura aura-glow text-accent + btn-accent">
                              <div className="aura aura-glow text-accent">
                                <button type="button" className="btn btn-accent cursor-pointer">
                                  Glow accent
                                </button>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-6\">\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-6\">\n            <Sample label=\"aura + btn\">\n              <div className=\"aura\">\n                <button type=\"button\" className=\"btn cursor-pointer\">\n                  Button with aura\n                </button>\n              </div>\n            </Sample>\n            <Sample label=\"aura text-primary + btn-primary\">\n              <div className=\"aura text-primary\">\n                <button type=\"button\" className=\"btn btn-primary cursor-pointer\">\n                  Primary highlight\n                </button>\n              </div>\n            </Sample>\n            <Sample label=\"aura aura-glow text-accent + btn-accent\">\n              <div className=\"aura aura-glow text-accent\">\n                <button type=\"button\" className=\"btn btn-accent cursor-pointer\">\n                  Glow accent\n                </button>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="03 · Styles"
          title="Style modifiers"
          description="dual, rainbow, holo, gold, silver, and glow variants"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {styles.map((s) => (
                              <Sample
                                key={s.name}
                                label={auraLabel(s.className)}
                              >
                                <div className={`aura ${s.className}`}>
                                  <div className="card w-full bg-base-100 shadow-sm">
                                    <div className="card-body py-4">
                                      <p className="font-display text-lg font-semibold">{s.name}</p>
                                      <p className="text-sm text-ink-muted">
                                        {s.className || 'Default rotating border'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n            {styles.map((s) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n            {styles.map((s) => (\n              <Sample\n                key={s.name}\n                label={auraLabel(s.className)}\n              >\n                <div className={`aura ${s.className}`}>\n                  <div className=\"card w-full bg-base-100 shadow-sm\">\n                    <div className=\"card-body py-4\">\n                      <p className=\"font-display text-lg font-semibold\">{s.name}</p>\n                      <p className=\"text-sm text-ink-muted\">\n                        {s.className || 'Default rotating border'}\n                      </p>\n                    </div>\n                  </div>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="04 · Sizes"
          title="Aura sizes"
          description="Padding thickness from aura-xs through aura-xl (md is default)"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-5">
                            {sizes.map((s) => (
                              <Sample
                                key={s.name}
                                label={s.className === 'aura-md' ? 'aura (md)' : auraLabel(s.className)}
                              >
                                <div className={`aura ${s.className}`}>
                                  <button type="button" className="btn cursor-pointer">
                                    {s.name}
                                  </button>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-5\">\n            {sizes.map((s) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-5\">\n            {sizes.map((s) => (\n              <Sample\n                key={s.name}\n                label={s.className === 'aura-md' ? 'aura (md)' : auraLabel(s.className)}\n              >\n                <div className={`aura ${s.className}`}>\n                  <button type=\"button\" className=\"btn cursor-pointer\">\n                    {s.name}\n                  </button>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="05 · Theme colors"
          title="text-* color classes"
          description="Aura inherits currentColor"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-5">
                            {themeColors.map((c) => (
                              <Sample key={c.name} label={auraLabel(c.className)}>
                                <div className={`aura ${c.className}`}>
                                  <button type="button" className="btn cursor-pointer">
                                    {c.name}
                                  </button>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-5\">\n            {themeColors.map((c) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-5\">\n            {themeColors.map((c) => (\n              <Sample key={c.name} label={auraLabel(c.className)}>\n                <div className={`aura ${c.className}`}>\n                  <button type=\"button\" className=\"btn cursor-pointer\">\n                    {c.name}\n                  </button>\n                </div>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="06 · Custom color"
          title="Arbitrary text and background"
          description="Custom aura pigment via text-*, and optional bg-* for the aura pad"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                            <Sample label="aura text-orange-600">
                              <div className="aura text-orange-600">
                                <div className="card w-full bg-base-100 text-base-content shadow-sm">
                                  <div className="card-body">
                                    <p className="font-display text-lg font-semibold">Custom color</p>
                                    <p className="text-sm text-ink-muted">
                                      Orange rotating border from text-orange-600.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="aura text-orange-600 bg-yellow-200">
                              <div className="aura text-orange-600 bg-yellow-200">
                                <div className="card w-full bg-base-100 text-base-content shadow-sm">
                                  <div className="card-body">
                                    <p className="font-display text-lg font-semibold">Color + background</p>
                                    <p className="text-sm text-ink-muted">
                                      Yellow pad behind the light ring.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"grid gap-6 sm:grid-cols-2\">\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"grid gap-6 sm:grid-cols-2\">\n            <Sample label=\"aura text-orange-600\">\n              <div className=\"aura text-orange-600\">\n                <div className=\"card w-full bg-base-100 text-base-content shadow-sm\">\n                  <div className=\"card-body\">\n                    <p className=\"font-display text-lg font-semibold\">Custom color</p>\n                    <p className=\"text-sm text-ink-muted\">\n                      Orange rotating border from text-orange-600.\n                    </p>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"aura text-orange-600 bg-yellow-200\">\n              <div className=\"aura text-orange-600 bg-yellow-200\">\n                <div className=\"card w-full bg-base-100 text-base-content shadow-sm\">\n                  <div className=\"card-body\">\n                    <p className=\"font-display text-lg font-semibold\">Color + background</p>\n                    <p className=\"text-sm text-ink-muted\">\n                      Yellow pad behind the light ring.\n                    </p>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="07 · Avatars"
          title="Aura around avatars"
          description="Same wrapper pattern on avatar placeholders and image rings"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            <Sample label="aura + avatar">
                              <div className="aura">
                                <div className="avatar avatar-placeholder">
                                  <div className="w-16 rounded-full bg-neutral text-neutral-content">
                                    <span className="text-xl">MK</span>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="aura aura-rainbow + avatar">
                              <div className="aura aura-rainbow">
                                <div className="avatar avatar-placeholder">
                                  <div className="w-16 rounded-full bg-primary text-primary-content">
                                    <span className="text-xl">WR</span>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="aura aura-gold text-warning + avatar">
                              <div className="aura aura-gold">
                                <div className="avatar avatar-placeholder">
                                  <div className="w-16 rounded-full bg-wash-blue text-base-content">
                                    <span className="text-xl">GL</span>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="aura aura-glow text-info + avatar">
                              <div className="aura aura-glow text-info">
                                <div className="avatar avatar-placeholder">
                                  <div className="w-16 rounded-full bg-info text-info-content">
                                    <span className="text-xl">AO</span>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-6\">\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-6\">\n            <Sample label=\"aura + avatar\">\n              <div className=\"aura\">\n                <div className=\"avatar avatar-placeholder\">\n                  <div className=\"w-16 rounded-full bg-neutral text-neutral-content\">\n                    <span className=\"text-xl\">MK</span>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"aura aura-rainbow + avatar\">\n              <div className=\"aura aura-rainbow\">\n                <div className=\"avatar avatar-placeholder\">\n                  <div className=\"w-16 rounded-full bg-primary text-primary-content\">\n                    <span className=\"text-xl\">WR</span>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"aura aura-gold text-warning + avatar\">\n              <div className=\"aura aura-gold\">\n                <div className=\"avatar avatar-placeholder\">\n                  <div className=\"w-16 rounded-full bg-wash-blue text-base-content\">\n                    <span className=\"text-xl\">GL</span>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"aura aura-glow text-info + avatar\">\n              <div className=\"aura aura-glow text-info\">\n                <div className=\"avatar avatar-placeholder\">\n                  <div className=\"w-16 rounded-full bg-info text-info-content\">\n                    <span className=\"text-xl\">AO</span>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="08 · Duration"
          title="Custom animation duration"
          description="Override spin speed with duration-* utilities"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Sample label="aura aura-rainbow duration-1000">
                              <div className="aura aura-rainbow duration-1000">
                                <div className="card w-full bg-base-100 shadow-sm">
                                  <div className="card-body py-4">
                                    <p className="text-sm">1000ms spin</p>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="aura aura-rainbow duration-2000">
                              <div className="aura aura-rainbow duration-2000">
                                <div className="card w-full bg-base-100 shadow-sm">
                                  <div className="card-body py-4">
                                    <p className="text-sm">2000ms spin</p>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="aura aura-rainbow (default 6s)">
                              <div className="aura aura-rainbow">
                                <div className="card w-full bg-base-100 shadow-sm">
                                  <div className="card-body py-4">
                                    <p className="text-sm">Default duration</p>
                                  </div>
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={"<div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n            <Sample label=\"aura aura-rainbow duration-1000\">\n              <div className=\"aura aura-rainbow duration-1000\">\n                <div className=\"card w-full bg-base-100 shadow-sm\">\n                  <div className=\"card-body py-4\">\n                    <p className=\"text-sm\">1000ms spin</p>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"aura aura-rainbow duration-2000\">\n              <div className=\"aura aura-rainbow duration-2000\">\n                <div className=\"card w-full bg-base-100 shadow-sm\">\n                  <div className=\"card-body py-4\">\n                    <p className=\"text-sm\">2000ms spin</p>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"aura aura-rainbow (default 6s)\">\n              <div className=\"aura aura-rainbow\">\n                <div className=\"card w-full bg-base-100 shadow-sm\">\n                  <div className=\"card-body py-4\">\n                    <p className=\"text-sm\">Default duration</p>\n                  </div>\n                </div>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="09 · Showcase"
          title="Rainbow pricing card"
          description="Docs pattern: highlight a featured plan with aura-rainbow"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="aura aura-rainbow + card">
                            <div className="aura aura-rainbow">
                              <div className="card w-full max-w-sm bg-base-100 shadow-sm">
                                <div className="card-body">
                                  <span className="badge badge-xs badge-warning">Most popular</span>
                                  <div className="flex justify-between gap-2">
                                    <h2 className="font-display text-3xl font-bold">Premium</h2>
                                    <span className="text-xl">$29/mo</span>
                                  </div>
                                  <ul className="mt-4 flex flex-col gap-2 text-xs">
                                    {[
                                      'High-resolution plate scans',
                                      'Custom wash templates',
                                      'Batch pigment processing',
                                      'AI-driven enhancements',
                                    ].map((item) => (
                                      <li key={item} className="flex items-start gap-2">
                                        <Check
                                          className="mt-0.5 size-4 shrink-0 text-success"
                                          strokeWidth={2}
                                        />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                    <li className="flex items-start gap-2 opacity-50">
                                      <Check
                                        className="mt-0.5 size-4 shrink-0 text-base-content/50"
                                        strokeWidth={2}
                                      />
                                      <span className="line-through">Cloud collaboration</span>
                                    </li>
                                  </ul>
                                  <div className="mt-4">
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-block cursor-pointer"
                                    >
                                      Subscribe
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Sample>
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"aura aura-rainbow + card\">\n            <div className=\"aura aura-rainbow\">\n              <div className=\"card w-full max-w-sm bg-base-100 shadow-sm\">\n                <div className=\"card-body\">\n                  <span className=\"badge badge-xs badge-warning\">Most popular</span>\n                  <div className=\"flex justify-between gap-2\">\n                    <h2 className=\"font-display text-3xl font-bold\">Premium</h2>\n                    <span className=\"text-xl\">$29/mo</span>\n                  </div>\n                  <ul className=\"mt-4 flex flex-col gap-2 text-xs\">\n                    {[\n                      'High-resolution plate scans',\n                      'Custom wash templates',\n                      'Batch pigment processing',\n                      'AI-driven enhancements',\n                    ].map((item) => (\n                      <li key={item} className=\"flex items-start gap-2\">\n                        <Check\n                          className=\"mt-0.5 size-4 shrink-0 text-success\"\n                          strokeWidth={2}\n                        />\n                        <span>{item}</span>\n                      </li>\n                    ))}\n                    <li className=\"flex items-start gap-2 opacity-50\">\n                      <Check\n                        className=\"mt-0.5 size-4 shrink-0 text-base-content/50\"\n                        strokeWidth={2}\n                      />\n                      <span className=\"line-through\">Cloud collaboration</span>\n                    </li>\n                  </ul>\n                  <div className=\"mt-4\">\n                    <button\n                      type=\"button\"\n                      className=\"btn btn-primary btn-block cursor-pointer\"\n                    >\n                      Subscribe\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </Sample>"}
          />
        
        </Section>
      </div>
    </>
  )
}
