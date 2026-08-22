import type { ApexOptions } from 'apexcharts'
import { buildWashAnnotations } from './annotations'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { LineChartWithAnnotationsProps } from './types'

export type { LineChartWithAnnotationsProps }

/**
 * Line chart with Wash-themed ApexCharts annotations: vertical event markers,
 * horizontal thresholds, point callouts, and text labels.
 */
export function LineChartWithAnnotations({
  series,
  categories,
  annotations = [],
  datetime = false,
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
}: LineChartWithAnnotationsProps) {
  const chartOptions: ApexOptions = mergeApexOptions(
    buildCartesianOptions({
      title,
      subtitle,
      categories: datetime ? undefined : categories,
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
      xaxis: datetime
        ? {
            type: 'datetime',
            labels: {
              datetimeUTC: false,
            },
          }
        : undefined,
      annotations: buildWashAnnotations(annotations),
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
