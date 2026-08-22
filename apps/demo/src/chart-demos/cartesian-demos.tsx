import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ApexChartEventOpts, ApexOptions } from 'apexcharts'
import {
  BarChart,
  ColumnChart,
  LineChart,
  ScatterChart,
  WashChart,
  buildCartesianOptions,
  mergeApexOptions,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import {
  barCustomLabelRows,
  batchYieldRange,
  dynamicColumnMonths,
  dynamicColumnPlates,
  generateLargeScatterSeries,
  groupedStackedBarSample,
  groupedStackedColumnSample,
  largeScatterPointCount,
  lineDrilldownDetails,
  lineDrilldownSummary,
  plateQualityAnnotationEvents,
  plateQualityTrend,
  scatterImageMarkerSample,
  semesterPlateCategories,
  semesterPlateCounts,
  seriesPlateCounts,
  studioLeaderboardRace,
  studioSeriesDrilldownDetails,
  studioSeriesDrilldownSummary,
  throughputDumbbell,
} from '../data/chart-samples'

function DrilldownBackButton({ label, onBack }: { label: string; onBack: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-ink-muted">{label}</p>
      <button type="button" className="btn btn-ghost btn-sm cursor-pointer" onClick={onBack}>
        Back to summary
      </button>
    </div>
  )
}

export function LineAnnotationTooltipsDemo() {
  const eventSeries = useMemo(
    () => [
      {
        name: 'Plate QA',
        type: 'line' as const,
        data: plateQualityTrend,
      },
      {
        name: 'Studio events',
        type: 'scatter' as const,
        data: plateQualityAnnotationEvents.map((event) => ({
          x: event.x,
          y: event.y,
        })),
      },
    ],
    [],
  )

  const options = useMemo(
    (): ApexOptions =>
      mergeApexOptions(
        buildCartesianOptions({
          yaxisTitle: 'Quality score',
          showLegend: false,
        }),
        {
          chart: { type: 'line' },
          stroke: { width: [2, 0], curve: 'smooth' },
          markers: {
            size: [4, 8],
            strokeWidth: [0, 2],
            strokeColors: ['transparent', '#fff'],
            hover: { size: 10 },
          },
          annotations: {
            yaxis: [
              {
                y: 75,
                borderColor: '#276c8e',
                borderWidth: 2,
                strokeDashArray: 6,
                label: {
                  text: 'Quality threshold',
                  position: 'right',
                  style: { background: '#276c8e', color: '#fff' },
                },
              },
            ],
          },
          tooltip: {
            shared: false,
            intersect: true,
            custom({ seriesIndex, dataPointIndex }) {
              if (seriesIndex !== 1) return ''
              const event = plateQualityAnnotationEvents[dataPointIndex]
              if (!event) return ''
              return `<div class="apexcharts-tooltip-title">${event.title}</div>
<div class="apexcharts-tooltip-series-group apexcharts-active">
<div class="apexcharts-tooltip-text">
<div class="apexcharts-tooltip-y-group">
<span class="apexcharts-tooltip-text-y-value">${event.detail}</span>
</div>
</div>
</div>`
            },
          },
        },
        {
          yaxis: { min: 60, max: 90 },
          xaxis: { type: 'datetime', labels: { datetimeUTC: false } },
        },
      ),
    [],
  )

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Hover event markers for ship dates and quality thresholds. The dashed line marks the QA
        threshold at 75.
      </p>
      <WashChart type="line" height={340} series={eventSeries} options={options} />
    </div>
  )
}

export function LineDrilldownDemo() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  const handleSelection = useCallback(
    (_event: MouseEvent, _ctx?: unknown, config?: ApexChartEventOpts) => {
      const index = config?.dataPointIndex
      if (index == null || index < 0) return
      const month = lineDrilldownSummary.categories[index]
      if (month) setSelectedMonth(month)
    },
    [],
  )

  const summaryOptions = useMemo(
    (): ApexOptions => ({
      chart: {
        events: { dataPointSelection: handleSelection },
      },
      markers: { size: 5, hover: { size: 7 } },
    }),
    [handleSelection],
  )

  if (selectedMonth) {
    const detail = lineDrilldownDetails[selectedMonth] ?? []
    return (
      <div className="space-y-4">
        <DrilldownBackButton
          label={`Weekly washes for ${selectedMonth}`}
          onBack={() => setSelectedMonth(null)}
        />
        <LineChart
          height={320}
          title={`${selectedMonth} weekly washes`}
          categories={detail.map((row) => row.week)}
          yaxisTitle="Washes"
          series={[{ name: 'Washes', data: detail.map((row) => row.washes) }]}
        />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Click a month on the summary line to drill into weekly wash counts.
      </p>
      <LineChart
        height={320}
        title="Monthly washes"
        categories={[...lineDrilldownSummary.categories]}
        yaxisTitle="Washes"
        series={[{ name: 'Washes', data: [...lineDrilldownSummary.data] }]}
        options={summaryOptions}
      />
    </div>
  )
}

