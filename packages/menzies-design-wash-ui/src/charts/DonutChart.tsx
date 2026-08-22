import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildPieTitleOptions, mergeApexOptions } from './theme'
import type { WashPieChartProps } from './types'

export type DonutChartProps = Omit<WashPieChartProps, 'options'> & {
  /** Inner radius percentage. Default 62. */
  donutSize?: string
  options?: WashPieChartProps['options']
}

export function DonutChart({
  series,
  labels,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend,
  donutSize = '62%',
  options,
}: DonutChartProps) {
  const chartOptions: ApexOptions = mergeApexOptions(
    buildPieTitleOptions({ title, subtitle, showLegend, colors }),
    {
      chart: { type: 'donut' },
      labels,
      plotOptions: {
        pie: {
          donut: {
            size: donutSize,
            labels: {
              show: true,
              name: { show: true },
              value: { show: true },
              total: {
                show: true,
                label: 'Total',
              },
            },
          },
        },
      },
      stroke: { width: 1 },
    },
    options,
  )

  return (
    <WashChart
      type="donut"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
