import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { RangeAreaLineComboChartProps, WashRangeAreaPoint } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { RangeAreaLineComboChartProps }

function buildComboTooltipFormatter(): Pick<ApexOptions, 'tooltip'> {
  return {
    tooltip: {
      y: {
        formatter: (value, opts) => {
          const dataPointIndex = opts?.dataPointIndex ?? 0
          const seriesIndex = opts?.seriesIndex ?? 0
          const w = opts?.w
          if (!w) return String(value)

          const seriesConfig = w.config.series
          if (!seriesConfig) return String(value)

          const config = seriesConfig[seriesIndex] as {
            type?: string
            data: Array<{ y: number | [number, number] }>
          }
          const point = config.data[dataPointIndex]
          if (config.type === 'line' && point && !Array.isArray(point.y)) {
            return String(point.y)
          }
          if (Array.isArray(point?.y)) {
            return `${point.y[0]} - ${point.y[1]}`
          }
          return String(value)
        },
      },
    },
  }
}

/**
 * Range area band with a line overlay (e.g. average or target within the spread).
 */
export function RangeAreaLineComboChart({
  rangeSeries,
  lineSeries,
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
}: RangeAreaLineComboChartProps) {
  const themeKey = useWashChartTheme()

  const apexSeries = useMemo(() => {
    const rangeData: WashRangeAreaPoint[] = categories.map((category, index) => ({
      x: category,
      y: [rangeSeries.low[index] ?? 0, rangeSeries.high[index] ?? 0],
    }))

    const lineData = categories.map((category, index) => ({
      x: category,
      y: lineSeries.data[index] ?? 0,
    }))

    return [
      {
        name: rangeSeries.name,
        type: 'rangeArea' as const,
        data: rangeData,
      },
      {
        name: lineSeries.name,
        type: 'line' as const,
        data: lineData,
      },
    ]
  }, [categories, rangeSeries, lineSeries])

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
          width: [0, 3],
        },
        fill: {
          opacity: [0.35, 1],
        },
        markers: {
          size: [0, 4],
          strokeWidth: 0,
        },
      },
      buildComboTooltipFormatter(),
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
