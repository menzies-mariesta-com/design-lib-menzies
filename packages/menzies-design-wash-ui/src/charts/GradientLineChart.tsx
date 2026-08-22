import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { useSyncedChartsGroup } from './SyncedCharts'
import { buildGradientLineOptions, mergeApexOptions } from './theme'
import type { WashGradientFillOverride } from './theme'
import type { WashCartesianChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { WashGradientFillOverride }

export type GradientLineChartProps = WashCartesianChartProps & {
  /** Show value labels at each data point. Default false. */
  showDataLabels?: boolean
  /** Use a datetime x-axis instead of category labels. */
  datetime?: boolean
  /** Override default vertical pigment gradient fill. */
  gradient?: WashGradientFillOverride
}

/** Area line chart with a soft vertical pigment gradient under the curve. */
export function GradientLineChart({
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
  gradient,
  syncGroup,
  chartId,
  options,
}: GradientLineChartProps) {
  const themeKey = useWashChartTheme()
  const contextSyncGroup = useSyncedChartsGroup()
  const resolvedSyncGroup = syncGroup ?? contextSyncGroup ?? undefined

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    return mergeApexOptions(
      buildGradientLineOptions({
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
        gradient,
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
    gradient,
    options,
  ])

  return (
    <WashChart
      type="area"
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
