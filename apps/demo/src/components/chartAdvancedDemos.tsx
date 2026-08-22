import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ApexChartEventOpts, ApexOptions } from 'apexcharts'
import {
  BarChart,
  BubbleChart,
  GanttChart,
  HeatmapChart,
  LineChart,
  LineChartWithAnnotations,
  ScatterChart,
  SunburstChart,
  TreemapChart,
  ViolinChart,
  WashChart,
  buildCartesianOptions,
  mergeApexOptions,
  type WashAnnotation,
  type WashTreemapPoint,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import {
  beeswarmBodyMassBySpecies,
  beeswarmGameScores,
  beeswarmLifeExpectancy,
  beeswarmSalaryByDepartment,
  calendarHeatmap2026,
  continuousDatetimeHeatmap,
  energyMixWaffle,
  heartDonorUnits,
  heatmapDrilldownSummary,
  heatmapGradientLegendScale,
  largeHeatmapGrid,
  marketMapTreemap,
  pigmentCollectionTreemap,
  pigmentLoadViolin,
  plateQualityTrend,
  studioCohortViolins,
  studioHierarchyTreemap,
  studioKpiBullet,
  timelineDumbbellRows,
  timelineGroupRowTracks,
  treemapColorScaleData,
  urbanTransitWaffles,
  pictogramPopulationUnits,
  parliamentSeats,
  workforceClusterUnits,
  washWeekLabels,
  weeklyPigmentLevels,
  weeklyWashCounts,
} from '../data/chart-samples'

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function ApproxNote({ label }: { label: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="badge badge-outline badge-sm">Approximation</span>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  )
}

function PremiumNote({ label }: { label: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="badge badge-warning badge-sm">Premium</span>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  )
}

type TreemapInput = {
  x: string
  y: number
  children?: readonly TreemapInput[]
}

function cloneTreemapNodes(nodes: readonly TreemapInput[]): WashTreemapPoint[] {
  return nodes.map((node) => ({
    x: node.x,
    y: node.y,
    ...(node.children ? { children: cloneTreemapNodes(node.children) } : {}),
  }))
}

function hashSeed(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) | 0
  return h
}

function beeswarmScatterSeries(
  groups: readonly { name: string; category: number; values: readonly number[] }[],
) {
  return groups.map((group) => ({
    name: group.name,
    data: group.values.map((value) => ({ x: group.category, y: value })),
  }))
}

function beeswarmBubbleSeries(
  groups: readonly {
    name: string
    category: number
    values: readonly number[]
    sizes?: readonly number[]
  }[],
) {
  return groups.map((group) => ({
    name: group.name,
    data: group.values.map((value, index) => {
      const seed = hashSeed(`${group.name}-${index}-${value}`)
      const jitter = ((seed % 1000) / 1000 - 0.5) * 0.65
      return {
        x: group.category + jitter,
        y: value,
        z: group.sizes?.[index] ?? 10,
      }
    }),
  }))
}

function toTimestamp(value: string): number {
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

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

type WaffleSegment = { label: string; share: number; color: string }

function buildWaffleCells(segments: readonly WaffleSegment[]) {
  const cells: WaffleSegment[] = []
  for (const segment of segments) {
    for (let i = 0; i < segment.share; i += 1) {
      cells.push(segment)
    }
  }
  while (cells.length < 100) {
    cells.push({ label: '', share: 0, color: 'var(--color-base-300, #e5e7eb)' })
  }
  return cells.slice(0, 100)
}

function WaffleGrid({
  title,
  segments,
}: {
  title: string
  segments: readonly WaffleSegment[]
}) {
  const cells = useMemo(() => buildWaffleCells(segments), [segments])
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-ink">{title}</p>
      <div
        className="grid grid-cols-10 gap-0.5 p-2"
        role="img"
        aria-label={`${title} waffle chart`}
      >
        {cells.map((cell, index) => (
          <div
            key={`${cell.label}-${index}`}
            className="aspect-square min-h-2 min-w-2 rounded-[2px] cursor-default"
            style={{ backgroundColor: cell.color }}
            title={cell.label || undefined}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-3 text-xs text-ink-muted">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: segment.color }}
            />
            {segment.label} ({segment.share}%)
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Heatmap demos
// ---------------------------------------------------------------------------

export function CalendarHeatmapDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        GitHub-style calendar grid for daily wash counts across 2026.
      </p>
      <HeatmapChart
        height={320}
        title="Studio washes · 2026"
        data={calendarHeatmap2026.data.map((point) => ({ ...point }))}
        xCategories={[...calendarHeatmap2026.weekLabels]}
        yCategories={[...calendarHeatmap2026.yCategories]}
        options={{
          plotOptions: { heatmap: { radius: 2, shadeIntensity: 0.55 } },
          stroke: { width: 0 },
        }}
      />
    </div>
  )
}

export function ContinuousDatetimeHeatmapDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Hourly pigment load buckets sampled across continuous studio days.
      </p>
      <HeatmapChart
        height={360}
        title="Continuous datetime pigment load"
        data={continuousDatetimeHeatmap.data.map((point) => ({ ...point }))}
        xCategories={[...continuousDatetimeHeatmap.hourLabels]}
        yCategories={[...continuousDatetimeHeatmap.dayLabels]}
        options={{
          plotOptions: { heatmap: { shadeIntensity: 0.5 } },
        }}
      />
    </div>
  )
}

export function GradientLegendHeatmapDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Ten-step gradient color scale with min and max pigment intensity labels.
      </p>
      <HeatmapChart
        height={320}
        data={continuousDatetimeHeatmap.data.slice(0, 168).map((point) => ({ ...point }))}
        xCategories={[...continuousDatetimeHeatmap.hourLabels]}
        yCategories={[...continuousDatetimeHeatmap.dayLabels.slice(0, 7)]}
        colorScale={heatmapGradientLegendScale}
        options={{
          legend: { position: 'bottom' },
          plotOptions: { heatmap: { shadeIntensity: 0.35 } },
        }}
      />
    </div>
  )
}

