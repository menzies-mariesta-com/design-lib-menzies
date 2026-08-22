import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type {
  RangeAreaChartProps,
  WashRangeAreaPoint,
  WashRangeAreaSeries,
} from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { RangeAreaChartProps }

function normalizeRangeAreaSeries(
  series: WashRangeAreaSeries[],
  categories?: string[],
): Array<{ name?: string; data: WashRangeAreaPoint[] }> {
  return series.map((item) => {
    const first = item.data[0]
    if (first && typeof first === 'object' && 'x' in first && 'y' in first) {
      return { name: item.name, data: item.data as WashRangeAreaPoint[] }
    }

    const tuples = item.data as [number, number][]
    const labels = categories ?? tuples.map((_, index) => String(index + 1))
    return {
      name: item.name,
      data: tuples.map((tuple, index) => ({
        x: labels[index] ?? String(index + 1),
        y: tuple,
      })),
    }
  })
}

/**
 * Range area chart shading a band between low and high values per category.
 */
export function RangeAreaChart({
  series,
  categories,
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
  curved = true,
  options,
}: RangeAreaChartProps) {
  const themeKey = useWashChartTheme()

  const apexSeries = useMemo(
    () => normalizeRangeAreaSeries(series, categories),
    [series, categories],
  )

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
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
        chart: { type: 'rangeArea' },
        stroke: {
          curve: curved ? 'smooth' : 'straight',
          width: 2,
        },
        fill: {
          opacity: 0.35,
        },
        markers: {
          size: 0,
          hover: { sizeOffset: 4 },
        },
      },
      options,
    )
  }, [
    themeKey,
    title,
    subtitle,
    categories,
    xaxisTitle,
    yaxisTitle,
    showLegend,
    showToolbar,
    colors,
    curved,
    options,
  ])

  return (
    <WashChart
      type="rangeArea"
      series={apexSeries}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
