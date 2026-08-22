import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { WashCartesianChartProps } from './types'

export type AreaChartProps = WashCartesianChartProps

export function AreaChart({
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
}: AreaChartProps) {
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
      chart: { type: 'area' },
      stroke: {
        curve: curved ? 'smooth' : 'straight',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.35,
          opacityFrom: 0.55,
          opacityTo: 0.08,
          stops: [0, 90, 100],
        },
      },
    },
    options,
  )

  return (
    <WashChart
      type="area"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
