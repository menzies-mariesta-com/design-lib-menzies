import { useState, type ReactNode } from 'react'
import {
  Calendar,
  Home,
  Layers,
  Paintbrush,
  Palette,
  Settings,
  Inbox,
} from 'menzies-design-wash-ui/icons'

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

/** Unfix dock so gallery demos stay inside the panel (not viewport). */
const dockDemo =
  'dock relative! left-auto right-auto bottom-auto z-0 w-full max-w-md rounded-box border border-ink-border/50 shadow-sm'

const sizes = [
  { name: 'xs', className: 'dock-xs' },
  { name: 'sm', className: 'dock-sm' },
  { name: 'md', className: 'dock-md' },
  { name: 'lg', className: 'dock-lg' },
  { name: 'xl', className: 'dock-xl' },
] as const

function DemoDock({
  className = '',
  active = 1,
  showLabels = true,
}: {
  className?: string
  active?: number
  showLabels?: boolean
}) {
  const items = [
    { label: 'Home', Icon: Home },
    { label: 'Inbox', Icon: Inbox },
    { label: 'Settings', Icon: Settings },
  ]

  return (
    <div className={`${dockDemo} ${className}`}>
      {items.map(({ label, Icon }, i) => (
        <button
          key={label}
          type="button"
          className={`cursor-pointer ${i === active ? 'dock-active' : ''}`}
          aria-current={i === active ? 'page' : undefined}
        >
          <Icon className="size-[1.2em]" strokeWidth={2} />
          {showLabels ? <span className="dock-label">{label}</span> : null}
        </button>
      ))}
    </div>
  )
}

const studioTools = [
  { id: 'palette', label: 'Palette', Icon: Palette },
  { id: 'layers', label: 'Layers', Icon: Layers },
  { id: 'brushes', label: 'Brushes', Icon: Paintbrush },
  { id: 'calendar', label: 'Calendar', Icon: Calendar },
] as const

function StudioDock() {
  const [active, setActive] = useState<(typeof studioTools)[number]['id']>('palette')
  const current = studioTools.find((t) => t.id === active) ?? studioTools[0]

  return (
    <div className="w-full max-w-md space-y-3">
      <p className="rounded-box border border-ink-border/50 bg-base-200/40 px-4 py-3 text-sm text-ink-muted">
        Selected: <span className="font-medium text-base-content">{current.label}</span>
      </p>
      <div className={dockDemo}>
        {studioTools.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={`cursor-pointer ${active === id ? 'dock-active' : ''}`}
            aria-current={active === id ? 'page' : undefined}
            onClick={() => setActive(id)}
          >
            <Icon className="size-[1.2em]" strokeWidth={2} />
            <span className="dock-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function DockPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Dock
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">dock</span> bottom
          navigation bar: sizes, active state, colors, and a studio tool strip.
          Demos below use <span className="font-mono text-xs">relative!</span>{' '}
          so they stay in the wash panel. Real apps keep{' '}
          <span className="font-mono text-xs">dock</span> fixed at the viewport
          bottom.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Icons and labels"
          description="Buttons inside dock. Each item pairs an icon with dock-label text."
        >
          <DemoDock />
          <p className="mt-3">
            <ClassLabel value="dock + button + dock-label" />
          </p>
        </Section>

        <Section
          eyebrow="02 · Active"
          title="Highlight one item"
          description="Add dock-active on the current destination. The underline indicator follows."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <div className="space-y-2">
              <ClassLabel value="dock-active on Home" />
              <DemoDock active={0} />
            </div>
            <div className="space-y-2">
              <ClassLabel value="dock-active on Inbox" />
              <DemoDock active={1} />
            </div>
            <div className="space-y-2">
              <ClassLabel value="dock-active on Settings" />
              <DemoDock active={2} />
            </div>
          </div>
          <p className="mt-3">
            <ClassLabel value="button.dock-active" />
          </p>
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="xs through xl"
          description="Size modifiers change bar height and label scale. xs and sm often omit labels."
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-5">
            {sizes.map(({ name, className }) => (
              <div key={name} className="space-y-2">
                <ClassLabel value={`dock ${className}`} />
                <DemoDock
                  className={className}
                  showLabels={name !== 'xs' && name !== 'sm'}
                />
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic fills and glass"
          description="Override background and text with daisyUI color utilities. Glass softens the bar over washes."
        >
          <div className="flex flex-col gap-5">
            <div className="space-y-2">
              <ClassLabel value="dock bg-neutral text-neutral-content" />
              <DemoDock className="bg-neutral text-neutral-content border-neutral" />
            </div>
            <div className="space-y-2">
              <ClassLabel value="dock bg-primary text-primary-content" />
              <DemoDock className="border-primary bg-primary text-primary-content" />
            </div>
            <div className="space-y-2">
              <ClassLabel value="dock bg-secondary text-secondary-content" />
              <DemoDock className="border-secondary bg-secondary text-secondary-content" />
            </div>
            <div className="space-y-2">
              <ClassLabel value="dock glass" />
              <div className="rounded-box bg-gradient-to-br from-wash-blue/40 via-base-200 to-wash-rose/30 p-3">
                <DemoDock className="glass border-base-content/10" />
              </div>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="05 · Studio dock"
          title="Watercolor tools"
          description="Interactive dock for palette, layers, brushes, and calendar. Click to change selection."
          panel="wash-panel-ochre"
        >
          <StudioDock />
          <p className="mt-3">
            <ClassLabel value="dock + Lucide icons + dock-active (state)" />
          </p>
        </Section>

        <Section
          eyebrow="06 · Placement note"
          title="Fixed in apps, relative in demos"
          description="Production docks stick to the screen bottom with safe-area padding. Gallery demos stay in-flow."
          panel="wash-panel-rose"
        >
          <ul className="list-inside list-disc space-y-2 text-sm text-ink-muted">
            <li>
              Default <span className="font-mono text-xs">dock</span> is{' '}
              <span className="font-mono text-xs">position: fixed</span> at the
              viewport bottom.
            </li>
            <li>
              Use{' '}
              <span className="font-mono text-xs">
                viewport-fit=cover
              </span>{' '}
              on iOS so safe-area insets apply.
            </li>
            <li>
              These wash-panel demos use{' '}
              <span className="font-mono text-xs">relative!</span> so they do not
              fight the studio drawer.
            </li>
          </ul>
          <p className="mt-3">
            <ClassLabel value="dock (fixed) vs dock relative! (demo)" />
          </p>
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Labels from sm up"
          description="Hide dock-label on very small widths; show them from the sm breakpoint."
        >
          <div className={`${dockDemo} max-w-full`}>
            <button type="button" className="dock-active cursor-pointer">
              <Home className="size-[1.2em]" strokeWidth={2} />
              <span className="dock-label hidden sm:inline">Home</span>
            </button>
            <button type="button" className="cursor-pointer">
              <Inbox className="size-[1.2em]" strokeWidth={2} />
              <span className="dock-label hidden sm:inline">Inbox</span>
            </button>
            <button type="button" className="cursor-pointer">
              <Settings className="size-[1.2em]" strokeWidth={2} />
              <span className="dock-label hidden sm:inline">Settings</span>
            </button>
          </div>
          <p className="mt-3">
            <ClassLabel value="dock-label hidden sm:inline" />
          </p>
        </Section>
      </div>
    </>
  )
}
