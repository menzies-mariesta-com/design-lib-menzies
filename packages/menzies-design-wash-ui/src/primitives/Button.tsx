import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'link'
  | 'outline'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  wide?: boolean
  block?: boolean
  square?: boolean
  circle?: boolean
  soft?: boolean
  dash?: boolean
  loading?: boolean
  ripple?: boolean
  children?: ReactNode
}

const variantClass: Record<ButtonVariant, string> = {
  default: '',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  neutral: 'btn-neutral',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  ghost: 'btn-ghost',
  link: 'btn-link',
  outline: 'btn-outline',
}

const sizeClass: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'default',
      size = 'md',
      wide,
      block,
      square,
      circle,
      soft,
      dash,
      loading,
      ripple = true,
      disabled,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading
    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cx(
          'btn cursor-pointer',
          ripple && 'ripple',
          variantClass[variant],
          sizeClass[size],
          soft && 'btn-soft',
          dash && 'btn-dash',
          wide && 'btn-wide',
          block && 'btn-block',
          square && 'btn-square',
          circle && 'btn-circle',
          isDisabled && 'btn-disabled cursor-not-allowed',
          className,
        )}
        {...rest}
      >
        {loading ? (
          <span className="loading loading-spinner" aria-hidden />
        ) : null}
        {children}
      </button>
    )
  },
)
