import type { ReactNode } from 'react'
import {
  Plus,
  Download,
  Trash2,
  Heart,
  Settings,
  ArrowRight,
  Search,
} from 'menzies-design-wash-ui/icons'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'btn-neutral' },
  { name: 'Primary', className: 'btn-primary' },
  { name: 'Secondary', className: 'btn-secondary' },
  { name: 'Accent', className: 'btn-accent' },
  { name: 'Info', className: 'btn-info' },
  { name: 'Success', className: 'btn-success' },
  { name: 'Warning', className: 'btn-warning' },
  { name: 'Error', className: 'btn-error' },
] as const

const styles = [
  { name: 'Solid', className: '' },
  { name: 'Outline', className: 'btn-outline' },
  { name: 'Dash', className: 'btn-dash' },
  { name: 'Soft', className: 'btn-soft' },
  { name: 'Ghost', className: 'btn-ghost' },
  { name: 'Link', className: 'btn-link' },
] as const

const sizes = [
  { name: 'XS', className: 'btn-xs' },
  { name: 'SM', className: 'btn-sm' },
  { name: 'MD', className: 'btn-md' },
  { name: 'LG', className: 'btn-lg' },
  { name: 'XL', className: 'btn-xl' },
] as const

const tooltipColor: Record<string, string> = {
  '': '',
  'btn-neutral': 'tooltip-neutral',
  'btn-primary': 'tooltip-primary',
  'btn-secondary': 'tooltip-secondary',
  'btn-accent': 'tooltip-accent',
  'btn-info': 'tooltip-info',
  'btn-success': 'tooltip-success',
  'btn-warning': 'tooltip-warning',
  'btn-error': 'tooltip-error',
}

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
      {value || 'btn'}
    </code>
  )
}

/** daisyUI btn + wash ripple opt-in (global attach in main.tsx). */
function btnCx(...parts: Array<string | false | null | undefined>) {
  return ['btn', 'ripple', ...parts.filter(Boolean)].join(' ')
}

