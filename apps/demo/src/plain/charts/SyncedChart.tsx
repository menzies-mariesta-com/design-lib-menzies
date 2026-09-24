import { useMemo } from 'react'
import { WashChart } from './WashChart'
import { useSyncedChartsGroup } from './SyncedCharts'
import type { WashChartProps } from './types'

export type SyncedChartProps = WashChartProps & {
  /** ApexCharts sync group. Falls back to `SyncedCharts` context. */
  syncGroup?: string
  /** Optional stable chart id within the sync group. */
  chartId?: string
  /** Zoom/pan toolbar while synced. Default true when a group is active. */
  syncToolbar?: boolean
}

/**
 * Wash chart wired for ApexCharts group sync. Use inside `SyncedCharts` or pass
 * an explicit `syncGroup`.
 */
export function SyncedChart({
  syncGroup,
  chartId,
  syncToolbar,
  className,
  ...chartProps
}: SyncedChartProps) {
  const contextGroup = useSyncedChartsGroup()
  const group = syncGroup ?? contextGroup ?? undefined

  const mergedClassName = useMemo(
    () => ['wash-chart-synced', className].filter(Boolean).join(' '),
    [className],
  )

  return (
    <WashChart
      {...chartProps}
      className={mergedClassName}
      syncGroup={group}
      chartId={chartId}
      syncToolbar={syncToolbar ?? Boolean(group)}
    />
  )
}
