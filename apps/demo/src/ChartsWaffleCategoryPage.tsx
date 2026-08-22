import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function PremiumComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-warning/40 bg-warning/5">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="badge badge-warning badge-sm">Premium</span>
        <span className="badge badge-outline badge-sm">Coming soon</span>
      </div>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

export default function ChartsWaffleCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Waffle Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Grid-of-squares charts show part-to-whole share at a glance. Each cell is one unit of a
          fixed total, ideal for energy mix, census breakdowns, and small-multiple comparisons.
          WaffleChart will wrap WashChart with Apex Premium waffle types once the Premium license
          tier is available in the design system.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Energy"
          title="Energy mix"
          description="One hundred squares represent total generation. Each filled cell is one percent share of solar, wind, hydro, and fossil sources."
        >
          <ShowcaseTabs
            preview={
              <PremiumComingSoonPreview label="Energy mix waffle requires Apex Premium. Demo coming soon." />
            }
            html={'<!-- WaffleChart energy mix (Premium, coming soon) -->\n<div class="wash-chart"></div>'}
            jsx={`// WaffleChart energy mix — Apex Premium, coming soon
// import { WaffleChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Small multiples"
          title="Urban small multiples"
          description="A grid of mini waffle charts compares neighborhood transit mode share across districts without overlapping scales."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <PremiumComingSoonPreview label="Urban small multiples waffle requires Apex Premium. Demo coming soon." />
            }
            html={'<!-- WaffleChart urban small multiples (Premium, coming soon) -->\n<div class="wash-chart"></div>'}
            jsx={`// WaffleChart urban small multiples — Apex Premium, coming soon`}
          />
        </GallerySection>
      </div>
    </>
  )
}
