import type { ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

const basicKeys = ['K', 'A', 'Enter', 'Esc', '⌘', '⇧'] as const

const sizes = [
  { name: 'XS', className: 'kbd-xs', label: 'Xsmall' },
  { name: 'SM', className: 'kbd-sm', label: 'Small' },
  { name: 'MD', className: 'kbd-md', label: 'Medium' },
  { name: 'LG', className: 'kbd-lg', label: 'Large' },
] as const

const combos = [
  { keys: ['Ctrl', 'K'], label: 'kbd + Ctrl + K' },
  { keys: ['Ctrl', 'Shift', 'S'], label: 'kbd + Ctrl + Shift + S' },
  { keys: ['⌘', 'Z'], label: 'kbd + ⌘ + Z' },
  { keys: ['Alt', 'Tab'], label: 'kbd + Alt + Tab' },
] as const

const studioShortcuts = [
  { action: 'Save', keys: ['Ctrl', 'S'] },
  { action: 'Undo', keys: ['Ctrl', 'Z'] },
  { action: 'Redo', keys: ['Ctrl', 'Shift', 'Z'] },
  { action: 'Brush size up', keys: ['['] },
  { action: 'Brush size down', keys: [']'] },
  { action: 'Command palette', keys: ['Ctrl', 'K'] },
] as const

const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] as const
const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'] as const
const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '/'] as const

function keyComboHtml(keys: readonly string[]): string {
  return `<span class="inline-flex flex-wrap items-center gap-1.5">
${keys
  .map(
    (key, index) =>
      `  <span class="inline-flex items-center gap-1.5">${
        index > 0
          ? `
    <span class="text-sm text-ink-muted" aria-hidden>+</span>`
          : ''
      }
    <kbd class="kbd cursor-default">${key}</kbd>
  </span>`,
  )
  .join('\n')}
</span>`
}

const studioHtml = `<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
${studioShortcuts
  .map(
    (row) => `  <div class="flex flex-wrap items-center justify-between gap-3 rounded-box border border-ink-border/60 bg-base-100/50 px-4 py-3">
    <span class="text-sm font-medium">${row.action}</span>
    ${keyComboHtml(row.keys).split('\n').join('\n    ')}
  </div>`,
  )
  .join('\n')}
</div>
<p class="mt-4">
  <code class="font-mono text-[0.65rem] text-ink-muted">kbd + studio shortcut rows</code>
</p>`

const proseHtml = `<div class="flex flex-col gap-4 text-sm leading-relaxed md:text-base">
  <p>
    Press
    <kbd class="kbd kbd-sm cursor-default">F</kbd> to focus the
    active wash layer.
  </p>
  <p>
    Open the command palette with
    <kbd class="kbd kbd-sm cursor-default">Ctrl</kbd>
    <span class="mx-1 text-ink-muted" aria-hidden>+</span>
    <kbd class="kbd kbd-sm cursor-default">K</kbd>, then type a
    pigment name.
  </p>
  <p>
    Hold
    <kbd class="kbd kbd-sm cursor-default">Space</kbd> to pan the
    canvas, or tap
    <kbd class="kbd kbd-sm cursor-default">B</kbd> for the brush
    tool.
  </p>
  <code class="font-mono text-[0.65rem] text-ink-muted">kbd kbd-sm inside prose</code>
</div>`

function kbdRowHtml(keys: readonly string[], padClass: string): string {
  return `    <div class="flex flex-wrap justify-center gap-1 ${padClass}">
${keys
  .map(
    (key) =>
      `      <kbd class="kbd kbd-sm cursor-default sm:kbd-md">${key}</kbd>`,
  )
  .join('\n')}
    </div>`
}

const responsiveHtml = `<div class="overflow-x-auto">
  <div class="mx-auto flex min-w-0 max-w-xl flex-col items-stretch gap-2 sm:items-center">
${kbdRowHtml(row1, 'ps-0')}
${kbdRowHtml(row2, 'ps-0 sm:ps-4')}
${kbdRowHtml(row3, 'ps-0 sm:ps-8')}
  </div>
</div>
<p class="mt-4">
  <code class="font-mono text-[0.65rem] text-ink-muted">kbd kbd-sm sm:kbd-md + flex-wrap</code>
</p>`

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
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'kbd'}
    </code>
  )
}

