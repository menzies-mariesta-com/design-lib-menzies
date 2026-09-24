import {
  forwardRef,
  useEffect,
  useRef,
  type DialogHTMLAttributes,
  type ReactNode,
} from 'react'
import { useFocusTrap, useWashId } from '../a11y'
import { Button } from './Button'

export type DialogProps = Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  'open' | 'title'
> & {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  tone?: 'primary' | 'secondary' | 'error'
  actions?: ReactNode
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  function Dialog(
    {
      open,
      onClose,
      title,
      description,
      children,
      tone = 'primary',
      actions,
      className,
      ...rest
    },
    ref,
  ) {
    const innerRef = useRef<HTMLDialogElement | null>(null)
    const titleId = useWashId('dialog-title')
    const descId = useWashId('dialog-desc')
    const boxRef = useRef<HTMLDivElement>(null)

    useFocusTrap(open, boxRef)

    useEffect(() => {
      const el = innerRef.current
      if (!el) return
      if (open) {
        if (!el.open) el.showModal()
      } else if (el.open) {
        el.close()
      }
    }, [open])

    const titleTone =
      tone === 'error'
        ? 'text-error'
        : tone === 'secondary'
          ? 'text-secondary'
          : 'text-primary'

    return (
      <dialog
        ref={(node) => {
          innerRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={['modal', className].filter(Boolean).join(' ')}
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        onClose={onClose}
        onCancel={(e) => {
          e.preventDefault()
          onClose()
        }}
        {...rest}
      >
        <div
          ref={boxRef}
          className="modal-box flex max-h-[min(90vh,40rem)] flex-col border border-ink-border bg-base-100 p-0"
          role="document"
        >
          <div className="shrink-0 px-4 pt-4 pb-3">
            <h2 id={titleId} className={`card-title font-bold ${titleTone}`}>
              {title}
            </h2>
            {description ? (
              <p id={descId} className="mt-0.5 text-xs text-ink-muted">
                {description}
              </p>
            ) : null}
          </div>
          {children ? (
            <>
              <div className="shrink-0 border-t border-base-300" role="separator" />
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
                {children}
              </div>
            </>
          ) : null}
          <div className="shrink-0 border-t border-base-300" role="separator" />
          <div className="modal-action mt-0 shrink-0 px-4 py-3">
            {actions ?? (
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onSubmit={(e) => {
            e.preventDefault()
            onClose()
          }}
        >
          <button type="submit" className="cursor-pointer" aria-label="Close">
            close
          </button>
        </form>
      </dialog>
    )
  },
)
