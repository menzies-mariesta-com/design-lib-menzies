import { BrushChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  dailyPlateOutput,
  pigmentUsageTimeSeries,
  studioDay,
  studioProductionMetrics,
} from './data/chart-samples'

const summerSelection: [number, number] = [
  studioDay(2026, 6, 1),
  studioDay(2026, 7, 31),
]

export default function ChartsBrushPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Brush chart
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Interactive range selection for studio production metrics. BrushChart stacks a detail
          line chart above a compact overview with drag-to-select zoom synced on the datetime
          x-axis.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Production"
          title="Daily plate output"
          description="Drag the shaded window on the brush chart to zoom the main chart. Use the toolbar for pan, zoom, and reset."
        >
          <ShowcaseTabs
            preview={
              <BrushChart
                mainHeight={300}
                brushHeight={130}
                series={[{ name: 'Plates finished', data: dailyPlateOutput }]}
                xaxisTitle="Studio day"
                yaxisTitle="Plates"
                options={{
                  xaxis: { labels: { format: 'MMM d' } },
                }}
                brushOptions={{
                  xaxis: { labels: { format: 'MMM' } },
                }}
              />
            }
            html={`<!-- BrushChart stacked main + overview -->
<div class="wash-brush-chart">
  <div class="wash-chart wash-brush-chart-main"></div>
  <div class="wash-chart wash-brush-chart-overview"></div>
</div>`}
            jsx={`import { BrushChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BrushChart
  mainHeight={300}
  brushHeight={130}
  series={[{ name: 'Plates finished', data: dailyPlateOutput }]}
  xaxisTitle="Studio day"
  yaxisTitle="Plates"
  options={{ xaxis: { labels: { format: 'MMM d' } } }}
  brushOptions={{ xaxis: { labels: { format: 'MMM' } } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Multi-series"
          title="Plates and washes"
          description="Compare two production series. Selection starts on the summer window by default."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <BrushChart
                mainHeight={320}
                brushHeight={140}
                chartType="area"
                series={[
                  { name: 'Plates', data: studioProductionMetrics.plates },
                  { name: 'Washes', data: studioProductionMetrics.washes },
                ]}
                selection={summerSelection}
                xaxisTitle="Studio day"
                yaxisTitle="Count"
                options={{
                  legend: { position: 'top' },
                  xaxis: { labels: { format: 'MMM d' } },
                }}
              />
            }
            html={`<!-- BrushChart multi-series -->
<div class="wash-brush-chart"></div>`}
            jsx={`import { BrushChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BrushChart
  mainHeight={320}
  brushHeight={140}
  chartType="area"
  series={[
    { name: 'Plates', data: studioProductionMetrics.plates },
    { name: 'Washes', data: studioProductionMetrics.washes },
  ]}
  selection={[startMs, endMs]}
  xaxisTitle="Studio day"
  yaxisTitle="Count"
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Pigment load"
          title="Monthly pigment usage"
          description="Area detail with line brush overview for Cerulean and Ochre consumption."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <BrushChart
                mainHeight={300}
                brushHeight={120}
                chartType="line"
                brushChartType="area"
                series={[
                  { name: 'Cerulean', data: pigmentUsageTimeSeries.cerulean },
                  { name: 'Ochre', data: pigmentUsageTimeSeries.ochre },
                ]}
                xaxisTitle="Month"
                yaxisTitle="ml used"
                options={{
                  legend: { position: 'top' },
                  xaxis: { labels: { format: 'MMM yyyy' } },
                }}
              />
            }
            html={`<!-- BrushChart pigment usage -->
<div class="wash-brush-chart"></div>`}
            jsx={`import { BrushChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<BrushChart
  chartType="line"
  brushChartType="area"
  series={[
    { name: 'Cerulean', data: pigmentUsageTimeSeries.cerulean },
    { name: 'Ochre', data: pigmentUsageTimeSeries.ochre },
  ]}
  xaxisTitle="Month"
  yaxisTitle="ml used"
  options={{ xaxis: { labels: { format: 'MMM yyyy' } } }}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
