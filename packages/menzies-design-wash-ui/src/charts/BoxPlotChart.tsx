import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
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
      ...point,
      y: [...point.y] as [number, number, number, number, number],
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
            colors: {
              upper: palette[0] ?? '#276c8e',
              lower: palette[1] ?? '#3b3b36',
            },
          },
        },
        stroke: { colors: ['var(--color-ink-border, #d1d5db)'] },
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