function useColumnDrilldownState() {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [detailRows, setDetailRows] = useState<{ batch: string; plates: number }[]>([])

  const drillTo = useCallback((seriesName: string, asyncDelay = 0) => {
    setSelectedSeries(seriesName)
    setLoading(asyncDelay > 0)
    setDetailRows([])

    const load = () => {
      setDetailRows(studioSeriesDrilldownDetails[seriesName] ?? [])
      setLoading(false)
    }

    if (asyncDelay > 0) {
      window.setTimeout(load, asyncDelay)
    } else {
      load()
    }
  }, [])

  const reset = useCallback(() => {
    setSelectedSeries(null)
    setLoading(false)
    setDetailRows([])
  }, [])

  return { selectedSeries, loading, detailRows, drillTo, reset }
}

function ColumnDrilldownPanel({
  mode,
}: {
  mode: 'sync' | 'async' | 'zoom'
}) {
  const { selectedSeries, loading, detailRows, drillTo, reset } = useColumnDrilldownState()

  const handleSelection = useCallback(
    (_event: MouseEvent, _ctx?: unknown, config?: ApexChartEventOpts) => {
      const index = config?.dataPointIndex
      if (index == null || index < 0) return
      const row = studioSeriesDrilldownSummary[index]
      if (!row) return
      if (mode === 'async') {
        drillTo(row.series, 900)
      } else {
        drillTo(row.series)
      }
    },
    [drillTo, mode],
  )

  const summaryOptions = useMemo((): ApexOptions => {
    const base: ApexOptions = {
      chart: {
        events: { dataPointSelection: handleSelection },
      },
    }
    if (mode === 'zoom') {
      return mergeApexOptions(base, {
        chart: {
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 600,
          },
        },
        states: {
          active: { filter: { type: 'lighten', value: 0.08 } },
        },
      } as ApexOptions)
    }
    return base
  }, [handleSelection, mode])

  const detailOptions = useMemo((): ApexOptions | undefined => {
    if (mode !== 'zoom') return undefined
    return {
      chart: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 600,
        },
      },
    } as ApexOptions
  }, [mode])

  if (selectedSeries) {
    return (
      <div className="space-y-4">
        <DrilldownBackButton
          label={
            loading
              ? `Loading batches for ${selectedSeries}…`
              : `Batch breakdown · ${selectedSeries}`
          }
          onBack={reset}
        />
        {loading ? (
          <div className="flex h-[280px] items-center justify-center rounded-box border border-dashed border-ink-border/60 bg-base-100/40">
            <span className="loading loading-spinner loading-md text-primary" />
          </div>
        ) : (
          <ColumnChart
            height={300}
            title={`${selectedSeries} batches`}
            categories={detailRows.map((row) => row.batch)}
            series={[{ name: 'Plates', data: detailRows.map((row) => row.plates) }]}
            options={detailOptions}
          />
        )}
      </div>
    )
  }

  const hint =
    mode === 'async'
      ? 'Click a series column. Detail data loads asynchronously.'
      : mode === 'zoom'
        ? 'Click a column for an animated zoom transition into batch detail.'
        : 'Click a studio series column to drill into batch plate counts.'

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">{hint}</p>
      <ColumnChart
        height={300}
        title="Plates by studio series"
        categories={studioSeriesDrilldownSummary.map((row) => row.series)}
        series={[
          { name: 'Plates', data: studioSeriesDrilldownSummary.map((row) => row.plates) },
        ]}
        options={summaryOptions}
      />
    </div>
  )
}

export function ColumnDrilldownDemo() {
  return <ColumnDrilldownPanel mode="sync" />
}

export function ColumnDrilldownAsyncDemo() {
  return <ColumnDrilldownPanel mode="async" />
}

export function ColumnDrilldownZoomDemo() {
  return <ColumnDrilldownPanel mode="zoom" />
}

export function ColumnGroupLabelDemo() {
  const options = useMemo(
    (): ApexOptions => ({
      xaxis: {
        categories: [...semesterPlateCategories],
        group: {
          style: { fontSize: '12px', fontWeight: 600 },
          groups: [
            { title: 'H1', cols: 3 },
            { title: 'H2', cols: 3 },
          ],
        },
      },
    }),
    [],
  )

  return (
    <ColumnChart
      height={320}
      title="Plates by month"
      categories={[...semesterPlateCategories]}
      series={[{ name: 'Plates', data: [...semesterPlateCounts] }]}
      options={options}
    />
  )
}

