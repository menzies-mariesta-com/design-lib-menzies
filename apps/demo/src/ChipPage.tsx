import { useState, type ReactNode } from 'react'
import {
  Droplet,
  Hash,
  Paintbrush,
  Sparkles,
  Tags,
  X,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'badge-neutral' },
  { name: 'Primary', className: 'badge-primary' },
  { name: 'Secondary', className: 'badge-secondary' },
  { name: 'Accent', className: 'badge-accent' },
  { name: 'Info', className: 'badge-info' },
  { name: 'Success', className: 'badge-success' },
  { name: 'Warning', className: 'badge-warning' },
  { name: 'Error', className: 'badge-error' },
] as const

const styleColors = [
  { name: 'Primary', className: 'badge-primary' },
  { name: 'Secondary', className: 'badge-secondary' },
  { name: 'Accent', className: 'badge-accent' },
  { name: 'Info', className: 'badge-info' },
  { name: 'Success', className: 'badge-success' },
  { name: 'Warning', className: 'badge-warning' },
  { name: 'Error', className: 'badge-error' },
] as const

const styles = [
  { name: 'Default', className: '' },
  { name: 'Outline', className: 'badge-outline' },
  { name: 'Dash', className: 'badge-dash' },
  { name: 'Soft', className: 'badge-soft' },
  { name: 'Ghost', className: 'badge-ghost' },
] as const

const sizes = [
  { name: 'XS', className: 'badge-xs', label: 'Xsmall' },
  { name: 'SM', className: 'badge-sm', label: 'Small' },
  { name: 'MD', className: 'badge-md', label: 'Medium' },
  { name: 'LG', className: 'badge-lg', label: 'Large' },
  { name: 'XL', className: 'badge-xl', label: 'Xlarge' },
] as const

const iconChips = [
  { name: 'Tags', className: 'badge-primary', Icon: Tags },
  { name: 'Hash', className: 'badge-secondary', Icon: Hash },
  { name: 'Droplet', className: 'badge-info', Icon: Droplet },
  { name: 'Brush', className: 'badge-accent', Icon: Paintbrush },
] as const

type DismissibleChip = {
  id: string
  label: string
  className: string
  tipColor: 'error' | 'primary' | 'secondary' | 'accent'
  btnColor: 'btn-error' | 'btn-primary' | 'btn-secondary' | 'btn-accent'
}

const initialDismissible: DismissibleChip[] = [
  {
    id: 'rose',
    label: 'Quinacridone rose',
    className: 'badge-primary',
    tipColor: 'primary',
    btnColor: 'btn-primary',
  },
  {
    id: 'ochre',
    label: 'Yellow ochre',
    className: 'badge-secondary',
    tipColor: 'secondary',
    btnColor: 'btn-secondary',
  },
  {
    id: 'ultramarine',
    label: 'Ultramarine',
    className: 'badge-accent',
    tipColor: 'accent',
    btnColor: 'btn-accent',
  },
  {
    id: 'draft',
    label: 'Draft plate',
    className: 'badge-error badge-soft',
    tipColor: 'error',
    btnColor: 'btn-error',
  },
]

const filterOptions = [
  'Glaze',
  'Granulating',
  'Opaque',
  'Cool',
  'Warm',
  'Earth',
] as const

const pigmentTags = [
  { label: 'Ultramarine', className: 'badge-info badge-soft' },
  { label: 'Cobalt', className: 'badge-primary badge-soft' },
  { label: 'Cerulean', className: 'badge-accent badge-soft' },
  { label: 'Burnt sienna', className: 'badge-warning badge-soft' },
  { label: 'Sap green', className: 'badge-success badge-soft' },
  { label: 'Quinacridone', className: 'badge-secondary badge-soft' },
] as const

const washTags = [
  { label: 'Wet-on-wet', className: 'badge-outline badge-info' },
  { label: 'Dry brush', className: 'badge-outline badge-warning' },
  { label: 'Glaze', className: 'badge-outline badge-primary' },
  { label: 'Bloom', className: 'badge-outline badge-secondary' },
  { label: 'Lift', className: 'badge-outline badge-accent' },
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
      {value || 'badge'}
    </code>
  )
}

