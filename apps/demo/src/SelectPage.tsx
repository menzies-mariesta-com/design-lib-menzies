import { useState, type ReactNode } from 'react'
import {
  Select,
  type SelectOption,
  type SelectOptionGroup,
} from '@menzies-mariesta-com/menzies-design-wash-ui/react'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'select-neutral' },
  { name: 'Primary', className: 'select-primary' },
  { name: 'Secondary', className: 'select-secondary' },
  { name: 'Accent', className: 'select-accent' },
  { name: 'Info', className: 'select-info' },
  { name: 'Success', className: 'select-success' },
  { name: 'Warning', className: 'select-warning' },
  { name: 'Error', className: 'select-error' },
] as const

const sizes = [
  { name: 'XS', className: 'select-xs' },
  { name: 'SM', className: 'select-sm' },
  { name: 'MD', className: 'select-md' },
  { name: 'LG', className: 'select-lg' },
  { name: 'XL', className: 'select-xl' },
] as const

const pigmentOptions: SelectOption[] = [
  { value: 'ultramarine', label: 'Ultramarine' },
  { value: 'ochre', label: 'Yellow ochre' },
  { value: 'alizarin', label: 'Alizarin crimson' },
  { value: 'viridian', label: 'Viridian' },
]

const pigmentGroups: (SelectOption | SelectOptionGroup)[] = [
  {
    label: 'Blues',
    options: [
      { value: 'ultramarine', label: 'Ultramarine' },
      { value: 'cerulean', label: 'Cerulean' },
      { value: 'cobalt', label: 'Cobalt' },
    ],
  },
  {
    label: 'Earths',
    options: [
      { value: 'ochre', label: 'Yellow ochre' },
      { value: 'sienna', label: 'Burnt sienna' },
      { value: 'umber', label: 'Raw umber' },
    ],
  },
  {
    label: 'Reds',
    options: [
      { value: 'alizarin', label: 'Alizarin crimson' },
      { value: 'cadmium-red', label: 'Cadmium red' },
    ],
  },
]

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
      {value || 'Select'}
    </code>
  )
}

