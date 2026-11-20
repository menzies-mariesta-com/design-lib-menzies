import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import {
  Dialog as UiDialog,
  DialogBackdrop as UiDialogBackdrop,
  DialogClose as UiDialogClose,
  DialogContent as UiDialogContent,
  DialogDescription as UiDialogDescription,
  DialogTitle as UiDialogTitle,
} from '@ui-sdk/react/dialog'
import { useWashId } from '../a11y'
import { Button } from './Button'

export type DialogProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  tone?: 'primary' | 'secondary' | 'error'
  actions?: ReactNode
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
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
    const titleId = useWashId('dialog-title')
    const descId = useWashId('dialog-desc')

    const titleTone =
      tone === 'error'
        ? 'text-error'
        : tone === 'secondary'
          ? 'text-secondary'
          : 'text-primary'

    return (
      <UiDialog
        open={open}
        onOpenChange={(next) => {
          if (!next) onClose()
        }}
      >
        <UiDialogBackdrop />
        <UiDialogContent
          ref={(node) => {
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          className={['modal-box flex max-h-[min(90vh,40rem)] flex-col border border-ink-border bg-base-100 p-0', className]
            .filter(Boolean)
            .join(' ')}
          aria-labelledby={titleId}
          aria-describedby={description ? descId : undefined}
          {...rest}
        >
          <div className="shrink-0 px-4 pt-4 pb-3">
            <UiDialogTitle
              id={titleId}
              className={`card-title font-bold ${titleTone}`}
            >
              {title}
            </UiDialogTitle>
            {description ? (
              <UiDialogDescription
                id={descId}
                className="mt-0.5 text-xs text-ink-muted"
              >
                {description}
              </UiDialogDescription>
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
            <UiDialogClose
              className="sr-only"
              aria-label="Close dialog"
              value="close"
            />
          </div>
        </UiDialogContent>
      </UiDialog>
    )
  },
)
