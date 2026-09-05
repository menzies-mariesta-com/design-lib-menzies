import { useState } from 'react'
import { CircleX } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import type { AppPage } from './nav'
import StoreShowcaseCard from './StoreShowcaseCard'
import docsTemplateDocs from './assets/store/docs-template-docs.jpg'
import docsTemplateHome from './assets/store/docs-template-home.jpg'
import docsTemplateTheming from './assets/store/docs-template-theming.jpg'

type StorePagePageProps = {
  onNavigate: (page: AppPage) => void
}

type ToastState = { kind: 'error'; message: string } | null

const DOCS_SLIDES = [
  {
    id: 'store-docs-slide-1',
    src: docsTemplateDocs,
    alt: 'Documentation Website: Getting started with sidebar, search, breadcrumbs, and On this page TOC',
  },
  {
    id: 'store-docs-slide-2',
    src: docsTemplateTheming,
    alt: 'Documentation Website: Theming guide with pigment APIs, persistence keys, and On this page TOC',
  },
  {
    id: 'store-docs-slide-3',
    src: docsTemplateHome,
    alt: 'Documentation Website: marketing home hero with Wash UI brand',
  },
] as const

/** Payhip product page for the Documentation Website template. */
const DOCS_TEMPLATE_PAYHIP_URL = 'https://payhip.com/b/bq4A6'

function DocsScreenshot({
  src,
  alt,
  size = 'dialog',
}: {
  src: string
  alt: string
  size?: 'cover' | 'dialog'
}) {
  const sizeClass =
    size === 'cover'
      ? 'aspect-[16/10] min-h-56 max-h-72 sm:min-h-64 sm:max-h-80'
      : 'max-h-[28rem]'

  return (
    <img
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      className={`block w-full bg-base-200 object-cover object-top ${sizeClass}`}
      loading="lazy"
      decoding="async"
    />
  )
}

/** daisyUI carousel (next/prev) from the Components → Carousel gallery. */
function DocsDialogGallery() {
  const n = DOCS_SLIDES.length

  return (
    <div className="carousel w-full">
      {DOCS_SLIDES.map((slide, index) => {
        const prev = index === 0 ? n : index
        const next = index === n - 1 ? 1 : index + 2
        return (
          <div
            key={slide.id}
            id={slide.id}
            className="carousel-item relative w-full"
          >
            <DocsScreenshot src={slide.src} alt={slide.alt} />
            <div className="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#store-docs-slide-${prev}`}
                className="btn btn-circle cursor-pointer"
                aria-label="Previous slide"
              >
                ❮
              </a>
              <a
                href={`#store-docs-slide-${next}`}
                className="btn btn-circle cursor-pointer"
                aria-label="Next slide"
              >
                ❯
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function StorePagePage(_props: StorePagePageProps) {
  const [toast, setToast] = useState<ToastState>(null)

  const showToast = (next: Exclude<ToastState, null>) => {
    setToast(next)
    window.setTimeout(() => setToast(null), 3200)
  }

  const handleUnlock = async () => {
    // Open during the click gesture so popup blockers allow the Payhip tab.
    const checkout = window.open(
      DOCS_TEMPLATE_PAYHIP_URL,
      '_blank',
      'noopener,noreferrer',
    )
    // Brief busy state so Unlock shows a real loading button before the dialog closes.
    await new Promise((resolve) => window.setTimeout(resolve, 450))
    if (!checkout) {
      showToast({
        kind: 'error',
        message:
          'Could not open checkout. Allow popups for this site, or visit payhip.com/b/bq4A6.',
      })
    }
  }

  return (
    <div className="relative space-y-6">
      <header className="soak-in">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-base-content md:text-4xl">
          Page
        </h1>
      </header>

      <section aria-labelledby="store-page-showcase-heading" className="soak-in soak-delay-1">
        <h2 id="store-page-showcase-heading" className="sr-only">
          Documentation template showcase
        </h2>
        <StoreShowcaseCard
          title="Documentation Website"
          priceLabel="10"
          cover={
            <DocsScreenshot
              src={docsTemplateDocs}
              alt="Documentation Website cover: Getting started docs with sidebar, install steps, and On this page TOC"
              size="cover"
            />
          }
          subtitle="Ready-to-ship SvelteKit documentation site: marketing home, Markdown docs, Cmd+K search, pigment themes, and Netlify deploy."
          dialogPreview={<DocsDialogGallery />}
          highlights={[
            'Docs shell: sidebar, breadcrumbs, TOC, prev/next',
            'Command search (Ctrl / ⌘ K) over every page',
            'Theme chrome: paper mode + Wash pigment picker',
            'Markdown, Shiki, SEO, and Netlify-ready deploy',
          ]}
          sellingPoints={[
            {
              title: 'Brand home into docs.',
              detail:
                'Marketing home with Wash branding and a clear path into Getting started, guides, and reference.',
            },
            {
              title: 'Docs shell that ships.',
              detail:
                'Collapsible sidebar, breadcrumbs, TOC, and prev/next so Markdown under src/content/docs/ feels like a product, not a wiki dump.',
            },
            {
              title: 'Search and themes.',
              detail:
                'Ctrl / ⌘ K command search, light/dark paper mode, and thirty Wash pigments in the chrome.',
            },
            {
              title: 'SEO and Netlify.',
              detail:
                'Titles, Open Graph, sitemap, robots, JSON-LD, and @sveltejs/adapter-netlify with netlify.toml included.',
            },
            {
              title: 'Lifetime support.',
              detail:
                'Updates as Wash UI and the docs shell evolve, issue fixes for as long as you use it, and help customizing brand, content structure, and chrome to fit your product.',
            },
          ]}
          primaryCtaLabel="Unlock template"
          onPrimaryCta={handleUnlock}
        />
      </section>

      {toast ? (
        <div className="toast toast-bottom toast-end z-[100]">
          <div className="alert alert-error shadow-lg">
            <CircleX className="h-5 w-5" strokeWidth={2} aria-hidden />
            <span>{toast.message}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
