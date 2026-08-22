import type { ComponentType } from 'react'
import {
  ArrowRight,
  BookOpen,
  Brush,
  FolderOpen,
  KeyRound,
  Layers,
  MousePointerClick,
  Palette,
  Paintbrush,
  Sheet,
  Sparkles,
  SquareStack,
  SwatchBook,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { brushPresets, watercolorThemes } from '@menzies-mariesta-com/menzies-design-wash-ui'
import type { AppPage } from './nav'
import { componentNav, docsNav, templatesNav } from './nav'

type OverviewPageProps = {
  onNavigate: (page: AppPage) => void
}

type FeatureCard = {
  title: string
  description: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  panel: string
  page: AppPage
}

type QuickLink = {
  label: string
  description: string
  page: AppPage
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
}

const featureDelayClass = ['soak-delay-2', 'soak-delay-2', 'soak-delay-3', 'soak-delay-4'] as const

const featureCards: FeatureCard[] = [
  {
    title: 'Pigment theming',
    description:
      'Switch watercolor pigments and light or dark paper without leaving the page. Tokens stay consistent across every component.',
    icon: Palette,
    panel: 'wash-panel-ochre',
    page: 'docs-theming',
  },
  {
    title: 'Brush atmosphere',
    description:
      'Global brush presets shape wash load, edge bleed, and paper grain. One control paints the whole studio shell.',
    icon: Paintbrush,
    panel: 'wash-panel-rose',
    page: 'docs-brush',
  },
  {
    title: 'Production templates',
    description:
      'Auth shells and CRUD data tables ship as ready layouts. Copy patterns straight into product work.',
    icon: FolderOpen,
    panel: '',
    page: 'auth-screen',
  },
  {
    title: 'Framework-agnostic core',
    description:
      'Shared tokens, themes, and brush logic live in a core package. The React adapter wires them into this gallery.',
    icon: Layers,
    panel: '',
    page: 'docs-start',
  },
]

const quickLinks: QuickLink[] = [
  {
    label: 'Getting started',
    description: 'Install, first render, and project setup',
    page: 'docs-start',
    icon: BookOpen,
  },
  {
    label: 'Buttons',
    description: 'Primary actions, outlines, and wash ripples',
    page: 'buttons',
    icon: MousePointerClick,
  },
  {
    label: 'Cards',
    description: 'Paper panels, sizes, and bordered layouts',
    page: 'card',
    icon: SquareStack,
  },
  {
    label: 'Auth screen',
    description: 'Login and signup shells',
    page: 'auth-screen',
    icon: KeyRound,
  },
  {
    label: 'Data table',
    description: 'Filterable CRUD table template',
    page: 'data-table',
    icon: Sheet,
  },
  {
    label: 'Palette',
    description: 'Browse every pigment swatch',
    page: 'palette',
    icon: SwatchBook,
  },
]

const statItems = [
  {
    title: 'Component galleries',
    value: componentNav.length,
    desc: 'Interactive examples',
    icon: SquareStack,
    color: 'text-primary',
  },
  {
    title: 'Templates',
    value: templatesNav.length,
    desc: 'Auth and data layouts',
    icon: FolderOpen,
    color: 'text-secondary',
  },
  {
    title: 'Doc guides',
    value: docsNav.length,
    desc: 'Theming to customization',
    icon: BookOpen,
    color: 'text-accent',
  },
  {
    title: 'Pigment themes',
    value: watercolorThemes.length,
    desc: 'Light and dark paper',
    icon: Palette,
    color: 'text-warning',
  },
  {
    title: 'Brush presets',
    value: brushPresets.length,
    desc: 'Studio atmosphere tips',
    icon: Brush,
    color: 'text-info',
  },
]

export default function OverviewPage({ onNavigate }: OverviewPageProps) {
  return (
    <>
      <section className="wash-panel paper-grain mb-6 overflow-hidden soak-in">
        <div className="relative px-5 py-8 md:px-8 md:py-10">
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-90"
            aria-hidden
          >
            <span className="absolute -left-10 -top-12 size-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_65%,transparent)_0%,transparent_70%)] blur-2xl" />
            <span className="absolute -bottom-16 right-0 size-48 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-b)_55%,transparent)_0%,transparent_70%)] blur-2xl" />
            <span className="absolute right-1/4 top-1/3 size-32 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-c)_40%,transparent)_0%,transparent_70%)] blur-xl" />
          </div>

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-2xl">
              <p className="label-ink mb-2">Menzies Design</p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-base-content md:text-4xl lg:text-5xl">
                Wash UI design system
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                A watercolor-first component library with pigment themes, brush
                atmosphere, and production-ready templates. Explore{' '}
                {componentNav.length}+ galleries, switch themes live in the
                header, and ship interfaces that feel hand-painted on paper.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-primary cursor-pointer"
                  onClick={() => onNavigate('buttons')}
                >
                  Explore components
                  <ArrowRight className="size-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-secondary cursor-pointer"
                  onClick={() => onNavigate('docs-start')}
                >
                  Read docs
                </button>
                <button
                  type="button"
                  className="btn btn-ghost cursor-pointer"
                  onClick={() => onNavigate('auth-screen')}
                >
                  View templates
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:max-w-xs lg:justify-end">
              <span className="badge badge-soft badge-primary gap-1.5 px-3 py-3">
                <Sparkles className="size-3.5" strokeWidth={2} />
                Live theme switcher
              </span>
              <span className="badge badge-ghost gap-1.5 px-3 py-3">
                <Brush className="size-3.5" strokeWidth={2} />
                Global brush control
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="overview-stats-heading"
        className="stats stats-vertical mb-6 w-full border border-ink-border bg-base-100 shadow-none soak-in soak-delay-1 sm:stats-horizontal"
      >
        <h2 id="overview-stats-heading" className="sr-only">
          Library at a glance
        </h2>
        {statItems.map((item) => (
          <div key={item.title} className="stat">
            <div className={`stat-figure ${item.color}`}>
              <item.icon className="size-7 opacity-80" strokeWidth={1.5} />
            </div>
            <div className="stat-title">{item.title}</div>
            <div className="stat-value font-display text-3xl">{item.value}</div>
            <div className="stat-desc">{item.desc}</div>
          </div>
        ))}
      </section>

      <section aria-labelledby="overview-features-heading" className="mb-6">
        <div className="mb-4 soak-in soak-delay-2">
          <p className="label-ink mb-1">Why Wash UI</p>
          <h2
            id="overview-features-heading"
            className="font-display text-2xl font-semibold md:text-3xl"
          >
            Built for pigment, paper, and product
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
            Every layer of the system is tuned for studio workflows: color that
            reads on paper, atmosphere you can feel, and layouts you can ship.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card, index) => (
            <button
              key={card.title}
              type="button"
              className={`wash-panel paper-grain soak-in text-left transition-colors hover:border-primary/40 cursor-pointer ${card.panel} ${featureDelayClass[index] ?? 'soak-delay-4'}`}
              onClick={() => onNavigate(card.page)}
            >
              <div className="flex h-full flex-col p-5">
                <div className="bg-primary/10 text-primary mb-4 flex size-10 items-center justify-center rounded-box">
                  <card.icon className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {card.description}
                </p>
                <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                  Learn more
                  <ArrowRight className="size-3.5" strokeWidth={2} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="overview-nav-heading" className="mb-6">
        <article className="wash-panel paper-grain soak-in soak-delay-3 overflow-hidden">
          <div className="border-b border-ink-border/70 px-5 py-4">
            <p className="label-ink">Quick navigation</p>
            <h2
              id="overview-nav-heading"
              className="font-display text-xl font-semibold md:text-2xl"
            >
              Jump into the gallery
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Docs, templates, and popular component pages. Use the sidebar or
              press{' '}
              <kbd className="kbd kbd-sm font-mono">Ctrl</kbd>
              {' + '}
              <kbd className="kbd kbd-sm font-mono">K</kbd> to search everything.
            </p>
          </div>

          <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <button
                key={link.page}
                type="button"
                className="flex cursor-pointer items-start gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-4 py-3 text-left transition-colors hover:border-primary/50 hover:bg-primary/5"
                onClick={() => onNavigate(link.page)}
              >
                <span className="bg-base-200 text-base-content flex size-9 shrink-0 items-center justify-center rounded-box">
                  <link.icon className="size-4" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{link.label}</span>
                  <span className="mt-0.5 block text-xs text-ink-muted">
                    {link.description}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-ink-border/70 px-5 py-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline cursor-pointer"
                onClick={() => onNavigate('docs-theming')}
              >
                Theming guide
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline cursor-pointer"
                onClick={() => onNavigate('brushes')}
              >
                Brush library
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline cursor-pointer"
                onClick={() => onNavigate('data-table')}
              >
                Data table template
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline cursor-pointer"
                onClick={() => onNavigate('navbar')}
              >
                Navbar gallery
              </button>
            </div>
          </div>
        </article>
      </section>

      <section aria-labelledby="overview-explore-heading">
        <article className="wash-panel wash-panel-ochre paper-grain soak-in soak-delay-4 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="label-ink mb-1">Start exploring</p>
              <h2
                id="overview-explore-heading"
                className="font-display text-xl font-semibold md:text-2xl"
              >
                Everything in one studio desk
              </h2>
              <p className="mt-2 max-w-xl text-sm text-ink-muted">
                {docsNav.length} documentation guides, {templatesNav.length}{' '}
                templates, and {componentNav.length} component galleries. Switch
                pigment and brush from the header, then open any page to see Wash
                UI on paper.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary shrink-0 cursor-pointer"
              onClick={() => onNavigate('buttons')}
            >
              Open component gallery
              <ArrowRight className="size-4" strokeWidth={2} />
            </button>
          </div>
        </article>
      </section>
    </>
  )
}
