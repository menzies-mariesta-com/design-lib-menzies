import {
  useEffect,
  useId,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { CircleCheck, CircleX } from 'menzies-design-wash-ui/icons'

function Section({
  eyebrow,
  title,
  description,
  children,
  panel = '',
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  panel?: string
}) {
  return (
    <article className={`wash-panel paper-grain soak-in ${panel}`}>
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function RequiredMark() {
  return (
    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
      *
    </span>
  )
}

function OtpField({
  id,
  digits,
  className = '',
  value,
  onChange,
  ariaLabel,
}: {
  id?: string
  digits: 4 | 6
  className?: string
  value?: string
  onChange?: (value: string) => void
  ariaLabel?: string
}) {
  const spans = Array.from({ length: digits }, (_, i) => <span key={i} />)
  const controlled = value !== undefined

  return (
    <label className={`otp ${className}`.trim()} htmlFor={id}>
      {spans}
      <input
        id={id}
        type="text"
        autoComplete="one-time-code"
        inputMode="numeric"
        maxLength={digits}
        pattern={`[0-9]{${digits}}`}
        required
        className="cursor-text"
        aria-label={ariaLabel}
        {...(controlled
          ? {
              value,
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const next = e.target.value.replace(/\D/g, '').slice(0, digits)
                onChange?.(next)
              },
            }
          : {})}
      />
    </label>
  )
}

const sizes = [
  { name: 'XS', className: 'otp-xs' },
  { name: 'SM', className: 'otp-sm' },
  { name: 'MD', className: 'otp-md' },
  { name: 'LG', className: 'otp-lg' },
  { name: 'XL', className: 'otp-xl' },
] as const

const colors = [
  { name: 'Neutral', className: 'otp-neutral' },
  { name: 'Primary', className: 'otp-primary' },
  { name: 'Secondary', className: 'otp-secondary' },
  { name: 'Accent', className: 'otp-accent' },
  { name: 'Info', className: 'otp-info' },
  { name: 'Success', className: 'otp-success' },
  { name: 'Warning', className: 'otp-warning' },
  { name: 'Error', className: 'otp-error' },
] as const

const STUDIO_CODE = '4821'

export default function OtpPage() {
  const verifyId = useId()
  const studioId = useId()
  const [verifyCode, setVerifyCode] = useState('')
  const [studioCode, setStudioCode] = useState('')
  const [toast, setToast] = useState<{
    message: string
    tone: 'success' | 'error'
  } | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3500)
    return () => window.clearTimeout(t)
  }, [toast])

  function handleVerify(e: FormEvent) {
    e.preventDefault()
    if (verifyCode.length === 4) {
      setToast({ tone: 'success', message: 'Code verified' })
    } else {
      setToast({ tone: 'error', message: 'Enter all four digits' })
    }
  }

  function handleStudioUnlock(e: FormEvent) {
    e.preventDefault()
    if (studioCode === STUDIO_CODE) {
      setToast({ tone: 'success', message: 'Studio unlocked' })
    } else {
      setToast({ tone: 'error', message: 'Incorrect unlock code' })
    }
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          OTP
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">otp</span> pin fields for
          verification codes, sizes, colors, and studio unlock flows.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Digit boxes"
          description="Four or six empty spans plus a single numeric input. Span count must match maxlength."
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:gap-8">
            <div className="flex flex-col gap-2">
              <span className="label-ink text-xs">4 digits</span>
              <OtpField digits={4} ariaLabel="Four digit code" />
              <ClassLabel value="otp (4 spans)" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="label-ink text-xs">6 digits</span>
              <OtpField digits={6} ariaLabel="Six digit code" />
              <ClassLabel value="otp (6 spans)" />
            </div>
          </div>
        </Section>

        <Section
          eyebrow="02 · Joined"
          title="Connected boxes"
          description="otp-joined merges the character cells into one continuous field."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-col gap-2">
            <OtpField
              digits={4}
              className="otp-joined"
              ariaLabel="Joined four digit code"
            />
            <ClassLabel value="otp otp-joined" />
          </div>
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Scale ladder"
          description="otp-xs through otp-xl for compact and generous layouts."
        >
          <div className="flex flex-col gap-5">
            {sizes.map((s) => (
              <div
                key={s.name}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="w-8 shrink-0 text-xs font-medium text-ink-muted">
                  {s.name}
                </span>
                <div className="min-w-0 overflow-x-auto pb-1">
                  <OtpField
                    digits={4}
                    className={s.className}
                    ariaLabel={`${s.name} OTP`}
                  />
                </div>
                <ClassLabel value={`otp ${s.className}`} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic accents"
          description="Neutral through error border tones, including success and error states."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((c) => (
              <div key={c.name} className="flex min-w-0 flex-col gap-2">
                <span className="text-xs font-medium text-ink-muted">{c.name}</span>
                <div className="overflow-x-auto pb-1">
                  <OtpField
                    digits={4}
                    className={c.className}
                    ariaLabel={`${c.name} OTP`}
                  />
                </div>
                <ClassLabel value={`otp ${c.className}`} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Form"
          title="Verify with button"
          description="Required label, OTP field, and a verify action. Feedback uses bottom-right toasts."
          panel="wash-panel-rose"
        >
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleVerify}
            noValidate
          >
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor={verifyId}>
                Verification code
                <RequiredMark />
              </label>
              <OtpField
                id={verifyId}
                digits={4}
                value={verifyCode}
                onChange={setVerifyCode}
                ariaLabel="Verification code"
              />
              <p className="text-xs text-ink-muted">Enter the 4-digit code from your device.</p>
            </div>
            <button type="submit" className="btn btn-primary w-fit cursor-pointer">
              Verify
            </button>
            <ClassLabel value="otp + btn btn-primary" />
          </form>
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Studio unlock code"
          description="Themed unlock demo. Demo code is 4821. Success and error toasts follow form-crud-ui."
        >
          <form
            className="mx-auto flex w-full max-w-sm flex-col items-center gap-5 text-center"
            onSubmit={handleStudioUnlock}
            noValidate
          >
            <div className="flex w-full flex-col items-center gap-2">
              <label className="label justify-center" htmlFor={studioId}>
                Unlock code
                <RequiredMark />
              </label>
              <div className="overflow-x-auto pb-1">
                <OtpField
                  id={studioId}
                  digits={4}
                  className="otp-lg otp-primary"
                  value={studioCode}
                  onChange={setStudioCode}
                  ariaLabel="Studio unlock code"
                />
              </div>
              <p className="text-xs text-ink-muted">
                Open the pigment desk with your studio pin.
              </p>
            </div>
            <button type="submit" className="btn btn-secondary cursor-pointer">
              Unlock studio
            </button>
            <ClassLabel value="otp otp-lg otp-primary" />
          </form>
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Narrow viewports"
          description="OTP rows scroll horizontally when boxes outgrow the panel, so mobile stays usable."
          panel="wash-panel-blue"
        >
          <div className="mx-auto w-full max-w-[220px] sm:max-w-xs">
            <div className="overflow-x-auto pb-2">
              <OtpField
                digits={6}
                className="otp-lg otp-joined"
                ariaLabel="Responsive six digit code"
              />
            </div>
            <ClassLabel value="otp otp-lg otp-joined + overflow-x-auto" />
          </div>
        </Section>
      </div>

      {toast ? (
        <div className="toast toast-bottom toast-end z-[100]">
          <div
            role="alert"
            className={`alert shadow-lg ${toast.tone === 'success' ? 'alert-success' : 'alert-error'}`}
          >
            {toast.tone === 'success' ? (
              <CircleCheck className="h-5 w-5 shrink-0" strokeWidth={2} />
            ) : (
              <CircleX className="h-5 w-5 shrink-0" strokeWidth={2} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      ) : null}
    </>
  )
}
