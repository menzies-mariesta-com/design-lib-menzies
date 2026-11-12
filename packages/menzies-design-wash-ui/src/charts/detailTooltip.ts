import type { TooltipDetailInput } from '../lib/tooltipDetail'

export type WashChartTooltipLine = TooltipDetailInput

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function lineMarkup(line: TooltipDetailInput): string {
  if (typeof line === 'string') {
    return `<div class="wash-chart-tooltip-line">${escapeHtml(line)}</div>`
  }
  const label = line.label
    ? `<span class="wash-chart-tooltip-label">${escapeHtml(line.label)}</span>`
    : ''
  const value = `<span class="wash-chart-tooltip-value">${escapeHtml(line.value)}</span>`
  return `<div class="wash-chart-tooltip-row">${label}${value}</div>`
}

/**
 * ApexCharts `tooltip.custom` HTML with a title and multiple detail lines.
 */
export function formatWashChartDetailTooltip(options: {
  title?: string
  lines: readonly TooltipDetailInput[]
}): string {
  const { title, lines } = options
  if (!lines.length && !title) return ''

  const titleBlock = title
    ? `<div class="apexcharts-tooltip-title">${escapeHtml(title)}</div>`
    : ''

  const body = lines.map(lineMarkup).join('')

  return `${titleBlock}<div class="apexcharts-tooltip-series-group apexcharts-active"><div class="apexcharts-tooltip-text wash-chart-tooltip-detail">${body}</div></div>`
}
