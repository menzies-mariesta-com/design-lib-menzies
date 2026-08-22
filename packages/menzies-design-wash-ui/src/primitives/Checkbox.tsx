import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { useWashId } from '../a11y'

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label?: ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, id, className, disabled, ...rest }, ref) {
    const autoId = useWashId('checkbox')
    const inputId = id ?? autoId
    const control = (
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className={[
          'checkbox cursor-pointer',
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
  },
)
