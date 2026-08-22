import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { useSyncedChartsGroup } from './SyncedCharts'
import { buildDashedLineOptions, mergeApexOptions } from './theme'
import type { DashedLineChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { DashedLineChartProps } from './types'

export function DashedLineChart({
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
  datetime = false,
  dashArray,
  solidSeriesIndexes,
  syncGroup,
  chartId,
  options,
}: DashedLineChartProps) {
  const themeKey = useWashChartTheme()
  const contextSyncGroup = useSyncedChartsGroup()
  const resolvedSyncGroup = syncGroup ?? contextSyncGroup ?? undefined

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
      buildDashedLineOptions({
        title,
        subtitle,
        categories: datetime ? undefined : categories,
        xaxisTitle,
        yaxisTitle,
        showLegend,
        showToolbar,
        colors,
        stacked,
        curved,
        showDataLabels,
        datetime,
        dashArray,
        solidSeriesIndexes,
        seriesCount: series.length,
      }),
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
    datetime,
    dashArray,
    solidSeriesIndexes,
    series.length,
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
