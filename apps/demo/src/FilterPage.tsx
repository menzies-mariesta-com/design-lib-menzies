import { useState, type ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
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
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
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

function StudioPigmentsFilter() {
  const [wash, setWash] = useState<'' | Pigment['wash']>('')

  const visible =
    wash === '' ? pigments : pigments.filter((p) => p.wash === wash)

  return (
    <div className="space-y-4">
      <form
        className="filter flex flex-wrap gap-2"
        onReset={() => setWash('')}
      >
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
          daisyUI <span className="font-mono text-xs">filter</span> groups: radio (or checkbox) buttons.
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
            html={`<form class="filter flex flex-wrap gap-2">
            <input
              class="btn btn-square cursor-pointer"
              type="reset"
              value="×"
              aria-label="Clear filter" />
            <input
              class="btn cursor-pointer"
              type="radio"
              name="series"
              aria-label="Coastal" />
            <input
              class="btn cursor-pointer"
              type="radio"
              name="series"
              aria-label="Alpine" />
            <input
              class="btn cursor-pointer"
              type="radio"
              name="series"
              aria-label="Desert" />
            <input
              class="btn cursor-pointer"
              type="radio"
              name="series"
              aria-label="Urban" />
          </form>
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<form className="filter flex flex-wrap gap-2">
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
          </p>`}
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
            html={`<div class="filter flex flex-wrap gap-2">
            <input
              class="btn filter-reset cursor-pointer"
              type="radio"
              name="binders"
              aria-label="×" />
            <input
              class="btn cursor-pointer"
              type="radio"
              name="binders"
              aria-label="Gum arabic" />
            <input
              class="btn cursor-pointer"
              type="radio"
              name="binders"
              aria-label="Honey" />
            <input
              class="btn cursor-pointer"
              type="radio"
              name="binders"
              aria-label="Glycerin" />
          </div>
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<div className="filter flex flex-wrap gap-2">
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
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Button size modifiers"
          description="Filter radios inherit btn sizes"
        >
          <div className="flex flex-col gap-5">
            {sizes.map((size) => (
              <ShowcaseTabs
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
            html={`<form class="filter flex flex-wrap gap-2">
                  <input
                    class=
                    type="reset"
                    value="×"
                    aria-label="Label" filter\`} />
                  <input
                    class=
                    type="radio"
                    name=
                    aria-label="Wash" />
                  <input
                    class=
                    type="radio"
                    name=
                    aria-label="Glaze" />
                  <input
                    class=
                    type="radio"
                    name=
                    aria-label="Lift" />
                </form>`}
            jsx={`<form className="filter flex flex-wrap gap-2">
                  <input
                    className={\`btn btn-square cursor-pointer \${size.className}\`}
                    type="reset"
                    value="×"
                    aria-label={\`Clear \${size.name} filter\`}
                  />
                  <input
                    className={\`btn cursor-pointer \${size.className}\`}
                    type="radio"
                    name={\`size-\${size.name}\`}
                    aria-label="Wash"
                  />
                  <input
                    className={\`btn cursor-pointer \${size.className}\`}
                    type="radio"
                    name={\`size-\${size.name}\`}
                    aria-label="Glaze"
                  />
                  <input
                    className={\`btn cursor-pointer \${size.className}\`}
                    type="radio"
                    name={\`size-\${size.name}\`}
                    aria-label="Lift"
                  />
                </form>`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic button colors"
          description="Color modifiers on each filter btn"
          panel="wash-panel-rose"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {colors.map((color) => (
              <ShowcaseTabs
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
            html={`<form class="filter flex flex-wrap gap-2">
                  <input
                    class=
                    type="reset"
                    value="×"
                    aria-label="Label" filter\`} />
                  <input
                    class=
                    type="radio"
                    name=
                    aria-label="A" />
                  <input
                    class=
                    type="radio"
                    name=
                    aria-label="B" />
                  <input
                    class=
                    type="radio"
                    name=
                    aria-label="C" />
                </form>`}
            jsx={`<form className="filter flex flex-wrap gap-2">
                  <input
                    className={\`btn btn-square btn-soft cursor-pointer \${color.className}\`}
                    type="reset"
                    value="×"
                    aria-label={\`Clear \${color.name} filter\`}
                  />
                  <input
                    className={\`btn btn-soft cursor-pointer \${color.className}\`}
                    type="radio"
                    name={\`color-\${color.name}\`}
                    aria-label="A"
                  />
                  <input
                    className={\`btn btn-soft cursor-pointer \${color.className}\`}
                    type="radio"
                    name={\`color-\${color.name}\`}
                    aria-label="B"
                  />
                  <input
                    className={\`btn btn-soft cursor-pointer \${color.className}\`}
                    type="radio"
                    name={\`color-\${color.name}\`}
                    aria-label="C"
                  />
                </form>`}
          />
            ))}
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
            html={`<!-- StudioPigmentsFilter -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<StudioPigmentsFilter />
          <p className="mt-3">
            <ClassLabel value="filter + controlled radios + filtered list" />
          </p>`}
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
            html={`<div class="join join-vertical sm:join-horizontal flex-wrap">
                <input
                  class="btn join-item cursor-pointer"
                  type="radio"
                  name="join-papers"
                  aria-label="Cold press"
                  checked />
                <input
                  class="btn join-item cursor-pointer"
                  type="radio"
                  name="join-papers"
                  aria-label="Hot press" />
                <input
                  class="btn join-item cursor-pointer"
                  type="radio"
                  name="join-papers"
                  aria-label="Rough" />
              </div>`}
            jsx={`<div className="join join-vertical sm:join-horizontal flex-wrap">
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
              </div>`}
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
            html={`<form class="filter join join-horizontal flex-wrap">
                <input
                  class="btn btn-square join-item cursor-pointer"
                  type="reset"
                  value="×"
                  aria-label="Clear join filter" />
                <input
                  class="btn join-item cursor-pointer"
                  type="radio"
                  name="join-filter"
                  aria-label="Series A" />
                <input
                  class="btn join-item cursor-pointer"
                  type="radio"
                  name="join-filter"
                  aria-label="Series B" />
                <input
                  class="btn join-item cursor-pointer"
                  type="radio"
                  name="join-filter"
                  aria-label="Series C" />
              </form>`}
            jsx={`<form className="filter join join-horizontal flex-wrap">
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
              </form>`}
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
            html={`<form class="filter flex flex-wrap gap-2">
            <input
              class="btn cursor-pointer"
              type="checkbox"
              name="multi-tools"
              aria-label="Round" />
            <input
              class="btn cursor-pointer"
              type="checkbox"
              name="multi-tools"
              aria-label="Flat" />
            <input
              class="btn cursor-pointer"
              type="checkbox"
              name="multi-tools"
              aria-label="Rigger" />
            <input
              class="btn cursor-pointer"
              type="checkbox"
              name="multi-tools"
              aria-label="Mop" />
            <input
              class="btn btn-square cursor-pointer"
              type="reset"
              value="×"
              aria-label="Clear multi filter" />
          </form>
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<form className="filter flex flex-wrap gap-2">
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
          </p>`}
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
                          {[
                            'Indigo',
                            'Viridian',
                            'Sap green',
                            'Naples yellow',
                            'Venetian red',
                            'Payne gray',
                            'Titanium white',
                            'Ivory black',
                          ].map((label) => (
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
            html={`<form class="filter flex max-w-full flex-wrap gap-2">
            <input
              class="btn btn-sm btn-square cursor-pointer"
              type="reset"
              value="×"
              aria-label="Clear responsive filter" />
            {[
              'Indigo',
              'Viridian',
              'Sap green',
              'Naples yellow',
              'Venetian red',
              'Payne gray',
              'Titanium white',
              'Ivory black',
            ].map((label) => (
              <input
                key=
                class="btn btn-sm cursor-pointer"
                type="radio"
                name="responsive-pigments"
                aria-label="Label" />
            ))}
          </form>
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<form className="filter flex max-w-full flex-wrap gap-2">
            <input
              className="btn btn-sm btn-square cursor-pointer"
              type="reset"
              value="×"
              aria-label="Clear responsive filter"
            />
            {[
              'Indigo',
              'Viridian',
              'Sap green',
              'Naples yellow',
              'Venetian red',
              'Payne gray',
              'Titanium white',
              'Ivory black',
            ].map((label) => (
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
          </p>`}
          />
        
        </Section>
      </div>
    </>
  )
}
