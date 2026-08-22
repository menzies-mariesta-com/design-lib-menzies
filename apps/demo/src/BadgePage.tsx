import type { ReactNode } from 'react'
import {
  BadgeCheck,
  CircleCheck,
  CircleX,
  Droplets,
  Info,
  Layers,
  Paintbrush,
  TriangleAlert,
} from 'menzies-design-wash-ui/icons'

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

const iconBadges = [
  { name: 'Info', className: 'badge-info', Icon: Info },
  { name: 'Success', className: 'badge-success', Icon: CircleCheck },
  { name: 'Warning', className: 'badge-warning', Icon: TriangleAlert },
  { name: 'Error', className: 'badge-error', Icon: CircleX },
] as const

const pigmentTags = [
  { name: 'Ultramarine', className: 'badge-primary' },
  { name: 'Quinacridone', className: 'badge-secondary' },
  { name: 'Sap green', className: 'badge-accent' },
  { name: 'Raw sienna', className: 'badge-warning' },
  { name: 'Payne gray', className: 'badge-neutral' },
  { name: 'Cerulean', className: 'badge-info' },
] as const

const washChips = [
  { name: 'Wet', className: 'badge-soft badge-info', Icon: Droplets },
  { name: 'Drying', className: 'badge-soft badge-warning', Icon: Layers },
  { name: 'Dry', className: 'badge-soft badge-success', Icon: CircleCheck },
  { name: 'Glaze ready', className: 'badge-soft badge-primary', Icon: Paintbrush },
  { name: 'Hold', className: 'badge-outline badge-neutral', Icon: TriangleAlert },
] as const

