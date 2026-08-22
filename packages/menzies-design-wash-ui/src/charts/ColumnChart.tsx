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

export type ColumnChartProps = WashCartesianChartProps & {
  /** Show value labels on each column. Default false. */
  showDataLabels?: boolean
  /** Stack series as 100% of total per category. Implies `stacked`. Default false. */
  stacked100?: boolean
}

export function ColumnChart({
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
  stacked100 = false,
  showDataLabels = false,
  syncGroup,
  chartId,
  options,
}: ColumnChartProps) {
  const themeKey = useWashChartTheme()
  const contextSyncGroup = useSyncedChartsGroup()
  const resolvedSyncGroup = syncGroup ?? contextSyncGroup ?? undefined
  const resolvedStacked = stacked100 || stacked

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
        stacked: resolvedStacked,
      }),
      {
        chart: {
          type: 'bar',
          ...(stacked100 ? { stackType: '100%' } : {}),
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 6,
            columnWidth: '58%',
          },
        },
        ...(showDataLabels
          ? mergeApexOptions(buildLineDataLabelsOptions(colors), {
              dataLabels: { offsetY: -20 },
            })
          : {}),
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
    resolvedStacked,
    stacked100,
    showDataLabels,
    options,
  ])

  return (
    <WashChart
      type="bar"
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
