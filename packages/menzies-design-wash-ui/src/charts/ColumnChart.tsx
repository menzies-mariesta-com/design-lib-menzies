import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { useSyncedChartsGroup } from './SyncedCharts'
import { buildCartesianOptions, mergeApexOptions } from './theme'
import type { WashCartesianChartProps } from './types'

export type ColumnChartProps = WashCartesianChartProps

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
  syncGroup,
  chartId,
  options,
}: ColumnChartProps) {
  const contextSyncGroup = useSyncedChartsGroup()
  const resolvedSyncGroup = syncGroup ?? contextSyncGroup ?? undefined

  const chartOptions: ApexOptions = mergeApexOptions(
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
      chart: { type: 'bar' },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 6,
          columnWidth: '58%',
        },
      },
    },
    options,
  )

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
