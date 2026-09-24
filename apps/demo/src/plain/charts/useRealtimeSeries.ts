import { useEffect, useMemo, useRef, useState } from 'react'
import type { WashTimeSeriesPoint } from './types'

export type UseRealtimeSeriesOptions = {
  seriesName?: string
  intervalMs?: number
  maxPoints?: number
  initialData?: WashTimeSeriesPoint[]
  valueGenerator?: () => number
  paused?: boolean
}

export function useRealtimeSeries({
  intervalMs = 1000,
  maxPoints = 20,
  initialData = [],
  valueGenerator = () => Math.round(Math.random() * 100),
  paused = false,
}: UseRealtimeSeriesOptions = {}) {
  const [data, setData] = useState<WashTimeSeriesPoint[]>(initialData)
  const generatorRef = useRef(valueGenerator)
  generatorRef.current = valueGenerator

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => {
      setData((current) => {
        const next: WashTimeSeriesPoint = [Date.now(), generatorRef.current()]
        const merged = [...current, next]
        return merged.length > maxPoints ? merged.slice(-maxPoints) : merged
      })
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs, maxPoints, paused])

  return useMemo(() => data, [data])
}
