import type { HTMLAttributes, ReactNode } from 'react'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  compact?: boolean
  bordered?: boolean
}

export function Card({
  children,
  compact,
  bordered = true,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'card bg-base-100',
        bordered && 'border border-ink-border',
        compact && 'card-compact',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardBody({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['card-body', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}

export function CardTitle({
  children,
  className,
  as: Tag = 'h2',
  tone = 'primary',
  ...rest
}: HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h2' | 'h3' | 'h4'
  tone?: 'primary' | 'secondary' | 'error'
}) {
  const toneClass =
    tone === 'error'
      ? 'text-error'
      : tone === 'secondary'
        ? 'text-secondary'
        : 'text-primary'
  return (
    <Tag
      className={['card-title font-bold', toneClass, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
