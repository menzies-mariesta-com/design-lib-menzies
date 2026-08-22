import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildRadialTitleOptions, mergeApexOptions } from './theme'
import type { WashRadialBarChartProps } from './types'

export type RadialBarChartProps = WashRadialBarChartProps

export function RadialBarChart({
  series,
  labels,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend,
  startAngle,
  endAngle,
  hollowSize = '42%',
  options,
}: RadialBarChartProps) {
  const chartOptions: ApexOptions = mergeApexOptions(
    buildRadialTitleOptions({ title, subtitle, showLegend, colors }),
    {
      chart: { type: 'radialBar' },
      labels,
      plotOptions: {
        radialBar: {
          ...(startAngle !== undefined ? { startAngle } : {}),
          ...(endAngle !== undefined ? { endAngle } : {}),
          hollow: {
            size: typeof hollowSize === 'number' ? `${hollowSize}%` : hollowSize,
          },
          track: { margin: 8 },
          dataLabels: {
            name: { fontSize: '14px' },
            value: { fontSize: '18px', fontWeight: '600' },
            total: {
              show: Boolean(labels && labels.length > 1),
              label: 'Average',
            },
          },
        },
      },
      stroke: { lineCap: 'round' },
    },
    options,
  )

  return (
    <WashChart
      type="radialBar"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
