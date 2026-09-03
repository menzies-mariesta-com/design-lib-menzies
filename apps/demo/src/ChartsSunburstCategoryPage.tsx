import { SunburstChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
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
            html={'<!-- SunburstChart canvas -->\n<div class="wash-chart"></div>'}
            jsx={`import { SunburstChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SunburstChart
  height={380}
  title="Studio pigment allocation"
  series={[{ name: 'Allocation', data: studioPigmentSunburst.data }]}
  innerSize="22%"
  borderRadius={5}
  spacing={1}
/>`}
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
            html={'<!-- SunburstChart semi-circle -->\n<div class="wash-chart"></div>'}
            jsx={`import { SunburstChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SunburstChart
  height={340}
  title="Portfolio mix semi-circle"
  startAngle={-90}
  endAngle={90}
  innerSize="35%"
  series={[{ name: 'Portfolio', data: semiCircleSunburstSample.data }]}
/>`}
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
            html={`<!-- Sunburst drilldown handoff -->
<div class="wash-chart"></div>`}
            jsx={`import { BarChart, SunburstChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

// Click a summary bar, then render SunburstChart with the matching branch.`}
          />
        </GallerySection>
      </div>
    </>
  )
}
