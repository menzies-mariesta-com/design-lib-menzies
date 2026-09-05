import type { ComponentType } from 'react'
import {
  ArrowRight,
  BookOpen,
  ChartLine,
  FolderOpen,
  Palette,
  SquareStack,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  Daisyui,
  Lucide,
  ReactBrand,
  SimpleIcons,
  Tailwindcss,
  TypeScript,
  Vite,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands'
import { watercolorThemes, WashUiBrand } from '@menzies-mariesta-com/menzies-design-wash-ui'
import type { AppPage } from './nav'
import { chartsNav, componentNav, docsNav, templatesNav } from './nav'

type OverviewPageProps = {
  onNavigate: (page: AppPage) => void
}

type AcknowledgeLibrary = {
  name: string
  description: string
  href: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  accentClass: string
}

const acknowledgeLibraries: AcknowledgeLibrary[] = [
  {
    name: 'React',
    description: 'Components, provider, and hooks',
    href: 'https://react.dev',
    icon: ReactBrand,
    accentClass: 'bg-info/10 text-info',
  },
  {
    name: 'TypeScript',
    description: 'Typed APIs across the monorepo',
    href: 'https://www.typescriptlang.org',
    icon: TypeScript,
    accentClass: 'bg-primary/10 text-primary',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility layout and responsive tokens',
    href: 'https://tailwindcss.com',
    icon: Tailwindcss,
    accentClass: 'bg-accent/10 text-accent',
  },
  {
    name: 'daisyUI',
    description: 'Semantic components and theme slots',
    href: 'https://daisyui.com',
    icon: Daisyui,
    accentClass: 'bg-secondary/10 text-secondary',
  },
  {
    name: 'Simple Icons',
    description: 'Brand SVG icons',
    href: 'https://simpleicons.org',
    icon: SimpleIcons,
    accentClass: 'bg-neutral/10 text-neutral',
  },
  {
    name: 'Lucide',
    description: 'Tree-shakeable UI icon set',
    href: 'https://lucide.dev',
    icon: Lucide,
    accentClass: 'bg-warning/10 text-warning',
  },
  {
    name: 'Vite',
    description: 'Library and demo build tooling',
    href: 'https://vite.dev',
    icon: Vite,
    accentClass: 'bg-success/10 text-success',
  },
  {
    name: 'ApexCharts',
    description: 'Pigment-aware chart primitives',
    href: 'https://apexcharts.com',
    icon: ChartLine,
    accentClass: 'bg-error/10 text-error',
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
    title: 'Chart galleries',
    value: chartsNav.length,
    desc: 'Pigment-aware analytics',
    icon: ChartLine,
    color: 'text-info',
  },
]

export default function OverviewPage({ onNavigate }: OverviewPageProps) {
  return (
    <>
      <section className="wash-panel wash-panel-flush paper-grain mb-6 overflow-hidden soak-in">
        <div className="relative px-5 py-8 md:px-8 md:py-10">
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-90"
            aria-hidden
          >
            <span className="absolute -left-10 -top-12 size-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_65%,transparent)_0%,transparent_70%)] blur-2xl" />
            <span className="absolute -bottom-16 right-0 size-48 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-b)_55%,transparent)_0%,transparent_70%)] blur-2xl" />
            <span className="absolute right-1/4 top-1/3 size-32 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-c)_40%,transparent)_0%,transparent_70%)] blur-xl" />
          </div>

          <div className="relative z-10 min-w-0 max-w-2xl">
            <p className="label-ink mb-2">Menzies Design</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-base-content md:text-4xl lg:text-5xl">
              <WashUiBrand />
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
              A watercolor-first component library with pigment themes and
              production-ready templates.
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

      <section aria-labelledby="overview-acknowledge-heading" className="mb-6">
        <article className="wash-panel wash-panel-flush paper-grain soak-in soak-delay-2 overflow-hidden">
          <div className="border-b border-ink-border/70 px-5 py-4">
            <p className="label-ink">Acknowledge</p>
            <h2
              id="overview-acknowledge-heading"
              className="font-display text-xl font-semibold md:text-2xl"
            >
              Built on open libraries
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Brands via Simple Icons. UI glyphs via Lucide.
            </p>
          </div>

          <ul className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {acknowledgeLibraries.map((library) => (
              <li key={library.name}>
                <a
                  href={library.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full cursor-pointer items-start gap-3 rounded-box border border-ink-border/70 bg-base-100/80 px-4 py-3 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-box ${library.accentClass}`}
                  >
                    <library.icon className="size-4" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{library.name}</span>
                    <span className="mt-0.5 block text-xs text-ink-muted">
                      {library.description}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  )
}
