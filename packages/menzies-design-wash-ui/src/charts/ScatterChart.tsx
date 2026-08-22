import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { ScatterChartProps, WashScatterPoint, WashScatterSeries } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { ScatterChartProps }

function hashSeed(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) | 0
  return h
}

function applyJitter(series: WashScatterSeries[], jitterX: number): WashScatterSeries[] {
  return series.map((item, si) => ({
    ...item,
    data: item.data.map((point, pi) => {
      if (typeof point.x !== 'number') return point
      const seed = hashSeed(`${si}-${pi}-${point.x}-${point.y}`)
      return { ...point, x: point.x + ((seed % 1000) / 1000 - 0.5) * 2 * jitterX } satisfies WashScatterPoint
    }),
  }))
}

export function ScatterChart(props: ScatterChartProps) {
  const { series, title, subtitle, height, width, className, colors, showLegend = true, showToolbar = false, xaxisTitle, yaxisTitle, datetime = false, jitterX, options } = props
  const themeKey = useWashChartTheme()
  const chartSeries = useMemo(() => (jitterX && jitterX > 0 ? applyJitter(series, jitterX) : series), [series, jitterX])
  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(buildCartesianOptions({ title, subtitle, xaxisTitle, yaxisTitle, showLegend, showToolbar, colors }), {
      chart: { type: 'scatter', zoom: { enabled: showToolbar ?? false } },
      dataLabels: { enabled: false },
      markers: { size: 6, strokeWidth: 0, hover: { size: 8 } },
      xaxis: { type: datetime ? 'datetime' : 'numeric', tickAmount: datetime ? undefined : 10, title: xaxisTitle ? { text: xaxisTitle } : undefined },
      yaxis: { title: yaxisTitle ? { text: yaxisTitle } : undefined },
    }, options)
  }, [themeKey, title, subtitle, xaxisTitle, yaxisTitle, showLegend, showToolbar, colors, datetime, options])
  return <WashChart type="scatter" series={chartSeries} options={chartOptions} height={height} width={width} className={className} />
}
