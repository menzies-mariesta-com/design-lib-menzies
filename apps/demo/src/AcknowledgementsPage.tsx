import { ExternalLink } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { WashPanel, WashUiBrand } from '@menzies-mariesta-com/menzies-design-wash-ui'

type LibraryEntry = {
  name: string
  href: string
  license: string
  note: string
}

type LibrarySection = {
  title: string
  description: string
  entries: LibraryEntry[]
}

const librarySections: LibrarySection[] = [
  {
    title: 'UI framework and styling',
    description:
      'Core rendering and component styling that Wash UI builds on and extends with pigment tokens.',
    entries: [
      {
        name: 'React',
        href: 'https://react.dev/',
        license: 'MIT',
        note: 'Powers the demo gallery, WashProvider, and every interactive component showcase.',
      },
      {
        name: 'daisyUI',
        href: 'https://daisyui.com/',
        license: 'MIT',
        note: 'Base component classes for buttons, cards, menus, forms, and layout primitives across the gallery.',
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        license: 'MIT',
        note: 'Utility layer for spacing, responsive layout, and Wash token composition in demo pages.',
      },
      {
        name: '@tailwindcss/vite',
        href: 'https://tailwindcss.com/docs/installation/using-vite',
        license: 'MIT',
        note: 'Vite plugin that wires Tailwind CSS 4 into the demo and Wash UI build pipelines.',
      },
    ],
  },
  {
    title: 'Charts',
    description: 'Analytics visuals wrapped as Wash chart components with pigment-aware defaults.',
    entries: [
      {
        name: 'ApexCharts',
        href: 'https://apexcharts.com/',
        license: 'MIT',
        note: 'Chart engine behind line, area, bar, pie, heatmap, and advanced Wash chart families.',
      },
      {
        name: 'react-apexcharts',
        href: 'https://github.com/apexcharts/react-apexcharts',
        license: 'MIT',
        note: 'React adapter used by Wash chart components to mount ApexCharts canvases.',
      },
    ],
  },
  {
    title: 'Icons and typography',
    description: 'Icon sets and mono faces used in navigation, galleries, and code previews.',
    entries: [
      {
        name: 'Lucide',
        href: 'https://lucide.dev/',
        license: 'ISC',
        note: 'Primary icon set re-exported from @menzies-mariesta-com/menzies-design-wash-ui/icons.',
      },
      {
        name: 'Simple Icons',
        href: 'https://simpleicons.org/',
        license: 'CC0 1.0',
        note: 'Brand marks for GitHub, npm, React, Vite, and other logos in Wash UI brand exports.',
      },
      {
        name: '@fontsource/maple-mono',
        href: 'https://fontsource.org/fonts/maple-mono',
        license: 'OFL-1.1',
        note: 'Self-hosted monospace face for code blocks and terminal-style template previews.',
      },
    ],
  },
  {
    title: 'Build and tooling',
    description: 'Compilers, bundlers, and linters that ship the demo site and Wash UI package.',
    entries: [
      {
        name: 'Vite',
        href: 'https://vite.dev/',
        license: 'MIT',
        note: 'Dev server and production bundler for the demo app and Wash UI library builds.',
      },
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org/',
        license: 'Apache-2.0',
        note: 'Static typing across demo pages, Wash UI source, and generated declaration files.',
      },
      {
        name: '@vitejs/plugin-react',
        href: 'https://github.com/vitejs/vite-plugin-react',
        license: 'MIT',
        note: 'Fast Refresh and JSX transform for React in Vite projects.',
      },
      {
        name: 'vite-plugin-dts',
        href: 'https://github.com/qmhc/vite-plugin-dts',
        license: 'MIT',
        note: 'Emits TypeScript declarations when building the Wash UI package.',
      },
      {
        name: 'oxlint',
        href: 'https://oxc.rs/docs/guide/usage/linter.html',
        license: 'MIT',
        note: 'Fast linter used by the demo app npm run lint script.',
      },
    ],
  },
  {
    title: 'Demo utilities',
    description: 'Focused libraries that support specific gallery pages in this demo.',
    entries: [
      {
        name: 'Cally',
        href: 'https://github.com/WickyNilliams/cally',
        license: 'MIT',
        note: 'Calendar range picker web component used by date and calendar demo pages.',
      },
      {
        name: 'qrcode.react',
        href: 'https://github.com/zpao/qrcode.react',
        license: 'ISC',
        note: 'QR code rendering for the QR code component gallery.',
      },
      {
        name: 'Shiki',
        href: 'https://shiki.style/',
        license: 'MIT',
        note: 'Syntax highlighting for HTML and JSX tabs in component showcase previews.',
      },
    ],
  },
]

