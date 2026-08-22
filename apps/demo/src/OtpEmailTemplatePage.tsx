import type { ReactNode } from 'react'
import {
  OTP_VERIFICATION_EMAIL_SAMPLE,
  buildOtpVerificationEmail,
} from '@menzies-mariesta-com/menzies-design-wash-ui/email'
import { EmailShowcaseTabs } from './components/EmailShowcaseTabs'

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

const sampleEmail = OTP_VERIFICATION_EMAIL_SAMPLE

const usageSnippet = `import { buildOtpVerificationEmail } from '@menzies-mariesta-com/menzies-design-wash-ui/email'

const { subject, html, text } = buildOtpVerificationEmail({
  code: '482913',
  purpose: 'Verify your Wash studio sign-in',
  expiresMinutes: 10,
  studioName: 'Wash studio',
  recipientHint: 'y***@studio.com',
})

// Pass subject + html (or text) to your mail provider
await mailer.send({ to, subject, html, text })`

export default function OtpEmailTemplatePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          OTP verification email
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Transactional HTML for one-time sign-in codes. Inline CSS and table layout
          for inbox clients. Pair with the OTP screen template for the full auth flow.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Sign-in"
          title="Studio verification code"
          description="Six-digit code with expiry badge, recipient hint, and security footer. Sample code: 482913."
        >
          <EmailShowcaseTabs
            subject={sampleEmail.subject}
            plainText={sampleEmail.text}
            html={sampleEmail.html}
            usage={usageSnippet}
            preview={
              <div className="overflow-hidden rounded-box border border-base-300 bg-base-200/40">
                <iframe
                  title="OTP verification email preview"
                  srcDoc={sampleEmail.html}
                  sandbox=""
                  className="block h-[520px] w-full min-w-0 bg-white sm:h-[560px]"
                />
              </div>
            }
          />
        </Section>

        <Section
          eyebrow="02 · API"
          title="Programmatic usage"
          description="Generate subject, HTML, and plain text from your auth service when issuing a code."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-box border border-ink-border/70 bg-base-100/60 p-4">
              <h3 className="font-display text-base font-semibold text-primary">Options</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="font-mono text-xs text-ink-muted">code</dt>
                  <dd>Required one-time code string.</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-muted">purpose</dt>
                  <dd>Headline action, e.g. verify sign-in.</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-muted">expiresMinutes</dt>
                  <dd>Default 10. Shown in body and plain text.</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-muted">studioName</dt>
                  <dd>Brand name in header and footer.</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-muted">recipientHint</dt>
                  <dd>Optional masked email shown below the code.</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-muted">colors</dt>
                  <dd>Partial override of mineral pigment palette.</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-box border border-ink-border/70 bg-base-100/60 p-4">
              <h3 className="font-display text-base font-semibold text-secondary">Returns</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="font-mono text-xs text-ink-muted">subject</dt>
                  <dd>
                    Ready to send. Example:{' '}
                    <span className="font-medium text-base-content">
                      {buildOtpVerificationEmail({ code: '482913' }).subject}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-muted">html</dt>
                  <dd>Full document with inline styles for HTML mailers.</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-muted">text</dt>
                  <dd>Plain-text fallback for multipart messages.</dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
