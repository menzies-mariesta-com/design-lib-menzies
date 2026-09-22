import { forwardRef, type ReactNode } from 'react'
import { Dialog, type DialogProps } from './Dialog'

export type DialogTemplateProps = Omit<
  DialogProps,
  'title' | 'description' | 'children'
> & {
  /** Dialog title (maps to Dialog `title`). */
  header: ReactNode
  /** Optional supporting copy under the header (maps to Dialog `description`). */
  desc?: ReactNode
  /** Body between desc and actions (maps to Dialog `children`). */
  contents?: ReactNode
}

/**
 * Recipe wrapper around {@link Dialog} with slot names:
 * `header`, `desc`, `contents`, `actions`.
 */
export const DialogTemplate = forwardRef<HTMLDialogElement, DialogTemplateProps>(
  function DialogTemplate({ header, desc, contents, ...rest }, ref) {
    return (
      <Dialog ref={ref} title={header} description={desc} {...rest}>
        {contents}
      </Dialog>
    )
  },
)
