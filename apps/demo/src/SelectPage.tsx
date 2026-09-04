import type { ReactNode } from 'react'
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

const pigmentOptions = (
  <>
    <option disabled value="">
      Pick a pigment…
    </option>
    <option value="ultramarine">Ultramarine</option>
    <option value="ochre">Yellow ochre</option>
    <option value="alizarin">Alizarin crimson</option>
    <option value="viridian">Viridian</option>
  </>
)

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
      {value || 'select'}
    </code>
  )
}

export default function SelectPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Select
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">select</span> color,
          size, and composition.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base select"
          description="Simple dropdown with a placeholder option"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex max-w-md flex-col gap-2">
                            <select
                              defaultValue=""
                              className="select w-full cursor-pointer border-ink-border"
                              aria-label="Base select"
                            >
                              {pigmentOptions}
                            </select>
                            <ClassLabel value="select" />
                          </div>
              </>
            }
            html={`<div class="flex max-w-md flex-col gap-2">
            <select
              value=""
              class="select w-full cursor-pointer border-ink-border"
              aria-label="Base select"
            >
              
            </select>
            
          </div>`}
            jsx={`<div className="flex max-w-md flex-col gap-2">
            <select
              defaultValue=""
              className="select w-full cursor-pointer border-ink-border"
              aria-label="Base select"
            >
              {pigmentOptions}
            </select>
            
          </div>`}
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
              <>
                <div className="flex max-w-md flex-col gap-2">
                            <select
                              defaultValue="ochre"
                              className="select select-ghost w-full cursor-pointer"
                              aria-label="Ghost select"
                            >
                              <option value="ultramarine">Ultramarine</option>
                              <option value="ochre">Yellow ochre</option>
                              <option value="alizarin">Alizarin crimson</option>
                            </select>
                            <ClassLabel value="select select-ghost" />
                          </div>
              </>
            }
            html={`<div class="flex max-w-md flex-col gap-2">
            <select
              value="ochre"
              class="select select-ghost w-full cursor-pointer"
              aria-label="Ghost select"
            >
              <option value="ultramarine">Ultramarine</option>
              <option value="ochre">Yellow ochre</option>
              <option value="alizarin">Alizarin crimson</option>
            </select>
            
          </div>`}
            jsx={`<div className="flex max-w-md flex-col gap-2">
            <select
              defaultValue="ochre"
              className="select select-ghost w-full cursor-pointer"
              aria-label="Ghost select"
            >
              <option value="ultramarine">Ultramarine</option>
              <option value="ochre">Yellow ochre</option>
              <option value="alizarin">Alizarin crimson</option>
            </select>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic colors"
          description="Neutral through error border accents"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {colors.map((c) => (
                              <div key={c.name} className="flex flex-col gap-2">
                                <select
                                  defaultValue="ultramarine"
                                  className={`select w-full cursor-pointer ${c.className}`}
                                  aria-label={c.name}
                                >
                                  <option value="ultramarine">{c.name}</option>
                                  <option value="ochre">Yellow ochre</option>
                                  <option value="alizarin">Alizarin crimson</option>
                                </select>
                                <ClassLabel
                                  value={c.className ? `select ${c.className}` : 'select'}
                                />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <select
                  defaultValue="ultramarine"
                  className={\`select w-full cursor-pointer \${c.className}\`}
                  aria-label={c.name}
                >
                  <option value="ultramarine">{c.name}</option>
                  <option value="ochre">Yellow ochre</option>
                  <option value="alizarin">Alizarin crimson</option>
                </select>
                
              </div>
            ))}
          </div>`}
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
              <>
                <div className="flex max-w-lg flex-col gap-4">
                            {sizes.map((s) => (
                              <div key={s.name} className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                  <span className="label-ink w-8 shrink-0">{s.name}</span>
                                  <select
                                    defaultValue="ultramarine"
                                    className={`select select-primary w-full cursor-pointer ${s.className}`}
                                    aria-label={`${s.name} select`}
                                  >
                                    <option value="ultramarine">{s.name} select</option>
                                    <option value="ochre">Yellow ochre</option>
                                    <option value="alizarin">Alizarin crimson</option>
                                  </select>
                                </div>
                                <ClassLabel value={`select ${s.className}`} />
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex max-w-lg flex-col gap-4">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex max-w-lg flex-col gap-4">
            {sizes.map((s) => (
              <div key={s.name} className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="label-ink w-8 shrink-0">{s.name}</span>
                  <select
                    defaultValue="ultramarine"
                    className={\`select select-primary w-full cursor-pointer \${s.className}\`}
                    aria-label={\`\${s.name} select\`}
                  >
                    <option value="ultramarine">{s.name} select</option>
                    <option value="ochre">Yellow ochre</option>
                    <option value="alizarin">Alizarin crimson</option>
                  </select>
                </div>
                
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Disabled"
          title="Disabled state"
          description="Locked selects for read-only plate metadata"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid max-w-lg gap-4">
                            <div className="flex flex-col gap-2">
                              <select
                                className="select w-full border-ink-border cursor-not-allowed"
                                disabled
                                defaultValue="ochre"
                                aria-label="Disabled select"
                              >
                                <option value="ochre">Yellow ochre</option>
                                <option value="ultramarine">Ultramarine</option>
                              </select>
                              <ClassLabel value="disabled" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <select
                                className="select select-primary w-full border-ink-border cursor-not-allowed"
                                disabled
                                defaultValue=""
                                aria-label="Disabled primary select"
                              >
                                <option disabled value="">
                                  Unavailable…
                                </option>
                                <option value="viridian">Viridian</option>
                              </select>
                              <ClassLabel value="select select-primary disabled" />
                            </div>
                          </div>
              </>
            }
            html={`<div class="grid max-w-lg gap-4">
            <div class="flex flex-col gap-2">
              <select
                class="select w-full border-ink-border cursor-not-allowed"
                disabled
                value="ochre"
                aria-label="Disabled select"
              >
                <option value="ochre">Yellow ochre</option>
                <option value="ultramarine">Ultramarine</option>
              </select>
              
            </div>
            <div class="flex flex-col gap-2">
              <select
                class="select select-primary w-full border-ink-border cursor-not-allowed"
                disabled
                value=""
                aria-label="Disabled primary select"
              >
                <option disabled value="">
                  Unavailable…
                </option>
                <option value="viridian">Viridian</option>
              </select>
              
            </div>
          </div>`}
            jsx={`<div className="grid max-w-lg gap-4">
            <div className="flex flex-col gap-2">
              <select
                className="select w-full border-ink-border cursor-not-allowed"
                disabled
                defaultValue="ochre"
                aria-label="Disabled select"
              >
                <option value="ochre">Yellow ochre</option>
                <option value="ultramarine">Ultramarine</option>
              </select>
              
            </div>
            <div className="flex flex-col gap-2">
              <select
                className="select select-primary w-full border-ink-border cursor-not-allowed"
                disabled
                defaultValue=""
                aria-label="Disabled primary select"
              >
                <option disabled value="">
                  Unavailable…
                </option>
                <option value="viridian">Viridian</option>
              </select>
              
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Optgroup"
          title="Option groups"
          description="Native optgroup for pigment families and series"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex max-w-md flex-col gap-2">
                            <select
                              defaultValue=""
                              className="select select-secondary w-full cursor-pointer"
                              aria-label="Grouped pigments"
                            >
                              <option disabled value="">
                                Choose from a family…
                              </option>
                              <optgroup label="Blues">
                                <option value="ultramarine">Ultramarine</option>
                                <option value="cerulean">Cerulean</option>
                                <option value="cobalt">Cobalt</option>
                              </optgroup>
                              <optgroup label="Earths">
                                <option value="ochre">Yellow ochre</option>
                                <option value="sienna">Burnt sienna</option>
                                <option value="umber">Raw umber</option>
                              </optgroup>
                              <optgroup label="Reds">
                                <option value="alizarin">Alizarin crimson</option>
                                <option value="cadmium-red">Cadmium red</option>
                              </optgroup>
                            </select>
                            <ClassLabel value="select + optgroup" />
                          </div>
              </>
            }
            html={`<div class="flex max-w-md flex-col gap-2">
            <select
              value=""
              class="select select-secondary w-full cursor-pointer"
              aria-label="Grouped pigments"
            >
              <option disabled value="">
                Choose from a family…
              </option>
              <optgroup label="Blues">
                <option value="ultramarine">Ultramarine</option>
                <option value="cerulean">Cerulean</option>
                <option value="cobalt">Cobalt</option>
              </optgroup>
              <optgroup label="Earths">
                <option value="ochre">Yellow ochre</option>
                <option value="sienna">Burnt sienna</option>
                <option value="umber">Raw umber</option>
              </optgroup>
              <optgroup label="Reds">
                <option value="alizarin">Alizarin crimson</option>
                <option value="cadmium-red">Cadmium red</option>
              </optgroup>
            </select>
            
          </div>`}
            jsx={`<div className="flex max-w-md flex-col gap-2">
            <select
              defaultValue=""
              className="select select-secondary w-full cursor-pointer"
              aria-label="Grouped pigments"
            >
              <option disabled value="">
                Choose from a family…
              </option>
              <optgroup label="Blues">
                <option value="ultramarine">Ultramarine</option>
                <option value="cerulean">Cerulean</option>
                <option value="cobalt">Cobalt</option>
              </optgroup>
              <optgroup label="Earths">
                <option value="ochre">Yellow ochre</option>
                <option value="sienna">Burnt sienna</option>
                <option value="umber">Raw umber</option>
              </optgroup>
              <optgroup label="Reds">
                <option value="alizarin">Alizarin crimson</option>
                <option value="cadmium-red">Cadmium red</option>
              </optgroup>
            </select>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Fieldset"
          title="Labeled fields"
          description="Fieldset with required-style labels on paper"
        >
          <ShowcaseTabs
            preview={
              <>
                <fieldset className="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
                            <legend className="fieldset-legend">Plate filters</legend>
                            <label className="label" htmlFor="select-series">
                              <span className="label-text">
                                Series
                                <span
                                  className="text-error align-top text-sm leading-none"
                                  aria-hidden="true"
                                >
                                  *
                                </span>
                              </span>
                            </label>
                            <select
                              id="select-series"
                              defaultValue=""
                              className="select select-primary w-full cursor-pointer"
                              required
                            >
                              <option disabled value="">
                                Select a series…
                              </option>
                              <option value="atlantic">Atlantic Studies</option>
                              <option value="fog">Coastal Fog</option>
                              <option value="meadow">Meadow Light</option>
                            </select>
                            <label className="label" htmlFor="select-status">
                              <span className="label-text">Status</span>
                            </label>
                            <select
                              id="select-status"
                              defaultValue="draft"
                              className="select w-full cursor-pointer border-ink-border"
                            >
                              <option value="draft">Draft</option>
                              <option value="drying">Drying</option>
                              <option value="varnished">Varnished</option>
                              <option value="archived">Archived</option>
                            </select>
                            <p className="label">Asterisk marks required fields</p>
                          </fieldset>
              </>
            }
            html={`<fieldset class="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
            <legend class="fieldset-legend">Plate filters</legend>
            <label class="label" for="select-series">
              <span class="label-text">
                Series
                <span
                  class="text-error align-top text-sm leading-none"
                  aria-hidden="true"
                >
                  *
                </span>
              </span>
            </label>
            <select
              id="select-series"
              value=""
              class="select select-primary w-full cursor-pointer"
              required
            >
              <option disabled value="">
                Select a series…
              </option>
              <option value="atlantic">Atlantic Studies</option>
              <option value="fog">Coastal Fog</option>
              <option value="meadow">Meadow Light</option>
            </select>
            <label class="label" for="select-status">
              <span class="label-text">Status</span>
            </label>
            <select
              id="select-status"
              value="draft"
              class="select w-full cursor-pointer border-ink-border"
            >
              <option value="draft">Draft</option>
              <option value="drying">Drying</option>
              <option value="varnished">Varnished</option>
              <option value="archived">Archived</option>
            </select>
            <p class="label">Asterisk marks required fields</p>
          </fieldset>`}
            jsx={`<fieldset className="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
            <legend className="fieldset-legend">Plate filters</legend>
            <label className="label" htmlFor="select-series">
              <span className="label-text">
                Series
                <span
                  className="text-error align-top text-sm leading-none"
                  aria-hidden="true"
                >
                  *
                </span>
              </span>
            </label>
            <select
              id="select-series"
              defaultValue=""
              className="select select-primary w-full cursor-pointer"
              required
            >
              <option disabled value="">
                Select a series…
              </option>
              <option value="atlantic">Atlantic Studies</option>
              <option value="fog">Coastal Fog</option>
              <option value="meadow">Meadow Light</option>
            </select>
            <label className="label" htmlFor="select-status">
              <span className="label-text">Status</span>
            </label>
            <select
              id="select-status"
              defaultValue="draft"
              className="select w-full cursor-pointer border-ink-border"
            >
              <option value="draft">Draft</option>
              <option value="drying">Drying</option>
              <option value="varnished">Varnished</option>
              <option value="archived">Archived</option>
            </select>
            <p className="label">Asterisk marks required fields</p>
          </fieldset>`}
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
              <>
                <form
                            className="grid max-w-xl gap-4"
                            onSubmit={(e) => e.preventDefault()}
                          >
                            <div className="flex flex-col gap-2">
                              <label className="label" htmlFor="form-medium">
                                <span className="label-text">
                                  Medium
                                  <span
                                    className="text-error align-top text-sm leading-none"
                                    aria-hidden="true"
                                  >
                                    *
                                  </span>
                                </span>
                              </label>
                              <select
                                id="form-medium"
                                defaultValue="watercolor"
                                className="select select-accent w-full cursor-pointer"
                                required
                              >
                                <option value="watercolor">Watercolor</option>
                                <option value="gouache">Gouache</option>
                                <option value="ink">Ink wash</option>
                              </select>
                              <ClassLabel value="select select-accent" />
                            </div>
                
                            <div className="flex flex-col gap-2">
                              <label className="label" htmlFor="form-paper">
                                <span className="label-text">Paper weight</span>
                              </label>
                              <select
                                id="form-paper"
                                defaultValue="300"
                                className="select select-info w-full cursor-pointer"
                              >
                                <option value="190">190 gsm</option>
                                <option value="300">300 gsm</option>
                                <option value="640">640 gsm</option>
                              </select>
                              <ClassLabel value="select select-info" />
                            </div>
                
                            <div className="flex flex-col gap-2">
                              <label className="label" htmlFor="form-finish">
                                <span className="label-text">Finish</span>
                              </label>
                              <select
                                id="form-finish"
                                defaultValue=""
                                className="select select-ghost w-full cursor-pointer"
                              >
                                <option disabled value="">
                                  Optional finish…
                                </option>
                                <option value="matte">Matte</option>
                                <option value="satin">Satin</option>
                                <option value="gloss">Gloss</option>
                              </select>
                              <ClassLabel value="select select-ghost" />
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
              </>
            }
            html={`<form
            class="grid max-w-xl gap-4"
            onSubmit=
          >
            <div class="flex flex-col gap-2">
              <label class="label" for="form-medium">
                <span class="label-text">
                  Medium
                  <span
                    class="text-error align-top text-sm leading-none"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </span>
              </label>
              <select
                id="form-medium"
                value="watercolor"
                class="select select-accent w-full cursor-pointer"
                required
              >
                <option value="watercolor">Watercolor</option>
                <option value="gouache">Gouache</option>
                <option value="ink">Ink wash</option>
              </select>
              
            </div>

            <div class="flex flex-col gap-2">
              <label class="label" for="form-paper">
                <span class="label-text">Paper weight</span>
              </label>
              <select
                id="form-paper"
                value="300"
                class="select select-info w-full cursor-pointer"
              >
                <option value="190">190 gsm</option>
                <option value="300">300 gsm</option>
                <option value="640">640 gsm</option>
              </select>
              
            </div>

            <div class="flex flex-col gap-2">
              <label class="label" for="form-finish">
                <span class="label-text">Finish</span>
              </label>
              <select
                id="form-finish"
                value=""
                class="select select-ghost w-full cursor-pointer"
              >
                <option disabled value="">
                  Optional finish…
                </option>
                <option value="matte">Matte</option>
                <option value="satin">Satin</option>
                <option value="gloss">Gloss</option>
              </select>
              
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <button type="submit" class="btn btn-primary cursor-pointer">
                Save plate
              </button>
              <button type="reset" class="btn btn-ghost cursor-pointer">
                Reset
              </button>
            </div>
          </form>`}
            jsx={`<form
            className="grid max-w-xl gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="form-medium">
                <span className="label-text">
                  Medium
                  <span
                    className="text-error align-top text-sm leading-none"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </span>
              </label>
              <select
                id="form-medium"
                defaultValue="watercolor"
                className="select select-accent w-full cursor-pointer"
                required
              >
                <option value="watercolor">Watercolor</option>
                <option value="gouache">Gouache</option>
                <option value="ink">Ink wash</option>
              </select>
              
            </div>

            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="form-paper">
                <span className="label-text">Paper weight</span>
              </label>
              <select
                id="form-paper"
                defaultValue="300"
                className="select select-info w-full cursor-pointer"
              >
                <option value="190">190 gsm</option>
                <option value="300">300 gsm</option>
                <option value="640">640 gsm</option>
              </select>
              
            </div>

            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="form-finish">
                <span className="label-text">Finish</span>
              </label>
              <select
                id="form-finish"
                defaultValue=""
                className="select select-ghost w-full cursor-pointer"
              >
                <option disabled value="">
                  Optional finish…
                </option>
                <option value="matte">Matte</option>
                <option value="satin">Satin</option>
                <option value="gloss">Gloss</option>
              </select>
              
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button type="submit" className="btn btn-primary cursor-pointer">
                Save plate
              </button>
              <button type="reset" className="btn btn-ghost cursor-pointer">
                Reset
              </button>
            </div>
          </form>`}
          />
        </Section>

        <Section
          eyebrow="09 · Multiple"
          title="Multi-select"
          description="Native multiple attribute for batch pigment picks"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex max-w-md flex-col gap-2">
                            <select
                              multiple
                              defaultValue={['ultramarine', 'ochre']}
                              className="select h-auto min-h-32 w-full cursor-pointer border-ink-border py-2"
                              aria-label="Multiple pigments"
                              size={5}
                            >
                              <option value="ultramarine">Ultramarine</option>
                              <option value="ochre">Yellow ochre</option>
                              <option value="alizarin">Alizarin crimson</option>
                              <option value="viridian">Viridian</option>
                              <option value="sienna">Burnt sienna</option>
                            </select>
                            <ClassLabel value="select multiple" />
                          </div>
              </>
            }
            html={`<div class="flex max-w-md flex-col gap-2">
            <select
              multiple
              value=
              class="select h-auto min-h-32 w-full cursor-pointer border-ink-border py-2"
              aria-label="Multiple pigments"
              size=
            >
              <option value="ultramarine">Ultramarine</option>
              <option value="ochre">Yellow ochre</option>
              <option value="alizarin">Alizarin crimson</option>
              <option value="viridian">Viridian</option>
              <option value="sienna">Burnt sienna</option>
            </select>
            
          </div>`}
            jsx={`<div className="flex max-w-md flex-col gap-2">
            <select
              multiple
              defaultValue={['ultramarine', 'ochre']}
              className="select h-auto min-h-32 w-full cursor-pointer border-ink-border py-2"
              aria-label="Multiple pigments"
              size={5}
            >
              <option value="ultramarine">Ultramarine</option>
              <option value="ochre">Yellow ochre</option>
              <option value="alizarin">Alizarin crimson</option>
              <option value="viridian">Viridian</option>
              <option value="sienna">Burnt sienna</option>
            </select>
            
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
