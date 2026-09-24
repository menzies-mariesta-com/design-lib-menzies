import { useWashId } from '../a11y'
import type { ReactNode } from 'react'

export type AccordionItemProps = {
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  name?: string
}

export function AccordionItem({
  title,
  children,
  defaultOpen,
  name = 'wash-accordion',
}: AccordionItemProps) {
  const id = useWashId('acc')
  return (
    <div className="collapse collapse-arrow border border-ink-border bg-base-100">
      <input
        type="radio"
        name={name}
        id={id}
        defaultChecked={defaultOpen}
        aria-controls={`${id}-panel`}
      />
      <label htmlFor={id} className="collapse-title cursor-pointer font-medium">
        {title}
      </label>
      <div id={`${id}-panel`} className="collapse-content text-sm text-ink-muted">
        {children}
      </div>
    </div>
  )
}

export type AccordionProps = {
  children: ReactNode
  className?: string
  name?: string
}

export function Accordion({ children, className, name }: AccordionProps) {
  return (
    <div
      className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}
      data-wash-accordion={name}
    >
      {children}
    </div>
  )
}
