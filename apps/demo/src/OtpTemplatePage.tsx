import type { ReactNode } from 'react'
import { Mail, MonitorSmartphone, Timer } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'

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

function Sample({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function RequiredMark() {
  return (
    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
      *
    </span>
  )
}

function ResendRow({ seconds = 42 }: { seconds?: number }) {
  return (
    <p className="text-center text-sm text-ink-muted">
      Did not get a code?{' '}
      {seconds > 0 ? (
        <span className="inline-flex items-center gap-1">
          <Timer className="size-3.5" strokeWidth={2} aria-hidden="true" />
          Resend in {seconds}s
        </span>
      ) : (
        <button type="button" className="link link-primary cursor-pointer">
          Resend code
        </button>
      )}
    </p>
  )
}

export default function OtpTemplatePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          OTP verification
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Full one-time code flows for email and SMS sign-in, not the OTP input
          component gallery. Includes resend timers and alternate delivery methods.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Email"
          title="Verify email code"
          description="Six-digit code sent to inbox. Shows masked destination and resend cooldown."
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="card + otp + resend timer">
                            <div className="flex min-h-80 items-center justify-center rounded-box bg-base-200/60 p-6">
                              <form className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                                <div className="card-body gap-4">
                                  <div className="flex items-start gap-3">
                                    <div className="rounded-box bg-primary/10 p-2">
                                      <Mail
                                        className="size-5 text-primary"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div>
                                      <h2 className="card-title text-primary font-bold">
                                        Enter verification code
                                      </h2>
                                      <p className="text-sm text-ink-muted">
                                        We sent a 6-digit code to{' '}
                                        <span className="font-medium text-base-content">
                                          y***@studio.com
                                        </span>
                                        . It expires in 10 minutes.
                                      </p>
                                    </div>
                                  </div>
                
                                  <fieldset className="fieldset">
                                    <label className="label" htmlFor="otp-email-code">
                                      <span className="label-text">
                                        One-time code
                                        <RequiredMark />
                                      </span>
                                    </label>
                                    <label className="otp w-full cursor-text" htmlFor="otp-email-code">
                                      {Array.from({ length: 6 }, (_, i) => (
                                        <span key={i} />
                                      ))}
                                      <input
                                        id="otp-email-code"
                                        type="text"
                                        autoComplete="one-time-code"
                                        inputMode="numeric"
                                        maxLength={6}
                                        pattern="[0-9]{6}"
                                        required
                                        aria-label="6-digit email verification code"
                                      />
                                    </label>
                                  </fieldset>
                
                                  <div className="card-actions mt-1 flex-col gap-2">
                                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                                      Verify and continue
                                    </button>
                                    <ResendRow seconds={42} />
                                    <button type="button" className="link link-secondary cursor-pointer text-sm">
                                      Use a different email
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="flex min-h-80 items-center justify-center rounded-box bg-base-200/60 p-6">
              <form class="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                <div class="card-body gap-4">
                  <div class="flex items-start gap-3">
                    <div class="rounded-box bg-primary/10 p-2">
                      <Mail
                        class="size-5 text-primary"
                        strokeWidth=
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h2 class="card-title text-primary font-bold">
                        Enter verification code
                      </h2>
                      <p class="text-sm text-ink-muted">
                        We sent a 6-digit code to
                        <span class="font-medium text-base-content">
                          y***@studio.com
                        </span>
                        . It expires in 10 minutes.
                      </p>
                    </div>
                  </div>

                  <fieldset class="fieldset">
                    <label class="label" for="otp-email-code">
                      <span class="label-text">
                        One-time code
                        <RequiredMark />
                      </span>
                    </label>
                    <label class="otp w-full cursor-text" for="otp-email-code">
                      , (_, i) => (
                        <span key= />
                      ))}
                      <input
                        id="otp-email-code"
                        type="text"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        maxLength=
                        pattern="[0-9]"
                        required
                        aria-label="6-digit email verification code"
                      />
                    </label>
                  </fieldset>

                  <div class="card-actions mt-1 flex-col gap-2">
                    <button type="submit" class="btn btn-primary w-full cursor-pointer">
                      Verify and continue
                    </button>
                    <ResendRow seconds= />
                    <button type="button" class="link link-secondary cursor-pointer text-sm">
                      Use a different email
                    </button>
                  </div>
                </div>
              </form>
            </div>`}
            jsx={`<div className="flex min-h-80 items-center justify-center rounded-box bg-base-200/60 p-6">
              <form className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-box bg-primary/10 p-2">
                      <Mail
                        className="size-5 text-primary"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h2 className="card-title text-primary font-bold">
                        Enter verification code
                      </h2>
                      <p className="text-sm text-ink-muted">
                        We sent a 6-digit code to{' '}
                        <span className="font-medium text-base-content">
                          y***@studio.com
                        </span>
                        . It expires in 10 minutes.
                      </p>
                    </div>
                  </div>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="otp-email-code">
                      <span className="label-text">
                        One-time code
                        <RequiredMark />
                      </span>
                    </label>
                    <label className="otp w-full cursor-text" htmlFor="otp-email-code">
                      {Array.from({ length: 6 }, (_, i) => (
                        <span key={i} />
                      ))}
                      <input
                        id="otp-email-code"
                        type="text"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        required
                        aria-label="6-digit email verification code"
                      />
                    </label>
                  </fieldset>

                  <div className="card-actions mt-1 flex-col gap-2">
                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                      Verify and continue
                    </button>
                    <ResendRow seconds={42} />
                    <button type="button" className="link link-secondary cursor-pointer text-sm">
                      Use a different email
                    </button>
                  </div>
                </div>
              </form>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · SMS"
          title="Phone verification"
          description="Four-digit SMS code with alternate email delivery and change-number link."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="card + 4-digit otp + sms">
                            <div className="flex min-h-80 items-center justify-center rounded-box bg-base-200/40 p-6">
                              <form className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                                <div className="card-body gap-4">
                                  <div className="flex items-start gap-3">
                                    <div className="rounded-box bg-secondary/10 p-2">
                                      <MonitorSmartphone
                                        className="size-5 text-secondary"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div>
                                      <h2 className="card-title text-secondary font-bold">
                                        Verify your phone
                                      </h2>
                                      <p className="text-sm text-ink-muted">
                                        Enter the 4-digit code sent to{' '}
                                        <span className="font-medium text-base-content">
                                          +1 (•••) •••-4829
                                        </span>
                                        .
                                      </p>
                                    </div>
                                  </div>
                
                                  <fieldset className="fieldset">
                                    <label className="label" htmlFor="otp-sms-code">
                                      <span className="label-text">
                                        SMS code
                                        <RequiredMark />
                                      </span>
                                    </label>
                                    <label className="otp w-full cursor-text" htmlFor="otp-sms-code">
                                      {Array.from({ length: 4 }, (_, i) => (
                                        <span key={i} />
                                      ))}
                                      <input
                                        id="otp-sms-code"
                                        type="text"
                                        autoComplete="one-time-code"
                                        inputMode="numeric"
                                        maxLength={4}
                                        pattern="[0-9]{4}"
                                        required
                                        aria-label="4-digit SMS verification code"
                                      />
                                    </label>
                                  </fieldset>
                
                                  <div className="card-actions flex-col gap-2">
                                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                                      Verify phone
                                    </button>
                                    <ResendRow seconds={0} />
                                    <div className="divider my-0 text-xs">or</div>
                                    <button type="button" className="btn btn-outline w-full cursor-pointer">
                                      Send code via email instead
                                    </button>
                                    <button type="button" className="link link-secondary cursor-pointer text-sm">
                                      Change phone number
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="flex min-h-80 items-center justify-center rounded-box bg-base-200/40 p-6">
              <form class="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                <div class="card-body gap-4">
                  <div class="flex items-start gap-3">
                    <div class="rounded-box bg-secondary/10 p-2">
                      <MonitorSmartphone
                        class="size-5 text-secondary"
                        strokeWidth=
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h2 class="card-title text-secondary font-bold">
                        Verify your phone
                      </h2>
                      <p class="text-sm text-ink-muted">
                        Enter the 4-digit code sent to
                        <span class="font-medium text-base-content">
                          +1 (•••) •••-4829
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  <fieldset class="fieldset">
                    <label class="label" for="otp-sms-code">
                      <span class="label-text">
                        SMS code
                        <RequiredMark />
                      </span>
                    </label>
                    <label class="otp w-full cursor-text" for="otp-sms-code">
                      , (_, i) => (
                        <span key= />
                      ))}
                      <input
                        id="otp-sms-code"
                        type="text"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        maxLength=
                        pattern="[0-9]"
                        required
                        aria-label="4-digit SMS verification code"
                      />
                    </label>
                  </fieldset>

                  <div class="card-actions flex-col gap-2">
                    <button type="submit" class="btn btn-primary w-full cursor-pointer">
                      Verify phone
                    </button>
                    <ResendRow seconds= />
                    <div class="divider my-0 text-xs">or</div>
                    <button type="button" class="btn btn-outline w-full cursor-pointer">
                      Send code via email instead
                    </button>
                    <button type="button" class="link link-secondary cursor-pointer text-sm">
                      Change phone number
                    </button>
                  </div>
                </div>
              </form>
            </div>`}
            jsx={`<div className="flex min-h-80 items-center justify-center rounded-box bg-base-200/40 p-6">
              <form className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-box bg-secondary/10 p-2">
                      <MonitorSmartphone
                        className="size-5 text-secondary"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h2 className="card-title text-secondary font-bold">
                        Verify your phone
                      </h2>
                      <p className="text-sm text-ink-muted">
                        Enter the 4-digit code sent to{' '}
                        <span className="font-medium text-base-content">
                          +1 (•••) •••-4829
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="otp-sms-code">
                      <span className="label-text">
                        SMS code
                        <RequiredMark />
                      </span>
                    </label>
                    <label className="otp w-full cursor-text" htmlFor="otp-sms-code">
                      {Array.from({ length: 4 }, (_, i) => (
                        <span key={i} />
                      ))}
                      <input
                        id="otp-sms-code"
                        type="text"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        maxLength={4}
                        pattern="[0-9]{4}"
                        required
                        aria-label="4-digit SMS verification code"
                      />
                    </label>
                  </fieldset>

                  <div className="card-actions flex-col gap-2">
                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                      Verify phone
                    </button>
                    <ResendRow seconds={0} />
                    <div className="divider my-0 text-xs">or</div>
                    <button type="button" className="btn btn-outline w-full cursor-pointer">
                      Send code via email instead
                    </button>
                    <button type="button" className="link link-secondary cursor-pointer text-sm">
                      Change phone number
                    </button>
                  </div>
                </div>
              </form>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Sign-in"
          title="Passwordless OTP login"
          description="Email-first magic code login. Single field to request, then verify in one card."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="stacked request + verify">
                            <div className="flex min-h-[28rem] items-center justify-center rounded-box bg-base-200/60 p-6">
                              <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
                                <div className="card-body gap-6">
                                  <div>
                                    <h2 className="card-title text-primary font-bold">Sign in with code</h2>
                                    <p className="text-sm text-ink-muted">
                                      No password needed. We email a one-time code to your studio
                                      address.
                                    </p>
                                  </div>
                
                                  <form className="space-y-4">
                                    <fieldset className="fieldset">
                                      <label className="label" htmlFor="otp-login-email">
                                        <span className="label-text">
                                          Email
                                          <RequiredMark />
                                        </span>
                                      </label>
                                      <label className="input validator w-full cursor-text">
                                        <Mail
                                          className="size-4 opacity-50"
                                          strokeWidth={2}
                                          aria-hidden="true"
                                        />
                                        <input
                                          id="otp-login-email"
                                          type="email"
                                          name="email"
                                          placeholder="you@studio.com"
                                          defaultValue="you@studio.com"
                                          required
                                        />
                                      </label>
                                    </fieldset>
                                    <button type="button" className="btn btn-outline w-full cursor-pointer">
                                      Send login code
                                    </button>
                                  </form>
                
                                  <div className="divider text-xs">then enter code</div>
                
                                  <form className="space-y-4">
                                    <fieldset className="fieldset">
                                      <label className="label" htmlFor="otp-login-code">
                                        <span className="label-text">
                                          Login code
                                          <RequiredMark />
                                        </span>
                                      </label>
                                      <label className="otp w-full cursor-text" htmlFor="otp-login-code">
                                        {Array.from({ length: 6 }, (_, i) => (
                                          <span key={i} />
                                        ))}
                                        <input
                                          id="otp-login-code"
                                          type="text"
                                          autoComplete="one-time-code"
                                          inputMode="numeric"
                                          maxLength={6}
                                          pattern="[0-9]{6}"
                                          required
                                          aria-label="6-digit login code"
                                        />
                                      </label>
                                    </fieldset>
                                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                                      Sign in
                                    </button>
                                    <ResendRow seconds={28} />
                                  </form>
                                </div>
                              </div>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="flex min-h-[28rem] items-center justify-center rounded-box bg-base-200/60 p-6">
              <div class="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
                <div class="card-body gap-6">
                  <div>
                    <h2 class="card-title text-primary font-bold">Sign in with code</h2>
                    <p class="text-sm text-ink-muted">
                      No password needed. We email a one-time code to your studio
                      address.
                    </p>
                  </div>

                  <form class="space-y-4">
                    <fieldset class="fieldset">
                      <label class="label" for="otp-login-email">
                        <span class="label-text">
                          Email
                          <RequiredMark />
                        </span>
                      </label>
                      <label class="input validator w-full cursor-text">
                        <Mail
                          class="size-4 opacity-50"
                          strokeWidth=
                          aria-hidden="true"
                        />
                        <input
                          id="otp-login-email"
                          type="email"
                          name="email"
                          placeholder="you@studio.com"
                          value="you@studio.com"
                          required
                        />
                      </label>
                    </fieldset>
                    <button type="button" class="btn btn-outline w-full cursor-pointer">
                      Send login code
                    </button>
                  </form>

                  <div class="divider text-xs">then enter code</div>

                  <form class="space-y-4">
                    <fieldset class="fieldset">
                      <label class="label" for="otp-login-code">
                        <span class="label-text">
                          Login code
                          <RequiredMark />
                        </span>
                      </label>
                      <label class="otp w-full cursor-text" for="otp-login-code">
                        , (_, i) => (
                          <span key= />
                        ))}
                        <input
                          id="otp-login-code"
                          type="text"
                          autoComplete="one-time-code"
                          inputMode="numeric"
                          maxLength=
                          pattern="[0-9]"
                          required
                          aria-label="6-digit login code"
                        />
                      </label>
                    </fieldset>
                    <button type="submit" class="btn btn-primary w-full cursor-pointer">
                      Sign in
                    </button>
                    <ResendRow seconds= />
                  </form>
                </div>
              </div>
            </div>`}
            jsx={`<div className="flex min-h-[28rem] items-center justify-center rounded-box bg-base-200/60 p-6">
              <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-6">
                  <div>
                    <h2 className="card-title text-primary font-bold">Sign in with code</h2>
                    <p className="text-sm text-ink-muted">
                      No password needed. We email a one-time code to your studio
                      address.
                    </p>
                  </div>

                  <form className="space-y-4">
                    <fieldset className="fieldset">
                      <label className="label" htmlFor="otp-login-email">
                        <span className="label-text">
                          Email
                          <RequiredMark />
                        </span>
                      </label>
                      <label className="input validator w-full cursor-text">
                        <Mail
                          className="size-4 opacity-50"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <input
                          id="otp-login-email"
                          type="email"
                          name="email"
                          placeholder="you@studio.com"
                          defaultValue="you@studio.com"
                          required
                        />
                      </label>
                    </fieldset>
                    <button type="button" className="btn btn-outline w-full cursor-pointer">
                      Send login code
                    </button>
                  </form>

                  <div className="divider text-xs">then enter code</div>

                  <form className="space-y-4">
                    <fieldset className="fieldset">
                      <label className="label" htmlFor="otp-login-code">
                        <span className="label-text">
                          Login code
                          <RequiredMark />
                        </span>
                      </label>
                      <label className="otp w-full cursor-text" htmlFor="otp-login-code">
                        {Array.from({ length: 6 }, (_, i) => (
                          <span key={i} />
                        ))}
                        <input
                          id="otp-login-code"
                          type="text"
                          autoComplete="one-time-code"
                          inputMode="numeric"
                          maxLength={6}
                          pattern="[0-9]{6}"
                          required
                          aria-label="6-digit login code"
                        />
                      </label>
                    </fieldset>
                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                      Sign in
                    </button>
                    <ResendRow seconds={28} />
                  </form>
                </div>
              </div>
            </div>`}
          />
        </Section>
      </div>
    </>
  )
}
