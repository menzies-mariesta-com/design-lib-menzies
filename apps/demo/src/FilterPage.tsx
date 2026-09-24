import { useState, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

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
  return <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
}

type Pigment = {
  id: string
  name: string
  wash: 'glaze' | 'flat' | 'granulating'
  hue: 'cool' | 'warm' | 'earth'
}

const pigments: Pigment[] = [
  { id: '1', name: 'Ultramarine', wash: 'glaze', hue: 'cool' },
  { id: '2', name: 'Cobalt blue', wash: 'flat', hue: 'cool' },
  { id: '3', name: 'Cerulean', wash: 'granulating', hue: 'cool' },
  { id: '4', name: 'Yellow ochre', wash: 'flat', hue: 'earth' },
  { id: '5', name: 'Burnt sienna', wash: 'glaze', hue: 'earth' },
  { id: '6', name: 'Raw umber', wash: 'granulating', hue: 'earth' },
  { id: '7', name: 'Cadmium red', wash: 'flat', hue: 'warm' },
  { id: '8', name: 'Quinacridone rose', wash: 'glaze', hue: 'warm' },
  { id: '9', name: 'Vermilion', wash: 'granulating', hue: 'warm' },
]

const sizes = [
  { name: 'XS', className: 'btn-xs' },
  { name: 'SM', className: 'btn-sm' },
  { name: 'MD', className: 'btn-md' },
  { name: 'LG', className: 'btn-lg' },
  { name: 'XL', className: 'btn-xl' },
] as const

const colors = [
  { name: 'Neutral', className: 'btn-neutral' },
  { name: 'Primary', className: 'btn-primary' },
  { name: 'Secondary', className: 'btn-secondary' },
  { name: 'Accent', className: 'btn-accent' },
  { name: 'Info', className: 'btn-info' },
  { name: 'Success', className: 'btn-success' },
  { name: 'Warning', className: 'btn-warning' },
  { name: 'Error', className: 'btn-error' },
] as const

const basicHtml = `<form class="filter flex flex-wrap gap-2">
  <input class="btn btn-square cursor-pointer" type="reset" value="×" aria-label="Clear filter" />
  <input class="btn cursor-pointer" type="radio" name="series" aria-label="Coastal" />
  <input class="btn cursor-pointer" type="radio" name="series" aria-label="Alpine" />
  <input class="btn cursor-pointer" type="radio" name="series" aria-label="Desert" />
  <input class="btn cursor-pointer" type="radio" name="series" aria-label="Urban" />
</form>`

const withoutFormHtml = `<div class="filter flex flex-wrap gap-2">
  <input class="btn filter-reset cursor-pointer" type="radio" name="binders" aria-label="×" />
  <input class="btn cursor-pointer" type="radio" name="binders" aria-label="Gum arabic" />
  <input class="btn cursor-pointer" type="radio" name="binders" aria-label="Honey" />
  <input class="btn cursor-pointer" type="radio" name="binders" aria-label="Glycerin" />
</div>`

function sizeFilterHtml(size: (typeof sizes)[number]): string {
  return `<form class="filter flex flex-wrap gap-2">
  <input class="btn btn-square cursor-pointer ${size.className}" type="reset" value="×" aria-label="Clear ${size.name} filter" />
  <input class="btn cursor-pointer ${size.className}" type="radio" name="size-${size.name}" aria-label="Wash" />
  <input class="btn cursor-pointer ${size.className}" type="radio" name="size-${size.name}" aria-label="Glaze" />
  <input class="btn cursor-pointer ${size.className}" type="radio" name="size-${size.name}" aria-label="Lift" />
</form>`
}

function colorFilterHtml(color: (typeof colors)[number]): string {
  return `<form class="filter flex flex-wrap gap-2">
  <input class="btn btn-square btn-soft cursor-pointer ${color.className}" type="reset" value="×" aria-label="Clear ${color.name} filter" />
  <input class="btn btn-soft cursor-pointer ${color.className}" type="radio" name="color-${color.name}" aria-label="A" />
  <input class="btn btn-soft cursor-pointer ${color.className}" type="radio" name="color-${color.name}" aria-label="B" />
  <input class="btn btn-soft cursor-pointer ${color.className}" type="radio" name="color-${color.name}" aria-label="C" />
</form>`
}

