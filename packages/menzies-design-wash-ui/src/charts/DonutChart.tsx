import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildPieTitleOptions, mergeApexOptions } from './theme'
import type { WashPieChartProps } from './types'

export type DonutChartProps = Omit<WashPieChartProps, 'options'> & {
  /** Inner radius percentage. Default 62. */
  donutSize?: string
  /** Vertical gradient fill on each segment. */
  gradientFill?: boolean
  /** Round stroke caps on segment edges. */
  rounded?: boolean
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
  gradientFill,
  rounded,
  options,
}: DonutChartProps) {
  const variantOptions: ApexOptions | undefined =
    gradientFill || rounded
      ? {
          ...(gradientFill
            ? {
                fill: {
                  type: 'gradient',
                  gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.35,
                    opacityFrom: 0.95,
                    opacityTo: 0.65,
                  },
                },
              }
            : {}),
          ...(rounded
            ? {
                stroke: { width: 4, lineCap: 'round' },
                plotOptions: {
                  pie: {
                    expandOnClick: false,
                  },
                },
              }
            : {}),
        }
      : undefined

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
    variantOptions,
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
