import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildPieTitleOptions, mergeApexOptions } from './theme'
import type { WashPieChartProps } from './types'

export type PieChartProps = WashPieChartProps

export function PieChart({
  series,
  labels,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend,
  options,
}: PieChartProps) {
  const chartOptions: ApexOptions = mergeApexOptions(
    buildPieTitleOptions({ title, subtitle, showLegend, colors }),
    {
      chart: { type: 'pie' },
      labels,
      plotOptions: {
        pie: {
          expandOnClick: true,
          dataLabels: { offset: -4 },
        },
      },
      stroke: { width: 1 },
    },
    options,
  )

  return (
    <WashChart
      type="pie"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
