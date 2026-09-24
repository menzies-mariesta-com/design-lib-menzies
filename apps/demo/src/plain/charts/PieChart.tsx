import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildPieTitleOptions, mergeApexOptions } from './theme'
import type { WashPieChartProps } from './types'

export type PieMonochromeOptions = {
  color?: string
  shadeTo?: 'light' | 'dark'
  shadeIntensity?: number
}

export type PieChartProps = WashPieChartProps & {
  /** Single-hue shades instead of the full Wash palette. */
  monochrome?: boolean | PieMonochromeOptions
}

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
  monochrome,
  options,
}: PieChartProps) {
  const monochromeOptions =
    monochrome === true || typeof monochrome === 'object'
      ? {
          theme: {
            monochrome: {
              enabled: true,
              ...(typeof monochrome === 'object' ? monochrome : {}),
              shadeTo: typeof monochrome === 'object' ? monochrome.shadeTo ?? 'light' : 'light',
              shadeIntensity:
                typeof monochrome === 'object' ? monochrome.shadeIntensity ?? 0.65 : 0.65,
            },
          },
        }
      : undefined

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
    monochromeOptions,
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