function Sample({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function chipClasses(...parts: Array<string | false | undefined>) {
  return ['badge', ...parts.filter(Boolean)].join(' ')
}

function DismissibleChips() {
  const [chips, setChips] = useState(initialDismissible)

  function remove(id: string) {
    setChips((prev) => prev.filter((c) => c.id !== id))
  }

  function reset() {
    setChips(initialDismissible)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {chips.length === 0 ? (
          <p className="text-sm text-ink-muted">All chips dismissed.</p>
        ) : (
          chips.map((chip) => (
            <Sample
              key={chip.id}
              label={`badge ${chip.className} + dismiss`}
            >
              <span
                className={chipClasses(
                  chip.className,
                  'gap-1.5 pr-1 cursor-default',
                )}
              >
                {chip.label}
                <div
                  className={`tooltip tooltip-${chip.tipColor} tooltip-right`}
                  data-tip="Remove"
                >
                  <button
                    type="button"
                    className={`btn btn-ghost btn-xs btn-square ${chip.btnColor} cursor-pointer`}
                    aria-label="Remove"
                    onClick={() => remove(chip.id)}
                  >
                    <X className="size-3.5" strokeWidth={2} aria-hidden />
                  </button>
                </div>
              </span>
            </Sample>
          ))
        )}
      </div>
      {chips.length < initialDismissible.length && (
        <button
          type="button"
          className="btn btn-ghost btn-sm cursor-pointer"
          onClick={reset}
        >
          Restore chips
        </button>
      )}
    </div>
  )
}

function SelectableChips() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(['Glaze', 'Cool']),
  )

  function toggle(label: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((label) => {
          const isOn = selected.has(label)
          return (
            <Sample
              key={label}
              label={
                isOn
                  ? 'badge badge-primary cursor-pointer'
                  : 'badge badge-outline cursor-pointer'
              }
            >
              <button
                type="button"
                className={chipClasses(
                  isOn ? 'badge-primary' : 'badge-outline',
                  'cursor-pointer',
                )}
                aria-pressed={isOn}
                onClick={() => toggle(label)}
              >
                {label}
              </button>
            </Sample>
          )
        })}
      </div>
      <p className="text-sm text-ink-muted">
        Selected:{' '}
        {selected.size === 0
          ? 'none'
          : Array.from(selected).join(', ')}
      </p>
    </div>
  )
}

