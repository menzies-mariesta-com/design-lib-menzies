import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { usePrefersReducedMotion } from '../hooks/useRipple'
import {
  clamp,
  hexToHsl,
  hslToHex,
  hslToRgb,
  normalizeHex,
} from './colorMath'

export type ColorPickerWheelProps = {
  value: string
  onChange: (hex: string) => void
  disabled?: boolean
  className?: string
  size?: number
  showHexInput?: boolean
  showSwatch?: boolean
  'aria-label'?: string
}

type DragTarget = 'hue' | 'sl' | null

const DEFAULT_SIZE = 200

function wheelMetrics(size: number) {
  const ringWidth = Math.max(10, Math.round(size * 0.12))
  const outerRadius = size / 2 - 2
  const innerRadius = outerRadius - ringWidth
  const slSize = Math.round(innerRadius * 1.65)
  return { ringWidth, outerRadius, innerRadius, slSize }
}

function drawHueWheel(
  ctx: CanvasRenderingContext2D,
  size: number,
  metrics: ReturnType<typeof wheelMetrics>,
) {
  const { outerRadius, innerRadius } = metrics
  const center = size / 2
  const image = ctx.createImageData(size, size)
  const data = image.data
  const outerSq = outerRadius * outerRadius
  const innerSq = innerRadius * innerRadius

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = x - center + 0.5
      const dy = y - center + 0.5
      const distSq = dx * dx + dy * dy
      const index = (y * size + x) * 4
      if (distSq > outerSq || distSq < innerSq) {
        data[index + 3] = 0
        continue
      }
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      const hue = (angle + 360) % 360
      const { r, g, b } = hslToRgb(hue, 100, 50)
      data[index] = r
      data[index + 1] = g
      data[index + 2] = b
      data[index + 3] = 255
    }
  }

  ctx.clearRect(0, 0, size, size)
  ctx.putImageData(image, 0, 0)
}

function drawSlSquare(
  ctx: CanvasRenderingContext2D,
  size: number,
  hue: number,
) {
  const image = ctx.createImageData(size, size)
  const data = image.data

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const s = (x / (size - 1)) * 100
      const l = 100 - (y / (size - 1)) * 100
      const { r, g, b } = hslToRgb(hue, s, l)
      const index = (y * size + x) * 4
      data[index] = r
      data[index + 1] = g
      data[index + 2] = b
      data[index + 3] = 255
    }
  }

  ctx.clearRect(0, 0, size, size)
  ctx.putImageData(image, 0, 0)
}

function pointerHue(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  metrics: ReturnType<typeof wheelMetrics>,
): number | null {
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const x = clientX - rect.left - centerX
  const y = clientY - rect.top - centerY
  const dist = Math.hypot(x, y)
  const { outerRadius, innerRadius } = metrics
  if (dist < innerRadius || dist > outerRadius) return null
  return (Math.atan2(y, x) * 180) / Math.PI
}

function pointerSl(
  clientX: number,
  clientY: number,
  rect: DOMRect,
): { s: number; l: number } {
  const x = clamp(clientX - rect.left, 0, rect.width)
  const y = clamp(clientY - rect.top, 0, rect.height)
  return {
    s: (x / rect.width) * 100,
    l: 100 - (y / rect.height) * 100,
  }
}

