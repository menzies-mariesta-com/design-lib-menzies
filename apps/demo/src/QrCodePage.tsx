import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { Download } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const SAMPLE_URL = 'https://menzies.design/palette/ultramarine'
const SAMPLE_TEXT = 'Menzies Design pigment desk'

const sizes = [
  { name: 'Small', px: 96, label: 'size={96}' },
  { name: 'Medium', px: 160, label: 'size={160}' },
  { name: 'Large', px: 224, label: 'size={224}' },
] as const

const colorTokens = [
  { name: 'Primary', fg: '--color-primary', bg: '--color-base-100' },
  { name: 'Secondary', fg: '--color-secondary', bg: '--color-base-100' },
  { name: 'Accent', fg: '--color-accent', bg: '--color-base-100' },
  { name: 'Neutral', fg: '--color-neutral', bg: '--color-base-100' },
  { name: 'Ink on wash', fg: '--color-base-content', bg: '--color-base-200' },
] as const

const studioDemos = [
  {
    name: 'Pigment id',
    value: 'pigment:ultramarine-deep-v2',
    label: 'pigment:…',
  },
  {
    name: 'Studio session',
    value: 'https://menzies.design/session/ws-4f8a2c',
    label: 'session link',
  },
  {
    name: 'Layer share',
    value: 'menzies://layer/rose-wash-03',
    label: 'menzies://layer/…',
  },
] as const

function readCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return value || fallback
}

function useThemeColors() {
  const [colors, setColors] = useState(() => ({
    primary: '#276c8e',
    secondary: '#8e4b6a',
    accent: '#c48a28',
    neutral: '#3d4451',
    baseContent: '#1a1c1e',
    base100: '#ffffff',
    base200: '#f2f0ec',
  }))

  const refresh = useCallback(() => {
    setColors({
      primary: readCssVar('--color-primary', '#276c8e'),
      secondary: readCssVar('--color-secondary', '#8e4b6a'),
      accent: readCssVar('--color-accent', '#c48a28'),
      neutral: readCssVar('--color-neutral', '#3d4451'),
      baseContent: readCssVar('--color-base-content', '#1a1c1e'),
      base100: readCssVar('--color-base-100', '#ffffff'),
      base200: readCssVar('--color-base-200', '#f2f0ec'),
    })
  }, [])

  useEffect(() => {
    refresh()

    const root = document.documentElement
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === 'data-theme' || m.attributeName === 'class')) {
        refresh()
      }
    })
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] })

    return () => observer.disconnect()
  }, [refresh])

  return colors
}

function tokenToColor(
  token: (typeof colorTokens)[number]['fg'] | (typeof colorTokens)[number]['bg'],
  theme: ReturnType<typeof useThemeColors>,
): string {
  switch (token) {
    case '--color-primary':
      return theme.primary
    case '--color-secondary':
      return theme.secondary
    case '--color-accent':
      return theme.accent
    case '--color-neutral':
      return theme.neutral
    case '--color-base-content':
      return theme.baseContent
    case '--color-base-100':
      return theme.base100
    case '--color-base-200':
      return theme.base200
    default:
      return theme.baseContent
  }
}

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
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function QrFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-box border border-ink-border/70 bg-base-100 p-3 shadow-sm">
      {children}
    </div>
  )
}

function DownloadQrButton({
  canvasRef,
  filename,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>
  filename: string
}) {
  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  return (
    <div className="tooltip tooltip-primary" data-tip="Download PNG">
      <button
        type="button"
        className="btn btn-ghost btn-square btn-primary cursor-pointer"
        aria-label="Download PNG"
        onClick={handleDownload}
      >
        <Download className="size-4" strokeWidth={2} />
      </button>
    </div>
  )
}

