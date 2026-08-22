/** Studio-themed sample data for chart gallery pages. */

export const washWeekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export const weeklyWashCounts = [12, 18, 14, 22, 19, 8, 11]

export const pigmentLoadTrend = [32, 38, 35, 44, 41, 48, 52]

/** Pigment wash intensity across the studio week (for gradient line demos). */
export const pigmentWashIntensity = pigmentLoadTrend

export const weeklyPlateCounts = [6, 8, 7, 10, 9, 4, 5]

export const weeklyPigmentLevels = [68, 72, 70, 78, 75, 82, 79]

export const weeklyPlateOutputTarget = [7, 9, 8, 11, 10, 5, 6]

export const weeklyPigmentForecast = [70, 74, 72, 80, 77, 85, 81]

/** Studio hour labels for sensor gap demos. */
export const studioHourLabels = ['8a', '10a', '12p', '2p', '4p', '6p'] as const

/** Humidity sensor readings with brief outages (null gaps demo). */
export const humiditySensorReadings = [62, null, 58, null, 55, 51]

/** Pigment tank levels during power outages (null gaps demo). */
export const ceruleanTankLevelsWithGaps = [68, 72, null, null, 75, 82, 79]

export const ochreTankLevelsWithGaps = [64, null, 70, 73, null, 78, 76]

export const critiqueQueueTrend = [3, 2, 4, 3, 5, 2, 4]

export const dryTimeTrend = [28, 24, 31, 26, 22, 19, 25]

export const monthlyPlates = [
  { month: 'Mar', plates: 18, washes: 42 },
  { month: 'Apr', plates: 22, washes: 58 },
  { month: 'May', plates: 26, washes: 64 },
  { month: 'Jun', plates: 24, washes: 61 },
  { month: 'Jul', plates: 31, washes: 78 },
  { month: 'Aug', plates: 28, washes: 72 },
]

/** Monthly plate output counts for gradient line trend demos. */
export const monthlyPlateOutputTrend = monthlyPlates.map((m) => m.plates)

export const monthlyPlateOutputLabels = monthlyPlates.map((m) => m.month)

export const pigmentShare = [
  { name: 'Cerulean', value: 24 },
  { name: 'Ochre', value: 18 },
  { name: 'Madder', value: 16 },
  { name: 'Indigo', value: 14 },
  { name: 'Viridian', value: 12 },
  { name: 'Other', value: 16 },
]

export const seriesPlateCounts = [
  { series: 'Atlantic Studies', plates: 42 },
  { series: 'Mineral Notes', plates: 28 },
  { series: 'Botanical Index', plates: 34 },
  { series: 'Coastal Sketches', plates: 19 },
]

export const plateStatusCounts = [
  { status: 'Draft', count: 8 },
  { status: 'In wash', count: 14 },
  { status: 'Review', count: 11 },
  { status: 'Archived', count: 22 },
]

export const pigmentRadialScores = [
  { pigment: 'Cerulean', score: 82 },
  { pigment: 'Ochre', score: 68 },
  { pigment: 'Madder', score: 74 },
  { pigment: 'Indigo', score: 61 },
]

export const heroSparklines = [
  {
    title: 'Washes this week',
    value: '104',
    desc: 'Up 12% from last week',
    data: weeklyWashCounts,
  },
  {
    title: 'Pigment load',
    value: '52%',
    desc: 'Peak on Saturday',
    data: pigmentLoadTrend,
  },
  {
    title: 'Open critiques',
    value: '4',
    desc: 'Queue steady',
    data: critiqueQueueTrend,
  },
  {
    title: 'Avg dry time',
    value: '24m',
    desc: 'Down 3m this week',
    data: dryTimeTrend,
  },
] as const

export const syncedStudioMetrics = {
  plateOutput: { name: 'Plate output', data: [14, 18, 16, 22, 20, 10, 12] },
  dryTime: { name: 'Dry time (min)', data: [...dryTimeTrend] },
  pigmentUse: { name: 'Pigment load %', data: [...pigmentLoadTrend] },
}

