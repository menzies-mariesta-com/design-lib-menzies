import type { ReactNode } from 'react'
import { Mail, Lock, CircleCheck } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

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

const svgMail =
  '<svg class="size-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>'
const svgLock =
  '<svg class="size-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
const svgLockAccent =
  '<svg class="size-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
const svgCheck =
  '<svg class="size-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'

function toJsx(html: string): string {
  return daisyToJsx(html)
    .replace(/\sfor=/g, ' htmlFor=')
    .replace(/\sautocomplete=/g, ' autoComplete=')
    .replace(/\sinputmode=/g, ' inputMode=')
    .replace(/\smaxlength=/g, ' maxLength=')
    .replace(/\sminlength=/g, ' minLength=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
}

const requestHtml = `<div class="flex min-h-72 items-center justify-center rounded-box bg-base-200/60 p-6">
  <form class="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body gap-4">
      <div>
        <h2 class="card-title text-primary font-bold">Forgot password</h2>
        <p class="text-sm text-ink-muted">
          Enter the email on your account. We will send a reset link if
          it matches a studio member.
        </p>
      </div>
      <fieldset class="fieldset">
        <label class="label" for="forgot-email">
          <span class="label-text">
            Email
            <span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
          </span>
        </label>
        <label class="input validator w-full cursor-text">
          ${svgMail}
          <input id="forgot-email" type="email" name="email" placeholder="you@studio.com" required />
        </label>
        <p class="validator-hint hidden">Enter a valid email</p>
      </fieldset>
      <div class="card-actions mt-1 flex-col gap-2">
        <button type="submit" class="btn btn-primary w-full cursor-pointer">Send reset link</button>
        <p class="text-center text-sm text-ink-muted">
          Remember your password?
          <button type="button" class="link link-secondary cursor-pointer">Sign in</button>
        </p>
      </div>
    </div>
  </form>
</div>`

const confirmHtml = `<div class="flex min-h-72 items-center justify-center rounded-box bg-base-200/40 p-6">
  <div class="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body items-center gap-4 text-center">
      <div class="rounded-full bg-success/15 p-3">
        ${svgCheck}
      </div>
      <div>
        <h2 class="card-title justify-center text-success font-bold">Check your email</h2>
        <p class="text-sm text-ink-muted">
          If <strong class="font-medium">you@studio.com</strong> is
          registered, a reset link is on its way. The link expires in
          15 minutes.
        </p>
      </div>
      <div class="w-full space-y-2 text-sm">
        <button type="button" class="btn btn-outline w-full cursor-pointer">Open email app</button>
        <p class="text-ink-muted">
          Did not receive it?
          <button type="button" class="link link-primary cursor-pointer">Resend link</button>
        </p>
        <button type="button" class="link link-secondary cursor-pointer">Back to sign in</button>
      </div>
    </div>
  </div>
</div>`

const newPasswordHtml = `<div class="flex min-h-80 items-center justify-center rounded-box bg-base-200/60 p-6">
  <form class="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body gap-4">
      <div class="flex items-start gap-3">
        <div class="rounded-box bg-secondary/10 p-2">
          ${svgLockAccent}
        </div>
        <div>
          <h2 class="card-title text-secondary font-bold">Set new password</h2>
          <p class="text-sm text-ink-muted">
            Choose a strong password you have not used on this studio
            account before.
          </p>
        </div>
      </div>
      <fieldset class="fieldset">
        <label class="label" for="reset-password">
          <span class="label-text">
            New password
            <span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
          </span>
        </label>
        <label class="input validator w-full cursor-text">
          ${svgLock}
          <input id="reset-password" type="password" name="password" placeholder="New password" minlength="8" required />
        </label>
        <p class="text-xs text-ink-muted">At least 8 characters with a number and symbol.</p>
      </fieldset>
      <fieldset class="fieldset">
        <label class="label" for="reset-confirm">
          <span class="label-text">
            Confirm password
            <span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>
          </span>
        </label>
        <label class="input validator w-full cursor-text">
          ${svgLock}
          <input id="reset-confirm" type="password" name="confirm" placeholder="Confirm password" required />
        </label>
        <p class="validator-hint hidden">Passwords must match</p>
      </fieldset>
      <button type="submit" class="btn btn-primary w-full cursor-pointer">Update password</button>
    </div>
  </form>
</div>`

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Forgot password
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Password reset request, confirmation, and new-password forms.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Request"
          title="Send reset link"
          description="Email-only form to start the reset flow"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="card + email field">
                  <div className="flex min-h-72 items-center justify-center rounded-box bg-base-200/60 p-6">
                    <form className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                      <div className="card-body gap-4">
                        <div>
                          <h2 className="card-title text-primary font-bold">Forgot password</h2>
                          <p className="text-sm text-ink-muted">
                            Enter the email on your account. We will send a reset link if
                            it matches a studio member.
                          </p>
                        </div>

                        <fieldset className="fieldset">
                          <label className="label" htmlFor="forgot-email">
                            <span className="label-text">
                              Email
                              <RequiredMark />
                            </span>
                          </label>
                          <label className="input validator w-full cursor-text">
                            <Mail className="size-4 opacity-50" strokeWidth={2} aria-hidden="true" />
                            <input
                              id="forgot-email"
                              type="email"
                              name="email"
                              placeholder="you@studio.com"
                              required
                            />
                          </label>
                          <p className="validator-hint hidden">Enter a valid email</p>
                        </fieldset>

                        <div className="card-actions mt-1 flex-col gap-2">
                          <button type="submit" className="btn btn-primary w-full cursor-pointer">
                            Send reset link
                          </button>
                          <p className="text-center text-sm text-ink-muted">
                            Remember your password?{' '}
                            <button type="button" className="link link-secondary cursor-pointer">
                              Sign in
                            </button>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </Sample>
              </>
            }
            html={requestHtml}
            jsx={toJsx(requestHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · Confirmation"
          title="Check your inbox"
          description="Success state after the reset email is queued"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="card + success state">
                  <div className="flex min-h-72 items-center justify-center rounded-box bg-base-200/40 p-6">
                    <div className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                      <div className="card-body items-center gap-4 text-center">
                        <div className="rounded-full bg-success/15 p-3">
                          <CircleCheck
                            className="size-8 text-success"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <h2 className="card-title justify-center text-success font-bold">
                            Check your email
                          </h2>
                          <p className="text-sm text-ink-muted">
                            If <strong className="font-medium">you@studio.com</strong> is
                            registered, a reset link is on its way. The link expires in
                            15 minutes.
                          </p>
                        </div>

                        <div className="w-full space-y-2 text-sm">
                          <button type="button" className="btn btn-outline w-full cursor-pointer">
                            Open email app
                          </button>
                          <p className="text-ink-muted">
                            Did not receive it?{' '}
                            <button type="button" className="link link-primary cursor-pointer">
                              Resend link
                            </button>
                          </p>
                          <button type="button" className="link link-secondary cursor-pointer">
                            Back to sign in
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Sample>
              </>
            }
            html={confirmHtml}
            jsx={toJsx(confirmHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · New password"
          title="Set a new password"
          description="Reached from the signed reset link"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="card + password fields">
                  <div className="flex min-h-80 items-center justify-center rounded-box bg-base-200/60 p-6">
                    <form className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                      <div className="card-body gap-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-box bg-secondary/10 p-2">
                            <Lock
                              className="size-5 text-secondary"
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <h2 className="card-title text-secondary font-bold">
                              Set new password
                            </h2>
                            <p className="text-sm text-ink-muted">
                              Choose a strong password you have not used on this studio
                              account before.
                            </p>
                          </div>
                        </div>

                        <fieldset className="fieldset">
                          <label className="label" htmlFor="reset-password">
                            <span className="label-text">
                              New password
                              <RequiredMark />
                            </span>
                          </label>
                          <label className="input validator w-full cursor-text">
                            <Lock className="size-4 opacity-50" strokeWidth={2} aria-hidden="true" />
                            <input
                              id="reset-password"
                              type="password"
                              name="password"
                              placeholder="New password"
                              minLength={8}
                              required
                            />
                          </label>
                          <p className="text-xs text-ink-muted">
                            At least 8 characters with a number and symbol.
                          </p>
                        </fieldset>

                        <fieldset className="fieldset">
                          <label className="label" htmlFor="reset-confirm">
                            <span className="label-text">
                              Confirm password
                              <RequiredMark />
                            </span>
                          </label>
                          <label className="input validator w-full cursor-text">
                            <Lock className="size-4 opacity-50" strokeWidth={2} aria-hidden="true" />
                            <input
                              id="reset-confirm"
                              type="password"
                              name="confirm"
                              placeholder="Confirm password"
                              required
                            />
                          </label>
                          <p className="validator-hint hidden">Passwords must match</p>
                        </fieldset>

                        <button type="submit" className="btn btn-primary w-full cursor-pointer">
                          Update password
                        </button>
                      </div>
                    </form>
                  </div>
                </Sample>
              </>
            }
            html={newPasswordHtml}
            jsx={toJsx(newPasswordHtml)}
          />
        </Section>
      </div>
    </>
  )
}
