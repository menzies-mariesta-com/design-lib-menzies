import type { HTMLAttributes, ReactNode } from 'react'

export type LoadingProps = HTMLAttributes<HTMLDivElement> & {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  /** Visual style of the spinner. */
  variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'
}

const sizeClass = {
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
} as const

const variantClass = {
  spinner: 'loading-spinner',
  dots: 'loading-dots',
  ring: 'loading-ring',
  ball: 'loading-ball',
  bars: 'loading-bars',
  infinity: 'loading-infinity',
} as const

/** Accessible busy indicator. Prefer studio loaders for brand moments. */
export function Loading({
  label = 'Loading',
  size = 'md',
  variant = 'spinner',
  className,
  ...rest
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={className}
      {...rest}
    >
      <span
        className={`loading ${variantClass[variant]} ${sizeClass[size]}`}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export type WashPanelProps = HTMLAttributes<HTMLElement> & {
  as?: 'article' | 'section' | 'div'
  ochre?: boolean
  rose?: boolean
  grain?: boolean
  children: ReactNode
}

export function WashPanel({
  as: Tag = 'article',
  ochre,
  rose,
  grain = true,
  className,
  children,
  ...rest
}: WashPanelProps) {
  return (
    <Tag
      className={[
        'wash-panel',
        grain && 'paper-grain',
        ochre && 'wash-panel-ochre',
        rose && 'wash-panel-rose',
        'soak-in',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
