import { AreaChart } from './AreaChart'
import { ColumnChart } from './ColumnChart'
import { LineChart } from './LineChart'
import { SyncedCharts } from './SyncedCharts'
import type { SyncedChartPanelProps } from './types'

function toolbarVisible(
  slot: 'line' | 'area' | 'column',
  mode: SyncedChartPanelProps['showToolbar'],
): boolean {
  if (mode === 'all') return true
  if (mode === false) return false
  if (mode === true) return true
  return slot === 'column'
}

/**
 * Three stacked cartesian charts (line, area, column) sharing one sync group and
 * category x-axis. Zoom or pan on any chart updates the others.
 */
export function SyncedChartPanel({
  categories,
  plateOutput,
  dryTime,
  pigmentUse,
  syncGroupId,
  height = 220,
  className,
  showToolbar = 'last',
  showLegend = false,
}: SyncedChartPanelProps) {
  const syncClass = 'wash-chart-synced'

  return (
    <SyncedCharts syncGroupId={syncGroupId} className={className}>
      <LineChart
        height={height}
        categories={categories}
        series={[plateOutput]}
        showLegend={showLegend}
        showToolbar={toolbarVisible('line', showToolbar)}
        chartId="wash-sync-plates"
        className={syncClass}
        options={{
          yaxis: { title: { text: 'Plates' } },
          stroke: { width: 2.5 },
        }}
      />
      <AreaChart
        height={height}
        categories={categories}
        series={[dryTime]}
        showLegend={showLegend}
        showToolbar={toolbarVisible('area', showToolbar)}
        chartId="wash-sync-dry-time"
        className={syncClass}
        options={{
          yaxis: { title: { text: 'Dry min' } },
        }}
      />
      <ColumnChart
        height={height}
        categories={categories}
        series={[pigmentUse]}
        showLegend={showLegend}
        showToolbar={toolbarVisible('column', showToolbar)}
        chartId="wash-sync-pigment"
        className={syncClass}
        options={{
          yaxis: { title: { text: 'Load %' } },
        }}
      />
    </SyncedCharts>
  )
}
