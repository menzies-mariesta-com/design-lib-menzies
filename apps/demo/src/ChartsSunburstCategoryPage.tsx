import { SunburstChart } from '#plain/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
import { SunburstFromDrilldownDemo } from './components/chartDistributionDemos'
import {
  semiCircleSunburstSample,
  studioPigmentSunburst,
} from './data/chart-samples'

export default function ChartsSunburstCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Sunburst Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Sunburst charts visualize hierarchical data as nested radial rings.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Sunburst"
          title="Basic sunburst"
          description="Nested studio pigment families with concentric rings"
        >
          <ShowcaseTabs
            preview={
              <SunburstChart
                height={380}
                title={studioPigmentSunburst.title}
                series={[{ name: 'Allocation', data: studioPigmentSunburst.data }]}
                innerSize="22%"
                borderRadius={5}
                spacing={1}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Semi circle"
          title="Semi circle sunburst"
          description="Half-ring layout using plotOptions.sunburst startAngle -90"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <SunburstChart
                height={340}
                title={semiCircleSunburstSample.title}
                series={[{ name: 'Portfolio', data: semiCircleSunburstSample.data }]}
                innerSize={semiCircleSunburstSample.innerSize}
                startAngle={semiCircleSunburstSample.startAngle}
                endAngle={semiCircleSunburstSample.endAngle}
                borderRadius={4}
              />
            }
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Drilldown"
          title="From drilldown"
          description="Hand off from treemap or bar drilldown configs into a sunburst view"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<SunburstFromDrilldownDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
