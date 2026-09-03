import type { ComponentType } from 'react'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  ScrollytellingDemo,
  ShareableViewDemo,
  UndoRedoPremiumDemo,
} from './components/chartAdvancedDemos'

const narrativeDemos: readonly {
  eyebrow: string
  title: string
  description: string
  panel?: 'wash-panel-ochre' | 'wash-panel-slate'
  slug: string
  Preview: ComponentType
}[] = [
  {
    eyebrow: '01 · Scroll',
    title: 'Scrollytelling',
    description: 'Step through narrative beats as the reader scrolls. Pin chart panels, animate series reveals, and sync copy blocks to viewport progress',
    slug: 'scrollytelling',
    Preview: ScrollytellingDemo,
  },
  {
    eyebrow: '02 · Share',
    title: 'Shareable views',
    description: 'Serialize filter state, zoom windows, and annotation sets into shareable URLs or embed snippets for studio reports and client handoffs',
    panel: 'wash-panel-ochre',
    slug: 'shareable-views',
    Preview: ShareableViewDemo,
  },
  {
    eyebrow: '03 · History',
    title: 'Undo redo',
    description: 'Premium interaction history for annotation edits, filter changes, and brush selections with keyboard shortcuts and timeline scrub',
    panel: 'wash-panel-slate',
    slug: 'undo-redo',
    Preview: UndoRedoPremiumDemo,
  },
]

export default function ChartsNarrativeCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Narrative Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Scrollytelling, shareable chart views, and premium undo redo for long-form studio analytics
          stories.
        </p>
      </div>

      <div className="space-y-6">
        {narrativeDemos.map((demo) => (
          <GallerySection
            key={demo.slug}
            eyebrow={demo.eyebrow}
            title={demo.title}
            description={demo.description}
            panel={demo.panel}
          >
            <ShowcaseTabs
              preview={<demo.Preview />}
              html={`<!-- ${demo.title} -->
<div class="wash-chart wash-chart-narrative"></div>`}
              jsx={`import { ${demo.Preview.name} } from './components/chartAdvancedDemos'

<${demo.Preview.name} />`}
            />
          </GallerySection>
        ))}
      </div>
    </>
  )
}
