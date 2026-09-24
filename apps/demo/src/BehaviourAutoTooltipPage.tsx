import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { WashTooltip } from '#plain'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  behaviourTooltipHtml,
  behaviourTooltipJsx,
  behaviourTooltipSvelteFiles,
} from './snippets/svelte/behaviour-tooltip'

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

function SideReadout({ side }: { side: 'left' | 'right' }) {
  return (
    <p className="font-mono text-xs text-ink-muted">
      Opens:{' '}
      <span className="font-semibold text-ink">{side}</span>
    </p>
  )
}

function EdgeAutoDemo({
  edge,
  tip,
  tone,
  buttonClass,
  buttonLabel,
}: {
  edge: 'left' | 'right'
  tip: string
  tone: 'primary' | 'secondary'
  buttonClass: string
  buttonLabel: string
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [side, setSide] = useState<'left' | 'right'>(
    edge === 'left' ? 'right' : 'left',
  )

  const sync = useCallback(() => {
    const el = hostRef.current?.querySelector<HTMLElement>('[data-tooltip-side]')
    const value = el?.getAttribute('data-tooltip-side')
    if (value === 'left' || value === 'right') setSide(value)
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  const align =
    edge === 'left' ? 'items-start text-left' : 'items-end text-right'

  return (
    <div className={`flex max-w-[14rem] flex-col gap-2 ${align}`} ref={hostRef}>
      <p className="text-sm font-semibold text-ink">
        Near {edge} edge
      </p>
      <p className="text-xs text-ink-muted">
        {edge === 'left'
          ? 'More room on the right, so tip opens right'
          : 'More room on the left, so tip opens left'}
      </p>
      <WashTooltip
        tip={tip}
        tone={tone}
        placement="auto"
        onPointerEnter={sync}
        onFocus={sync}
      >
        <button type="button" className={buttonClass}>
          {buttonLabel}
        </button>
      </WashTooltip>
      <SideReadout side={side} />
    </div>
  )
}

export default function BehaviourAutoTooltipPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Behaviour gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Space aware tooltip
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          WashTooltip checks free space in the viewport, then opens left or right.
          It is not a hard-coded side. Near the left edge the tip opens right; near
          the right edge it opens left. Hover either button below to see it.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · See it in one glance"
          title="Left edge opens right. Right edge opens left."
          description="One wide panel, two triggers. Each sits flush to an edge so the free-space rule is obvious. The live readout shows the resolved side."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex w-full items-start justify-between gap-6 rounded-box border border-dashed border-ink-border/80 bg-base-100 px-2 py-5 sm:px-3">
                  <EdgeAutoDemo
                    edge="left"
                    tip="Opens right: more room that way"
                    tone="primary"
                    buttonClass="btn btn-primary cursor-pointer"
                    buttonLabel="Near left edge"
                  />
                  <EdgeAutoDemo
                    edge="right"
                    tip="Opens left: more room that way"
                    tone="secondary"
                    buttonClass="btn btn-secondary cursor-pointer"
                    buttonLabel="Near right edge"
                  />
                </div>
                <p className="mt-3 text-xs text-ink-muted">
                  Tip: resize the window, then hover again. The side updates from
                  viewport space, not from a fixed class on the button.
                </p>
              </>
            }
          
            html={behaviourTooltipHtml}
            jsx={behaviourTooltipJsx}
            svelteFiles={behaviourTooltipSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Forced vs auto"
          title="Lock a side when you need to"
          description="placement left or right skips the space check. auto (the default) re-checks on mount, hover, focus, and resize."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                  <Sample label='placement="auto"'>
                    <WashTooltip tip="Auto from viewport" tone="primary">
                      <button
                        type="button"
                        className="btn btn-primary cursor-pointer"
                      >
                        Auto
                      </button>
                    </WashTooltip>
                    <p className="text-xs text-ink-muted">
                      Picks left or right from free space
                    </p>
                  </Sample>
                  <Sample label='placement="left"'>
                    <WashTooltip tip="Forced left" tone="accent" placement="left">
                      <button
                        type="button"
                        className="btn btn-accent cursor-pointer"
                      >
                        Force left
                      </button>
                    </WashTooltip>
                    <p className="text-xs text-ink-muted">
                      Always tooltip-left, no space check
                    </p>
                  </Sample>
                  <Sample label='placement="right"'>
                    <WashTooltip tip="Forced right" tone="info" placement="right">
                      <button
                        type="button"
                        className="btn btn-info cursor-pointer"
                      >
                        Force right
                      </button>
                    </WashTooltip>
                    <p className="text-xs text-ink-muted">
                      Always tooltip-right, no space check
                    </p>
                  </Sample>
                </div>
              </>
            }
          
            html={behaviourTooltipHtml}
            jsx={behaviourTooltipJsx}
            svelteFiles={behaviourTooltipSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · How it decides"
          title="Viewport free space, in three steps"
          description="Static tooltip-left or tooltip-right in className are stripped so the runtime side wins."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="rounded-box border border-ink-border/70 bg-base-200/50 px-4 py-3 text-sm text-ink-muted">
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    Measure the trigger with{' '}
                    <span className="font-mono text-xs">getBoundingClientRect()</span>.
                  </li>
                  <li>
                    Free left is <span className="font-mono text-xs">rect.left</span>.
                    Free right is{' '}
                    <span className="font-mono text-xs">
                      window.innerWidth - rect.right
                    </span>
                    .
                  </li>
                  <li>
                    More space on the left opens left. More (or equal) space on the
                    right opens right.
                  </li>
                </ol>
                <p className="mt-3">
                  DaisyUI only emits side CSS when{' '}
                  <span className="font-mono text-xs">tooltip-left</span> /{' '}
                  <span className="font-mono text-xs">tooltip-right</span> appear as
                  literals, so WashTooltip toggles those classes with boolean joins.
                </p>
              </div>
            }
          
            html={behaviourTooltipHtml}
            jsx={behaviourTooltipJsx}
            svelteFiles={behaviourTooltipSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
