import type { ReactNode } from 'react'

export type GallerySectionProps = {
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  panel?: string
}

export function GallerySection({
  eyebrow,
  title,
  description,
  children,
  panel = '',
}: GallerySectionProps) {
  return (
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-ink-muted">{description}</p>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}
