import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { WashCartesianChartProps } from './types'

export type BarChartProps = WashCartesianChartProps

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
  options,
}: BarChartProps) {
  const chartOptions: ApexOptions = mergeApexOptions(
    buildCartesianOptions({
      title,
      subtitle,
      categories,
      xaxisTitle,
      yaxisTitle,
      showLegend,
      showToolbar,
      colors,
      stacked,
    }),
    {
      chart: { type: 'bar' },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 6,
          barHeight: '68%',
        },
      },
    },
    options,
  )

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
