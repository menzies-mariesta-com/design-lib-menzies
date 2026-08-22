import { WASH_EMAIL_COLORS, type WashEmailColors } from './colors'

export type OtpVerificationEmailOptions = {
  /** Six-digit (or other length) one-time code. */
  code: string
  /** Short action line, e.g. "Verify your Wash studio sign-in". */
  purpose?: string
  /** Minutes until the code expires. Default 10. */
  expiresMinutes?: number
  /** Studio or product name shown in copy. Default "Wash studio". */
  studioName?: string
  /** Optional masked recipient, e.g. "y***@studio.com". */
  recipientHint?: string
  /** Override inline palette (defaults to mineral pigment). */
  colors?: Partial<WashEmailColors>
}

export type OtpVerificationEmail = {
  subject: string
  html: string
  text: string
}

const DEFAULT_PURPOSE = 'Verify your Wash studio sign-in'
const DEFAULT_STUDIO = 'Wash studio'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function formatCodeDisplay(code: string): string {
  const digits = code.replace(/\D/g, '')
  if (digits.length === 6) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`
  }
  return digits || code
}

function buildSubject(
  code: string,
  studioName: string,
  purpose: string,
): string {
  const digits = code.replace(/\D/g, '') || code
  if (purpose.toLowerCase().includes('sign-in') || purpose.toLowerCase().includes('sign in')) {
    return `${digits} is your ${studioName} sign-in code`
  }
  return `${digits} is your ${studioName} verification code`
}

function buildPlainText(
  options: Required<
    Pick<
      OtpVerificationEmailOptions,
      'code' | 'purpose' | 'expiresMinutes' | 'studioName' | 'recipientHint'
    >
  >,
): string {
  const lines = [
    options.purpose,
    '',
    `Your one-time code: ${options.code}`,
    '',
    `This code expires in ${options.expiresMinutes} minutes.`,
  ]

  if (options.recipientHint) {
    lines.push('', `Sent to ${options.recipientHint}.`)
  }

  lines.push(
    '',
    'Do not share this code with anyone. Wash studio staff will never ask for it.',
    '',
    `If you did not request this code, you can ignore this email. Your ${options.studioName} account stays secure.`,
    '',
    `${options.studioName} · Wash UI`,
  )

  return lines.join('\n')
}

function buildHtml(
  options: Required<
    Pick<
      OtpVerificationEmailOptions,
      'code' | 'purpose' | 'expiresMinutes' | 'studioName' | 'recipientHint'
    >
  > & { colors: WashEmailColors },
): string {
  const c = options.colors
  const codeDisplay = escapeHtml(formatCodeDisplay(options.code))
  const purpose = escapeHtml(options.purpose)
  const studio = escapeHtml(options.studioName)
  const recipient = options.recipientHint
    ? `<p style="margin:16px 0 0;font-size:14px;line-height:1.5;color:${c.inkMuted};">Sent to <strong style="color:${c.baseContent};">${escapeHtml(options.recipientHint)}</strong></p>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(buildSubject(options.code, options.studioName, options.purpose))}</title>
</head>
<body style="margin:0;padding:0;background-color:${c.base200};font-family:Georgia,'Times New Roman',serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${purpose}. Your code is ${escapeHtml(options.code)}. Expires in ${options.expiresMinutes} minutes.
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${c.base200};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:520px;background-color:${c.base100};border:1px solid ${c.inkBorder};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px 20px;background:linear-gradient(135deg, ${c.primaryLight} 0%, ${c.base100} 55%);border-bottom:1px solid ${c.inkBorder};">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${c.primary};">${studio}</p>
              <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:600;color:${c.baseContent};">${purpose}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${c.inkMuted};">
                Enter this one-time code to continue. For your security, it expires soon.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding:20px 16px;background-color:${c.base200};border:1px dashed ${c.primary};border-radius:12px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${c.inkMuted};">One-time code</p>
                    <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:36px;font-weight:700;letter-spacing:0.2em;color:${c.primary};">${codeDisplay}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-size:14px;line-height:1.5;color:${c.inkMuted};">
                <span style="display:inline-block;padding:4px 10px;background-color:${c.primaryLight};border-radius:999px;font-size:12px;font-weight:600;color:${c.primary};">Expires in ${options.expiresMinutes} minutes</span>
              </p>
              ${recipient}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${c.base200};border-radius:12px;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0;font-size:13px;line-height:1.55;color:${c.inkMuted};">
                      <strong style="color:${c.baseContent};">Keep this code private.</strong>
                      Do not share it with anyone. ${studio} staff will never ask for your verification code by email, chat, or phone.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:${c.inkMuted};">
                If you did not request this code, you can safely ignore this email. Your account remains secure.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px;background-color:${c.base200};border-top:1px solid ${c.inkBorder};">
              <p style="margin:0;font-size:11px;line-height:1.5;color:${c.inkMuted};text-align:center;">
                ${studio} · Wash UI pigment design system
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Build HTML and plain-text OTP verification email content. */
export function buildOtpVerificationEmail(
  options: OtpVerificationEmailOptions,
): OtpVerificationEmail {
  const resolved = {
    code: options.code,
    purpose: options.purpose ?? DEFAULT_PURPOSE,
    expiresMinutes: options.expiresMinutes ?? 10,
    studioName: options.studioName ?? DEFAULT_STUDIO,
    recipientHint: options.recipientHint ?? '',
    colors: { ...WASH_EMAIL_COLORS, ...options.colors },
  }

  const subject = buildSubject(resolved.code, resolved.studioName, resolved.purpose)

  return {
    subject,
    html: buildHtml(resolved),
    text: buildPlainText(resolved),
  }
}

/** Demo sample used in the Wash UI template gallery. */
export const OTP_VERIFICATION_EMAIL_SAMPLE = buildOtpVerificationEmail({
  code: '482913',
  purpose: 'Verify your Wash studio sign-in',
  expiresMinutes: 10,
  studioName: 'Wash studio',
  recipientHint: 'y***@studio.com',
})
