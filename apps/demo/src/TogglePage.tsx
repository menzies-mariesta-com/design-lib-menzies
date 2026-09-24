import { useState, type ReactNode } from 'react'
import { Check, Droplets, Eye, EyeOff, Gauge, X } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Primary', className: 'toggle-primary' },
  { name: 'Secondary', className: 'toggle-secondary' },
  { name: 'Accent', className: 'toggle-accent' },
  { name: 'Neutral', className: 'toggle-neutral' },
  { name: 'Success', className: 'toggle-success' },
  { name: 'Warning', className: 'toggle-warning' },
  { name: 'Info', className: 'toggle-info' },
  { name: 'Error', className: 'toggle-error' },
] as const

const sizes = [
  { name: 'XS', className: 'toggle-xs' },
  { name: 'SM', className: 'toggle-sm' },
  { name: 'MD', className: 'toggle-md' },
  { name: 'LG', className: 'toggle-lg' },
] as const

const svgIcon = (paths: string, className: string) =>
  `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${paths}</svg>`

const svgCheck = svgIcon('<path d="M20 6 9 17l-5-5"/>', 'size-3')
const svgX = svgIcon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', 'size-3')
const svgDroplets = svgIcon(
  '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
  'size-4 text-primary',
)
const svgGauge = svgIcon(
  '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  'size-4 text-secondary',
)
const svgEye = svgIcon(
  '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  'size-4 text-success',
)

function toJsxMarkup(html: string): string {
  return daisyToJsx(html)
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/\schecked(?=[\s/>])/g, ' defaultChecked')
    .replace(/\sfor=/g, ' htmlFor=')
}

const basicHtml = `<div class="flex flex-wrap items-end gap-8">
  <div class="flex flex-col items-center gap-2">
    <input type="checkbox" class="toggle cursor-pointer" aria-label="Off" />
    <span class="text-xs text-ink-muted">Off</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <input type="checkbox" class="toggle cursor-pointer" checked aria-label="On" />
    <span class="text-xs text-ink-muted">On</span>
  </div>
</div>`

const sizesHtml = `<div class="flex flex-wrap items-end gap-6">
${sizes
  .map(
    (s) => `  <div class="flex flex-col items-center gap-2">
    <input type="checkbox" class="toggle toggle-primary cursor-pointer ${s.className}" checked aria-label="${s.name}" />
    <span class="text-sm font-medium">${s.name}</span>
  </div>`,
  )
  .join('\n')}
</div>`

const colorsHtml = `<div class="flex flex-wrap items-end gap-6">
${colors
  .map((c) => {
    const cls = c.className ? `toggle cursor-pointer ${c.className}` : 'toggle cursor-pointer'
    return `  <div class="flex flex-col items-center gap-2">
    <input type="checkbox" class="${cls}" checked aria-label="${c.name}" />
    <span class="text-sm font-medium">${c.name}</span>
  </div>`
  })
  .join('\n')}
</div>`

const disabledHtml = `<div class="flex flex-wrap items-end gap-8">
  <div class="flex flex-col items-center gap-2">
    <input type="checkbox" class="toggle cursor-not-allowed" disabled />
    <span class="text-xs text-ink-muted">Disabled off</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <input type="checkbox" class="toggle toggle-primary cursor-not-allowed" disabled checked />
    <span class="text-xs text-ink-muted">Disabled on</span>
  </div>
</div>`

const labelsHtml = `<div class="grid gap-6 sm:grid-cols-2">
  <fieldset class="fieldset rounded-box border border-ink-border bg-base-100/80 p-4">
    <legend class="fieldset-legend">Wash preferences</legend>
    <label class="label cursor-pointer justify-start gap-3">
      <input type="checkbox" class="toggle toggle-primary cursor-pointer" checked />
      <span class="label-text">Auto dry brush</span>
    </label>
    <label class="label cursor-pointer justify-start gap-3">
      <input type="checkbox" class="toggle toggle-accent cursor-pointer" />
      <span class="label-text">Snap to grid</span>
    </label>
    <label class="label cursor-pointer justify-start gap-3">
      <input type="checkbox" class="toggle toggle-secondary cursor-pointer" checked />
      <span class="label-text">Show bleed margin</span>
    </label>
    <p class="label">Optional studio chrome</p>
  </fieldset>
  <div class="space-y-3 rounded-box border border-ink-border bg-base-100/80 p-4">
    <p class="label-ink">Inline label</p>
    <div class="flex flex-wrap items-center gap-3">
      <input id="toggle-notify" type="checkbox" class="toggle toggle-sm toggle-info cursor-pointer" checked />
      <label for="toggle-notify" class="cursor-pointer text-sm">Notify when washes finish drying</label>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <input id="toggle-autosave" type="checkbox" class="toggle toggle-sm toggle-success cursor-pointer" />
      <label for="toggle-autosave" class="cursor-pointer text-sm">Autosave plate drafts</label>
    </div>
  </div>
</div>`