function KeyCombo({ keys }: { keys: readonly string[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {keys.map((key, index) => (
        <span key={`${key}-${index}`} className="inline-flex items-center gap-1.5">
          {index > 0 ? (
            <span className="text-sm text-ink-muted" aria-hidden>
              +
            </span>
          ) : null}
          <kbd className="kbd cursor-default">{key}</kbd>
        </span>
      ))}
    </span>
  )
}

export default function KbdPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Kbd
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">kbd</span> for single
          keys, size scale, combinations, and studio shortcuts in prose.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Single keys"
          description="Plain kbd for letters, modifiers, and named keys"
        >
          <div className="flex flex-wrap items-end gap-4">
            {basicKeys.map((key) => {
              const html = `<kbd class="kbd cursor-default">${key}</kbd>`
              return (
                <ShowcaseTabs
                  key={key}
                  preview={
                    <>
                      <kbd className="kbd cursor-default">{key}</kbd>
                    </>
                  }
                  html={html}
                  jsx={daisyToJsx(html)}
                />
              )
            })}
          </div>
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Size scale"
          description="kbd-xs through kbd-lg with class labels"
          panel="wash-panel-ochre"
        >
          <div className="flex flex-wrap items-end gap-4">
            {sizes.map((s) => {
              const html = `<kbd class="kbd cursor-default ${s.className}">${s.label}</kbd>`
              return (
                <ShowcaseTabs
                  key={s.name}
                  preview={
                    <>
                      <kbd className={`kbd cursor-default ${s.className}`}>{s.label}</kbd>
                    </>
                  }
                  html={html}
                  jsx={daisyToJsx(html)}
                />
              )
            })}
          </div>
        </Section>

        <Section
          eyebrow="03 · Combos"
          title="Key combinations"
          description="Sequences with a plus between each key"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
            {combos.map((combo) => {
              const html = keyComboHtml(combo.keys)
              return (
                <ShowcaseTabs
                  key={combo.label}
                  preview={
                    <>
                      <KeyCombo keys={combo.keys} />
                    </>
                  }
                  html={html}
                  jsx={daisyToJsx(html)}
                />
              )
            })}
          </div>
        </Section>

        <Section
          eyebrow="04 · Studio shortcuts"
          title="Full shortcuts row"
          description="Common Menzies Design studio bindings"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {studioShortcuts.map((row) => (
                    <div
                      key={row.action}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-box border border-ink-border/60 bg-base-100/50 px-4 py-3"
                    >
                      <span className="text-sm font-medium">{row.action}</span>
                      <KeyCombo keys={row.keys} />
                    </div>
                  ))}
                </div>
                <p className="mt-4">
                  <ClassLabel value="kbd + studio shortcut rows" />
                </p>
              </>
            }
            html={studioHtml}
            jsx={daisyToJsx(studioHtml)}
          />
        </Section>

        <Section
          eyebrow="05 · In text"
          title="Inline in prose"
          description="kbd nested in sentences so shortcuts stay readable"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-4 text-sm leading-relaxed md:text-base">
                  <p>
                    Press{' '}
                    <kbd className="kbd kbd-sm cursor-default">F</kbd> to focus the
                    active wash layer.
                  </p>
                  <p>
                    Open the command palette with{' '}
                    <kbd className="kbd kbd-sm cursor-default">Ctrl</kbd>
                    <span className="mx-1 text-ink-muted" aria-hidden>
                      +
                    </span>
                    <kbd className="kbd kbd-sm cursor-default">K</kbd>, then type a
                    pigment name.
                  </p>
                  <p>
                    Hold{' '}
                    <kbd className="kbd kbd-sm cursor-default">Space</kbd> to pan the
                    canvas, or tap{' '}
                    <kbd className="kbd kbd-sm cursor-default">B</kbd> for the brush
                    tool.
                  </p>
                  <ClassLabel value="kbd kbd-sm inside prose" />
                </div>
              </>
            }
            html={proseHtml}
            jsx={daisyToJsx(proseHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Responsive layout"
          description="Key rows wrap on narrow screens and stay centered on wider"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="overflow-x-auto">
                  <div className="mx-auto flex min-w-0 max-w-xl flex-col items-stretch gap-2 sm:items-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {row1.map((key) => (
                        <kbd key={key} className="kbd kbd-sm cursor-default sm:kbd-md">
                          {key}
                        </kbd>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 ps-0 sm:ps-4">
                      {row2.map((key) => (
                        <kbd key={key} className="kbd kbd-sm cursor-default sm:kbd-md">
                          {key}
                        </kbd>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 ps-0 sm:ps-8">
                      {row3.map((key) => (
                        <kbd key={key} className="kbd kbd-sm cursor-default sm:kbd-md">
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4">
                  <ClassLabel value="kbd kbd-sm sm:kbd-md + flex-wrap" />
                </p>
              </>
            }
            html={responsiveHtml}
            jsx={daisyToJsx(responsiveHtml)}
          />
        </Section>
      </div>
    </>
  )
}
