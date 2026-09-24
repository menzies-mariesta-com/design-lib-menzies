import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import {
  buildCartesianOptions,
  buildLineDataLabelsOptions,
  mergeApexOptions,
} from './theme'
import type { WashCartesianChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type BarChartProps = WashCartesianChartProps & {
  /** Show value labels at the end of each bar. Default false. */
  showDataLabels?: boolean
  /** Stack series as 100% of total per category. Implies `stacked`. Default false. */
  stacked100?: boolean
  /** Reverse category order on the y-axis. Default false. */
  reversed?: boolean
}

export function BarChart({
  series,
  categories,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend,
  showToolbar,
  xaxisTitle,
  yaxisTitle,
  stacked,
  stacked100 = false,
  showDataLabels = false,
  reversed = false,
  options,
}: BarChartProps) {
  const themeKey = useWashChartTheme()
  const resolvedStacked = stacked100 || stacked

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
        stacked: resolvedStacked,
      }),
      {
        chart: {
          type: 'bar',
          ...(stacked100 ? { stackType: '100%' } : {}),
        },
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 6,
            barHeight: '68%',
          },
        },
        ...(reversed ? { yaxis: { reversed: true } } : {}),
        ...(showDataLabels
          ? mergeApexOptions(buildLineDataLabelsOptions(colors), {
              dataLabels: { offsetX: 24 },
            })
          : {}),
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
    resolvedStacked,
    stacked100,
    showDataLabels,
    reversed,
    options,
  ])

  return (
    <WashChart
      type="bar"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
