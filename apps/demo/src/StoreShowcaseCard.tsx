import { useId, useRef, useState, type ReactNode } from 'react'
import { Check, DollarSign, X } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  Card,
  CardBody,
} from '@menzies-mariesta-com/menzies-design-wash-ui'

export type StoreShowcaseSellingPoint = {
  title: string
  detail: string
}

export type StoreShowcaseCardProps = {
  /** Short product name shown on the card and dialog heading. */
  title: string
  /** Cover image on the closed card face. */
  cover: ReactNode
  /** Price amount shown after the dollar icon, e.g. "10". */
  priceLabel?: string
  /** When true, show Coming soon badges and disable the purchase CTA. */
  comingSoon?: boolean
  /** Optional lead line under the dialog title. */
  subtitle?: string
  /** Optional longer copy under the subtitle. */
  description?: string
  /** Larger visual inside the dialog (falls back to cover). */
  dialogPreview?: ReactNode
  /** Compact bullet list inside the dialog. */
  highlights?: string[]
  /** Richer selling points inside the dialog. */
  sellingPoints?: StoreShowcaseSellingPoint[]
  /** Primary premium CTA label. */
  primaryCtaLabel?: string
  /** Async-friendly primary action (shows btn loading spinner while pending). */
  onPrimaryCta?: () => void | Promise<void>
  /** Secondary CTA (e.g. open live template). */
  secondaryCtaLabel?: string
  onSecondaryCta?: () => void
}

function openDialog(el: HTMLDialogElement | null) {
  if (!el) return
  if (typeof el.showModal === 'function') el.showModal()
}

function closeDialog(el: HTMLDialogElement | null) {
  if (!el) return
  if (typeof el.close === 'function') el.close()
}