const plateRows = [
  {
    initials: 'UB',
    wash: 'wash-blue',
    title: 'Ultramarine study',
    detail: 'Cold wash, two layers',
    badge: 'Wet',
    badgeClass: 'badge-info',
  },
  {
    initials: 'QR',
    wash: 'wash-rose',
    title: 'Quinacridone rose',
    detail: 'Warm glaze pending',
    badge: 'Drying',
    badgeClass: 'badge-warning',
  },
  {
    initials: 'SG',
    wash: 'wash-ochre',
    title: 'Sap green field',
    detail: 'Ready for detail',
    badge: 'Dry',
    badgeClass: 'badge-success',
  },
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

export default function BadgePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Badge
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">badge</span> colors,
          sizes, and styles. Lucide icons, nested demos in buttons, avatars, and
          lists, plus studio pigment tags.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Default badges"
          description="Plain badge with no color or style modifier."
        >
          <div className="flex flex-wrap items-end gap-4">
            <Sample label="badge">
              <span className="badge cursor-default">Badge</span>
            </Sample>
            <Sample label="badge (label)">
              <span className="badge cursor-default">New</span>
            </Sample>
            <Sample label="badge (count)">
              <span className="badge cursor-default">3</span>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="Default ink plus neutral, brand, and status colors."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end gap-4">
            {colors.map((c) => (
              <Sample
                key={c.name}
                label={c.className ? `badge ${c.className}` : 'badge'}
              >
                <span className={`badge cursor-default ${c.className}`.trim()}>
                  {c.name}
                </span>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="badge-xs through badge-xl. Wrap freely on narrow screens."
        >
          <div className="flex flex-wrap items-end gap-4 sm:gap-5">
            {sizes.map((s) => (
              <Sample key={s.name} label={`badge ${s.className}`}>
                <span className={`badge cursor-default ${s.className}`}>
                  {s.label}
                </span>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Soft"
          title="Soft variant"
          description="badge-soft with each brand and status color."
          panel="wash-panel-rose"
        >
          <div className="flex flex-wrap items-end gap-4">
            {styleColors.map((c) => (
              <Sample key={c.name} label={`badge badge-soft ${c.className}`}>
                <span
                  className={`badge badge-soft cursor-default ${c.className}`}
                >
                  {c.name}
                </span>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Outline"
          title="Outline variant"
          description="badge-outline for a lighter border treatment."
        >
          <div className="flex flex-wrap items-end gap-4">
            {styleColors.map((c) => (
              <Sample key={c.name} label={`badge badge-outline ${c.className}`}>
                <span
                  className={`badge badge-outline cursor-default ${c.className}`}
                >
                  {c.name}
                </span>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="06 · Dash"
          title="Dash variant"
          description="badge-dash uses a dashed outline."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end gap-4">
            {styleColors.map((c) => (
              <Sample key={c.name} label={`badge badge-dash ${c.className}`}>
                <span
                  className={`badge badge-dash cursor-default ${c.className}`}
                >
                  {c.name}
                </span>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="07 · Ghost"
          title="Ghost variant"
          description="badge-ghost for a quiet, low-contrast label."
        >
          <Sample label="badge badge-ghost">
            <span className="badge badge-ghost cursor-default">ghost</span>
          </Sample>
        </Section>

        <Section
          eyebrow="08 · Neutral outline / dash"
          title="Neutral on light ground"
          description="Neutral outline and dash use dark text. Best on a light wash."
          panel="wash-panel-rose"
        >
          <div className="rounded-box border border-ink-border/70 bg-white p-4 sm:p-6">
            <div className="flex flex-wrap items-end gap-4">
              <Sample label="badge badge-neutral badge-outline">
                <span className="badge badge-neutral badge-outline cursor-default">
                  Outline
                </span>
              </Sample>
              <Sample label="badge badge-neutral badge-dash">
                <span className="badge badge-neutral badge-dash cursor-default">
                  Dash
                </span>
              </Sample>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="09 · Variants × colors"
          title="Style matrix"
          description="Outline, dash, soft, and ghost across brand and status colors."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {styles.map((style) => (
              <div key={style.name} className="flex flex-col gap-3">
                <p className="label-ink">{style.name}</p>
                {style.className === 'badge-ghost' ? (
                  <Sample label="badge badge-ghost">
                    <span className="badge badge-ghost cursor-default">
                      Ghost
                    </span>
                  </Sample>
                ) : (
                  styleColors.map((c) => (
                    <Sample
                      key={`${style.name}-${c.name}`}
                      label={`badge ${style.className} ${c.className}`}
                    >
                      <span
                        className={`badge cursor-default ${style.className} ${c.className}`}
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
          eyebrow="10 · Empty"
          title="Empty badges"
          description="Remove the text for a status dot. Size still applies."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end gap-4">
            {(
              [
                'badge-xl',
                'badge-lg',
                'badge-md',
                'badge-sm',
                'badge-xs',
              ] as const
            ).map((size) => (
              <Sample key={size} label={`badge badge-primary ${size}`}>
                <span
                  className={`badge badge-primary cursor-default ${size}`}
                  aria-label={`Empty ${size}`}
                />
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="11 · Icons"
          title="Badges with Lucide"
          description="Status badges with matching Lucide 1.28.0 icons."
        >
          <div className="flex flex-wrap items-end gap-4">
            {iconBadges.map(({ name, className, Icon }) => (
              <Sample key={name} label={`badge ${className} + Lucide`}>
                <span className={`badge cursor-default ${className}`}>
                  <Icon className="size-[1em]" strokeWidth={2} aria-hidden />
                  {name}
                </span>
              </Sample>
            ))}
            <Sample label="badge badge-primary + BadgeCheck">
              <span className="badge badge-primary cursor-default">
                <BadgeCheck className="size-[1em]" strokeWidth={2} aria-hidden />
                Verified
              </span>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="12 · In text"
          title="Inline with headings"
          description="Pair badge size with surrounding type scale."
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-3">
            <Sample label="text-xl + badge badge-xl">
              <h2 className="font-display text-xl font-semibold">
                Heading 1{' '}
                <span className="badge badge-xl cursor-default">Badge</span>
              </h2>
            </Sample>
            <Sample label="text-lg + badge badge-lg">
              <h3 className="font-display text-lg font-semibold">
                Heading 2{' '}
                <span className="badge badge-lg cursor-default">Badge</span>
              </h3>
            </Sample>
            <Sample label="text-base + badge badge-md">
              <h4 className="text-base font-semibold">
                Heading 3{' '}
                <span className="badge badge-md cursor-default">Badge</span>
              </h4>
            </Sample>
            <Sample label="text-sm + badge badge-sm">
              <h5 className="text-sm font-semibold">
                Heading 4{' '}
                <span className="badge badge-sm cursor-default">Badge</span>
              </h5>
            </Sample>
            <Sample label="text-xs + badge badge-xs">
              <p className="text-xs font-semibold">
                Heading 5{' '}
                <span className="badge badge-xs cursor-default">Badge</span>
              </p>
            </Sample>
            <Sample label="paragraph + badge badge-xs">
              <p className="text-xs text-ink-muted">
                Paragraph{' '}
                <span className="badge badge-xs cursor-default">Badge</span>
              </p>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="13 · In buttons"
          title="Nested in buttons"
          description="Small badges as counts inside interactive buttons."
        >
          <div className="flex flex-wrap items-end gap-4">
            <Sample label="btn + badge badge-sm">
              <button type="button" className="btn cursor-pointer">
                Inbox
                <span className="badge badge-sm cursor-default">+99</span>
              </button>
            </Sample>
            <Sample label="btn + badge badge-sm badge-secondary">
              <button type="button" className="btn cursor-pointer">
                Inbox
                <span className="badge badge-sm badge-secondary cursor-default">
                  +99
                </span>
              </button>
            </Sample>
            <Sample label="btn btn-primary + badge badge-sm badge-neutral">
              <button type="button" className="btn btn-primary cursor-pointer">
                <BadgeCheck className="size-4" strokeWidth={2} aria-hidden />
                Series
                <span className="badge badge-sm badge-neutral cursor-default">
                  12
                </span>
              </button>
            </Sample>
            <Sample label="btn btn-ghost + badge badge-xs badge-error">
              <button type="button" className="btn btn-ghost cursor-pointer">
                Alerts
                <span className="badge badge-xs badge-error cursor-default">
                  2
                </span>
              </button>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="14 · With avatars"
          title="Beside avatar placeholders"
          description="Role and presence chips next to studio avatars."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Sample label="avatar + badge badge-sm badge-primary">
              <div className="flex items-center gap-3">
                <div className="avatar avatar-placeholder">
                  <div className="w-10 rounded-full bg-wash-blue text-sm font-semibold">
                    <span>MK</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Maya K.</p>
                  <span className="badge badge-sm badge-primary cursor-default">
                    Lead
                  </span>
                </div>
              </div>
            </Sample>
            <Sample label="avatar + badge badge-sm badge-success">
              <div className="flex items-center gap-3">
                <div className="avatar avatar-placeholder">
                  <div className="w-10 rounded-full bg-wash-rose text-sm font-semibold">
                    <span>JL</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Jules L.</p>
                  <span className="badge badge-sm badge-success cursor-default">
                    Online
                  </span>
                </div>
              </div>
            </Sample>
            <Sample label="avatar-group + badge badge-xs">
              <div className="flex flex-wrap items-center gap-3">
                <div className="avatar-group -space-x-4">
                  <div className="avatar avatar-placeholder">
                    <div className="w-8 rounded-full bg-wash-blue text-xs font-semibold">
                      <span>A</span>
                    </div>
                  </div>
                  <div className="avatar avatar-placeholder">
                    <div className="w-8 rounded-full bg-wash-ochre text-xs font-semibold">
                      <span>B</span>
                    </div>
                  </div>
                  <div className="avatar avatar-placeholder">
                    <div className="w-8 rounded-full bg-wash-rose text-xs font-semibold">
                      <span>C</span>
                    </div>
                  </div>
                </div>
                <span className="badge badge-xs badge-neutral cursor-default">
                  +4
                </span>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="15 · In lists"
          title="List rows with status chips"
          description="badge-sm chips on daisyUI list-row items. Scrolls on small screens."
        >
          <Sample label="list + list-row + badge badge-sm">
            <ul className="list max-w-full overflow-x-auto rounded-box border border-ink-border/70 bg-base-100">
              {plateRows.map((row) => (
                <li key={row.title} className="list-row">
                  <div className="avatar avatar-placeholder">
                    <div
                      className={`w-10 rounded-box text-sm font-semibold ${row.wash}`}
                    >
                      <span>{row.initials}</span>
                    </div>
                  </div>
                  <div className="list-col-grow min-w-0">
                    <div className="font-semibold">{row.title}</div>
                    <div className="text-xs text-ink-muted">{row.detail}</div>
                  </div>
                  <span
                    className={`badge badge-sm cursor-default ${row.badgeClass}`}
                  >
                    {row.badge}
                  </span>
                </li>
              ))}
            </ul>
          </Sample>
        </Section>

        <Section
          eyebrow="16 · Studio"
          title="Pigment tags and wash chips"
          description="Soft pigment labels and wash-state chips for the desk."
          panel="wash-panel-rose"
        >
          <div className="space-y-6">
            <div>
              <p className="label-ink mb-3">Pigment tags</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {pigmentTags.map((tag) => (
                  <Sample
                    key={tag.name}
                    label={`badge badge-soft ${tag.className}`}
                  >
                    <span
                      className={`badge badge-soft cursor-default ${tag.className}`}
                    >
                      {tag.name}
                    </span>
                  </Sample>
                ))}
              </div>
            </div>
            <div>
              <p className="label-ink mb-3">Wash status chips</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {washChips.map(({ name, className, Icon }) => (
                  <Sample key={name} label={`badge ${className} + Lucide`}>
                    <span className={`badge cursor-default ${className}`}>
                      <Icon
                        className="size-[1em]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {name}
                    </span>
                  </Sample>
                ))}
              </div>
            </div>
            <div className="rounded-box border border-ink-border/70 bg-base-100/80 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold">
                    Plate 214 · Morning fog
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    Cold wash, cerulean underpaint, hold before second layer.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-soft badge-info cursor-default">
                    Wet
                  </span>
                  <span className="badge badge-outline badge-primary cursor-default">
                    Series A
                  </span>
                  <span className="badge badge-ghost cursor-default">
                    Draft
                  </span>
                </div>
              </div>
              <ClassLabel value="badge-soft / badge-outline / badge-ghost (studio card)" />
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
