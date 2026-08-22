import type { ReactNode } from 'react'
import { ShieldCheck, MonitorSmartphone, QrCode } from 'menzies-design-wash-ui/icons'

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

export default function TwoFactorPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Two-factor authentication
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Second-step verification screens for TOTP apps, SMS codes, and backup
          recovery. Use after primary sign-in or when enabling 2FA in account
          settings.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · TOTP"
          title="Authenticator code"
          description="Six-digit code entry after password sign-in. Includes trust-device checkbox and recovery link."
        >
          <Sample label="card + otp + trust device">
            <div className="flex min-h-80 items-center justify-center rounded-box bg-base-200/60 p-6">
              <form className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-box bg-primary/10 p-2">
                      <ShieldCheck
                        className="size-5 text-primary"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h2 className="card-title text-primary font-bold">
                        Two-factor authentication
                      </h2>
                      <p className="text-sm text-ink-muted">
                        Enter the 6-digit code from your authenticator app.
                      </p>
                    </div>
                  </div>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="2fa-totp-code">
                      <span className="label-text">
                        Verification code
                        <RequiredMark />
                      </span>
                    </label>
                    <label className="otp w-full cursor-text" htmlFor="2fa-totp-code">
                      {Array.from({ length: 6 }, (_, i) => (
                        <span key={i} />
                      ))}
                      <input
                        id="2fa-totp-code"
                        type="text"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        required
                        aria-label="6-digit verification code"
                      />
                    </label>
                  </fieldset>

                  <label className="label cursor-pointer justify-start gap-2 py-0">
                    <input type="checkbox" className="checkbox checkbox-sm" />
                    <span className="label-text text-sm">
                      Trust this device for 30 days
                    </span>
                  </label>

                  <div className="card-actions mt-1 flex-col gap-2">
                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                      Verify
                    </button>
                    <button
                      type="button"
                      className="link link-secondary cursor-pointer text-sm"
                    >
                      Use a backup code instead
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Setup"
          title="Enable authenticator app"
          description="QR scan plus manual secret key for first-time 2FA enrollment."
          panel="wash-panel-ochre"
        >
          <Sample label="card + qr placeholder + secret">
            <div className="flex min-h-[28rem] items-center justify-center rounded-box bg-base-200/40 p-6">
              <form className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
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
                        Set up authenticator
                      </h2>
                      <p className="text-sm text-ink-muted">
                        Scan the QR code with Google Authenticator, 1Password, or
                        another TOTP app.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                    <div
                      className="flex size-36 shrink-0 items-center justify-center rounded-box border border-dashed border-base-300 bg-base-200/60"
                      aria-hidden="true"
                    >
                      <QrCode className="size-12 text-ink-muted/50" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                        Manual entry key
                      </p>
                      <code className="mt-1 block break-all rounded-box bg-base-200 px-3 py-2 font-mono text-sm">
                        JBSW Y3DP EHPK 3PXP
                      </code>
                      <button
                        type="button"
                        className="link link-primary mt-2 cursor-pointer text-sm"
                      >
                        Copy secret key
                      </button>
                    </div>
                  </div>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="2fa-setup-code">
                      <span className="label-text">
                        Confirm with a code
                        <RequiredMark />
                      </span>
                    </label>
                    <label className="otp w-full cursor-text" htmlFor="2fa-setup-code">
                      {Array.from({ length: 6 }, (_, i) => (
                        <span key={i} />
                      ))}
                      <input
                        id="2fa-setup-code"
                        type="text"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        required
                        aria-label="Confirm setup with 6-digit code"
                      />
                    </label>
                  </fieldset>

                  <button type="submit" className="btn btn-primary w-full cursor-pointer">
                    Enable two-factor
                  </button>
                </div>
              </form>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="03 · Recovery"
          title="Backup code entry"
          description="Single-use recovery code when the authenticator device is unavailable."
          panel="wash-panel-rose"
        >
          <Sample label="card + backup code input">
            <div className="flex min-h-72 items-center justify-center rounded-box bg-base-200/60 p-6">
              <form className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                  <div>
                    <h2 className="card-title text-error font-bold">Use backup code</h2>
                    <p className="text-sm text-ink-muted">
                      Enter one of the backup codes you saved when you enabled 2FA.
                      Each code works once.
                    </p>
                  </div>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="2fa-backup-code">
                      <span className="label-text">
                        Backup code
                        <RequiredMark />
                      </span>
                    </label>
                    <input
                      id="2fa-backup-code"
                      type="text"
                      name="backup"
                      className="input validator w-full cursor-text font-mono uppercase tracking-widest"
                      placeholder="XXXX-XXXX-XXXX"
                      autoComplete="off"
                      required
                    />
                    <p className="validator-hint hidden">Enter a valid backup code</p>
                  </fieldset>

                  <div className="alert alert-warning text-sm">
                    <span>
                      After using a backup code, generate new ones in account
                      settings.
                    </span>
                  </div>

                  <div className="card-actions flex-col gap-2">
                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                      Verify backup code
                    </button>
                    <button
                      type="button"
                      className="link link-secondary cursor-pointer text-sm"
                    >
                      Back to authenticator code
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Sample>
        </Section>
      </div>
    </>
  )
}