export const chartNavLinks = [
  {
    page: 'charts-line' as const,
    label: 'Line Charts',
    description:
      'Basic lines, labels, gradients, dashed forecasts, steplines, missing data, zoom, annotations, realtime, sync, brush, and downsampling.',
  },
  {
    page: 'charts-bar' as const,
    label: 'Bar and column',
    description: 'Grouped pigments, horizontal bars, and mixed series.',
  },
  {
    page: 'charts-pie' as const,
    label: 'Pie and radial',
    description: 'Pigment share, donut breakdowns, and radial scores.',
  },
  {
    page: 'charts-gantt' as const,
    label: 'Gantt chart',
    description: 'Production timelines, batch lanes, and review windows.',
  },
  {
    page: 'charts-heatmap' as const,
    label: 'Heatmap',
    description: 'Pigment intensity grids, plate activity, and studio usage matrices.',
  },
]

export const studioHours = [
  '8a',
  '10a',
  '12p',
  '2p',
  '4p',
  '6p',
] as const

export const studioWeekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const

export const pigmentUsageByHour = [
  { x: '8a', y: 'Mon', value: 12 },
  { x: '10a', y: 'Mon', value: 28 },
  { x: '12p', y: 'Mon', value: 45 },
  { x: '2p', y: 'Mon', value: 62 },
  { x: '4p', y: 'Mon', value: 38 },
  { x: '6p', y: 'Mon', value: 18 },
  { x: '8a', y: 'Tue', value: 15 },
  { x: '10a', y: 'Tue', value: 34 },
  { x: '12p', y: 'Tue', value: 58 },
  { x: '2p', y: 'Tue', value: 71 },
  { x: '4p', y: 'Tue', value: 44 },
  { x: '6p', y: 'Tue', value: 22 },
  { x: '8a', y: 'Wed', value: 10 },
  { x: '10a', y: 'Wed', value: 26 },
  { x: '12p', y: 'Wed', value: 52 },
  { x: '2p', y: 'Wed', value: 68 },
  { x: '4p', y: 'Wed', value: 41 },
  { x: '6p', y: 'Wed', value: 19 },
  { x: '8a', y: 'Thu', value: 18 },
  { x: '10a', y: 'Thu', value: 36 },
  { x: '12p', y: 'Thu', value: 49 },
  { x: '2p', y: 'Thu', value: 74 },
  { x: '4p', y: 'Thu', value: 55 },
  { x: '6p', y: 'Thu', value: 28 },
  { x: '8a', y: 'Fri', value: 14 },
  { x: '10a', y: 'Fri', value: 31 },
  { x: '12p', y: 'Fri', value: 47 },
  { x: '2p', y: 'Fri', value: 63 },
  { x: '4p', y: 'Fri', value: 36 },
  { x: '6p', y: 'Fri', value: 16 },
]

export const plateActivityGrid = [
  { name: 'Atlantic Studies', data: [
    { x: 'Draft', y: 8 }, { x: 'In wash', y: 14 }, { x: 'Review', y: 6 }, { x: 'Archived', y: 22 },
  ]},
  { name: 'Mineral Notes', data: [
    { x: 'Draft', y: 5 }, { x: 'In wash', y: 11 }, { x: 'Review', y: 9 }, { x: 'Archived', y: 18 },
  ]},
  { name: 'Botanical Index', data: [
    { x: 'Draft', y: 12 }, { x: 'In wash', y: 16 }, { x: 'Review', y: 7 }, { x: 'Archived', y: 15 },
  ]},
  { name: 'Coastal Sketches', data: [
    { x: 'Draft', y: 4 }, { x: 'In wash', y: 9 }, { x: 'Review', y: 11 }, { x: 'Archived', y: 12 },
  ]},
]

export const washIntensityMatrix = [
  { x: 'Light', y: 'Cerulean', value: 72 },
  { x: 'Medium', y: 'Cerulean', value: 48 },
  { x: 'Heavy', y: 'Cerulean', value: 24 },
  { x: 'Light', y: 'Ochre', value: 65 },
  { x: 'Medium', y: 'Ochre', value: 58 },
  { x: 'Heavy', y: 'Ochre', value: 31 },
  { x: 'Light', y: 'Madder', value: 54 },
  { x: 'Medium', y: 'Madder', value: 62 },
  { x: 'Heavy', y: 'Madder', value: 44 },
  { x: 'Light', y: 'Indigo', value: 38 },
  { x: 'Medium', y: 'Indigo', value: 51 },
  { x: 'Heavy', y: 'Indigo', value: 67 },
]

/** Milliseconds since epoch for demo datetime charts (local midnight). */
export function studioDay(year: number, month: number, day: number): number {
  return new Date(year, month - 1, day).getTime()
}

