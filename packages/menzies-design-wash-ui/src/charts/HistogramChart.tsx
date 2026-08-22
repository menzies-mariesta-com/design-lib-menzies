import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { histogramSeriesToBinned } from './histogram'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { HistogramChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { HistogramChartProps }

export function HistogramChart({
  series,
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
  bins = 'auto',
  binWidth,
  overlap = true,
  normalize = 'count',
  options,
}: HistogramChartProps) {
  const themeKey = useWashChartTheme()

  const { categories, binnedSeries } = useMemo(() => {
    const result = histogramSeriesToBinned(series, bins, binWidth, normalize)
    return { categories: result.categories, binnedSeries: result.series }
  }, [series, bins, binWidth, normalize])

  const resolvedYaxisTitle =
    yaxisTitle ??
    (normalize === 'relative' ? 'Share %' : normalize === 'density' ? 'Density' : 'Count')

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
      buildCartesianOptions({
        title,
        subtitle,
        categories,
        xaxisTitle,
        yaxisTitle: resolvedYaxisTitle,
        showLegend,
        showToolbar,
        colors,
      }),
      {
        chart: { type: 'bar' },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 4,
            columnWidth: overlap && binnedSeries.length > 1 ? '92%' : '68%',
          },
        },
        fill: {
          opacity: overlap && binnedSeries.length > 1 ? 0.55 : 0.85,
        },
        stroke: {
          width: overlap && binnedSeries.length > 1 ? 1 : 0,
          colors: ['transparent'],
        },
        dataLabels: { enabled: false },
        tooltip: {
          shared: overlap && binnedSeries.length > 1,
          intersect: !overlap || binnedSeries.length <= 1,
        },
      },
      options,
    )
  }, [
    themeKey,
    title,
    subtitle,
    categories,
    xaxisTitle,
    resolvedYaxisTitle,
    showLegend,
    showToolbar,
    colors,
    overlap,
    binnedSeries.length,
    options,
  ])

  return (
    <WashChart
      type="bar"
      series={binnedSeries}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
