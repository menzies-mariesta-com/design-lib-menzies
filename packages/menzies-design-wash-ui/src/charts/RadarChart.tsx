import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildRadarTitleOptions, mergeApexOptions } from './theme'
import type { RadarChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { RadarChartProps }

export function RadarChart({
  series,
  categories,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend = true,
  fillOpacity,
  polygonFill = false,
  options,
}: RadarChartProps) {
  const themeKey = useWashChartTheme()
  const resolvedFillOpacity = fillOpacity ?? (polygonFill ? 0.24 : 0)

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
      buildRadarTitleOptions({ title, subtitle, showLegend, colors }),
      {
        chart: { type: 'radar', toolbar: { show: false } },
        xaxis: { categories },
        yaxis: { show: polygonFill ? false : true, tickAmount: 4 },
        stroke: { width: polygonFill ? 1 : 2, show: true },
        fill: { opacity: resolvedFillOpacity },
        markers: { size: polygonFill ? 0 : 4, strokeWidth: 0, hover: { size: polygonFill ? 0 : 6 } },
        plotOptions: {
          radar: {
            polygons: {
              strokeColors: 'var(--color-ink-border, #e5e7eb)',
              connectorColors: 'var(--color-ink-border, #e5e7eb)',
            },
          },
        },
      },
      options,
    )
  }, [
    themeKey,
    title,
    subtitle,
    showLegend,
    colors,
    categories,
    polygonFill,
    resolvedFillOpacity,
    options,
  ])

  return (
    <WashChart
      type="radar"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
