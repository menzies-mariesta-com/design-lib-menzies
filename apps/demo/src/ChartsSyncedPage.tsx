import {
  AreaChart,
  createSyncGroupId,
  LineChart,
  SyncedChartPanel,
  SyncedCharts,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  dryTimeTrend,
  pigmentLoadTrend,
  syncedStudioMetrics,
  washWeekLabels,
  weeklyWashCounts,
} from './data/chart-samples'

const demoSyncGroup = createSyncGroupId('demo-studio')

export default function ChartsSyncedPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Synced charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Link multiple Wash charts with a shared ApexCharts group. Zoom or pan on one chart and
          the others follow on the same date range.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Panel"
          title="Studio week dashboard"
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
          eyebrow="02 · Compose"
          title="Manual sync group"
          description="Wrap charts in SyncedCharts. Each chart reads the shared group from context."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <SyncedCharts syncGroupId={`${demoSyncGroup}-manual`}>
                <LineChart
                  height={220}
                  categories={[...washWeekLabels]}
                  series={[{ name: 'Washes', data: weeklyWashCounts }]}
                  chartId="sync-washes"
                  className="wash-chart-synced"
                  showToolbar={false}
                  options={{ yaxis: { title: { text: 'Washes' } } }}
                />
                <AreaChart
                  height={220}
                  categories={[...washWeekLabels]}
                  series={[{ name: 'Pigment %', data: pigmentLoadTrend }]}
                  chartId="sync-pigment"
                  className="wash-chart-synced"
                  showToolbar
                  options={{ yaxis: { title: { text: 'Load %' } } }}
                />
              </SyncedCharts>
            }
            html={`<!-- SyncedCharts wrapper -->
<div class="wash-synced-charts">
  <div class="wash-chart wash-chart-synced"></div>
  <div class="wash-chart wash-chart-synced"></div>
</div>`}
            jsx={`import {
  SyncedCharts,
  LineChart,
  AreaChart,
  createSyncGroupId,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SyncedCharts syncGroupId={createSyncGroupId()}>
  <LineChart
    categories={weekLabels}
    series={[{ name: 'Washes', data: washCounts }]}
    chartId="sync-washes"
    className="wash-chart-synced"
    showToolbar={false}
  />
  <AreaChart
    categories={weekLabels}
    series={[{ name: 'Pigment %', data: loadTrend }]}
    chartId="sync-pigment"
    className="wash-chart-synced"
    showToolbar
  />
</SyncedCharts>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Metrics"
          title="Dry time and pigment"
          description="Two area charts with toolbar on both. Drag to zoom on either chart."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <SyncedCharts>
                <AreaChart
                  height={240}
                  categories={[...washWeekLabels]}
                  series={[{ name: 'Dry min', data: dryTimeTrend }]}
                  chartId="sync-dry"
                  className="wash-chart-synced"
                  showToolbar
                  options={{ yaxis: { title: { text: 'Minutes' } } }}
                />
                <AreaChart
                  height={240}
                  categories={[...washWeekLabels]}
                  series={[{ name: 'Pigment %', data: pigmentLoadTrend }]}
                  chartId="sync-load"
                  className="wash-chart-synced"
                  showToolbar
                  options={{ yaxis: { title: { text: 'Load %' } } }}
                />
              </SyncedCharts>
            }
            html={`<!-- Synced area pair -->
<div class="wash-synced-charts"></div>`}
            jsx={`import { SyncedCharts, AreaChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<SyncedCharts>
  <AreaChart
    categories={weekLabels}
    series={[{ name: 'Dry min', data: dryTimes }]}
    chartId="sync-dry"
    className="wash-chart-synced"
    showToolbar
  />
  <AreaChart
    categories={weekLabels}
    series={[{ name: 'Pigment %', data: loads }]}
    chartId="sync-load"
    className="wash-chart-synced"
    showToolbar
  />
</SyncedCharts>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
