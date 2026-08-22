import type { ApexOptions } from 'apexcharts'
import { WashChart } from './WashChart'
import { buildGanttTitleOptions, mergeApexOptions, readWashChartColors } from './theme'
import type { GanttChartProps } from './types'

function toTimestamp(value: string | number): number {
  if (typeof value === 'number') return value
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

function buildGanttSeries(
  props: Pick<GanttChartProps, 'tasks' | 'series'>,
): ApexOptions['series'] {
  if (props.series?.length) {
    return props.series.map((group) => ({
      name: group.name,
      data: group.tasks.map((task) => ({
        x: task.name,
        y: [toTimestamp(task.start), toTimestamp(task.end)] as [number, number],
        fillColor: task.color,
      })),
    }))
  }

  const tasks = props.tasks ?? []
  return [
    {
      data: tasks.map((task) => ({
        x: task.name,
        y: [toTimestamp(task.start), toTimestamp(task.end)] as [number, number],
        fillColor: task.color,
      })),
    },
  ]
}

export function GanttChart({
  tasks,
  series,
  title,
  subtitle,
  height = 360,
  width,
  className,
  colors,
  showLegend,
  showToolbar,
  options,
}: GanttChartProps) {
  const palette = readWashChartColors(colors)
  const chartSeries = buildGanttSeries({ tasks, series })
  const taskCount =
    series?.reduce((sum, group) => sum + group.tasks.length, 0) ?? tasks?.length ?? 0
  const resolvedHeight =
    typeof height === 'number' && taskCount > 6
      ? Math.max(height, taskCount * 36 + 80)
      : height

  const chartOptions: ApexOptions = mergeApexOptions(
    buildGanttTitleOptions({ title, subtitle, showLegend, colors: palette }),
    {
      chart: {
        type: 'rangeBar',
        toolbar: { show: showToolbar ?? false },
      },
      colors: palette,
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 6,
          barHeight: '62%',
          rangeBarGroupRows: Boolean(series?.length && series.length > 1),
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'MMM d',
          },
        },
      },
      yaxis: {
        labels: {
          maxWidth: 160,
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        x: {
          format: 'MMM d, yyyy',
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    options,
  )

  return (
    <WashChart
      type="rangeBar"
      series={chartSeries}
      options={chartOptions}
      height={resolvedHeight}
      width={width}
      className={className}
    />
  )
}
