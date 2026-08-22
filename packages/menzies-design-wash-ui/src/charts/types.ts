import type { ApexOptions } from 'apexcharts'
import type { CSSProperties } from 'react'

export type WashChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'rangeBar'
  | 'pie'
  | 'donut'
  | 'radialBar'
  | 'heatmap'

export type GanttTask = {
  name: string
  start: string | number
  end: string | number
  /** Optional per-task bar color override. */
  color?: string
}

export type GanttSeries = {
  name: string
  tasks: GanttTask[]
}

export type GanttChartProps = {
  /** Flat task list for a single-track Gantt. Ignored when `series` is set. */
  tasks?: GanttTask[]
  /** Multi-track timeline grouped by series name. */
  series?: GanttSeries[]
  title?: string
  subtitle?: string
  height?: number | string
  width?: number | string
  className?: string
  colors?: string[]
  showLegend?: boolean
  showToolbar?: boolean
  options?: ApexOptions
}

export type WashSeriesPoint = number | null | { x: string | number; y: number | null }

export type WashNullableChartSeries = {
  name?: string
  data: WashSeriesPoint[]
}

export type WashChartSeries = {
  name?: string
  data: WashSeriesPoint[]
  type?: 'line' | 'area' | 'bar' | 'column'
}

export type WashCartesianChartProps = {
  series: WashChartSeries[]
  categories?: string[]
  title?: string
  subtitle?: string
  height?: number | string
  width?: number | string
  className?: string
  colors?: string[]
  showLegend?: boolean
  showToolbar?: boolean
  xaxisTitle?: string
  yaxisTitle?: string
  stacked?: boolean
  curved?: boolean
  /** ApexCharts sync group for linked zoom/pan. */
  syncGroup?: string
  /** Optional chart id within a sync group. */
  chartId?: string
  options?: ApexOptions
}

export type WashPieChartProps = {
  series: number[]
  labels: string[]
  title?: string
  subtitle?: string
  height?: number | string
  width?: number | string
  className?: string
  colors?: string[]
  showLegend?: boolean
  options?: ApexOptions
}

export type WashRadialBarChartProps = {
  series: number[]
  labels?: string[]
  title?: string
  subtitle?: string
  height?: number | string
  width?: number | string
  className?: string
  colors?: string[]
  showLegend?: boolean
  options?: ApexOptions
}

export type WashMixedChartProps = {
  series?: WashChartSeries[]
  categories?: string[]
  title?: string
  subtitle?: string
  height?: number | string
  width?: number | string
  className?: string
  colors?: string[]
  showLegend?: boolean
  showToolbar?: boolean
  xaxisTitle?: string
  yaxisTitle?: string
  options?: ApexOptions
}

export type WashHeatmapPoint = { x: string; y: number }

export type WashHeatmapSeries = {
  name: string
  data: WashHeatmapPoint[]
}

export type WashHeatmapGridPoint = {
  x: string
  y: string
  value: number
}

export type WashHeatmapColorScale = {
  min?: number
  max?: number
  ranges?: Array<{ from: number; to: number; color: string; name?: string }>
}

export type WashHeatmapChartProps = {
  /** Pre-built heatmap rows (ApexCharts series). */
  series?: WashHeatmapSeries[]
  /** Flat grid points; converted to series when `series` is omitted. */
  data?: WashHeatmapGridPoint[]
  xCategories?: string[]
  yCategories?: string[]
  title?: string
  subtitle?: string
  height?: number | string
  width?: number | string
  className?: string
  colors?: string[]
  colorScale?: WashHeatmapColorScale
  showLegend?: boolean
  showToolbar?: boolean
  shadeIntensity?: number
  options?: ApexOptions
}

export type WashChartProps = {
  type: WashChartType
  series: ApexOptions['series'] | WashChartSeries[] | number[]
  options?: ApexOptions
  height?: number | string
  width?: number | string
  className?: string
  style?: CSSProperties
  /** Apply Wash pigment styling defaults. Default true. */
  washTheme?: boolean
  /** ApexCharts sync group for linked zoom/pan across charts. */
  syncGroup?: string
  /** Optional chart id within a sync group. */
  chartId?: string
  /** Zoom/pan toolbar when synced. Default true when `syncGroup` is set. */
  syncToolbar?: boolean
}

export type SyncedChartPanelSeries = {
  name: string
  data: WashSeriesPoint[]
}

export type SyncedChartPanelProps = {
  /** Shared categories for all panel charts (category x-axis). */
  categories: string[]
  plateOutput: SyncedChartPanelSeries
  dryTime: SyncedChartPanelSeries
  pigmentUse: SyncedChartPanelSeries
  syncGroupId?: string
  height?: number | string
  className?: string
  /** Show zoom toolbar on each chart. Default: bottom chart only. */
  showToolbar?: boolean | 'all' | 'last'
  showLegend?: boolean
}

