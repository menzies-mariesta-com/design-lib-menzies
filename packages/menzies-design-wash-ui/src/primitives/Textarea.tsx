import {
  forwardRef,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react'
import { useWashId } from '../a11y'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  requiredMark?: boolean
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      hint,
      error,
      requiredMark,
      id,
      className,
      required,
      disabled,
      ...rest
    },
    ref,
  ) {
    const autoId = useWashId('textarea')
    const inputId = id ?? autoId
    const hintId = hint || error ? `${inputId}-hint` : undefined
    const hasError = Boolean(error)

    return (
      <label className="form-control w-full" htmlFor={inputId}>
        {label ? (
          <span className="label">
            <span className="label-text">
              {label}
              {required || requiredMark ? (
                <span
                  className="text-error align-top text-sm leading-none"
                  aria-hidden="true"
                >
                  *
                </span>
              ) : null}
            </span>
          </span>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={hintId}
          className={cx(
            'textarea w-full cursor-text border-ink-border',
            hasError && 'textarea-error',
            disabled && 'cursor-not-allowed',
            className,
          )}
          {...rest}
        />
        {error || hint ? (
          <span className="label" id={hintId}>
            <span className={cx('label-text-alt', hasError && 'text-error')}>
              {error ?? hint}
            </span>
          </span>
        ) : null}
      </label>
    )
  },
)