const studioHtml = `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <label class="flex cursor-pointer items-center justify-between gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-4 py-3 hover:bg-wash-blue/30">
    <span class="flex items-center gap-2 text-sm font-medium">${svgDroplets} Wet edges</span>
    <input type="checkbox" class="toggle toggle-primary cursor-pointer" checked aria-label="Wet edges" />
  </label>
  <label class="flex cursor-pointer items-center justify-between gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-4 py-3 hover:bg-wash-blue/30">
    <span class="flex items-center gap-2 text-sm font-medium">${svgGauge} Pressure</span>
    <input type="checkbox" class="toggle toggle-secondary cursor-pointer" aria-label="Pressure" />
  </label>
  <label class="flex cursor-pointer items-center justify-between gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-4 py-3 hover:bg-wash-blue/30 sm:col-span-2 lg:col-span-1">
    <span class="flex items-center gap-2 text-sm font-medium">${svgEye} Layer visibility</span>
    <input type="checkbox" class="toggle toggle-success cursor-pointer" checked aria-label="Layer visibility" />
  </label>
  <div class="sm:col-span-2 lg:col-span-3">
    <p class="text-sm text-ink-muted">Soft bloom on stroke edges. Flat pressure. Layer shown.</p>
  </div>
</div>`

const interactiveHtml = `<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div class="flex flex-wrap items-center gap-4">
    <input type="checkbox" class="toggle toggle-lg toggle-accent cursor-pointer" aria-label="Interactive preview toggle" />
    <div>
      <p class="text-sm font-medium">Preview wash off</p>
    </div>
  </div>
  <button type="button" class="btn btn-sm btn-outline cursor-pointer">Flip from button</button>
</div>`

const iconsHtml = `<div class="flex flex-wrap items-center gap-6">
  <label class="toggle text-base-content cursor-pointer">
    <input type="checkbox" checked aria-label="Icon toggle" />
    ${svgCheck}
    ${svgX}
  </label>
</div>`

const responsiveHtml = `<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div>
    <p class="text-sm font-medium">Desktop preview mode</p>
    <p class="text-xs text-ink-muted">Use a larger switch on touch, smaller beside labels on desk.</p>
  </div>
  <div class="flex flex-wrap items-center gap-4">
    <input type="checkbox" class="toggle toggle-primary toggle-lg cursor-pointer md:toggle-md" checked aria-label="Desktop preview" />
  </div>
</div>`

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
      {value || 'toggle'}
    </code>
  )
}

