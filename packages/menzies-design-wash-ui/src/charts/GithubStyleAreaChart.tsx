import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildTimeSeriesOptions, mergeApexOptions, readWashChartTokens } from './theme'
import type { GithubStyleAreaChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { GithubStyleAreaChartProps }

export function GithubStyleAreaChart({
  series,
  title,
  subtitle,
  height,
  width,
  className,
  showLegend,
  showToolbar,
  xaxisTitle,
  yaxisTitle,
  curved = true,
  options,
}: GithubStyleAreaChartProps) {
  const themeKey = useWashChartTheme()

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    const tokens = readWashChartTokens()
    const gain = tokens.success || '#3f7a52'
    const loss = tokens.error || '#a33a32'

    return mergeApexOptions(
      buildTimeSeriesOptions({
        title,
        subtitle,
        xaxisTitle,
        yaxisTitle,
        showLegend,
        showToolbar,
        colors: [gain],
      }),
      {
        chart: { type: 'area' },
        colors: [gain],
        stroke: {
          curve: curved ? 'smooth' : 'straight',
          width: 2,
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            gradientToColors: [loss],
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100],
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
    curved,
    options,
  ])

  return (
    <WashChart
      type="area"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={['wash-chart-timeseries', className].filter(Boolean).join(' ')}
    />
  )
}
