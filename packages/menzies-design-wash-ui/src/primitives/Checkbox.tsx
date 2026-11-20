import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { Checkbox as UiCheckbox, CheckboxIndicator } from '@ui-sdk/react/checkbox'
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
      <UiCheckbox
        ref={ref as never}
        id={inputId}
        disabled={disabled}
        className={[
          'checkbox cursor-pointer',
          disabled && 'cursor-not-allowed',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...(rest as Record<string, unknown>)}
      >
        <CheckboxIndicator />
      </UiCheckbox>
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