export type WashAnnotationTone =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'success'
  | 'error'
  | 'info'

type WashAnnotationShared = {
  /** Pigment tone for stroke, marker, and label fill. Default primary; use warning for milestones. */
  tone?: WashAnnotationTone
  label?: string
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
}

export type WashAnnotation =
  | (WashAnnotationShared & {
      type: 'x'
      /** Category label or datetime ISO string / timestamp for vertical marker. */
      value: string | number
      strokeDashArray?: number
    })
  | (WashAnnotationShared & {
      type: 'y'
      value: number
      strokeDashArray?: number
    })
  | (WashAnnotationShared & {
      type: 'point'
      x: string | number
      y: number
      seriesIndex?: number
      markerSize?: number
    })
  | (WashAnnotationShared & {
      type: 'text'
      x: number
      y: number
      text: string
      fontSize?: string
    })

export type LineChartWithAnnotationsProps = WashCartesianChartProps & {
  /** Typed annotation helpers mapped to ApexCharts x/y/point/text layers. */
  annotations?: WashAnnotation[]
  /** Use datetime x-axis (series points as `{ x, y }`). Default false (category axis). */
  datetime?: boolean
}

export type DashedLineChartProps = WashCartesianChartProps & {
  /** Show value labels at each data point. Default false. */
  showDataLabels?: boolean
  /** Use a datetime x-axis instead of category labels. */
  datetime?: boolean
  /** Per-series dash length, or one value applied to non-solid series. Default 6. */
  dashArray?: number | number[]
  /** Series indexes rendered without dashes. */
  solidSeriesIndexes?: number[]
}

export type SteplineChartProps = WashCartesianChartProps & {
  /** Show value labels at each data point. Default false. */
  showDataLabels?: boolean
  /** Use datetime x-axis (series points as `{ x, y }`). Default false (category axis). */
  datetime?: boolean
}

export type MissingValuesLineChartProps = Omit<WashCartesianChartProps, 'series'> & {
  series: WashNullableChartSeries[]
  connectNulls?: boolean
  showMarkers?: boolean
  showDataLabels?: boolean
  datetime?: boolean
}

/** Datetime tuple for ApexCharts time series: `[timestampMs, value]`. */
export type WashTimeSeriesPoint = [number, number]

export type WashTimeSeries = {
  name?: string
  data: WashTimeSeriesPoint[]
}

export type UseRealtimeSeriesOptions = {
  seriesName?: string
  intervalMs?: number
  maxPoints?: number
  initialData?: WashTimeSeriesPoint[]
  valueGenerator?: () => number
  paused?: boolean
}

export type RealtimeLineChartProps = {
  seriesName?: string
  intervalMs?: number
  maxPoints?: number
  initialData?: WashTimeSeriesPoint[]
  valueGenerator?: () => number
  paused?: boolean
  title?: string
  subtitle?: string
  height?: number | string
  width?: number | string
  className?: string
  colors?: string[]
  xaxisTitle?: string
  yaxisTitle?: string
  showLegend?: boolean
  showToolbar?: boolean
  options?: ApexOptions
}

export type ZoomableTimeSeriesChartProps = {
  series: WashTimeSeries[]
  title?: string
  subtitle?: string
  height?: number | string
  width?: number | string
  className?: string
  colors?: string[]
  showLegend?: boolean
  /** Zoom/pan toolbar. Default true. */
  showToolbar?: boolean
  showDataLabels?: boolean
  /** Line (default) or filled area under the curve. */
  chartType?: 'line' | 'area'
  xaxisTitle?: string
  yaxisTitle?: string
  curved?: boolean
  options?: ApexOptions
}

export type BrushChartProps = {
  series: WashTimeSeries[]
  /** Detail chart height (top). Default 280. */
  mainHeight?: number | string
  /** Brush overview height (bottom). Default 120. */
  brushHeight?: number | string
  width?: number | string
  className?: string
  colors?: string[]
  /** ApexCharts id for the main detail chart. Default `wash-brush-main-{uid}`. */
  mainChartId?: string
  /** Shared ApexCharts group for sync. Auto-generated when omitted. */
  syncGroup?: string
  /** Main detail chart type. Default line. */
  chartType?: 'line' | 'area'
  /** Brush overview chart type. Default area. */
  brushChartType?: 'line' | 'area'
  title?: string
  subtitle?: string
  showLegend?: boolean
  /** Selection toolbar on the brush chart. Default true. */
  showToolbar?: boolean
  xaxisTitle?: string
  yaxisTitle?: string
  curved?: boolean
  /** Initial brush selection window `[minMs, maxMs]`. Defaults to middle third of data. */
  selection?: [number, number]
  /** Extra Apex options merged into the main chart. */
  options?: ApexOptions
  /** Extra Apex options merged into the brush overview chart. */
  brushOptions?: ApexOptions
}
