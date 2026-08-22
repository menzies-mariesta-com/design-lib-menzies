import { useCallback, useState } from 'react'
import {
  ColumnChart,
  createSyncGroupId,
  DonutChart,
  LineChart,
  MixedChart,
  RealtimeLineChart,
  SparklineChart,
  SyncedChartPanel,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { Pause, Play } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  heroSparklines,
  mixedLineColumnSample,
  monthlyPigmentUsage,
  monthlyPlateOutputLabels,
  pigmentShare,
  syncedStudioMetrics,
  washWeekLabels,
} from './data/chart-samples'
import { readStoredTheme } from './themes'

const dashboardSyncGroup = createSyncGroupId('studio-dashboard')

function StatBlock({
  title,
  value,
  desc,
  data,
}: {
  title: string
  value: string
  desc: string
  data: readonly number[]
}) {
  return (
    <div className="rounded-box border border-ink-border/70 bg-base-100/80 p-4">
      <p className="text-xs text-ink-muted">{title}</p>
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="mb-2 text-xs text-ink-muted">{desc}</p>
      <SparklineChart data={[...data]} height={48} />
    </div>
  )
}

function ModernDashboardPreview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {heroSparklines.map((item) => (
          <StatBlock
            key={item.title}
            title={item.title}
            value={item.value}
            desc={item.desc}
            data={item.data}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MixedChart
            height={300}
            title="Plates and washes"
            categories={mixedLineColumnSample.categories}
            series={[
              { name: 'Plates', type: 'column', data: mixedLineColumnSample.plates },
              { name: 'Washes', type: 'line', data: mixedLineColumnSample.washes },
            ]}
          />
        </div>
        <DonutChart
          height={300}
          title="Pigment share"
          series={pigmentShare.map((p) => p.value)}
          labels={pigmentShare.map((p) => p.name)}
          showLegend
          options={{ legend: { position: 'bottom' } }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <LineChart
          height={240}
          title="Weekly plate output"
          categories={[...washWeekLabels]}
          series={[{ name: 'Plates', data: syncedStudioMetrics.plateOutput.data }]}
        />
        <ColumnChart
          height={240}
          title="Pigment usage by family"
          categories={monthlyPigmentUsage.map((m) => m.month)}
          series={[
            { name: 'Cerulean', data: monthlyPigmentUsage.map((m) => m.cerulean) },
            { name: 'Ochre', data: monthlyPigmentUsage.map((m) => m.ochre) },
            { name: 'Madder', data: monthlyPigmentUsage.map((m) => m.madder) },
          ]}
          stacked
          showLegend
        />
      </div>
    </div>
  )
}

function DarkDashboardPreview() {
  const darkTheme = `${readStoredTheme()}-dark`

  return (
    <div
      data-theme={darkTheme}
      className="rounded-box border border-ink-border/70 bg-base-100 p-4 md:p-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="label-ink">Dark desk</p>
          <h3 className="font-display text-lg font-semibold">Night studio overview</h3>
        </div>
        <span className="badge badge-outline badge-sm font-mono">{darkTheme}</span>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {heroSparklines.map((item) => (
            <StatBlock
              key={item.title}
              title={item.title}
              value={item.value}
              desc={item.desc}
              data={item.data}
            />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LineChart
              height={280}
              title="Monthly plate trend"
              categories={monthlyPlateOutputLabels}
              series={[
                {
                  name: 'Plates finished',
                  data: mixedLineColumnSample.plates,
                },
              ]}
              curved
            />
          </div>
          <DonutChart
            height={280}
            title="Pigment allocation"
            series={pigmentShare.map((p) => p.value)}
            labels={pigmentShare.map((p) => p.name)}
            showLegend
            options={{ legend: { position: 'bottom' } }}
          />
        </div>
      </div>
    </div>
  )
}

function RealtimeDashboardPreview() {
  const [paused, setPaused] = useState(false)

  const valueGenerator = useCallback(() => {
    const noise = (Math.random() - 0.5) * 12
    return Math.round(Math.max(38, Math.min(92, 68 + noise)))
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatBlock
          title="Live load"
          value="68%"
          desc="Rolling sensor average"
          data={[62, 64, 66, 68, 70, 69, 68]}
        />
        <StatBlock
          title="Tank level"
          value="74%"
          desc="Cerulean reserve"
          data={[70, 71, 72, 73, 74, 74, 74]}
        />
        <StatBlock
          title="Queue depth"
          value="3"
          desc="Plates awaiting wash"
          data={[5, 4, 4, 3, 3, 3, 3]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-muted">
              Pigment sensor stream with static companion metrics. Pause to inspect a frame.
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
              {paused ? 'Resume' : 'Pause'}
            </button>
          </div>
          <RealtimeLineChart
            height={280}
            seriesName="Pigment load %"
            yaxisTitle="Load %"
            paused={paused}
            valueGenerator={valueGenerator}
            intervalMs={1200}
            maxPoints={24}
            options={{ xaxis: { labels: { format: 'HH:mm:ss' } } }}
          />
        </div>
        <ColumnChart
          height={280}
          title="Hourly plate output"
          categories={[...washWeekLabels]}
          series={[{ name: 'Plates', data: syncedStudioMetrics.plateOutput.data }]}
        />
      </div>

      <SyncedChartPanel
        syncGroupId={dashboardSyncGroup}
        categories={[...washWeekLabels]}
        plateOutput={syncedStudioMetrics.plateOutput}
        dryTime={syncedStudioMetrics.dryTime}
        pigmentUse={syncedStudioMetrics.pigmentUse}
        height={160}
        showToolbar="last"
      />
    </div>
  )
}

export default function ChartsDashboardsCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Dashboards
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Multi-chart desk layouts combining KPI sparklines, mixed cartesian charts, donuts, synced
          panels, and realtime streams. Compose Wash chart primitives into studio overview grids.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Modern"
          title="Studio overview grid"
          description="Four-up sparkline stats above a mixed line/column hero, donut allocation, and supporting line and stacked column charts."
        >
          <ShowcaseTabs
            preview={<ModernDashboardPreview />}
            html={`<!-- Dashboard grid: stats + mixed + donut + line + column -->
<div class="grid gap-4">
  <div class="grid sm:grid-cols-2 xl:grid-cols-4"><!-- StatBlock + SparklineChart --></div>
  <div class="grid lg:grid-cols-3"><!-- MixedChart + DonutChart --></div>
</div>`}
            jsx={`import {
  ColumnChart,
  DonutChart,
  LineChart,
  MixedChart,
  SparklineChart,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  <div className="rounded-box border border-ink-border/70 bg-base-100/80 p-4">
    <p className="text-xs text-ink-muted">Washes this week</p>
    <p className="font-display text-2xl font-semibold">104</p>
    <SparklineChart data={[12, 18, 14, 22, 19, 8, 11]} height={48} />
  </div>
</div>
<MixedChart
  height={300}
  title="Plates and washes"
  categories={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
  series={[
    { name: 'Plates', type: 'column', data: [18, 22, 26, 24, 31, 28] },
    { name: 'Washes', type: 'line', data: [42, 58, 64, 61, 78, 72] },
  ]}
/>
<DonutChart height={300} series={[24, 18, 16, 14, 12, 16]} labels={['Cerulean', 'Ochre', 'Madder', 'Indigo', 'Viridian', 'Other']} showLegend />`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Dark theme"
          title="Night desk variant"
          description="Same KPI + chart grid scoped with Wash dark tokens via data-theme on the preview container."
          panel="wash-panel-slate"
        >
          <ShowcaseTabs
            preview={<DarkDashboardPreview />}
            html={`<!-- Dark dashboard shell -->
<div data-theme="mineral-dark" class="rounded-box bg-base-100 p-6">
  <!-- StatBlock row + LineChart + DonutChart -->
</div>`}
            jsx={`import { DonutChart, LineChart, SparklineChart } from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import { readStoredTheme } from './themes'

const darkTheme = \`\${readStoredTheme()}-dark\`

<div data-theme={darkTheme} className="rounded-box bg-base-100 p-6">
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {/* StatBlock + SparklineChart */}
  </div>
  <LineChart height={280} title="Monthly plate trend" categories={months} series={[{ name: 'Plates', data }]} />
  <DonutChart height={280} series={share} labels={labels} showLegend />
</div>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Realtime"
          title="Live sensor desk"
          description="RealtimeLineChart for pigment load with static column and synced companion charts for weekly studio metrics."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<RealtimeDashboardPreview />}
            html={`<!-- Realtime dashboard -->
<div class="grid gap-4">
  <div class="wash-chart wash-chart-realtime"></div>
  <div class="wash-synced-charts"></div>
</div>`}
            jsx={`import {
  ColumnChart,
  RealtimeLineChart,
  SyncedChartPanel,
  createSyncGroupId,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'

const syncGroup = createSyncGroupId('studio-dashboard')

<RealtimeLineChart
  height={280}
  seriesName="Pigment load %"
  intervalMs={1200}
  maxPoints={24}
  paused={false}
/>
<ColumnChart height={280} title="Hourly plate output" categories={days} series={[{ name: 'Plates', data }]} />
<SyncedChartPanel
  syncGroupId={syncGroup}
  categories={days}
  plateOutput={{ name: 'Plate output', data: plates }}
  dryTime={{ name: 'Dry time (min)', data: dry }}
  pigmentUse={{ name: 'Pigment load %', data: load }}
  height={160}
  showToolbar="last"
/>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
