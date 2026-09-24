import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { useSyncedChartsGroup } from './SyncedCharts'
import { buildCartesianOptions, buildMissingValuesLineOptions, mergeApexOptions } from './theme'
import type { MissingValuesAreaChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type { MissingValuesAreaChartProps }

function areaFillOptions(): ApexOptions {
  return {
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.35,
        opacityFrom: 0.55,
        opacityTo: 0.08,
        stops: [0, 90, 100],
      },
    },
  }
}

export function MissingValuesAreaChart({
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
  connectNulls = false,
  showMarkers = true,
  datetime = false,
  syncGroup,
  chartId,
  options,
}: MissingValuesAreaChartProps) {
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
      buildMissingValuesLineOptions({ showDataLabels, colors, curved, connectNulls, showMarkers }),
      { chart: { type: 'area' } },
      areaFillOptions(),
      datetime ? { xaxis: { type: 'datetime', labels: { datetimeUTC: false } } } : undefined,
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
    connectNulls,
    showMarkers,
    datetime,
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
