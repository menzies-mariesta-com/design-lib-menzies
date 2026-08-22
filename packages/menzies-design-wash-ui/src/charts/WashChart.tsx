import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { buildWashApexTheme, mergeWashChartOptions } from './theme'
import type { WashChartProps } from './types'
import { useWashChartTheme } from './useWashChartTheme'

/**
 * Base Wash chart wrapper around react-apexcharts with pigment-aware defaults,
 * responsive layout, and live sync when pigment or mode changes.
 */
export function WashChart({
  type,
  series,
  options,
  height = 320,
  width = '100%',
  className,
  style,
  washTheme = true,
}: WashChartProps) {
  const themeKey = useWashChartTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mergedOptions = useMemo(() => {
    void themeKey
    if (!washTheme) return options ?? {}
    return mergeWashChartOptions(buildWashApexTheme(), options ?? {})
  }, [themeKey, options, washTheme])

  const shellStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  }

  if (!mounted) {
    return (
      <div
        className={['wash-chart', className].filter(Boolean).join(' ')}
        style={shellStyle}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className={['wash-chart', className].filter(Boolean).join(' ')}
      style={shellStyle}
      data-wash-chart-theme={themeKey}
    >
      <Chart
        type={type}
        series={series as ApexOptions['series']}
        options={mergedOptions}
        width="100%"
        height="100%"
      />
    </div>
  )
}
