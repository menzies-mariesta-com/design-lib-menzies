import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import {
  downsampleData,
  downsampledToTimeSeries,
  downsampledToValues,
  normalizeDownsampleInput,
  type DownsampleInput,
  type DownsampleMethod,
} from './downsample'
import { WashChart } from './WashChart'
import { buildTimeSeriesOptions, mergeApexOptions } from './theme'
import { useWashChartTheme } from './useWashChartTheme'

export type DownsampledLineChartProps = {
  data: DownsampleInput
  name?: string
  targetPoints?: number
  downsampleMethod?: DownsampleMethod
  useRawData?: boolean
  showPointCounts?: boolean
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
  curved?: boolean
  options?: ApexOptions
}

function isDatetimeInput(data: DownsampleInput): boolean {
  return data.length > 0 && Array.isArray(data[0])
}

export function DownsampledLineChart({
  data,
  name = 'Series',
  targetPoints = 500,
  downsampleMethod = 'lttb',
  useRawData = false,
  showPointCounts = true,
  title,
  subtitle,
  height = 320,
  width,
  className,
  colors,
  showLegend,
  showToolbar = true,
  xaxisTitle,
  yaxisTitle,
  curved = true,
  options,
}: DownsampledLineChartProps) {
  const themeKey = useWashChartTheme()
  const datetime = isDatetimeInput(data)

  const { series, originalCount, downsampledCount, isLarge } = useMemo(() => {
    const normalized = normalizeDownsampleInput(data)
    if (useRawData) {
      return {
        series: [{
          name,
          data: datetime ? downsampledToTimeSeries(normalized) : downsampledToValues(normalized),
        }],
        originalCount: normalized.length,
        downsampledCount: normalized.length,
        isLarge: normalized.length > 1000,
      }
    }
    const result = downsampleData(data, targetPoints, downsampleMethod)
    return {
      series: [{
        name,
        data: datetime ? downsampledToTimeSeries(result.points) : downsampledToValues(result.points),
      }],
      originalCount: result.originalCount,
      downsampledCount: result.downsampledCount,
      isLarge: result.originalCount > 1000,
    }
  }, [data, datetime, downsampleMethod, name, targetPoints, useRawData])

  const resolvedSubtitle = useMemo(() => {
    if (!showPointCounts) return subtitle
    const counts = `${originalCount.toLocaleString()} → ${downsampledCount.toLocaleString()} points`
    const methodLabel = useRawData ? 'raw' : downsampleMethod.toUpperCase()
    const suffix = `${counts} (${methodLabel})`
    return subtitle ? `${subtitle} · ${suffix}` : suffix
  }, [showPointCounts, subtitle, originalCount, downsampledCount, useRawData, downsampleMethod])

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    const base = datetime
      ? buildTimeSeriesOptions({
          title, subtitle: resolvedSubtitle, xaxisTitle, yaxisTitle, showLegend, showToolbar, colors,
        })
      : {
          colors,
          ...(title ? { title: { text: title } } : {}),
          ...(resolvedSubtitle ? { subtitle: { text: resolvedSubtitle } } : {}),
          chart: { toolbar: { show: showToolbar }, zoom: { enabled: showToolbar, type: 'x' as const } },
          legend: { show: showLegend ?? false },
        }
    return mergeApexOptions(base, {
      chart: { type: 'line', animations: { enabled: !isLarge, dynamicAnimation: { enabled: !isLarge } } },
      stroke: { curve: curved ? 'smooth' : 'straight', width: 1 },
      markers: { size: 0, hover: { size: 4 } },
      ...(datetime ? { xaxis: { type: 'datetime' } } : {}),
    }, options)
  }, [themeKey, datetime, title, resolvedSubtitle, xaxisTitle, yaxisTitle, showLegend, showToolbar, colors, curved, isLarge, options])

  return (
    <WashChart
      type="line"
      series={series}
      options={chartOptions}
      height={height}
      width={width}
      className={['wash-chart-downsampled', className].filter(Boolean).join(' ')}
    />
  )
}