function ControlledStudioToggles() {
  const [wetEdges, setWetEdges] = useState(true)
  const [pressure, setPressure] = useState(false)
  const [layerVisible, setLayerVisible] = useState(true)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-4 py-3 hover:bg-wash-blue/30">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Droplets className="size-4 text-primary" strokeWidth={2} />
          Wet edges
        </span>
        <input
          type="checkbox"
          className="toggle toggle-primary cursor-pointer"
          checked={wetEdges}
          onChange={(e) => setWetEdges(e.target.checked)}
          aria-label="Wet edges"
        />
      </label>

      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-4 py-3 hover:bg-wash-blue/30">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Gauge className="size-4 text-secondary" strokeWidth={2} />
          Pressure
        </span>
        <input
          type="checkbox"
          className="toggle toggle-secondary cursor-pointer"
          checked={pressure}
          onChange={(e) => setPressure(e.target.checked)}
          aria-label="Pressure"
        />
      </label>

      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-4 py-3 hover:bg-wash-blue/30 sm:col-span-2 lg:col-span-1">
        <span className="flex items-center gap-2 text-sm font-medium">
          {layerVisible ? (
            <Eye className="size-4 text-success" strokeWidth={2} />
          ) : (
            <EyeOff className="size-4 text-warning" strokeWidth={2} />
          )}
          Layer visibility
        </span>
        <input
          type="checkbox"
          className="toggle toggle-success cursor-pointer"
          checked={layerVisible}
          onChange={(e) => setLayerVisible(e.target.checked)}
          aria-label="Layer visibility"
        />
      </label>

      <div className="sm:col-span-2 lg:col-span-3">
        <p className="text-sm text-ink-muted">
          {wetEdges ? 'Soft bloom on stroke edges.' : 'Hard edge mode.'}{' '}
          {pressure ? 'Pressure curve on.' : 'Flat pressure.'}{' '}
          {layerVisible ? 'Layer shown.' : 'Layer hidden.'}
        </p>
        <ClassLabel value="toggle (controlled studio)" />
      </div>
    </div>
  )
}

function InteractiveToggle() {
  const [on, setOn] = useState(false)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="checkbox"
          className="toggle toggle-lg toggle-accent cursor-pointer"
          checked={on}
          onChange={(e) => setOn(e.target.checked)}
          aria-label="Interactive preview toggle"
        />
        <div>
          <p className="text-sm font-medium">{on ? 'Preview wash on' : 'Preview wash off'}</p>
          <ClassLabel value="toggle toggle-lg toggle-accent (controlled)" />
        </div>
      </div>
      <button
        type="button"
        className="btn btn-sm btn-outline cursor-pointer"
        onClick={() => setOn((v) => !v)}
      >
        Flip from button
      </button>
    </div>
  )
}

