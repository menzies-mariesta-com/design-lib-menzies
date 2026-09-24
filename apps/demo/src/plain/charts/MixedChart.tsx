import { useMemo } from 'react'
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

function strokeWidthForType(type: WashChartSeries['type']): number {
  return type === 'line' ? 3 : 0
}

function markerSizeForType(type: WashChartSeries['type']): number {
  return type === 'line' ? 4 : 0
}

function buildMixedSeriesOptions(series: WashChartSeries[]): Pick<ApexOptions, 'stroke' | 'markers' | 'fill'> {
  const types = series.map((item) => item.type ?? 'line')
  const hasArea = types.includes('area')

  return {
    stroke: {
      width: types.map(strokeWidthForType),
      curve: 'smooth',
    },
    markers: {
      size: types.map(markerSizeForType),
      strokeWidth: 0,
    },
    ...(hasArea
      ? {
          fill: {
            type: types.map((type) => (type === 'area' ? 'gradient' : 'solid')),
            gradient: {
              shadeIntensity: 0.35,
              opacityFrom: 0.55,
              opacityTo: 0.08,
              stops: [0, 90, 100],
            },
          },
        }
      : {}),
  }
}

/**
 * Combo chart mixing column, area, and line series on one canvas.
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
  const chartOptions: ApexOptions = useMemo(
    () =>
      mergeApexOptions(
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
          plotOptions: {
            bar: {
              columnWidth: '52%',
              borderRadius: 6,
            },
          },
        },
        buildMixedSeriesOptions(series),
        options,
      ),
    [
      series,
      categories,
      title,
      subtitle,
      xaxisTitle,
      yaxisTitle,
      showLegend,
      showToolbar,
      colors,
      options,
    ],
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
