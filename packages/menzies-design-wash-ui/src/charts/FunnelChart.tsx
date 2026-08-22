import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { FunnelChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { FunnelChartProps }

export function FunnelChart({
  series,
  categories,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  showLegend = false,
  showToolbar = false,
  xaxisTitle,
  yaxisTitle,
  variant = 'funnel',
  shape = 'rectangle',
  lastShape = 'flat',
  distributed,
  showDataLabels = false,
  options,
}: FunnelChartProps) {
  const themeKey = useWashChartTheme()
  const chartType = variant === 'pyramid' ? 'pyramid' : 'funnel'
  const resolvedDistributed = distributed ?? variant === 'pyramid'

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
        chart: { type: chartType },
        plotOptions: {
          bar: {
            horizontal: true,
            isFunnel: variant === 'funnel',
            distributed: resolvedDistributed,
            borderRadius: 4,
          },
          ...(variant === 'funnel' && (shape !== 'rectangle' || lastShape !== 'flat')
            ? {
                funnel: {
                  shape,
                  lastShape,
                },
              }
            : {}),
        },
        dataLabels: {
          enabled: showDataLabels,
          formatter(val: number) {
            return val === null || val === undefined ? '' : `${val}`
          },
          dropShadow: { enabled: false },
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
    variant,
    chartType,
    shape,
    lastShape,
    resolvedDistributed,
    showDataLabels,
    options,
  ])

  return (
    <WashChart
      type={chartType}
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
