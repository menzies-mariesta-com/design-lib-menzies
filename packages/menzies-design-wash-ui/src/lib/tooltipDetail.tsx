import type { ReactNode } from 'react'

export type TooltipDetailLine = {
  label?: string
  value: string
}

export type TooltipDetailInput = string | TooltipDetailLine

function rowKey(line: TooltipDetailInput, index: number): string {
  if (typeof line === 'string') return `s-${index}-${line.slice(0, 24)}`
  return `r-${index}-${line.label ?? ''}-${line.value.slice(0, 24)}`
}

/** Structured rows inside daisyUI `.tooltip-content`. */
export function TooltipDetailContent({
  lines,
  className = '',
}: {
  lines: readonly TooltipDetailInput[]
  className?: string
}) {
  return (
    <div
      className={['tooltip-content wash-tooltip-detail', className]
        .filter(Boolean)
        .join(' ')}
    >
      {lines.map((line, index) => {
        if (typeof line === 'string') {
          return (
            <div key={rowKey(line, index)} className="wash-tooltip-detail__line">
              {line}
            </div>
          )
        }
        return (
          <div
            key={rowKey(line, index)}
            className="wash-tooltip-detail__row"
          >
            {line.label ? (
              <span className="wash-tooltip-detail__label">{line.label}</span>
            ) : null}
            <span className="wash-tooltip-detail__value">{line.value}</span>
          </div>
        )
      })}
    </div>
  )
}

export function tooltipHasRichContent(
  content: ReactNode | undefined,
  lines: readonly TooltipDetailInput[] | undefined,
): boolean {
  if (content != null && content !== false) return true
  return Boolean(lines && lines.length > 0)
}