const studioHtml = `<div class="space-y-4">
  <form class="filter flex flex-wrap gap-2">
    <input class="btn btn-square cursor-pointer" type="reset" value="×" aria-label="Clear wash filter" />
    <input class="btn cursor-pointer" type="radio" name="studio-wash" aria-label="Glaze" />
    <input class="btn cursor-pointer" type="radio" name="studio-wash" aria-label="Flat" />
    <input class="btn cursor-pointer" type="radio" name="studio-wash" aria-label="Granulating" />
  </form>
  <ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
    <li class="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2">
      <p class="text-sm font-medium">Ultramarine</p>
      <p class="label-ink mt-0.5 capitalize">glaze · cool</p>
    </li>
    <li class="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2">
      <p class="text-sm font-medium">Cobalt blue</p>
      <p class="label-ink mt-0.5 capitalize">flat · cool</p>
    </li>
    <li class="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2">
      <p class="text-sm font-medium">Cerulean</p>
      <p class="label-ink mt-0.5 capitalize">granulating · cool</p>
    </li>
    <li class="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2">
      <p class="text-sm font-medium">Yellow ochre</p>
      <p class="label-ink mt-0.5 capitalize">flat · earth</p>
    </li>
    <li class="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2">
      <p class="text-sm font-medium">Burnt sienna</p>
      <p class="label-ink mt-0.5 capitalize">glaze · earth</p>
    </li>
    <li class="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2">
      <p class="text-sm font-medium">Raw umber</p>
      <p class="label-ink mt-0.5 capitalize">granulating · earth</p>
    </li>
    <li class="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2">
      <p class="text-sm font-medium">Cadmium red</p>
      <p class="label-ink mt-0.5 capitalize">flat · warm</p>
    </li>
    <li class="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2">
      <p class="text-sm font-medium">Quinacridone rose</p>
      <p class="label-ink mt-0.5 capitalize">glaze · warm</p>
    </li>
    <li class="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2">
      <p class="text-sm font-medium">Vermilion</p>
      <p class="label-ink mt-0.5 capitalize">granulating · warm</p>
    </li>
  </ul>
  <p class="text-sm text-ink-muted">Showing 9 of 9 pigments · all washes</p>
</div>`

const joinRadiosHtml = `<div class="join join-vertical sm:join-horizontal flex-wrap">
  <input class="btn join-item cursor-pointer" type="radio" name="join-papers" aria-label="Cold press" checked />
  <input class="btn join-item cursor-pointer" type="radio" name="join-papers" aria-label="Hot press" />
  <input class="btn join-item cursor-pointer" type="radio" name="join-papers" aria-label="Rough" />
</div>`

const joinFilterHtml = `<form class="filter join join-horizontal flex-wrap">
  <input class="btn btn-square join-item cursor-pointer" type="reset" value="×" aria-label="Clear join filter" />
  <input class="btn join-item cursor-pointer" type="radio" name="join-filter" aria-label="Series A" />
  <input class="btn join-item cursor-pointer" type="radio" name="join-filter" aria-label="Series B" />
  <input class="btn join-item cursor-pointer" type="radio" name="join-filter" aria-label="Series C" />
</form>`

const checkboxHtml = `<form class="filter flex flex-wrap gap-2">
  <input class="btn cursor-pointer" type="checkbox" name="multi-tools" aria-label="Round" />
  <input class="btn cursor-pointer" type="checkbox" name="multi-tools" aria-label="Flat" />
  <input class="btn cursor-pointer" type="checkbox" name="multi-tools" aria-label="Rigger" />
  <input class="btn cursor-pointer" type="checkbox" name="multi-tools" aria-label="Mop" />
  <input class="btn btn-square cursor-pointer" type="reset" value="×" aria-label="Clear multi filter" />
</form>`

const responsiveLabels = [
  'Indigo',
  'Viridian',
  'Sap green',
  'Naples yellow',
  'Venetian red',
  'Payne gray',
  'Titanium white',
  'Ivory black',
] as const

const responsiveHtml = `<form class="filter flex max-w-full flex-wrap gap-2">
  <input class="btn btn-sm btn-square cursor-pointer" type="reset" value="×" aria-label="Clear responsive filter" />
${responsiveLabels
  .map(
    (label) =>
      `  <input class="btn btn-sm cursor-pointer" type="radio" name="responsive-pigments" aria-label="${label}" />`,
  )
  .join('\n')}
</form>`

