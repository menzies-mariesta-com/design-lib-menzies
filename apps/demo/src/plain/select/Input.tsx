import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { useWashId } from '../a11y'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  requiredMark?: boolean
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
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
  const autoId = useWashId('input')
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
      <input
        ref={ref}
        id={inputId}
        required={required}
        disabled={disabled}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={hintId}
        className={cx(
          'input w-full cursor-text border-ink-border',
          hasError && 'input-error',
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
})
