import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { WashCartesianChartProps } from './types'

export type LineChartProps = WashCartesianChartProps

export function LineChart({
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
  curved = true,
  options,
}: LineChartProps) {
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
      chart: { type: 'line' },
      stroke: {
        curve: curved ? 'smooth' : 'straight',
        width: 2,
      },
      markers: {
        size: 4,
        strokeWidth: 0,
        hover: { size: 6 },
      },
    },
    options,
  )

  return (
    <WashChart
      type="line"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