function StudioPigmentsFilter() {
  const [wash, setWash] = useState<'' | Pigment['wash']>('')

  const visible = wash === '' ? pigments : pigments.filter((p) => p.wash === wash)

  return (
    <div className="space-y-4">
      <form className="filter flex flex-wrap gap-2" onReset={() => setWash('')}>
        <input
          className="btn btn-square cursor-pointer"
          type="reset"
          value="×"
          aria-label="Clear wash filter"
        />
        {(
          [
            { value: 'glaze', label: 'Glaze' },
            { value: 'flat', label: 'Flat' },
            { value: 'granulating', label: 'Granulating' },
          ] as const
        ).map((opt) => (
          <input
            key={opt.value}
            className="btn cursor-pointer"
            type="radio"
            name="studio-wash"
            aria-label={opt.label}
            checked={wash === opt.value}
            onChange={() => setWash(opt.value)}
          />
        ))}
      </form>

      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li
            key={p.id}
            className="rounded-box border border-ink-border/70 bg-base-100/70 px-3 py-2"
          >
            <p className="text-sm font-medium">{p.name}</p>
            <p className="label-ink mt-0.5 capitalize">
              {p.wash} · {p.hue}
            </p>
          </li>
        ))}
      </ul>

      <p className="text-sm text-ink-muted">
        Showing {visible.length} of {pigments.length} pigments
        {wash ? ` · ${wash}` : ' · all washes'}
      </p>
    </div>
  )
}