export function ColumnMarkersDemo() {
  const data = seriesPlateCounts.map((row) => ({
    x: row.series,
    y: row.plates,
    goals: [{ name: 'Target', value: row.plates + 8, strokeWidth: 3, strokeHeight: 12 }],
  }))

  return (
    <ColumnChart
      height={320}
      title="Plates with targets"
      series={[{ name: 'Plates', data }]}
      options={{ legend: { show: false } }}
    />
  )
}

export function ColumnGroupedStackedDemo() {
  const sample = groupedStackedColumnSample
  const options = useMemo(
    (): ApexOptions => ({
      chart: { stacked: true },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '72%',
        },
      },
    }),
    [],
  )

  return (
    <ColumnChart
      height={340}
      stacked
      categories={[...sample.categories]}
      series={
        [
          { name: 'North cerulean', group: 'North wing', data: [...sample.northCerulean] },
          { name: 'North ochre', group: 'North wing', data: [...sample.northOchre] },
          { name: 'South cerulean', group: 'South wing', data: [...sample.southCerulean] },
          { name: 'South ochre', group: 'South wing', data: [...sample.southOchre] },
        ] as unknown as Parameters<typeof ColumnChart>[0]['series']
      }
      options={mergeApexOptions(options, { legend: { position: 'top' } })}
    />
  )
}

export function ColumnDistributedDemo() {
  const options = useMemo(
    (): ApexOptions => ({
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 6,
        },
      },
      legend: { show: false },
    }),
    [],
  )

  return (
    <ColumnChart
      height={320}
      categories={seriesPlateCounts.map((row) => row.series)}
      series={[{ name: 'Plates', data: seriesPlateCounts.map((row) => row.plates) }]}
      options={options}
    />
  )
}

export function ColumnRangeDemo() {
  const options = mergeApexOptions(
    buildCartesianOptions({
      title: 'Batch yield range',
      categories: batchYieldRange.map((row) => row.batch),
      yaxisTitle: 'Plates',
      showLegend: false,
    }),
    {
      chart: { type: 'rangeBar' },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '52%',
          borderRadius: 4,
        },
      },
    },
  )

  return (
    <WashChart
      type="rangeBar"
      height={320}
      series={[
        {
          name: 'Yield range',
          data: batchYieldRange.map((row) => ({
            x: row.batch,
            y: [row.low, row.high] as [number, number],
          })),
        },
      ]}
      options={options}
    />
  )
}

export function ColumnDumbbellDemo() {
  const options = mergeApexOptions(
    buildCartesianOptions({
      title: throughputDumbbell.title,
      categories: throughputDumbbell.rows.map((row) => row.period),
      yaxisTitle: 'Plates / day',
      showLegend: false,
    }),
    {
      chart: { type: 'rangeBar' },
      plotOptions: {
        bar: {
          isDumbbell: true,
          columnWidth: '42%',
        },
      },
    },
  )

  return (
    <WashChart
      type="rangeBar"
      height={320}
      series={[
        {
          name: 'Throughput',
          data: throughputDumbbell.rows.map((row) => ({
            x: row.period,
            y: [row.low, row.high] as [number, number],
          })),
        },
      ]}
      options={options}
    />
  )
}

export function ColumnDynamicLoadDemo() {
  const [visibleCount, setVisibleCount] = useState(6)

  const categories = dynamicColumnMonths.slice(0, visibleCount)
  const data = dynamicColumnPlates.slice(0, visibleCount)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Load more months on demand. Showing {visibleCount} of {dynamicColumnMonths.length}.
        </p>
        <button
          type="button"
          className="btn btn-secondary btn-sm cursor-pointer"
          disabled={visibleCount >= dynamicColumnMonths.length}
          onClick={() =>
            setVisibleCount((count) => Math.min(count + 3, dynamicColumnMonths.length))
          }
        >
          Load 3 more months
        </button>
      </div>
      <ColumnChart
        height={300}
        title="Monthly plate output"
        categories={[...categories]}
        series={[{ name: 'Plates', data }]}
      />
    </div>
  )
}

export function BarCustomLabelsDemo() {
  const options = useMemo(
    (): ApexOptions => ({
      dataLabels: {
        enabled: true,
        formatter: (_value, opts) =>
          barCustomLabelRows[opts?.dataPointIndex ?? 0]?.label ?? '',
        style: { fontSize: '11px', fontWeight: 600 },
        offsetX: 28,
      },
      plotOptions: {
        bar: {
          dataLabels: { position: 'top' },
        },
      },
    }),
    [],
  )

  return (
    <BarChart
      height={300}
      showDataLabels
      categories={barCustomLabelRows.map((row) => row.status)}
      series={[{ name: 'Plates', data: barCustomLabelRows.map((row) => row.count) }]}
      options={options}
    />
  )
}

