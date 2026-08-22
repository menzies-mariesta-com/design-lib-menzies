import type { ApexOptions } from 'apexcharts'
import type { CSSProperties } from 'react'

export type WashChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'radialBar'

export type WashSeriesPoint = number | { x: string | number; y: number | null }

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
}
