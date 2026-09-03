import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  ExternalLink,
  Link2,
  BookOpen,
  Mail,
  Download,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'link-neutral' },
  { name: 'Primary', className: 'link-primary' },
  { name: 'Secondary', className: 'link-secondary' },
  { name: 'Accent', className: 'link-accent' },
  { name: 'Success', className: 'link-success' },
  { name: 'Info', className: 'link-info' },
  { name: 'Warning', className: 'link-warning' },
  { name: 'Error', className: 'link-error' },
] as const

const SHOW_DELAY_MS = 250
const HIDE_DELAY_MS = 180
const LONG_PRESS_MS = 480
const PREVIEW_GAP = 8
const PREVIEW_PAD = 8
const PREVIEW_WIDTH = 288
const PREVIEW_HEIGHT = 220

type WashTone = 'blue' | 'ochre' | 'rose' | 'sage'

const washToneClass: Record<WashTone, string> = {
  blue: 'wash-panel-blue',
  ochre: 'wash-panel-ochre',
  rose: 'wash-panel-rose',
  sage: '',
}

type PreviewPos = { x: number; y: number; top: boolean }

type PreviewLinkProps = {
  href?: string
  className?: string
  children: ReactNode
  title: string
  description: string
  tone?: WashTone
  plateLabel?: string
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
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'link'}
    </code>
  )
}

/** Place preview under the anchor; flip above and shift horizontally to stay in viewport. */
function placePreviewNearAnchor(
  rect: DOMRect,
  width: number,
  height: number,
): PreviewPos {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const spaceBelow = vh - rect.bottom - PREVIEW_PAD
  const spaceAbove = rect.top - PREVIEW_PAD
  const top =
    spaceBelow < Math.min(height, vh * 0.45) && spaceAbove > spaceBelow

  let y = top ? rect.top - height - PREVIEW_GAP : rect.bottom + PREVIEW_GAP
  let x = rect.left

  if (x + width + PREVIEW_PAD > vw) {
    x = rect.right - width
  }
  if (x < PREVIEW_PAD) x = PREVIEW_PAD

  const maxX = Math.max(PREVIEW_PAD, vw - width - PREVIEW_PAD)
  const maxY = Math.max(PREVIEW_PAD, vh - height - PREVIEW_PAD)
  return {
    x: Math.min(Math.max(PREVIEW_PAD, x), maxX),
    y: Math.min(Math.max(PREVIEW_PAD, y), maxY),
    top,
  }
}