export default function QrCodePage() {
  const theme = useThemeColors()
  const payloadId = useId()
  const [payload, setPayload] = useState(SAMPLE_URL)
  const downloadRef = useRef<HTMLCanvasElement>(null)
  const interactiveRef = useRef<HTMLCanvasElement>(null)

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          QR code
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Encode studio URLs and pigment ids with{' '}
          <span className="font-mono text-xs">qrcode.react</span>. Theme-aware
          foreground colors follow daisyUI CSS variables.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Sample payloads"
          description="A Menzies Design URL and plain text encoded as SVG QR codes."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            <Sample label="QRCodeSVG · URL">
                              <QrFrame>
                                <QRCodeSVG
                                  value={SAMPLE_URL}
                                  size={144}
                                  marginSize={2}
                                  fgColor={theme.baseContent}
                                  bgColor={theme.base100}
                                  title="Menzies Design palette link"
                                />
                              </QrFrame>
                            </Sample>
                            <Sample label="QRCodeSVG · text">
                              <QrFrame>
                                <QRCodeSVG
                                  value={SAMPLE_TEXT}
                                  size={144}
                                  marginSize={2}
                                  fgColor={theme.baseContent}
                                  bgColor={theme.base100}
                                  title="Menzies Design studio text"
                                />
                              </QrFrame>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-6">
            
              <QrFrame>
                <QRCodeSVG
                  value=
                  size=
                  marginSize=
                  fgColor=
                  bgColor=
                  title="Menzies Design palette link"
                />
              </QrFrame>
            
            
              <QrFrame>
                <QRCodeSVG
                  value=
                  size=
                  marginSize=
                  fgColor=
                  bgColor=
                  title="Menzies Design studio text"
                />
              </QrFrame>
            
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-6">
            
              <QrFrame>
                <QRCodeSVG
                  value={SAMPLE_URL}
                  size={144}
                  marginSize={2}
                  fgColor={theme.baseContent}
                  bgColor={theme.base100}
                  title="Menzies Design palette link"
                />
              </QrFrame>
            
            
              <QrFrame>
                <QRCodeSVG
                  value={SAMPLE_TEXT}
                  size={144}
                  marginSize={2}
                  fgColor={theme.baseContent}
                  bgColor={theme.base100}
                  title="Menzies Design studio text"
                />
              </QrFrame>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Small, medium, large"
          description="Pixel size controls module scale. Keep quiet-zone margin for scanners."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            {sizes.map((s) => (
                              <Sample key={s.name} label={s.label}>
                                <div className="flex flex-col items-center gap-2">
                                  <p className="label-ink">{s.name}</p>
                                  <QrFrame>
                                    <QRCodeSVG
                                      value={SAMPLE_URL}
                                      size={s.px}
                                      marginSize={2}
                                      fgColor={theme.primary}
                                      bgColor={theme.base100}
                                      title={`${s.name} QR`}
                                    />
                                  </QrFrame>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-6">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-6">
            {sizes.map((s) => (
              
                <div className="flex flex-col items-center gap-2">
                  <p className="label-ink">{s.name}</p>
                  <QrFrame>
                    <QRCodeSVG
                      value={SAMPLE_URL}
                      size={s.px}
                      marginSize={2}
                      fgColor={theme.primary}
                      bgColor={theme.base100}
                      title={\`\${s.name} QR\`}
                    />
                  </QrFrame>
                </div>
              
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Theme-aware pigments"
          description="Foreground and background read from CSS variables so codes track the active theme."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                            {colorTokens.map((c) => {
                              const fg = tokenToColor(c.fg, theme)
                              const bg = tokenToColor(c.bg, theme)
                              return (
                                <Sample key={c.name} label={`fg ${c.fg}`}>
                                  <div className="flex flex-col items-center gap-2">
                                    <p className="label-ink">{c.name}</p>
                                    <QrFrame>
                                      <QRCodeSVG
                                        value={SAMPLE_URL}
                                        size={112}
                                        marginSize={2}
                                        fgColor={fg}
                                        bgColor={bg}
                                        title={`${c.name} QR`}
                                      />
                                    </QrFrame>
                                  </div>
                                </Sample>
                              )
                            })}
                          </div>
              </>
            }
            html={`<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {colorTokens.map((c) => {
              const fg = tokenToColor(c.fg, theme)
              const bg = tokenToColor(c.bg, theme)
              return (
                
                  <div className="flex flex-col items-center gap-2">
                    <p className="label-ink">{c.name}</p>
                    <QrFrame>
                      <QRCodeSVG
                        value={SAMPLE_URL}
                        size={112}
                        marginSize={2}
                        fgColor={fg}
                        bgColor={bg}
                        title={\`\${c.name} QR\`}
                      />
                    </QrFrame>
                  </div>
                
              )
            })}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Interactive"
          title="Live payload"
          description="Edit the text or URL. The QR updates as you type."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                            <div className="flex min-w-0 flex-1 flex-col gap-2">
                              <label className="label" htmlFor={payloadId}>
                                <span className="label-text">
                                  Payload
                                  <span
                                    className="text-error align-top text-sm leading-none"
                                    aria-hidden="true"
                                  >
                                    *
                                  </span>
                                </span>
                              </label>
                              <textarea
                                id={payloadId}
                                className="textarea textarea-bordered min-h-28 w-full cursor-text"
                                value={payload}
                                required
                                onChange={(e) => setPayload(e.target.value)}
                                placeholder="https://menzies.design/…"
                              />
                              <p className="text-xs text-ink-muted">
                                Empty payloads fall back to a short studio placeholder so the code
                                stays scannable.
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-col items-start gap-3">
                              <Sample label="QRCodeCanvas · live">
                                <QrFrame>
                                  <QRCodeCanvas
                                    ref={interactiveRef}
                                    value={payload.trim() || 'menzies'}
                                    size={180}
                                    marginSize={2}
                                    fgColor={theme.primary}
                                    bgColor={theme.base100}
                                    title="Interactive QR"
                                  />
                                </QrFrame>
                              </Sample>
                              <DownloadQrButton
                                canvasRef={interactiveRef}
                                filename="menzies-design-qr-live.png"
                              />
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-5 lg:flex-row lg:items-start">
            <div class="flex min-w-0 flex-1 flex-col gap-2">
              <label class="label" for=>
                <span class="label-text">
                  Payload
                  <span
                    class="text-error align-top text-sm leading-none"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </span>
              </label>
              <textarea
                id=
                class="textarea textarea-bordered min-h-28 w-full cursor-text"
                value=
                required
                onChange=
                placeholder="https://menzies.design/…"
              />
              <p class="text-xs text-ink-muted">
                Empty payloads fall back to a short studio placeholder so the code
                stays scannable.
              </p>
            </div>
            <div class="flex shrink-0 flex-col items-start gap-3">
              
                <QrFrame>
                  <QRCodeCanvas
                    ref=
                    value=
                    size=
                    marginSize=
                    fgColor=
                    bgColor=
                    title="Interactive QR"
                  />
                </QrFrame>
              
              <DownloadQrButton
                canvasRef=
                filename="menzies-design-qr-live.png"
              />
            </div>
          </div>`}
            jsx={`<div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label className="label" htmlFor={payloadId}>
                <span className="label-text">
                  Payload
                  <span
                    className="text-error align-top text-sm leading-none"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </span>
              </label>
              <textarea
                id={payloadId}
                className="textarea textarea-bordered min-h-28 w-full cursor-text"
                value={payload}
                required
                onChange={(e) => setPayload(e.target.value)}
                placeholder="https://menzies.design/…"
              />
              <p className="text-xs text-ink-muted">
                Empty payloads fall back to a short studio placeholder so the code
                stays scannable.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3">
              
                <QrFrame>
                  <QRCodeCanvas
                    ref={interactiveRef}
                    value={payload.trim() || 'menzies'}
                    size={180}
                    marginSize={2}
                    fgColor={theme.primary}
                    bgColor={theme.base100}
                    title="Interactive QR"
                  />
                </QrFrame>
              
              <DownloadQrButton
                canvasRef={interactiveRef}
                filename="menzies-design-qr-live.png"
              />
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Studio"
          title="Pigment and session demos"
          description="Sample ids and deep links you might print on a wash plate or session card."
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {studioDemos.map((demo) => (
                              <Sample key={demo.name} label={demo.label}>
                                <div className="flex w-full flex-col gap-3">
                                  <div>
                                    <p className="font-medium">{demo.name}</p>
                                    <p className="mt-1 break-all font-mono text-xs text-ink-muted">
                                      {demo.value}
                                    </p>
                                  </div>
                                  <QrFrame>
                                    <QRCodeSVG
                                      value={demo.value}
                                      size={140}
                                      marginSize={2}
                                      level="M"
                                      fgColor={theme.secondary}
                                      bgColor={theme.base100}
                                      title={demo.name}
                                    />
                                  </QrFrame>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studioDemos.map((demo) => (
              
                <div className="flex w-full flex-col gap-3">
                  <div>
                    <p className="font-medium">{demo.name}</p>
                    <p className="mt-1 break-all font-mono text-xs text-ink-muted">
                      {demo.value}
                    </p>
                  </div>
                  <QrFrame>
                    <QRCodeSVG
                      value={demo.value}
                      size={140}
                      marginSize={2}
                      level="M"
                      fgColor={theme.secondary}
                      bgColor={theme.base100}
                      title={demo.name}
                    />
                  </QrFrame>
                </div>
              
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Download"
          title="Export PNG"
          description="Canvas QR with an icon download control. Useful for stickers and session cards."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4">
                            <Sample label="QRCodeCanvas · PNG">
                              <QrFrame>
                                <QRCodeCanvas
                                  ref={downloadRef}
                                  value={SAMPLE_URL}
                                  size={192}
                                  marginSize={2}
                                  fgColor={theme.baseContent}
                                  bgColor={theme.base100}
                                  title="Downloadable Menzies Design QR"
                                />
                              </QrFrame>
                            </Sample>
                            <DownloadQrButton
                              canvasRef={downloadRef}
                              filename="menzies-design-palette-qr.png"
                            />
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-4">
            
              <QrFrame>
                <QRCodeCanvas
                  ref=
                  value=
                  size=
                  marginSize=
                  fgColor=
                  bgColor=
                  title="Downloadable Menzies Design QR"
                />
              </QrFrame>
            
            <DownloadQrButton
              canvasRef=
              filename="menzies-design-palette-qr.png"
            />
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-4">
            
              <QrFrame>
                <QRCodeCanvas
                  ref={downloadRef}
                  value={SAMPLE_URL}
                  size={192}
                  marginSize={2}
                  fgColor={theme.baseContent}
                  bgColor={theme.base100}
                  title="Downloadable Menzies Design QR"
                />
              </QrFrame>
            
            <DownloadQrButton
              canvasRef={downloadRef}
              filename="menzies-design-palette-qr.png"
            />
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
