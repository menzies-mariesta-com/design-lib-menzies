import { SunburstChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  semiCircleSunburstSample,
  studioPigmentSunburst,
  sunburstChartSample,
} from './data/chart-samples'

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

export default function ChartsSunburstCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Sunburst Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Sunburst charts visualize hierarchical data as nested radial rings. SunburstChart wraps
          WashChart with Apex sunburst plotOptions, pigment-aware defaults, click-to-zoom branches,
          and optional semi-circle cropping for desk KPI panels.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Sunburst"
          title="Basic sunburst"
          description="Nested studio pigment families with concentric rings. Each child arc inherits its parent's angular span."
        >
          <ShowcaseTabs
            preview={
              sunburstChartSample.enabled ? (
                <SunburstChart
                  height={380}
                  title={studioPigmentSunburst.title}
                  series={[{ name: 'Allocation', data: studioPigmentSunburst.data }]}
                  innerSize="22%"
                  borderRadius={5}
                  spacing={1}
                />
              ) : (
                <ComingSoonPreview label="Sunburst charts require ApexCharts 6.7+." />
              )
            }
            html={'<!-- SunburstChart canvas -->\n<div class="wash-chart"></div>'}
            jsx={`import { SunburstChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'\n\n<SunburstChart height={380} title="Studio pigment allocation" series={[{ name: 'Allocation', data: [] }]} innerSize="22%" borderRadius={5} />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Semi circle"
          title="Semi circle sunburst"
          description="Half-ring layout using plotOptions.sunburst startAngle -90 and endAngle 90 for compact KPI panels."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              semiCircleSunburstSample.enabled ? (
                <SunburstChart
                  height={340}
                  title={semiCircleSunburstSample.title}
                  series={[{ name: 'Portfolio', data: semiCircleSunburstSample.data }]}
                  innerSize={semiCircleSunburstSample.innerSize}
                  startAngle={semiCircleSunburstSample.startAngle}
                  endAngle={semiCircleSunburstSample.endAngle}
                  borderRadius={4}
                />
              ) : (
                <ComingSoonPreview label="Semi-circle sunburst requires ApexCharts 6.7+ sunburst angles." />
              )
            }
            html={'<!-- SunburstChart semi-circle -->\n<div class="wash-chart"></div>'}
            jsx={`import { SunburstChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'\n\n<SunburstChart height={340} startAngle={-90} endAngle={90} innerSize="35%" />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Drilldown"
          title="From drilldown"
          description="Hand off from treemap or bar drilldown configs into a sunburst view. Apex reads existing drilldown series when wired."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Treemap and bar drilldown to sunburst handoff coming soon." />
            }
            html=""
            jsx=""
          />
        </GallerySection>
      </div>
    </>
  )
}
