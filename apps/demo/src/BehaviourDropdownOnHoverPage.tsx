import type { ReactNode } from 'react'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function Sample({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex w-fit flex-col items-start gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function blurActive() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

const menuPanel =
  'menu dropdown-content z-50 mt-1 w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]'

export default function BehaviourDropdownOnHoverPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Behaviour gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Dropdown on hover
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Menu dropdowns open on hover for fine pointers, and still open on
          focus or click. Touch keeps tap. Typeaheads (SearchSelect) stay
          click-to-open via{' '}
          <span className="font-mono text-xs">dropdown-no-hover</span>.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Default menus"
          title="Menus appear on hover"
          description="Wash CSS opens plain .dropdown hosts on hover (fine pointer). daisyUI dropdown-hover still works; you do not need that class for Wash defaults."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-center gap-8">
                  <Sample label="default .dropdown">
                    <div className="dropdown">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn cursor-pointer border-ink-border"
                      >
                        Hover me
                      </div>
                      <ul tabIndex={-1} className={menuPanel}>
                        <li>
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={blurActive}
                          >
                            Ultramarine
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={blurActive}
                          >
                            Yellow ochre
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={blurActive}
                          >
                            Viridian
                          </button>
                        </li>
                      </ul>
                    </div>
                  </Sample>
                  <Sample label="dropdown-end">
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-secondary cursor-pointer"
                      >
                        Align end
                      </div>
                      <ul tabIndex={-1} className={menuPanel}>
                        <li>
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={blurActive}
                          >
                            Export CSV
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={blurActive}
                          >
                            Export Excel
                          </button>
                        </li>
                      </ul>
                    </div>
                  </Sample>
                </div>
              </>
            }
            html={
              '<!-- Wash default: any .dropdown opens on hover (fine pointer) -->\n<div class="dropdown">…</div>'
            }
            jsx={`<div className="dropdown">
  <div tabIndex={0} role="button" className="btn cursor-pointer">
    Hover me
  </div>
  <ul tabIndex={-1} className="menu dropdown-content …">
    …
  </ul>
</div>`}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Details menus"
          title="details.dropdown opens on hover too"
          description="useDetailsDropdownPlacement opens on pointer enter when (hover: hover) and (pointer: fine). Summary click, Escape, and outside close still work."
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <p className="max-w-xl text-sm text-ink-muted">
                  ThemeSwitcher and data table date filters use{' '}
                  <span className="font-mono text-xs">
                    useDetailsDropdownPlacement
                  </span>
                  . Hover those controls on a mouse to see the panel open without
                  a click.
                </p>
              </>
            }
            html={
              '<!-- details.dropdown: hover via useDetailsDropdownPlacement -->\n<details class="dropdown">…</details>'
            }
            jsx={
              "import { useDetailsDropdownPlacement } from '@menzies-mariesta-com/menzies-design-wash-ui'\n\nconst { className, onToggle } = useDetailsDropdownPlacement(detailsRef)\n<details className={className} onToggle={onToggle}>\n  <summary className=\"btn\">…</summary>\n  <div className=\"dropdown-content\">…</div>\n</details>"
            }
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Opt out"
          title="Comboboxes stay click-to-open"
          description="Add dropdown-no-hover so typeahead lists do not open on hover before the user focuses or clicks."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="dropdown-no-hover">
                  <div className="dropdown dropdown-no-hover">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn cursor-pointer border-ink-border"
                    >
                      Focus / click only
                    </div>
                    <ul tabIndex={-1} className={menuPanel}>
                      <li>
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={blurActive}
                        >
                          Still opens on focus
                        </button>
                      </li>
                    </ul>
                  </div>
                </Sample>
                <p className="mt-3 max-w-md text-xs text-ink-muted">
                  SearchSelect applies this class automatically.
                </p>
              </>
            }
            html={
              '<!-- Opt out typeaheads -->\n<div class="dropdown dropdown-no-hover">…</div>'
            }
            jsx={`<div className="dropdown dropdown-no-hover">
  …
</div>`}
          />
        </GallerySection>
      </div>
    </>
  )
}
