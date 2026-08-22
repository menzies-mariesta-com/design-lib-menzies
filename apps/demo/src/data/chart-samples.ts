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

export const windDirectionFrequency = [
  { label: 'N', value: 12 },
  { label: 'NE', value: 8 },
  { label: 'E', value: 15 },
  { label: 'SE', value: 23 },
  { label: 'S', value: 18 },
  { label: 'SW', value: 9 },
  { label: 'W', value: 6 },
  { label: 'NW', value: 11 },
]

export const seriesPlateCounts = [
  { series: 'Atlantic Studies', plates: 42 },
  { series: 'Mineral Notes', plates: 28 },
  { series: 'Botanical Index', plates: 34 },
  { series: 'Coastal Sketches', plates: 19 },
]

/** Long series labels for rotated column demos. */
export const seriesPlateCountsLongLabels = [
  { series: 'Atlantic Studies Vol. I', plates: 42 },
  { series: 'Mineral Notes Collection', plates: 28 },
  { series: 'Botanical Index Series', plates: 34 },
  { series: 'Coastal Sketches Vol. II', plates: 19 },
  { series: 'Urban Watercolor Studies', plates: 31 },
]

/** Monthly pigment usage by family for stacked column demos. */
export const monthlyPigmentUsage = [
  { month: 'Mar', cerulean: 12, ochre: 8, madder: 6 },
  { month: 'Apr', cerulean: 14, ochre: 10, madder: 7 },
  { month: 'May', cerulean: 16, ochre: 11, madder: 8 },
  { month: 'Jun', cerulean: 15, ochre: 10, madder: 7 },
  { month: 'Jul', cerulean: 18, ochre: 12, madder: 9 },
  { month: 'Aug', cerulean: 17, ochre: 11, madder: 8 },
]

