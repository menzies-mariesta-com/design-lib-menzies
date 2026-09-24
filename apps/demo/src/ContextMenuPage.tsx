import { ShowcaseTabs } from './components/ShowcaseTabs'
import { useEffect, useState, type ReactNode } from 'react'
import {
  ChevronRight,
  ClipboardCopy,
  Copy,
  Eraser,
  Lock,
  Paintbrush,
  Pencil,
  Scissors,
  Trash2,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  ContextMenu,
  useContextMenu,
  useContextMenuSurface,
} from '#plain'
import {
  contextMenuSvelteFiles,
  basicHtml,
  basicJsx,
  iconsHtml,
  iconsJsx,
  nestedHtml,
  nestedJsx,
  studioHtml,
  studioJsx,
  keyboardHtml,
  keyboardJsx,
  responsiveHtml,
  responsiveJsx,
} from './snippets/svelte/context-menu'

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
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
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
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function BasicContextDemo() {
  const { pos, openAt, close, menuRef } = useContextMenu()
  const triggers = useContextMenuSurface(openAt, close)
  const [lastAction, setLastAction] = useState('None yet')

  function pick(label: string) {
    setLastAction(label)
    close()
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="application"
        tabIndex={0}
        className="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-base-200/30 px-4 py-8 text-center outline-none focus-visible:dry-brush"
        aria-label="Right-click or long-press for basic context menu"
        {...triggers}
      >
        <p className="text-sm font-medium">Right-click this surface</p>
        <p className="mt-1 text-xs text-ink-muted">
          Touch: long-press. Keyboard: Shift+F10 when focused.
        </p>
      </div>
      <p className="text-sm text-ink-muted">
        Last action: <span className="font-medium text-base-content">{lastAction}</span>
      </p>
      <ContextMenu pos={pos} menuRef={menuRef} aria-label="Basic context menu">
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick('Open')}
          >
            Open
          </button>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick('Rename')}
          >
            Rename
          </button>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick('Inspect wash')}
          >
            Inspect wash
          </button>
        </li>
      </ContextMenu>
      <ClassLabel value="ContextMenu + useContextMenuSurface" />
    </div>
  )
}

function IconsShortcutsDemo() {
  const { pos, openAt, close, menuRef } = useContextMenu()
  const triggers = useContextMenuSurface(openAt, close)
  const [lastAction, setLastAction] = useState('None yet')

  function pick(label: string) {
    setLastAction(label)
    close()
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="application"
        tabIndex={0}
        className="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-wash-blue/20 px-4 py-8 text-center outline-none focus-visible:dry-brush"
        aria-label="Right-click for icons and shortcuts context menu"
        {...triggers}
      >
        <Paintbrush className="mb-2 size-5 text-base-content/70" strokeWidth={2} />
        <p className="text-sm font-medium">Brush plate</p>
        <p className="mt-1 text-xs text-ink-muted">Icons and kbd hints in the menu</p>
      </div>
      <p className="text-sm text-ink-muted">
        Last action: <span className="font-medium text-base-content">{lastAction}</span>
      </p>
      <ContextMenu pos={pos} menuRef={menuRef} aria-label="Icons and shortcuts context menu">
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick('Cut')}
          >
            <Scissors className="size-4" strokeWidth={2} />
            Cut
            <kbd className="kbd kbd-xs ms-auto">⌘X</kbd>
          </button>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick('Copy')}
          >
            <Copy className="size-4" strokeWidth={2} />
            Copy
            <kbd className="kbd kbd-xs ms-auto">⌘C</kbd>
          </button>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick('Paste')}
          >
            <ClipboardCopy className="size-4" strokeWidth={2} />
            Paste
            <kbd className="kbd kbd-xs ms-auto">⌘V</kbd>
          </button>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick('Edit label')}
          >
            <Pencil className="size-4" strokeWidth={2} />
            Edit label
            <kbd className="kbd kbd-xs ms-auto">E</kbd>
          </button>
        </li>
      </ContextMenu>
      <ClassLabel value="menu + Lucide + kbd" />
    </div>
  )
}

