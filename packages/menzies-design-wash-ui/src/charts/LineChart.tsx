import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { useSyncedChartsGroup } from './SyncedCharts'
import {
  buildCartesianOptions,
  buildLineDataLabelsOptions,
  mergeApexOptions,
} from './theme'
import type { WashCartesianChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type LineChartProps = WashCartesianChartProps & {
  /** Show value labels at each data point. Default false. */
  showDataLabels?: boolean
}

export function LineChart({
  series,
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
  stacked,
  curved = true,
  showDataLabels = false,
  syncGroup,
  chartId,
  options,
}: LineChartProps) {
  const themeKey = useWashChartTheme()
  const contextSyncGroup = useSyncedChartsGroup()
  const resolvedSyncGroup = syncGroup ?? contextSyncGroup ?? undefined

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
        stacked,
      }),
      {
        chart: { type: 'line' },
        stroke: {
          curve: curved ? 'smooth' : 'straight',
          width: 2,
        },
        markers: {
          size: showDataLabels ? 5 : 4,
          strokeWidth: 0,
          hover: { size: 6 },
        },
        ...(showDataLabels ? buildLineDataLabelsOptions(colors) : {}),
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
    stacked,
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
      syncGroup={resolvedSyncGroup}
      chartId={chartId}
      syncToolbar={showToolbar ?? Boolean(resolvedSyncGroup)}
    />
  )
}
