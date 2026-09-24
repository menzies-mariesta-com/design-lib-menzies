import type { ReactNode } from 'react'
import { Mail, MonitorSmartphone, Timer } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
import { OtpField } from './components/OtpField'

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
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
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

const svgMail =
  '<svg class="size-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>'
const svgMailMuted =
  '<svg class="size-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>'
const svgPhone =
  '<svg class="size-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/></svg>'
const svgTimer =
  '<svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>'

function otpFieldHtml(digits: number, id: string, ariaLabel: string): string {
  const spans = Array.from({ length: digits }, () => '  <span></span>').join('\n')
  return `<label class="otp cursor-text" for="${id}">
${spans}
  <input id="${id}" type="text" autocomplete="one-time-code" inputmode="numeric" maxlength="${digits}" pattern="[0-9]{${digits}}" required class="cursor-text" aria-label="${ariaLabel}" />
</label>`
}

function toJsx(html: string): string {
  return daisyToJsx(html)
    .replace(/\sfor=/g, ' htmlFor=')
    .replace(/\sautocomplete=/g, ' autoComplete=')
    .replace(/\sinputmode=/g, ' inputMode=')
    .replace(/\smaxlength=/g, ' maxLength=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
}

function indent(block: string, spaces: number): string {
  const pad = ' '.repeat(spaces)
  return block
    .split('\n')
    .map((line) => (line ? pad + line : line))
    .join('\n')
}

const emailHtml = `<div class="flex min-h-80 items-center justify-center rounded-box bg-base-200/60 p-6">
  <form class="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body gap-4">
      <div class="flex items-start gap-3">
        <div class="rounded-box bg-primary/10 p-2">
          ${svgMail}
        </div>
        <div>
          <h2 class="card-title text-primary font-bold">Enter verification code</h2>
          <p class="text-sm text-ink-muted">
            We sent a 6-digit code to
            <span class="font-medium text-base-content">y***@studio.com</span>.
            It expires in 10 minutes.
          </p>
        </div>
      </div>
      <fieldset class="fieldset">
        <label class="label" for="otp-email-code">
          <span class="label-text">
            One-time code
            <span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
          </span>
        </label>
${indent(otpFieldHtml(6, 'otp-email-code', '6-digit email verification code'), 8)}
      </fieldset>
      <div class="card-actions mt-1 flex-col gap-2">
        <button type="submit" class="btn btn-primary w-full cursor-pointer">Verify and continue</button>
        <p class="text-center text-sm text-ink-muted">
          Did not get a code?
          <span class="inline-flex items-center gap-1">
            ${svgTimer}
            Resend in 42s
          </span>
        </p>
        <button type="button" class="link link-secondary cursor-pointer text-sm">Use a different email</button>
      </div>
    </div>
  </form>
</div>`

const smsHtml = `<div class="flex min-h-80 items-center justify-center rounded-box bg-base-200/40 p-6">
  <form class="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body gap-4">
      <div class="flex items-start gap-3">
        <div class="rounded-box bg-secondary/10 p-2">
          ${svgPhone}
        </div>
        <div>
          <h2 class="card-title text-secondary font-bold">Verify your phone</h2>
          <p class="text-sm text-ink-muted">
            Enter the 4-digit code sent to
            <span class="font-medium text-base-content">+1 (•••) •••-4829</span>.
          </p>
        </div>
      </div>
      <fieldset class="fieldset">
        <label class="label" for="otp-sms-code">
          <span class="label-text">
            SMS code
            <span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
          </span>
        </label>
${indent(otpFieldHtml(4, 'otp-sms-code', '4-digit SMS verification code'), 8)}
      </fieldset>
      <div class="card-actions flex-col gap-2">
        <button type="submit" class="btn btn-primary w-full cursor-pointer">Verify phone</button>
        <p class="text-center text-sm text-ink-muted">
          Did not get a code?
          <button type="button" class="link link-primary cursor-pointer">Resend code</button>
        </p>
        <div class="divider my-0 text-xs">or</div>
        <button type="button" class="btn btn-outline w-full cursor-pointer">Send code via email instead</button>
        <button type="button" class="link link-secondary cursor-pointer text-sm">Change phone number</button>
      </div>
    </div>
  </form>
</div>`

const signInHtml = `<div class="flex min-h-[28rem] items-center justify-center rounded-box bg-base-200/60 p-6">
  <div class="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body gap-6">
      <div>
        <h2 class="card-title text-primary font-bold">Sign in with code</h2>
        <p class="text-sm text-ink-muted">
          No password needed. We email a one-time code to your studio address.
        </p>
      </div>
      <form class="space-y-4">
        <fieldset class="fieldset">
          <label class="label" for="otp-login-email">
            <span class="label-text">
              Email
              <span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
            </span>
          </label>
          <label class="input validator w-full cursor-text">
            ${svgMailMuted}
            <input id="otp-login-email" type="email" name="email" placeholder="you@studio.com" value="you@studio.com" required />
          </label>
        </fieldset>
        <button type="button" class="btn btn-outline w-full cursor-pointer">Send login code</button>
      </form>
      <div class="divider text-xs">then enter code</div>
      <form class="space-y-4">
        <fieldset class="fieldset">
          <label class="label" for="otp-login-code">
            <span class="label-text">
              Login code
              <span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
            </span>
          </label>
${indent(otpFieldHtml(6, 'otp-login-code', '6-digit login code'), 10)}
        </fieldset>
        <button type="submit" class="btn btn-primary w-full cursor-pointer">Sign in</button>
        <p class="text-center text-sm text-ink-muted">
          Did not get a code?
          <span class="inline-flex items-center gap-1">
            ${svgTimer}
            Resend in 28s
          </span>
        </p>
      </form>
    </div>
  </div>
</div>`

const signInJsx = toJsx(signInHtml).replace(/\svalue=/g, ' defaultValue=')

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
          component gallery.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Email"
          title="Verify email code"
          description="Six-digit code sent to inbox"
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
                          <OtpField
                            id="otp-email-code"
                            digits={6}
                            ariaLabel="6-digit email verification code"
                          />
                        </fieldset>

                        <div className="card-actions mt-1 flex-col gap-2">
                          <button
                            type="submit"
                            className="btn btn-primary w-full cursor-pointer"
                          >
                            Verify and continue
                          </button>
                          <ResendRow seconds={42} />
                          <button
                            type="button"
                            className="link link-secondary cursor-pointer text-sm"
                          >
                            Use a different email
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Sample>
              </>
            }
            html={emailHtml}
            jsx={toJsx(emailHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · SMS"
          title="Phone verification"
          description="Four-digit SMS code with alternate email delivery and change-number"
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
                          <OtpField
                            id="otp-sms-code"
                            digits={4}
                            ariaLabel="4-digit SMS verification code"
                          />
                        </fieldset>

                        <div className="card-actions flex-col gap-2">
                          <button
                            type="submit"
                            className="btn btn-primary w-full cursor-pointer"
                          >
                            Verify phone
                          </button>
                          <ResendRow seconds={0} />
                          <div className="divider my-0 text-xs">or</div>
                          <button
                            type="button"
                            className="btn btn-outline w-full cursor-pointer"
                          >
                            Send code via email instead
                          </button>
                          <button
                            type="button"
                            className="link link-secondary cursor-pointer text-sm"
                          >
                            Change phone number
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Sample>
              </>
            }
            html={smsHtml}
            jsx={toJsx(smsHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Sign-in"
          title="Passwordless OTP login"
          description="Email-first magic code login"
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
                          <h2 className="card-title text-primary font-bold">
                            Sign in with code
                          </h2>
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
                          <button
                            type="button"
                            className="btn btn-outline w-full cursor-pointer"
                          >
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
                            <OtpField
                              id="otp-login-code"
                              digits={6}
                              ariaLabel="6-digit login code"
                            />
                          </fieldset>
                          <button
                            type="submit"
                            className="btn btn-primary w-full cursor-pointer"
                          >
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
            html={signInHtml}
            jsx={signInJsx}
          />
        </Section>
      </div>
    </>
  )
}
