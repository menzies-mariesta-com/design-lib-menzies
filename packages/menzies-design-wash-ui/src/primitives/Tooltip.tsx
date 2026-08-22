import type { HTMLAttributes, ReactNode } from 'react'

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

export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  tip: string
  side?: TooltipSide
  tone?: TooltipTone
  /** Prefer this side; smart placement may flip when clipped. */
  prefer?: TooltipSide
  children: ReactNode
}

/**
 * Accessible tooltip wrapper. Uses Wash smart placement when effects are enabled.
 * Pair `tip` with a matching `aria-label` on icon-only children.
 */
export function Tooltip({
  tip,
  side = 'top',
  tone,
  prefer,
  className,
  children,
  ...rest
}: TooltipProps) {
  const sideClass = `tooltip-${side}`
  const toneClass = tone ? `tooltip-${tone}` : ''
  return (
    <div
      className={['tooltip', sideClass, toneClass, className]
        .filter(Boolean)
        .join(' ')}
      data-tip={tip}
      data-tooltip-prefer={prefer ?? side}
      {...rest}
    >
      {children}
    </div>
  )
}
