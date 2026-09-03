import type { ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
const colors = [
  { name: 'Default', className: '' },
  { name: 'Primary', className: 'checkbox-primary' },
  { name: 'Secondary', className: 'checkbox-secondary' },
  { name: 'Accent', className: 'checkbox-accent' },
  { name: 'Neutral', className: 'checkbox-neutral' },
  { name: 'Success', className: 'checkbox-success' },
  { name: 'Warning', className: 'checkbox-warning' },
  { name: 'Info', className: 'checkbox-info' },
  { name: 'Error', className: 'checkbox-error' },
] as const

const sizes = [
  { name: 'XS', className: 'checkbox-xs' },
  { name: 'SM', className: 'checkbox-sm' },
  { name: 'MD', className: 'checkbox-md' },
  { name: 'LG', className: 'checkbox-lg' },
  { name: 'XL', className: 'checkbox-xl' },
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
      {value || 'checkbox'}
    </code>
  )
}

export default function CheckboxPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Checkboxes
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">checkbox</span>{' '}
          color and size.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base checkbox"
          description="Unchecked and checked states with the default theme color"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                            <div className="flex flex-col items-center gap-2">
                              <input type="checkbox" className="checkbox cursor-pointer" />
                              <ClassLabel value="checkbox" />
                              <span className="text-xs text-ink-muted">Unchecked</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <input
                                type="checkbox"
                                className="checkbox cursor-pointer"
                                defaultChecked
                              />
                              <ClassLabel value="checkbox (checked)" />
                              <span className="text-xs text-ink-muted">Checked</span>
                            </div>
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-8\">\n            <div class=\"flex flex-col items-center gap-2\">\n              <input type=\"checkbox\" class=\"checkbox cursor-pointer\" />\n              <!-- ClassLabel -->\n              <span class=\"text-xs text-ink-muted\">Unchecked</span>\n            </div>\n            <div class=\"flex flex-col items-center gap-2\">\n              <input\n                type=\"checkbox\"\n                class=\"checkbox cursor-pointer\"\n                checked />\n              <!-- ClassLabel -->\n              <span class=\"text-xs text-ink-muted\">Checked</span>\n            </div>\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-8\">\n            <div className=\"flex flex-col items-center gap-2\">\n              <input type=\"checkbox\" className=\"checkbox cursor-pointer\" />\n              <ClassLabel value=\"checkbox\" />\n              <span className=\"text-xs text-ink-muted\">Unchecked</span>\n            </div>\n            <div className=\"flex flex-col items-center gap-2\">\n              <input\n                type=\"checkbox\"\n                className=\"checkbox cursor-pointer\"\n                defaultChecked\n              />\n              <ClassLabel value=\"checkbox (checked)\" />\n              <span className=\"text-xs text-ink-muted\">Checked</span>\n            </div>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="Primary through error, each shown checked"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            {colors.map((c) => (
                              <div key={c.name} className="flex flex-col items-center gap-2">
                                <input
                                  type="checkbox"
                                  className={`checkbox cursor-pointer ${c.className}`}
                                  defaultChecked
                                  aria-label={c.name}
                                />
                                <span className="text-sm font-medium">{c.name}</span>
                                <ClassLabel
                                  value={c.className ? `checkbox ${c.className}` : 'checkbox'}
                                />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-6\">\n            {colors.map((c) => (\n              <div key={c.name} class=\"flex flex-col items-center gap-2\">\n                <input\n                  type=\"checkbox\"\n                  class={`checkbox cursor-pointer ${c.className}`}\n                  checked\n                  aria-label=\"Label\" />\n                <span class=\"text-sm font-medium\">{c.name}</span>\n                <!-- ClassLabel -->\n              </div>\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-6\">\n            {colors.map((c) => (\n              <div key={c.name} className=\"flex flex-col items-center gap-2\">\n                <input\n                  type=\"checkbox\"\n                  className={`checkbox cursor-pointer ${c.className}`}\n                  defaultChecked\n                  aria-label={c.name}\n                />\n                <span className=\"text-sm font-medium\">{c.name}</span>\n                <ClassLabel\n                  value={c.className ? `checkbox ${c.className}` : 'checkbox'}\n                />\n              </div>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="From compact selectors to XL touch targets"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            {sizes.map((s) => (
                              <div key={s.name} className="flex flex-col items-center gap-2">
                                <input
                                  type="checkbox"
                                  className={`checkbox checkbox-primary cursor-pointer ${s.className}`}
                                  defaultChecked
                                  aria-label={s.name}
                                />
                                <span className="text-sm font-medium">{s.name}</span>
                                <ClassLabel value={`checkbox ${s.className}`} />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-6\">\n            {sizes.map((s) => (\n              <div key={s.name} class=\"flex flex-col items-center gap-2\">\n                <input\n                  type=\"checkbox\"\n                  class={`checkbox checkbox-primary cursor-pointer ${s.className}`}\n                  checked\n                  aria-label=\"Label\" />\n                <span class=\"text-sm font-medium\">{s.name}</span>\n                <!-- ClassLabel -->\n              </div>\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-6\">\n            {sizes.map((s) => (\n              <div key={s.name} className=\"flex flex-col items-center gap-2\">\n                <input\n                  type=\"checkbox\"\n                  className={`checkbox checkbox-primary cursor-pointer ${s.className}`}\n                  defaultChecked\n                  aria-label={s.name}\n                />\n                <span className=\"text-sm font-medium\">{s.name}</span>\n                <ClassLabel value={`checkbox ${s.className}`} />\n              </div>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="04 · Size × color"
          title="Primary through the scale"
          description="One color at every size"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-4">
                            {sizes.map((s) => (
                              <div key={s.name} className="flex flex-wrap items-center gap-3">
                                <span className="label-ink w-8">{s.name}</span>
                                {colors.map((c) => (
                                  <input
                                    key={`${s.name}-${c.name}`}
                                    type="checkbox"
                                    className={`checkbox cursor-pointer ${s.className} ${c.className}`}
                                    defaultChecked
                                    aria-label={`${s.name} ${c.name}`}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"space-y-4\">\n            {sizes.map((s) => (\n              <div key={s.name} class=\"flex flex-wrap items-center gap-3\">\n                <span class=\"label-ink w-8\">{s.name}</span>\n                {colors.map((c) => (\n                  <input\n                    key={`${s.name}-${c.name}`}\n                    type=\"checkbox\"\n                    class={`checkbox cursor-pointer ${s.className} ${c.className}`}\n                    checked\n                    aria-label=\"Label\" ${c.name}`} />\n                ))}\n              </div>\n            ))}\n          </div>"}
            jsx={"<div className=\"space-y-4\">\n            {sizes.map((s) => (\n              <div key={s.name} className=\"flex flex-wrap items-center gap-3\">\n                <span className=\"label-ink w-8\">{s.name}</span>\n                {colors.map((c) => (\n                  <input\n                    key={`${s.name}-${c.name}`}\n                    type=\"checkbox\"\n                    className={`checkbox cursor-pointer ${s.className} ${c.className}`}\n                    defaultChecked\n                    aria-label={`${s.name} ${c.name}`}\n                  />\n                ))}\n              </div>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="05 · With labels"
          title="Labeled fields"
          description="Pair checkbox with label or fieldset for form use"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                            <fieldset className="fieldset rounded-box border border-ink-border bg-base-100/80 p-4">
                              <legend className="fieldset-legend">Wash preferences</legend>
                              <label className="label cursor-pointer justify-start gap-3">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-primary cursor-pointer"
                                  defaultChecked
                                />
                                <span className="label-text">Mineral blue wash</span>
                              </label>
                              <label className="label cursor-pointer justify-start gap-3">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-accent cursor-pointer"
                                />
                                <span className="label-text">Warm ochre edge</span>
                              </label>
                              <label className="label cursor-pointer justify-start gap-3">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-secondary cursor-pointer"
                                  defaultChecked
                                />
                                <span className="label-text">Rose bloom accent</span>
                              </label>
                              <p className="label">Select pigments for this plate</p>
                            </fieldset>

                            <div className="space-y-3 rounded-box border border-ink-border bg-base-100/80 p-4">
                              <p className="label-ink">Inline label</p>
                              <div className="flex flex-wrap items-center gap-2">
                                <input
                                  id="terms"
                                  type="checkbox"
                                  className="checkbox checkbox-sm checkbox-primary cursor-pointer"
                                />
                                <label htmlFor="terms" className="cursor-pointer text-sm">
                                  I agree to the studio terms
                                </label>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <input
                                  id="notify"
                                  type="checkbox"
                                  className="checkbox checkbox-sm checkbox-info cursor-pointer"
                                  defaultChecked
                                />
                                <label htmlFor="notify" className="cursor-pointer text-sm">
                                  Email when washes finish drying
                                </label>
                              </div>
                              <ClassLabel value="checkbox + label" />
                            </div>
                          </div>
              </>
            }
            html={"<div class=\"grid gap-6 sm:grid-cols-2\">\n            <fieldset class=\"fieldset rounded-box border border-ink-border bg-base-100/80 p-4\">\n              <legend class=\"fieldset-legend\">Wash preferences</legend>\n              <label class=\"label cursor-pointer justify-start gap-3\">\n                <input\n                  type=\"checkbox\"\n                  class=\"checkbox checkbox-primary cursor-pointer\"\n                  checked />\n                <span class=\"label-text\">Mineral blue wash</span>\n              </label>\n              <label class=\"label cursor-pointer justify-start gap-3\">\n                <input\n                  type=\"checkbox\"\n                  class=\"checkbox checkbox-accent cursor-pointer\" />\n                <span class=\"label-text\">Warm ochre edge</span>\n              </label>\n              <label class=\"label cursor-pointer justify-start gap-3\">\n                <input\n                  type=\"checkbox\"\n                  class=\"checkbox checkbox-secondary cursor-pointer\"\n                  checked />\n                <span class=\"label-text\">Rose bloom accent</span>\n              </label>\n              <p class=\"label\">Select pigments for this plate</p>\n            </fieldset>\n\n            <div class=\"space-y-3 rounded-box border border-ink-border bg-base-100/80 p-4\">\n              <p class=\"label-ink\">Inline label</p>\n              <div class=\"flex flex-wrap items-center gap-2\">\n                <input\n                  id=\"terms\"\n                  type=\"checkbox\"\n                  class=\"checkbox checkbox-sm checkbox-primary cursor-pointer\" />\n                <label for=\"terms\" class=\"cursor-pointer text-sm\">\n                  I agree to the studio terms\n                </label>\n              </div>\n              <div class=\"flex flex-wrap items-center gap-2\">\n                <input\n                  id=\"notify\"\n                  type=\"checkbox\"\n                  class=\"checkbox checkbox-sm checkbox-info cursor-pointer\"\n                  checked />\n                <label for=\"notify\" class=\"cursor-pointer text-sm\">\n                  Email when washes finish drying\n                </label>\n              </div>\n              <!-- ClassLabel -->\n            </div>\n          </div>"}
            jsx={"<div className=\"grid gap-6 sm:grid-cols-2\">\n            <fieldset className=\"fieldset rounded-box border border-ink-border bg-base-100/80 p-4\">\n              <legend className=\"fieldset-legend\">Wash preferences</legend>\n              <label className=\"label cursor-pointer justify-start gap-3\">\n                <input\n                  type=\"checkbox\"\n                  className=\"checkbox checkbox-primary cursor-pointer\"\n                  defaultChecked\n                />\n                <span className=\"label-text\">Mineral blue wash</span>\n              </label>\n              <label className=\"label cursor-pointer justify-start gap-3\">\n                <input\n                  type=\"checkbox\"\n                  className=\"checkbox checkbox-accent cursor-pointer\"\n                />\n                <span className=\"label-text\">Warm ochre edge</span>\n              </label>\n              <label className=\"label cursor-pointer justify-start gap-3\">\n                <input\n                  type=\"checkbox\"\n                  className=\"checkbox checkbox-secondary cursor-pointer\"\n                  defaultChecked\n                />\n                <span className=\"label-text\">Rose bloom accent</span>\n              </label>\n              <p className=\"label\">Select pigments for this plate</p>\n            </fieldset>\n\n            <div className=\"space-y-3 rounded-box border border-ink-border bg-base-100/80 p-4\">\n              <p className=\"label-ink\">Inline label</p>\n              <div className=\"flex flex-wrap items-center gap-2\">\n                <input\n                  id=\"terms\"\n                  type=\"checkbox\"\n                  className=\"checkbox checkbox-sm checkbox-primary cursor-pointer\"\n                />\n                <label htmlFor=\"terms\" className=\"cursor-pointer text-sm\">\n                  I agree to the studio terms\n                </label>\n              </div>\n              <div className=\"flex flex-wrap items-center gap-2\">\n                <input\n                  id=\"notify\"\n                  type=\"checkbox\"\n                  className=\"checkbox checkbox-sm checkbox-info cursor-pointer\"\n                  defaultChecked\n                />\n                <label htmlFor=\"notify\" className=\"cursor-pointer text-sm\">\n                  Email when washes finish drying\n                </label>\n              </div>\n              <ClassLabel value=\"checkbox + label\" />\n            </div>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="06 · States"
          title="Disabled & indeterminate"
          description="Disabled controls and an indeterminate (partial) state"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                            <div className="flex flex-col items-center gap-2">
                              <input type="checkbox" className="checkbox" disabled />
                              <ClassLabel value="disabled" />
                              <span className="text-xs text-ink-muted">Disabled off</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                disabled
                                defaultChecked
                              />
                              <ClassLabel value="disabled checked" />
                              <span className="text-xs text-ink-muted">Disabled on</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-accent cursor-pointer"
                                ref={(el) => {
                                  if (el) el.indeterminate = true
                                }}
                                aria-label="Indeterminate"
                              />
                              <ClassLabel value="indeterminate" />
                              <span className="text-xs text-ink-muted">Partial</span>
                            </div>
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-8\">\n            <div class=\"flex flex-col items-center gap-2\">\n              <input type=\"checkbox\" class=\"checkbox\" disabled />\n              <!-- ClassLabel -->\n              <span class=\"text-xs text-ink-muted\">Disabled off</span>\n            </div>\n            <div class=\"flex flex-col items-center gap-2\">\n              <input\n                type=\"checkbox\"\n                class=\"checkbox checkbox-primary\"\n                disabled\n                checked />\n              <!-- ClassLabel -->\n              <span class=\"text-xs text-ink-muted\">Disabled on</span>\n            </div>\n            <div class=\"flex flex-col items-center gap-2\">\n              <input\n                type=\"checkbox\"\n                class=\"checkbox checkbox-accent cursor-pointer\"\n                }\n                aria-label=\"Indeterminate\" />\n              <!-- ClassLabel -->\n              <span class=\"text-xs text-ink-muted\">Partial</span>\n            </div>\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-8\">\n            <div className=\"flex flex-col items-center gap-2\">\n              <input type=\"checkbox\" className=\"checkbox\" disabled />\n              <ClassLabel value=\"disabled\" />\n              <span className=\"text-xs text-ink-muted\">Disabled off</span>\n            </div>\n            <div className=\"flex flex-col items-center gap-2\">\n              <input\n                type=\"checkbox\"\n                className=\"checkbox checkbox-primary\"\n                disabled\n                defaultChecked\n              />\n              <ClassLabel value=\"disabled checked\" />\n              <span className=\"text-xs text-ink-muted\">Disabled on</span>\n            </div>\n            <div className=\"flex flex-col items-center gap-2\">\n              <input\n                type=\"checkbox\"\n                className=\"checkbox checkbox-accent cursor-pointer\"\n                ref={(el) => {\n                  if (el) el.indeterminate = true\n                }}\n                aria-label=\"Indeterminate\"\n              />\n              <ClassLabel value=\"indeterminate\" />\n              <span className=\"text-xs text-ink-muted\">Partial</span>\n            </div>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="07 · Form list"
          title="Checklist"
          description="A compact multi-select list on paper"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <ul className="space-y-2">
                            {[
                              { id: 'c1', label: 'Coastal fog plate', checked: true, color: 'checkbox-primary' },
                              { id: 'c2', label: 'Ochre cliff margin', checked: false, color: 'checkbox-warning' },
                              { id: 'c3', label: 'Rose field bloom', checked: true, color: 'checkbox-error' },
                              { id: 'c4', label: 'Indigo pool study', checked: false, color: 'checkbox-info' },
                            ].map((item) => (
                              <li key={item.id}>
                                <label className="flex cursor-pointer items-center gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-3 py-2.5 hover:bg-wash-blue/30">
                                  <input
                                    type="checkbox"
                                    className={`checkbox checkbox-sm cursor-pointer ${item.color}`}
                                    defaultChecked={item.checked}
                                  />
                                  <span className="text-sm font-medium">{item.label}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
              </>
            }
            html={"<ul class=\"space-y-2\">\n            {[\n              { id: 'c1', label: 'Coastal fog plate', checked: true, color: 'checkbox-primary' },\n              { id: 'c2', label: 'Ochre cliff margin', checked: false, color: 'checkbox-warning' },\n              { id: 'c3', label: 'Rose field bloom', checked: true, color: 'checkbox-error' },\n              { id: 'c4', label: 'Indigo pool study', checked: false, color: 'checkbox-info' },\n            ].map((item) => (\n              <li key={item.id}>\n                <label class=\"flex cursor-pointer items-center gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-3 py-2.5 hover:bg-wash-blue/30\">\n                  <input\n                    type=\"checkbox\"\n                    class={`checkbox checkbox-sm cursor-pointer ${item.color}`}\n                    checked={item.checked} />\n                  <span class=\"text-sm font-medium\">{item.label}</span>\n                </label>\n              </li>\n            ))}\n          </ul>"}
            jsx={"<ul className=\"space-y-2\">\n            {[\n              { id: 'c1', label: 'Coastal fog plate', checked: true, color: 'checkbox-primary' },\n              { id: 'c2', label: 'Ochre cliff margin', checked: false, color: 'checkbox-warning' },\n              { id: 'c3', label: 'Rose field bloom', checked: true, color: 'checkbox-error' },\n              { id: 'c4', label: 'Indigo pool study', checked: false, color: 'checkbox-info' },\n            ].map((item) => (\n              <li key={item.id}>\n                <label className=\"flex cursor-pointer items-center gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-3 py-2.5 hover:bg-wash-blue/30\">\n                  <input\n                    type=\"checkbox\"\n                    className={`checkbox checkbox-sm cursor-pointer ${item.color}`}\n                    defaultChecked={item.checked}\n                  />\n                  <span className=\"text-sm font-medium\">{item.label}</span>\n                </label>\n              </li>\n            ))}\n          </ul>"}
          />
        
        </Section>
      </div>
    </>
  )
}
