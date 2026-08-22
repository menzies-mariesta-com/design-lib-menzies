import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { BubbleChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { BubbleChartProps }

export function BubbleChart(props: BubbleChartProps) {
  const {
    series,
    title,
    subtitle,
    height,
    width,
    className,
    colors,
    showLegend = true,
    showToolbar = false,
    xaxisTitle,
    yaxisTitle,
    options,
  } = props
  const themeKey = useWashChartTheme()

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
      buildCartesianOptions({
        title,
        subtitle,
        xaxisTitle,
        yaxisTitle,
        showLegend,
        showToolbar,
        colors,
      }),
      {
        chart: { type: 'bubble', zoom: { enabled: showToolbar ?? false } },
        dataLabels: { enabled: false },
        fill: { opacity: 0.85 },
        xaxis: {
          type: 'numeric',
          tickAmount: 10,
          title: xaxisTitle ? { text: xaxisTitle } : undefined,
        },
        yaxis: {
          title: yaxisTitle ? { text: yaxisTitle } : undefined,
        },
        tooltip: {
          z: {
            formatter: (value: number) => `${value}`,
            title: 'Size',
          },
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
    options,
  ])

  return (
    <WashChart
      type="bubble"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
