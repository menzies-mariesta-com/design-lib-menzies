import { useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import {
  buildTreemapOptions,
  mergeApexOptions,
  readWashChartColors,
  washChartPalette,
} from './theme'
import type { WashTreemapChartProps, WashTreemapSeries } from './types'
import { useWashChartTheme } from './useWashChartTheme'

export type TreemapChartProps = WashTreemapChartProps

function resolveSeries(
  series: WashTreemapSeries[] | undefined,
  data: WashTreemapChartProps['data'],
): WashTreemapSeries[] {
  if (series?.length) return series
  if (data?.length) return [{ data }]
  return [{ data: [] }]
}

export function TreemapChart({
  series,
  data,
  title,
  subtitle,
  height,
  width,
  className,
  colors,
  colorScale,
  showLegend = false,
  showToolbar = false,
  distributed = false,
  enableShades = true,
  showDataLabels = true,
  options,
}: TreemapChartProps) {
  const themeKey = useWashChartTheme()
  const resolvedSeries = useMemo(
    () => resolveSeries(series, data),
    [series, data],
  )
  const palette = colors ?? washChartPalette()

  const chartOptions: ApexOptions = useMemo(() => {
    void themeKey
    const plotOptions: ApexOptions['plotOptions'] = {
      treemap: {
        distributed,
        enableShades,
        shadeIntensity: 0.35,
        ...(colorScale?.ranges
          ? {
              colorScale: {
                min: colorScale.min,
                max: colorScale.max,
                ranges: colorScale.ranges,
              },
            }
          : {}),
      },
    }

    return mergeApexOptions(
      buildTreemapOptions({
        title,
        subtitle,
        showLegend,
        showToolbar,
      }),
      {
        chart: { type: 'treemap' },
        colors: readWashChartColors(palette),
        plotOptions,
        dataLabels: {
          enabled: showDataLabels,
          style: {
            fontSize: '12px',
          },
        },
        stroke: {
          width: 1,
        },
      },
      options,
    )
  }, [
    themeKey,
    title,
    subtitle,
    showLegend,
    showToolbar,
    palette,
    distributed,
    enableShades,
    showDataLabels,
    colorScale,
    options,
  ])

  return (
    <WashChart
      type="treemap"
      series={resolvedSeries}
      options={chartOptions}
      height={height}
      width={width}
      className={className}
    />
  )
}