/** Daily plate output over ~90 studio days (Mar through Aug 2026). */
export const dailyPlateOutput: Array<[number, number]> = [
  [studioDay(2026, 3, 1), 2],
  [studioDay(2026, 3, 5), 3],
  [studioDay(2026, 3, 9), 1],
  [studioDay(2026, 3, 12), 4],
  [studioDay(2026, 3, 16), 3],
  [studioDay(2026, 3, 20), 5],
  [studioDay(2026, 3, 24), 2],
  [studioDay(2026, 3, 28), 4],
  [studioDay(2026, 4, 2), 6],
  [studioDay(2026, 4, 6), 3],
  [studioDay(2026, 4, 10), 5],
  [studioDay(2026, 4, 14), 4],
  [studioDay(2026, 4, 18), 7],
  [studioDay(2026, 4, 22), 5],
  [studioDay(2026, 4, 26), 6],
  [studioDay(2026, 4, 30), 8],
  [studioDay(2026, 5, 4), 5],
  [studioDay(2026, 5, 8), 7],
  [studioDay(2026, 5, 12), 6],
  [studioDay(2026, 5, 16), 9],
  [studioDay(2026, 5, 20), 7],
  [studioDay(2026, 5, 24), 8],
  [studioDay(2026, 5, 28), 10],
  [studioDay(2026, 6, 1), 6],
  [studioDay(2026, 6, 5), 9],
  [studioDay(2026, 6, 9), 8],
  [studioDay(2026, 6, 13), 11],
  [studioDay(2026, 6, 17), 7],
  [studioDay(2026, 6, 21), 10],
  [studioDay(2026, 6, 25), 9],
  [studioDay(2026, 6, 29), 12],
  [studioDay(2026, 7, 3), 8],
  [studioDay(2026, 7, 7), 11],
  [studioDay(2026, 7, 11), 10],
  [studioDay(2026, 7, 15), 13],
  [studioDay(2026, 7, 19), 9],
  [studioDay(2026, 7, 23), 12],
  [studioDay(2026, 7, 27), 11],
  [studioDay(2026, 7, 31), 14],
  [studioDay(2026, 8, 4), 10],
  [studioDay(2026, 8, 8), 13],
  [studioDay(2026, 8, 12), 12],
  [studioDay(2026, 8, 16), 15],
  [studioDay(2026, 8, 20), 11],
]

/** Studio production metrics for brush chart demos (plates vs washes per day). */
export const studioProductionMetrics = {
  plates: dailyPlateOutput,
  washes: dailyPlateOutput.map(([day, plates], index) => {
    const variance = (index % 5) - 2
    return [day, plates * 2 + variance] as [number, number]
  }),
}

/** Monthly pigment usage in ml (Cerulean vs Ochre) for zoomable comparison. */
export const pigmentUsageTimeSeries = {
  cerulean: [
    [studioDay(2026, 1, 1), 420],
    [studioDay(2026, 2, 1), 465],
    [studioDay(2026, 3, 1), 512],
    [studioDay(2026, 4, 1), 488],
    [studioDay(2026, 5, 1), 545],
    [studioDay(2026, 6, 1), 598],
    [studioDay(2026, 7, 1), 572],
    [studioDay(2026, 8, 1), 631],
  ] as Array<[number, number]>,
  ochre: [
    [studioDay(2026, 1, 1), 380],
    [studioDay(2026, 2, 1), 402],
    [studioDay(2026, 3, 1), 445],
    [studioDay(2026, 4, 1), 468],
    [studioDay(2026, 5, 1), 492],
    [studioDay(2026, 6, 1), 518],
    [studioDay(2026, 7, 1), 505],
    [studioDay(2026, 8, 1), 547],
  ] as Array<[number, number]>,
}

export const plateProductionTasks = [
  { name: 'Sketch layout', start: '2026-08-01', end: '2026-08-04' },
  { name: 'First wash', start: '2026-08-04', end: '2026-08-08' },
  { name: 'Glaze layer', start: '2026-08-07', end: '2026-08-11' },
  { name: 'Dry and scan', start: '2026-08-11', end: '2026-08-13' },
  { name: 'Archive', start: '2026-08-13', end: '2026-08-15' },
]