export default function ButtonsPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Buttons
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">btn</span> color,
          style, size, modifier, and state, printed on watercolor paper. Press
          feedback uses the shared <span className="font-mono text-xs">ripple</span>{' '}
          class (see Ripple gallery).
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Colors"
          title="Semantic colors"
          description="Default ink plus neutral, brand, and status colors."
        >
          <div className="flex flex-wrap items-end gap-4">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <button type="button" className={btnCx(c.className)}>
                  {c.name}
                </button>
                <ClassLabel value={c.className ? `btn ${c.className}` : 'btn'} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="02 · Styles"
          title="Style variants"
          description="Solid, outline, dash, soft, ghost, and link: each with every color."
          panel="wash-panel-ochre"
        >
          <div className="space-y-6">
            {styles.map((style) => (
              <div key={style.name}>
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <p className="label-ink">{style.name}</p>
                  <ClassLabel
                    value={
                      style.className ? `btn ${style.className}` : 'btn (solid)'
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={`${style.name}-${c.name}`}
                      type="button"
                      className={btnCx(style.className, c.className)}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="From compact controls to XL actions."
        >
          <div className="flex flex-wrap items-end gap-4">
            {sizes.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <button type="button" className={btnCx('btn-primary', s.className)}>
                  {s.name}
                </button>
                <ClassLabel value={`btn ${s.className}`} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Modifiers"
          title="Width & shape"
          description="Wide, block, square, and circle modifiers."
          panel="wash-panel-rose"
        >
          <div className="space-y-6">
            <div>
              <p className="label-ink mb-3">Wide</p>
              <button type="button" className={btnCx('btn-wide', 'btn-primary')}>
                Wide action
              </button>
              <p className="mt-2">
                <ClassLabel value="btn btn-wide btn-primary" />
              </p>
            </div>

            <div>
              <p className="label-ink mb-3">Block</p>
              <button type="button" className={btnCx('btn-block', 'btn-neutral')}>
                Full-width block
              </button>
              <p className="mt-2">
                <ClassLabel value="btn btn-block btn-neutral" />
              </p>
            </div>

            <div>
              <p className="label-ink mb-3">Square</p>
              <div className="flex flex-wrap gap-3">
                {colors.slice(0, 5).map((c) => (
                  <div
                    key={`sq-${c.name}`}
                    className={`tooltip ${tooltipColor[c.className] ?? ''}`}
                    data-tip={c.name}
                  >
                    <button
                      type="button"
                      className={btnCx('btn-square', c.className)}
                      aria-label={c.name}
                    >
                      <Plus className="size-4" strokeWidth={1.75} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-2">
                <ClassLabel value="btn btn-square" />
              </p>
            </div>

            <div>
              <p className="label-ink mb-3">Circle</p>
              <div className="flex flex-wrap gap-3">
                {colors.slice(0, 5).map((c) => (
                  <div
                    key={`cir-${c.name}`}
                    className={`tooltip ${tooltipColor[c.className] ?? ''}`}
                    data-tip={c.name}
                  >
                    <button
                      type="button"
                      className={btnCx('btn-circle', c.className)}
                      aria-label={c.name}
                    >
                      <Heart className="size-4" strokeWidth={1.75} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-2">
                <ClassLabel value="btn btn-circle" />
              </p>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="05 · Behavior"
          title="Active & disabled"
          description="Pressed state and disabled controls."
        >
          <div className="flex flex-wrap gap-3">
            <button type="button" className={btnCx()}>
              Idle
            </button>
            <button type="button" className={btnCx('btn-active')}>
              Active
            </button>
            <button type="button" className={btnCx('btn-primary', 'btn-active')}>
              Primary active
            </button>
            <button type="button" className="btn" disabled>
              Disabled attr
            </button>
            <button
              type="button"
              className="btn btn-disabled"
              tabIndex={-1}
              role="button"
              aria-disabled="true"
            >
              Disabled class
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            <ClassLabel value="btn btn-active" />
            <ClassLabel value="btn btn-disabled" />
          </div>
        </Section>

        <Section
          eyebrow="06 · With icons"
          title="Icon + label"
          description="Leading and trailing Lucide marks."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap gap-3">
            <button type="button" className={btnCx('btn-primary')}>
              <Plus className="size-4" strokeWidth={1.75} />
              New wash
            </button>
            <button type="button" className={btnCx('btn-outline')}>
              <Download className="size-4" strokeWidth={1.75} />
              Export
            </button>
            <button type="button" className={btnCx('btn-soft', 'btn-error')}>
              <Trash2 className="size-4" strokeWidth={1.75} />
              Delete
            </button>
            <button type="button" className={btnCx('btn-ghost')}>
              Settings
              <Settings className="size-4" strokeWidth={1.75} />
            </button>
            <button type="button" className={btnCx('btn-link', 'btn-primary')}>
              Continue
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </Section>

        <Section
          eyebrow="07 · Element types"
          title="Button, link, and input"
          description="Same btn classes on different HTML elements."
        >
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className={btnCx('btn-primary')}>
              &lt;button&gt;
            </button>
            <a href="#buttons" className={btnCx('btn-outline', 'btn-primary')}>
              &lt;a class=&quot;btn&quot;&gt;
            </a>
            <input type="button" value="<input type=button>" className={btnCx()} />
            <input
              type="submit"
              value="<input type=submit>"
              className={btnCx('btn-neutral')}
            />
            <input type="reset" value="<input type=reset>" className={btnCx('btn-ghost')} />
          </div>
        </Section>

        <Section
          eyebrow="08 · Groups"
          title="Join groups"
          description="Segmented controls with join + join-item."
          panel="wash-panel-rose"
        >
          <div className="space-y-4">
            <div className="join">
              <button type="button" className={btnCx('join-item')}>
                Left
              </button>
              <button type="button" className={btnCx('join-item', 'btn-active')}>
                Center
              </button>
              <button type="button" className={btnCx('join-item')}>
                Right
              </button>
            </div>

            <div className="join">
              <button type="button" className={btnCx('btn-outline', 'join-item')}>
                Day
              </button>
              <button
                type="button"
                className={btnCx('btn-outline', 'join-item', 'btn-active')}
              >
                Week
              </button>
              <button type="button" className={btnCx('btn-outline', 'join-item')}>
                Month
              </button>
            </div>

            <div className="join">
              <label className="input join-item cursor-text">
                <Search className="size-4 shrink-0 opacity-50" strokeWidth={2} />
                <input
                  type="search"
                  placeholder="Filter plates…"
                  className="grow cursor-text"
                />
              </label>
              <button
                type="button"
                className={btnCx('btn-primary', 'join-item', 'cursor-pointer')}
              >
                Search
              </button>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="09 · Size × style matrix"
          title="Soft primary scale"
          description="One color through every size and a few styles."
        >
          <div className="space-y-4">
            {sizes.map((s) => (
              <div key={s.name} className="flex flex-wrap items-center gap-2">
                <span className="label-ink w-8">{s.name}</span>
                <button type="button" className={btnCx('btn-primary', s.className)}>
                  Solid
                </button>
                <button
                  type="button"
                  className={btnCx('btn-outline', 'btn-primary', s.className)}
                >
                  Outline
                </button>
                <button
                  type="button"
                  className={btnCx('btn-soft', 'btn-primary', s.className)}
                >
                  Soft
                </button>
                <button
                  type="button"
                  className={btnCx('btn-ghost', 'btn-primary', s.className)}
                >
                  Ghost
                </button>
                <button
                  type="button"
                  className={btnCx('btn-dash', 'btn-primary', s.className)}
                >
                  Dash
                </button>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
