import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildTimeSeriesOptions, mergeApexOptions } from './theme'
import type { ZoomableTimeSeriesChartProps } from './types'

export type { ZoomableTimeSeriesChartProps } from './types'

export function ZoomableTimeSeriesChart({
  series,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend,
  showToolbar,
  showDataLabels,
  chartType = 'line',
  xaxisTitle,
  yaxisTitle,
  curved = true,
  options,
}: ZoomableTimeSeriesChartProps) {
  const chartOptions: ApexOptions = mergeApexOptions(
    buildTimeSeriesOptions({
      title,
      subtitle,
      xaxisTitle,
      yaxisTitle,
      showLegend,
      showToolbar,
      showDataLabels,
      colors,
    }),
    {
      chart: { type: chartType },
      stroke: {
        curve: curved ? 'smooth' : 'straight',
        width: 2,
      },
      markers: {
        size: 0,
        strokeWidth: 0,
        hover: { size: 5 },
      },
      ...(chartType === 'area'
        ? {
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 0.35,
                opacityFrom: 0.55,
                opacityTo: 0.08,
                stops: [0, 90, 100],
              },
            },
          }
        : {}),
    },
    options,
  )

  return (
    <WashChart
      type={chartType}
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={['wash-chart-timeseries', className].filter(Boolean).join(' ')}
    />
  )
}