export default function SelectPage() {
  const [base, setBase] = useState('')
  const [ghost, setGhost] = useState('ochre')
  const [grouped, setGrouped] = useState('')
  const [series, setSeries] = useState('')
  const [status, setStatus] = useState('draft')
  const [medium, setMedium] = useState('watercolor')
  const [paper, setPaper] = useState('300')
  const [finish, setFinish] = useState('')
  const [colorValues, setColorValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(colors.map((c) => [c.name, 'ultramarine'])),
  )
  const [sizeValues, setSizeValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(sizes.map((s) => [s.name, 'ultramarine'])),
  )

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Select
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Wash UI select: daisyUI-styled trigger with a custom listbox menu
          (viewport placement, outside click, Escape). Not the native OS picker.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base select"
          description="Custom dropdown with placeholder"
        >
          <ShowcaseTabs
            preview={
              <div className="flex max-w-md flex-col gap-2">
                <Select
                  options={pigmentOptions}
                  value={base}
                  onChange={setBase}
                  placeholder="Pick a pigment…"
                  aria-label="Base select"
                />
                <ClassLabel value="Select" />
              </div>
            }
            html={`<!-- Prefer the React Select primitive; native <select> still opens the OS picker. -->
<div class="dropdown">
  <button type="button" class="select …">Pick a pigment…</button>
  <ul class="dropdown-content menu …" role="listbox">…</ul>
</div>`}
            jsx={`import { Select } from '@menzies-mariesta-com/menzies-design-wash-ui/react'

<Select
  options={[
    { value: 'ultramarine', label: 'Ultramarine' },
    { value: 'ochre', label: 'Yellow ochre' },
    { value: 'alizarin', label: 'Alizarin crimson' },
    { value: 'viridian', label: 'Viridian' },
  ]}
  value={base}
  onChange={setBase}
  placeholder="Pick a pigment…"
  aria-label="Base select"
/>`}
          />
        </Section>

        <Section
          eyebrow="02 · Ghost"
          title="Ghost style"
          description="Borderless select for quiet UI surfaces"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="flex max-w-md flex-col gap-2">
                <Select
                  options={pigmentOptions.slice(0, 3)}
                  value={ghost}
                  onChange={setGhost}
                  className="select-ghost"
                  aria-label="Ghost select"
                />
                <ClassLabel value="Select className=select-ghost" />
              </div>
            }
            html={`<!-- Ghost trigger via select-ghost on Wash Select -->`}
            jsx={`<Select
  options={pigmentOptions}
  value={ghost}
  onChange={setGhost}
  className="select-ghost"
  aria-label="Ghost select"
/>`}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic colors"
          description="Neutral through error border accents on the trigger"
        >
          <ShowcaseTabs
            preview={
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {colors.map((c) => (
                  <div key={c.name} className="flex flex-col gap-2">
                    <Select
                      options={[
                        { value: 'ultramarine', label: c.name },
                        { value: 'ochre', label: 'Yellow ochre' },
                        { value: 'alizarin', label: 'Alizarin crimson' },
                      ]}
                      value={colorValues[c.name] ?? 'ultramarine'}
                      onChange={(next) =>
                        setColorValues((prev) => ({ ...prev, [c.name]: next }))
                      }
                      className={c.className}
                      aria-label={c.name}
                    />
                    <ClassLabel
                      value={c.className ? `Select ${c.className}` : 'Select'}
                    />
                  </div>
                ))}
              </div>
            }
            html={`<!-- Color variants: select-primary, select-error, … on className -->`}
            jsx={`{colors.map((c) => (
  <Select
    key={c.name}
    options={…}
    className={c.className}
    aria-label={c.name}
  />
))}`}
          />
        </Section>

        <Section
          eyebrow="04 · Sizes"
          title="Size scale"
          description="From compact menus to XL"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="flex max-w-lg flex-col gap-4">
                {sizes.map((s) => (
                  <div key={s.name} className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="label-ink w-8 shrink-0">{s.name}</span>
                      <Select
                        options={[
                          { value: 'ultramarine', label: `${s.name} select` },
                          { value: 'ochre', label: 'Yellow ochre' },
                          { value: 'alizarin', label: 'Alizarin crimson' },
                        ]}
                        value={sizeValues[s.name] ?? 'ultramarine'}
                        onChange={(next) =>
                          setSizeValues((prev) => ({ ...prev, [s.name]: next }))
                        }
                        className={`select-primary ${s.className}`}
                        aria-label={`${s.name} select`}
                      />
                    </div>
                    <ClassLabel value={`Select select-primary ${s.className}`} />
                  </div>
                ))}
              </div>
            }
            html={`<!-- Sizes: select-xs … select-xl on className -->`}
            jsx={`{/* menuWidth defaults to "trigger" (absolute overlay = trigger width) */}
<Select
  className={\`select-primary \${s.className}\`}
  options={…}
/>`}
          />
        </Section>

        <Section
          eyebrow="05 · Disabled"
          title="Disabled state"
          description="Locked selects for read-only plate metadata"
        >
          <ShowcaseTabs
            preview={
              <div className="grid max-w-lg gap-4">
                <div className="flex flex-col gap-2">
                  <Select
                    options={[
                      { value: 'ochre', label: 'Yellow ochre' },
                      { value: 'ultramarine', label: 'Ultramarine' },
                    ]}
                    value="ochre"
                    disabled
                    aria-label="Disabled select"
                  />
                  <ClassLabel value="disabled" />
                </div>
                <div className="flex flex-col gap-2">
                  <Select
                    options={[{ value: 'viridian', label: 'Viridian' }]}
                    value=""
                    placeholder="Unavailable…"
                    className="select-primary"
                    disabled
                    aria-label="Disabled primary select"
                  />
                  <ClassLabel value="Select select-primary disabled" />
                </div>
              </div>
            }
            html={`<!-- disabled prop on Wash Select -->`}
            jsx={`<Select options={…} value="ochre" disabled />
<Select
  options={…}
  value=""
  placeholder="Unavailable…"
  className="select-primary"
  disabled
/>`}
          />
        </Section>

        <Section
          eyebrow="06 · Groups"
          title="Option groups"
          description="Grouped listbox sections for pigment families"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="flex max-w-md flex-col gap-2">
                <Select
                  options={pigmentGroups}
                  value={grouped}
                  onChange={setGrouped}
                  placeholder="Choose from a family…"
                  className="select-secondary"
                  aria-label="Grouped pigments"
                />
                <ClassLabel value="Select + option groups" />
              </div>
            }
            html={`<!-- Pass SelectOptionGroup entries in options -->`}
            jsx={`<Select
  options={[
    {
      label: 'Blues',
      options: [
        { value: 'ultramarine', label: 'Ultramarine' },
        { value: 'cerulean', label: 'Cerulean' },
      ],
    },
    {
      label: 'Earths',
      options: [
        { value: 'ochre', label: 'Yellow ochre' },
        { value: 'sienna', label: 'Burnt sienna' },
      ],
    },
  ]}
  placeholder="Choose from a family…"
  className="select-secondary"
/>`}
          />
        </Section>

        <Section
          eyebrow="07 · Fieldset"
          title="Labeled fields"
          description="Fieldset with required-style labels on paper"
        >
          <ShowcaseTabs
            preview={
              <fieldset className="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
                <legend className="fieldset-legend">Plate filters</legend>
                <Select
                  id="select-series"
                  label={
                    <>
                      Series
                      <span
                        className="text-error align-top text-sm leading-none"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </>
                  }
                  options={[
                    { value: 'atlantic', label: 'Atlantic Studies' },
                    { value: 'fog', label: 'Coastal Fog' },
                    { value: 'meadow', label: 'Meadow Light' },
                  ]}
                  value={series}
                  onChange={setSeries}
                  placeholder="Select a series…"
                  className="select-primary"
                  required
                />
                <Select
                  id="select-status"
                  label="Status"
                  options={[
                    { value: 'draft', label: 'Draft' },
                    { value: 'drying', label: 'Drying' },
                    { value: 'varnished', label: 'Varnished' },
                    { value: 'archived', label: 'Archived' },
                  ]}
                  value={status}
                  onChange={setStatus}
                />
                <p className="label mt-2">Asterisk marks required fields</p>
              </fieldset>
            }
            html={`<!-- Select label + required -->`}
            jsx={`<Select
  label="Series"
  required
  className="select-primary"
  placeholder="Select a series…"
  options={…}
/>
<Select label="Status" options={…} />`}
          />
        </Section>

        <Section
          eyebrow="08 · Form"
          title="Studio intake form"
          description="Multiple selects in a short wash intake layout"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <form
                className="grid max-w-xl gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col gap-2">
                  <Select
                    id="form-medium"
                    label={
                      <>
                        Medium
                        <span
                          className="text-error align-top text-sm leading-none"
                          aria-hidden="true"
                        >
                          *
                        </span>
                      </>
                    }
                    options={[
                      { value: 'watercolor', label: 'Watercolor' },
                      { value: 'gouache', label: 'Gouache' },
                      { value: 'ink', label: 'Ink wash' },
                    ]}
                    value={medium}
                    onChange={setMedium}
                    className="select-accent"
                    required
                    name="medium"
                  />
                  <ClassLabel value="Select select-accent" />
                </div>

                <div className="flex flex-col gap-2">
                  <Select
                    id="form-paper"
                    label="Paper weight"
                    options={[
                      { value: '190', label: '190 gsm' },
                      { value: '300', label: '300 gsm' },
                      { value: '640', label: '640 gsm' },
                    ]}
                    value={paper}
                    onChange={setPaper}
                    className="select-info"
                    name="paper"
                  />
                  <ClassLabel value="Select select-info" />
                </div>

                <div className="flex flex-col gap-2">
                  <Select
                    id="form-finish"
                    label="Finish"
                    options={[
                      { value: 'matte', label: 'Matte' },
                      { value: 'satin', label: 'Satin' },
                      { value: 'gloss', label: 'Gloss' },
                    ]}
                    value={finish}
                    onChange={setFinish}
                    placeholder="Optional finish…"
                    className="select-ghost"
                    name="finish"
                  />
                  <ClassLabel value="Select select-ghost" />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button type="submit" className="btn btn-primary cursor-pointer">
                    Save plate
                  </button>
                  <button type="reset" className="btn btn-ghost cursor-pointer">
                    Reset
                  </button>
                </div>
              </form>
            }
            html={`<!-- Form: Wash Select with name + required -->`}
            jsx={`<form onSubmit={(e) => e.preventDefault()}>
  <Select
    label="Medium"
    required
    name="medium"
    className="select-accent"
    options={…}
  />
  <Select label="Paper weight" name="paper" className="select-info" options={…} />
  <Select
    label="Finish"
    name="finish"
    placeholder="Optional finish…"
    className="select-ghost"
    options={…}
  />
</form>`}
          />
        </Section>
      </div>
    </>
  )
}