export const pigmentBatchTracks = [
  {
    name: 'Cerulean',
    tasks: [
      { name: 'Grind', start: '2026-08-02', end: '2026-08-04' },
      { name: 'Mull', start: '2026-08-04', end: '2026-08-07' },
      { name: 'Rest', start: '2026-08-07', end: '2026-08-09' },
    ],
  },
  {
    name: 'Ochre',
    tasks: [
      { name: 'Grind', start: '2026-08-05', end: '2026-08-07' },
      { name: 'Mull', start: '2026-08-07', end: '2026-08-10' },
      { name: 'Rest', start: '2026-08-10', end: '2026-08-12' },
    ],
  },
  {
    name: 'Madder',
    tasks: [
      { name: 'Grind', start: '2026-08-08', end: '2026-08-10' },
      { name: 'Mull', start: '2026-08-10', end: '2026-08-13' },
    ],
  },
]

export const milestoneReviewWindows = [
  { name: 'Plate 12 review', start: '2026-08-10', end: '2026-08-11' },
  { name: 'Pigment sign-off', start: '2026-08-12', end: '2026-08-13' },
  { name: 'Series wrap', start: '2026-08-14', end: '2026-08-15' },
  { name: 'Archive handoff', start: '2026-08-16', end: '2026-08-17' },
]

/** Daily plate quality score for annotated line chart demo (Aug 2026). */
export const plateQualityTrend = [
  { x: '2026-08-01', y: 68 },
  { x: '2026-08-04', y: 71 },
  { x: '2026-08-07', y: 69 },
  { x: '2026-08-10', y: 74 },
  { x: '2026-08-13', y: 77 },
  { x: '2026-08-16', y: 79 },
  { x: '2026-08-19', y: 76 },
  { x: '2026-08-22', y: 82 },
]

/** Seeded pseudo-random for reproducible large-series demos. */
function seededNoise(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/** Synthetic studio humidity sensor stream with diurnal drift and noise. */
export function generateStudioSensorNoise(
  pointCount: number,
  startMs: number = studioDay(2026, 8, 1),
  intervalMs = 60_000,
): Array<[number, number]> {
  const points: Array<[number, number]> = []
  let humidity = 52
  for (let i = 0; i < pointCount; i += 1) {
    const t = startMs + i * intervalMs
    const diurnal = Math.sin((i / pointCount) * Math.PI * 6) * 4.5
    const ripple = Math.sin(i * 0.031) * 1.8 + Math.cos(i * 0.017) * 1.1
    const noise = (seededNoise(i + 1) - 0.5) * 2.4
    humidity = Math.max(38, Math.min(72, humidity + noise * 0.35 + diurnal * 0.04))
    points.push([t, Math.round((humidity + ripple) * 100) / 100])
  }
  return points
}

/** 20k-point studio humidity stream for downsampled line chart demos. */
export const studioSensorNoise20k = generateStudioSensorNoise(20_000)

/** Studio events for LineChartWithAnnotations gallery. */
export const plateQualityAnnotations = [
  {
    type: 'x' as const,
    value: '2026-08-14',
    label: 'Ship date',
    tone: 'warning' as const,
  },
  {
    type: 'y' as const,
    value: 75,
    label: 'Quality threshold',
    tone: 'primary' as const,
  },
  {
    type: 'point' as const,
    x: '2026-08-10',
    y: 74,
    label: 'Pigment change',
    tone: 'warning' as const,
  },
  {
    type: 'text' as const,
    x: 0,
    y: 88,
    text: 'Studio QA trend',
    tone: 'secondary' as const,
  },
]

export const plateDryingCheckpoints = ['0h', '2h', '4h', '6h', '8h', '10h', 'Dry'] as const
export const plateMoistureSteps = [100, 100, 78, 78, 45, 45, 12]
export const pigmentBatchStages = ['Prep', 'Grind', 'Mull', 'Rest', 'Jar'] as const
export const ceruleanBatchJars = [0, 2, 2, 4, 6]
export const ochreBatchJars = [0, 1, 1, 3, 5]
export const pigmentBatchCompletionSteps = [
  { x: '2026-08-01', y: 0 },
  { x: '2026-08-05', y: 25 },
  { x: '2026-08-09', y: 25 },
  { x: '2026-08-13', y: 60 },
  { x: '2026-08-17', y: 60 },
  { x: '2026-08-21', y: 100 },
]
export const inventoryRestockMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const
export const ceruleanStockSteps = [12, 12, 18, 18, 24, 24]
export const ochreStockSteps = [8, 8, 14, 14, 20, 20]