function PriceMark({
  priceLabel,
  className = '',
  iconClassName = 'size-5',
}: {
  priceLabel: string
  className?: string
  iconClassName?: string
}) {
  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-0.5 font-display font-semibold tracking-tight text-amber-700 dark:text-amber-400 ${className}`}
      aria-label={`USD ${priceLabel}`}
    >
      <DollarSign className={iconClassName} strokeWidth={2.25} aria-hidden />
      <span>{priceLabel}</span>
    </span>
  )
}

/**
 * Premium storefront product card + detail dialog.
 * Classic figure + footer layout (no text over the screenshot).
 */
export default function StoreShowcaseCard({
  title,
  cover,
  priceLabel,
  comingSoon = false,
  subtitle,
  description,
  dialogPreview,
  highlights = [],
  sellingPoints = [],
  primaryCtaLabel = 'Unlock template',
  onPrimaryCta,
  secondaryCtaLabel,
  onSecondaryCta,
}: StoreShowcaseCardProps) {
  const dialogId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [submitting, setSubmitting] = useState(false)

  const media = dialogPreview ?? cover
  const ctaLabel = comingSoon ? 'Coming soon' : primaryCtaLabel
  const canPurchase = Boolean(onPrimaryCta) && !comingSoon

  const handleOpen = () => openDialog(dialogRef.current)

  const handlePrimary = async () => {
    if (!canPurchase || submitting) return
    setSubmitting(true)
    try {
      await onPrimaryCta?.()
      closeDialog(dialogRef.current)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="group w-full max-w-xl cursor-pointer text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning/60 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-controls={dialogId}
      >
        <Card
          bordered
          className="w-full overflow-hidden bg-base-100 shadow-sm transition-[box-shadow,transform] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-focus-visible:-translate-y-0.5 group-focus-visible:shadow-md"
        >
          <figure className="overflow-hidden border-b border-ink-border/60 bg-base-200">
            {cover}
          </figure>
          <CardBody className="gap-3 p-4 sm:p-5">
            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                <h3 className="min-w-0 font-display text-lg font-semibold tracking-tight text-base-content">
                  {title}
                </h3>
                {comingSoon ? (
                  <span className="badge badge-warning badge-outline shrink-0">
                    Coming soon
                  </span>
                ) : null}
              </div>
              {priceLabel ? (
                <PriceMark
                  priceLabel={priceLabel}
                  className="ms-auto text-lg font-semibold"
                  iconClassName="size-5"
                />
              ) : null}
            </div>
          </CardBody>
        </Card>
      </button>

      <dialog ref={dialogRef} id={dialogId} className="modal p-0">
        <div
          className="modal-box flex h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-h-[calc(100dvh-1.5rem)] max-w-[calc(100%-1.5rem)] flex-col overflow-hidden p-0 sm:h-[calc(100dvh-2.5rem)] sm:w-[calc(100%-2.5rem)] sm:max-h-[calc(100dvh-2.5rem)] sm:max-w-[calc(100%-2.5rem)] md:h-[calc(100dvh-3rem)] md:w-[calc(100%-3rem)] md:max-h-[calc(100dvh-3rem)] md:max-w-5xl lg:max-w-6xl"
        >
          <header className="relative shrink-0 border-b border-ink-border/70 bg-base-100 px-4 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-5">
            <form method="dialog">
              <div className="tooltip tooltip-left tooltip-secondary absolute end-3 top-3 z-10 sm:end-4 sm:top-4">
                <button
                  type="submit"
                  className="btn btn-sm btn-circle btn-ghost btn-secondary cursor-pointer"
                  aria-label="Close"
                >
                  <X className="size-4" strokeWidth={2} aria-hidden />
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between gap-3 pe-10">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                <h2 className="min-w-0 font-display text-xl font-bold tracking-tight text-base-content sm:text-2xl md:text-3xl">
                  {title}
                </h2>
                {comingSoon ? (
                  <span className="badge badge-warning badge-outline shrink-0">
                    Coming soon
                  </span>
                ) : null}
              </div>
              {priceLabel ? (
                <PriceMark
                  priceLabel={priceLabel}
                  className="text-xl sm:text-2xl md:text-3xl"
                  iconClassName="size-5 sm:size-7 md:size-8"
                />
              ) : null}
            </div>
            {subtitle ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
                {subtitle}
              </p>
            ) : null}
            {description ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
                {description}
              </p>
            ) : null}
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
            <div className="space-y-5">
              {media ? (
                <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
                  {media}
                </div>
              ) : null}

              {highlights.length > 0 ? (
                <ul className="flex flex-col gap-1.5 text-sm text-base-content/90">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-amber-600 dark:text-amber-400"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {sellingPoints.length > 0 ? (
                <ul className="flex flex-col gap-2.5 text-sm text-base-content/90">
                  {sellingPoints.map((point) => (
                    <li key={point.title} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-amber-600 dark:text-amber-400"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="leading-relaxed">
                        <span className="font-semibold text-base-content">
                          {point.title}
                        </span>
                        <span className="text-ink-muted"> {point.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <footer className="flex shrink-0 flex-col gap-3 border-t border-ink-border/60 bg-base-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
            {priceLabel ? (
              <PriceMark priceLabel={priceLabel} className="text-xl" iconClassName="size-5" />
            ) : (
              <span />
            )}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
              {secondaryCtaLabel && onSecondaryCta ? (
                <button
                  type="button"
                  className={`btn btn-ghost ${
                    submitting
                      ? 'cursor-not-allowed btn-disabled'
                      : 'cursor-pointer'
                  }`}
                  disabled={submitting}
                  onClick={() => {
                    closeDialog(dialogRef.current)
                    onSecondaryCta()
                  }}
                >
                  {secondaryCtaLabel}
                </button>
              ) : null}
              <button
                type="button"
                className={`btn btn-warning w-full sm:w-auto ${
                  submitting || !canPurchase
                    ? 'cursor-not-allowed btn-disabled'
                    : 'cursor-pointer'
                }`}
                disabled={submitting || !canPurchase}
                aria-busy={submitting}
                aria-disabled={!canPurchase}
                onClick={() => void handlePrimary()}
              >
                {submitting ? (
                  <span
                    className="loading loading-spinner loading-sm"
                    aria-hidden
                  />
                ) : null}
                {ctaLabel}
              </button>
            </div>
          </footer>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit" className="cursor-pointer">
            close
          </button>
        </form>
      </dialog>
    </>
  )
}
