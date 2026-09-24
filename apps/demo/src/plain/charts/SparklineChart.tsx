import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { mergeApexOptions, readWashChartColors } from './theme'

export type SparklineChartProps = {
  data: number[]
  height?: number | string
  width?: number | string
  className?: string
  color?: string
  options?: ApexOptions
}

/** Compact area sparkline for desk KPIs and stat blocks. */
export function SparklineChart({
  data,
  height = 44,
  width = '100%',
  className,
  color,
  options,
}: SparklineChartProps) {
  const palette = readWashChartColors()
  const strokeColor = color ?? palette[0]

  const chartOptions: ApexOptions = mergeApexOptions(
    {
      chart: {
        type: 'area',
        sparkline: { enabled: true },
        animations: { enabled: true },
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
        colors: [strokeColor],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.4,
          opacityFrom: 0.35,
          opacityTo: 0.05,
          stops: [0, 90, 100],
        },
      },
      colors: [strokeColor],
      tooltip: { enabled: false },
    },
    options,
  )

  return (
    <WashChart
      type="area"
      series={[{ data }]}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
