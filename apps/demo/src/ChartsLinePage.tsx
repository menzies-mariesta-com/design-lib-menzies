import {
  AreaChart,
  DashedLineChart,
  GradientLineChart,
  LineChart,
  LineChartWithAnnotations,
  MissingValuesLineChart,
  SteplineChart,
  ZoomableTimeSeriesChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  dailyPlateOutput,
  monthlyPlateOutputLabels,
  monthlyPlateOutputTrend,
  monthlyPlates,
  pigmentLoadTrend,
  pigmentWashIntensity,
  pigmentUsageTimeSeries,
  pigmentBatchCompletionSteps,
  pigmentBatchStages,
  ceruleanBatchJars,
  ceruleanTankLevelsWithGaps,
  ochreBatchJars,
  humiditySensorReadings,
  ochreTankLevelsWithGaps,
  ceruleanStockSteps,
  ochreStockSteps,
  inventoryRestockMonths,
  plateDryingCheckpoints,
  plateMoistureSteps,
  plateQualityAnnotations,
  plateQualityTrend,
  studioHourLabels,
  washWeekLabels,
  weeklyPigmentForecast,
  weeklyPigmentLevels,
  weeklyPlateCounts,
  weeklyPlateOutputTarget,
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
          smooth curves, token colors, and reduced-motion aware animations. GradientLineChart
          emphasizes the stroke with a vertical pigment wash fill. DashedLineChart renders
          forecast and target series with dashed strokes alongside solid measured lines.
          MissingValuesLineChart breaks the stroke at null sensor gaps and skipped counts, with
          optional connectNulls to bridge outages. SteplineChart holds values flat between discrete
          studio stages. ZoomableTimeSeriesChart adds
          datetime axes with drag-to-zoom and a subtle toolbar. LineChartWithAnnotations marks
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
          eyebrow="04 · Gradient line"
          title="Pigment wash intensity"
          description="GradientLineChart fills under a smooth stroke with a vertical pigment gradient from theme tokens."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <GradientLineChart
                height={300}
                categories={[...washWeekLabels]}
                yaxisTitle="Intensity %"
                series={[{ name: 'Wash intensity', data: pigmentWashIntensity }]}
              />
            }
            html={`<!-- GradientLineChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { GradientLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<GradientLineChart
  height={300}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  yaxisTitle="Intensity %"
  series={[{ name: 'Wash intensity', data: [32, 38, 35, 44, 41, 48, 52] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Gradient line"
          title="Plate output trend"
          description="Monthly plates finished with a stronger gradient fill and smooth curve stroke."
        >
          <ShowcaseTabs
            preview={
              <GradientLineChart
                height={320}
                categories={[...monthlyPlateOutputLabels]}
                yaxisTitle="Plates"
                series={[{ name: 'Plates finished', data: monthlyPlateOutputTrend }]}
                gradient={{
                  opacityFrom: 0.75,
                  opacityTo: 0.08,
                }}
              />
            }
            html={`<!-- GradientLineChart plate output -->
<div class="wash-chart"></div>`}
            jsx={`import { GradientLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<GradientLineChart
  height={320}
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  yaxisTitle="Plates"
  series={[{ name: 'Plates finished', data: [18, 22, 26, 24, 31, 28] }]}
  gradient={{ opacityFrom: 0.75, opacityTo: 0.08 }}
/>`}
          />
        </GallerySection>


        <GallerySection
          eyebrow="06 · Dashed line"
          title="Target vs actual plate output"
          description="Compare weekly production targets (dashed) against plates finished (solid) across the studio week."
        >
          <ShowcaseTabs
            preview={
              <DashedLineChart
                height={320}
                categories={[...washWeekLabels]}
                yaxisTitle="Plates"
                series={[
                  { name: 'Target', data: weeklyPlateOutputTarget },
                  { name: 'Actual', data: weeklyPlateCounts },
                ]}
                solidSeriesIndexes={[1]}
                dashArray={5}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- DashedLineChart target vs actual -->
<div class="wash-chart"></div>`}
            jsx={`import { DashedLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DashedLineChart
  height={320}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  yaxisTitle="Plates"
  series={[
    { name: 'Target', data: [7, 9, 8, 11, 10, 5, 6] },
    { name: 'Actual', data: [6, 8, 7, 10, 9, 4, 5] },
  ]}
  solidSeriesIndexes={[1]}
  dashArray={5}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Dashed line"
          title="Forecast vs measured pigment"
          description="Dashed forecast line against solid measured pigment load with per-series dash patterns."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <DashedLineChart
                height={320}
                categories={[...washWeekLabels]}
                yaxisTitle="Load %"
                series={[
                  { name: 'Forecast', data: weeklyPigmentForecast },
                  { name: 'Measured', data: weeklyPigmentLevels },
                ]}
                dashArray={[8, 0]}
                curved={false}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- DashedLineChart forecast vs measured -->
<div class="wash-chart"></div>`}
            jsx={`import { DashedLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<DashedLineChart
  height={320}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  yaxisTitle="Load %"
  series={[
    { name: 'Forecast', data: [70, 74, 72, 80, 77, 85, 81] },
    { name: 'Measured', data: [68, 72, 70, 78, 75, 82, 79] },
  ]}
  dashArray={[8, 0]}
  curved={false}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Multi-series"
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
          eyebrow="09 · Stacked area"
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
          eyebrow="10 · Time series"
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
          eyebrow="11 · Time series"
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
          eyebrow="12 · Annotations"
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

        <GallerySection
          eyebrow="13 · Missing values"
          title="Humidity sensor gaps"
          description="Studio humidity readings with brief sensor outages. Null values break the line instead of connecting across missing hours."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={
              <MissingValuesLineChart
                height={300}
                categories={[...studioHourLabels]}
                yaxisTitle="Humidity %"
                series={[{ name: 'Humidity', data: humiditySensorReadings }]}
              />
            }
            html={`<!-- MissingValuesLineChart sensor gaps -->
<div class="wash-chart"></div>`}
            jsx={`import { MissingValuesLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<MissingValuesLineChart
  height={300}
  categories={['8a', '10a', '12p', '2p', '4p', '6p']}
  yaxisTitle="Humidity %"
  series={[{ name: 'Humidity', data: [62, null, 58, null, 55, 51] }]}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="14 · Missing values"
          title="Pigment tank outages"
          description="Cerulean and Ochre tank levels with power outages. Markers highlight known readings; set connectNulls to bridge across null points."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <MissingValuesLineChart
                height={320}
                categories={[...washWeekLabels]}
                yaxisTitle="Tank level %"
                series={[
                  { name: 'Cerulean', data: ceruleanTankLevelsWithGaps },
                  { name: 'Ochre', data: ochreTankLevelsWithGaps },
                ]}
                options={{
                  legend: { position: 'top' },
                }}
              />
            }
            html={`<!-- MissingValuesLineChart pigment outages -->
<div class="wash-chart"></div>`}
            jsx={`import { MissingValuesLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<MissingValuesLineChart
  height={320}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  yaxisTitle="Tank level %"
  series={[
    { name: 'Cerulean', data: [68, 72, null, null, 75, 82, 79] },
    { name: 'Ochre', data: [64, null, 70, 73, null, 78, 76] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="15 · Stepline"
          title="Plate drying stages"
          description="Moisture % holds steady between checkpoints, then drops at each drying phase."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <SteplineChart
                height={300}
                categories={[...plateDryingCheckpoints]}
                yaxisTitle="Moisture %"
                series={[{ name: 'Plate moisture', data: plateMoistureSteps }]}
                options={{ yaxis: { min: 0, max: 110 } }}
              />
            }
            html={`<!-- SteplineChart canvas -->
<div class="wash-chart"></div>`}
            jsx={`import { SteplineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SteplineChart
  height={300}
  categories={['0h', '2h', '4h', '6h', '8h', '10h', 'Dry']}
  yaxisTitle="Moisture %"
  series={[{ name: 'Plate moisture', data: [100, 100, 78, 78, 45, 45, 12] }]}
  options={{ yaxis: { min: 0, max: 110 } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="16 · Stepline"
          title="Pigment batch jars filled"
          description="Track Cerulean and Ochre jars filled at each batch stage."
        >
          <ShowcaseTabs
            preview={
              <SteplineChart
                height={320}
                showDataLabels
                categories={[...pigmentBatchStages]}
                yaxisTitle="Jars filled"
                series={[
                  { name: 'Cerulean', data: ceruleanBatchJars },
                  { name: 'Ochre', data: ochreBatchJars },
                ]}
                options={{ legend: { position: 'top' } }}
              />
            }
            html={`<!-- SteplineChart multi-series -->
<div class="wash-chart"></div>`}
            jsx={`import { SteplineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SteplineChart
  height={320}
  showDataLabels
  categories={['Prep', 'Grind', 'Mull', 'Rest', 'Bottle', 'Shelf']}
  yaxisTitle="Jars filled"
  series={[
    { name: 'Cerulean', data: [0, 6, 6, 6, 18, 18] },
    { name: 'Ochre', data: [0, 0, 4, 4, 4, 12] },
  ]}
  options={{ legend: { position: 'top' } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="17 · Stepline"
          title="Inventory restock steps"
          description="Shelf stock drops through the month, then jumps when a restock arrives."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={
              <SteplineChart
                height={320}
                categories={[...inventoryRestockMonths]}
                yaxisTitle="Jars on shelf"
                series={[
                  { name: 'Cerulean', data: ceruleanStockSteps },
                  { name: 'Ochre', data: ochreStockSteps },
                ]}
                options={{ legend: { position: 'top' }, stroke: { width: [3, 2] } }}
              />
            }
            html={`<!-- SteplineChart inventory -->
<div class="wash-chart"></div>`}
            jsx={`import { SteplineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SteplineChart
  height={320}
  categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
  yaxisTitle="Jars on shelf"
  series={[
    { name: 'Cerulean', data: [24, 24, 8, 8, 8, 32, 32] },
    { name: 'Ochre', data: [18, 18, 18, 5, 5, 5, 22] },
  ]}
  options={{ legend: { position: 'top' }, stroke: { width: [3, 2] } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="18 · Stepline"
          title="Batch completion over time"
          description="Datetime stepline for cumulative batches completed between milestones."
        >
          <ShowcaseTabs
            preview={
              <SteplineChart
                height={300}
                datetime
                yaxisTitle="Batches complete"
                series={[{ name: 'Completed', data: pigmentBatchCompletionSteps }]}
                options={{ xaxis: { labels: { format: 'MMM d' } } }}
              />
            }
            html={`<!-- SteplineChart datetime -->
<div class="wash-chart"></div>`}
            jsx={`import { SteplineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SteplineChart
  height={300}
  datetime
  yaxisTitle="Batches complete"
  series={[{
    name: 'Completed',
    data: [
      { x: '2026-08-01', y: 0 },
      { x: '2026-08-05', y: 2 },
      { x: '2026-08-09', y: 5 },
      { x: '2026-08-13', y: 8 },
    ],
  }]}
  options={{ xaxis: { labels: { format: 'MMM d' } } }}
/>`}
          />
        </GallerySection>

      </div>
    </>
  )
}
