import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { RealtimeLineChartProps } from './types'
import { useRealtimeSeries } from './useRealtimeSeries'
import { useWashChartTheme } from './useWashChartTheme'

export type { RealtimeLineChartProps } from './types'

export function RealtimeLineChart({
  seriesName = 'Live',
  intervalMs,
  maxPoints,
  initialData,
  valueGenerator,
  paused,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend,
  xaxisTitle,
  yaxisTitle,
  options,
}: RealtimeLineChartProps) {
  const themeKey = useWashChartTheme()
  const data = useRealtimeSeries({
    intervalMs,
    maxPoints,
    initialData,
    valueGenerator,
    paused,
  })

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
      buildCartesianOptions({
        title,
        subtitle,
        xaxisTitle,
        yaxisTitle,
        showLegend,
        showToolbar: false,
        colors,
      }),
      {
        chart: {
          type: 'line',
          animations: {
            enabled: true,
            dynamicAnimation: { enabled: true, speed: 350 },
          },
        },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: { type: 'datetime', labels: { datetimeUTC: false } },
      },
      options,
    )
  }, [themeKey, title, subtitle, xaxisTitle, yaxisTitle, showLegend, colors, options])

  return (
    <WashChart
      type="line"
      series={[{ name: seriesName, data }]}
      options={chartOptions}
      height={height}
      width={width}
      className={['wash-chart-realtime', className].filter(Boolean).join(' ')}
    />
  )
}