/** Studio budget surplus/deficit by month (negative column/area demos). */
export const studioBudgetDelta = [
  { month: 'Jan', delta: 420 },
  { month: 'Feb', delta: -180 },
  { month: 'Mar', delta: 310 },
  { month: 'Apr', delta: -95 },
  { month: 'May', delta: 540 },
  { month: 'Jun', delta: 260 },
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

/** Single radial KPI for basic circle demos. */
export const studioPigmentLoad = {
  label: 'Pigment load',
  value: 73,
} as const

/** Semi-circle gauge arc for custom-angle radial demos. */
export const critiqueCompletionGauge = {
  label: 'Critiques done',
  value: 73,
  startAngle: -135,
  endAngle: 135,
} as const

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

/** Monthly avg dry time in minutes (for mixed triple-combo demos). */
export const monthlyAvgDryTime = [28, 24, 22, 26, 19, 21]

/** Line + column combo: plates (bars) vs washes (line). */
export const mixedLineColumnSample = {
  categories: monthlyPlates.map((m) => m.month),
  plates: monthlyPlates.map((m) => m.plates),
  washes: monthlyPlates.map((m) => m.washes),
}

/** Line + area combo: pigment load (area) vs plate output (line). */
export const mixedLineAreaSample = {
  categories: [...washWeekLabels],
  pigmentLoad: [...pigmentLoadTrend],
  plateOutput: [...weeklyPlateCounts],
}

/** Line + column + area triple combo over studio months. */
export const mixedTripleComboSample = {
  categories: monthlyPlates.map((m) => m.month),
  plates: monthlyPlates.map((m) => m.plates),
  washes: monthlyPlates.map((m) => m.washes),
  dryTime: [...monthlyAvgDryTime],
}

/** Dual y-axis combo: plate output (columns) vs dry time (line). */
export const mixedDualAxisSample = {
  categories: [...washWeekLabels],
  plateOutput: [...weeklyPlateCounts],
  dryTime: [...dryTimeTrend],
}

/** Studio humidity min/max spread by hour (range area demos). */
export const studioHumidityRange = {
  categories: [...studioHourLabels],
  low: [48, 52, 55, 58, 54, 50],
  high: [68, 72, 75, 78, 74, 62],
}

/** Pigment load forecast band with weekly average line (range area combo). */
export const pigmentLoadRangeCombo = {
  categories: [...washWeekLabels],
  low: [28, 32, 30, 38, 36, 42, 46],
  high: [36, 44, 40, 50, 46, 54, 58],
  average: [...pigmentLoadTrend],
}


/** Basic slope: plate throughput Jan to Feb by pigment family. */
export const basicSlopeSample = {
  title: 'Plate throughput: Jan to Feb',
  series: [
    {
      name: 'Cerulean',
      data: [
        { x: 'Jan', y: 43 },
        { x: 'Feb', y: 58 },
      ],
    },
    {
      name: 'Ochre',
      data: [
        { x: 'Jan', y: 33 },
        { x: 'Feb', y: 38 },
      ],
    },
    {
      name: 'Viridian',
      data: [
        { x: 'Jan', y: 55 },
        { x: 'Feb', y: 21 },
      ],
    },
  ],
} as const

/** Multi-group slope: studio desk rank across quarters. */
export const multiGroupSlopeSample = {
  title: 'Studio desk rank by quarter',
  series: [
    {
      name: 'North wing',
      data: [
        { x: 'Q1', y: 503 },
        { x: 'Q2', y: 580 },
        { x: 'Q3', y: 135 },
      ],
    },
    {
      name: 'South wing',
      data: [
        { x: 'Q1', y: 733 },
        { x: 'Q2', y: 385 },
        { x: 'Q3', y: 715 },
      ],
    },
    {
      name: 'East wing',
      data: [
        { x: 'Q1', y: 255 },
        { x: 'Q2', y: 211 },
        { x: 'Q3', y: 441 },
      ],
    },
    {
      name: 'West wing',
      data: [
        { x: 'Q1', y: 428 },
        { x: 'Q2', y: 749 },
        { x: 'Q3', y: 559 },
      ],
    },
  ],
} as const


function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function sampleNormal(rng: () => number) {
  let u = 0
  let v = 0
  while (u === 0) u = rng()
  while (v === 0) v = rng()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/** Build Apex violin density + observation points from a Gaussian sample. */
export function buildGaussianViolin(mean: number, sd: number, count: number, seed = 42) {
  const rng = mulberry32(seed)
  const points: number[] = []
  for (let i = 0; i < count; i += 1) {
    points.push(mean + sd * sampleNormal(rng))
  }
  const min = Math.min(...points)
  const max = Math.max(...points)
  const pad = sd * 0.6
  const lo = min - pad
  const hi = max + pad
  const steps = 64
  const bandwidth = Math.max(sd * 0.35, 0.001)
  const density: [number, number][] = []
  for (let i = 0; i <= steps; i += 1) {
    const x = lo + (i / steps) * (hi - lo)
    let weight = 0
    for (const p of points) {
      const z = (x - p) / bandwidth
      weight += Math.exp(-0.5 * z * z)
    }
    density.push([x, weight])
  }
  const peak = Math.max(...density.map(([, w]) => w), 1)
  return {
    density: density.map(([value, weight]) => [value, weight / peak] as [number, number]),
    points,
  }
}

export const pigmentLoadViolin = {
  title: 'Pigment load distribution',
  data: [
    { x: 'Cerulean', y: buildGaussianViolin(48, 8, 280, 11) },
    { x: 'Ochre', y: buildGaussianViolin(62, 5, 320, 17) },
    { x: 'Madder', y: buildGaussianViolin(45, 12, 220, 23) },
    { x: 'Viridian', y: buildGaussianViolin(55, 6, 300, 29) },
    { x: 'Indigo', y: buildGaussianViolin(52, 9, 260, 37) },
  ],
} as const

export const horizontalServiceLatencyViolin = {
  title: 'Service latency by lane',
  data: [
    { x: 'Auth', y: buildGaussianViolin(120, 18, 240, 41) },
    { x: 'Search', y: buildGaussianViolin(210, 35, 280, 43) },
    { x: 'Checkout', y: buildGaussianViolin(160, 22, 210, 47) },
    { x: 'Recommend', y: buildGaussianViolin(260, 45, 190, 53) },
  ],
} as const

export const studioKpiBullet = {
  title: 'Studio KPI bullet chart',
  rows: [
    { metric: 'Plate throughput', value: 72, target: 80, rangeMin: 65, rangeMax: 90 },
    { metric: 'Critique score', value: 88, target: 85, rangeMin: 75, rangeMax: 95 },
    { metric: 'Wash efficiency', value: 54, target: 70, rangeMin: 60, rangeMax: 85 },
    { metric: 'Archive rate', value: 61, target: 75, rangeMin: 55, rangeMax: 88 },
  ],
} as const

export const pigmentLollipop = {
  title: 'Pigment load lollipops',
  rows: [
    { label: 'Cerulean', value: 42 },
    { label: 'Ochre', value: 58 },
    { label: 'Madder', value: 36 },
    { label: 'Indigo', value: 51 },
    { label: 'Viridian', value: 47 },
  ],
} as const

export const throughputDumbbell = {
  title: 'Throughput dumbbell',
  rows: [
    { period: 'Jan', low: 42, high: 58 },
    { period: 'Feb', low: 38, high: 52 },
    { period: 'Mar', low: 45, high: 61 },
    { period: 'Apr', low: 50, high: 68 },
    { period: 'May', low: 47, high: 63 },
  ],
} as const

export const chartNavLinks = [
  {
    page: 'charts-line' as const,
    label: 'Line Charts',
    description:
      'Basic lines, labels, gradients, dashed forecasts, steplines, missing data, zoom, annotations, realtime, sync, brush, and downsampling.',
  },
  {
    page: 'charts-area' as const,
    label: 'Area Charts',
    description:
      'Filled curves, stacked washes, splines, datetime axes, missing data, negatives, and github-style deltas.',
  },
  {
    page: 'charts-range-area' as const,
    label: 'Range Area',
    description: 'Shaded bands between low and high readings plus line overlay combos.',
  },
  {
    page: 'charts-slope' as const,
    label: 'Slope Charts',
    description:
      'Basic and multi-group slope lines for comparing change between periods on a shared axis.',
  },
  {
    page: 'charts-column' as const,
    label: 'Column charts',
    description: 'Vertical columns, stacked counts, data labels, and negatives.',
  },
  {
    page: 'charts-bar' as const,
    label: 'Bar Charts',
    description:
      'Horizontal bars, negatives, grouped and stacked counts, reversed order, and target markers.',
  },
  {
    page: 'charts-mixed' as const,
    label: 'Mixed Charts',
    description: 'Line, column, and area combos plus dual y-axis studio metrics.',
  },
  {
    page: 'charts-pie' as const,
    label: 'Pie / Donut Charts',
    description:
      'Simple pie and donut, monochrome shades, gradient fills, rounded caps, and pattern drilldown stubs.',
  },
  {
    page: 'charts-radialbar' as const,
    label: 'RadialBar Charts',
    description: 'Single rings, multi-track pigment scores, and custom-angle radial arcs.',
  },
  {
    page: 'charts-polar-area' as const,
    label: 'Polar Area',
    description: 'Basic radial sectors and monochrome pigment shades for directional studio metrics.',
  },
  {
    page: 'charts-gauge' as const,
    label: 'Gauge Charts',
    description: 'Semi-circle, progress, and tick-style radial gauges for studio KPIs.',
  },
  {
    page: 'charts-sparklines' as const,
    label: 'Sparklines',
    description: 'Compact line, area, and bar micro charts for desk KPI stat blocks.',
  },
  {
    page: 'charts-dashboards' as const,
    label: 'Dashboards',
    description:
      'Multi-chart desk layouts with KPI sparklines, mixed charts, donuts, dark theme shells, and realtime streams.',
  },
  {
    page: 'charts-timeline' as const,
    label: 'Timeline',
    description: 'Simple timelines, multi-series lanes, colors, and range bar schedules.',
  },
  {
    page: 'charts-heatmap' as const,
    label: 'Heatmap Charts',
    description:
      'Basic grids, color ranges, multi-series matrices, rounded cells, and planned calendar and drilldown stubs.',
  },
  {
    page: 'charts-sunburst' as const,
    label: 'Sunburst Charts',
    description:
      'Hierarchical radial rings, semi-circle KPI layouts, and planned drilldown handoff from treemap or bar charts.',
  },
  { page: 'charts-bubble' as const,
    label: 'Bubble Charts',
    description: 'Simple numeric bubbles and z-scaled radius variants for pigment load and batch sizing.',
  },
  {
    page: 'charts-funnel' as const,
    label: 'Funnel Charts',
    description:
      'Conversion funnels, enrollment pyramids, and trapezoid tapered stage charts for studio pipeline analytics.',
  },
  {
    page: 'charts-scatter' as const,
    label: 'Scatter Charts',
    description:
      'Basic numeric scatter, datetime axes, jitter for overlapping buckets, plus image and canvas stubs.',
  },
  {
    page: 'charts-radar' as const,
    label: 'Radar Charts',
    description:
      'Basic spider charts, multi-series pigment comparisons, and filled polygon overlays with opacity control.',
  },
  {
    page: 'charts-boxplot' as const,
    label: 'BoxPlot Charts',
    description:
      'Basic and horizontal box plots with five-number summaries, plus outlier scatter and raw-observation stubs.',
  },
  {
    page: 'charts-violin' as const,
    label: 'Violin Charts',
    description:
      'Kernel density violins with jittered observations, horizontal layout, bandwidth scaling, and group normalization stubs.',
  },
  {
    page: 'charts-beeswarm' as const,
    label: 'Beeswarm Charts',
    description:
      'Apex Premium beeswarm plots with non-overlapping categorical jitter. Body mass, salary, game scores, and life expectancy stubs.',
  },
  {
    page: 'charts-waffle' as const,
    label: 'Waffle Charts',
    description:
      'Apex Premium grid-of-squares charts for part-to-whole share. Energy mix and urban small multiples stubs.',
  },
  {
    page: 'charts-candlestick' as const,
    label: 'Candlestick Charts',
    description:
      'OHLC pigment inventory bands, volume bar combos, and moving-average line overlays on datetime axes.',
  },
  {
    page: 'charts-histogram' as const,
    label: 'Histogram Charts',
    description:
      'Latency distributions, overlapping multi-series comparisons, and explode-to-observations drilldown stub.',
  },
  {
    page: 'charts-custom-series' as const,
    label: 'Custom Series Charts',
    description:
      'Bullet, lollipop, and dumbbell marks simulated with bar, column, and rangeBar options until Apex v6 Marks API lands.',
  },
  {
    page: 'charts-interactivity' as const,
    label: 'Interactivity',
    description:
      'Crossfilter categorical filters, linked dashboards, measure ruler, and premium annotation authoring.',
  },
  {
    page: 'charts-unit' as const,
    label: 'Unit Charts',
    description:
      'Pictogram population, heart donors, globe and city maps, parliament seats, population explorer, and workforce clusters.',
  },
]

export const plateConversionFunnel = {
  title: 'Plate conversion funnel',
  data: [
    { x: 'Inquiries', y: 1380 },
    { x: 'Consultations', y: 990 },
    { x: 'Commissions', y: 640 },
    { x: 'Deposits', y: 380 },
    { x: 'Completed', y: 210 },
  ],
} as const

export const studioEnrollmentPyramid = {
  title: 'Studio enrollment pyramid',
  data: [
    { x: 'Apprentice', y: 48 },
    { x: 'Associate', y: 96 },
    { x: 'Senior', y: 180 },
    { x: 'Lead', y: 320 },
    { x: 'Director', y: 520 },
  ],
} as const

export const trapezoidFunnelSample = {
  enabled: true,
  title: 'Wash pipeline funnel',
  data: [
    { x: 'Sketches', y: 920 },
    { x: 'Underpainting', y: 610 },
    { x: 'Glazing', y: 380 },
    { x: 'Framing', y: 140 },
  ],
} as const

export const sunburstChartSample = { enabled: true } as const

export const studioPigmentSunburst = {
  title: 'Studio pigment allocation',
  data: [
    { x: 'Earth pigments', y: 420, children: [
      { x: 'Ochre', y: 180, children: [{ x: 'Raw sienna', y: 95 }, { x: 'Burnt umber', y: 85 }] },
      { x: 'Green earth', y: 140, children: [{ x: 'Terre verte', y: 78 }, { x: 'Chromium oxide', y: 62 }] },
      { x: 'Red earth', y: 100 },
    ]},
    { x: 'Mineral blues', y: 310, children: [{ x: 'Cerulean', y: 145 }, { x: 'Ultramarine', y: 165 }] },
    { x: 'Organic lakes', y: 240, children: [{ x: 'Madder', y: 130 }, { x: 'Indigo', y: 110 }] },
  ],
}

export const semiCircleSunburstSample = {
  enabled: true,
  title: 'Portfolio mix semi-circle',
  innerSize: '35%',
  startAngle: -90,
  endAngle: 90,
  data: [
    { x: 'Commissions', y: 520, children: [{ x: 'Landscape', y: 210 }, { x: 'Portrait', y: 180 }, { x: 'Still life', y: 130 }] },
    { x: 'Prints', y: 280, children: [{ x: 'Open edition', y: 160 }, { x: 'Limited edition', y: 120 }] },
    { x: 'Workshops', y: 190, children: [{ x: 'Weekend', y: 110 }, { x: 'Evening', y: 80 }] },
  ],
}

export const pigmentDryTimeBoxPlot = {
  title: 'Pigment dry time distribution',
  data: [
    { x: 'Cerulean', y: [18, 24, 28, 34, 42] },
    { x: 'Ochre', y: [22, 30, 36, 44, 52] },
    { x: 'Madder', y: [16, 22, 26, 32, 38] },
    { x: 'Viridian', y: [20, 28, 32, 40, 48] },
    { x: 'Indigo', y: [24, 32, 38, 46, 56] },
  ],
} as const

export const horizontalStudioLaneBoxPlot = {
  title: 'Critique score spread by studio lane',
  data: [
    { x: 'Atlantic Studies', y: [62, 71, 78, 86, 94] },
    { x: 'Mineral Notes', y: [58, 68, 74, 82, 90] },
    { x: 'Coastal Skies', y: [55, 64, 72, 80, 88] },
    { x: 'Plate Archive', y: [60, 70, 76, 84, 92] },
    { x: 'Pigment Lab', y: [52, 62, 70, 78, 86] },
  ],
} as const


export const simpleBubbleSeries = [
  {
    name: 'Cerulean',
    data: [
      { x: 12, y: 28, z: 14 },
      { x: 18, y: 34, z: 18 },
      { x: 24, y: 42, z: 22 },
      { x: 30, y: 38, z: 16 },
      { x: 36, y: 48, z: 26 },
    ],
  },
  {
    name: 'Ochre',
    data: [
      { x: 14, y: 52, z: 20 },
      { x: 20, y: 58, z: 28 },
      { x: 26, y: 64, z: 32 },
      { x: 32, y: 60, z: 24 },
      { x: 38, y: 70, z: 36 },
    ],
  },
  {
    name: 'Madder',
    data: [
      { x: 16, y: 45, z: 14 },
      { x: 22, y: 50, z: 19 },
      { x: 28, y: 47, z: 17 },
      { x: 34, y: 53, z: 23 },
    ],
  },
] as const

export const bubble3dSeries = [
  {
    name: 'Atlantic Studies',
    data: [
      { x: 22, y: 38, z: 18 },
      { x: 28, y: 44, z: 42 },
      { x: 34, y: 52, z: 58 },
      { x: 40, y: 48, z: 35 },
    ],
  },
  {
    name: 'Mineral Notes',
    data: [
      { x: 18, y: 34, z: 24 },
      { x: 24, y: 40, z: 48 },
      { x: 30, y: 48, z: 62 },
      { x: 36, y: 42, z: 38 },
    ],
  },
  {
    name: 'Coastal Skies',
    data: [
      { x: 26, y: 46, z: 30 },
      { x: 32, y: 52, z: 52 },
      { x: 38, y: 58, z: 68 },
    ],
  },
] as const

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


export const pigmentCollectionTreemap = {
  title: 'Pigment collection share',
  data: [
    { x: 'Cerulean plates', y: 42 },
    { x: 'Ochre studies', y: 28 },
    { x: 'Madder editions', y: 22 },
    { x: 'Indigo washes', y: 18 },
    { x: 'Sienna proofs', y: 14 },
    { x: 'Ultramarine runs', y: 11 },
  ],
} as const

export const studioHierarchyTreemap = {
  title: 'Studio hierarchy treemap',
  data: [
    {
      x: 'Atlantic Studies',
      y: 48,
      children: [
        { x: 'Cerulean', y: 22 },
        { x: 'Indigo', y: 16 },
        { x: 'Prussian', y: 10 },
      ],
    },
    {
      x: 'Continental Editions',
      y: 36,
      children: [
        { x: 'Ochre', y: 18 },
        { x: 'Sienna', y: 12 },
        { x: 'Umber', y: 6 },
      ],
    },
    {
      x: 'Archive Prints',
      y: 24,
      children: [
        { x: 'Madder', y: 14 },
        { x: 'Rose', y: 10 },
      ],
    },
  ],
} as const

/** Milliseconds since epoch for demo datetime charts (local midnight). */
export function studioDay(year: number, month: number, day: number): number {
  return new Date(year, month - 1, day).getTime()
}

/** Daily cerulean inventory OHLC (ml on hand): open, high, low, close per studio day. */
export const ceruleanInventoryOhlc = [
  { x: studioDay(2026, 8, 1), y: [420, 445, 410, 438] as [number, number, number, number] },
  { x: studioDay(2026, 8, 2), y: [438, 452, 425, 430] as [number, number, number, number] },
  { x: studioDay(2026, 8, 3), y: [430, 448, 418, 442] as [number, number, number, number] },
  { x: studioDay(2026, 8, 4), y: [442, 455, 435, 428] as [number, number, number, number] },
  { x: studioDay(2026, 8, 5), y: [428, 440, 412, 415] as [number, number, number, number] },
  { x: studioDay(2026, 8, 6), y: [415, 432, 405, 426] as [number, number, number, number] },
  { x: studioDay(2026, 8, 7), y: [426, 450, 420, 448] as [number, number, number, number] },
  { x: studioDay(2026, 8, 8), y: [448, 462, 440, 455] as [number, number, number, number] },
  { x: studioDay(2026, 8, 9), y: [455, 468, 448, 452] as [number, number, number, number] },
  { x: studioDay(2026, 8, 10), y: [452, 460, 438, 441] as [number, number, number, number] },
  { x: studioDay(2026, 8, 11), y: [441, 458, 435, 450] as [number, number, number, number] },
  { x: studioDay(2026, 8, 12), y: [450, 465, 445, 462] as [number, number, number, number] },
  { x: studioDay(2026, 8, 13), y: [462, 475, 455, 458] as [number, number, number, number] },
  { x: studioDay(2026, 8, 14), y: [458, 470, 448, 465] as [number, number, number, number] },
  { x: studioDay(2026, 8, 15), y: [465, 480, 460, 472] as [number, number, number, number] },
  { x: studioDay(2026, 8, 16), y: [472, 485, 465, 468] as [number, number, number, number] },
  { x: studioDay(2026, 8, 17), y: [468, 478, 452, 455] as [number, number, number, number] },
  { x: studioDay(2026, 8, 18), y: [455, 470, 448, 466] as [number, number, number, number] },
  { x: studioDay(2026, 8, 19), y: [466, 482, 460, 475] as [number, number, number, number] },
  { x: studioDay(2026, 8, 20), y: [475, 490, 468, 480] as [number, number, number, number] },
] as const

/** Daily restock volume (ml received) aligned to ceruleanInventoryOhlc dates. */
export const ceruleanRestockVolume = [
  { x: studioDay(2026, 8, 1), y: 28 },
  { x: studioDay(2026, 8, 2), y: 12 },
  { x: studioDay(2026, 8, 3), y: 35 },
  { x: studioDay(2026, 8, 4), y: 18 },
  { x: studioDay(2026, 8, 5), y: 42 },
  { x: studioDay(2026, 8, 6), y: 24 },
  { x: studioDay(2026, 8, 7), y: 38 },
  { x: studioDay(2026, 8, 8), y: 15 },
  { x: studioDay(2026, 8, 9), y: 22 },
  { x: studioDay(2026, 8, 10), y: 45 },
  { x: studioDay(2026, 8, 11), y: 30 },
  { x: studioDay(2026, 8, 12), y: 20 },
  { x: studioDay(2026, 8, 13), y: 33 },
  { x: studioDay(2026, 8, 14), y: 26 },
  { x: studioDay(2026, 8, 15), y: 40 },
  { x: studioDay(2026, 8, 16), y: 14 },
  { x: studioDay(2026, 8, 17), y: 48 },
  { x: studioDay(2026, 8, 18), y: 32 },
  { x: studioDay(2026, 8, 19), y: 19 },
  { x: studioDay(2026, 8, 20), y: 36 },
] as const

/** 5-day moving average of cerulean close prices for line overlay demos. */
export const ceruleanCloseMovingAverage = [
  { x: studioDay(2026, 8, 5), y: 431 },
  { x: studioDay(2026, 8, 6), y: 426 },
  { x: studioDay(2026, 8, 7), y: 427 },
  { x: studioDay(2026, 8, 8), y: 434 },
  { x: studioDay(2026, 8, 9), y: 439 },
  { x: studioDay(2026, 8, 10), y: 444 },
  { x: studioDay(2026, 8, 11), y: 445 },
  { x: studioDay(2026, 8, 12), y: 450 },
  { x: studioDay(2026, 8, 13), y: 453 },
  { x: studioDay(2026, 8, 14), y: 457 },
  { x: studioDay(2026, 8, 15), y: 460 },
  { x: studioDay(2026, 8, 16), y: 464 },
  { x: studioDay(2026, 8, 17), y: 464 },
  { x: studioDay(2026, 8, 18), y: 463 },
  { x: studioDay(2026, 8, 19), y: 465 },
  { x: studioDay(2026, 8, 20), y: 469 },
] as const

export const latencyDistributionObservations = [
  72, 78, 81, 84, 86, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
  106, 107, 108, 109, 110, 112, 114, 116, 118, 120, 122, 125, 128, 131, 134, 138, 142, 146, 151,
  156, 162, 168, 175, 182, 190, 198, 206, 215, 224, 235, 248, 262, 278, 295, 312, 330, 348, 372,
  88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126,
  128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164,
  166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202,
  204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240,
] as const

export const comparingLatencyDistributions = [
  {
    name: 'Morning batch',
    data: [
      68, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110,
      112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146,
      148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182,
      184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218,
      220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254,
    ],
  },
  {
    name: 'Evening batch',
    data: [
      102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136,
      138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172,
      174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208,
      210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244,
      246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270, 272, 274, 276, 278, 280,
      282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302, 304, 306, 308, 310, 312, 314, 316,
    ],
  },
] as const

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

/** Daily archive net change for github-style area demos (plates added minus retired). */
export const plateArchiveNetChange: Array<[number, number]> = [
  [studioDay(2026, 7, 1), 14],
  [studioDay(2026, 7, 2), 22],
  [studioDay(2026, 7, 3), -8],
  [studioDay(2026, 7, 4), 18],
  [studioDay(2026, 7, 5), -12],
  [studioDay(2026, 7, 6), 6],
  [studioDay(2026, 7, 7), 25],
  [studioDay(2026, 7, 8), -5],
  [studioDay(2026, 7, 9), 11],
  [studioDay(2026, 7, 10), 19],
  [studioDay(2026, 7, 11), -9],
  [studioDay(2026, 7, 12), 16],
  [studioDay(2026, 7, 13), 8],
  [studioDay(2026, 7, 14), -14],
  [studioDay(2026, 7, 15), 21],
]

/** Humidity readings at irregular intervals (gaps in sampling). */
export const irregularHumidityReadings: Array<[number, number]> = [
  [studioDay(2026, 8, 1) + 8 * 3_600_000, 62],
  [studioDay(2026, 8, 1) + 14 * 3_600_000, 58],
  [studioDay(2026, 8, 2) + 9 * 3_600_000, 55],
  [studioDay(2026, 8, 4) + 11 * 3_600_000, 52],
  [studioDay(2026, 8, 7) + 10 * 3_600_000, 48],
  [studioDay(2026, 8, 8) + 15 * 3_600_000, 51],
  [studioDay(2026, 8, 12) + 8 * 3_600_000, 47],
  [studioDay(2026, 8, 15) + 13 * 3_600_000, 44],
  [studioDay(2026, 8, 18) + 9 * 3_600_000, 49],
  [studioDay(2026, 8, 21) + 16 * 3_600_000, 46],
]

/** Datetime pigment load samples for basic datetime area demos. */
export const pigmentLoadDatetimeSeries = [
  { x: '2026-08-01', y: 32 },
  { x: '2026-08-04', y: 38 },
  { x: '2026-08-07', y: 35 },
  { x: '2026-08-10', y: 44 },
  { x: '2026-08-13', y: 41 },
  { x: '2026-08-16', y: 48 },
  { x: '2026-08-19', y: 52 },
  { x: '2026-08-22', y: 49 },
]

export const plateProductionTasks = [
  { name: 'Sketch layout', start: '2026-08-01', end: '2026-08-04' },
  { name: 'First wash', start: '2026-08-04', end: '2026-08-08' },
  { name: 'Glaze layer', start: '2026-08-07', end: '2026-08-11' },
  { name: 'Dry and scan', start: '2026-08-11', end: '2026-08-13' },
  { name: 'Archive', start: '2026-08-13', end: '2026-08-15' },
]

export const coloredPlateTasks = [
  { name: 'Sketch layout', start: '2026-08-01', end: '2026-08-04', color: '#3d7a8c' },
  { name: 'First wash', start: '2026-08-04', end: '2026-08-08', color: '#c49a3c' },
  { name: 'Glaze layer', start: '2026-08-07', end: '2026-08-11', color: '#9a4d6a' },
  { name: 'Dry and scan', start: '2026-08-11', end: '2026-08-13', color: '#4a7a5c' },
  { name: 'Archive', start: '2026-08-13', end: '2026-08-15', color: '#5c5a8a' },
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

export const studioSkillDimensions = [
  'Saturation',
  'Contrast',
  'Texture',
  'Flow',
  'Edge control',
  'Blend',
] as const




export const basicRadarSample = {
  name: 'Cerulean wash',
  data: [78, 65, 82, 70, 88, 74],
} as const

export const multiRadarSeries = [
  { name: 'Cerulean', data: [78, 65, 82, 70, 88, 74] },
  { name: 'Ochre', data: [62, 88, 58, 75, 52, 80] },
  { name: 'Madder', data: [85, 72, 68, 82, 76, 65] },
] as const

export const polygonRadarSeries = [
  { name: 'Morning session', data: [72, 68, 75, 80, 65, 70] },
  { name: 'Evening session', data: [58, 82, 62, 70, 78, 85] },
] as const

export const pigmentViscosityScatter = [
  { name: 'Cerulean', data: [{ x: 18, y: 38 }, { x: 22, y: 45 }, { x: 26, y: 52 }, { x: 30, y: 48 }, { x: 34, y: 58 }, { x: 28, y: 44 }] },
  { name: 'Ochre', data: [{ x: 24, y: 62 }, { x: 28, y: 68 }, { x: 32, y: 71 }, { x: 36, y: 65 }, { x: 40, y: 74 }, { x: 38, y: 69 }] },
  { name: 'Madder', data: [{ x: 20, y: 55 }, { x: 25, y: 60 }, { x: 29, y: 57 }, { x: 33, y: 63 }, { x: 37, y: 59 }] },
] as const

export const plateMoistureScatter = [
  { name: 'Plate A', data: [{ x: '2026-08-01T08:00:00', y: 92 }, { x: '2026-08-01T14:00:00', y: 78 }, { x: '2026-08-02T08:00:00', y: 54 }, { x: '2026-08-02T14:00:00', y: 38 }, { x: '2026-08-03T08:00:00', y: 22 }, { x: '2026-08-03T14:00:00', y: 12 }] },
  { name: 'Plate B', data: [{ x: '2026-08-01T08:00:00', y: 88 }, { x: '2026-08-01T14:00:00', y: 72 }, { x: '2026-08-02T08:00:00', y: 48 }, { x: '2026-08-02T14:00:00', y: 32 }, { x: '2026-08-03T08:00:00', y: 18 }, { x: '2026-08-03T14:00:00', y: 10 }] },
] as const

export const critiqueScoreJitter = [
  { name: 'Atlantic Studies', data: [{ x: 1, y: 72 }, { x: 1, y: 74 }, { x: 1, y: 71 }, { x: 2, y: 78 }, { x: 2, y: 76 }, { x: 2, y: 80 }, { x: 3, y: 68 }, { x: 3, y: 70 }, { x: 3, y: 69 }, { x: 4, y: 82 }, { x: 4, y: 84 }, { x: 4, y: 81 }] },
  { name: 'Mineral Notes', data: [{ x: 1, y: 65 }, { x: 1, y: 67 }, { x: 1, y: 66 }, { x: 2, y: 71 }, { x: 2, y: 73 }, { x: 2, y: 70 }, { x: 3, y: 74 }, { x: 3, y: 76 }, { x: 3, y: 75 }, { x: 4, y: 79 }, { x: 4, y: 77 }, { x: 4, y: 80 }] },
] as const
