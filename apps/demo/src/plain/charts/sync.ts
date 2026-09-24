import type { ApexOptions } from 'apexcharts'

let syncGroupCounter = 0

/** Create a unique ApexCharts sync group id for a page or panel. */
export function createSyncGroupId(prefix = 'wash-sync'): string {
  syncGroupCounter += 1
  return `${prefix}-${syncGroupCounter}-${Math.random().toString(36).slice(2, 8)}`
}

export type WashSyncChartOptions = {
  syncGroup: string
  chartId?: string
  /** Show zoom/pan toolbar. Defaults to true when syncing. */
  showToolbar?: boolean
}

/** Merge ApexCharts group, id, zoom, and toolbar options for linked charts. */
export function buildSyncChartOptions({
  syncGroup,
  chartId,
  showToolbar = true,
}: WashSyncChartOptions): ApexOptions {
  return {
    chart: {
      id: chartId,
      group: syncGroup,
      toolbar: {
        show: showToolbar,
        offsetX: -4,
        offsetY: 4,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: 'zoom',
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
    },
  }
}
