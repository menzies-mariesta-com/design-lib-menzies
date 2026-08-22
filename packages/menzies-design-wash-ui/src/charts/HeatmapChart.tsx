import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import {
  buildHeatmapOptions,
  mergeApexOptions,
  readWashChartColors,
  washChartPalette,
} from './theme'
import type { WashHeatmapChartProps, WashHeatmapSeries } from './types'

function buildSeriesFromGrid(
  data: NonNullable<WashHeatmapChartProps['data']>,
  xCategories?: string[],
  yCategories?: string[],
): WashHeatmapSeries[] {
  const xs =
    xCategories ??
    [...new Set(data.map((point) => point.x))].sort((a, b) => a.localeCompare(b))
  const ys =
    yCategories ??
    [...new Set(data.map((point) => point.y))].sort((a, b) => a.localeCompare(b))

  return ys.map((row) => ({
    name: row,
    data: xs.map((column) => {
      const match = data.find((point) => point.x === column && point.y === row)
      return { x: column, y: match?.value ?? 0 }
    }),
  }))
}

function defaultColorScaleRanges(colors: string[]): ApexOptions['plotOptions'] {
  const [low, mid, high, peak] = colors
  return {
    heatmap: {
      shadeIntensity: 0.45,
      colorScale: {
        ranges: [
          { from: 0, to: 25, color: low ?? '#276c8e', name: 'Low' },
          { from: 26, to: 50, color: mid ?? '#4a7a8e', name: 'Medium' },
          { from: 51, to: 75, color: high ?? '#b87524', name: 'High' },
          { from: 76, to: 100, color: peak ?? '#a33a32', name: 'Peak' },
        ],
      },
    },
  }
}

export type HeatmapChartProps = WashHeatmapChartProps

export function HeatmapChart({
  series,
  data,
  xCategories,
  yCategories,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  colorScale,
  showLegend = true,
  showToolbar = false,
  shadeIntensity = 0.45,
  options,
}: HeatmapChartProps) {
  const resolvedSeries = useMemo(() => {
    if (series?.length) return series
    if (data?.length) return buildSeriesFromGrid(data, xCategories, yCategories)
    return []
  }, [series, data, xCategories, yCategories])

  const palette = colors ?? washChartPalette()

  const chartOptions: ApexOptions = mergeApexOptions(
    buildHeatmapOptions({
      title,
      subtitle,
      showLegend,
      showToolbar,
      xCategories,
    }),
    {
      chart: { type: 'heatmap' },
      plotOptions: colorScale?.ranges
        ? {
            heatmap: {
              shadeIntensity,
              colorScale: {
                min: colorScale.min,
                max: colorScale.max,
                ranges: colorScale.ranges,
              },
            },
          }
        : defaultColorScaleRanges(readWashChartColors(palette)),
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
      },
    },
    options,
  )

  return (
    <WashChart
      type="heatmap"
      series={resolvedSeries}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
