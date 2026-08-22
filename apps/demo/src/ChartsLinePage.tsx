import {
  AreaChart,
  LineChart,
  LineChartWithAnnotations,
  ZoomableTimeSeriesChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  dailyPlateOutput,
  monthlyPlates,
  pigmentLoadTrend,
  pigmentUsageTimeSeries,
  plateQualityAnnotations,
  plateQualityTrend,
  washWeekLabels,
  weeklyPigmentLevels,
  weeklyPlateCounts,
  weeklyWashCounts,
} from './data/chart-samples'

export default function ChartsLinePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Line and area charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Track washes, pigment load, and plate output over time. LineChart and AreaChart apply
          smooth curves, token colors, and reduced-motion aware animations. ZoomableTimeSeriesChart
          adds datetime axes with drag-to-zoom and a subtle toolbar. LineChartWithAnnotations marks
          ship dates, thresholds, and studio events on the same canvas.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Line"
          title="Weekly wash trend"
          description="Single-series line chart for daily wash counts across the studio week."
        >
          <ShowcaseTabs
            preview={
              <LineChart
                height={300}
                categories={[...washWeekLabels]}
                series={[{ name: 'Washes', data: weeklyWashCounts }]}
                options={{
                  stroke: { width: 3 },
                  markers: { size: 4, hover: { size: 6 } },
                }}
              />
            }
            html={`<!-- LineChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { LineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<LineChart
  height={300}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[{ name: 'Washes', data: [12, 18, 14, 22, 19, 8, 11] }]}
  options={{
    stroke: { width: 3 },
    markers: { size: 4, hover: { size: 6 } },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Line labels"
          title="Line with data labels"
          description="Plate counts and pigment levels across the studio week, with compact value labels at each point."
        >
          <ShowcaseTabs
            preview={
              <LineChart
                height={320}
                showDataLabels
                categories={[...washWeekLabels]}
                series={[
                  { name: 'Plates', data: weeklyPlateCounts },
                  { name: 'Pigment %', data: weeklyPigmentLevels },
                ]}
                options={{
                  legend: { position: 'top' },
                  stroke: { width: [3, 2] },
                }}
              />
            }
            html={`<!-- LineChart with data labels -->
<div class="wash-chart"></div>`}
            jsx={`import { LineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<LineChart
  height={320}
  showDataLabels
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[
    { name: 'Plates', data: [6, 8, 7, 10, 9, 4, 5] },
    { name: 'Pigment %', data: [68, 72, 70, 78, 75, 82, 79] },
  ]}
  options={{
    legend: { position: 'top' },
    stroke: { width: [3, 2] },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Area"
          title="Pigment load gradient"
          description="AreaChart fills under the curve with a soft pigment gradient."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <AreaChart
                height={300}
                categories={[...washWeekLabels]}
                series={[{ name: 'Load %', data: pigmentLoadTrend }]}
              />
            }
            html={`<!-- AreaChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<AreaChart
  height={300}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[{ name: 'Load %', data: [32, 38, 35, 44, 41, 48, 52] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Multi-series"
          title="Plates and washes"
          description="Compare new plates against total washes per month with two line series."
        >
          <ShowcaseTabs
            preview={
              <LineChart
                height={320}
                categories={monthlyPlates.map((m) => m.month)}
                series={[
                  { name: 'Plates', data: monthlyPlates.map((m) => m.plates) },
                  { name: 'Washes', data: monthlyPlates.map((m) => m.washes) },
                ]}
                options={{
                  legend: { position: 'top' },
                  stroke: { width: [3, 2], dashArray: [0, 4] },
                }}
              />
            }
            html={`<!-- LineChart multi-series -->
<div class="wash-chart"></div>`}
            jsx={`import { LineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<LineChart
  height={320}
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  series={[
    { name: 'Plates', data: [18, 22, 26, 24, 31, 28] },
    { name: 'Washes', data: [42, 58, 64, 61, 78, 72] },
  ]}
  options={{
    legend: { position: 'top' },
    stroke: { width: [3, 2], dashArray: [0, 4] },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Stacked area"
          title="Stacked wash layers"
          description="Two area series stacked to show glaze vs base wash volume."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <AreaChart
                height={320}
                stacked
                categories={[...washWeekLabels]}
                series={[
                  { name: 'Base wash', data: [8, 10, 9, 12, 11, 6, 7] },
                  { name: 'Glaze', data: [4, 8, 5, 10, 8, 2, 4] },
                ]}
                options={{
                  legend: { position: 'top' },
                  fill: { opacity: 0.75 },
                }}
              />
            }
            html={`<!-- AreaChart stacked -->
<div class="wash-chart"></div>`}
            jsx={`import { AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<AreaChart
  height={320}
  stacked
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  series={[
    { name: 'Base wash', data: [8, 10, 9, 12, 11, 6, 7] },
    { name: 'Glaze', data: [4, 8, 5, 10, 8, 2, 4] },
  ]}
  options={{ legend: { position: 'top' }, fill: { opacity: 0.75 } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Time series"
          title="Daily plate output"
          description="Drag on the chart to zoom the x-axis. Use the toolbar for pan, zoom in/out, and reset."
        >
          <ShowcaseTabs
            preview={
              <ZoomableTimeSeriesChart
                height={340}
                series={[{ name: 'Plates finished', data: dailyPlateOutput }]}
                xaxisTitle="Studio day"
                yaxisTitle="Plates"
                options={{
                  xaxis: {
                    labels: { format: 'MMM d' },
                  },
                }}
              />
            }
            html={`<!-- ZoomableTimeSeriesChart canvas -->
<div class="wash-chart wash-chart-timeseries"></div>`}
            jsx={`import { ZoomableTimeSeriesChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ZoomableTimeSeriesChart
  height={340}
  series={[{ name: 'Plates finished', data: dailyPlateOutput }]}
  xaxisTitle="Studio day"
  yaxisTitle="Plates"
  options={{
    xaxis: { labels: { format: 'MMM d' } },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Time series"
          title="Pigment usage over months"
          description="Multi-series datetime area chart. Compare Cerulean and Ochre ml used per month."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <ZoomableTimeSeriesChart
                height={340}
                chartType="area"
                series={[
                  { name: 'Cerulean', data: pigmentUsageTimeSeries.cerulean },
                  { name: 'Ochre', data: pigmentUsageTimeSeries.ochre },
                ]}
                xaxisTitle="Month"
                yaxisTitle="ml used"
                options={{
                  xaxis: {
                    labels: { format: 'MMM yyyy' },
                  },
                  legend: { position: 'top' },
                }}
              />
            }
            html={`<!-- ZoomableTimeSeriesChart area -->
<div class="wash-chart wash-chart-timeseries"></div>`}
            jsx={`import { ZoomableTimeSeriesChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<ZoomableTimeSeriesChart
  height={340}
  chartType="area"
  series={[
    { name: 'Cerulean', data: pigmentUsageTimeSeries.cerulean },
    { name: 'Ochre', data: pigmentUsageTimeSeries.ochre },
  ]}
  xaxisTitle="Month"
  yaxisTitle="ml used"
  options={{
    xaxis: { labels: { format: 'MMM yyyy' } },
    legend: { position: 'top' },
  }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Annotations"
          title="Line with annotations"
          description="Mark ship dates, quality thresholds, pigment change events, and text labels on a datetime line chart."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={
              <LineChartWithAnnotations
                height={340}
                datetime
                yaxisTitle="Quality score"
                series={[{ name: 'Plate QA', data: plateQualityTrend }]}
                annotations={plateQualityAnnotations}
                options={{
                  yaxis: {
                    min: 60,
                    max: 90,
                  },
                }}
              />
            }
            html={`<!-- LineChartWithAnnotations canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { LineChartWithAnnotations } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<LineChartWithAnnotations
  height={340}
  datetime
  yaxisTitle="Quality score"
  series={[{
    name: 'Plate QA',
    data: [
      { x: '2026-08-01', y: 68 },
      { x: '2026-08-10', y: 74 },
      { x: '2026-08-22', y: 82 },
    ],
  }]}
  annotations={[
    { type: 'x', value: '2026-08-14', label: 'Ship date', tone: 'warning' },
    { type: 'y', value: 75, label: 'Quality threshold', tone: 'primary' },
    { type: 'point', x: '2026-08-10', y: 74, label: 'Pigment change', tone: 'warning' },
    { type: 'text', x: 0, y: 88, text: 'Studio QA trend', tone: 'secondary' },
  ]}
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
