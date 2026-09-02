import { useCallback, useEffect, useRef, useState } from 'react'
import { BookOpen, Sparkles } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { WashUiBrand } from '@menzies-mariesta-com/menzies-design-wash-ui'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

type DocSectionId = 'install' | 'theming' | 'components' | 'charts' | 'api'

const sidebarLinks: { id: DocSectionId; label: string }[] = [
  { id: 'install', label: 'Install' },
  { id: 'theming', label: 'Theming' },
  { id: 'components', label: 'Components' },
  { id: 'charts', label: 'Charts' },
  { id: 'api', label: 'API' },
]

function DocsLayoutPreview() {
  const [activeSection, setActiveSection] = useState<DocSectionId>('install')
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Partial<Record<DocSectionId, HTMLElement>>>({})

  const scrollToSection = useCallback((id: DocSectionId) => {
    setActiveSection(id)
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const root = contentRef.current
    if (!root) return

    const sections = sidebarLinks
      .map((link) => sectionRefs.current[link.id])
      .filter((el): el is HTMLElement => el != null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length === 0) return

        const id = visible[0].target.id.replace('docs-', '') as DocSectionId
        setActiveSection(id)
      },
      {
        root,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const section of sections) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="rounded-box border border-base-300 bg-base-100 shadow-sm">
      <div className="flex min-h-[22rem] flex-col lg:min-h-[28rem] lg:flex-row">
        <aside className="shrink-0 border-b border-base-300 bg-base-200/40 lg:sticky lg:top-0 lg:w-52 lg:self-start lg:border-b-0 lg:border-e">
          <div className="px-4 py-4 lg:max-h-[28rem] lg:overflow-y-auto">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="size-4 text-primary" strokeWidth={2} aria-hidden="true" />
              <h2 className="font-display text-sm font-semibold">Documentation</h2>
            </div>
            <ul className="menu menu-sm w-full gap-0.5 p-0">
              {sidebarLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    className={`cursor-pointer rounded-btn px-3 ${
                      activeSection === link.id ? 'bg-primary/40 font-medium' : ''
                    }`}
                    aria-current={activeSection === link.id ? 'true' : undefined}
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div
          ref={contentRef}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:max-h-[28rem]"
        >
          <article className="mx-auto max-w-prose space-y-8">
            <header>
              <WashUiBrand as="p" className="label-ink mb-1 text-xs" />
              <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                Studio pigment tokens
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Map wash pigments to CSS variables and paper modes. Use this
                layout for long-form docs with a sticky sidebar and scroll-synced highlights.
              </p>
            </header>

            <section
              id="docs-install"
              ref={(el) => {
                sectionRefs.current.install = el ?? undefined
              }}
              className={`scroll-mt-4 transition-colors ${
                activeSection === 'install'
                  ? 'border-s-4 border-primary ps-4'
                  : 'border-s-4 border-transparent ps-4'
              }`}
            >
              <h2 className="font-display text-lg font-semibold">Install</h2>
              <p className="mt-2 text-sm leading-relaxed text-base-content/90">
                Add the package and import the stylesheet once at your app entry.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-box bg-base-200 p-3 font-mono text-xs">
                <code>{`npm i @menzies-mariesta-com/menzies-design-wash-ui`}</code>
              </pre>
              <div className="alert alert-info mt-3 text-sm shadow-sm">
                <Sparkles className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  React apps also need <code className="font-mono text-xs">react</code> and{' '}
                  <code className="font-mono text-xs">react-dom</code> as peers.
                </span>
              </div>
            </section>

            <section
              id="docs-theming"
              ref={(el) => {
                sectionRefs.current.theming = el ?? undefined
              }}
              className={`scroll-mt-4 transition-colors ${
                activeSection === 'theming'
                  ? 'border-s-4 border-primary ps-4'
                  : 'border-s-4 border-transparent ps-4'
              }`}
            >
              <h2 className="font-display text-lg font-semibold">Theming</h2>
              <p className="mt-2 text-sm leading-relaxed text-base-content/90">
                Each pigment ships light and dark paper modes. Override tokens on{' '}
                <code className="font-mono text-xs">:root</code> or call{' '}
                <code className="font-mono text-xs">applyTheme</code> at runtime.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-box bg-base-200 p-3 font-mono text-xs">
                <code>{`:root {
  --wash-a: #d9eef5;
  --wash-b: #f2e1c6;
  --wash-c: #e8c9c3;
  --paper-fiber: #e8e1d4;
}`}</code>
              </pre>
            </section>

            <section
              id="docs-components"
              ref={(el) => {
                sectionRefs.current.components = el ?? undefined
              }}
              className={`scroll-mt-4 transition-colors ${
                activeSection === 'components'
                  ? 'border-s-4 border-primary ps-4'
                  : 'border-s-4 border-transparent ps-4'
              }`}
            >
              <h2 className="font-display text-lg font-semibold">Components</h2>
              <p className="mt-2 text-sm leading-relaxed text-base-content/90">
                Compose buttons, cards, and form controls from documented HTML classes or React
                exports. Pair with <code className="font-mono text-xs">WashProvider</code> for
                pigment context.
              </p>
              <div className="alert alert-info mt-3 text-sm shadow-sm">
                <Sparkles className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  Gallery pages in this demo mirror each component with Preview, HTML, and JSX
                  tabs.
                </span>
              </div>
            </section>

            <section
              id="docs-charts"
              ref={(el) => {
                sectionRefs.current.charts = el ?? undefined
              }}
              className={`scroll-mt-4 transition-colors ${
                activeSection === 'charts'
                  ? 'border-s-4 border-primary ps-4'
                  : 'border-s-4 border-transparent ps-4'
              }`}
            >
              <h2 className="font-display text-lg font-semibold">Charts</h2>
              <p className="mt-2 text-sm leading-relaxed text-base-content/90">
                Watercolor chart presets inherit pigment washes for fills, grids, and tooltips.
                Use narrative layouts when charts sit beside copy in docs like this one.
              </p>
            </section>

            <section
              id="docs-api"
              ref={(el) => {
                sectionRefs.current.api = el ?? undefined
              }}
              className={`scroll-mt-4 transition-colors ${
                activeSection === 'api'
                  ? 'border-s-4 border-primary ps-4'
                  : 'border-s-4 border-transparent ps-4'
              }`}
            >
              <h2 className="font-display text-lg font-semibold">API</h2>
              <p className="mt-2 text-sm leading-relaxed text-base-content/90">
                Deep imports for theme, icons, and core utilities. See entrypoint tables
                on Getting started for the full map.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-box bg-base-200 p-3 font-mono text-xs">
                <code>{`import { applyTheme } from '@menzies-mariesta-com/menzies-design-wash-ui/theme'
import { initWash } from '@menzies-mariesta-com/menzies-design-wash-ui/core'`}</code>
              </pre>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}

const docsLayoutHtml = `<div class="rounded-box border border-base-300 bg-base-100">
  <div class="flex min-h-[28rem] flex-col lg:flex-row">
    <aside class="shrink-0 border-b border-base-300 bg-base-200/40 lg:sticky lg:top-0 lg:w-52 lg:border-e">
      <div class="px-4 py-4">
        <h2 class="font-display text-sm font-semibold">Documentation</h2>
        <ul class="menu menu-sm w-full p-0">
          <li><a class="cursor-pointer bg-primary/40">Install</a></li>
          <li><a class="cursor-pointer">Theming</a></li>
          <li><a class="cursor-pointer">Components</a></li>
          <li><a class="cursor-pointer">Charts</a></li>
          <li><a class="cursor-pointer">API</a></li>
        </ul>
      </div>
    </aside>
    <div class="min-h-0 flex-1 overflow-y-auto px-6 py-5">
      <article class="max-w-prose space-y-8">
        <header>
          <h1 class="font-display text-2xl font-semibold">Studio pigment tokens</h1>
          <p class="text-sm text-ink-muted">Intro paragraph for the doc page.</p>
        </header>
        <section id="install" class="border-s-4 border-primary ps-4">
          <h2 class="font-display text-lg font-semibold">Install</h2>
          <pre class="mt-3 rounded-box bg-base-200 p-3 font-mono text-xs"><code>npm i @menzies/…</code></pre>
          <div class="alert alert-info mt-3 text-sm">Peer deps callout</div>
        </section>
        <section id="theming" class="border-s-4 border-transparent ps-4">
          <h2 class="font-display text-lg font-semibold">Theming</h2>
          <p class="text-sm">CSS variable overrides…</p>
        </section>
      </article>
    </div>
  </div>
</div>`

const docsLayoutJsx = `<aside className="shrink-0 lg:sticky lg:top-0 lg:w-52">
  <ul className="menu menu-sm">
    {sections.map((section) => (
      <li key={section.id}>
        <button
          type="button"
          className={\`cursor-pointer \${active === section.id ? 'bg-primary/40' : ''}\`}
          onClick={() => scrollToSection(section.id)}
        >
          {section.label}
        </button>
      </li>
    ))}
  </ul>
</aside>
<div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto">
  {sections.map((section) => (
    <section
      key={section.id}
      id={section.id}
      className={active === section.id ? 'border-s-4 border-primary ps-4' : 'ps-4'}
    >
      <h2>{section.title}</h2>
      {/* alert-info callouts, bg-base-200 code blocks */}
    </section>
  ))}
</div>`

export default function DocumentationLayoutTemplatePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Documentation layout
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Two-column docs shell with sticky sidebar navigation, scroll-synced active states, and
          highlighted content sections. Sample copy covers Wash theming and pigment tokens.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Docs shell"
          title="Sidebar + article with active highlights"
          description="Left TOC with bg-primary/40 on the active link. Right pane scrolls independently; the in-view section gets border-l-4 border-primary. Sidebar links smooth-scroll and update both highlights."
        >
          <ShowcaseTabs
            preview={<DocsLayoutPreview />}
            html={docsLayoutHtml}
            jsx={docsLayoutJsx}
          />
        </GallerySection>
      </div>
    </>
  )
}