function PreviewCard({
  id,
  title,
  description,
  tone = 'blue',
  plateLabel,
  pos,
  cardRef,
  onMouseEnter,
  onMouseLeave,
}: {
  id: string
  title: string
  description: string
  tone?: WashTone
  plateLabel?: string
  pos: PreviewPos
  cardRef: RefObject<HTMLDivElement | null>
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return createPortal(
    <div
      ref={cardRef}
      id={id}
      role="tooltip"
      className={`pointer-events-auto fixed z-[200] w-[min(100vw-1rem,18rem)] max-h-[min(70vh,16rem)] overflow-x-hidden overflow-y-auto wash-panel paper-grain shadow-lg ${washToneClass[tone]} opacity-100 transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        pos.top ? 'origin-bottom' : 'origin-top'
      }`}
      style={{ left: pos.x, top: pos.y }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="relative aspect-[16/9] overflow-hidden border-b border-ink-border/50"
        aria-hidden="true"
      >
        <div
          className={`absolute inset-0 ${
            tone === 'blue'
              ? 'bg-gradient-to-br from-sky-200/90 via-sky-100 to-base-200'
              : tone === 'ochre'
                ? 'bg-gradient-to-br from-amber-200/90 via-orange-100 to-base-200'
                : tone === 'rose'
                  ? 'bg-gradient-to-br from-rose-200/90 via-pink-100 to-base-200'
                  : 'bg-gradient-to-br from-emerald-200/80 via-lime-100 to-base-200'
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_35%,rgba(255,255,255,0.55),transparent_55%)]" />
        <p className="absolute inset-x-0 bottom-2 text-center font-display text-sm font-semibold text-base-content/70">
          {plateLabel ?? title}
        </p>
      </div>
      <div className="p-3">
        <p className="font-display text-sm font-semibold leading-snug">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">{description}</p>
      </div>
    </div>,
    document.body,
  )
}

function PreviewLink({
  href = '#links',
  className = 'link link-primary',
  children,
  title,
  description,
  tone = 'blue',
  plateLabel,
}: PreviewLinkProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const showTimer = useRef<number | null>(null)
  const hideTimer = useRef<number | null>(null)
  const longPressTimer = useRef<number | null>(null)
  const longPressOrigin = useRef<{ x: number; y: number } | null>(null)
  const pinnedRef = useRef(false)
  const openRef = useRef(false)

  const tooltipId = useId()
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [pos, setPos] = useState<PreviewPos | null>(null)

  openRef.current = open
  pinnedRef.current = pinned

  const clearShow = useCallback(() => {
    if (showTimer.current != null) {
      window.clearTimeout(showTimer.current)
      showTimer.current = null
    }
  }, [])

  const clearHide = useCallback(() => {
    if (hideTimer.current != null) {
      window.clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }, [])

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current != null) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    longPressOrigin.current = null
  }, [])

  const measureAndOpen = useCallback(() => {
    const el = anchorRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos(placePreviewNearAnchor(rect, PREVIEW_WIDTH, PREVIEW_HEIGHT))
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    clearShow()
    clearHide()
    clearLongPress()
    pinnedRef.current = false
    setPinned(false)
    setOpen(false)
    setPos(null)
  }, [clearHide, clearLongPress, clearShow])

  const scheduleShow = useCallback(() => {
    clearHide()
    if (openRef.current || pinnedRef.current) return
    clearShow()
    showTimer.current = window.setTimeout(() => {
      showTimer.current = null
      measureAndOpen()
    }, SHOW_DELAY_MS)
  }, [clearHide, clearShow, measureAndOpen])

  const scheduleHide = useCallback(() => {
    if (pinnedRef.current) return
    clearShow()
    clearHide()
    hideTimer.current = window.setTimeout(() => {
      hideTimer.current = null
      setOpen(false)
      setPos(null)
    }, HIDE_DELAY_MS)
  }, [clearHide, clearShow])

  useEffect(() => {
    return () => {
      clearShow()
      clearHide()
      clearLongPress()
    }
  }, [clearHide, clearLongPress, clearShow])

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return

    function update() {
      const el = anchorRef.current
      if (!el) return
      const card = cardRef.current
      const w = card?.offsetWidth ?? PREVIEW_WIDTH
      const h = card?.offsetHeight ?? PREVIEW_HEIGHT
      setPos(placePreviewNearAnchor(el.getBoundingClientRect(), w, h))
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        anchorRef.current?.focus()
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (!pinnedRef.current) return
      const t = event.target
      if (!(t instanceof Node)) return
      if (anchorRef.current?.contains(t) || cardRef.current?.contains(t)) return
      close()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown, true)
    }
  }, [open, close])

  const onMouseEnter = useCallback(() => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      scheduleShow()
    }
  }, [scheduleShow])

  const onMouseLeave = useCallback(() => {
    scheduleHide()
  }, [scheduleHide])

  const onFocus = useCallback(
    (_event: FocusEvent<HTMLAnchorElement>) => {
      scheduleShow()
    },
    [scheduleShow],
  )

  const onBlur = useCallback(
    (event: FocusEvent<HTMLAnchorElement>) => {
      const next = event.relatedTarget
      if (next instanceof Node && cardRef.current?.contains(next)) return
      scheduleHide()
    },
    [scheduleHide],
  )

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLAnchorElement>) => {
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return
      clearLongPress()
      longPressOrigin.current = { x: event.clientX, y: event.clientY }
      longPressTimer.current = window.setTimeout(() => {
        longPressTimer.current = null
        pinnedRef.current = true
        setPinned(true)
        measureAndOpen()
      }, LONG_PRESS_MS)
    },
    [clearLongPress, measureAndOpen],
  )

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLAnchorElement>) => {
      const origin = longPressOrigin.current
      if (!origin) return
      const dx = event.clientX - origin.x
      const dy = event.clientY - origin.y
      if (dx * dx + dy * dy > 36) clearLongPress()
    },
    [clearLongPress],
  )

  const onPointerUp = useCallback(() => {
    clearLongPress()
  }, [clearLongPress])

  const onPointerCancel = useCallback(() => {
    clearLongPress()
  }, [clearLongPress])

  const onClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      const coarse =
        typeof window !== 'undefined' &&
        window.matchMedia('(hover: none), (pointer: coarse)').matches
      if (!coarse) return

      // Touch/coarse: tap pins (or unpins) instead of relying on hover.
      event.preventDefault()
      if (pinnedRef.current && openRef.current) {
        close()
        return
      }
      clearShow()
      clearHide()
      pinnedRef.current = true
      setPinned(true)
      measureAndOpen()
    },
    [clearHide, clearShow, close, measureAndOpen],
  )

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLAnchorElement>) => {
      if (event.key === 'Escape' && openRef.current) {
        event.preventDefault()
        close()
      }
    },
    [close],
  )

  return (
    <>
      <a
        ref={anchorRef}
        href={href}
        className={`${className} cursor-pointer`.trim()}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {children}
      </a>
      {open && pos ? (
        <PreviewCard
          id={tooltipId}
          title={title}
          description={description}
          tone={tone}
          plateLabel={plateLabel}
          pos={pos}
          cardRef={cardRef}
          onMouseEnter={() => {
            clearHide()
          }}
          onMouseLeave={scheduleHide}
        />
      ) : null}
    </>
  )
}

const previewSamples = [
  {
    label: 'Ultramarine study',
    title: 'Ultramarine study',
    description: 'Cool wash notes for glazing skies. Soft edges, low contrast bloom',
    tone: 'blue' as const,
    className: 'link link-primary',
    plateLabel: 'Cerulean plate',
  },
  {
    label: 'Ochre ledger',
    title: 'Ochre ledger',
    description: 'Raw sienna mixes and drying times for warm underpainting layers',
    tone: 'ochre' as const,
    className: 'link link-warning',
    plateLabel: 'Raw sienna',
  },
  {
    label: 'Rose madder glaze',
    title: 'Rose madder glaze',
    description: 'Transparent pinks for florals. Keep the paper white for sparkle',
    tone: 'rose' as const,
    className: 'link link-secondary',
    plateLabel: 'Rose wash',
  },
  {
    label: 'Sap green meadow',
    title: 'Sap green meadow',
    description: 'Field greens with a touch of ochre. Avoid muddy mid-tones',
    tone: 'sage' as const,
    className: 'link link-success',
    plateLabel: 'Sap green',
  },
] as const

export default function LinksPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Links
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">link</span> color
          and hover style.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base link"
          description="Tailwind resets anchors; add link to restore underline"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-end gap-6">
                          <div className="flex flex-col items-start gap-2">
                            <a href="#links" className="link cursor-pointer">
                              Click me
                            </a>
                            <ClassLabel value="link" />
                          </div>
                          <div className="flex flex-col items-start gap-2">
                            <p className="max-w-md text-sm text-ink-muted">
                              Tailwind CSS resets the style of links by default. Add{' '}
                              <span className="font-mono text-xs">link</span> to make it look
                              like a{' '}
                              <a href="#links" className="link cursor-pointer">
                                normal link
                              </a>{' '}
                              again.
                            </p>
                            <ClassLabel value="link (inline)" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-6">
            <div class="flex flex-col items-start gap-2">
              <a href="#links" class="link cursor-pointer">
                Click me
              </a>
              <!-- ClassLabel -->
            </div>
            <div class="flex flex-col items-start gap-2">
              <p class="max-w-md text-sm text-ink-muted">
                Tailwind CSS resets the style of links by default. Add{' '}
                <span class="font-mono text-xs">link</span> to make it look
                like a{' '}
                <a href="#links" class="link cursor-pointer">
                  normal link
                </a>{' '}
                again.
              </p>
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-6">
            <div className="flex flex-col items-start gap-2">
              <a href="#links" className="link cursor-pointer">
                Click me
              </a>
              <ClassLabel value="link" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="max-w-md text-sm text-ink-muted">
                Tailwind CSS resets the style of links by default. Add{' '}
                <span className="font-mono text-xs">link</span> to make it look
                like a{' '}
                <a href="#links" className="link cursor-pointer">
                  normal link
                </a>{' '}
                again.
              </p>
              <ClassLabel value="link (inline)" />
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="Default ink plus neutral, brand, and status link colors"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-end gap-4">
                          {colors.map((c) => (
                            <div key={c.name} className="flex flex-col items-center gap-2">
                              <a
                                href="#links"
                                className={`link cursor-pointer ${c.className}`}
                              >
                                {c.name}
                              </a>
                              <ClassLabel
                                value={c.className ? `link ${c.className}` : 'link'}
                              />
                            </div>
                          ))}
                        </div>
            
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-4">
            {colors.map((c) => (
              <div key= class="flex flex-col items-center gap-2">
                <a
                  href="#links"
                  class=
                >
                  
                </a>
                <!-- ClassLabel -->
              </div>
            ))}
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-4">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <a
                  href="#links"
                  className={\`link cursor-pointer \${c.className}\`}
                >
                  {c.name}
                </a>
                <ClassLabel
                  value={c.className ? \`link \${c.className}\` : 'link'}
                />
              </div>
            ))}
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="03 · Style"
          title="Hover underline"
          description="link-hover shows the underline only on hover"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-end gap-6">
                          <div className="flex flex-col items-center gap-2">
                            <a href="#links" className="link link-hover cursor-pointer">
                              Hover me
                            </a>
                            <ClassLabel value="link link-hover" />
                          </div>
                          {colors.slice(1, 5).map((c) => (
                            <div key={`hover-${c.name}`} className="flex flex-col items-center gap-2">
                              <a
                                href="#links"
                                className={`link link-hover cursor-pointer ${c.className}`}
                              >
                                {c.name}
                              </a>
                              <ClassLabel value={`link link-hover ${c.className}`} />
                            </div>
                          ))}
                        </div>
            
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-6">
            <div class="flex flex-col items-center gap-2">
              <a href="#links" class="link link-hover cursor-pointer">
                Hover me
              </a>
              <!-- ClassLabel -->
            </div>
            {colors.slice(1, 5).map((c) => (
              <div key= class="flex flex-col items-center gap-2">
                <a
                  href="#links"
                  class=
                >
                  
                </a>
                <!-- ClassLabel -->
              </div>
            ))}
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-6">
            <div className="flex flex-col items-center gap-2">
              <a href="#links" className="link link-hover cursor-pointer">
                Hover me
              </a>
              <ClassLabel value="link link-hover" />
            </div>
            {colors.slice(1, 5).map((c) => (
              <div key={\`hover-\${c.name}\`} className="flex flex-col items-center gap-2">
                <a
                  href="#links"
                  className={\`link link-hover cursor-pointer \${c.className}\`}
                >
                  {c.name}
                </a>
                <ClassLabel value={\`link link-hover \${c.className}\`} />
              </div>
            ))}
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="04 · Color × hover"
          title="Hover with every color"
          description="link-hover paired with each semantic color"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-end gap-4">
                          {colors.map((c) => (
                            <div key={`matrix-${c.name}`} className="flex flex-col items-center gap-2">
                              <a
                                href="#links"
                                className={`link link-hover cursor-pointer ${c.className}`}
                              >
                                {c.name}
                              </a>
                              <ClassLabel
                                value={
                                  c.className
                                    ? `link link-hover ${c.className}`
                                    : 'link link-hover'
                                }
                              />
                            </div>
                          ))}
                        </div>
            
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-4">
            {colors.map((c) => (
              <div key= class="flex flex-col items-center gap-2">
                <a
                  href="#links"
                  class=
                >
                  
                </a>
                <!-- ClassLabel -->
              </div>
            ))}
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-4">
            {colors.map((c) => (
              <div key={\`matrix-\${c.name}\`} className="flex flex-col items-center gap-2">
                <a
                  href="#links"
                  className={\`link link-hover cursor-pointer \${c.className}\`}
                >
                  {c.name}
                </a>
                <ClassLabel
                  value={
                    c.className
                      ? \`link link-hover \${c.className}\`
                      : 'link link-hover'
                  }
                />
              </div>
            ))}
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="05 · With icons"
          title="Icon + label"
          description="Leading and trailing Lucide marks on colored links"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-center gap-6">
                          <div className="flex flex-col items-start gap-2">
                            <a
                              href="#links"
                              className="link link-primary inline-flex cursor-pointer items-center gap-1.5"
                            >
                              <BookOpen className="size-4" strokeWidth={1.75} />
                              Studio notes
                            </a>
                            <ClassLabel value="link link-primary" />
                          </div>
                          <div className="flex flex-col items-start gap-2">
                            <a
                              href="#links"
                              className="link link-secondary inline-flex cursor-pointer items-center gap-1.5"
                            >
                              <Mail className="size-4" strokeWidth={1.75} />
                              Write curator
                            </a>
                            <ClassLabel value="link link-secondary" />
                          </div>
                          <div className="flex flex-col items-start gap-2">
                            <a
                              href="#links"
                              className="link link-accent link-hover inline-flex cursor-pointer items-center gap-1.5"
                            >
                              Continue
                              <ArrowRight className="size-4" strokeWidth={1.75} />
                            </a>
                            <ClassLabel value="link link-accent link-hover" />
                          </div>
                          <div className="flex flex-col items-start gap-2">
                            <a
                              href="#links"
                              className="link link-info inline-flex cursor-pointer items-center gap-1.5"
                            >
                              External plate
                              <ExternalLink className="size-4" strokeWidth={1.75} />
                            </a>
                            <ClassLabel value="link link-info" />
                          </div>
                          <div className="flex flex-col items-start gap-2">
                            <a
                              href="#links"
                              className="link link-success inline-flex cursor-pointer items-center gap-1.5"
                            >
                              <Download className="size-4" strokeWidth={1.75} />
                              Export wash
                            </a>
                            <ClassLabel value="link link-success" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="flex flex-wrap items-center gap-6">
            <div class="flex flex-col items-start gap-2">
              <a
                href="#links"
                class="link link-primary inline-flex cursor-pointer items-center gap-1.5"
              >
                <!-- BookOpen -->
                Studio notes
              </a>
              <!-- ClassLabel -->
            </div>
            <div class="flex flex-col items-start gap-2">
              <a
                href="#links"
                class="link link-secondary inline-flex cursor-pointer items-center gap-1.5"
              >
                <!-- Mail -->
                Write curator
              </a>
              <!-- ClassLabel -->
            </div>
            <div class="flex flex-col items-start gap-2">
              <a
                href="#links"
                class="link link-accent link-hover inline-flex cursor-pointer items-center gap-1.5"
              >
                Continue
                <!-- ArrowRight -->
              </a>
              <!-- ClassLabel -->
            </div>
            <div class="flex flex-col items-start gap-2">
              <a
                href="#links"
                class="link link-info inline-flex cursor-pointer items-center gap-1.5"
              >
                External plate
                <!-- ExternalLink -->
              </a>
              <!-- ClassLabel -->
            </div>
            <div class="flex flex-col items-start gap-2">
              <a
                href="#links"
                class="link link-success inline-flex cursor-pointer items-center gap-1.5"
              >
                <!-- Download -->
                Export wash
              </a>
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-start gap-2">
              <a
                href="#links"
                className="link link-primary inline-flex cursor-pointer items-center gap-1.5"
              >
                <BookOpen className="size-4" strokeWidth={1.75} />
                Studio notes
              </a>
              <ClassLabel value="link link-primary" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <a
                href="#links"
                className="link link-secondary inline-flex cursor-pointer items-center gap-1.5"
              >
                <Mail className="size-4" strokeWidth={1.75} />
                Write curator
              </a>
              <ClassLabel value="link link-secondary" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <a
                href="#links"
                className="link link-accent link-hover inline-flex cursor-pointer items-center gap-1.5"
              >
                Continue
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </a>
              <ClassLabel value="link link-accent link-hover" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <a
                href="#links"
                className="link link-info inline-flex cursor-pointer items-center gap-1.5"
              >
                External plate
                <ExternalLink className="size-4" strokeWidth={1.75} />
              </a>
              <ClassLabel value="link link-info" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <a
                href="#links"
                className="link link-success inline-flex cursor-pointer items-center gap-1.5"
              >
                <Download className="size-4" strokeWidth={1.75} />
                Export wash
              </a>
              <ClassLabel value="link link-success" />
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="06 · Element types"
          title="Anchor and button"
          description="link on &lt;a&gt; and &lt;button&gt;; btn-link for button-as-link"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-end gap-6">
                          <div className="flex flex-col items-center gap-2">
                            <a href="#links" className="link link-primary cursor-pointer">
                              &lt;a class=&quot;link&quot;&gt;
                            </a>
                            <ClassLabel value="a.link" />
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <button
                              type="button"
                              className="link link-secondary cursor-pointer bg-transparent border-0 p-0"
                            >
                              &lt;button class=&quot;link&quot;&gt;
                            </button>
                            <ClassLabel value="button.link" />
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <button type="button" className="btn btn-link btn-primary cursor-pointer">
                              btn btn-link
                            </button>
                            <ClassLabel value="btn btn-link btn-primary" />
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <button
                              type="button"
                              className="btn btn-link btn-error cursor-pointer"
                            >
                              <Link2 className="size-4" strokeWidth={1.75} />
                              Revoke link
                            </button>
                            <ClassLabel value="btn btn-link btn-error" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-6">
            <div class="flex flex-col items-center gap-2">
              <a href="#links" class="link link-primary cursor-pointer">
                &lt;a class=&quot;link&quot;&gt;
              </a>
              <!-- ClassLabel -->
            </div>
            <div class="flex flex-col items-center gap-2">
              <button
                type="button"
                class="link link-secondary cursor-pointer bg-transparent border-0 p-0"
              >
                &lt;button class=&quot;link&quot;&gt;
              </button>
              <!-- ClassLabel -->
            </div>
            <div class="flex flex-col items-center gap-2">
              <button type="button" class="btn btn-link btn-primary cursor-pointer">
                btn btn-link
              </button>
              <!-- ClassLabel -->
            </div>
            <div class="flex flex-col items-center gap-2">
              <button
                type="button"
                class="btn btn-link btn-error cursor-pointer"
              >
                <!-- Link2 -->
                Revoke link
              </button>
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-6">
            <div className="flex flex-col items-center gap-2">
              <a href="#links" className="link link-primary cursor-pointer">
                &lt;a class=&quot;link&quot;&gt;
              </a>
              <ClassLabel value="a.link" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                className="link link-secondary cursor-pointer bg-transparent border-0 p-0"
              >
                &lt;button class=&quot;link&quot;&gt;
              </button>
              <ClassLabel value="button.link" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <button type="button" className="btn btn-link btn-primary cursor-pointer">
                btn btn-link
              </button>
              <ClassLabel value="btn btn-link btn-primary" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                className="btn btn-link btn-error cursor-pointer"
              >
                <Link2 className="size-4" strokeWidth={1.75} />
                Revoke link
              </button>
              <ClassLabel value="btn btn-link btn-error" />
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="07 · In prose"
          title="Paragraph context"
          description="Colored links nested in studio copy"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="space-y-4 text-sm leading-relaxed md:text-base">
                          <p>
                            Mix a cool wash with{' '}
                            <a href="#links" className="link link-primary cursor-pointer">
                              ultramarine
                            </a>{' '}
                            and a touch of{' '}
                            <a href="#links" className="link link-accent cursor-pointer">
                              rose madder
                            </a>
                            . Keep edges soft unless you need a dry-brush edge.
                          </p>
                          <p className="text-ink-muted">
                            See also the{' '}
                            <a href="#links" className="link link-hover link-info cursor-pointer">
                              pigment ledger
                            </a>{' '}
                            and{' '}
                            <a href="#links" className="link link-hover link-warning cursor-pointer">
                              drying queue
                            </a>
                            .
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <ClassLabel value="link link-primary" />
                            <ClassLabel value="link link-hover link-info" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="space-y-4 text-sm leading-relaxed md:text-base">
            <p>
              Mix a cool wash with{' '}
              <a href="#links" class="link link-primary cursor-pointer">
                ultramarine
              </a>{' '}
              and a touch of{' '}
              <a href="#links" class="link link-accent cursor-pointer">
                rose madder
              </a>
              . Keep edges soft unless you need a dry-brush edge.
            </p>
            <p class="text-ink-muted">
              See also the{' '}
              <a href="#links" class="link link-hover link-info cursor-pointer">
                pigment ledger
              </a>{' '}
              and{' '}
              <a href="#links" class="link link-hover link-warning cursor-pointer">
                drying queue
              </a>
              .
            </p>
            <div class="flex flex-wrap gap-4">
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="space-y-4 text-sm leading-relaxed md:text-base">
            <p>
              Mix a cool wash with{' '}
              <a href="#links" className="link link-primary cursor-pointer">
                ultramarine
              </a>{' '}
              and a touch of{' '}
              <a href="#links" className="link link-accent cursor-pointer">
                rose madder
              </a>
              . Keep edges soft unless you need a dry-brush edge.
            </p>
            <p className="text-ink-muted">
              See also the{' '}
              <a href="#links" className="link link-hover link-info cursor-pointer">
                pigment ledger
              </a>{' '}
              and{' '}
              <a href="#links" className="link link-hover link-warning cursor-pointer">
                drying queue
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-4">
              <ClassLabel value="link link-primary" />
              <ClassLabel value="link link-hover link-info" />
            </div>
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="08 · Hover preview"
          title="Link preview card"
          description="Hover or focus a link for a delayed wash preview"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="space-y-5">
                          <p className="text-sm leading-relaxed text-ink-muted md:text-base">
                            Browse the studio catalog:{' '}
                            {previewSamples.map((sample, index) => (
                              <span key={sample.label}>
                                {index > 0 ? (index === previewSamples.length - 1 ? ', and ' : ', ') : null}
                                <PreviewLink
                                  className={sample.className}
                                  title={sample.title}
                                  description={sample.description}
                                  tone={sample.tone}
                                  plateLabel={sample.plateLabel}
                                >
                                  {sample.label}
                                </PreviewLink>
                              </span>
                            ))}
                            .
                          </p>
                          <ul className="flex flex-wrap gap-x-6 gap-y-4">
                            {previewSamples.map((sample) => (
                              <li key={`card-${sample.label}`} className="flex flex-col items-start gap-2">
                                <PreviewLink
                                  className={`${sample.className} link-hover`}
                                  title={sample.title}
                                  description={sample.description}
                                  tone={sample.tone}
                                  plateLabel={sample.plateLabel}
                                >
                                  {sample.label}
                                </PreviewLink>
                                <ClassLabel value="link + portal preview" />
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-4">
                            <ClassLabel value="show ~250ms · hide ~180ms" />
                            <ClassLabel value="fixed + createPortal(body)" />
                            <ClassLabel value="Escape dismiss · motion-reduce" />
                          </div>
                        </div>
            
              </>
            }
            html={`<div class="space-y-5">
            <p class="text-sm leading-relaxed text-ink-muted md:text-base">
              Browse the studio catalog:{' '}
              {previewSamples.map((sample, index) => (
                <span key=>
                  {index > 0 ? (index === previewSamples.length - 1 ? ', and ' : ', ') : null}
                  <!-- PreviewLink -->
                </span>
              ))}
              .
            </p>
            <ul class="flex flex-wrap gap-x-6 gap-y-4">
              {previewSamples.map((sample) => (
                <li key= class="flex flex-col items-start gap-2">
                  <!-- PreviewLink -->
                  <!-- ClassLabel -->
                </li>
              ))}
            </ul>
            <div class="flex flex-wrap gap-4">
              <!-- ClassLabel -->
            </div>
          </div>`}
            jsx={`<div className="space-y-5">
            <p className="text-sm leading-relaxed text-ink-muted md:text-base">
              Browse the studio catalog:{' '}
              {previewSamples.map((sample, index) => (
                <span key={sample.label}>
                  {index > 0 ? (index === previewSamples.length - 1 ? ', and ' : ', ') : null}
                  <PreviewLink
                    className={sample.className}
                    title={sample.title}
                    description={sample.description}
                    tone={sample.tone}
                    plateLabel={sample.plateLabel}
                  >
                    {sample.label}
                  </PreviewLink>
                </span>
              ))}
              .
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-4">
              {previewSamples.map((sample) => (
                <li key={\`card-\${sample.label}\`} className="flex flex-col items-start gap-2">
                  <PreviewLink
                    className={\`\${sample.className} link-hover\`}
                    title={sample.title}
                    description={sample.description}
                    tone={sample.tone}
                    plateLabel={sample.plateLabel}
                  >
                    {sample.label}
                  </PreviewLink>
                  <ClassLabel value="link + portal preview" />
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <ClassLabel value="show ~250ms · hide ~180ms" />
              <ClassLabel value="fixed + createPortal(body)" />
              <ClassLabel value="Escape dismiss · motion-reduce" />
            </div>
          </div>`}
          />
        
        </Section>
      </div>
    </>
  )
}
