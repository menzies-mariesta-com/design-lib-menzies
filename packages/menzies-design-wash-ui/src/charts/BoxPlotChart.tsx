import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import 'apexcharts/features/stats'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions, readWashChartColors } from './theme'
import type { BoxPlotChartProps, WashBoxPlotSeries } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { BoxPlotChartProps }

function normalizeBoxPlotSeries(series: WashBoxPlotSeries[]): ApexOptions['series'] {
  return series.map((item) => ({
    ...item,
    type: 'boxPlot' as const,
    data: item.data.map((point) => ({
      x: point.x,
      ...(point.y ? { y: [...point.y] as [number, number, number, number, number] } : {}),
      ...(point.points ? { points: [...point.points] } : {}),
    })),
  }))
}

export function BoxPlotChart({
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
  showPoints = false,
  jitter = 0.45,
  whiskers = 'minmax',
  options,
}: BoxPlotChartProps) {
  const themeKey = useWashChartTheme()
  const chartSeries = useMemo(() => normalizeBoxPlotSeries(series), [series])

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    const palette = readWashChartColors(colors)
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
        chart: { type: 'boxPlot' },
        plotOptions: {
          bar: {
            horizontal,
            columnWidth: horizontal ? undefined : '50%',
            barHeight: horizontal ? '50%' : undefined,
          },
          boxPlot: {
            whiskers,
            colors: {
              upper: palette[0] ?? '#276c8e',
              lower: palette[1] ?? '#3b3b36',
            },
            points: {
              show: showPoints,
              size: 4,
              jitter,
              opacity: 0.85,
              strokeColor: '#fff',
              strokeWidth: 1,
            },
          },
        },
        stroke: { colors: ['var(--color-ink-border, #d1d5db)'] },
        xaxis: { type: 'category' },
      } as ApexOptions,
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
    showPoints,
    jitter,
    whiskers,
    options,
  ])

  return (
    <WashChart
      type="boxPlot"
      series={chartSeries}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