export default function TogglePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Toggle
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">toggle</span> switches for on and off studio settings.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="On and off"
          description="Unchecked and checked states with the default theme color"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                            <div className="flex flex-col items-center gap-2">
                              <input type="checkbox" className="toggle cursor-pointer" aria-label="Off" />
                              <ClassLabel value="toggle" />
                              <span className="text-xs text-ink-muted">Off</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <input
                                type="checkbox"
                                className="toggle cursor-pointer"
                                defaultChecked
                                aria-label="On"
                              />
                              <ClassLabel value="toggle (checked)" />
                              <span className="text-xs text-ink-muted">On</span>
                            </div>
                          </div>
              </>
            }
            html={basicHtml}
            jsx={toJsxMarkup(basicHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Size scale"
          description="From compact desk chrome to large touch targets"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            {sizes.map((s) => (
                              <div key={s.name} className="flex flex-col items-center gap-2">
                                <input
                                  type="checkbox"
                                  className={`toggle toggle-primary cursor-pointer ${s.className}`}
                                  defaultChecked
                                  aria-label={s.name}
                                />
                                <span className="text-sm font-medium">{s.name}</span>
                                <ClassLabel value={`toggle ${s.className}`} />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={sizesHtml}
            jsx={toJsxMarkup(sizesHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic colors"
          description="Primary through error, each shown on"
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
                                  className={`toggle cursor-pointer ${c.className}`}
                                  defaultChecked
                                  aria-label={c.name}
                                />
                                <span className="text-sm font-medium">{c.name}</span>
                                <ClassLabel
                                  value={c.className ? `toggle ${c.className}` : 'toggle'}
                                />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={colorsHtml}
            jsx={toJsxMarkup(colorsHtml)}
          />
        </Section>

        <Section
          eyebrow="04 · Disabled"
          title="Disabled states"
          description="Off and on when the control cannot change"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                            <div className="flex flex-col items-center gap-2">
                              <input type="checkbox" className="toggle cursor-not-allowed" disabled />
                              <ClassLabel value="disabled" />
                              <span className="text-xs text-ink-muted">Disabled off</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <input
                                type="checkbox"
                                className="toggle toggle-primary cursor-not-allowed"
                                disabled
                                defaultChecked
                              />
                              <ClassLabel value="disabled checked" />
                              <span className="text-xs text-ink-muted">Disabled on</span>
                            </div>
                          </div>
              </>
            }
            html={disabledHtml}
            jsx={toJsxMarkup(disabledHtml)}
          />
        </Section>

        <Section
          eyebrow="05 · Labels"
          title="With label and fieldset"
          description="Pair toggle with label or fieldset for form use"
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
                                  className="toggle toggle-primary cursor-pointer"
                                  defaultChecked
                                />
                                <span className="label-text">Auto dry brush</span>
                              </label>
                              <label className="label cursor-pointer justify-start gap-3">
                                <input
                                  type="checkbox"
                                  className="toggle toggle-accent cursor-pointer"
                                />
                                <span className="label-text">Snap to grid</span>
                              </label>
                              <label className="label cursor-pointer justify-start gap-3">
                                <input
                                  type="checkbox"
                                  className="toggle toggle-secondary cursor-pointer"
                                  defaultChecked
                                />
                                <span className="label-text">Show bleed margin</span>
                              </label>
                              <p className="label">Optional studio chrome</p>
                            </fieldset>
                
                            <div className="space-y-3 rounded-box border border-ink-border bg-base-100/80 p-4">
                              <p className="label-ink">Inline label</p>
                              <div className="flex flex-wrap items-center gap-3">
                                <input
                                  id="toggle-notify"
                                  type="checkbox"
                                  className="toggle toggle-sm toggle-info cursor-pointer"
                                  defaultChecked
                                />
                                <label htmlFor="toggle-notify" className="cursor-pointer text-sm">
                                  Notify when washes finish drying
                                </label>
                              </div>
                              <div className="flex flex-wrap items-center gap-3">
                                <input
                                  id="toggle-autosave"
                                  type="checkbox"
                                  className="toggle toggle-sm toggle-success cursor-pointer"
                                />
                                <label htmlFor="toggle-autosave" className="cursor-pointer text-sm">
                                  Autosave plate drafts
                                </label>
                              </div>
                              <ClassLabel value="toggle + label" />
                            </div>
                          </div>
              </>
            }
            html={labelsHtml}
            jsx={toJsxMarkup(labelsHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Brush and layer switches"
          description="Wet edges, pressure, and layer visibility in the spirit of Brushes"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <ControlledStudioToggles />
              </>
            }
            html={studioHtml}
            jsx={toJsxMarkup(studioHtml)}
          />
        </Section>

        <Section
          eyebrow="07 · Interactive"
          title="Controlled state"
          description="React state drives the switch; flip from the control or a button"
        >
          <ShowcaseTabs
            preview={
              <>
                <InteractiveToggle />
              </>
            }
            html={interactiveHtml}
            jsx={toJsxMarkup(interactiveHtml)}
          />
        </Section>

        <Section
          eyebrow="08 · Icons"
          title="Icons inside"
          description="Label-wrapped toggle with check and clear marks"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-center gap-6">
                            <label className="toggle text-base-content cursor-pointer">
                              <input type="checkbox" defaultChecked aria-label="Icon toggle" />
                              <Check className="size-3" strokeWidth={3} aria-hidden />
                              <X className="size-3" strokeWidth={3} aria-hidden />
                            </label>
                            <ClassLabel value="label.toggle + icons" />
                          </div>
              </>
            }
            html={iconsHtml}
            jsx={toJsxMarkup(iconsHtml)}
          />
        </Section>

        <Section
          eyebrow="09 · Responsive"
          title="Stack and row"
          description="Narrow screens stack; wider layouts sit in a row"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                              <p className="text-sm font-medium">Desktop preview mode</p>
                              <p className="text-xs text-ink-muted">
                                Use a larger switch on touch, smaller beside labels on desk.
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                              <input
                                type="checkbox"
                                className="toggle toggle-primary toggle-lg cursor-pointer md:toggle-md"
                                defaultChecked
                                aria-label="Desktop preview"
                              />
                              <ClassLabel value="toggle-lg md:toggle-md" />
                            </div>
                          </div>
              </>
            }
            html={responsiveHtml}
            jsx={toJsxMarkup(responsiveHtml)}
          />
        </Section>
      </div>
    </>
  )
}
