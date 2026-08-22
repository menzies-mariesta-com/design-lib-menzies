import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { WaffleEnergyMixDemo, WaffleSmallMultiplesDemo } from './components/chartAdvancedDemos'

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
          Icon grid approximations stand in until Apex Premium waffle types ship in Wash UI.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Energy"
          title="Energy mix"
          description="One hundred squares represent total generation. Each filled cell is one percent share of solar, wind, hydro, and fossil sources."
        >
          <ShowcaseTabs
            preview={<WaffleEnergyMixDemo />}
            html={'<!-- WaffleChart energy mix -->\n<div class="wash-chart"></div>'}
            jsx={`import { WaffleEnergyMixDemo } from './components/chartAdvancedDemos'

<WaffleEnergyMixDemo />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Small multiples"
          title="Urban small multiples"
          description="A grid of mini waffle charts compares neighborhood transit mode share across districts without overlapping scales."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<WaffleSmallMultiplesDemo />}
            html={'<!-- WaffleChart urban small multiples -->\n<div class="wash-chart"></div>'}
            jsx={`import { WaffleSmallMultiplesDemo } from './components/chartAdvancedDemos'

<WaffleSmallMultiplesDemo />`}
          />
        </GallerySection>
      </div>
    </>
  )
}
