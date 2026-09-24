import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Clock } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { useDetailsDropdownPlacement } from '../hooks/useDropdownPlacement'
import {
  DROPDOWN_PANEL_Z,
  dropdownPanelStyle,
} from '../lib/dropdownPlacement'
import {
  DEFAULT_CALENDAR_TIME,
  formatTimeDisplay,
  fromHour12,
  joinTimeParts,
  normalizeTime,
  splitTimeParts,
  toHour12,
  uses12HourClock,
} from '../lib/calendarDate'

export type TimeClockDialProps = {
  /** Controlled `HH:mm` or `HH:mm:ss`. */
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  locale?: string
  size?: 'md' | 'sm'
  disabled?: boolean
  id?: string
  /** Classes on the root details. */
  className?: string
  /** Extra classes on the trigger (e.g. `input-primary`). */
  triggerClassName?: string
  'aria-label'?: string
}

function joinClass(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function angleFromPointer(
  clientX: number,
  clientY: number,
  rect: DOMRect,
): number {
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = clientX - cx
  const dy = clientY - cy
  let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90
  if (deg < 0) deg += 360
  return deg
}

function valueFromAngle(deg: number, steps: number): number {
  const step = 360 / steps
  return Math.round(deg / step) % steps
}

function clockPoint(
  value: number,
  steps: number,
  radius: number,
): { x: number; y: number } {
  const deg = (value / steps) * 360 - 90
  const rad = (deg * Math.PI) / 180
  return {
    x: 100 + Math.cos(rad) * radius,
    y: 100 + Math.sin(rad) * radius,
  }
}

type ClockView = 'hour' | 'minute' | 'second'

/**
 * Analog clock time picker (Material-style): hour → minute → second,
 * with three hands. Hour dial is always a dual-ring 24-hour face
 * (outer 0-11, inner 12-23) so AM/PM can be chosen on the clock.
 * 12-hour locales still show an AM/PM toggle that stays in sync.
 * Value is `HH:mm:ss` (local).
 */
export function TimeClockDial({
  value: valueProp,
  defaultValue = DEFAULT_CALENDAR_TIME,
  onChange,
  locale,
  size = 'md',
  disabled = false,
  id,
  className,
  triggerClassName,
  'aria-label': ariaLabel,
}: TimeClockDialProps) {
  const reactId = useId()
  const rootId = id ?? `wash-time-${reactId}`
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const dialRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const applyDialRef = useRef<(clientX: number, clientY: number) => void>(
    () => undefined,
  )
  const viewRef = useRef<ClockView>('hour')
  const [dragging, setDragging] = useState(false)
  const [view, setView] = useState<ClockView>('hour')
  const [internal, setInternal] = useState(
    () => normalizeTime(defaultValue) ?? DEFAULT_CALENDAR_TIME,
  )

  const resolvedLocale =
    locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
  const compact = size === 'sm'
  const value =
    normalizeTime(valueProp ?? internal) ?? DEFAULT_CALENDAR_TIME

  const setValue = useCallback(
    (next: string) => {
      const normalized = normalizeTime(next) ?? DEFAULT_CALENDAR_TIME
      if (valueProp === undefined) setInternal(normalized)
      onChange?.(normalized)
    },
    [valueProp, onChange],
  )

  const twelveHour = useMemo(
    () => uses12HourClock(resolvedLocale),
    [resolvedLocale],
  )
  const { hour24, minute, second } = splitTimeParts(value)
  const { hour12, period } = toHour12(hour24)

  const { placement, className: dropdownClass, onToggle } =
    useDetailsDropdownPlacement(
      detailsRef,
      {
        panelWidth: compact ? 220 : 248,
        panelHeight: compact ? 320 : 360,
        hover: false,
      },
      false,
    )

  const display = formatTimeDisplay(value, resolvedLocale)

  const commit = useCallback(
    (h: number, m: number, s: number) => {
      setValue(joinTimeParts(h, m, s))
    },
    [setValue],
  )

  const applyDial = useCallback(
    (clientX: number, clientY: number) => {
      const el = dialRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const deg = angleFromPointer(clientX, clientY, rect)
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(clientX - cx, clientY - cy)
      const radius = Math.min(rect.width, rect.height) / 2
      const currentView = viewRef.current

      if (currentView === 'hour') {
        // Dual ring: outer 0-11 (AM), inner 12-23 (PM). Picking a ring
        // updates the 24h value so AM/PM readout and calendar stay in sync.
        const outer = dist > radius * 0.62
        const slot = valueFromAngle(deg, 12)
        const hour = outer ? slot : slot === 0 ? 12 : slot + 12
        commit(hour % 24, minute, second)
        return
      }

      if (currentView === 'minute') {
        commit(hour24, valueFromAngle(deg, 60), second)
        return
      }

      commit(hour24, minute, valueFromAngle(deg, 60))
    },
    [minute, second, hour24, commit],
  )

  applyDialRef.current = applyDial
  viewRef.current = view

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!draggingRef.current) return
      e.preventDefault()
      applyDialRef.current(e.clientX, e.clientY)
    }
    function onUp() {
      if (!draggingRef.current) return
      draggingRef.current = false
      setDragging(false)
      const v = viewRef.current
      if (v === 'hour') setView('minute')
      else if (v === 'minute') setView('second')
    }
    window.addEventListener('pointermove', onMove, { passive: false })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])

  function onDialPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) return
    e.preventDefault()
    draggingRef.current = true
    setDragging(true)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // Capture optional; window listeners still track the drag.
    }
    applyDialRef.current(e.clientX, e.clientY)
  }

  const hourHandAngle =
    ((hour24 % 12) + minute / 60 + second / 3600) * 30
  const minuteHandAngle = (minute + second / 60) * 6
  const secondHandAngle = second * 6

  const dialLabels = useMemo(() => {
    if (view === 'hour') {
      const outer = Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: String(i).padStart(2, '0'),
        ring: 'outer' as const,
      }))
      const inner = Array.from({ length: 12 }, (_, i) => {
        const v = i === 0 ? 12 : i + 12
        return {
          value: v,
          label: String(v).padStart(2, '0'),
          ring: 'inner' as const,
        }
      })
      return [...outer, ...inner]
    }
    return Array.from({ length: 12 }, (_, i) => {
      const n = i * 5
      return {
        value: n,
        label: String(n).padStart(2, '0'),
        ring: 'outer' as const,
      }
    })
  }, [view])

  const activeValue =
    view === 'hour' ? hour24 : view === 'minute' ? minute : second

  const pointerPos =
    view === 'hour'
      ? hour24 >= 12
        ? clockPoint(hour24 - 12, 12, 52)
        : clockPoint(hour24, 12, 72)
      : clockPoint(activeValue, 60, 72)

  const pad2 = (n: number) => String(n).padStart(2, '0')

  return (
    <details
      ref={detailsRef}
      className={joinClass(
        dropdownClass,
        'wash-time w-full dropdown-no-hover',
        disabled && 'wash-time--disabled pointer-events-none opacity-60',
        className,
      )}
      onToggle={(event) => {
        if (disabled) {
          event.currentTarget.open = false
          return
        }
        onToggle(event)
        if (event.currentTarget.open) setView('hour')
      }}
    >
      <summary
        id={rootId}
        className={joinClass(
          'wash-time__trigger input input-bordered flex w-full items-center justify-between gap-2 [&::-webkit-details-marker]:hidden',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          compact && 'input-sm',
          triggerClassName,
        )}
        aria-label={ariaLabel ?? `Time: ${display}`}
        aria-haspopup="dialog"
        aria-disabled={disabled || undefined}
      >
        <span className="min-w-0 truncate font-mono text-sm tabular-nums">
          {display}
        </span>
        <Clock className="size-4 shrink-0 opacity-55" aria-hidden />
      </summary>
      <div
        className={joinClass(
          'dropdown-content wash-time__panel',
          DROPDOWN_PANEL_Z,
          'rounded-box border border-ink-border bg-base-100 shadow-[var(--shadow-paper-md)]',
          placement.top ? 'mb-1' : 'mt-1',
        )}
        style={dropdownPanelStyle(placement) as CSSProperties}
        role="dialog"
        aria-label="Choose time"
      >
        <div className="wash-time__readout" role="group" aria-label="Time parts">
          <button
            type="button"
            className={joinClass(
              'wash-time__part cursor-pointer font-mono',
              view === 'hour' && 'wash-time__part--active',
            )}
            aria-pressed={view === 'hour'}
            onClick={() => setView('hour')}
          >
            {twelveHour ? pad2(hour12) : pad2(hour24)}
          </button>
          <span className="wash-time__sep" aria-hidden>
            :
          </span>
          <button
            type="button"
            className={joinClass(
              'wash-time__part cursor-pointer font-mono',
              view === 'minute' && 'wash-time__part--active',
            )}
            aria-pressed={view === 'minute'}
            onClick={() => setView('minute')}
          >
            {pad2(minute)}
          </button>
          <span className="wash-time__sep" aria-hidden>
            :
          </span>
          <button
            type="button"
            className={joinClass(
              'wash-time__part cursor-pointer font-mono',
              view === 'second' && 'wash-time__part--active',
            )}
            aria-pressed={view === 'second'}
            onClick={() => setView('second')}
          >
            {pad2(second)}
          </button>
          {twelveHour ? (
            <div className="wash-time__ampm join" role="group" aria-label="AM or PM">
              <button
                type="button"
                className={joinClass(
                  'btn btn-xs join-item cursor-pointer',
                  period === 'AM' ? 'btn-primary' : 'btn-ghost',
                )}
                aria-pressed={period === 'AM'}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  commit(fromHour12(hour12, 'AM'), minute, second)
                }}
              >
                AM
              </button>
              <button
                type="button"
                className={joinClass(
                  'btn btn-xs join-item cursor-pointer',
                  period === 'PM' ? 'btn-primary' : 'btn-ghost',
                )}
                aria-pressed={period === 'PM'}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  commit(fromHour12(hour12, 'PM'), minute, second)
                }}
              >
                PM
              </button>
            </div>
          ) : null}
        </div>

        <div
          ref={dialRef}
          className={joinClass(
            'wash-time__dial',
            compact && 'wash-time__dial--sm',
            dragging && 'wash-time__dial--dragging',
          )}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={view === 'hour' ? 23 : 59}
          aria-valuenow={activeValue}
          aria-label={
            view === 'hour'
              ? 'Hour (outer 0-11, inner 12-23)'
              : view === 'minute'
                ? 'Minute'
                : 'Second'
          }
          tabIndex={disabled ? -1 : 0}
          onPointerDown={onDialPointerDown}
        >
          <svg className="wash-time__svg" viewBox="0 0 200 200" aria-hidden>
            <circle className="wash-time__face" cx="100" cy="100" r="96" />
            <line
              className={joinClass(
                'wash-time__hand wash-time__hand--hour',
                view === 'hour' && 'wash-time__hand--active',
              )}
              x1="100"
              y1="100"
              x2={100 + Math.cos(((hourHandAngle - 90) * Math.PI) / 180) * 48}
              y2={100 + Math.sin(((hourHandAngle - 90) * Math.PI) / 180) * 48}
            />
            <line
              className={joinClass(
                'wash-time__hand wash-time__hand--minute',
                view === 'minute' && 'wash-time__hand--active',
              )}
              x1="100"
              y1="100"
              x2={100 + Math.cos(((minuteHandAngle - 90) * Math.PI) / 180) * 68}
              y2={100 + Math.sin(((minuteHandAngle - 90) * Math.PI) / 180) * 68}
            />
            <line
              className={joinClass(
                'wash-time__hand wash-time__hand--second',
                view === 'second' && 'wash-time__hand--active',
              )}
              x1="100"
              y1="100"
              x2={100 + Math.cos(((secondHandAngle - 90) * Math.PI) / 180) * 78}
              y2={100 + Math.sin(((secondHandAngle - 90) * Math.PI) / 180) * 78}
            />
            <line
              className="wash-time__pointer"
              x1="100"
              y1="100"
              x2={pointerPos.x}
              y2={pointerPos.y}
            />
            <circle
              className="wash-time__pointer-knob"
              cx={pointerPos.x}
              cy={pointerPos.y}
              r="11"
            />
            <circle className="wash-time__hub" cx="100" cy="100" r="4" />
          </svg>

          {dialLabels.map((item) => {
            const radius = item.ring === 'inner' ? 52 : 78
            const index =
              view === 'hour'
                ? item.ring === 'outer'
                  ? item.value % 12
                  : item.value === 12
                    ? 0
                    : item.value - 12
                : item.value / 5
            const pos = clockPoint(index, 12, radius)
            const selected =
              view === 'hour'
                ? item.value === hour24
                : activeValue === item.value
            return (
              <span
                key={`${item.ring}-${item.value}`}
                className={joinClass(
                  'wash-time__label font-mono',
                  selected && 'wash-time__label--selected',
                )}
                style={{
                  left: `${(pos.x / 200) * 100}%`,
                  top: `${(pos.y / 200) * 100}%`,
                }}
              >
                {item.label}
              </span>
            )
          })}
        </div>

        <p className="wash-time__hint">
          {view === 'hour'
            ? 'Outer ring 0-11, inner 12-23, then minutes'
            : view === 'minute'
              ? 'Select minute (0-59), then seconds'
              : 'Select second (0-59)'}
        </p>
      </div>
    </details>
  )
}