function NestedDestructiveDemo() {
  const { pos, openAt, close, menuRef } = useContextMenu()
  const triggers = useContextMenuSurface(openAt, close)
  const [lastAction, setLastAction] = useState('None yet')
  const [nestedOpen, setNestedOpen] = useState(false)

  function pick(label: string) {
    setLastAction(label)
    setNestedOpen(false)
    close()
  }

  useEffect(() => {
    if (!pos) setNestedOpen(false)
  }, [pos])

  return (
    <div className="flex flex-col gap-3">
      <div
        role="application"
        tabIndex={0}
        className="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-wash-rose/15 px-4 py-8 text-center outline-none focus-visible:dry-brush"
        aria-label="Right-click for nested and destructive context menu"
        {...triggers}
      >
        <p className="text-sm font-medium">Layer stack target</p>
        <p className="mt-1 text-xs text-ink-muted">Nested Export, plus Delete in error color</p>
      </div>
      <p className="text-sm text-ink-muted">
        Last action: <span className="font-medium text-base-content">{lastAction}</span>
      </p>
      <ContextMenu
        pos={pos}
        menuRef={menuRef}
        className="w-56"
        aria-label="Nested context menu"
      >
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick('Duplicate')}
          >
            <Copy className="size-4" strokeWidth={2} />
            Duplicate
          </button>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className={`cursor-pointer ${nestedOpen ? 'menu-active' : ''}`}
            aria-haspopup="true"
            aria-expanded={nestedOpen}
            onClick={(e) => {
              e.stopPropagation()
              setNestedOpen((v) => !v)
            }}
          >
            Export
            <ChevronRight className="ms-auto size-4 opacity-70" strokeWidth={2} />
          </button>
          {nestedOpen ? (
            <ul className="menu menu-sm ms-2 mt-1 w-full rounded-box border border-ink-border/50 bg-base-100 p-1">
              <li role="none">
                <button
                  type="button"
                  role="menuitem"
                  className="cursor-pointer"
                  onClick={() => pick('Export PNG')}
                >
                  PNG plate
                </button>
              </li>
              <li role="none">
                <button
                  type="button"
                  role="menuitem"
                  className="cursor-pointer"
                  onClick={() => pick('Export SVG')}
                >
                  SVG outline
                </button>
              </li>
            </ul>
          ) : null}
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer text-error"
            onClick={() => pick('Delete')}
          >
            <Trash2 className="size-4" strokeWidth={2} />
            Delete
          </button>
        </li>
      </ContextMenu>
      <ClassLabel value="menu nested + text-error delete" />
    </div>
  )
}

function StudioWashDemo() {
  const { pos, openAt, close, menuRef } = useContextMenu()
  const triggers = useContextMenuSurface(openAt, close)
  const [locked, setLocked] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function pick(label: string) {
    if (label === 'Lock layer') setLocked(true)
    if (label === 'Unlock layer') setLocked(false)
    setToast(label)
    close()
    window.setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="application"
        tabIndex={0}
        className="wash-panel wash-panel-blue relative flex min-h-44 cursor-context-menu flex-col justify-between overflow-hidden outline-none focus-visible:dry-brush"
        aria-label="Right-click wash plate for studio actions"
        {...triggers}
      >
        <div>
          <p className="label-ink">Wash plate</p>
          <h3 className="font-display mt-1 text-xl font-semibold">Cerulean field</h3>
          <p className="mt-1 text-sm text-ink-muted">
            Right-click or long-press for Duplicate, Lock, Delete wash.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {locked ? (
            <span className="badge badge-sm gap-1 border-ink-border bg-base-100/80">
              <Lock className="size-3" strokeWidth={2} />
              Locked
            </span>
          ) : (
            <span className="badge badge-sm border-ink-border bg-base-100/60">Editable</span>
          )}
        </div>
      </div>
      {toast ? (
        <p className="text-sm text-ink-muted" role="status">
          Studio: <span className="font-medium text-base-content">{toast}</span>
        </p>
      ) : (
        <p className="text-sm text-ink-muted">No studio action yet.</p>
      )}
      <ContextMenu pos={pos} menuRef={menuRef} aria-label="Studio wash context menu">
        <li className="menu-title px-2 py-1">
          <span>Wash actions</span>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick('Duplicate')}
          >
            <Copy className="size-4" strokeWidth={2} />
            Duplicate
          </button>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer"
            onClick={() => pick(locked ? 'Unlock layer' : 'Lock layer')}
          >
            <Lock className="size-4" strokeWidth={2} />
            {locked ? 'Unlock layer' : 'Lock layer'}
          </button>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer text-error"
            onClick={() => pick('Delete wash')}
          >
            <Eraser className="size-4" strokeWidth={2} />
            Delete wash
          </button>
        </li>
      </ContextMenu>
      <ClassLabel value="wash-panel + ContextMenu" />
    </div>
  )
}

