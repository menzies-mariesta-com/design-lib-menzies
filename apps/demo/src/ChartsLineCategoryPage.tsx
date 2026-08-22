import { useCallback, useState } from 'react'
import {
  BrushChart,
  createSyncGroupId,
  DashedLineChart,
  DownsampledLineChart,
  type DownsampleMethod,
  GradientLineChart,
  LineChart,
  LineChartWithAnnotations,
  MissingValuesLineChart,
  RealtimeLineChart,
  SteplineChart,
  SyncedChartPanel,
  ZoomableTimeSeriesChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { Pause, Play } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  dailyPlateOutput,
  humiditySensorReadings,
  pigmentWashIntensity,
  plateDryingCheckpoints,
  plateMoistureSteps,
  plateQualityAnnotations,
  plateQualityTrend,
  studioHourLabels,
  studioSensorNoise20k,
  syncedStudioMetrics,
  washWeekLabels,
  weeklyPlateCounts,
  weeklyPlateOutputTarget,
  weeklyPigmentLevels,
  weeklyWashCounts,
} from './data/chart-samples'

const demoSyncGroup = createSyncGroupId('demo-studio')
const TARGET_POINTS = 400

function PigmentSensorDemo() {
  const [paused, setPaused] = useState(false)

  const valueGenerator = useCallback(() => {
    const noise = (Math.random() - 0.5) * 14
    return Math.round(Math.max(40, Math.min(95, 72 + noise)))
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Live pigment sensor stream. New readings append every second; the window keeps the last
          20 points.
        </p>
        <button
          type="button"
          className={`btn btn-sm cursor-pointer ${paused ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? (
            <Play className="size-4" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Pause className="size-4" strokeWidth={1.75} aria-hidden="true" />
          )}
          {paused ? 'Resume stream' : 'Pause stream'}
        </button>
      </div>
      <RealtimeLineChart
        height={320}
        seriesName="Pigment load %"
        yaxisTitle="Load %"
        paused={paused}
        valueGenerator={valueGenerator}
        intervalMs={1000}
        maxPoints={20}
        options={{ xaxis: { labels: { format: 'HH:mm:ss' } } }}
      />
    </div>
  )
}

function DownsampleDemo() {
  const [method, setMethod] = useState<DownsampleMethod>('lttb')
  const [useRaw, setUseRaw] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="join">
          <button
            type="button"
            className={[
              'btn btn-sm join-item cursor-pointer',
              method === 'lttb' ? 'btn-primary' : 'btn-ghost',
            ].join(' ')}
            onClick={() => setMethod('lttb')}
          >
            LTTB
          </button>
          <button
            type="button"
            className={[
              'btn btn-sm join-item cursor-pointer',
              method === 'minmax' ? 'btn-primary' : 'btn-ghost',
            ].join(' ')}
            onClick={() => setMethod('minmax')}
          >
            Min-max
          </button>
        </div>
        <label className="label cursor-pointer gap-2">
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-primary"
            checked={useRaw}
            onChange={(event) => setUseRaw(event.target.checked)}
          />
          <span className="label-text text-sm">Show raw data (20k points)</span>
        </label>
        <span className="badge badge-outline badge-sm">
          {useRaw ? '20,000 points' : `${TARGET_POINTS} target · ${method.toUpperCase()}`}
        </span>
      </div>
      <DownsampledLineChart
        data={studioSensorNoise20k}
        name="Humidity %"
        targetPoints={TARGET_POINTS}
        downsampleMethod={method}
        useRawData={useRaw}
        height={340}
        xaxisTitle="Studio time"
        yaxisTitle="Humidity %"
        subtitle="North light room sensor"
        options={{
          xaxis: { labels: { format: 'MMM d HH:mm' } },
        }}
      />
    </div>
  )
}

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[280px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

export default function ChartsLineCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Line Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Track washes, pigment load, plate output, and studio sensors over time. Covers basic
          lines, labels, gradients, dashed forecasts, steplines, missing data gaps, zoomable
          datetime series, annotations, realtime streams, synced groups, brush selection, and
          large-dataset downsampling.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic line"
          title="Basic line"
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
          eyebrow="02 · Data labels"
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
          eyebrow="03 · Gradient line"
          title="Gradient line"
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
          eyebrow="04 · Dashed line"
          title="Dashed line"
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
          eyebrow="05 · Stepline"
          title="Stepline"
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
          eyebrow="06 · Missing data"
          title="Line with missing data"
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
          eyebrow="07 · Time series"
          title="Zoomable timeseries"
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

        <GallerySection
          eyebrow="09 · Realtime"
          title="Realtime"
          description="Rolling window line chart with smooth dynamic animation and datetime x-axis labels."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<PigmentSensorDemo />}
            html={'<div class="wash-chart wash-chart-realtime"></div>'}
            jsx={`import { RealtimeLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<RealtimeLineChart
  height={320}
  seriesName="Pigment load %"
  intervalMs={1000}
  maxPoints={20}
  paused={false}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="10 · Synced"
          title="Syncing charts"
          description="SyncedChartPanel stacks line, area, and column charts for plate output, dry time, and pigment load."
        >
          <ShowcaseTabs
            preview={
              <SyncedChartPanel
                syncGroupId={demoSyncGroup}
                categories={[...washWeekLabels]}
                plateOutput={syncedStudioMetrics.plateOutput}
                dryTime={syncedStudioMetrics.dryTime}
                pigmentUse={syncedStudioMetrics.pigmentUse}
                height={200}
                showToolbar="last"
              />
            }
            html={`<!-- SyncedChartPanel -->
<div class="wash-synced-charts">
  <div class="wash-chart wash-chart-synced"></div>
  <div class="wash-chart wash-chart-synced"></div>
  <div class="wash-chart wash-chart-synced"></div>
</div>`}
            jsx={`import { SyncedChartPanel, createSyncGroupId } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

const syncGroup = createSyncGroupId('studio-week')

<SyncedChartPanel
  syncGroupId={syncGroup}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  plateOutput={{ name: 'Plate output', data: [14, 18, 16, 22, 20, 10, 12] }}
  dryTime={{ name: 'Dry time (min)', data: [28, 24, 31, 26, 22, 19, 25] }}
  pigmentUse={{ name: 'Pigment load %', data: [32, 38, 35, 44, 41, 48, 52] }}
  height={200}
  showToolbar="last"
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="11 · Brush"
          title="Brush charts"
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
          eyebrow="12 · Downsample"
          title="Line large dataset downsampling"
          description="Default LTTB downsampling preserves the humidity curve shape while keeping the chart responsive. Toggle raw data to compare render cost."
        >
          <ShowcaseTabs
            preview={<DownsampleDemo />}
            html={`<!-- DownsampledLineChart -->
<div class="wash-chart wash-chart-downsampled"></div>`}
            jsx={`import { DownsampledLineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { studioSensorNoise20k } from './data/chart-samples'

<DownsampledLineChart
  data={studioSensorNoise20k}
  name="Humidity %"
  targetPoints={400}
  downsampleMethod="lttb"
  height={340}
  xaxisTitle="Studio time"
  yaxisTitle="Humidity %"
  subtitle="North light room sensor"
  options={{ xaxis: { labels: { format: 'MMM d HH:mm' } } }}
/>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="13 · Tooltips"
          title="Line with annotation tooltips"
          description="Interactive tooltips on chart annotations for ship dates, thresholds, and studio events."
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Hoverable annotation tooltips for ship dates and quality thresholds." />
            }
            html={`<!-- Line with annotation tooltips (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Line with annotation tooltips — coming soon`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="14 · Drilldown"
          title="Line with drilldown"
          description="Click a series segment to drill into a detail view of plate batches or pigment lots."
        >
          <ShowcaseTabs
            preview={
              <ComingSoonPreview label="Click-through drilldown from summary line to batch detail." />
            }
            html={`<!-- Line with drilldown (coming soon) -->
<div class="wash-chart"></div>`}
            jsx={`// Line with drilldown — coming soon`}
          />
        </GallerySection>
      </div>
    </>
  )
}
