import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import {
  BeeswarmBodyMassDemo,
  BeeswarmGameScoresDemo,
  BeeswarmLifeExpectancyDemo,
  BeeswarmSalaryDemo,
} from './components/chartAdvancedDemos'

export default function ChartsBeeswarmCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Beeswarm Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Beeswarm plots jitter observations along a categorical axis without overlap, revealing.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Species"
          title="Body mass by species"
          description="Classic penguin body-mass swarms grouped by species"
        >
          <ShowcaseTabs
            preview={<BeeswarmBodyMassDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Department"
          title="Salary by department"
          description="Compare compensation spreads across departments"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<BeeswarmSalaryDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Bubble"
          title="Game scores bubble"
          description="Combine beeswarm jitter with bubble radius encoding"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<BeeswarmGameScoresDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Expectancy"
          title="Life expectancy swarm"
          description="Multi-series beeswarm comparing life expectancy distributions by"
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={<BeeswarmLifeExpectancyDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
