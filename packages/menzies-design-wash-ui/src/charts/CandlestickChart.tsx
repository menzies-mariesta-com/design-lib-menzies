import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildTimeSeriesOptions, mergeApexOptions, readWashChartTokens } from './theme'
import type { CandlestickChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { CandlestickChartProps }

export function CandlestickChart(props: CandlestickChartProps) {
  const {
    series,
    title,
    subtitle,
    height,
    width,
    className,
    colors,
    showLegend = true,
    showToolbar = true,
    xaxisTitle,
    yaxisTitle,
    upwardColor,
    downwardColor,
    options,
  } = props
  const themeKey = useWashChartTheme()

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    const tokens = readWashChartTokens()
    const bullish = upwardColor ?? tokens.success
    const bearish = downwardColor ?? tokens.error

    return mergeApexOptions(
      buildTimeSeriesOptions({
        title,
        subtitle,
        xaxisTitle,
        yaxisTitle,
        showLegend,
        showToolbar,
        colors,
      }),
      {
        chart: { type: 'candlestick' },
        plotOptions: {
          candlestick: {
            colors: {
              upward: bullish,
              downward: bearish,
            },
            wick: {
              useFillColor: true,
            },
          },
        },
        xaxis: {
          type: 'datetime',
          title: xaxisTitle ? { text: xaxisTitle } : undefined,
        },
        yaxis: {
          title: yaxisTitle ? { text: yaxisTitle } : undefined,
          tooltip: { enabled: true },
        },
        tooltip: {
          shared: true,
        },
      },
      options,
    )
  }, [
    themeKey,
    title,
    subtitle,
    xaxisTitle,
    yaxisTitle,
    showLegend,
    showToolbar,
    colors,
    upwardColor,
    downwardColor,
    options,
  ])

  return (
    <WashChart
      type="candlestick"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
