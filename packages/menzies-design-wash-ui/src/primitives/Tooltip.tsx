import type { HTMLAttributes, ReactNode } from 'react'
import {
  TooltipDetailContent,
  tooltipHasRichContent,
  type TooltipDetailInput,
} from '../lib/tooltipDetail'

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right'
export type TooltipTone =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'

export type { TooltipDetailInput, TooltipDetailLine } from '../lib/tooltipDetail'

export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  /** Plain tip; use `\\n` for line breaks when `content` / `lines` are unset. */
  tip?: string
  /** Custom markup inside `.tooltip-content` (multi-line / rich). */
  content?: ReactNode
  /** Label/value rows rendered as structured detail (multi-line). */
  lines?: readonly TooltipDetailInput[]
  side?: TooltipSide
  tone?: TooltipTone
  /** Prefer this side; smart placement may flip when clipped. */
  prefer?: TooltipSide
  children: ReactNode
}

/**
 * Accessible tooltip wrapper. Uses Wash smart placement when effects are enabled.
 * Pair `tip` with a matching `aria-label` on icon-only children.
 *
 * Side classes use boolean literals so daisyUI emits CSS for each side.
 * For viewport left/right auto placement, prefer WashTooltip.
 */
export function Tooltip({
  tip,
  content,
  lines,
  side = 'top',
  tone,
  prefer,
  className,
  children,
  ...rest
}: TooltipProps) {
  const rich = tooltipHasRichContent(content, lines)
  const toneClass = tone ? `tooltip-${tone}` : ''
  return (
    <div
      className={[
        'tooltip',
        side === 'top' ? 'tooltip-top' : '',
        side === 'bottom' ? 'tooltip-bottom' : '',
        side === 'left' ? 'tooltip-left' : '',
        side === 'right' ? 'tooltip-right' : '',
        rich ? 'wash-tooltip-rich' : '',
        toneClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(rich ? {} : tip != null && tip !== '' ? { 'data-tip': tip } : {})}
      data-tooltip-prefer={prefer ?? side}
      {...rest}
    >
      {content ? (
        <div className="tooltip-content wash-tooltip-detail">{content}</div>
      ) : null}
      {!content && lines?.length ? (
        <TooltipDetailContent lines={lines} />
      ) : null}
      {children}
    </div>
  )
}
