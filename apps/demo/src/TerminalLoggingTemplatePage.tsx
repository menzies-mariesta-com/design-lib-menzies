import { useState } from 'react'
import {
  ClipboardCopy,
  Pause,
  Play,
  Trash2,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

type LogLevel = 'info' | 'success' | 'warn' | 'error'

type LogLine = {
  time: string
  level: LogLevel
  message: string
}

const levelClass: Record<LogLevel, string> = {
  info: 'text-info',
  success: 'text-success',
  warn: 'text-warning',
  error: 'text-error',
}

const levelLabel: Record<LogLevel, string> = {
  info: 'info',
  success: 'success',
  warn: 'warn',
  error: 'error',
}

const filterLevels = ['all', 'info', 'success', 'warn', 'error'] as const

type FilterLevel = (typeof filterLevels)[number]

const sampleLogs: LogLine[] = [
  { time: 'Aug 1, 16:02', level: 'info', message: 'Starting studio build for wash-demo…' },
  { time: 'Aug 1, 16:02', level: 'info', message: 'Resolving pigment tokens from @menzies/design-wash-ui' },
  { time: 'Aug 1, 16:03', level: 'success', message: 'Pigment mix complete: ultramarine, ochre, rose' },
  { time: 'Aug 1, 16:03', level: 'info', message: 'Compiling brush presets and paper grain layers' },
  { time: 'Aug 1, 16:04', level: 'warn', message: 'Plate #1842 dry time extended (+12s humidity offset)' },
  { time: 'Aug 1, 16:04', level: 'info', message: 'GET /api/plates/1842/status → 200 (42ms)' },
  { time: 'Aug 1, 16:05', level: 'success', message: 'Wash pipeline finished. 847 modules transformed.' },
  { time: 'Aug 1, 16:05', level: 'info', message: 'POST /api/studio/deploy/preview → 202 accepted' },
  { time: 'Aug 1, 16:06', level: 'error', message: 'Thumbnail export failed: missing og-image asset' },
  { time: 'Aug 1, 16:06', level: 'warn', message: 'Retrying thumbnail with fallback wash-panel.jpg' },
  { time: 'Aug 1, 16:07', level: 'success', message: 'Preview URL ready: https://studio.menzies.design/preview/1842' },
]

function TerminalLogPanel({
  paused,
  filter,
  onTogglePause,
  onFilterChange,
}: {
  paused: boolean
  filter: FilterLevel
  onTogglePause: () => void
  onFilterChange: (level: FilterLevel) => void
}) {
  const visibleLogs =
    filter === 'all' ? sampleLogs : sampleLogs.filter((line) => line.level === filter)

  return (
    <div className="flex min-h-[280px] w-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
      <header className="flex shrink-0 flex-wrap items-center gap-3 border-b border-base-300 bg-base-200/70 px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <h2 className="truncate font-display text-sm font-semibold sm:text-base">
            Studio terminal
          </h2>
          <span className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span
              className={`status status-xs ${paused ? 'status-warning' : 'status-success'}`}
              aria-hidden="true"
            />
            {paused ? 'Paused' : 'Live'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            className="btn btn-ghost btn-xs cursor-pointer gap-1"
            aria-label="Clear log"
          >
            <Trash2 className="size-3.5" strokeWidth={2} aria-hidden="true" />
            <span className="hidden sm:inline">Clear</span>
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs cursor-pointer gap-1"
            aria-label={paused ? 'Resume stream' : 'Pause stream'}
            onClick={onTogglePause}
          >
            {paused ? (
              <Play className="size-3.5" strokeWidth={2} aria-hidden="true" />
            ) : (
              <Pause className="size-3.5" strokeWidth={2} aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{paused ? 'Resume' : 'Pause'}</span>
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-xs cursor-pointer gap-1"
            aria-label="Copy log"
          >
            <ClipboardCopy className="size-3.5" strokeWidth={2} aria-hidden="true" />
            <span className="hidden sm:inline">Copy</span>
          </button>
        </div>
      </header>

      <div className="flex shrink-0 flex-wrap gap-1.5 border-b border-base-300 bg-base-200/40 px-3 py-2 sm:px-4">
        {filterLevels.map((level) => (
          <button
            key={level}
            type="button"
            className={`btn btn-xs cursor-pointer capitalize ${
              filter === level ? 'btn-primary' : 'btn-ghost'
            }`}
            onClick={() => onFilterChange(level)}
          >
            {level === 'all' ? 'All' : level}
          </button>
        ))}
      </div>

      <div
        className="min-h-0 flex-1 overflow-auto bg-neutral px-3 py-3 font-mono text-xs leading-relaxed text-neutral-content sm:px-4 sm:text-sm"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {visibleLogs.map((line, index) => (
          <div key={`${line.time}-${index}`} className="flex flex-wrap gap-x-2 gap-y-0.5 py-0.5">
            <span className="shrink-0 text-neutral-content/50">{line.time}</span>
            <span className={`shrink-0 uppercase ${levelClass[line.level]}`}>
              [{levelLabel[line.level]}]
            </span>
            <span className="min-w-0 break-words">{line.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TerminalLogPreview() {
  const [paused, setPaused] = useState(false)
  const [filter, setFilter] = useState<FilterLevel>('all')

  return (
    <div className="rounded-box bg-base-200/50 p-4 sm:p-6">
      <TerminalLogPanel
        paused={paused}
        filter={filter}
        onTogglePause={() => setPaused((value) => !value)}
        onFilterChange={setFilter}
      />
    </div>
  )
}

const terminalHtml = `<div class="rounded-box bg-base-200/50 p-4 sm:p-6">
  <div class="flex min-h-[280px] w-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
    <header class="flex shrink-0 items-center gap-3 border-b border-base-300 bg-base-200/70 px-4 py-2.5">
      <h2 class="font-display text-base font-semibold">Studio terminal</h2>
      <span class="status status-xs status-success" aria-hidden="true"></span>
      <span class="text-xs text-ink-muted">Live</span>
      <div class="ms-auto flex gap-1">
        <button type="button" class="btn btn-ghost btn-xs cursor-pointer">Clear</button>
        <button type="button" class="btn btn-ghost btn-xs cursor-pointer">Pause</button>
        <button type="button" class="btn btn-ghost btn-xs cursor-pointer">Copy</button>
      </div>
    </header>
    <div class="flex shrink-0 flex-wrap gap-1.5 border-b border-base-300 bg-base-200/40 px-4 py-2">
      <button type="button" class="btn btn-primary btn-xs cursor-pointer">All</button>
      <button type="button" class="btn btn-ghost btn-xs cursor-pointer">Info</button>
      <button type="button" class="btn btn-ghost btn-xs cursor-pointer">Success</button>
      <button type="button" class="btn btn-ghost btn-xs cursor-pointer">Warn</button>
      <button type="button" class="btn btn-ghost btn-xs cursor-pointer">Error</button>
    </div>
    <div class="min-h-0 flex-1 overflow-auto bg-neutral px-4 py-3 font-mono text-sm text-neutral-content" role="log">
      <div class="flex gap-2 py-0.5">
        <span class="text-neutral-content/50">Aug 1, 16:02</span>
        <span class="text-info uppercase">[info]</span>
        <span>Starting studio build for wash-demo…</span>
      </div>
      <div class="flex gap-2 py-0.5">
        <span class="text-neutral-content/50">Aug 1, 16:03</span>
        <span class="text-success uppercase">[success]</span>
        <span>Pigment mix complete: ultramarine, ochre, rose</span>
      </div>
      <div class="flex gap-2 py-0.5">
        <span class="text-neutral-content/50">Aug 1, 16:06</span>
        <span class="text-error uppercase">[error]</span>
        <span>Thumbnail export failed: missing og-image asset</span>
      </div>
    </div>
  </div>
</div>`

const terminalJsx = `<div className="rounded-box bg-base-200/50 p-4 sm:p-6">
  <div className="flex min-h-[280px] w-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
    <header className="flex shrink-0 items-center gap-3 border-b border-base-300 bg-base-200/70 px-4 py-2.5">
      <h2 className="font-display text-base font-semibold">Studio terminal</h2>
      <span className="status status-xs status-success" aria-hidden="true" />
      <span className="text-xs text-ink-muted">Live</span>
      {/* Clear, Pause, Copy toolbar */}
    </header>
    <div className="flex shrink-0 flex-wrap gap-1.5 border-b border-base-300 bg-base-200/40 px-4 py-2">
      {/* All | Info | Success | Warn | Error filter chips */}
    </div>
    <div
      className="min-h-0 flex-1 overflow-auto bg-neutral px-4 py-3 font-mono text-sm text-neutral-content"
      role="log"
    >
      {logs.map((line) => (
        <div key={line.id} className="flex gap-2 py-0.5">
          <span className="text-neutral-content/50">{line.time}</span>
          <span className={levelClass[line.level]}>[{line.level}]</span>
          <span>{line.message}</span>
        </div>
      ))}
    </div>
  </div>
</div>`

export default function TerminalLoggingTemplatePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Terminal logging
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Studio-themed console for build output, wash pipeline events, and API traces.
          Dark monospace pane with level colors, live status, toolbar actions, and level
          filters. UI only with sample static log lines.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Log viewer"
          title="Studio terminal panel"
          description="Fixed header with live/paused status, Clear/Pause/Copy toolbar, level filter chips, and a scrollable dark log pane with info, success, warn, and error tints."
        >
          <ShowcaseTabs
            preview={<TerminalLogPreview />}
            html={terminalHtml}
            jsx={terminalJsx}
          />
        </GallerySection>
      </div>
    </>
  )
}