export default function FilterPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Filter
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">filter</span> groups: radio (or checkbox)
          buttons.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Form filter with reset"
          description="HTML form: radio options"
        >
          <ShowcaseTabs
            preview={
              <>
                <form className="filter flex flex-wrap gap-2">
                  <input
                    className="btn btn-square cursor-pointer"
                    type="reset"
                    value="×"
                    aria-label="Clear filter"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="radio"
                    name="series"
                    aria-label="Coastal"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="radio"
                    name="series"
                    aria-label="Alpine"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="radio"
                    name="series"
                    aria-label="Desert"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="radio"
                    name="series"
                    aria-label="Urban"
                  />
                </form>
                <p className="mt-3">
                  <ClassLabel value="filter + btn + type=reset btn-square" />
                </p>
              </>
            }
            html={basicHtml}
            jsx={daisyToJsx(basicHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · Without form"
          title="Div with filter-reset"
          description="When a form is not practical"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="filter flex flex-wrap gap-2">
                  <input
                    className="btn filter-reset cursor-pointer"
                    type="radio"
                    name="binders"
                    aria-label="×"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="radio"
                    name="binders"
                    aria-label="Gum arabic"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="radio"
                    name="binders"
                    aria-label="Honey"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="radio"
                    name="binders"
                    aria-label="Glycerin"
                  />
                </div>
                <p className="mt-3">
                  <ClassLabel value="filter + filter-reset" />
                </p>
              </>
            }
            html={withoutFormHtml}
            jsx={daisyToJsx(withoutFormHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Button size modifiers"
          description="Filter radios inherit btn sizes"
        >
          <div className="flex flex-col gap-5">
            {sizes.map((size) => {
              const html = sizeFilterHtml(size)
              return (
                <ShowcaseTabs
                  key={size.name}
                  preview={
                    <>
                      <form className="filter flex flex-wrap gap-2">
                        <input
                          className={`btn btn-square cursor-pointer ${size.className}`}
                          type="reset"
                          value="×"
                          aria-label={`Clear ${size.name} filter`}
                        />
                        <input
                          className={`btn cursor-pointer ${size.className}`}
                          type="radio"
                          name={`size-${size.name}`}
                          aria-label="Wash"
                        />
                        <input
                          className={`btn cursor-pointer ${size.className}`}
                          type="radio"
                          name={`size-${size.name}`}
                          aria-label="Glaze"
                        />
                        <input
                          className={`btn cursor-pointer ${size.className}`}
                          type="radio"
                          name={`size-${size.name}`}
                          aria-label="Lift"
                        />
                      </form>
                    </>
                  }
                  html={html}
                  jsx={daisyToJsx(html)}
                />
              )
            })}
          </div>
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic button colors"
          description="Color modifiers on each filter btn"
          panel="wash-panel-rose"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {colors.map((color) => {
              const html = colorFilterHtml(color)
              return (
                <ShowcaseTabs
                  key={color.name}
                  preview={
                    <>
                      <form className="filter flex flex-wrap gap-2">
                        <input
                          className={`btn btn-square btn-soft cursor-pointer ${color.className}`}
                          type="reset"
                          value="×"
                          aria-label={`Clear ${color.name} filter`}
                        />
                        <input
                          className={`btn btn-soft cursor-pointer ${color.className}`}
                          type="radio"
                          name={`color-${color.name}`}
                          aria-label="A"
                        />
                        <input
                          className={`btn btn-soft cursor-pointer ${color.className}`}
                          type="radio"
                          name={`color-${color.name}`}
                          aria-label="B"
                        />
                        <input
                          className={`btn btn-soft cursor-pointer ${color.className}`}
                          type="radio"
                          name={`color-${color.name}`}
                          aria-label="C"
                        />
                      </form>
                    </>
                  }
                  html={html}
                  jsx={daisyToJsx(html)}
                />
              )
            })}
          </div>
        </Section>

        <Section
          eyebrow="05 · Studio pigments"
          title="Live wash filter"
          description="Interactive filter over sample pigments"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <StudioPigmentsFilter />
                <p className="mt-3">
                  <ClassLabel value="filter + controlled radios + filtered list" />
                </p>
              </>
            }
            html={studioHtml}
            jsx={daisyToJsx(studioHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Join"
          title="Joined button group"
          description="join groups filter-like radios into a continuous control"
        >
          <div className="flex flex-col gap-5">
            <ShowcaseTabs
              preview={
                <>
                  <div className="join join-vertical sm:join-horizontal flex-wrap">
                    <input
                      className="btn join-item cursor-pointer"
                      type="radio"
                      name="join-papers"
                      aria-label="Cold press"
                      defaultChecked
                    />
                    <input
                      className="btn join-item cursor-pointer"
                      type="radio"
                      name="join-papers"
                      aria-label="Hot press"
                    />
                    <input
                      className="btn join-item cursor-pointer"
                      type="radio"
                      name="join-papers"
                      aria-label="Rough"
                    />
                  </div>
                </>
              }
              html={joinRadiosHtml}
              jsx={daisyToJsx(joinRadiosHtml).replace(/\schecked/g, ' defaultChecked')}
            />

            <ShowcaseTabs
              preview={
                <>
                  <form className="filter join join-horizontal flex-wrap">
                    <input
                      className="btn btn-square join-item cursor-pointer"
                      type="reset"
                      value="×"
                      aria-label="Clear join filter"
                    />
                    <input
                      className="btn join-item cursor-pointer"
                      type="radio"
                      name="join-filter"
                      aria-label="Series A"
                    />
                    <input
                      className="btn join-item cursor-pointer"
                      type="radio"
                      name="join-filter"
                      aria-label="Series B"
                    />
                    <input
                      className="btn join-item cursor-pointer"
                      type="radio"
                      name="join-filter"
                      aria-label="Series C"
                    />
                  </form>
                </>
              }
              html={joinFilterHtml}
              jsx={daisyToJsx(joinFilterHtml)}
            />
          </div>
        </Section>

        <Section
          eyebrow="07 · Checkboxes"
          title="Multi-select filter"
          description="Checkbox inputs keep several options visible at once"
        >
          <ShowcaseTabs
            preview={
              <>
                <form className="filter flex flex-wrap gap-2">
                  <input
                    className="btn cursor-pointer"
                    type="checkbox"
                    name="multi-tools"
                    aria-label="Round"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="checkbox"
                    name="multi-tools"
                    aria-label="Flat"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="checkbox"
                    name="multi-tools"
                    aria-label="Rigger"
                  />
                  <input
                    className="btn cursor-pointer"
                    type="checkbox"
                    name="multi-tools"
                    aria-label="Mop"
                  />
                  <input
                    className="btn btn-square cursor-pointer"
                    type="reset"
                    value="×"
                    aria-label="Clear multi filter"
                  />
                </form>
                <p className="mt-3">
                  <ClassLabel value="filter + type=checkbox + type=reset" />
                </p>
              </>
            }
            html={checkboxHtml}
            jsx={daisyToJsx(checkboxHtml)}
          />
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Wrap on mobile"
          description="flex-wrap keeps long filter rows usable on small screens without"
        >
          <ShowcaseTabs
            preview={
              <>
                <form className="filter flex max-w-full flex-wrap gap-2">
                  <input
                    className="btn btn-sm btn-square cursor-pointer"
                    type="reset"
                    value="×"
                    aria-label="Clear responsive filter"
                  />
                  {responsiveLabels.map((label) => (
                    <input
                      key={label}
                      className="btn btn-sm cursor-pointer"
                      type="radio"
                      name="responsive-pigments"
                      aria-label={label}
                    />
                  ))}
                </form>
                <p className="mt-3">
                  <ClassLabel value="filter flex flex-wrap gap-2" />
                </p>
              </>
            }
            html={responsiveHtml}
            jsx={daisyToJsx(responsiveHtml)}
          />
        </Section>
      </div>
    </>
  )
}
