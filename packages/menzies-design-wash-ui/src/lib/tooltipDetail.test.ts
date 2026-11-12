import { describe, expect, it } from 'vitest'
import { formatWashChartDetailTooltip } from '../charts/detailTooltip'

describe('formatWashChartDetailTooltip', () => {
  it('renders title and multiple lines', () => {
    const html = formatWashChartDetailTooltip({
      title: 'Plate WS-214',
      lines: [
        { label: 'Washes', value: '7' },
        'Atlantic Studies',
      ],
    })
    expect(html).toContain('Plate WS-214')
    expect(html).toContain('wash-chart-tooltip-detail')
    expect(html).toContain('wash-chart-tooltip-row')
    expect(html).toContain('wash-chart-tooltip-line')
    expect(html).toContain('Atlantic Studies')
  })

  it('escapes HTML in values', () => {
    const html = formatWashChartDetailTooltip({
      lines: [{ label: 'Note', value: '<script>' }],
    })
    expect(html).toContain('&lt;script&gt;')
    expect(html).not.toContain('<script>')
  })
})
