import { Home } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

type BreadcrumbsProps = {
  label: string
  onGoHome: () => void
}

export default function Breadcrumbs({ label, onGoHome }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs text-sm text-base-content/80">
      <ul>
        <li>
          <a
            href="#overview"
            className="ripple-surface inline-flex cursor-pointer items-center gap-1.5 rounded-md px-1 hover:text-base-content"
            onClick={(event) => {
              event.preventDefault()
              onGoHome()
            }}
          >
            <Home className="size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
            Menzies Design
          </a>
        </li>
        <li>
          <span className="text-base-content" aria-current="page">
            {label}
          </span>
        </li>
      </ul>
    </nav>
  )
}
