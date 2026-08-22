import type { HTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { useWashId } from '../a11y'

export type SelectOption = { value: string; label: string; disabled?: boolean }

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: ReactNode
  options: SelectOption[]
  hint?: ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, options, hint, id, className, disabled, ...rest },
    ref,
  ) {
    const autoId = useWashId('select')
    const selectId = id ?? autoId
    return (
      <label className="form-control w-full" htmlFor={selectId}>
        {label ? (
          <span className="label">
            <span className="label-text">{label}</span>
          </span>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={[
            'select w-full cursor-pointer border-ink-border',
            disabled && 'cursor-not-allowed',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {hint ? (
          <span className="label">
            <span className="label-text-alt">{hint}</span>
          </span>
        ) : null}
      </label>
    )
  },
)

export type TableShellProps = HTMLAttributes<HTMLDivElement> & {
  header: ReactNode
  body: ReactNode
  footer?: ReactNode
  /** Min height for the scroll body. */
  bodyClassName?: string
}

/**
 * Sticky header + scroll body + sticky footer (paginator) shell for data tables.
 */
export function TableShell({
  header,
  body,
  footer,
  className,
  bodyClassName,
  ...rest
}: TableShellProps) {
  return (
    <div
      className={[
        'flex min-h-0 flex-1 flex-col overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="shrink-0">{header}</div>
      <div
        className={[
          'min-h-0 flex-1 overflow-auto',
          bodyClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {body}
      </div>
      {footer ? <div className="shrink-0">{footer}</div> : null}
    </div>
  )
}

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: 'info' | 'success' | 'warning' | 'error'
  soft?: boolean
  children: ReactNode
}

export function Alert({
  tone = 'info',
  soft,
  className,
  children,
  ...rest
}: AlertProps) {
  return (
    <div
      role="alert"
      className={[
        'alert',
        soft && 'alert-soft',
        `alert-${tone}`,
        'border border-ink-border',
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
