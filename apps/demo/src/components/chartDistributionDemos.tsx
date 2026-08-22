import { useCallback, useMemo, useState } from 'react'
import type { ApexChartEventOpts, ApexOptions } from 'apexcharts'
import {
  BarChart,
  BoxPlotChart,
  HistogramChart,
  ScatterChart,
  SunburstChart,
  WashChart,
  binHistogramObservations,
  buildCartesianOptions,
  buildHistogramBinEdges,
  mergeApexOptions,
} from '@menzies-mariesta-com/menzies-design-wash-ui/charts'
import {
  horizontalStudioLaneBoxPlotWithPoints,
  latencyDistributionObservations,
  pigmentDryTimeBoxPlotScatter,
  pigmentDryTimeBoxPlotWithPoints,
  pigmentDryTimeRawObservations,
  sharedPigmentDryTimeComparison,
  studioPigmentSunburst,
  sunburstDrilldownBarSummary,
} from '../data/chart-samples'

function ApproxNote({ label }: { label: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="badge badge-outline badge-sm">Approximation</span>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  )
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

export function BoxPlotWithPointsDemo() {
  return (
    <BoxPlotChart
      height={380}
      title={pigmentDryTimeBoxPlotWithPoints.title}
      yaxisTitle="Dry time (min)"
      showPoints
      whiskers="tukey"
      jitter={0.5}
      series={[
        {
          name: 'Dry time',
          data: pigmentDryTimeBoxPlotWithPoints.data.map((point) => ({
            x: point.x,
            y: [...point.y] as [number, number, number, number, number],
            points: [...point.points],
          })),
        },
      ]}
    />
  )
}

export function BoxPlotScatterComboDemo() {
  const options = useMemo(
    (): ApexOptions =>
      mergeApexOptions(
        buildCartesianOptions({
          title: pigmentDryTimeBoxPlotScatter.title,
          yaxisTitle: 'Dry time (min)',
          showLegend: true,
        }),
        {
          chart: { type: 'boxPlot' },
          plotOptions: {
            bar: { columnWidth: '50%' },
            boxPlot: {
              colors: { upper: '#276c8e', lower: '#3b3b36' },
            },
          },
          markers: {
            size: 6,
            strokeWidth: 2,
            strokeColors: '#fff',
            hover: { size: 8 },
          },
          stroke: { width: [0, 0], colors: ['transparent', '#a33a32'] },
          colors: ['#276c8e', '#a33a32'],
          legend: { position: 'top' },
        },
      ),
    [],
  )

  return (
    <WashChart
      type="boxPlot"
      height={380}
      series={[
        {
          name: 'Dry time',
          type: 'boxPlot',
          data: pigmentDryTimeBoxPlotScatter.boxData.map((point) => ({
            x: point.x,
            y: [...point.y] as [number, number, number, number, number],
          })),
        },
        {
          name: 'Outliers',
          type: 'scatter',
          data: pigmentDryTimeBoxPlotScatter.outliers.map((point) => ({ ...point })),
        },
      ]}
      options={options}
    />
  )
}

export function HorizontalBoxPlotWithPointsDemo() {
  return (
    <BoxPlotChart
      height={380}
      horizontal
      title={horizontalStudioLaneBoxPlotWithPoints.title}
      xaxisTitle="Critique score"
      showPoints
      whiskers="tukey"
      jitter={0.55}
      series={[
        {
          name: 'Score spread',
          data: horizontalStudioLaneBoxPlotWithPoints.data.map((point) => ({
            x: point.x,
            y: [...point.y] as [number, number, number, number, number],
            points: [...point.points],
          })),
        },
      ]}
    />
  )
}

export function BoxPlotFromObservationsDemo() {
  return (
    <div className="space-y-3">
      <ApproxNote label="Apex stats derives five-number summaries from each point's observations array." />
      <BoxPlotChart
        height={380}
        title={pigmentDryTimeRawObservations.title}
        yaxisTitle="Dry time (min)"
        showPoints
        whiskers="tukey"
        jitter={0.45}
        series={[
          {
            name: 'Dry time',
            data: pigmentDryTimeRawObservations.data.map((point) => ({
              x: point.x,
              points: [...point.points],
            })),
          },
        ]}
      />
    </div>
  )
}

export function SameBoxDifferentDataDemo() {
  return (
    <BoxPlotChart
      height={400}
      title={sharedPigmentDryTimeComparison.title}
      yaxisTitle="Dry time (min)"
      showLegend
      series={sharedPigmentDryTimeComparison.series.map((item) => ({
        name: item.name,
        data: item.data.map((point) => ({
          x: point.x,
          y: [...point.y] as [number, number, number, number, number],
        })),
      }))}
      options={{ legend: { position: 'top' } }}
    />
  )
}

const latencyBinEdges = buildHistogramBinEdges(
  [...latencyDistributionObservations],
  'auto',
)

export function HistogramExplodeDemo() {
  const [selectedBin, setSelectedBin] = useState<number | null>(null)

  const binnedPoints = useMemo(
    () => binHistogramObservations([...latencyDistributionObservations], latencyBinEdges),
    [],
  )

  const handleSelection = useCallback(
    (_event: MouseEvent, _ctx?: unknown, config?: ApexChartEventOpts) => {
      const index = config?.dataPointIndex
      if (index == null || index < 0 || index >= binnedPoints.length) return
      setSelectedBin(index)
    },
    [binnedPoints.length],
  )

  const chartOptions = useMemo(
    (): ApexOptions => ({
      chart: { events: { dataPointSelection: handleSelection } },
    }),
    [handleSelection],
  )

  const activeBin = selectedBin != null ? binnedPoints[selectedBin] : null
  const explodedObservations = useMemo(() => {
    if (!activeBin) return []
    return [...latencyDistributionObservations].filter(
      (value) =>
        value >= activeBin.xMin &&
        (selectedBin === binnedPoints.length - 1 ? value <= activeBin.xMax : value < activeBin.xMax),
    )
  }, [activeBin, selectedBin, binnedPoints.length])

  if (activeBin) {
    return (
      <div className="space-y-4">
        <DrilldownBackButton
          label={`${explodedObservations.length} observations in ${activeBin.x} ms`}
          onBack={() => setSelectedBin(null)}
        />
        <ScatterChart
          height={320}
          title="Latency observations"
          xaxisTitle="Request index"
          yaxisTitle="Latency (ms)"
          jitterX={0.15}
          series={[
            {
              name: 'Latency',
              data: explodedObservations.map((y, index) => ({ x: index + 1, y })),
            },
          ]}
          options={{
            xaxis: { tickAmount: Math.min(8, explodedObservations.length) },
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <ApproxNote label="Click a histogram bin to explode into raw latency scatter points. Native rowSeries() is not wired in react-apexcharts here." />
      <HistogramChart
        height={360}
        title="Studio API latency"
        xaxisTitle="Latency (ms)"
        yaxisTitle="Requests"
        bins="auto"
        series={[{ name: 'Latency', data: [...latencyDistributionObservations] }]}
        options={chartOptions}
      />
    </div>
  )
}

const sunburstDrilldownBranches: Record<
  string,
  { title: string; data: typeof studioPigmentSunburst.data }
> = {
  'Earth pigments': {
    title: 'Earth pigments sunburst',
    data: studioPigmentSunburst.data.filter((node) => node.x === 'Earth pigments'),
  },
  'Mineral blues': {
    title: 'Mineral blues sunburst',
    data: studioPigmentSunburst.data.filter((node) => node.x === 'Mineral blues'),
  },
  'Organic lakes': {
    title: 'Organic lakes sunburst',
    data: studioPigmentSunburst.data.filter((node) => node.x === 'Organic lakes'),
  },
}

export function SunburstFromDrilldownDemo() {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null)

  const handleSelection = useCallback(
    (_event: MouseEvent, _ctx?: unknown, config?: ApexChartEventOpts) => {
      const index = config?.dataPointIndex
      if (index == null || index < 0) return
      const family = sunburstDrilldownBarSummary.categories[index]
      if (family) setSelectedFamily(family)
    },
    [],
  )

  const summaryOptions = useMemo(
    (): ApexOptions => ({
      chart: { events: { dataPointSelection: handleSelection } },
    }),
    [handleSelection],
  )

  const branch = selectedFamily ? sunburstDrilldownBranches[selectedFamily] : null

  if (selectedFamily && branch) {
    return (
      <div className="space-y-4">
        <DrilldownBackButton
          label={`Sunburst drilldown · ${selectedFamily}`}
          onBack={() => setSelectedFamily(null)}
        />
        <SunburstChart
          height={380}
          title={branch.title}
          series={[{ name: 'Allocation', data: branch.data.map((node) => ({ ...node })) }]}
          innerSize="22%"
          borderRadius={5}
          spacing={1}
        />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <ApproxNote label="Click a bar to hand off into a sunburst branch. Animated treemap-to-sunburst morph needs Apex Premium." />
      <BarChart
        height={320}
        title={sunburstDrilldownBarSummary.title}
        categories={[...sunburstDrilldownBarSummary.categories]}
        yaxisTitle="Allocation units"
        series={[
          {
            name: 'Share',
            data: [...sunburstDrilldownBarSummary.values],
          },
        ]}
        options={summaryOptions}
      />
    </div>
  )
}
