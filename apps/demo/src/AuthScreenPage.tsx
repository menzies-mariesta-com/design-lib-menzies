import type { ReactNode } from 'react'
import { Lock, Mail } from 'menzies-design-wash-ui/icons'

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

export default function AuthScreenPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Auth screen
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Login and signup shells built from daisyUI cards, fieldsets, and
          validators. Drop into a full-page hero or a centered panel for studio
          apps and member portals.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Login"
          title="Centered sign in"
          description="Compact card with email, password, and primary submit. Required labels use error asterisks."
        >
          <Sample label="card + fieldset + validator">
            <div className="flex min-h-80 items-center justify-center rounded-box bg-base-200/60 p-6">
              <form className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                  <div>
                    <h2 className="card-title text-primary font-bold">Sign in</h2>
                    <p className="text-sm text-ink-muted">
                      Access your Menzies Design studio plates.
                    </p>
                  </div>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="auth-login-email">
                      <span className="label-text">
                        Email
                        <RequiredMark />
                      </span>
                    </label>
                    <label className="input validator w-full cursor-text">
                      <Mail className="size-4 opacity-50" strokeWidth={2} aria-hidden="true" />
                      <input
                        id="auth-login-email"
                        type="email"
                        name="email"
                        placeholder="you@studio.com"
                        required
                      />
                    </label>
                    <p className="validator-hint hidden">Enter a valid email</p>
                  </fieldset>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="auth-login-password">
                      <span className="label-text">
                        Password
                        <RequiredMark />
                      </span>
                    </label>
                    <label className="input validator w-full cursor-text">
                      <Lock className="size-4 opacity-50" strokeWidth={2} aria-hidden="true" />
                      <input
                        id="auth-login-password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                      />
                    </label>
                    <p className="validator-hint hidden">Required</p>
                  </fieldset>

                  <div className="flex items-center justify-between gap-2 text-sm">
                    <label className="label cursor-pointer gap-2 py-0">
                      <input type="checkbox" className="checkbox checkbox-sm" />
                      <span className="label-text">Remember me</span>
                    </label>
                    <button type="button" className="link link-primary cursor-pointer text-sm">
                      Forgot password?
                    </button>
                  </div>

                  <div className="card-actions mt-1 flex-col gap-2">
                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                      Sign in
                    </button>
                    <p className="text-center text-sm text-ink-muted">
                      No account?{' '}
                      <button type="button" className="link link-secondary cursor-pointer">
                        Create one
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Sign up"
          title="Registration card"
          description="Name, email, and password with confirm field. Stacks cleanly on mobile."
          panel="wash-panel-ochre"
        >
          <Sample label="card + stacked fieldsets">
            <div className="flex min-h-[28rem] items-center justify-center rounded-box bg-base-200/40 p-6">
              <form className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                  <div>
                    <h2 className="card-title text-primary font-bold">Create account</h2>
                    <p className="text-sm text-ink-muted">
                      Start archiving plates and sharing wash presets.
                    </p>
                  </div>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="auth-signup-name">
                      <span className="label-text">
                        Display name
                        <RequiredMark />
                      </span>
                    </label>
                    <input
                      id="auth-signup-name"
                      type="text"
                      name="name"
                      className="input validator w-full cursor-text"
                      placeholder="Studio name"
                      required
                    />
                    <p className="validator-hint hidden">Required</p>
                  </fieldset>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="auth-signup-email">
                      <span className="label-text">
                        Email
                        <RequiredMark />
                      </span>
                    </label>
                    <input
                      id="auth-signup-email"
                      type="email"
                      name="email"
                      className="input validator w-full cursor-text"
                      placeholder="you@studio.com"
                      required
                    />
                    <p className="validator-hint hidden">Enter a valid email</p>
                  </fieldset>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <fieldset className="fieldset">
                      <label className="label" htmlFor="auth-signup-password">
                        <span className="label-text">
                          Password
                          <RequiredMark />
                        </span>
                      </label>
                      <input
                        id="auth-signup-password"
                        type="password"
                        name="password"
                        className="input validator w-full cursor-text"
                        placeholder="Password"
                        required
                      />
                      <p className="validator-hint hidden">Required</p>
                    </fieldset>

                    <fieldset className="fieldset">
                      <label className="label" htmlFor="auth-signup-confirm">
                        <span className="label-text">
                          Confirm
                          <RequiredMark />
                        </span>
                      </label>
                      <input
                        id="auth-signup-confirm"
                        type="password"
                        name="confirm"
                        className="input validator w-full cursor-text"
                        placeholder="Confirm"
                        required
                      />
                      <p className="validator-hint hidden">Must match password</p>
                    </fieldset>
                  </div>

                  <label className="label cursor-pointer justify-start gap-2 py-0">
                    <input type="checkbox" className="checkbox checkbox-sm" required />
                    <span className="label-text text-sm">
                      I agree to the studio terms
                      <RequiredMark />
                    </span>
                  </label>

                  <button type="submit" className="btn btn-primary w-full cursor-pointer">
                    Create account
                  </button>
                </div>
              </form>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="03 · Split layout"
          title="Hero plus form"
          description="Marketing copy on the left, auth card on the right. Collapses to a single column on small screens."
          panel="wash-panel-rose"
        >
          <Sample label="hero + card side by side">
            <div className="hero min-h-[32rem] rounded-box bg-base-200">
              <div className="hero-content w-full max-w-5xl flex-col gap-8 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md text-center lg:text-left">
                  <p className="label-ink mb-2">Menzies Design</p>
                  <h2 className="font-display text-3xl font-bold md:text-4xl">
                    Welcome back to the wash desk
                  </h2>
                  <p className="py-4 text-sm text-ink-muted md:text-base">
                    Sign in to review plates, tune pigments, and publish studio
                    presets for your team.
                  </p>
                </div>

                <form className="card w-full max-w-sm shrink-0 border border-base-300 bg-base-100 shadow-sm">
                  <div className="card-body gap-4">
                    <h3 className="card-title text-secondary font-bold">Sign in</h3>

                    <fieldset className="fieldset">
                      <label className="label" htmlFor="auth-split-email">
                        <span className="label-text">
                          Email
                          <RequiredMark />
                        </span>
                      </label>
                      <input
                        id="auth-split-email"
                        type="email"
                        className="input w-full cursor-text"
                        placeholder="you@studio.com"
                        required
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <label className="label" htmlFor="auth-split-password">
                        <span className="label-text">
                          Password
                          <RequiredMark />
                        </span>
                      </label>
                      <input
                        id="auth-split-password"
                        type="password"
                        className="input w-full cursor-text"
                        placeholder="Password"
                        required
                      />
                    </fieldset>

                    <button type="submit" className="btn btn-primary w-full cursor-pointer">
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Sample>
        </Section>
      </div>
    </>
  )
}
