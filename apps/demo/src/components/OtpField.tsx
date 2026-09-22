import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
} from 'react'

export type OtpLength = 4 | 6 | 8

export type OtpFieldProps = {
  id?: string
  /** Fixed number of digit boxes. Never grows past this. */
  digits: OtpLength
  className?: string
  value?: string
  onChange?: (value: string) => void
  ariaLabel?: string
  required?: boolean
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange' | 'maxLength' | 'pattern' | 'inputMode' | 'size'
>

function sanitizeDigits(raw: string, digits: number): string {
  return raw.replace(/\D/g, '').slice(0, digits)
}

/**
 * daisyUI `otp` pin field with a fixed span count.
 *
 * Non-digits are stripped so alphabetic input cannot leave the field
 * `:invalid` at full length (daisyUI keeps the `:after` caret visible when
 * invalid, which looks like an extra box after the last cell).
 */
export function OtpField({
  id,
  digits,
  className = '',
  value,
  onChange,
  ariaLabel,
  required = true,
  autoComplete = 'one-time-code',
  ...rest
}: OtpFieldProps) {
  const controlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState('')
  const current = controlled ? value : uncontrolled

  function commit(raw: string) {
    const next = sanitizeDigits(raw, digits)
    if (!controlled) setUncontrolled(next)
    onChange?.(next)
    return next
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = commit(e.target.value)
    // Keep the DOM value in sync when React has not yet re-rendered (paste).
    if (e.target.value !== next) e.target.value = next
  }

  function handleBeforeInput(e: FormEvent<HTMLInputElement>) {
    const data = (e.nativeEvent as InputEvent).data
    if (data && /\D/.test(data)) e.preventDefault()
  }

  return (
    <label className={`otp cursor-text ${className}`.trim()} htmlFor={id}>
      {Array.from({ length: digits }, (_, i) => (
        <span key={i} />
      ))}
      <input
        {...rest}
        id={id}
        type="text"
        autoComplete={autoComplete}
        inputMode="numeric"
        maxLength={digits}
        pattern={`[0-9]{${digits}}`}
        required={required}
        className="cursor-text"
        aria-label={ariaLabel}
        value={current}
        onBeforeInput={handleBeforeInput}
        onChange={handleChange}
      />
    </label>
  )
}
