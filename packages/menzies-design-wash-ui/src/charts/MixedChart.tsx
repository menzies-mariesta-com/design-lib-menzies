import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { WashChartSeries, WashMixedChartProps } from './types'

const DEFAULT_MIXED_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const DEFAULT_MIXED_SERIES: WashChartSeries[] = [
  { name: 'Revenue', type: 'column', data: [440, 505, 414, 671, 227, 413] },
  { name: 'Growth', type: 'line', data: [23, 42, 35, 27, 43, 22] },
]

export type MixedChartProps = WashMixedChartProps

/**
 * Combo chart with column bars and a smooth line overlay.
 * Ships with demo defaults when series/categories are omitted.
 */
export function MixedChart({
  series = DEFAULT_MIXED_SERIES,
  categories = DEFAULT_MIXED_CATEGORIES,
  title = 'Revenue and growth',
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend,
  showToolbar,
  xaxisTitle,
  yaxisTitle,
  options,
}: MixedChartProps) {
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
    }),
    {
      chart: { type: 'line', stacked: false },
      stroke: {
        width: [0, 3],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '52%',
          borderRadius: 6,
        },
      },
      markers: {
        size: [0, 4],
        strokeWidth: 0,
      },
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
