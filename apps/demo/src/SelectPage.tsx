import { useState, type ReactNode } from 'react'
import {
  Select,
  type SelectOption,
  type SelectOptionGroup,
} from '#plain'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
import { selectSvelteFiles } from './snippets/svelte/select'

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

function selectBlock(opts: {
  triggerClass?: string
  label?: string
  placeholder?: string
  selected?: string
  options: { label: string; active?: boolean }[]
  disabled?: boolean
  ariaLabel?: string
}): string {
  const ghost = Boolean(opts.triggerClass?.includes('select-ghost'))
  const triggerBase = ghost ? 'select select-ghost' : 'select select-bordered'
  const extra = opts.triggerClass
    ? opts.triggerClass
        .split(/\s+/)
        .filter((c) => c && c !== 'select-ghost')
        .join(' ')
    : ''
  const trigger = `${triggerBase}${extra ? ` ${extra}` : ''} w-full cursor-pointer justify-between`
  const textClass = opts.selected
    ? 'min-w-0 flex-1 truncate'
    : 'min-w-0 flex-1 truncate text-base-content/50'
  const text = opts.selected ?? opts.placeholder ?? 'Pick a pigment…'
  const disabledAttr = opts.disabled ? ' disabled' : ''
  const aria = opts.ariaLabel
    ? ` aria-label="${opts.ariaLabel}"`
    : ''
  const optionsMarkup = opts.options
    .map(
      (o) =>
        `      <li role="option"><button type="button" class="cursor-pointer${o.active ? ' active' : ''}">${o.label}</button></li>`,
    )
    .join('\n')
  const field = `<div class="dropdown w-full">
  <button type="button" class="${trigger}" role="combobox" aria-expanded="false" aria-haspopup="listbox"${aria}${disabledAttr}>
    <span class="${textClass}">${text}</span>
  </button>
  <div class="dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <ul class="menu w-full rounded-box p-0" role="listbox">
${optionsMarkup}
    </ul>
  </div>
</div>`
  if (!opts.label) return field
  return `<label class="form-control w-full">
  <span class="label"><span class="label-text">${opts.label}</span></span>
  ${field}
</label>`
}

const pigmentList = [
  { label: 'Ultramarine' },
  { label: 'Yellow ochre' },
  { label: 'Alizarin crimson' },
  { label: 'Viridian', active: true },
]

const baseHtml = selectBlock({
  placeholder: 'Pick a pigment…',
  options: pigmentList,
  ariaLabel: 'Base select',
})

const ghostHtml = selectBlock({
  triggerClass: 'select-ghost',
  selected: 'Yellow ochre',
  options: [
    { label: 'Ultramarine' },
    { label: 'Yellow ochre', active: true },
    { label: 'Alizarin crimson' },
  ],
  ariaLabel: 'Ghost select',
})

const colorsHtml = `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
${colors
  .map((c) =>
    selectBlock({
      triggerClass: c.className || undefined,
      selected: c.name,
      options: [
        { label: c.name, active: true },
        { label: 'Yellow ochre' },
        { label: 'Alizarin crimson' },
      ],
      ariaLabel: c.name,
    }),
  )
  .join('\n')}
</div>`

const sizesHtml = `<div class="flex max-w-lg flex-col gap-4">
${sizes
  .map(
    (s) => `<div class="flex flex-col gap-1">
  <div class="flex items-center gap-3">
    <span class="label-ink w-8 shrink-0">${s.name}</span>
    ${selectBlock({
      triggerClass: `select-primary ${s.className}`,
      selected: `${s.name} select`,
      options: [
        { label: `${s.name} select`, active: true },
        { label: 'Yellow ochre' },
        { label: 'Alizarin crimson' },
      ],
      ariaLabel: `${s.name} select`,
    })}
  </div>
</div>`,
  )
  .join('\n')}
</div>`

const disabledHtml = `<div class="grid max-w-lg gap-4">
${selectBlock({
  selected: 'Yellow ochre',
  options: [
    { label: 'Yellow ochre', active: true },
    { label: 'Ultramarine' },
  ],
  disabled: true,
  ariaLabel: 'Disabled select',
})}
${selectBlock({
  triggerClass: 'select-primary',
  placeholder: 'Unavailable…',
  options: [{ label: 'Viridian' }],
  disabled: true,
  ariaLabel: 'Disabled primary select',
})}
</div>`

const groupsHtml = `<div class="dropdown w-full max-w-md">
  <button type="button" class="select select-bordered select-secondary w-full cursor-pointer justify-between" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-label="Grouped pigments">
    <span class="min-w-0 flex-1 truncate text-base-content/50">Choose from a family…</span>
  </button>
  <div class="dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
    <ul class="menu w-full rounded-box p-0" role="listbox">
      <li class="menu-title">Blues</li>
      <li role="option"><button type="button" class="cursor-pointer">Ultramarine</button></li>
      <li role="option"><button type="button" class="cursor-pointer">Cerulean</button></li>
      <li role="option"><button type="button" class="cursor-pointer">Cobalt</button></li>
      <li class="menu-title">Earths</li>
      <li role="option"><button type="button" class="cursor-pointer">Yellow ochre</button></li>
      <li role="option"><button type="button" class="cursor-pointer">Burnt sienna</button></li>
      <li role="option"><button type="button" class="cursor-pointer">Raw umber</button></li>
      <li class="menu-title">Reds</li>
      <li role="option"><button type="button" class="cursor-pointer">Alizarin crimson</button></li>
      <li role="option"><button type="button" class="cursor-pointer">Cadmium red</button></li>
    </ul>
  </div>
</div>`

