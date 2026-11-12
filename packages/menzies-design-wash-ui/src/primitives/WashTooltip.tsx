import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import {
  TooltipDetailContent,
  tooltipHasRichContent,
  type TooltipDetailInput,
} from '../lib/tooltipDetail'
import {
  resolveHorizontalTooltipSide,
  stripHorizontalTooltipClasses,
  type HorizontalTooltipSide,
} from '../lib/tooltipPlacement'
import type { TooltipTone } from './Tooltip'

export type WashTooltipPlacement = 'auto' | HorizontalTooltipSide

export type WashTooltipProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  tip?: string
  content?: ReactNode
  lines?: readonly TooltipDetailInput[]
  /**
   * `auto` (default): pick left/right from viewport free space.
   * `left` / `right`: force that side.
   */
  placement?: WashTooltipPlacement
  tone?: TooltipTone
  children: ReactNode
}

/**
 * Horizontal tooltip with viewport space check.
 * DaisyUI only emits tooltip-left / tooltip-right when those class names
 * appear as literals, so sides are toggled with boolean class joins, not
 * a dynamic `tooltip-${side}` string.
 *
 * Opts out of document-level attachSmartTooltips so horizontal placement
 * is not overwritten by the full four-side measurer.
 */
export function WashTooltip({
  tip,
  content,
  lines,
  placement = 'auto',
  tone,
  className,
  children,
  onPointerEnter,
  onFocus,
  ...rest
}: WashTooltipProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [effectiveSide, setEffectiveSide] =
    useState<HorizontalTooltipSide>('right')

  const rich = tooltipHasRichContent(content, lines)

  const resolve = useCallback(() => {
    if (placement === 'left' || placement === 'right') {
      setEffectiveSide(placement)
      return
    }
    const el = hostRef.current
    if (!el) return
    setEffectiveSide(resolveHorizontalTooltipSide(el))
  }, [placement])

  useLayoutEffect(() => {
    resolve()
  }, [resolve])

  useEffect(() => {
    resolve()
    window.addEventListener('resize', resolve)
    return () => window.removeEventListener('resize', resolve)
  }, [resolve])

  const cleaned = stripHorizontalTooltipClasses(className)
  const toneClass = tone ? `tooltip-${tone}` : ''

  return (
    <div
      ref={hostRef}
      className={[
        'tooltip inline-flex w-fit max-w-full items-center',
        effectiveSide === 'left' ? 'tooltip-left' : '',
        effectiveSide === 'right' ? 'tooltip-right' : '',
        rich ? 'wash-tooltip-rich' : '',
        toneClass,
        cleaned,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(rich ? {} : tip != null && tip !== '' ? { 'data-tip': tip } : {})}
      data-tooltip-smart="off"
      data-tooltip-placement={placement}
      data-tooltip-side={effectiveSide}
      {...rest}
      onPointerEnter={(e) => {
        resolve()
        onPointerEnter?.(e)
      }}
      onFocus={(e) => {
        resolve()
        onFocus?.(e)
      }}
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
