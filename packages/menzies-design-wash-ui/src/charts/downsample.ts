import type { WashSeriesPoint, WashTimeSeriesPoint } from './types'

export type DownsamplePoint = { x: number; y: number }
export type DownsampleMethod = 'lttb' | 'minmax'
export type DownsampleInput = number[] | WashTimeSeriesPoint[] | WashSeriesPoint[]
export type DownsampleResult = {
  points: DownsamplePoint[]
  originalCount: number
  downsampledCount: number
}

function toNumber(value: string | number): number {
  return typeof value === 'number' ? value : Number(value)
}

export function normalizeDownsampleInput(data: DownsampleInput): DownsamplePoint[] {
  if (data.length === 0) return []
  if (typeof data[0] === 'number') {
    return (data as number[]).map((y, index) => ({ x: index, y }))
  }
  const first = data[0]
  if (Array.isArray(first)) {
    return (data as WashTimeSeriesPoint[]).map(([x, y]) => ({ x, y }))
  }
  return (data as Array<{ x: string | number; y: number | null }>)
    .filter((point) => point.y !== null)
    .map((point) => ({ x: toNumber(point.x), y: point.y as number }))
}

export function downsampleLttb(points: DownsamplePoint[], targetPoints: number): DownsamplePoint[] {
  const threshold = Math.max(3, Math.floor(targetPoints))
  if (points.length <= threshold) return points.slice()
  const sampled: DownsamplePoint[] = []
  const bucketSize = (points.length - 2) / (threshold - 2)
  let previousIndex = 0
  sampled.push(points[previousIndex])
  for (let i = 0; i < threshold - 2; i += 1) {
    const rangeStart = Math.floor((i + 1) * bucketSize) + 1
    const rangeEnd = Math.min(Math.floor((i + 2) * bucketSize) + 1, points.length)
    const nextBucketStart = Math.floor((i + 2) * bucketSize) + 1
    const nextBucketEnd = Math.min(Math.floor((i + 3) * bucketSize) + 1, points.length)
    let avgX = 0
    let avgY = 0
    const avgLength = Math.max(0, nextBucketEnd - nextBucketStart)
    if (avgLength > 0) {
      for (let j = nextBucketStart; j < nextBucketEnd; j += 1) {
        avgX += points[j].x
        avgY += points[j].y
      }
      avgX /= avgLength
      avgY /= avgLength
    } else {
      avgX = points[points.length - 1].x
      avgY = points[points.length - 1].y
    }
    let maxArea = -1
    let maxIndex = rangeStart
    for (let j = rangeStart; j < rangeEnd; j += 1) {
      const area = Math.abs(
        (points[previousIndex].x - avgX) * (points[j].y - points[previousIndex].y) -
          (points[previousIndex].x - points[j].x) * (avgY - points[previousIndex].y),
      )
      if (area > maxArea) {
        maxArea = area
        maxIndex = j
      }
    }
    sampled.push(points[maxIndex])
    previousIndex = maxIndex
  }
  sampled.push(points[points.length - 1])
  return sampled
}

export function downsampleMinMax(points: DownsamplePoint[], targetPoints: number): DownsamplePoint[] {
  const threshold = Math.max(2, Math.floor(targetPoints))
  if (points.length <= threshold) return points.slice()
  const bucketCount = Math.max(1, Math.floor(threshold / 2))
  const bucketSize = points.length / bucketCount
  const sampled: DownsamplePoint[] = []
  for (let i = 0; i < bucketCount; i += 1) {
    const start = Math.floor(i * bucketSize)
    const end = Math.min(Math.floor((i + 1) * bucketSize), points.length)
    if (start >= end) continue
    let minPoint = points[start]
    let maxPoint = points[start]
    for (let j = start + 1; j < end; j += 1) {
      if (points[j].y < minPoint.y) minPoint = points[j]
      if (points[j].y > maxPoint.y) maxPoint = points[j]
    }
    if (minPoint.x <= maxPoint.x) {
      sampled.push(minPoint)
      if (minPoint.x !== maxPoint.x || minPoint.y !== maxPoint.y) sampled.push(maxPoint)
    } else {
      sampled.push(maxPoint)
      if (minPoint.x !== maxPoint.x || minPoint.y !== maxPoint.y) sampled.push(minPoint)
    }
  }
  if (sampled[0]?.x !== points[0].x || sampled[0]?.y !== points[0].y) sampled.unshift(points[0])
  const lastOriginal = points[points.length - 1]
  const lastSampled = sampled[sampled.length - 1]
  if (lastSampled?.x !== lastOriginal.x || lastSampled?.y !== lastOriginal.y) sampled.push(lastOriginal)
  return sampled
}

export function downsamplePoints(
  points: DownsamplePoint[],
  targetPoints: number,
  method: DownsampleMethod = 'lttb',
): DownsamplePoint[] {
  if (points.length === 0) return []
  if (targetPoints >= points.length) return points.slice()
  return method === 'minmax' ? downsampleMinMax(points, targetPoints) : downsampleLttb(points, targetPoints)
}

export function downsampleData(
  data: DownsampleInput,
  targetPoints: number,
  method: DownsampleMethod = 'lttb',
): DownsampleResult {
  const normalized = normalizeDownsampleInput(data)
  const points = downsamplePoints(normalized, targetPoints, method)
  return { points, originalCount: normalized.length, downsampledCount: points.length }
}

export function downsampledToTimeSeries(points: DownsamplePoint[]): WashTimeSeriesPoint[] {
  return points.map((point) => [point.x, point.y])
}

export function downsampledToValues(points: DownsamplePoint[]): number[] {
  return points.map((point) => point.y)
}
