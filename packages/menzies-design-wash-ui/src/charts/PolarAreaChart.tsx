import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildPieTitleOptions, mergeApexOptions } from './theme'
import type { WashPolarAreaChartProps } from './types'

export type PolarAreaMonochromeOptions = {
  color?: string
  shadeTo?: 'light' | 'dark'
  shadeIntensity?: number
}

export type PolarAreaChartProps = WashPolarAreaChartProps & {
  /** Single-hue shades instead of the full Wash palette. */
  monochrome?: boolean | PolarAreaMonochromeOptions
}

export function PolarAreaChart({
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
}: PolarAreaChartProps) {
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
      chart: { type: 'polarArea' },
      labels,
      plotOptions: {
        polarArea: {
          rings: { strokeWidth: 0 },
          spokes: { strokeWidth: 0 },
        },
      },
      stroke: { width: 1 },
      fill: { opacity: 0.85 },
    },
    monochromeOptions,
    options,
  )

  return (
    <WashChart
      type="polarArea"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
