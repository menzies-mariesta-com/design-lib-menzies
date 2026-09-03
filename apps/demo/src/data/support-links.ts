import type { ComponentType } from 'react'
import { ChartLine } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  Daisyui,
  GitHub,
  Lucide,
  ReactBrand,
  SimpleIcons,
  Tailwindcss,
  TypeScript,
  Vite,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands'

export type SupportLink = {
  name: string
  description: string
  supportLabel: string
  href: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  accentClass: string
}

/** Open-source libraries Wash UI depends on. Libraries first, Wash UI second. */
export const librarySupportLinks: SupportLink[] = [
  {
    name: 'React',
    description: 'Components, provider, and hooks',
    supportLabel: 'React Foundation',
    href: 'https://react.foundation/',
    icon: ReactBrand,
    accentClass: 'bg-info/10 text-info',
  },
  {
    name: 'TypeScript',
    description: 'Typed APIs across the monorepo',
    supportLabel: 'GitHub Sponsors',
    href: 'https://github.com/sponsors/microsoft',
    icon: TypeScript,
    accentClass: 'bg-primary/10 text-primary',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility layout and responsive tokens',
    supportLabel: 'Partner program',
    href: 'https://tailwindcss.com/sponsor',
    icon: Tailwindcss,
    accentClass: 'bg-accent/10 text-accent',
  },
  {
    name: 'daisyUI',
    description: 'Semantic components and theme slots',
    supportLabel: 'GitHub Sponsors',
    href: 'https://github.com/saadeghi/daisyui?sponsor=1',
    icon: Daisyui,
    accentClass: 'bg-secondary/10 text-secondary',
  },
  {
    name: 'Simple Icons',
    description: 'Brand SVG icons',
    supportLabel: 'GitHub Sponsors',
    href: 'https://github.com/sponsors/simple-icons',
    icon: SimpleIcons,
    accentClass: 'bg-neutral/10 text-neutral',
  },
  {
    name: 'Lucide',
    description: 'Tree-shakeable UI icon set',
    supportLabel: 'Open Collective',
    href: 'https://opencollective.com/lucide-icons',
    icon: Lucide,
    accentClass: 'bg-warning/10 text-warning',
  },
  {
    name: 'Vite',
    description: 'Library and demo build tooling',
    supportLabel: 'GitHub Sponsors',
    href: 'https://github.com/vitejs/vite?sponsor=1',
    icon: Vite,
    accentClass: 'bg-success/10 text-success',
  },
  {
    name: 'ApexCharts',
    description: 'Pigment-aware chart primitives',
    supportLabel: 'GitHub Sponsors',
    href: 'https://github.com/sponsors/apexcharts',
    icon: ChartLine,
    accentClass: 'bg-error/10 text-error',
  },
]

export const washUiSupportLink: SupportLink = {
  name: 'Wash UI',
  description: 'Menzies Design watercolor component library',
  supportLabel: 'Star on GitHub',
  href: 'https://github.com/menzies-mariesta-com/design-lib-menzies',
  icon: GitHub,
  accentClass: 'bg-primary/10 text-primary',
}
