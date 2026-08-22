/** Studio-themed sample data for chart gallery pages. */

export const washWeekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export const weeklyWashCounts = [12, 18, 14, 22, 19, 8, 11]

export const pigmentLoadTrend = [32, 38, 35, 44, 41, 48, 52]

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

export const chartNavLinks = [
  {
    page: 'charts-line' as const,
    label: 'Line and area',
    description: 'Trends, gradients, and stacked washes over time.',
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
]
