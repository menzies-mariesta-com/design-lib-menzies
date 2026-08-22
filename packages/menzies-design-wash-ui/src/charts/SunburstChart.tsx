import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildPieTitleOptions, mergeApexOptions } from './theme'
import type { SunburstChartProps, WashSunburstNode, WashSunburstSeries } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { SunburstChartProps }

function cloneSunburstNodes(nodes: WashSunburstNode[]): WashSunburstNode[] {
  return nodes.map((node) => ({
    x: node.x,
    y: node.y,
    ...(node.children ? { children: cloneSunburstNodes(node.children) } : {}),
  }))
}

function normalizeSunburstSeries(series: WashSunburstSeries[]): ApexOptions['series'] {
  return series.map((item) => ({
    name: item.name,
    data: cloneSunburstNodes(item.data),
  }))
}

export function SunburstChart({
  series,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend = true,
  innerSize = '20%',
  borderRadius = 4,
  spacing = 1,
  startAngle = 0,
  endAngle = 360,
  zoomOnClick = true,
  options,
}: SunburstChartProps) {
  const themeKey = useWashChartTheme()
  const chartSeries = useMemo(() => normalizeSunburstSeries(series), [series])

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
      buildPieTitleOptions({ title, subtitle, showLegend, colors }),
      {
        chart: { type: 'sunburst' },
        plotOptions: {
          sunburst: {
            innerSize,
            borderRadius,
            spacing,
            startAngle,
            endAngle,
            zoomOnClick,
          },
        },
        stroke: { width: 1 },
        dataLabels: { enabled: true },
      },
      options,
    )
  }, [
    themeKey,
    title,
    subtitle,
    showLegend,
    colors,
    innerSize,
    borderRadius,
    spacing,
    startAngle,
    endAngle,
    zoomOnClick,
    options,
  ])

  return (
    <WashChart
      type="sunburst"
      series={chartSeries}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
