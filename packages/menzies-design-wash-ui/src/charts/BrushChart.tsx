import { useId, useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { createSyncGroupId } from './sync'
import { buildTimeSeriesOptions, mergeApexOptions } from './theme'
import type { BrushChartProps, WashTimeSeries } from './types'

export type { BrushChartProps } from './types'

function seriesTimeExtents(series: WashTimeSeries[]) {
  let min = Infinity
  let max = -Infinity
  for (const row of series) {
    for (const [timestamp] of row.data) {
      if (timestamp < min) min = timestamp
      if (timestamp > max) max = timestamp
    }
  }
  return { min, max }
}

function defaultSelectionWindow(extents: { min: number; max: number }) {
  const span = extents.max - extents.min
  return {
    min: extents.min + span * 0.35,
    max: extents.min + span * 0.65,
  }
}

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

/**
 * Datetime line/area chart with a linked brush overview for drag-to-select range zoom.
 * Main chart (top) shows detail; brush chart (bottom) drives selection on the shared x-axis.
 */
export function BrushChart({
  series,
  mainHeight = 280,
  brushHeight = 120,
  width = '100%',
  className,
  colors,
  mainChartId: mainChartIdProp,
  syncGroup: syncGroupProp,
  chartType = 'line',
  brushChartType = 'area',
  title,
  subtitle,
  showLegend = true,
  showToolbar = true,
  xaxisTitle,
  yaxisTitle,
  curved = true,
  selection,
  options,
  brushOptions,
}: BrushChartProps) {
  const reactId = useId().replace(/:/g, '')
  const mainChartId = mainChartIdProp ?? `wash-brush-main-${reactId}`
  const brushChartId = `${mainChartId}-overview`
  const syncGroup = syncGroupProp ?? createSyncGroupId('wash-brush')

  const selectionRange = useMemo(() => {
    if (selection) {
      return { min: selection[0], max: selection[1] }
    }
    const extents = seriesTimeExtents(series)
    if (!Number.isFinite(extents.min) || !Number.isFinite(extents.max)) {
      return { min: undefined, max: undefined }
    }
    return defaultSelectionWindow(extents)
  }, [selection, series])

  const sharedBase = buildTimeSeriesOptions({
    title,
    subtitle,
    xaxisTitle,
    yaxisTitle,
    showLegend,
    showToolbar: false,
    colors,
  })

  const curveStroke = {
    curve: curved ? ('smooth' as const) : ('straight' as const),
  }

  const mainChartOptions: ApexOptions = mergeApexOptions(
    sharedBase,
    {
      chart: {
        id: mainChartId,
        group: syncGroup,
        type: chartType,
        toolbar: { show: false },
        zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
      },
      stroke: { ...curveStroke, width: chartType === 'line' ? 2 : 1 },
      markers: { size: 0, strokeWidth: 0, hover: { size: 5 } },
      ...(chartType === 'area' ? areaFillOptions() : {}),
    },
    options,
  )

  const brushChartOptions: ApexOptions = mergeApexOptions(
    sharedBase,
    areaFillOptions(),
    {
      chart: {
        id: brushChartId,
        group: syncGroup,
        type: brushChartType,
        brush: {
          enabled: true,
          target: mainChartId,
        },
        selection: {
          enabled: true,
          xaxis: selectionRange,
        },
        toolbar: {
          show: showToolbar,
          offsetX: -4,
          offsetY: 2,
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
          autoSelected: 'selection',
        },
      },
      stroke: { ...curveStroke, width: 1 },
      markers: { size: 0, strokeWidth: 0 },
      legend: { show: false },
      dataLabels: { enabled: false },
      xaxis: {
        type: 'datetime',
        labels: { show: false },
        tooltip: { enabled: false },
      },
      yaxis: {
        tickAmount: 2,
        labels: {
          formatter: (value: number) => `${Math.round(value)}`,
        },
      },
    },
    brushOptions,
  )

  const shellClassName = ['wash-brush-chart flex w-full flex-col gap-0.5', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={shellClassName} style={{ width }}>
      <WashChart
        type={chartType}
        series={series}
        options={mainChartOptions}
        height={mainHeight}
        width={width}
        className="wash-brush-chart-main"
      />
      <WashChart
        type={brushChartType}
        series={series}
        options={brushChartOptions}
        height={brushHeight}
        width={width}
        className="wash-brush-chart-overview"
      />
    </div>
  )
}
