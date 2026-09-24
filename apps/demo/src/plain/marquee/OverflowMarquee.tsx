import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { isTextOverflowing } from '../lib/overflowMarquee'
import { usePrefersReducedMotion } from '../hooks/useRipple'

export type OverflowMarqueeProps = {
  children: ReactNode
  className?: string
  /** Accessible label when children are decorative. */
  title?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'title'>

function durationFor(text: string, overflowPx: number): string {
  const base = Math.max(8, Math.min(28, text.length * 0.12 + overflowPx * 0.02))
  return `${base.toFixed(1)}s`
}

/**
 * Explicit wrapper for labeled UIs: truncates by default, marquees on hover/focus
 * when the text overflows. Prefer this when you control the markup; document-level
 * `attachOverflowMarquee` covers plain `.truncate` nodes automatically.
 */
export function OverflowMarquee({
  children,
  className = '',
  title,
  style,
  ...rest
}: OverflowMarqueeProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [overflowing, setOverflowing] = useState(false)
  const [active, setActive] = useState(false)
  const [labelText, setLabelText] = useState('')
  const [duration, setDuration] = useState('10s')
  const reduced = usePrefersReducedMotion()

  const measure = useCallback(() => {
    const label = labelRef.current
    if (!label) return
    const next = isTextOverflowing(label)
    setOverflowing(next)
    const text = (label.textContent ?? '').replace(/\s+/g, ' ').trim()
    setLabelText(text)
    if (next) {
      setDuration(durationFor(text, Math.max(0, label.scrollWidth - label.clientWidth)))
    }
  }, [])

  useEffect(() => {
    measure()
    const host = hostRef.current
    if (!host) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(host)
    return () => ro.disconnect()
  }, [measure, children])

  const onEnter = () => {
    const label = labelRef.current
    if (!label) return
    const next = isTextOverflowing(label)
    setOverflowing(next)
    const text = (label.textContent ?? '').replace(/\s+/g, ' ').trim()
    setLabelText(text)
    if (next) {
      setDuration(durationFor(text, Math.max(0, label.scrollWidth - label.clientWidth)))
      setActive(true)
    }
  }

  const onLeave = () => setActive(false)

  const hostClass = [
    'overflow-marquee-host',
    'overflow-marquee',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const hostStyle: CSSProperties = {
    ...style,
    ...(active && overflowing && !reduced
      ? { ['--overflow-marquee-duration' as string]: duration }
      : {}),
  }

  return (
    <div
      ref={hostRef}
      className={hostClass}
      data-overflow={overflowing ? 'true' : undefined}
      data-marquee-active={active && overflowing ? 'true' : undefined}
      data-marquee-static={active && overflowing && reduced ? 'true' : undefined}
      data-overflow-marquee=""
      title={active && overflowing && reduced ? labelText || title : title}
      style={hostStyle}
      tabIndex={overflowing ? 0 : undefined}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      {...rest}
    >
      <span ref={labelRef} className="overflow-marquee-label">
        {children}
      </span>
      {active && overflowing && !reduced && labelText ? (
        <div className="overflow-marquee-track" aria-hidden="true">
          <span className="overflow-marquee-chunk">{labelText}</span>
          <span className="overflow-marquee-chunk">{labelText}</span>
        </div>
      ) : null}
    </div>
  )
}

/** Optional ref helper for gallery demos that need the host element. */
export function useOverflowMarqueeRef() {
  return useRef<HTMLDivElement | null>(null)
}
