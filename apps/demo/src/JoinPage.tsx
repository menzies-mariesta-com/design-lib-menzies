import type { ReactNode } from 'react'
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

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
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
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
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
          description="Direct sibling join-items share radius on the first and last child."
        >
          <div className="flex flex-col gap-5">
            <Sample label="join + btn join-item">
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
            </Sample>

            <Sample label="join + btn-outline join-item">
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
            </Sample>

            <Sample label="join + radio btn join-item">
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
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="02 · Vertical"
          title="Join vertical"
          description="Stack items with join-vertical for side toolbars and stacked actions."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap gap-8">
            <Sample label="join join-vertical">
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
            </Sample>

            <Sample label="join join-vertical + btn-soft">
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
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="03 · Input + button"
          title="Search-style join"
          description="Input and button as direct siblings. Avoid wrappers that break shared borders."
        >
          <div className="flex flex-col gap-5">
            <Sample label="join + input.join-item + btn.join-item" className="max-w-lg">
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
            </Sample>

            <Sample
              label="join + label.input join-item + icon + btn"
              className="max-w-lg"
            >
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
            </Sample>

            <Sample
              label="join + input + btn rounded-r-full"
              className="max-w-md"
            >
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
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="04 · Mixed controls"
          title="Select + button"
          description="Mix select, input, and button join-items in one group."
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-5">
            <Sample label="join + select + btn" className="max-w-md">
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
            </Sample>

            <Sample
              label="join + input + select + btn"
              className="max-w-xl"
            >
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
            </Sample>

            <Sample label="join + nested join-item (docs pattern)">
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
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="05 · Sizes"
          title="Item size modifiers"
          description="Join has no size class of its own. Match btn, input, and select sizes on each item."
        >
          <div className="flex flex-col gap-5">
            {sizes.map((size) => (
              <Sample
                key={size.name}
                label={`join + ${size.input} / ${size.btn}`}
                className="max-w-lg"
              >
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
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="06 · Studio toolbar"
          title="Watercolor tool group"
          description="Icon tool strip for the pigment desk. Keep tools as direct join siblings."
          panel="wash-panel-blue"
        >
          <div className="flex flex-col gap-5">
            <Sample label="join + btn-square join-item">
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
            </Sample>

            <Sample label="join + soft tools + primary commit">
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
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Vertical then horizontal"
          description="join-vertical on small screens, lg:join-horizontal when space allows."
        >
          <Sample label="join join-vertical lg:join-horizontal">
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
          </Sample>
        </Section>
      </div>
    </>
  )
}
