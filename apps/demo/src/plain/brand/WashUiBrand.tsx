import type { ElementType, ReactNode } from 'react'
import { WASH_UI_VERSION } from '../version'

export type WashUiBrandProps = {
  /** Text before the brand mark, e.g. "Why " */
  prefix?: ReactNode
  /** Text after the version badge, e.g. " design system" */
  suffix?: ReactNode
  className?: string
  versionClassName?: string
  as?: ElementType
}

const defaultVersionClassName =
  'text-xs font-normal opacity-60 whitespace-nowrap align-baseline'

export function WashUiBrand({
  prefix,
  suffix,
  className,
  versionClassName = defaultVersionClassName,
  as: Tag = 'span',
}: WashUiBrandProps) {
  return (
    <Tag className={className}>
      {prefix}
      Wash UI{' '}
      <span className={versionClassName}>v{WASH_UI_VERSION}</span>
      {suffix}
    </Tag>
  )
}
