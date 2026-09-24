import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { ViolinChartProps, WashViolinSeries } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { ViolinChartProps }

function normalizeViolinSeries(series: WashViolinSeries[]): ApexOptions['series'] {
  return series.map((item) => ({
    ...item,
    type: 'violin' as const,
    data: item.data.map((point) => ({
      x: point.x,
      y: {
        density: point.y.density.map(([value, weight]) => [value, weight] as [number, number]),
        ...(point.y.points ? { points: [...point.y.points] } : {}),
      },
    })),
  }))
}

export function ViolinChart({
  series,
  categories,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend = false,
  showToolbar = false,
  xaxisTitle,
  yaxisTitle,
  horizontal = false,
  distributed = false,
  showPoints = false,
  jitter = 0.6,
  normalize = 'individual',
  bandwidthScale = 1,
  constrainToViolin = false,
  options,
}: ViolinChartProps) {
  const themeKey = useWashChartTheme()
  const chartSeries = useMemo(() => normalizeViolinSeries(series), [series])

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
      buildCartesianOptions({
        title,
        subtitle,
        categories,
        xaxisTitle,
        yaxisTitle,
        showLegend,
        showToolbar,
        colors,
      }),
      {
        chart: { type: 'violin' },
        plotOptions: {
          bar: {
            horizontal,
            distributed,
            columnWidth: horizontal ? undefined : '70%',
            barHeight: horizontal ? '70%' : undefined,
          },
          violin: {
            bandwidthScale,
            normalize,
            points: {
              show: showPoints,
              size: 3,
              jitter,
              constrainToViolin,
              opacity: 0.85,
              strokeColor: '#fff',
              strokeWidth: 1,
            },
          },
        },
        stroke: { width: 1, colors: ['var(--color-ink-border, #d1d5db)'] },
        fill: { opacity: 0.72 },
        dataLabels: { enabled: false },
        xaxis: { type: 'category' },
      },
      options,
    )
  }, [
    themeKey,
    title,
    subtitle,
    categories,
    xaxisTitle,
    yaxisTitle,
    showLegend,
    showToolbar,
    colors,
    horizontal,
    distributed,
    showPoints,
    jitter,
    normalize,
    bandwidthScale,
    constrainToViolin,
    options,
  ])

  return (
    <WashChart
      type="violin"
      series={chartSeries}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