const fieldsetHtml = `<fieldset class="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
  <legend class="fieldset-legend">Plate filters</legend>
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Series <span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span></span>
    <div class="dropdown w-full">
      <button type="button" class="select select-bordered select-primary w-full cursor-pointer justify-between" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-required="true">
        <span class="min-w-0 flex-1 truncate text-base-content/50">Select a series…</span>
      </button>
      <div class="dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
        <ul class="menu w-full rounded-box p-0" role="listbox">
          <li role="option"><button type="button" class="cursor-pointer">Atlantic Studies</button></li>
          <li role="option"><button type="button" class="cursor-pointer">Coastal Fog</button></li>
          <li role="option"><button type="button" class="cursor-pointer">Meadow Light</button></li>
        </ul>
      </div>
    </div>
  </label>
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Status</span></span>
    <div class="dropdown w-full">
      <button type="button" class="select select-bordered w-full cursor-pointer justify-between" role="combobox" aria-expanded="false" aria-haspopup="listbox">
        <span class="min-w-0 flex-1 truncate">Draft</span>
      </button>
      <div class="dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
        <ul class="menu w-full rounded-box p-0" role="listbox">
          <li role="option"><button type="button" class="cursor-pointer active">Draft</button></li>
          <li role="option"><button type="button" class="cursor-pointer">Drying</button></li>
          <li role="option"><button type="button" class="cursor-pointer">Varnished</button></li>
          <li role="option"><button type="button" class="cursor-pointer">Archived</button></li>
        </ul>
      </div>
    </div>
  </label>
  <p class="label mt-2">Asterisk marks required fields</p>
</fieldset>`

const formHtml = `<form class="grid max-w-xl gap-4">
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Medium <span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span></span>
    <div class="dropdown w-full">
      <button type="button" class="select select-bordered select-accent w-full cursor-pointer justify-between" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-required="true">
        <span class="min-w-0 flex-1 truncate">Watercolor</span>
      </button>
      <div class="dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
        <ul class="menu w-full rounded-box p-0" role="listbox">
          <li role="option"><button type="button" class="cursor-pointer active">Watercolor</button></li>
          <li role="option"><button type="button" class="cursor-pointer">Gouache</button></li>
          <li role="option"><button type="button" class="cursor-pointer">Ink wash</button></li>
        </ul>
      </div>
    </div>
  </label>
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Paper weight</span></span>
    <div class="dropdown w-full">
      <button type="button" class="select select-bordered select-info w-full cursor-pointer justify-between" role="combobox" aria-expanded="false" aria-haspopup="listbox">
        <span class="min-w-0 flex-1 truncate">300 gsm</span>
      </button>
      <div class="dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
        <ul class="menu w-full rounded-box p-0" role="listbox">
          <li role="option"><button type="button" class="cursor-pointer">190 gsm</button></li>
          <li role="option"><button type="button" class="cursor-pointer active">300 gsm</button></li>
          <li role="option"><button type="button" class="cursor-pointer">640 gsm</button></li>
        </ul>
      </div>
    </div>
  </label>
  <label class="form-control w-full">
    <span class="label"><span class="label-text">Finish</span></span>
    <div class="dropdown w-full">
      <button type="button" class="select select-ghost w-full cursor-pointer justify-between" role="combobox" aria-expanded="false" aria-haspopup="listbox">
        <span class="min-w-0 flex-1 truncate text-base-content/50">Optional finish…</span>
      </button>
      <div class="dropdown-content z-50 mt-1 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
        <ul class="menu w-full rounded-box p-0" role="listbox">
          <li role="option"><button type="button" class="cursor-pointer">Matte</button></li>
          <li role="option"><button type="button" class="cursor-pointer">Satin</button></li>
          <li role="option"><button type="button" class="cursor-pointer">Gloss</button></li>
        </ul>
      </div>
    </div>
  </label>
  <div class="flex flex-wrap gap-2 pt-1">
    <button type="submit" class="btn btn-primary cursor-pointer">Save plate</button>
    <button type="reset" class="btn btn-ghost cursor-pointer">Reset</button>
  </div>
</form>`

const baseJsx = daisyToJsx(baseHtml)
const ghostJsx = daisyToJsx(ghostHtml)
const colorsJsx = daisyToJsx(colorsHtml)
const sizesJsx = daisyToJsx(sizesHtml)
const disabledJsx = daisyToJsx(disabledHtml)
const groupsJsx = daisyToJsx(groupsHtml)
const fieldsetJsx = daisyToJsx(fieldsetHtml)
const formJsx = daisyToJsx(formHtml)

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
            html={baseHtml}
            jsx={baseJsx}
            svelteFiles={selectSvelteFiles}
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
            html={ghostHtml}
            jsx={ghostJsx}
            svelteFiles={selectSvelteFiles}
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
            html={colorsHtml}
            jsx={colorsJsx}
            svelteFiles={selectSvelteFiles}
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
            html={sizesHtml}
            jsx={sizesJsx}
            svelteFiles={selectSvelteFiles}
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
            html={disabledHtml}
            jsx={disabledJsx}
            svelteFiles={selectSvelteFiles}
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
            html={groupsHtml}
            jsx={groupsJsx}
            svelteFiles={selectSvelteFiles}
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
            html={fieldsetHtml}
            jsx={fieldsetJsx}
            svelteFiles={selectSvelteFiles}
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
            html={formHtml}
            jsx={formJsx}
            svelteFiles={selectSvelteFiles}
          />
        </Section>
      </div>
    </>
  )
}
