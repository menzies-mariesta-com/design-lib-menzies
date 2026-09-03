import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  Droplets,
  Eraser,
  Paintbrush,
  Pencil,
  Search,
  Square,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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

const sizes = [
  { name: 'XS', btn: 'btn-xs', input: 'input-xs' },
  { name: 'SM', btn: 'btn-sm', input: 'input-sm' },
  { name: 'MD', btn: 'btn-md', input: 'input-md' },
  { name: 'LG', btn: 'btn-lg', input: 'input-lg' },
  { name: 'XL', btn: 'btn-xl', input: 'input-xl' },
] as const

export default function JoinPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Join
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">join</span> groups:
          buttons, inputs, and selects sharing one continuous border.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Joined buttons"
          description="Direct sibling join-items share radius on the first and last child"
        >
          <div className="flex flex-col gap-5">
            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <button type="button" className="btn join-item cursor-pointer">
                                Wash
                              </button>
                              <button
                                type="button"
                                className="btn join-item btn-active cursor-pointer"
                              >
                                Glaze
                              </button>
                              <button type="button" className="btn join-item cursor-pointer">
                                Lift
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join">
                <button type="button" class="btn join-item cursor-pointer">
                  Wash
                </button>
                <button
                  type="button"
                  class="btn join-item btn-active cursor-pointer"
                >
                  Glaze
                </button>
                <button type="button" class="btn join-item cursor-pointer">
                  Lift
                </button>
              </div>`}
            jsx={`<div className="join">
                <button type="button" className="btn join-item cursor-pointer">
                  Wash
                </button>
                <button
                  type="button"
                  className="btn join-item btn-active cursor-pointer"
                >
                  Glaze
                </button>
                <button type="button" className="btn join-item cursor-pointer">
                  Lift
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <button
                                type="button"
                                className="btn btn-outline join-item cursor-pointer"
                              >
                                Day
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline join-item btn-active cursor-pointer"
                              >
                                Week
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline join-item cursor-pointer"
                              >
                                Month
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join">
                <button
                  type="button"
                  class="btn btn-outline join-item cursor-pointer"
                >
                  Day
                </button>
                <button
                  type="button"
                  class="btn btn-outline join-item btn-active cursor-pointer"
                >
                  Week
                </button>
                <button
                  type="button"
                  class="btn btn-outline join-item cursor-pointer"
                >
                  Month
                </button>
              </div>`}
            jsx={`<div className="join">
                <button
                  type="button"
                  className="btn btn-outline join-item cursor-pointer"
                >
                  Day
                </button>
                <button
                  type="button"
                  className="btn btn-outline join-item btn-active cursor-pointer"
                >
                  Week
                </button>
                <button
                  type="button"
                  className="btn btn-outline join-item cursor-pointer"
                >
                  Month
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <input
                                className="btn join-item cursor-pointer"
                                type="radio"
                                name="join-basic-paper"
                                aria-label="Cold press"
                                defaultChecked
                              />
                              <input
                                className="btn join-item cursor-pointer"
                                type="radio"
                                name="join-basic-paper"
                                aria-label="Hot press"
                              />
                              <input
                                className="btn join-item cursor-pointer"
                                type="radio"
                                name="join-basic-paper"
                                aria-label="Rough"
                              />
                            </div>
            
              </>
            }
            html={`<div class="join">
                <input
                  class="btn join-item cursor-pointer"
                  type="radio"
                  name="join-basic-paper"
                  aria-label="Cold press"
                  checked />
                <input
                  class="btn join-item cursor-pointer"
                  type="radio"
                  name="join-basic-paper"
                  aria-label="Hot press" />
                <input
                  class="btn join-item cursor-pointer"
                  type="radio"
                  name="join-basic-paper"
                  aria-label="Rough" />
              </div>`}
            jsx={`<div className="join">
                <input
                  className="btn join-item cursor-pointer"
                  type="radio"
                  name="join-basic-paper"
                  aria-label="Cold press"
                  defaultChecked
                />
                <input
                  className="btn join-item cursor-pointer"
                  type="radio"
                  name="join-basic-paper"
                  aria-label="Hot press"
                />
                <input
                  className="btn join-item cursor-pointer"
                  type="radio"
                  name="join-basic-paper"
                  aria-label="Rough"
                />
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="02 · Vertical"
          title="Join vertical"
          description="Stack items with join-vertical"
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap gap-8">
            <ShowcaseTabs
            preview={
              <>

              <div className="join join-vertical">
                              <button type="button" className="btn join-item cursor-pointer">
                                Layer 1
                              </button>
                              <button
                                type="button"
                                className="btn join-item btn-active cursor-pointer"
                              >
                                Layer 2
                              </button>
                              <button type="button" className="btn join-item cursor-pointer">
                                Layer 3
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join join-vertical">
                <button type="button" class="btn join-item cursor-pointer">
                  Layer 1
                </button>
                <button
                  type="button"
                  class="btn join-item btn-active cursor-pointer"
                >
                  Layer 2
                </button>
                <button type="button" class="btn join-item cursor-pointer">
                  Layer 3
                </button>
              </div>`}
            jsx={`<div className="join join-vertical">
                <button type="button" className="btn join-item cursor-pointer">
                  Layer 1
                </button>
                <button
                  type="button"
                  className="btn join-item btn-active cursor-pointer"
                >
                  Layer 2
                </button>
                <button type="button" className="btn join-item cursor-pointer">
                  Layer 3
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join join-vertical">
                              <button
                                type="button"
                                className="btn btn-soft btn-primary join-item cursor-pointer"
                              >
                                Foreground
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft join-item cursor-pointer"
                              >
                                Midground
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft join-item cursor-pointer"
                              >
                                Background
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join join-vertical">
                <button
                  type="button"
                  class="btn btn-soft btn-primary join-item cursor-pointer"
                >
                  Foreground
                </button>
                <button
                  type="button"
                  class="btn btn-soft join-item cursor-pointer"
                >
                  Midground
                </button>
                <button
                  type="button"
                  class="btn btn-soft join-item cursor-pointer"
                >
                  Background
                </button>
              </div>`}
            jsx={`<div className="join join-vertical">
                <button
                  type="button"
                  className="btn btn-soft btn-primary join-item cursor-pointer"
                >
                  Foreground
                </button>
                <button
                  type="button"
                  className="btn btn-soft join-item cursor-pointer"
                >
                  Midground
                </button>
                <button
                  type="button"
                  className="btn btn-soft join-item cursor-pointer"
                >
                  Background
                </button>
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="03 · Input + button"
          title="Search-style join"
          description="Input and button as direct siblings"
        >
          <div className="flex flex-col gap-5">
            <ShowcaseTabs
            preview={
              <>

              <div className="join w-full">
                              <input
                                type="search"
                                placeholder="Search plates…"
                                className="input join-item min-w-0 grow cursor-text"
                                aria-label="Search plates"
                              />
                              <button
                                type="button"
                                className="btn btn-primary join-item cursor-pointer"
                              >
                                Search
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join w-full">
                <input
                  type="search"
                  placeholder="Search plates…"
                  class="input join-item min-w-0 grow cursor-text"
                  aria-label="Search plates" />
                <button
                  type="button"
                  class="btn btn-primary join-item cursor-pointer"
                >
                  Search
                </button>
              </div>`}
            jsx={`<div className="join w-full">
                <input
                  type="search"
                  placeholder="Search plates…"
                  className="input join-item min-w-0 grow cursor-text"
                  aria-label="Search plates"
                />
                <button
                  type="button"
                  className="btn btn-primary join-item cursor-pointer"
                >
                  Search
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join w-full">
                              <label className="input join-item min-w-0 grow cursor-text">
                                <Search
                                  className="size-4 shrink-0 opacity-60"
                                  strokeWidth={2}
                                />
                                <input
                                  type="search"
                                  placeholder="Filter ledger…"
                                  className="min-w-0 grow cursor-text"
                                />
                              </label>
                              <button
                                type="button"
                                className="btn btn-neutral join-item cursor-pointer"
                              >
                                Go
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join w-full">
                <label class="input join-item min-w-0 grow cursor-text">
                  <!-- Search -->
                  <input
                    type="search"
                    placeholder="Filter ledger…"
                    class="min-w-0 grow cursor-text" />
                </label>
                <button
                  type="button"
                  class="btn btn-neutral join-item cursor-pointer"
                >
                  Go
                </button>
              </div>`}
            jsx={`<div className="join w-full">
                <label className="input join-item min-w-0 grow cursor-text">
                  <Search
                    className="size-4 shrink-0 opacity-60"
                    strokeWidth={2}
                  />
                  <input
                    type="search"
                    placeholder="Filter ledger…"
                    className="min-w-0 grow cursor-text"
                  />
                </label>
                <button
                  type="button"
                  className="btn btn-neutral join-item cursor-pointer"
                >
                  Go
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join w-full">
                              <input
                                type="email"
                                placeholder="studio@menzies.design"
                                className="input join-item min-w-0 grow cursor-text"
                                aria-label="Email"
                              />
                              <button
                                type="button"
                                className="btn btn-secondary join-item cursor-pointer rounded-r-full"
                              >
                                Subscribe
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join w-full">
                <input
                  type="email"
                  placeholder="studio@menzies.design"
                  class="input join-item min-w-0 grow cursor-text"
                  aria-label="Email" />
                <button
                  type="button"
                  class="btn btn-secondary join-item cursor-pointer rounded-r-full"
                >
                  Subscribe
                </button>
              </div>`}
            jsx={`<div className="join w-full">
                <input
                  type="email"
                  placeholder="studio@menzies.design"
                  className="input join-item min-w-0 grow cursor-text"
                  aria-label="Email"
                />
                <button
                  type="button"
                  className="btn btn-secondary join-item cursor-pointer rounded-r-full"
                >
                  Subscribe
                </button>
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="04 · Mixed controls"
          title="Select + button"
          description="Mix select, input, and button join-items in one group"
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-5">
            <ShowcaseTabs
            preview={
              <>

              <div className="join w-full">
                              <select
                                className="select join-item cursor-pointer"
                                aria-label="Paper weight"
                                defaultValue="300"
                              >
                                <option value="190">190 gsm</option>
                                <option value="300">300 gsm</option>
                                <option value="640">640 gsm</option>
                              </select>
                              <button
                                type="button"
                                className="btn btn-primary join-item cursor-pointer"
                              >
                                Apply
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join w-full">
                <select
                  class="select join-item cursor-pointer"
                  aria-label="Paper weight"
                  value="300"
                >
                  <option value="190">190 gsm</option>
                  <option value="300">300 gsm</option>
                  <option value="640">640 gsm</option>
                </select>
                <button
                  type="button"
                  class="btn btn-primary join-item cursor-pointer"
                >
                  Apply
                </button>
              </div>`}
            jsx={`<div className="join w-full">
                <select
                  className="select join-item cursor-pointer"
                  aria-label="Paper weight"
                  defaultValue="300"
                >
                  <option value="190">190 gsm</option>
                  <option value="300">300 gsm</option>
                  <option value="640">640 gsm</option>
                </select>
                <button
                  type="button"
                  className="btn btn-primary join-item cursor-pointer"
                >
                  Apply
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join w-full">
                              <input
                                type="text"
                                placeholder="Series name…"
                                className="input join-item min-w-0 grow cursor-text"
                                aria-label="Series name"
                              />
                              <select
                                className="select join-item cursor-pointer"
                                aria-label="Hue family"
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Hue
                                </option>
                                <option>Cool</option>
                                <option>Warm</option>
                                <option>Earth</option>
                              </select>
                              <button
                                type="button"
                                className="btn join-item cursor-pointer"
                              >
                                Add
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join w-full">
                <input
                  type="text"
                  placeholder="Series name…"
                  class="input join-item min-w-0 grow cursor-text"
                  aria-label="Series name" />
                <select
                  class="select join-item cursor-pointer"
                  aria-label="Hue family"
                  value=""
                >
                  <option value="" disabled>
                    Hue
                  </option>
                  <option>Cool</option>
                  <option>Warm</option>
                  <option>Earth</option>
                </select>
                <button
                  type="button"
                  class="btn join-item cursor-pointer"
                >
                  Add
                </button>
              </div>`}
            jsx={`<div className="join w-full">
                <input
                  type="text"
                  placeholder="Series name…"
                  className="input join-item min-w-0 grow cursor-text"
                  aria-label="Series name"
                />
                <select
                  className="select join-item cursor-pointer"
                  aria-label="Hue family"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Hue
                  </option>
                  <option>Cool</option>
                  <option>Warm</option>
                  <option>Earth</option>
                </select>
                <button
                  type="button"
                  className="btn join-item cursor-pointer"
                >
                  Add
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join flex-wrap">
                              <div>
                                <div>
                                  <input
                                    className="input join-item cursor-text"
                                    placeholder="Pigment…"
                                    aria-label="Pigment search"
                                  />
                                </div>
                              </div>
                              <select
                                className="select join-item cursor-pointer"
                                defaultValue=""
                                aria-label="Wash type"
                              >
                                <option value="" disabled>
                                  Wash
                                </option>
                                <option>Glaze</option>
                                <option>Flat</option>
                                <option>Granulating</option>
                              </select>
                              <div className="indicator">
                                <span className="indicator-item badge badge-secondary">
                                  new
                                </span>
                                <button
                                  type="button"
                                  className="btn join-item cursor-pointer"
                                >
                                  Search
                                </button>
                              </div>
                            </div>
            
              </>
            }
            html={`<div class="join flex-wrap">
                <div>
                  <div>
                    <input
                      class="input join-item cursor-text"
                      placeholder="Pigment…"
                      aria-label="Pigment search" />
                  </div>
                </div>
                <select
                  class="select join-item cursor-pointer"
                  value=""
                  aria-label="Wash type"
                >
                  <option value="" disabled>
                    Wash
                  </option>
                  <option>Glaze</option>
                  <option>Flat</option>
                  <option>Granulating</option>
                </select>
                <div class="indicator">
                  <span class="indicator-item badge badge-secondary">
                    new
                  </span>
                  <button
                    type="button"
                    class="btn join-item cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </div>`}
            jsx={`<div className="join flex-wrap">
                <div>
                  <div>
                    <input
                      className="input join-item cursor-text"
                      placeholder="Pigment…"
                      aria-label="Pigment search"
                    />
                  </div>
                </div>
                <select
                  className="select join-item cursor-pointer"
                  defaultValue=""
                  aria-label="Wash type"
                >
                  <option value="" disabled>
                    Wash
                  </option>
                  <option>Glaze</option>
                  <option>Flat</option>
                  <option>Granulating</option>
                </select>
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                    new
                  </span>
                  <button
                    type="button"
                    className="btn join-item cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="05 · Sizes"
          title="Item size modifiers"
          description="Join has no size class of its own"
        >
          <div className="flex flex-col gap-5">
            {sizes.map((size) => (
              <ShowcaseTabs
            preview={
              <>

              <div className="join w-full">
                                <input
                                  type="search"
                                  placeholder={`${size.name} search…`}
                                  className={`input join-item min-w-0 grow cursor-text ${size.input}`}
                                  aria-label={`${size.name} search`}
                                />
                                <button
                                  type="button"
                                  className={`btn btn-primary join-item cursor-pointer ${size.btn}`}
                                >
                                  Find
                                </button>
                              </div>
            
              </>
            }
            html={`<div class="join w-full">
                  <input
                    type="search"
                    placeholder=
                    class=
                    aria-label="Label" search\`} />
                  <button
                    type="button"
                    class=
                  >
                    Find
                  </button>
                </div>`}
            jsx={`<div className="join w-full">
                  <input
                    type="search"
                    placeholder={\`\${size.name} search…\`}
                    className={\`input join-item min-w-0 grow cursor-text \${size.input}\`}
                    aria-label={\`\${size.name} search\`}
                  />
                  <button
                    type="button"
                    className={\`btn btn-primary join-item cursor-pointer \${size.btn}\`}
                  >
                    Find
                  </button>
                </div>`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="06 · Studio toolbar"
          title="Watercolor tool group"
          description="Icon tool strip for the pigment desk"
          panel="wash-panel-blue"
        >
          <div className="flex flex-col gap-5">
            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              {(
                                [
                                  { label: 'Brush', Icon: Paintbrush, active: true },
                                  { label: 'Pencil', Icon: Pencil, active: false },
                                  { label: 'Wash', Icon: Droplets, active: false },
                                  { label: 'Eraser', Icon: Eraser, active: false },
                                  { label: 'Mask', Icon: Square, active: false },
                                ] as const
                              ).map(({ label, Icon, active }) => (
                                <button
                                  key={label}
                                  type="button"
                                  className={`btn btn-square join-item tooltip cursor-pointer ${
                                    active ? 'btn-primary tooltip-primary' : ''
                                  }`}
                                  data-tip={label}
                                  aria-label={label}
                                  aria-pressed={active}
                                >
                                  <Icon className="size-4" strokeWidth={2} />
                                </button>
                              ))}
                            </div>
            
              </>
            }
            html={`<div class="join">
                {(
                  [
                    { label: 'Brush', Icon: Paintbrush, active: true },
                    { label: 'Pencil', Icon: Pencil, active: false },
                    { label: 'Wash', Icon: Droplets, active: false },
                    { label: 'Eraser', Icon: Eraser, active: false },
                    { label: 'Mask', Icon: Square, active: false },
                  ] as const
                ).map(({ label, Icon, active }) => (
                  <button
                    key=
                    type="button"
                    class=
                    data-tip=
                    aria-label="Label"
                    aria-pressed="true"
                  >
                    <!-- Icon -->
                  </button>
                ))}
              </div>`}
            jsx={`<div className="join">
                {(
                  [
                    { label: 'Brush', Icon: Paintbrush, active: true },
                    { label: 'Pencil', Icon: Pencil, active: false },
                    { label: 'Wash', Icon: Droplets, active: false },
                    { label: 'Eraser', Icon: Eraser, active: false },
                    { label: 'Mask', Icon: Square, active: false },
                  ] as const
                ).map(({ label, Icon, active }) => (
                  <button
                    key={label}
                    type="button"
                    className={\`btn btn-square join-item tooltip cursor-pointer \${
                      active ? 'btn-primary tooltip-primary' : ''
                    }\`}
                    data-tip={label}
                    aria-label={label}
                    aria-pressed={active}
                  >
                    <Icon className="size-4" strokeWidth={2} />
                  </button>
                ))}
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <button
                                type="button"
                                className="btn btn-soft join-item cursor-pointer"
                              >
                                Undo
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft join-item cursor-pointer"
                              >
                                Redo
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary join-item cursor-pointer"
                              >
                                Commit wash
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join">
                <button
                  type="button"
                  class="btn btn-soft join-item cursor-pointer"
                >
                  Undo
                </button>
                <button
                  type="button"
                  class="btn btn-soft join-item cursor-pointer"
                >
                  Redo
                </button>
                <button
                  type="button"
                  class="btn btn-primary join-item cursor-pointer"
                >
                  Commit wash
                </button>
              </div>`}
            jsx={`<div className="join">
                <button
                  type="button"
                  className="btn btn-soft join-item cursor-pointer"
                >
                  Undo
                </button>
                <button
                  type="button"
                  className="btn btn-soft join-item cursor-pointer"
                >
                  Redo
                </button>
                <button
                  type="button"
                  className="btn btn-primary join-item cursor-pointer"
                >
                  Commit wash
                </button>
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Vertical then horizontal"
          description="join-vertical on small screens, lg:join-horizontal when space"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="join join-vertical lg:join-horizontal">
                            <button type="button" className="btn join-item cursor-pointer">
                              Coastal
                            </button>
                            <button
                              type="button"
                              className="btn join-item btn-active cursor-pointer"
                            >
                              Alpine
                            </button>
                            <button type="button" className="btn join-item cursor-pointer">
                              Desert
                            </button>
                            <button type="button" className="btn join-item cursor-pointer">
                              Urban
                            </button>
                          </div>
            
              </>
            }
            html={`<div class="join join-vertical lg:join-horizontal">
              <button type="button" class="btn join-item cursor-pointer">
                Coastal
              </button>
              <button
                type="button"
                class="btn join-item btn-active cursor-pointer"
              >
                Alpine
              </button>
              <button type="button" class="btn join-item cursor-pointer">
                Desert
              </button>
              <button type="button" class="btn join-item cursor-pointer">
                Urban
              </button>
            </div>`}
            jsx={`<div className="join join-vertical lg:join-horizontal">
              <button type="button" className="btn join-item cursor-pointer">
                Coastal
              </button>
              <button
                type="button"
                className="btn join-item btn-active cursor-pointer"
              >
                Alpine
              </button>
              <button type="button" className="btn join-item cursor-pointer">
                Desert
              </button>
              <button type="button" className="btn join-item cursor-pointer">
                Urban
              </button>
            </div>`}
          />
        </Section>
      </div>
    </>
  )
}
