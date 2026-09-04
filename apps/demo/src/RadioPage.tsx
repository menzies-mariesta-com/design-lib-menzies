import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'radio-neutral' },
  { name: 'Primary', className: 'radio-primary' },
  { name: 'Secondary', className: 'radio-secondary' },
  { name: 'Accent', className: 'radio-accent' },
  { name: 'Success', className: 'radio-success' },
  { name: 'Warning', className: 'radio-warning' },
  { name: 'Info', className: 'radio-info' },
  { name: 'Error', className: 'radio-error' },
] as const

const sizes = [
  { name: 'XS', className: 'radio-xs' },
  { name: 'SM', className: 'radio-sm' },
  { name: 'MD', className: 'radio-md' },
  { name: 'LG', className: 'radio-lg' },
  { name: 'XL', className: 'radio-xl' },
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
      {value || 'radio'}
    </code>
  )
}

export default function RadioPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Radio
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">radio</span> color
          and size.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base radio group"
          description="Two options in one named group"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-center gap-6">
                            <label className="flex cursor-pointer items-center gap-2">
                              <input
                                type="radio"
                                name="radio-default"
                                className="radio cursor-pointer"
                                defaultChecked
                              />
                              <span className="text-sm">Option A</span>
                            </label>
                            <label className="flex cursor-pointer items-center gap-2">
                              <input
                                type="radio"
                                name="radio-default"
                                className="radio cursor-pointer"
                              />
                              <span className="text-sm">Option B</span>
                            </label>
                          </div>
                          <p className="mt-3">
                            <ClassLabel value="radio + name" />
                          </p>
              </>
            }
            html={`<div class="flex flex-wrap items-center gap-6">
            <label class="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="radio-default"
                class="radio cursor-pointer"
                checked
              />
              <span class="text-sm">Option A</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="radio-default"
                class="radio cursor-pointer"
              />
              <span class="text-sm">Option B</span>
            </label>
          </div>
          <p class="mt-3">
            
          </p>`}
            jsx={`<div className="flex flex-wrap items-center gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="radio-default"
                className="radio cursor-pointer"
                defaultChecked
              />
              <span className="text-sm">Option A</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="radio-default"
                className="radio cursor-pointer"
              />
              <span className="text-sm">Option B</span>
            </label>
          </div>
          <p className="mt-3">
            
          </p>`}
          />
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="Each color in its own group, selected"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            {colors.map((c) => (
                              <div key={c.name} className="flex flex-col items-center gap-2">
                                <input
                                  type="radio"
                                  name={`radio-color-${c.name}`}
                                  className={`radio cursor-pointer ${c.className}`}
                                  defaultChecked
                                  aria-label={c.name}
                                />
                                <span className="text-sm font-medium">{c.name}</span>
                                <ClassLabel
                                  value={c.className ? `radio ${c.className}` : 'radio'}
                                />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-6">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-6">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <input
                  type="radio"
                  name={\`radio-color-\${c.name}\`}
                  className={\`radio cursor-pointer \${c.className}\`}
                  defaultChecked
                  aria-label={c.name}
                />
                <span className="text-sm font-medium">{c.name}</span>
                
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="From compact to XL touch targets"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            {sizes.map((s) => (
                              <div key={s.name} className="flex flex-col items-center gap-2">
                                <input
                                  type="radio"
                                  name={`radio-size-${s.name}`}
                                  className={`radio radio-primary cursor-pointer ${s.className}`}
                                  defaultChecked
                                  aria-label={s.name}
                                />
                                <span className="text-sm font-medium">{s.name}</span>
                                <ClassLabel value={`radio ${s.className}`} />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-6">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-6">
            {sizes.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <input
                  type="radio"
                  name={\`radio-size-\${s.name}\`}
                  className={\`radio radio-primary cursor-pointer \${s.className}\`}
                  defaultChecked
                  aria-label={s.name}
                />
                <span className="text-sm font-medium">{s.name}</span>
                
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Size × color"
          title="Primary through the scale"
          description="One selected radio per color at every size"
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
                                    type="radio"
                                    name={`radio-matrix-${s.name}-${c.name}`}
                                    className={`radio cursor-pointer ${s.className} ${c.className}`}
                                    defaultChecked
                                    aria-label={`${s.name} ${c.name}`}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="space-y-4">
            <!-- repeat for each item -->
              </div>
            ))}
          </div>`}
            jsx={`<div className="space-y-4">
            {sizes.map((s) => (
              <div key={s.name} className="flex flex-wrap items-center gap-3">
                <span className="label-ink w-8">{s.name}</span>
                {colors.map((c) => (
                  <input
                    key={\`\${s.name}-\${c.name}\`}
                    type="radio"
                    name={\`radio-matrix-\${s.name}-\${c.name}\`}
                    className={\`radio cursor-pointer \${s.className} \${c.className}\`}
                    defaultChecked
                    aria-label={\`\${s.name} \${c.name}\`}
                  />
                ))}
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · With labels"
          title="Form groups"
          description="Fieldset and stacked labeled options"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                            <fieldset className="fieldset rounded-box border border-ink-border bg-base-100/80 p-4">
                              <legend className="fieldset-legend">Paper weight</legend>
                              {[
                                { value: '190', label: '190 gsm', checked: false },
                                { value: '300', label: '300 gsm cold-press', checked: true },
                                { value: '640', label: '640 gsm rough', checked: false },
                              ].map((opt) => (
                                <label
                                  key={opt.value}
                                  className="label cursor-pointer justify-start gap-3"
                                >
                                  <input
                                    type="radio"
                                    name="paper-weight"
                                    className="radio radio-primary cursor-pointer"
                                    value={opt.value}
                                    defaultChecked={opt.checked}
                                  />
                                  <span className="label-text">{opt.label}</span>
                                </label>
                              ))}
                              <p className="label">Choose one stock for this plate</p>
                            </fieldset>
                
                            <fieldset className="fieldset rounded-box border border-ink-border bg-base-100/80 p-4">
                              <legend className="fieldset-legend">Wash mode</legend>
                              {[
                                { value: 'wet', label: 'Wet-on-wet', color: 'radio-info' },
                                { value: 'dry', label: 'Dry brush', color: 'radio-accent' },
                                { value: 'glaze', label: 'Glaze layers', color: 'radio-success' },
                              ].map((opt, i) => (
                                <label
                                  key={opt.value}
                                  className="label cursor-pointer justify-start gap-3"
                                >
                                  <input
                                    type="radio"
                                    name="wash-mode"
                                    className={`radio cursor-pointer ${opt.color}`}
                                    value={opt.value}
                                    defaultChecked={i === 0}
                                  />
                                  <span className="label-text">{opt.label}</span>
                                </label>
                              ))}
                            </fieldset>
                          </div>
              </>
            }
            html={`<div class="grid gap-6 sm:grid-cols-2">
            <fieldset class="fieldset rounded-box border border-ink-border bg-base-100/80 p-4">
              <legend class="fieldset-legend">Paper weight</legend>
              ,
                ,
                ,
              ].map((opt) => (
                <label
                  key=
                  class="label cursor-pointer justify-start gap-3"
                >
                  <input
                    type="radio"
                    name="paper-weight"
                    class="radio radio-primary cursor-pointer"
                    value=
                    checked=
                  />
                  <span class="label-text"></span>
                </label>
              ))}
              <p class="label">Choose one stock for this plate</p>
            </fieldset>

            <fieldset class="fieldset rounded-box border border-ink-border bg-base-100/80 p-4">
              <legend class="fieldset-legend">Wash mode</legend>
              ,
                ,
                ,
              ].map((opt, i) => (
                <label
                  key=
                  class="label cursor-pointer justify-start gap-3"
                >
                  <input
                    type="radio"
                    name="wash-mode"
                    class=\`}
                    value=
                    checked=
                  />
                  <span class="label-text"></span>
                </label>
              ))}
            </fieldset>
          </div>`}
            jsx={`<div className="grid gap-6 sm:grid-cols-2">
            <fieldset className="fieldset rounded-box border border-ink-border bg-base-100/80 p-4">
              <legend className="fieldset-legend">Paper weight</legend>
              {[
                { value: '190', label: '190 gsm', checked: false },
                { value: '300', label: '300 gsm cold-press', checked: true },
                { value: '640', label: '640 gsm rough', checked: false },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="label cursor-pointer justify-start gap-3"
                >
                  <input
                    type="radio"
                    name="paper-weight"
                    className="radio radio-primary cursor-pointer"
                    value={opt.value}
                    defaultChecked={opt.checked}
                  />
                  <span className="label-text">{opt.label}</span>
                </label>
              ))}
              <p className="label">Choose one stock for this plate</p>
            </fieldset>

            <fieldset className="fieldset rounded-box border border-ink-border bg-base-100/80 p-4">
              <legend className="fieldset-legend">Wash mode</legend>
              {[
                { value: 'wet', label: 'Wet-on-wet', color: 'radio-info' },
                { value: 'dry', label: 'Dry brush', color: 'radio-accent' },
                { value: 'glaze', label: 'Glaze layers', color: 'radio-success' },
              ].map((opt, i) => (
                <label
                  key={opt.value}
                  className="label cursor-pointer justify-start gap-3"
                >
                  <input
                    type="radio"
                    name="wash-mode"
                    className={\`radio cursor-pointer \${opt.color}\`}
                    value={opt.value}
                    defaultChecked={i === 0}
                  />
                  <span className="label-text">{opt.label}</span>
                </label>
              ))}
            </fieldset>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · States"
          title="Disabled"
          description="Disabled radios stay out of the selection flow"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-center gap-8">
                            <label className="flex items-center gap-2 opacity-70">
                              <input type="radio" name="radio-disabled" className="radio" disabled />
                              <span className="text-sm">Disabled off</span>
                            </label>
                            <label className="flex items-center gap-2 opacity-70">
                              <input
                                type="radio"
                                name="radio-disabled-on"
                                className="radio radio-primary"
                                disabled
                                defaultChecked
                              />
                              <span className="text-sm">Disabled selected</span>
                            </label>
                            <label className="flex cursor-pointer items-center gap-2">
                              <input
                                type="radio"
                                name="radio-enabled"
                                className="radio radio-secondary cursor-pointer"
                                defaultChecked
                              />
                              <span className="text-sm">Enabled</span>
                            </label>
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-center gap-8">
            <label class="flex items-center gap-2 opacity-70">
              <input type="radio" name="radio-disabled" class="radio" disabled />
              <span class="text-sm">Disabled off</span>
            </label>
            <label class="flex items-center gap-2 opacity-70">
              <input
                type="radio"
                name="radio-disabled-on"
                class="radio radio-primary"
                disabled
                checked
              />
              <span class="text-sm">Disabled selected</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="radio-enabled"
                class="radio radio-secondary cursor-pointer"
                checked
              />
              <span class="text-sm">Enabled</span>
            </label>
          </div>`}
            jsx={`<div className="flex flex-wrap items-center gap-8">
            <label className="flex items-center gap-2 opacity-70">
              <input type="radio" name="radio-disabled" className="radio" disabled />
              <span className="text-sm">Disabled off</span>
            </label>
            <label className="flex items-center gap-2 opacity-70">
              <input
                type="radio"
                name="radio-disabled-on"
                className="radio radio-primary"
                disabled
                defaultChecked
              />
              <span className="text-sm">Disabled selected</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="radio-enabled"
                className="radio radio-secondary cursor-pointer"
                defaultChecked
              />
              <span className="text-sm">Enabled</span>
            </label>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Color groups"
          title="Exclusive pigment pick"
          description="One group, colored radios for each option"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
                            {[
                              { id: 'mineral', label: 'Mineral blue', color: 'radio-primary' },
                              { id: 'ochre', label: 'Warm ochre', color: 'radio-warning' },
                              { id: 'rose', label: 'Rose lake', color: 'radio-error' },
                              { id: 'jade', label: 'Jade glaze', color: 'radio-success' },
                            ].map((opt, i) => (
                              <label
                                key={opt.id}
                                className="flex cursor-pointer items-center gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-3 py-2.5 hover:bg-wash-blue/30"
                              >
                                <input
                                  type="radio"
                                  name="pigment-pick"
                                  className={`radio cursor-pointer ${opt.color}`}
                                  defaultChecked={i === 0}
                                />
                                <span className="text-sm font-medium">{opt.label}</span>
                              </label>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            ,
              ,
              ,
              ,
            ].map((opt, i) => (
              <label
                key=
                class="flex cursor-pointer items-center gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-3 py-2.5 hover:bg-wash-blue/30"
              >
                <input
                  type="radio"
                  name="pigment-pick"
                  class=\`}
                  checked=
                />
                <span class="text-sm font-medium"></span>
              </label>
            ))}
          </div>`}
            jsx={`<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            {[
              { id: 'mineral', label: 'Mineral blue', color: 'radio-primary' },
              { id: 'ochre', label: 'Warm ochre', color: 'radio-warning' },
              { id: 'rose', label: 'Rose lake', color: 'radio-error' },
              { id: 'jade', label: 'Jade glaze', color: 'radio-success' },
            ].map((opt, i) => (
              <label
                key={opt.id}
                className="flex cursor-pointer items-center gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-3 py-2.5 hover:bg-wash-blue/30"
              >
                <input
                  type="radio"
                  name="pigment-pick"
                  className={\`radio cursor-pointer \${opt.color}\`}
                  defaultChecked={i === 0}
                />
                <span className="text-sm font-medium">{opt.label}</span>
              </label>
            ))}
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