export function HeatmapDrilldownDemo() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const handleSelection = useCallback(
    (_event: MouseEvent, _ctx?: unknown, config?: ApexChartEventOpts) => {
      const dayIndex = config?.seriesIndex
      const hourIndex = config?.dataPointIndex
      if (dayIndex == null || hourIndex == null || dayIndex < 0 || hourIndex < 0) return
      const day = heatmapDrilldownSummary.categories[dayIndex]
      const hour = heatmapDrilldownSummary.hours[hourIndex]
      if (day && hour) setSelectedKey(`${day}-${hour}`)
    },
    [],
  )

  const detailData = selectedKey ? heatmapDrilldownSummary.details[selectedKey] : null

  if (selectedKey && detailData) {
    return (
      <div className="space-y-4">
        <DrilldownBackButton
          label={`Batch detail for ${selectedKey.replace('-', ' · ')}`}
          onBack={() => setSelectedKey(null)}
        />
        <HeatmapChart
          height={300}
          data={detailData.map((point) => ({ ...point }))}
          xCategories={['Batch A', 'Batch B', 'Batch C']}
          yCategories={['Plates', 'Glazes']}
          title={`Drilldown · ${selectedKey}`}
        />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Click a summary cell to drill into plate batch and glaze detail for that slot.
      </p>
      <HeatmapChart
        height={320}
        data={heatmapDrilldownSummary.data.map((point) => ({ ...point }))}
        xCategories={[...heatmapDrilldownSummary.hours]}
        yCategories={[...heatmapDrilldownSummary.categories]}
        title="Studio hour summary"
        options={{
          chart: { events: { dataPointSelection: handleSelection } },
        }}
      />
    </div>
  )
}