export default function ChipPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Chip
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Selectable and dismissible tags composed with daisyUI{' '}
          <span className="font-mono text-xs">badge</span> (no dedicated chip
          class). Distinct from status badges: chips filter, label, and remove.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Tag chips"
          description="Plain badge used as a chip or tag. Official daisyUI badge classes."
        >
          <div className="flex flex-wrap items-end gap-4">
            <Sample label="badge">
              <span className="badge cursor-default">Chip</span>
            </Sample>
            <Sample label="badge badge-soft">
              <span className="badge badge-soft cursor-default">Soft tag</span>
            </Sample>
            <Sample label="badge badge-outline">
              <span className="badge badge-outline cursor-default">
                Outline tag
              </span>
            </Sample>
            <Sample label="badge badge-ghost">
              <span className="badge badge-ghost cursor-default">Ghost tag</span>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="Official badge color modifiers as chip fills."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end gap-4">
            {colors.map((c) => (
              <Sample
                key={c.name}
                label={c.className ? `badge ${c.className}` : 'badge'}
              >
                <span className={chipClasses(c.className, 'cursor-default')}>
                  {c.name}
                </span>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Variants"
          title="Styles across colors"
          description="Outline, dash, soft, and ghost chip variants."
          panel="wash-panel-rose"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {styles.map((style) => (
              <div key={style.name} className="flex flex-col gap-3">
                <p className="label-ink">{style.name}</p>
                {style.className === 'badge-ghost' || style.className === '' ? (
                  <Sample
                    label={
                      style.className
                        ? `badge ${style.className}`
                        : 'badge'
                    }
                  >
                    <span
                      className={chipClasses(style.className, 'cursor-default')}
                    >
                      {style.name}
                    </span>
                  </Sample>
                ) : (
                  styleColors.map((c) => (
                    <Sample
                      key={`${style.name}-${c.name}`}
                      label={`badge ${style.className} ${c.className}`}
                    >
                      <span
                        className={chipClasses(
                          style.className,
                          c.className,
                          'cursor-default',
                        )}
                      >
                        {c.name}
                      </span>
                    </Sample>
                  ))
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Sizes"
          title="Size scale"
          description="badge-xs through badge-xl for chip density."
        >
          <div className="flex flex-wrap items-end gap-4">
            {sizes.map((s) => (
              <Sample key={s.name} label={`badge ${s.className}`}>
                <span className={chipClasses(s.className, 'cursor-default')}>
                  {s.label}
                </span>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Avatar / icon"
          title="Chips with avatar or Lucide"
          description="Composed: badge plus avatar thumbnail or Lucide 1.28.0 icon."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end gap-4">
            <Sample label="badge badge-lg + avatar">
              <span className="badge badge-lg gap-2 cursor-default">
                <div className="avatar avatar-placeholder">
                  <div className="w-5 rounded-full bg-wash-blue text-[0.55rem] font-semibold text-base-content">
                    <span>MK</span>
                  </div>
                </div>
                Maya K.
              </span>
            </Sample>
            <Sample label="badge badge-primary badge-lg + avatar">
              <span className="badge badge-primary badge-lg gap-2 cursor-default">
                <div className="avatar">
                  <div className="w-5 rounded-full">
                    <img
                      src="https://picsum.photos/seed/wash-chip/40/40"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                Series lead
              </span>
            </Sample>
            {iconChips.map(({ name, className, Icon }) => (
              <Sample key={name} label={`badge ${className} + Lucide`}>
                <span className={chipClasses(className, 'gap-1 cursor-default')}>
                  <Icon className="size-[1em]" strokeWidth={2} aria-hidden />
                  {name}
                </span>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="06 · Dismissible"
          title="Remove on click"
          description="Composed chip: badge label plus icon-only X with matching tooltip color."
          panel="wash-panel-rose"
        >
          <DismissibleChips />
        </Section>

        <Section
          eyebrow="07 · Selectable"
          title="Filter chips"
          description="Composed toggle: outline when idle, primary when selected (aria-pressed)."
        >
          <SelectableChips />
        </Section>

        <Section
          eyebrow="08 · Studio"
          title="Pigment and wash tags"
          description="Studio-themed tag sets for pigments and wash techniques."
          panel="wash-panel-ochre"
        >
          <div className="space-y-6">
            <div>
              <p className="label-ink mb-3">Pigment tags</p>
              <div className="flex flex-wrap gap-2">
                {pigmentTags.map((tag) => (
                  <Sample
                    key={tag.label}
                    label={`badge ${tag.className}`}
                  >
                    <span
                      className={chipClasses(tag.className, 'gap-1 cursor-default')}
                    >
                      <Droplet
                        className="size-[1em]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {tag.label}
                    </span>
                  </Sample>
                ))}
              </div>
            </div>
            <div>
              <p className="label-ink mb-3">Wash tags</p>
              <div className="flex flex-wrap gap-2">
                {washTags.map((tag) => (
                  <Sample key={tag.label} label={`badge ${tag.className}`}>
                    <span
                      className={chipClasses(tag.className, 'gap-1 cursor-default')}
                    >
                      <Sparkles
                        className="size-[1em]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {tag.label}
                    </span>
                  </Sample>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="09 · Wrap"
          title="Responsive wrap"
          description="flex-wrap keeps chips readable on mobile without horizontal page scroll."
        >
          <Sample label="flex flex-wrap gap-2">
            <div className="flex max-w-full flex-wrap gap-2">
              {[
                'Ultramarine deep',
                'Permanent rose',
                'Yellow ochre',
                'Raw umber',
                'Viridian',
                'Payne grey',
                'Titanium white',
                'Indigo',
                'Naples yellow',
                'Alizarin crimson',
                'Hooker green',
                'Sepia',
              ].map((label) => (
                <span
                  key={label}
                  className="badge badge-soft badge-neutral cursor-default"
                >
                  {label}
                </span>
              ))}
            </div>
          </Sample>
        </Section>
      </div>
    </>
  )
}