export default function ContextMenuPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Context menu
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">menu</span> has no dedicated context-menu
          class. Use package <span className="font-mono text-xs">ContextMenu</span> with{' '}
          <span className="font-mono text-xs">useContextMenu</span> /{' '}
          <span className="font-mono text-xs">useContextMenuSurface</span>.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Pointer-positioned menu"
          description="Right-click opens a menu near the pointer"
        >
          <ShowcaseTabs
            preview={<BasicContextDemo />}
            html={basicHtml}
            jsx={basicJsx}
            svelteFiles={contextMenuSvelteFiles}
          />
        </Section>

        <Section
          eyebrow="02 · Icons and shortcuts"
          title="Lucide plus kbd hints"
          description="Same trigger pattern with icons and keyboard shortcut hints"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={<IconsShortcutsDemo />}
            html={iconsHtml}
            jsx={iconsJsx}
            svelteFiles={contextMenuSvelteFiles}
          />
        </Section>

        <Section
          eyebrow="03 · Nested and destructive"
          title="Export submenu and Delete"
          description="Nested Export items, plus a destructive Delete row in error color"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={<NestedDestructiveDemo />}
            html={nestedHtml}
            jsx={nestedJsx}
            svelteFiles={contextMenuSvelteFiles}
          />
        </Section>

        <Section
          eyebrow="04 · Studio"
          title="Wash plate actions"
          description="Duplicate, Lock layer, and Delete wash on a watercolor plate"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={<StudioWashDemo />}
            html={studioHtml}
            jsx={studioJsx}
            svelteFiles={contextMenuSvelteFiles}
          />
        </Section>

        <Section
          eyebrow="05 · Keyboard and Escape"
          title="Close and open notes"
          description="Escape always dismisses an open context menu"
        >
          <ShowcaseTabs
            preview={
              <>
                <ul className="list-inside list-disc space-y-2 text-sm text-ink-muted">
                  <li>
                    <span className="font-medium text-base-content">Escape</span> closes the open
                    menu and clears nested state.
                  </li>
                  <li>
                    <span className="font-medium text-base-content">Outside click</span> (pointerdown
                    outside the menu) closes it.
                  </li>
                  <li>
                    <span className="font-medium text-base-content">Shift+F10</span> or the
                    ContextMenu key opens when the surface is focused.
                  </li>
                  <li>
                    Listeners for dismiss are attached only while open and removed on unmount.
                  </li>
                </ul>
                <div className="mt-3">
                  <ClassLabel value="keydown Escape + pointerdown outside" />
                </div>
              </>
            }
            html={keyboardHtml}
            jsx={keyboardJsx}
            svelteFiles={contextMenuSvelteFiles}
          />
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Touch long-press fallback"
          description="On touch and pen, hold about half a second to open"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-box border border-ink-border/60 bg-base-200/30 p-4">
                    <p className="label-ink">Desktop</p>
                    <p className="mt-2 text-sm text-ink-muted">
                      Right-click or Shift+F10 on a focused target.
                    </p>
                  </div>
                  <div className="rounded-box border border-ink-border/60 bg-base-200/30 p-4">
                    <p className="label-ink">Touch</p>
                    <p className="mt-2 text-sm text-ink-muted">
                      Long-press the surface. Drag cancels before the menu opens.
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <ClassLabel value="pointerType touch|pen long-press" />
                </div>
              </>
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
            svelteFiles={contextMenuSvelteFiles}
          />
        </Section>
      </div>
    </>
  )
}
