import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  BadgeCheck,
  CircleCheck,
  CircleX,
  Droplets,
  Info,
  Layers,
  Paintbrush,
  TriangleAlert,
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
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-4\">\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-4\">\n            <Sample label=\"badge\">\n              <span className=\"badge cursor-default\">Badge</span>\n            </Sample>\n            <Sample label=\"badge (label)\">\n              <span className=\"badge cursor-default\">New</span>\n            </Sample>\n            <Sample label=\"badge (count)\">\n              <span className=\"badge cursor-default\">3</span>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="Default ink plus neutral, brand, and status colors."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-4\">\n            {colors.map((c) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-4\">\n            {colors.map((c) => (\n              <Sample\n                key={c.name}\n                label={c.className ? `badge ${c.className}` : 'badge'}\n              >\n                <span className={`badge cursor-default ${c.className}`.trim()}>\n                  {c.name}\n                </span>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="badge-xs through badge-xl. Wrap freely on narrow screens."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4 sm:gap-5">
                            {sizes.map((s) => (
                              <Sample key={s.name} label={`badge ${s.className}`}>
                                <span className={`badge cursor-default ${s.className}`}>
                                  {s.label}
                                </span>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-4 sm:gap-5\">\n            {sizes.map((s) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-4 sm:gap-5\">\n            {sizes.map((s) => (\n              <Sample key={s.name} label={`badge ${s.className}`}>\n                <span className={`badge cursor-default ${s.className}`}>\n                  {s.label}\n                </span>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="04 · Soft"
          title="Soft variant"
          description="badge-soft with each brand and status color."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-4\">\n            {styleColors.map((c) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-4\">\n            {styleColors.map((c) => (\n              <Sample key={c.name} label={`badge badge-soft ${c.className}`}>\n                <span\n                  className={`badge badge-soft cursor-default ${c.className}`}\n                >\n                  {c.name}\n                </span>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="05 · Outline"
          title="Outline variant"
          description="badge-outline for a lighter border treatment."
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-4\">\n            {styleColors.map((c) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-4\">\n            {styleColors.map((c) => (\n              <Sample key={c.name} label={`badge badge-outline ${c.className}`}>\n                <span\n                  className={`badge badge-outline cursor-default ${c.className}`}\n                >\n                  {c.name}\n                </span>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="06 · Dash"
          title="Dash variant"
          description="badge-dash uses a dashed outline."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-4\">\n            {styleColors.map((c) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-4\">\n            {styleColors.map((c) => (\n              <Sample key={c.name} label={`badge badge-dash ${c.className}`}>\n                <span\n                  className={`badge badge-dash cursor-default ${c.className}`}\n                >\n                  {c.name}\n                </span>\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="07 · Ghost"
          title="Ghost variant"
          description="badge-ghost for a quiet, low-contrast label."
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="badge badge-ghost">
                            <span className="badge badge-ghost cursor-default">ghost</span>
                          </Sample>
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"badge badge-ghost\">\n            <span className=\"badge badge-ghost cursor-default\">ghost</span>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="08 · Neutral outline / dash"
          title="Neutral on light ground"
          description="Neutral outline and dash use dark text. Best on a light wash."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"rounded-box border border-ink-border/70 bg-white p-4 sm:p-6\">\n            <div class=\"flex flex-wrap items-end gap-4\">\n              <!-- Sample -->\n              <!-- Sample -->\n            </div>\n          </div>"}
            jsx={"<div className=\"rounded-box border border-ink-border/70 bg-white p-4 sm:p-6\">\n            <div className=\"flex flex-wrap items-end gap-4\">\n              <Sample label=\"badge badge-neutral badge-outline\">\n                <span className=\"badge badge-neutral badge-outline cursor-default\">\n                  Outline\n                </span>\n              </Sample>\n              <Sample label=\"badge badge-neutral badge-dash\">\n                <span className=\"badge badge-neutral badge-dash cursor-default\">\n                  Dash\n                </span>\n              </Sample>\n            </div>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="09 · Variants × colors"
          title="Style matrix"
          description="Outline, dash, soft, and ghost across brand and status colors."
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-4\">\n            {styles.map((style) => (\n              <div key={style.name} class=\"flex flex-col gap-3\">\n                <p class=\"label-ink\">{style.name}</p>\n                {style.className === 'badge-ghost' ? (\n                  <!-- Sample -->\n                ) : (\n                  styleColors.map((c) => (\n                    <!-- Sample -->\n                  ))\n                )}\n              </div>\n            ))}\n          </div>"}
            jsx={"<div className=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-4\">\n            {styles.map((style) => (\n              <div key={style.name} className=\"flex flex-col gap-3\">\n                <p className=\"label-ink\">{style.name}</p>\n                {style.className === 'badge-ghost' ? (\n                  <Sample label=\"badge badge-ghost\">\n                    <span className=\"badge badge-ghost cursor-default\">\n                      Ghost\n                    </span>\n                  </Sample>\n                ) : (\n                  styleColors.map((c) => (\n                    <Sample\n                      key={`${style.name}-${c.name}`}\n                      label={`badge ${style.className} ${c.className}`}\n                    >\n                      <span\n                        className={`badge cursor-default ${style.className} ${c.className}`}\n                      >\n                        {c.name}\n                      </span>\n                    </Sample>\n                  ))\n                )}\n              </div>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="10 · Empty"
          title="Empty badges"
          description="Remove the text for a status dot. Size still applies."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-4\">\n            {(\n              [\n                'badge-xl',\n                'badge-lg',\n                'badge-md',\n                'badge-sm',\n                'badge-xs',\n              ] as const\n            ).map((size) => (\n              <!-- Sample -->\n            ))}\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-4\">\n            {(\n              [\n                'badge-xl',\n                'badge-lg',\n                'badge-md',\n                'badge-sm',\n                'badge-xs',\n              ] as const\n            ).map((size) => (\n              <Sample key={size} label={`badge badge-primary ${size}`}>\n                <span\n                  className={`badge badge-primary cursor-default ${size}`}\n                  aria-label={`Empty ${size}`}\n                />\n              </Sample>\n            ))}\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="11 · Icons"
          title="Badges with Lucide"
          description="Status badges with matching Lucide 1.28.0 icons."
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-4\">\n            {iconBadges.map(({ name, className, Icon }) => (\n              <!-- Sample -->\n            ))}\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-4\">\n            {iconBadges.map(({ name, className, Icon }) => (\n              <Sample key={name} label={`badge ${className} + Lucide`}>\n                <span className={`badge cursor-default ${className}`}>\n                  <Icon className=\"size-[1em]\" strokeWidth={2} aria-hidden />\n                  {name}\n                </span>\n              </Sample>\n            ))}\n            <Sample label=\"badge badge-primary + BadgeCheck\">\n              <span className=\"badge badge-primary cursor-default\">\n                <BadgeCheck className=\"size-[1em]\" strokeWidth={2} aria-hidden />\n                Verified\n              </span>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="12 · In text"
          title="Inline with headings"
          description="Pair badge size with surrounding type scale."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-col gap-3\">\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-col gap-3\">\n            <Sample label=\"text-xl + badge badge-xl\">\n              <h2 className=\"font-display text-xl font-semibold\">\n                Heading 1{' '}\n                <span className=\"badge badge-xl cursor-default\">Badge</span>\n              </h2>\n            </Sample>\n            <Sample label=\"text-lg + badge badge-lg\">\n              <h3 className=\"font-display text-lg font-semibold\">\n                Heading 2{' '}\n                <span className=\"badge badge-lg cursor-default\">Badge</span>\n              </h3>\n            </Sample>\n            <Sample label=\"text-base + badge badge-md\">\n              <h4 className=\"text-base font-semibold\">\n                Heading 3{' '}\n                <span className=\"badge badge-md cursor-default\">Badge</span>\n              </h4>\n            </Sample>\n            <Sample label=\"text-sm + badge badge-sm\">\n              <h5 className=\"text-sm font-semibold\">\n                Heading 4{' '}\n                <span className=\"badge badge-sm cursor-default\">Badge</span>\n              </h5>\n            </Sample>\n            <Sample label=\"text-xs + badge badge-xs\">\n              <p className=\"text-xs font-semibold\">\n                Heading 5{' '}\n                <span className=\"badge badge-xs cursor-default\">Badge</span>\n              </p>\n            </Sample>\n            <Sample label=\"paragraph + badge badge-xs\">\n              <p className=\"text-xs text-ink-muted\">\n                Paragraph{' '}\n                <span className=\"badge badge-xs cursor-default\">Badge</span>\n              </p>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="13 · In buttons"
          title="Nested in buttons"
          description="Small badges as counts inside interactive buttons."
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"flex flex-wrap items-end gap-4\">\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"flex flex-wrap items-end gap-4\">\n            <Sample label=\"btn + badge badge-sm\">\n              <button type=\"button\" className=\"btn cursor-pointer\">\n                Inbox\n                <span className=\"badge badge-sm cursor-default\">+99</span>\n              </button>\n            </Sample>\n            <Sample label=\"btn + badge badge-sm badge-secondary\">\n              <button type=\"button\" className=\"btn cursor-pointer\">\n                Inbox\n                <span className=\"badge badge-sm badge-secondary cursor-default\">\n                  +99\n                </span>\n              </button>\n            </Sample>\n            <Sample label=\"btn btn-primary + badge badge-sm badge-neutral\">\n              <button type=\"button\" className=\"btn btn-primary cursor-pointer\">\n                <BadgeCheck className=\"size-4\" strokeWidth={2} aria-hidden />\n                Series\n                <span className=\"badge badge-sm badge-neutral cursor-default\">\n                  12\n                </span>\n              </button>\n            </Sample>\n            <Sample label=\"btn btn-ghost + badge badge-xs badge-error\">\n              <button type=\"button\" className=\"btn btn-ghost cursor-pointer\">\n                Alerts\n                <span className=\"badge badge-xs badge-error cursor-default\">\n                  2\n                </span>\n              </button>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="14 · With avatars"
          title="Beside avatar placeholders"
          description="Role and presence chips next to studio avatars."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n            <!-- Sample -->\n            <!-- Sample -->\n            <!-- Sample -->\n          </div>"}
            jsx={"<div className=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n            <Sample label=\"avatar + badge badge-sm badge-primary\">\n              <div className=\"flex items-center gap-3\">\n                <div className=\"avatar avatar-placeholder\">\n                  <div className=\"w-10 rounded-full bg-wash-blue text-sm font-semibold\">\n                    <span>MK</span>\n                  </div>\n                </div>\n                <div className=\"min-w-0\">\n                  <p className=\"truncate text-sm font-semibold\">Maya K.</p>\n                  <span className=\"badge badge-sm badge-primary cursor-default\">\n                    Lead\n                  </span>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"avatar + badge badge-sm badge-success\">\n              <div className=\"flex items-center gap-3\">\n                <div className=\"avatar avatar-placeholder\">\n                  <div className=\"w-10 rounded-full bg-wash-rose text-sm font-semibold\">\n                    <span>JL</span>\n                  </div>\n                </div>\n                <div className=\"min-w-0\">\n                  <p className=\"truncate text-sm font-semibold\">Jules L.</p>\n                  <span className=\"badge badge-sm badge-success cursor-default\">\n                    Online\n                  </span>\n                </div>\n              </div>\n            </Sample>\n            <Sample label=\"avatar-group + badge badge-xs\">\n              <div className=\"flex flex-wrap items-center gap-3\">\n                <div className=\"avatar-group -space-x-4\">\n                  <div className=\"avatar avatar-placeholder\">\n                    <div className=\"w-8 rounded-full bg-wash-blue text-xs font-semibold\">\n                      <span>A</span>\n                    </div>\n                  </div>\n                  <div className=\"avatar avatar-placeholder\">\n                    <div className=\"w-8 rounded-full bg-wash-ochre text-xs font-semibold\">\n                      <span>B</span>\n                    </div>\n                  </div>\n                  <div className=\"avatar avatar-placeholder\">\n                    <div className=\"w-8 rounded-full bg-wash-rose text-xs font-semibold\">\n                      <span>C</span>\n                    </div>\n                  </div>\n                </div>\n                <span className=\"badge badge-xs badge-neutral cursor-default\">\n                  +4\n                </span>\n              </div>\n            </Sample>\n          </div>"}
          />
        
        </Section>

        <Section
          eyebrow="15 · In lists"
          title="List rows with status chips"
          description="badge-sm chips on daisyUI list-row items. Scrolls on small screens."
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<!-- Sample -->"}
            jsx={"<Sample label=\"list + list-row + badge badge-sm\">\n            <ul className=\"list max-w-full overflow-x-auto rounded-box border border-ink-border/70 bg-base-100\">\n              {plateRows.map((row) => (\n                <li key={row.title} className=\"list-row\">\n                  <div className=\"avatar avatar-placeholder\">\n                    <div\n                      className={`w-10 rounded-box text-sm font-semibold ${row.wash}`}\n                    >\n                      <span>{row.initials}</span>\n                    </div>\n                  </div>\n                  <div className=\"list-col-grow min-w-0\">\n                    <div className=\"font-semibold\">{row.title}</div>\n                    <div className=\"text-xs text-ink-muted\">{row.detail}</div>\n                  </div>\n                  <span\n                    className={`badge badge-sm cursor-default ${row.badgeClass}`}\n                  >\n                    {row.badge}\n                  </span>\n                </li>\n              ))}\n            </ul>\n          </Sample>"}
          />
        
        </Section>

        <Section
          eyebrow="16 · Studio"
          title="Pigment tags and wash chips"
          description="Soft pigment labels and wash-state chips for the desk."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
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
              </>
            }
            html={"<div class=\"space-y-6\">\n            <div>\n              <p class=\"label-ink mb-3\">Pigment tags</p>\n              <div class=\"flex flex-wrap gap-2 sm:gap-3\">\n                {pigmentTags.map((tag) => (\n                  <!-- Sample -->\n                ))}\n              </div>\n            </div>\n            <div>\n              <p class=\"label-ink mb-3\">Wash status chips</p>\n              <div class=\"flex flex-wrap gap-2 sm:gap-3\">\n                {washChips.map(({ name, className, Icon }) => (\n                  <!-- Sample -->\n                ))}\n              </div>\n            </div>\n            <div class=\"rounded-box border border-ink-border/70 bg-base-100/80 p-4 sm:p-5\">\n              <div class=\"flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between\">\n                <div class=\"min-w-0\">\n                  <p class=\"font-display text-lg font-semibold\">\n                    Plate 214 \u00b7 Morning fog\n                  </p>\n                  <p class=\"mt-1 text-sm text-ink-muted\">\n                    Cold wash, cerulean underpaint, hold before second layer.\n                  </p>\n                </div>\n                <div class=\"flex flex-wrap gap-2\">\n                  <span class=\"badge badge-soft badge-info cursor-default\">\n                    Wet\n                  </span>\n                  <span class=\"badge badge-outline badge-primary cursor-default\">\n                    Series A\n                  </span>\n                  <span class=\"badge badge-ghost cursor-default\">\n                    Draft\n                  </span>\n                </div>\n              </div>\n              <!-- ClassLabel -->\n            </div>\n          </div>"}
            jsx={"<div className=\"space-y-6\">\n            <div>\n              <p className=\"label-ink mb-3\">Pigment tags</p>\n              <div className=\"flex flex-wrap gap-2 sm:gap-3\">\n                {pigmentTags.map((tag) => (\n                  <Sample\n                    key={tag.name}\n                    label={`badge badge-soft ${tag.className}`}\n                  >\n                    <span\n                      className={`badge badge-soft cursor-default ${tag.className}`}\n                    >\n                      {tag.name}\n                    </span>\n                  </Sample>\n                ))}\n              </div>\n            </div>\n            <div>\n              <p className=\"label-ink mb-3\">Wash status chips</p>\n              <div className=\"flex flex-wrap gap-2 sm:gap-3\">\n                {washChips.map(({ name, className, Icon }) => (\n                  <Sample key={name} label={`badge ${className} + Lucide`}>\n                    <span className={`badge cursor-default ${className}`}>\n                      <Icon\n                        className=\"size-[1em]\"\n                        strokeWidth={2}\n                        aria-hidden\n                      />\n                      {name}\n                    </span>\n                  </Sample>\n                ))}\n              </div>\n            </div>\n            <div className=\"rounded-box border border-ink-border/70 bg-base-100/80 p-4 sm:p-5\">\n              <div className=\"flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between\">\n                <div className=\"min-w-0\">\n                  <p className=\"font-display text-lg font-semibold\">\n                    Plate 214 \u00b7 Morning fog\n                  </p>\n                  <p className=\"mt-1 text-sm text-ink-muted\">\n                    Cold wash, cerulean underpaint, hold before second layer.\n                  </p>\n                </div>\n                <div className=\"flex flex-wrap gap-2\">\n                  <span className=\"badge badge-soft badge-info cursor-default\">\n                    Wet\n                  </span>\n                  <span className=\"badge badge-outline badge-primary cursor-default\">\n                    Series A\n                  </span>\n                  <span className=\"badge badge-ghost cursor-default\">\n                    Draft\n                  </span>\n                </div>\n              </div>\n              <ClassLabel value=\"badge-soft / badge-outline / badge-ghost (studio card)\" />\n            </div>\n          </div>"}
          />
        
        </Section>
      </div>
    </>
  )
}