export function CanvasHeatmapDemo() {
  const cellCount = largeHeatmapGrid.data.length
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Canvas-backed renderer for large grids ({cellCount.toLocaleString()} cells). Switches to
        canvas when the cell count exceeds the threshold.
      </p>
      <HeatmapChart
        height={380}
        title="Large pigment usage matrix"
        data={largeHeatmapGrid.data.map((point) => ({ ...point }))}
        xCategories={[...largeHeatmapGrid.xCategories]}
        yCategories={[...largeHeatmapGrid.yCategories]}
        options={{
          chart: {
            renderer: 'auto',
            rendererThreshold: 500,
          },
          plotOptions: { heatmap: { shadeIntensity: 0.4 } },
          dataLabels: { enabled: false },
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Treemap demos
// ---------------------------------------------------------------------------

export function DistributedTreemapDemo() {
  return (
    <TreemapChart
      height={360}
      title={pigmentCollectionTreemap.title}
      data={pigmentCollectionTreemap.data.map((point) => ({ ...point }))}
      distributed
      enableShades={false}
    />
  )
}

export function ColorScaleTreemapDemo() {
  const colorScale = {
    min: 0,
    max: 100,
    ranges: [
      { from: 0, to: 40, color: '#276c8e', name: 'Low stock' },
      { from: 41, to: 65, color: '#4a7a8e', name: 'Medium' },
      { from: 66, to: 85, color: '#b87524', name: 'Healthy' },
      { from: 86, to: 100, color: '#a33a32', name: 'Full' },
    ],
  }
  return (
    <TreemapChart
      height={360}
      title="Pigment inventory color scale"
      data={treemapColorScaleData.map((point) => ({ ...point }))}
      colorScale={colorScale}
      showLegend
      options={{ legend: { position: 'bottom' } }}
    />
  )
}

export function TreemapDrilldownDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Click a parent tile to zoom into nested pigment batches. Use the breadcrumb to navigate
        back.
      </p>
      <TreemapChart
        height={380}
        title={studioHierarchyTreemap.title}
        data={cloneTreemapNodes(studioHierarchyTreemap.data)}
        enableShades
        options={{
          plotOptions: {
            treemap: {
              zoom: { enabled: true, breadcrumb: { show: true, rootLabel: 'All collections' } },
            },
          },
        }}
      />
    </div>
  )
}

export function MarketMapTreemapDemo() {
  return (
    <TreemapChart
      height={400}
      title={marketMapTreemap.title}
      data={cloneTreemapNodes(marketMapTreemap.data)}
      enableShades
      options={{
        plotOptions: {
          treemap: {
            nested: { enabled: true },
            parents: { show: 'auto' },
          },
        },
      }}
    />
  )
}

export function SunburstMorphTreemapDemo() {
  const [view, setView] = useState<'treemap' | 'sunburst'>('treemap')
  const hierarchy = useMemo(() => cloneTreemapNodes(studioHierarchyTreemap.data), [])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={[
            'btn btn-sm cursor-pointer',
            view === 'treemap' ? 'btn-primary' : 'btn-ghost',
          ].join(' ')}
          onClick={() => setView('treemap')}
        >
          Treemap
        </button>
        <button
          type="button"
          className={[
            'btn btn-sm cursor-pointer',
            view === 'sunburst' ? 'btn-primary' : 'btn-ghost',
          ].join(' ')}
          onClick={() => setView('sunburst')}
        >
          Sunburst
        </button>
      </div>
      <PremiumNote label="Animated treemap to sunburst morph requires Apex Premium morph feature. Toggle switches layout instantly in this approximation." />
      {view === 'treemap' ? (
        <TreemapChart height={380} title={studioHierarchyTreemap.title} data={hierarchy} enableShades />
      ) : (
        <SunburstChart
          height={380}
          title={studioHierarchyTreemap.title}
          series={[{ data: hierarchy }]}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Timeline demos
// ---------------------------------------------------------------------------

export function TimelineGroupRowsDemo() {
  const series = useMemo(
    () =>
      timelineGroupRowTracks.map((track) => ({
        name: track.name,
        tasks: track.tasks.map((task) => ({
          name: task.name,
          start: task.start,
          end: task.end,
          color: task.color,
        })),
      })),
    [],
  )

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">
        Multi-series rangeBar with grouped rows stacks batch phases on shared task lanes.
      </p>
      <GanttChart
        height={360}
        title="August pigment batches · grouped rows"
        series={series}
        showLegend
        options={{
          plotOptions: { bar: { rangeBarGroupRows: true, barHeight: '55%' } },
          legend: { position: 'top' },
        }}
      />
    </div>
  )
}

export function TimelineDumbbellDemo() {
  const dumbbellOptions = useMemo(
    (): ApexOptions =>
      mergeApexOptions(
        buildCartesianOptions({
          title: 'Plate production phases',
          showLegend: false,
        }),
        {
          chart: { type: 'rangeBar' },
          plotOptions: {
            bar: {
              horizontal: true,
              isDumbbell: true,
              barHeight: '50%',
              dumbbellColors: [['#3d7a8c', '#c49a3c']],
            },
          },
          xaxis: {
            type: 'datetime',
            labels: {
              datetimeFormatter: {
                month: "MMM 'yy",
                day: 'MMM d',
              },
            },
          },
          tooltip: {
            x: { format: 'MMM d, yyyy' },
          },
        },
      ),
    [],
  )

  return (
    <div className="space-y-3">
      <ApproxNote label="Horizontal dumbbell rangeBar approximates timeline start/end markers per phase." />
      <WashChart
        type="rangeBar"
        height={320}
        series={[
          {
            name: 'Phase window',
            data: timelineDumbbellRows.map((row) => ({
              x: row.phase,
              y: [toTimestamp(row.low), toTimestamp(row.high)] as [number, number],
            })),
          },
        ]}
        options={dumbbellOptions}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Violin demos
// ---------------------------------------------------------------------------

export function ViolinJitterDemo() {
  return (
    <ViolinChart
      height={360}
      title={pigmentLoadViolin.title}
      yaxisTitle="Pigment load %"
      showPoints
      jitter={0.75}
      series={[
        {
          name: 'Pigment load',
          data: pigmentLoadViolin.data.map((point) => ({
            x: point.x,
            y: {
              density: point.y.density.map(([value, weight]) => [value, weight] as [number, number]),
              points: point.y.points ? [...point.y.points] : undefined,
            },
          })),
        },
      ]}
    />
  )
}

export function ViolinGroupNormalizeDemo() {
  return (
    <ViolinChart
      height={380}
      title={studioCohortViolins.title}
      yaxisTitle="Pigment load %"
      showPoints
      normalize="group"
      showLegend
      series={studioCohortViolins.series.map((item) => ({
        name: item.name,
        data: item.data.map((point) => ({
          x: point.x,
          y: {
            density: point.y.density.map(([value, weight]) => [value, weight] as [number, number]),
            points: point.y.points ? [...point.y.points] : undefined,
          },
        })),
      }))}
      options={{ legend: { position: 'top' } }}
    />
  )
}

export function ViolinConstrainedJitterDemo() {
  return (
    <ViolinChart
      height={360}
      title="Constrained jitter · pigment load"
      yaxisTitle="Pigment load %"
      showPoints
      jitter={0.85}
      constrainToViolin
      series={[
        {
          name: 'Pigment load',
          data: pigmentLoadViolin.data.map((point) => ({
            x: point.x,
            y: {
              density: point.y.density.map(([value, weight]) => [value, weight] as [number, number]),
              points: point.y.points ? [...point.y.points] : undefined,
            },
          })),
        },
      ]}
    />
  )
}

export function ViolinDistributedDemo() {
  return (
    <ViolinChart
      height={360}
      title="Distributed colour violins"
      yaxisTitle="Pigment load %"
      distributed
      showPoints
      series={[
        {
          name: 'Pigment load',
          data: pigmentLoadViolin.data.map((point) => ({
            x: point.x,
            y: {
              density: point.y.density.map(([value, weight]) => [value, weight] as [number, number]),
              points: point.y.points ? [...point.y.points] : undefined,
            },
          })),
        },
      ]}
    />
  )
}

// ---------------------------------------------------------------------------
// Interactivity demos
// ---------------------------------------------------------------------------

type RulerPoint = { index: number; label: string; value: number }

export function MeasureRulerDemo() {
  const categories = [...washWeekLabels]
  const [points, setPoints] = useState<RulerPoint[]>([])

  const handleSelection = useCallback(
    (_event: MouseEvent, _ctx?: unknown, config?: ApexChartEventOpts) => {
      const index = config?.dataPointIndex
      if (index == null || index < 0 || index >= categories.length) return
      const next: RulerPoint = {
        index,
        label: categories[index],
        value: weeklyPigmentLevels[index],
      }
      setPoints((current) => {
        if (current.length >= 2) return [next]
        if (current.some((point) => point.index === index)) return current
        return [...current, next]
      })
    },
    [categories],
  )

  const delta =
    points.length === 2
      ? {
          value: points[1].value - points[0].value,
          span: Math.abs(points[1].index - points[0].index),
        }
      : null

  const chartOptions = useMemo(
    (): ApexOptions => ({
      chart: { events: { dataPointSelection: handleSelection } },
      markers: { size: points.length > 0 ? 6 : 4 },
    }),
    [handleSelection, points.length],
  )

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-muted">
        Click two points on the pigment trend to measure the delta. A third click resets the ruler.
      </p>
      <LineChart
        height={300}
        title="Pigment load trend"
        categories={categories}
        yaxisTitle="Load %"
        series={[{ name: 'Pigment load', data: [...weeklyPigmentLevels] }]}
        options={chartOptions}
      />
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {points.map((point) => (
          <span key={point.label} className="badge badge-primary badge-outline">
            {point.label}: {point.value}%
          </span>
        ))}
        {delta ? (
          <span className="text-ink-muted">
            Δ {delta.value > 0 ? '+' : ''}
            {delta.value}% over {delta.span} day{delta.span === 1 ? '' : 's'}
          </span>
        ) : (
          <span className="text-ink-muted">Select {2 - points.length} more point(s)</span>
        )}
        <button
          type="button"
          className="btn btn-ghost btn-xs cursor-pointer"
          disabled={points.length === 0}
          onClick={() => setPoints([])}
        >
          Clear ruler
        </button>
      </div>
    </div>
  )
}

export function AnnotationAuthoringDemoEnhanced() {
  const [annotations, setAnnotations] = useState<WashAnnotation[]>([
    {
      type: 'y',
      value: 75,
      label: 'Quality threshold',
      tone: 'primary',
    },
  ])
  const [nextLabel, setNextLabel] = useState('Studio milestone')

  const handleSelection = useCallback(
    (_event: MouseEvent, _ctx?: unknown, config?: ApexChartEventOpts) => {
      const index = config?.dataPointIndex
      if (index == null || index < 0 || index >= plateQualityTrend.length) return
      const point = plateQualityTrend[index]
      if (!point) return
      setAnnotations((current) => [
        ...current,
        {
          type: 'x',
          value: String(point.x),
          label: nextLabel,
          tone: 'warning',
        },
      ])
    },
    [nextLabel],
  )

  const chartOptions = useMemo(
    (): ApexOptions => ({
      chart: { events: { dataPointSelection: handleSelection } },
    }),
    [handleSelection],
  )

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-muted">
        Click data points to append vertical x annotations. Edit the label, then click to place.
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="form-control w-full max-w-xs">
          <span className="label-text text-xs">Next annotation label</span>
          <input
            className="input input-sm input-bordered w-full cursor-text"
            value={nextLabel}
            onChange={(event) => setNextLabel(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="btn btn-ghost btn-sm cursor-pointer"
          onClick={() => setAnnotations([])}
        >
          Clear annotations
        </button>
      </div>
      <LineChartWithAnnotations
        height={300}
        datetime
        yaxisTitle="Quality score"
        series={[{ name: 'Plate QA', data: plateQualityTrend.map((point) => ({ ...point })) }]}
        annotations={annotations}
        options={{
          ...chartOptions,
          yaxis: { min: 60, max: 90 },
        }}
      />
      <pre className="max-h-40 overflow-auto rounded-box bg-base-200 p-3 text-xs">
        {JSON.stringify(annotations, null, 2)}
      </pre>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Custom series
// ---------------------------------------------------------------------------

const bulletSeries = [
  {
    name: 'Target range',
    type: 'rangeBar' as const,
    data: studioKpiBullet.rows.map((row) => ({
      x: row.metric,
      y: [row.rangeMin, row.rangeMax] as [number, number],
    })),
  },
  {
    name: 'Actual',
    type: 'bar' as const,
    data: studioKpiBullet.rows.map((row) => ({
      x: row.metric,
      y: row.value,
      goals: [
        {
          name: 'Target',
          value: row.target,
          strokeWidth: 4,
          strokeHeight: 14,
        },
      ],
    })),
  },
]

const bulletOptions = mergeApexOptions(
  buildCartesianOptions({
    title: studioKpiBullet.title,
    xaxisTitle: 'Score',
    showLegend: false,
  }),
  {
    chart: { type: 'bar' },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '42%',
        rangeBarOverlap: false,
        colors: {
          backgroundBarColors: ['#94a3b833'],
          backgroundBarOpacity: 0.35,
          backgroundBarRadius: 4,
        },
      },
    },
    colors: ['#cbd5e1', '#6366f1'],
    fill: { opacity: [0.45, 1] },
    xaxis: { min: 0, max: 100 },
  },
)

export function CustomSeriesMarksDemo() {
  return (
    <div className="space-y-3">
      <ApproxNote label="Bullet rangeBar plus goal markers approximate Apex v6 registerSeriesType marks until Wash UI upgrades." />
      <WashChart type="bar" height={360} series={bulletSeries} options={bulletOptions} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Beeswarm demos
// ---------------------------------------------------------------------------

export function BeeswarmBodyMassDemo() {
  return (
    <div className="space-y-3">
      <ApproxNote label="ScatterChart jitterX approximates beeswarm lanes until Apex Premium beeswarm ships." />
      <ScatterChart
        height={360}
        title="Body mass by species (g)"
        yaxisTitle="Body mass"
        jitterX={0.35}
        series={beeswarmScatterSeries(beeswarmBodyMassBySpecies)}
        options={{
          xaxis: {
            type: 'numeric',
            min: -0.6,
            max: 2.6,
            tickAmount: 3,
            labels: {
              formatter(value) {
                const index = Math.round(Number(value))
                return beeswarmBodyMassBySpecies[index]?.name ?? String(value)
              },
            },
          },
        }}
      />
    </div>
  )
}

export function BeeswarmSalaryDemo() {
  return (
    <div className="space-y-3">
      <ApproxNote label="ScatterChart jitterX approximates salary beeswarm by department." />
      <ScatterChart
        height={360}
        title="Salary by department"
        yaxisTitle="Salary (USD)"
        jitterX={0.32}
        series={beeswarmScatterSeries(beeswarmSalaryByDepartment)}
        options={{
          xaxis: {
            type: 'numeric',
            min: -0.6,
            max: 3.6,
            tickAmount: 4,
            labels: {
              formatter(value) {
                const index = Math.round(Number(value))
                return beeswarmSalaryByDepartment[index]?.name ?? String(value)
              },
            },
          },
          yaxis: {
            labels: {
              formatter(value) {
                return `$${(Number(value) / 1000).toFixed(0)}k`
              },
            },
          },
        }}
      />
    </div>
  )
}

export function BeeswarmGameScoresDemo() {
  return (
    <div className="space-y-3">
      <ApproxNote label="BubbleChart with manual x jitter approximates score beeswarm with bubble radius encoding." />
      <BubbleChart
        height={360}
        title="Game scores by genre"
        yaxisTitle="Score"
        series={beeswarmBubbleSeries(beeswarmGameScores)}
        options={{
          xaxis: {
            type: 'numeric',
            min: -0.6,
            max: 2.6,
            tickAmount: 3,
            labels: {
              formatter(value) {
                const index = Math.round(Number(value))
                return beeswarmGameScores[index]?.name ?? String(value)
              },
            },
          },
        }}
      />
    </div>
  )
}

export function BeeswarmLifeExpectancyDemo() {
  return (
    <div className="space-y-3">
      <ApproxNote label="Multi-series scatter jitter approximates life expectancy beeswarm by decade." />
      <ScatterChart
        height={360}
        title="Life expectancy by decade"
        yaxisTitle="Years"
        jitterX={0.28}
        series={beeswarmScatterSeries(beeswarmLifeExpectancy)}
        options={{
          xaxis: {
            type: 'numeric',
            min: -0.6,
            max: 3.6,
            tickAmount: 4,
            labels: {
              formatter(value) {
                const index = Math.round(Number(value))
                return beeswarmLifeExpectancy[index]?.name ?? String(value)
              },
            },
          },
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Waffle demos
// ---------------------------------------------------------------------------

export function WaffleEnergyMixDemo() {
  const segments = energyMixWaffle.map((item) => ({
    label: item.source,
    share: item.share,
    color: item.color,
  }))
  return (
    <div className="space-y-3">
      <ApproxNote label="10×10 CSS grid cells approximate Apex Premium waffle charts." />
      <WaffleGrid title="Energy mix share" segments={segments} />
    </div>
  )
}

export function WaffleSmallMultiplesDemo() {
  return (
    <div className="space-y-4">
      <ApproxNote label="Small-multiple waffle grids per district." />
      <div className="grid gap-6 sm:grid-cols-2">
        {urbanTransitWaffles.map((district) => (
          <WaffleGrid
            key={district.district}
            title={district.district}
            segments={district.modes.map((mode) => ({
              label: mode.mode,
              share: mode.share,
              color: mode.color,
            }))}
          />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Unit demos
// ---------------------------------------------------------------------------

export function UnitPictogramDemo() {
  return (
    <div className="space-y-4">
      <ApproxNote label="Icon grids approximate Apex v6 unit pictogram marks." />
      <div className="grid gap-6 md:grid-cols-3">
        {pictogramPopulationUnits.map((row) => (
          <div key={row.region} className="space-y-2">
            <p className="text-sm font-medium">{row.region}</p>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: row.total }, (_, index) => (
                <span
                  key={index}
                  className="inline-block h-3 w-3 rounded-full cursor-default"
                  style={{ backgroundColor: index < row.units ? row.color : '#e5e7eb' }}
                  title={index < row.units ? 'Filled unit' : 'Empty unit'}
                />
              ))}
            </div>
            <p className="text-xs text-ink-muted">
              {row.units} / {row.total} units
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function UnitHeartDonorsDemo() {
  const filled = heartDonorUnits.registered
  return (
    <div className="space-y-4">
      <ApproxNote label="Heart tier grid approximates donor registration unit marks." />
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: heartDonorUnits.goal }, (_, index) => {
          const tier = heartDonorUnits.tiers.find((value) => index < value) ?? heartDonorUnits.goal
          const active = index < filled
          return (
            <span
              key={index}
              className="text-lg leading-none cursor-default"
              style={{ color: active ? '#9a4d6a' : '#e5e7eb' }}
              title={active ? `Registered · tier ${tier}` : 'Open slot'}
            >
              ♥
            </span>
          )
        })}
      </div>
      <p className="text-sm text-ink-muted">
        {filled} of {heartDonorUnits.goal} registration units filled
      </p>
    </div>
  )
}

export function UnitGlobePopulationDemo() {
  const globePoints = useMemo(
    () => [
      { name: 'Coastal', x: 20, y: 55, z: 42 },
      { name: 'Highland', x: 48, y: 38, z: 28 },
      { name: 'River delta', x: 72, y: 62, z: 35 },
      { name: 'Archipelago', x: 85, y: 28, z: 18 },
    ],
    [],
  )

  return (
    <div className="space-y-3">
      <ApproxNote label="BubbleChart on a synthetic globe plane approximates geo unit clusters." />
      <BubbleChart
        height={320}
        title="Globe population clusters"
        xaxisTitle="Longitude (approx)"
        yaxisTitle="Latitude (approx)"
        series={[{ name: 'Population units', data: globePoints }]}
        options={{
          xaxis: { min: 0, max: 100 },
          yaxis: { min: 0, max: 100 },
        }}
      />
    </div>
  )
}

export function UnitCityBubblesDemo() {
  const cities = useMemo(
    () => [
      { name: 'Boston', x: 22, y: 68, z: 24 },
      { name: 'New York', x: 28, y: 62, z: 38 },
      { name: 'London', x: 48, y: 58, z: 32 },
      { name: 'Paris', x: 52, y: 55, z: 26 },
      { name: 'Tokyo', x: 82, y: 52, z: 40 },
      { name: 'Melbourne', x: 86, y: 78, z: 18 },
    ],
    [],
  )

  return (
    <div className="space-y-3">
      <ApproxNote label="BubbleChart city anchors approximate map unit marks with footprint radius." />
      <BubbleChart
        height={340}
        title="City studio footprint"
        xaxisTitle="Map X"
        yaxisTitle="Map Y"
        series={[{ name: 'Studios', data: cities }]}
      />
    </div>
  )
}

export function UnitParliamentDemo() {
  const totalSeats = parliamentSeats.reduce((sum, party) => sum + party.seats, 0)
  const rows = 6
  const seatsPerRow = Math.ceil(totalSeats / rows)
  let seatIndex = 0

  const dots: { color: string; party: string }[] = []
  for (const party of parliamentSeats) {
    for (let i = 0; i < party.seats; i += 1) {
      dots.push({ color: party.color, party: party.party })
    }
  }

  return (
    <div className="space-y-4">
      <ApproxNote label="Semicircle dot grid approximates parliament unit seat layout." />
      <div className="mx-auto flex max-w-lg flex-col items-center gap-1">
        {Array.from({ length: rows }, (_, row) => {
          const count = Math.min(seatsPerRow, totalSeats - row * seatsPerRow)
          return (
            <div
              key={row}
              className="flex justify-center gap-1"
              style={{ paddingLeft: row * 6, paddingRight: row * 6 }}
            >
              {Array.from({ length: count }, () => {
                const dot = dots[seatIndex]
                seatIndex += 1
                return (
                  <span
                    key={`${dot.party}-${seatIndex}`}
                    className="inline-block h-2.5 w-2.5 rounded-full cursor-default"
                    style={{ backgroundColor: dot?.color ?? '#e5e7eb' }}
                    title={dot?.party}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      <ul className="flex flex-wrap justify-center gap-3 text-xs text-ink-muted">
        {parliamentSeats.map((party) => (
          <li key={party.party} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: party.color }}
            />
            {party.party} ({party.seats})
          </li>
        ))}
      </ul>
    </div>
  )
}

export function UnitPopulationExplorerDemo() {
  const [activeDays, setActiveDays] = useState<Set<number>>(
    () => new Set(washWeekLabels.map((_, index) => index)),
  )

  const activeIndices = washWeekLabels
    .map((_, index) => index)
    .filter((index) => activeDays.has(index))

  const filteredLabels = activeIndices.map((index) => washWeekLabels[index])
  const filteredWash = activeIndices.map((index) => weeklyWashCounts[index])
  const filteredPigment = activeIndices.map((index) => weeklyPigmentLevels[index])

  return (
    <div className="space-y-4">
      <ApproxNote label="Day toggles drive linked bar unit counts and pigment trend." />
      <div className="flex flex-wrap gap-2">
        {washWeekLabels.map((label, index) => {
          const active = activeDays.has(index)
          return (
            <button
              key={label}
              type="button"
              className={['btn btn-xs cursor-pointer', active ? 'btn-primary' : 'btn-ghost'].join(
                ' ',
              )}
              onClick={() =>
                setActiveDays((current) => {
                  const next = new Set(current)
                  if (next.has(index)) {
                    if (next.size === 1) return current
                    next.delete(index)
                  } else {
                    next.add(index)
                  }
                  return next
                })
              }
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <BarChart
          height={260}
          title="Wash units per day"
          categories={filteredLabels}
          yaxisTitle="Washes"
          series={[{ name: 'Washes', data: filteredWash }]}
        />
        <LineChart
          height={260}
          title="Pigment load trend"
          categories={filteredLabels}
          yaxisTitle="Load %"
          series={[{ name: 'Pigment load', data: filteredPigment }]}
        />
      </div>
    </div>
  )
}

export function UnitWorkforceClustersDemo() {
  return (
    <div className="space-y-6">
      <ApproxNote label="Role-colored unit clusters grouped by department." />
      {workforceClusterUnits.map((cluster) => (
        <div key={cluster.department} className="space-y-2">
          <p className="text-sm font-medium">{cluster.department}</p>
          <div className="flex flex-wrap gap-4">
            {cluster.roles.map((role) => (
              <div key={role.role} className="space-y-1">
                <p className="text-xs text-ink-muted">{role.role}</p>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: role.count }, (_, index) => (
                    <span
                      key={index}
                      className="inline-block h-3 w-3 rounded-sm cursor-default"
                      style={{ backgroundColor: role.color }}
                      title={role.role}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Narrative demos
// ---------------------------------------------------------------------------

const scrollySteps = [
  { title: 'Week open', detail: 'Monday wash volume sets the studio baseline.', days: 1 },
  { title: 'Midweek peak', detail: 'Wednesday and Thursday drive pigment load upward.', days: 3 },
  { title: 'Weekend taper', detail: 'Saturday and Sunday show lighter throughput.', days: 2 },
] as const

export function ScrollytellingDemo() {
  const [step, setStep] = useState(0)
  const visibleCount = scrollySteps.slice(0, step + 1).reduce((sum, item) => sum + item.days, 0)
  const categories = washWeekLabels.slice(0, visibleCount)
  const washSlice = weeklyWashCounts.slice(0, visibleCount)
  const pigmentSlice = weeklyPigmentLevels.slice(0, visibleCount)

  return (
    <div className="space-y-4">
      <ApproxNote label="Step buttons simulate scroll-driven narrative beats until scrollytelling helpers ship." />
      <div className="flex flex-wrap gap-2">
        {scrollySteps.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={['btn btn-sm cursor-pointer', step === index ? 'btn-primary' : 'btn-ghost'].join(
              ' ',
            )}
            onClick={() => setStep(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <p className="text-sm text-ink-muted">{scrollySteps[step].detail}</p>
      <LineChart
        height={280}
        title="Studio week narrative"
        categories={[...categories]}
        yaxisTitle="Washes"
        series={[{ name: 'Washes', data: washSlice }]}
      />
      <LineChart
        height={220}
        title="Linked pigment load"
        categories={[...categories]}
        yaxisTitle="Load %"
        series={[{ name: 'Pigment load', data: pigmentSlice }]}
        options={{ stroke: { dashArray: 4 } }}
      />
    </div>
  )
}

export function ShareableViewDemo() {
  const defaultState = useMemo(
    () => ({
      chart: 'weekly-wash',
      days: washWeekLabels.join(','),
      theme: 'wash',
    }),
    [],
  )
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(defaultState)
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`)
  }, [defaultState])

  return (
    <div className="space-y-4">
      <ApproxNote label="URL encodes chart id, active days, and theme token for shareable views." />
      <LineChart
        height={260}
        title="Weekly washes (shareable)"
        categories={[...washWeekLabels]}
        yaxisTitle="Washes"
        series={[{ name: 'Washes', data: [...weeklyWashCounts] }]}
      />
      <div className="flex flex-wrap items-center gap-2">
        <input
          className="input input-sm input-bordered min-w-0 flex-1 cursor-text font-mono text-xs"
          readOnly
          value={shareUrl}
        />
        <button
          type="button"
          className="btn btn-primary btn-sm cursor-pointer"
          onClick={() => void navigator.clipboard.writeText(shareUrl)}
        >
          Copy link
        </button>
      </div>
    </div>
  )
}

export function UndoRedoPremiumDemo() {
  const [history, setHistory] = useState<WashAnnotation[][]>([
    [
      {
        type: 'x',
        value: '2026-08-04',
        label: 'First wash',
        tone: 'primary',
      },
    ],
  ])
  const [cursor, setCursor] = useState(0)

  const annotations = history[cursor] ?? []

  const pushState = useCallback(
    (next: WashAnnotation[]) => {
      setHistory((current) => {
        const trimmed = current.slice(0, cursor + 1)
        return [...trimmed, next]
      })
      setCursor((value) => value + 1)
    },
    [cursor],
  )

  const undo = useCallback(() => {
    setCursor((value) => Math.max(0, value - 1))
  }, [])

  const redo = useCallback(() => {
    setCursor((value) => Math.min(history.length - 1, value + 1))
  }, [history.length])

  const addAnnotation = useCallback(() => {
    const stamp = plateQualityTrend[cursor % plateQualityTrend.length]
    if (!stamp) return
    pushState([
      ...annotations,
      {
        type: 'x',
        value: String(stamp.x),
        label: `Edit ${cursor + 1}`,
        tone: 'warning',
      },
    ])
  }, [annotations, cursor, pushState])

  return (
    <div className="space-y-4">
      <PremiumNote label="Undo redo interaction history with keyboard shortcuts ships with Apex Premium history module." />
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-sm btn-secondary cursor-pointer" onClick={addAnnotation}>
          Add annotation
        </button>
        <button
          type="button"
          className="btn btn-sm btn-ghost cursor-pointer"
          disabled={cursor === 0}
          onClick={undo}
        >
          Undo
        </button>
        <button
          type="button"
          className="btn btn-sm btn-ghost cursor-pointer"
          disabled={cursor >= history.length - 1}
          onClick={redo}
        >
          Redo
        </button>
      </div>
      <LineChartWithAnnotations
        height={280}
        datetime
        yaxisTitle="Quality score"
        series={[{ name: 'Plate QA', data: plateQualityTrend.map((point) => ({ ...point })) }]}
        annotations={annotations}
        options={{ yaxis: { min: 60, max: 90 } }}
      />
      <p className="text-xs text-ink-muted">
        History depth: {cursor + 1} / {history.length} states
      </p>
    </div>
  )
}