export function BarGroupedStackedDemo() {
  const sample = groupedStackedBarSample
  return (
    <BarChart
      height={340}
      stacked
      categories={[...sample.categories]}
      series={
        [
          { name: 'Desk A cerulean', group: 'Desk A', data: [...sample.deskACerulean] },
          { name: 'Desk A ochre', group: 'Desk A', data: [...sample.deskAOchre] },
          { name: 'Desk B cerulean', group: 'Desk B', data: [...sample.deskBCerulean] },
          { name: 'Desk B ochre', group: 'Desk B', data: [...sample.deskBOchre] },
        ] as unknown as Parameters<typeof BarChart>[0]['series']
      }
      options={{
        chart: { stacked: true },
        legend: { position: 'top' },
      }}
    />
  )
}

export function BarPatternedDemo() {
  const options = useMemo(
    (): ApexOptions => ({
      fill: {
        type: 'pattern',
        pattern: {
          style: ['verticalLines', 'horizontalLines', 'slantedLines', 'squares'],
          width: 6,
          height: 6,
        },
      },
      legend: { position: 'top' },
    }),
    [],
  )

  return (
    <BarChart
      height={320}
      categories={['Cerulean', 'Ochre', 'Madder', 'Indigo']}
      series={[
        { name: 'Morning', data: [12, 10, 8, 9] },
        { name: 'Afternoon', data: [14, 11, 9, 10] },
        { name: 'Evening', data: [9, 8, 7, 6] },
      ]}
      options={options}
    />
  )
}

export function BarRaceDemo() {
  const [frameIndex, setFrameIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  const frame = studioLeaderboardRace.frames[frameIndex] ?? studioLeaderboardRace.frames[0]

  useEffect(() => {
    if (!playing) return undefined
    const id = window.setInterval(() => {
      setFrameIndex((index) => (index + 1) % studioLeaderboardRace.frames.length)
    }, 1800)
    return () => window.clearInterval(id)
  }, [playing])

  const sorted = useMemo(() => {
    const pairs = frame.artists.map((artist, index) => ({
      artist,
      score: frame.scores[index] ?? 0,
    }))
    return pairs.sort((a, b) => a.score - b.score)
  }, [frame])

  const options = useMemo(
    (): ApexOptions =>
      ({
      chart: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          dynamicAnimation: { enabled: true, speed: 800 },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '72%',
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (value) => `${value}`,
        offsetX: 24,
      },
      legend: { show: false },
      }) as ApexOptions,
    [],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Animated leaderboard for {frame.quarter}. Bars reorder as scores change.
        </p>
        <button
          type="button"
          className={`btn btn-sm cursor-pointer ${playing ? 'btn-ghost' : 'btn-primary'}`}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
      <BarChart
        height={300}
        categories={sorted.map((row) => row.artist)}
        series={[{ name: 'Score', data: sorted.map((row) => row.score) }]}
        options={options}
      />
    </div>
  )
}

export function ScatterImagesDemo() {
  const imageSrc = scatterImageMarkerSample[0]?.image ?? '/favicon.svg'
  const options = useMemo(
    (): ApexOptions =>
      mergeApexOptions(
        buildCartesianOptions({
          title: 'Pigment load by intensity',
          xaxisTitle: 'Wash intensity %',
          yaxisTitle: 'Load index',
          showLegend: true,
        }),
        {
          chart: { type: 'scatter' },
          markers: {
            size: 18,
            strokeWidth: 1,
            strokeColors: '#fff',
          },
          fill: {
            type: 'image',
            opacity: 1,
            image: {
              src: [imageSrc, imageSrc, imageSrc],
              width: 28,
              height: 28,
            },
          },
        },
      ),
    [imageSrc],
  )

  return (
    <WashChart
      type="scatter"
      height={360}
      series={scatterImageMarkerSample.map((item) => ({
        name: item.name,
        data: [...item.data],
      }))}
      options={options}
    />
  )
}

export function ScatterCanvasDemo() {
  const series = useMemo(
    () => generateLargeScatterSeries(largeScatterPointCount),
    [],
  )

  const options = useMemo(
    (): ApexOptions => ({
      chart: {
        animations: { enabled: false },
        zoom: { enabled: true },
      },
      markers: { size: 2.5, strokeWidth: 0 },
      tooltip: { shared: false, intersect: false },
    }),
    [],
  )

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        {largeScatterPointCount.toLocaleString()} points with animations disabled for responsive
        pan and zoom. Apex 5.16 renders scatter on SVG; this demo optimizes for large datasets.
      </p>
      <ScatterChart
        height={360}
        title="Large pigment scatter"
        xaxisTitle="Intensity %"
        yaxisTitle="Viscosity index"
        series={series}
        options={options}
      />
    </div>
  )
}
