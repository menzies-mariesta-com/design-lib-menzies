import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { useSyncedChartsGroup } from './SyncedCharts'
import { buildCartesianOptions, buildSteplineOptions, mergeApexOptions } from './theme'
import type { SteplineChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { SteplineChartProps }

export function SteplineChart({
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
  showDataLabels = false,
  datetime = false,
  syncGroup,
  chartId,
  options,
}: SteplineChartProps) {
  const themeKey = useWashChartTheme()
  const contextSyncGroup = useSyncedChartsGroup()
  const resolvedSyncGroup = syncGroup ?? contextSyncGroup ?? undefined

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
      buildCartesianOptions({
        title,
        subtitle,
        categories: datetime ? undefined : categories,
        xaxisTitle,
        yaxisTitle,
        showLegend,
        showToolbar,
        colors,
        stacked,
      }),
      buildSteplineOptions({ showDataLabels, colors }),
      datetime
        ? { xaxis: { type: 'datetime', labels: { datetimeUTC: false } } }
        : undefined,
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
    showDataLabels,
    datetime,
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
