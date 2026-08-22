import type { HistogramBinsRule } from './types'

export type HistogramBinnedPoint = {
  x: string
  y: number
  xMin: number
  xMax: number
}

function isRawObservation(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isHistogramRawSeries(
  data: Array<number | { x: string | number; y: number }>,
): data is number[] {
  return data.length === 0 || isRawObservation(data[0])
}

function sortedCopy(values: number[]): number[] {
  return [...values].sort((a, b) => a - b)
}

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0
  if (sorted.length === 1) return sorted[0]!
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  const lower = sorted[base]!
  const upper = sorted[base + 1] ?? lower
  return lower + rest * (upper - lower)
}

function sturgesBinCount(count: number): number {
  if (count <= 1) return 1
  return Math.max(1, Math.ceil(Math.log2(count) + 1))
}

function freedmanDiaconisBinCount(values: number[]): number {
  if (values.length <= 1) return 1
  const sorted = sortedCopy(values)
  const min = sorted[0]!
  const max = sorted[sorted.length - 1]!
  const range = max - min
  if (range === 0) return 1
  const iqr = quantile(sorted, 0.75) - quantile(sorted, 0.25)
  if (iqr === 0) return sturgesBinCount(values.length)
  const width = (2 * iqr) / Math.cbrt(values.length)
  return Math.max(1, Math.ceil(range / width))
}

export function resolveHistogramBinCount(values: number[], rule: HistogramBinsRule): number {
  if (typeof rule === 'number') return Math.max(1, Math.floor(rule))
  if (rule === 'sturges') return sturgesBinCount(values.length)
  if (rule === 'fd') return freedmanDiaconisBinCount(values)
  const fd = freedmanDiaconisBinCount(values)
  const sturges = sturgesBinCount(values.length)
  return Math.min(fd, sturges)
}

function formatBinLabel(min: number, max: number, isLast: boolean): string {
  const round = (value: number) => (Number.isInteger(value) ? `${value}` : value.toFixed(1))
  return isLast ? `${round(min)}-${round(max)}` : `${round(min)}-${round(max)}`
}

export function buildHistogramBinEdges(
  values: number[],
  rule: HistogramBinsRule,
  binWidth?: number,
): number[] {
  if (values.length === 0) return [0, 1]
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (min === max) return [min, min + (binWidth ?? 1)]

  const count =
    binWidth && binWidth > 0
      ? Math.max(1, Math.ceil((max - min) / binWidth))
      : resolveHistogramBinCount(values, rule)
  const width = binWidth && binWidth > 0 ? binWidth : (max - min) / count
  const edges: number[] = []
  for (let i = 0; i <= count; i += 1) {
    edges.push(min + i * width)
  }
  edges[edges.length - 1] = max
  return edges
}

function binIndexForValue(value: number, edges: number[]): number {
  const lastIndex = edges.length - 2
  for (let i = 0; i <= lastIndex; i += 1) {
    const upper = edges[i + 1]!
    const isLast = i === lastIndex
    if (value >= edges[i]! && (isLast ? value <= upper : value < upper)) return i
  }
  return lastIndex
}

export function binHistogramObservations(
  observations: number[],
  edges: number[],
): HistogramBinnedPoint[] {
  const counts = new Array(Math.max(edges.length - 1, 1)).fill(0)
  for (const value of observations) {
    const index = binIndexForValue(value, edges)
    counts[index] = (counts[index] ?? 0) + 1
  }
  return counts.map((count, index) => {
    const xMin = edges[index]!
    const xMax = edges[index + 1]!
    const isLast = index === counts.length - 1
    return {
      x: formatBinLabel(xMin, xMax, isLast),
      y: count,
      xMin,
      xMax,
    }
  })
}

export function normalizeHistogramCounts(
  points: HistogramBinnedPoint[],
  mode: 'count' | 'relative' | 'density',
  binWidth: number,
): HistogramBinnedPoint[] {
  if (mode === 'count') return points
  const total = points.reduce((sum, point) => sum + point.y, 0)
  if (total === 0) return points
  return points.map((point) => ({
    ...point,
    y:
      mode === 'relative'
        ? (point.y / total) * 100
        : point.y / (total * Math.max(binWidth, Number.EPSILON)),
  }))
}

export function histogramSeriesToBinned(
  series: Array<{ name?: string; data: Array<number | { x: string | number; y: number }> }>,
  rule: HistogramBinsRule,
  binWidth?: number,
  normalize: 'count' | 'relative' | 'density' = 'count',
): {
  categories: string[]
  series: Array<{ name?: string; data: number[] }>
} {
  const preBinned = series.every((item) => !isHistogramRawSeries(item.data))
  if (preBinned) {
    const firstSeries = series[0]
    const categories =
      firstSeries?.data.map((point) =>
        typeof point === 'number' ? `${point}` : `${point.x}`,
      ) ?? []
    return {
      categories,
      series: series.map((item) => ({
        name: item.name,
        data: item.data.map((point) =>
          typeof point === 'number' ? point : point.y,
        ),
      })),
    }
  }

  const rawValues = series.flatMap((item) =>
    isHistogramRawSeries(item.data) ? item.data : [],
  )
  const edges = buildHistogramBinEdges(rawValues, rule, binWidth)
  const resolvedBinWidth =
    binWidth && binWidth > 0
      ? binWidth
      : edges.length > 1
        ? edges[1]! - edges[0]!
        : 1

  const binnedSeries = series.map((item) => {
    const observations = isHistogramRawSeries(item.data) ? item.data : []
    const points = binHistogramObservations(observations, edges)
    const normalized = normalizeHistogramCounts(points, normalize, resolvedBinWidth)
    return {
      name: item.name,
      points: normalized,
    }
  })

  const categories = binnedSeries[0]?.points.map((point) => point.x) ?? []
  return {
    categories,
    series: binnedSeries.map((item) => ({
      name: item.name,
      data: item.points.map((point) => point.y),
    })),
  }
}
