import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { useWashId } from '../a11y'

export type ToggleProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label?: ReactNode
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, id, className, disabled, ...rest },
  ref,
) {
  const autoId = useWashId('toggle')
  const inputId = id ?? autoId
  const control = (
    <input
      ref={ref}
      id={inputId}
      type="checkbox"
      role="switch"
      disabled={disabled}
      className={[
        'toggle cursor-pointer',
        disabled && 'cursor-not-allowed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  )
  if (!label) return control
  return (
    <label
      htmlFor={inputId}
      className={`label cursor-pointer justify-start gap-3 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      {control}
      <span className="label-text">{label}</span>
    </label>
  )
})