const inspirationEntries: LibraryEntry[] = [
  {
    name: 'daisyUI component docs',
    href: 'https://daisyui.com/components/',
    license: 'MIT (upstream)',
    note: 'Gallery structure, class recipes, and component naming follow daisyUI patterns throughout Wash UI.',
  },
  {
    name: 'ApexCharts demo gallery',
    href: 'https://apexcharts.com/javascript-chart-demos/',
    license: 'MIT (upstream)',
    note: 'Chart category navigation and per-family demo pages mirror the ApexCharts gallery layout.',
  },
]

const libraryCount = librarySections.reduce(
  (total, section) => total + section.entries.length,
  0,
)

function LibraryCard({ entry }: { entry: LibraryEntry }) {
  return (
    <article className="card card-border border-ink-border/70 bg-base-100 shadow-none">
      <div className="card-body gap-2 p-4">
        <h3 className="card-title text-base font-semibold">
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 link link-hover cursor-pointer"
          >
            {entry.name}
            <ExternalLink className="size-3.5 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
          </a>
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">{entry.note}</p>
        <p className="text-xs text-base-content/60">
          License: <span className="font-mono">{entry.license}</span>
        </p>
      </div>
    </article>
  )
}

export default function AcknowledgementsPage() {
  return (
    <>
      <section className="wash-panel paper-grain mb-6 overflow-hidden soak-in">
        <div className="px-5 py-8 md:px-8 md:py-10">
          <p className="label-ink mb-2">Credits</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Acknowledgements
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
            <WashUiBrand /> is built on open source libraries and design references. This page
            lists every dependency used in the demo or Wash UI package, plus projects that
            shaped gallery structure and component patterns.
          </p>
          <p className="mt-3 text-xs text-base-content/60">
            Wash UI and this demo are licensed under{' '}
            <span className="font-mono">GPL-3.0-or-later</span>. Third-party licenses remain with
            their respective projects.
          </p>
        </div>
      </section>

      <div className="space-y-8">
        {librarySections.map((section) => (
          <section key={section.title} aria-labelledby={`ack-${section.title}`}>
            <WashPanel>
              <div className="border-b border-ink-border/70 px-5 py-4">
                <h2
                  id={`ack-${section.title}`}
                  className="font-display text-xl font-semibold md:text-2xl"
                >
                  {section.title}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{section.description}</p>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
                {section.entries.map((entry) => (
                  <LibraryCard key={entry.name} entry={entry} />
                ))}
              </div>
            </WashPanel>
          </section>
        ))}

        <section aria-labelledby="ack-inspired-heading">
          <WashPanel>
            <div className="border-b border-ink-border/70 px-5 py-4">
              <h2
                id="ack-inspired-heading"
                className="font-display text-xl font-semibold md:text-2xl"
              >
                Heavily inspired by
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Design systems and galleries whose structure informed Wash UI demos, not copied
                wholesale.
              </p>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {inspirationEntries.map((entry) => (
                <LibraryCard key={entry.name} entry={entry} />
              ))}
            </div>
          </WashPanel>
        </section>

        <p className="text-center text-xs text-base-content/50">
          {libraryCount} libraries listed across {librarySections.length} sections, plus{' '}
          {inspirationEntries.length} inspiration references.
        </p>
      </div>
    </>
  )
}
