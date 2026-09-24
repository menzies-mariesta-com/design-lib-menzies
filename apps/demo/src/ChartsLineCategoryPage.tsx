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
} from '#plain/charts'
import { Pause, Play } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  LineAnnotationTooltipsDemo,
  LineDrilldownDemo,
} from './chart-demos/cartesian-demos'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  chartHtml,
  chartJsx,
  chartSvelteFiles,
} from './snippets/svelte/charts'
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

export default function ChartsLineCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Line Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Track washes, pigment load, plate output, and studio sensors over time.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Basic line"
          title="Basic line"
          description="Single-series line chart"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Data labels"
          title="Line with data labels"
          description="Plate counts and pigment levels across the studio week"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Gradient line"
          title="Gradient line"
          description="GradientLineChart fills under a smooth stroke"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Dashed line"
          title="Dashed line"
          description="Compare weekly production targets (dashed) against plates finished"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Stepline"
          title="Stepline"
          description="Moisture % holds steady between checkpoints, then drops at each"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · Missing data"
          title="Line with missing data"
          description="Studio humidity readings with brief sensor outages"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Time series"
          title="Zoomable timeseries"
          description="Drag on the chart to zoom the x-axis"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Annotations"
          title="Line with annotations"
          description="Mark ship dates, quality thresholds, pigment change events"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="09 · Realtime"
          title="Realtime"
          description="Rolling window line chart"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<PigmentSensorDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="10 · Synced"
          title="Syncing charts"
          description="SyncedChartPanel stacks line, area, and column charts"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="11 · Brush"
          title="Brush charts"
          description="Drag the shaded window on the brush chart to zoom the main chart"
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
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="12 · Downsample"
          title="Line large dataset downsampling"
          description="Default LTTB downsampling preserves the humidity curve shape while"
        >
          <ShowcaseTabs
            preview={<DownsampleDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="13 · Tooltips"
          title="Line with annotation tooltips"
          description="Interactive tooltips on chart annotations"
        >
          <ShowcaseTabs
            preview={<LineAnnotationTooltipsDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="14 · Drilldown"
          title="Line with drilldown"
          description="Click a series segment to drill into a detail view of plate batches"
        >
          <ShowcaseTabs
            preview={<LineDrilldownDemo />}
          
            html={chartHtml}
            jsx={chartJsx}
            svelteFiles={chartSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