export function ColorPickerWheel({
  value,
  onChange,
  disabled = false,
  className,
  size = DEFAULT_SIZE,
  showHexInput = false,
  showSwatch = true,
  'aria-label': ariaLabel = 'Color picker',
}: ColorPickerWheelProps) {
  const wheelRef = useRef<HTMLCanvasElement>(null)
  const slRef = useRef<HTMLCanvasElement>(null)
  const wheelWrapRef = useRef<HTMLDivElement>(null)
  const slWrapRef = useRef<HTMLDivElement>(null)
  const dragTargetRef = useRef<DragTarget>(null)
  const hexInputId = useId()
  const reducedMotion = usePrefersReducedMotion()

  const normalizedValue = useMemo(() => normalizeHex(value) ?? '#888888', [value])
  const hsl = useMemo(() => hexToHsl(normalizedValue) ?? { h: 0, s: 50, l: 50 }, [normalizedValue])
  const metrics = useMemo(() => wheelMetrics(size), [size])

  const [hexDraft, setHexDraft] = useState(normalizedValue)

  useEffect(() => {
    setHexDraft(normalizedValue)
  }, [normalizedValue])

  useEffect(() => {
    const canvas = wheelRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawHueWheel(ctx, size, metrics)
  }, [metrics, size])

  useEffect(() => {
    const canvas = slRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawSlSquare(ctx, metrics.slSize, hsl.h)
  }, [hsl.h, metrics.slSize])

  const emitHsl = useCallback(
    (next: { h?: number; s?: number; l?: number }) => {
      if (disabled) return
      const hex = hslToHex(
        next.h ?? hsl.h,
        next.s ?? hsl.s,
        next.l ?? hsl.l,
      )
      onChange(hex)
    },
    [disabled, hsl.h, hsl.l, hsl.s, onChange],
  )

  const handleWheelPointer = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      if (disabled) return
      const rect = event.currentTarget.getBoundingClientRect()
      const hue = pointerHue(event.clientX, event.clientY, rect, metrics)
      if (hue == null) return
      emitHsl({ h: (hue + 360) % 360 })
    },
    [disabled, emitHsl, metrics],
  )

  const handleSlPointer = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      if (disabled) return
      const rect = event.currentTarget.getBoundingClientRect()
      const { s, l } = pointerSl(event.clientX, event.clientY, rect)
      emitHsl({ s, l })
    },
    [disabled, emitHsl],
  )

  const beginDrag = useCallback(
    (target: DragTarget, event: ReactPointerEvent<HTMLCanvasElement>) => {
      if (disabled) return
      dragTargetRef.current = target
      event.currentTarget.setPointerCapture(event.pointerId)
      if (target === 'hue') handleWheelPointer(event)
      else handleSlPointer(event)
    },
    [disabled, handleSlPointer, handleWheelPointer],
  )

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      const target = dragTargetRef.current
      if (!target) return
      if (target === 'hue') handleWheelPointer(event)
      else handleSlPointer(event)
    },
    [handleSlPointer, handleWheelPointer],
  )

  const endDrag = useCallback((event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (dragTargetRef.current) {
      dragTargetRef.current = null
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      const step = event.shiftKey ? 5 : 1
      let handled = true
      switch (event.key) {
        case 'ArrowLeft':
          emitHsl({ s: clamp(hsl.s - step, 0, 100) })
          break
        case 'ArrowRight':
          emitHsl({ s: clamp(hsl.s + step, 0, 100) })
          break
        case 'ArrowUp':
          emitHsl({ l: clamp(hsl.l + step, 0, 100) })
          break
        case 'ArrowDown':
          emitHsl({ l: clamp(hsl.l - step, 0, 100) })
          break
        case 'PageUp':
          emitHsl({ h: (hsl.h + 15) % 360 })
          break
        case 'PageDown':
          emitHsl({ h: (hsl.h + 345) % 360 })
          break
        default:
          handled = false
      }
      if (handled) event.preventDefault()
    },
    [disabled, emitHsl, hsl.h, hsl.l, hsl.s],
  )

  const hueAngle = (hsl.h * Math.PI) / 180
  const hueMarkerRadius = (metrics.innerRadius + metrics.outerRadius) / 2
  const hueMarkerX = size / 2 + Math.cos(hueAngle) * hueMarkerRadius
  const hueMarkerY = size / 2 + Math.sin(hueAngle) * hueMarkerRadius
  const slMarkerX = (hsl.s / 100) * metrics.slSize
  const slMarkerY = (1 - hsl.l / 100) * metrics.slSize

  return (
    <div
      className={[
        'inline-flex max-w-full flex-col items-center gap-2',
        disabled ? 'cursor-not-allowed opacity-60' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        ref={wheelWrapRef}
        className={[
          'relative touch-none select-none rounded-full',
          disabled ? 'pointer-events-none' : '',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ width: size, height: size }}
        tabIndex={disabled ? -1 : 0}
        role="group"
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        onKeyDown={onKeyDown}
      >
        <canvas
          ref={wheelRef}
          width={size}
          height={size}
          className={[
            'block rounded-full border border-ink-border/70 bg-base-100 shadow-sm',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          ].join(' ')}
          aria-hidden="true"
          onPointerDown={(event) => beginDrag('hue', event)}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        />

        <div
          ref={slWrapRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: metrics.slSize, height: metrics.slSize }}
        >
          <canvas
            ref={slRef}
            width={metrics.slSize}
            height={metrics.slSize}
            className={[
              'pointer-events-auto block rounded-box border border-ink-border/80 shadow-inner',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
            aria-hidden="true"
            onPointerDown={(event) => beginDrag('sl', event)}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          />

          <span
            className={[
              'pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-base-100 shadow',
              reducedMotion ? '' : 'transition-transform duration-75',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              left: slMarkerX,
              top: slMarkerY,
              backgroundColor: normalizedValue,
            }}
            aria-hidden="true"
          />
        </div>

        <span
          className={[
            'pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-base-100 shadow',
            reducedMotion ? '' : 'transition-transform duration-75',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            left: hueMarkerX,
            top: hueMarkerY,
            backgroundColor: hslToHex(hsl.h, 100, 50),
          }}
          aria-hidden="true"
        />
      </div>

      {(showSwatch || showHexInput) && (
        <div className="flex w-full max-w-xs items-center gap-2">
          {showSwatch ? (
            <span
              className="size-9 shrink-0 rounded-box border border-ink-border shadow-sm"
              style={{ backgroundColor: normalizedValue }}
              aria-hidden="true"
            />
          ) : null}
          {showHexInput ? (
            <label className="form-control min-w-0 flex-1 cursor-default" htmlFor={hexInputId}>
              <span className="sr-only">Hex color</span>
              <input
                id={hexInputId}
                type="text"
                className="input input-bordered input-sm w-full font-mono cursor-text"
                value={hexDraft}
                spellCheck={false}
                disabled={disabled}
                aria-label="Hex color value"
                onChange={(event) => {
                  const next = event.target.value
                  setHexDraft(next)
                  const normalized = normalizeHex(next)
                  if (normalized) onChange(normalized)
                }}
                onBlur={() => {
                  const normalized = normalizeHex(hexDraft)
                  if (normalized) {
                    onChange(normalized)
                    setHexDraft(normalized)
                    return
                  }
                  setHexDraft(normalizedValue)
                }}
              />
            </label>
          ) : null}
        </div>
      )}
    </div>
  )
}

export {
  normalizeHex as normalizeColorHex,
  hexToHsl,
  hslToHex,
} from './colorMath'
