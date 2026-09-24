import { useMemo } from 'react'
import type { ApexFormatterOpts, ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { SlopeChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { SlopeChartProps }

export function SlopeChart({
  series,
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
  showDataLabels = false,
  options,
}: SlopeChartProps) {
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
        chart: { type: 'line' },
        plotOptions: { line: { isSlopeChart: true } },
        stroke: { curve: curved ? 'smooth' : 'straight', width: 2 },
        markers: { size: 4, strokeWidth: 0, hover: { size: 6 } },
        xaxis: { position: 'bottom' },
        ...(showDataLabels
          ? {
              dataLabels: {
                background: { enabled: true },
                formatter(val: string | number | number[], opts?: ApexFormatterOpts) {
                  if (val === null || val === undefined) return ''
                  const rawSeries = opts?.w?.config?.series?.[opts.seriesIndex ?? 0]
                  const seriesName =
                    rawSeries && typeof rawSeries === 'object' && 'name' in rawSeries
                      ? rawSeries.name
                      : undefined
                  return seriesName ?? ''
                },
              },
            }
          : {}),
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
    curved,
    showDataLabels,
    options,
  ])

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
