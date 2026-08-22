import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  Plus,
  Camera,
  Image,
  Mic,
  X,
  Pencil,
  Heart,
  Mail,
  FilePlus,
  List,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const colors = [
  { name: 'Default', btn: '', tip: '' },
  { name: 'Neutral', btn: 'btn-neutral', tip: 'tooltip-neutral' },
  { name: 'Primary', btn: 'btn-primary', tip: 'tooltip-primary' },
  { name: 'Secondary', btn: 'btn-secondary', tip: 'tooltip-secondary' },
  { name: 'Accent', btn: 'btn-accent', tip: 'tooltip-accent' },
  { name: 'Info', btn: 'btn-info', tip: 'tooltip-info' },
  { name: 'Success', btn: 'btn-success', tip: 'tooltip-success' },
  { name: 'Warning', btn: 'btn-warning', tip: 'tooltip-warning' },
  { name: 'Error', btn: 'btn-error', tip: 'tooltip-error' },
] as const

const sizes = [
  { name: 'XS', className: 'btn-xs' },
  { name: 'SM', className: 'btn-sm' },
  { name: 'MD', className: 'btn-md' },
  { name: 'LG', className: 'btn-lg' },
  { name: 'XL', className: 'btn-xl' },
] as const

const styles = [
  { name: 'Solid', className: '' },
  { name: 'Outline', className: 'btn-outline' },
  { name: 'Soft', className: 'btn-soft' },
  { name: 'Ghost', className: 'btn-ghost' },
  { name: 'Dash', className: 'btn-dash' },
] as const

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
    <article className={`wash-panel paper-grain soak-in ${panel}`}>
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

/** Contain fixed FABs inside gallery panels via absolute override. */
function FabStage({
  children,
  className = '',
  hint = 'Click or focus the FAB',
}: {
  children: ReactNode
  className?: string
  hint?: string
}) {
  return (
    <div
      className={`relative h-56 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/40 ${className}`}
    >
      <p className="label-ink absolute start-3 top-3 z-0 text-[0.65rem]">{hint}</p>
      {children}
    </div>
  )
}

const fabPos = 'fab absolute! end-4 bottom-4 z-10'

export default function FabPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          FAB
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">fab</span> floating
          action buttons and speed dials: vertical, flower, close, and main
          action patterns.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Single FAB"
          description="One circle button in the corner. No speed dial."
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div className="tooltip tooltip-primary tooltip-left" data-tip="New">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle btn-primary cursor-pointer"
                                aria-label="New"
                              >
                                <Plus className="size-6" strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + btn btn-lg btn-circle btn-primary" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage>
            <div className={fabPos}>
              <div className="tooltip tooltip-primary tooltip-left" data-tip="New">
                <button
                  type="button"
                  className="btn btn-lg btn-circle btn-primary cursor-pointer"
                  aria-label="New"
                >
                  <Plus className="size-6" strokeWidth={2} />
                </button>
              </div>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab + btn btn-lg btn-circle btn-primary" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="02 · Speed dial"
          title="Vertical speed dial"
          description="Focusable trigger opens additional circle actions upward."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Camera">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Camera"
                              >
                                <Camera className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Gallery">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Gallery"
                              >
                                <Image className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Voice">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Voice"
                              >
                                <Mic className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + [tabindex] trigger + action buttons" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage>
            <div className={fabPos}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer"
                data-tip="Open"
                aria-label="Open"
              >
                <Plus className="size-6" strokeWidth={2} />
              </div>
              <div className="tooltip tooltip-left" data-tip="Camera">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="Camera"
                >
                  <Camera className="size-6" strokeWidth={1.75} />
                </button>
              </div>
              <div className="tooltip tooltip-left" data-tip="Gallery">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="Gallery"
                >
                  <Image className="size-6" strokeWidth={1.75} />
                </button>
              </div>
              <div className="tooltip tooltip-left" data-tip="Voice">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="Voice"
                >
                  <Mic className="size-6" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab + [tabindex] trigger + action buttons" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="03 · Icons"
          title="Speed dial with Lucide icons"
          description="Secondary trigger and icon-only actions with matching tooltips."
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-secondary tooltip tooltip-secondary tooltip-left cursor-pointer"
                              data-tip="New"
                              aria-label="New"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Camera">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Camera"
                              >
                                <Camera className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Gallery">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Gallery"
                              >
                                <Image className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Voice">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Voice"
                              >
                                <Mic className="size-6" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + Lucide icons + tooltip" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage>
            <div className={fabPos}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle btn-secondary tooltip tooltip-secondary tooltip-left cursor-pointer"
                data-tip="New"
                aria-label="New"
              >
                <Plus className="size-6" strokeWidth={2} />
              </div>
              <div className="tooltip tooltip-left" data-tip="Camera">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="Camera"
                >
                  <Camera className="size-6" strokeWidth={1.75} />
                </button>
              </div>
              <div className="tooltip tooltip-left" data-tip="Gallery">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="Gallery"
                >
                  <Image className="size-6" strokeWidth={1.75} />
                </button>
              </div>
              <div className="tooltip tooltip-left" data-tip="Voice">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="Voice"
                >
                  <Mic className="size-6" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab + Lucide icons + tooltip" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="04 · Labels"
          title="Speed dial with text labels"
          description="Label wrappers sit beside each action button."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              F
                            </div>
                            <div>
                              Camera
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Camera className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Gallery
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Image className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Voice
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Mic className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + label wrapper + btn-circle" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage>
            <div className={fabPos}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer"
                data-tip="Open"
                aria-label="Open"
              >
                F
              </div>
              <div>
                Camera
                <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                  <Camera className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div>
                Gallery
                <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                  <Image className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div>
                Voice
                <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                  <Mic className="size-5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab + label wrapper + btn-circle" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="05 · Rectangle"
          title="Rectangle action buttons"
          description="Drop btn-circle on actions for wider text buttons."
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-accent tooltip tooltip-accent tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <button type="button" className="btn btn-lg cursor-pointer">
                              New wash
                            </button>
                            <button type="button" className="btn btn-lg cursor-pointer">
                              Import plate
                            </button>
                            <button type="button" className="btn btn-lg cursor-pointer">
                              Share series
                            </button>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + btn btn-lg (no circle on actions)" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage>
            <div className={fabPos}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle btn-accent tooltip tooltip-accent tooltip-left cursor-pointer"
                data-tip="Open"
                aria-label="Open"
              >
                <Plus className="size-6" strokeWidth={2} />
              </div>
              <button type="button" className="btn btn-lg cursor-pointer">
                New wash
              </button>
              <button type="button" className="btn btn-lg cursor-pointer">
                Import plate
              </button>
              <button type="button" className="btn btn-lg cursor-pointer">
                Share series
              </button>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab + btn btn-lg (no circle on actions)" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="06 · Close"
          title="fab-close replacement"
          description="When open, the trigger fades and a close control appears."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-info tooltip tooltip-info tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="fab-close">
                              Close
                              <span className="btn btn-circle btn-lg btn-error cursor-pointer">
                                <X className="size-5" strokeWidth={2} aria-hidden />
                              </span>
                            </div>
                            <div>
                              Camera
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Camera className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Gallery
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Image className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Voice
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Mic className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + fab-close + btn-error" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage>
            <div className={fabPos}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle btn-info tooltip tooltip-info tooltip-left cursor-pointer"
                data-tip="Open"
                aria-label="Open"
              >
                <Plus className="size-6" strokeWidth={2} />
              </div>
              <div className="fab-close">
                Close
                <span className="btn btn-circle btn-lg btn-error cursor-pointer">
                  <X className="size-5" strokeWidth={2} aria-hidden />
                </span>
              </div>
              <div>
                Camera
                <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                  <Camera className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div>
                Gallery
                <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                  <Image className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div>
                Voice
                <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                  <Mic className="size-5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab + fab-close + btn-error" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="07 · Main action"
          title="fab-main-action replacement"
          description="Open state swaps the trigger for a primary action (not both with fab-close)."
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="fab-main-action">
                              Compose
                              <button
                                type="button"
                                className="btn btn-circle btn-secondary btn-lg cursor-pointer"
                                aria-label="Compose"
                              >
                                <Pencil className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Camera
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Camera className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              Gallery
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <Image className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div>
                              File
                              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                                <FilePlus className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + fab-main-action" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage>
            <div className={fabPos}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer"
                data-tip="Open"
                aria-label="Open"
              >
                <Plus className="size-6" strokeWidth={2} />
              </div>
              <div className="fab-main-action">
                Compose
                <button
                  type="button"
                  className="btn btn-circle btn-secondary btn-lg cursor-pointer"
                  aria-label="Compose"
                >
                  <Pencil className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div>
                Camera
                <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                  <Camera className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div>
                Gallery
                <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                  <Image className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div>
                File
                <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                  <FilePlus className="size-5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab + fab-main-action" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="08 · Flower"
          title="fab-flower quarter circle"
          description="Actions fan into an arc instead of a vertical stack."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage className="h-64" hint="Flower opens into a quarter circle">
                          <div className={`${fabPos} fab-flower`}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <button
                              type="button"
                              className="fab-main-action btn btn-circle btn-lg cursor-pointer"
                              aria-label="Main"
                            >
                              M
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              A
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              B
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              C
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              D
                            </button>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab fab-flower + fab-main-action" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage className="h-64" hint="Flower opens into a quarter circle">
            <div className={\`\${fabPos} fab-flower\`}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle btn-success tooltip tooltip-success tooltip-left cursor-pointer"
                data-tip="Open"
                aria-label="Open"
              >
                <Plus className="size-6" strokeWidth={2} />
              </div>
              <button
                type="button"
                className="fab-main-action btn btn-circle btn-lg cursor-pointer"
                aria-label="Main"
              >
                M
              </button>
              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                A
              </button>
              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                B
              </button>
              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                C
              </button>
              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                D
              </button>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab fab-flower + fab-main-action" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="09 · Flower only"
          title="Flower without main action"
          description="Without fab-main-action, the first action also sits on the arc."
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage className="h-64">
                          <div className={`${fabPos} fab-flower`}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer"
                              data-tip="Open"
                              aria-label="Open"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              A
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              B
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              C
                            </button>
                            <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                              D
                            </button>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab fab-flower (no fab-main-action)" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage className="h-64">
            <div className={\`\${fabPos} fab-flower\`}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle btn-primary tooltip tooltip-primary tooltip-left cursor-pointer"
                data-tip="Open"
                aria-label="Open"
              >
                <Plus className="size-6" strokeWidth={2} />
              </div>
              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                A
              </button>
              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                B
              </button>
              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                C
              </button>
              <button type="button" className="btn btn-lg btn-circle cursor-pointer">
                D
              </button>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab fab-flower (no fab-main-action)" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="10 · Flower icons"
          title="Flower with icons and tooltips"
          description="Quarter circle has no room for text labels; use tooltip-left."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage className="h-64">
                          <div className={`${fabPos} fab-flower`}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle tooltip tooltip-left cursor-pointer"
                              data-tip="New"
                              aria-label="New"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <button
                              type="button"
                              className="fab-main-action btn btn-circle btn-lg btn-primary cursor-pointer"
                              aria-label="Compose"
                            >
                              <Pencil className="size-5" strokeWidth={1.75} />
                            </button>
                            <div className="tooltip tooltip-left" data-tip="Camera">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Camera"
                              >
                                <Camera className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="List">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="List"
                              >
                                <List className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Gallery">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Gallery"
                              >
                                <Image className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-left" data-tip="Voice">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle cursor-pointer"
                                aria-label="Voice"
                              >
                                <Mic className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab fab-flower + tooltip tooltip-left" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage className="h-64">
            <div className={\`\${fabPos} fab-flower\`}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle tooltip tooltip-left cursor-pointer"
                data-tip="New"
                aria-label="New"
              >
                <Plus className="size-6" strokeWidth={2} />
              </div>
              <button
                type="button"
                className="fab-main-action btn btn-circle btn-lg btn-primary cursor-pointer"
                aria-label="Compose"
              >
                <Pencil className="size-5" strokeWidth={1.75} />
              </button>
              <div className="tooltip tooltip-left" data-tip="Camera">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="Camera"
                >
                  <Camera className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div className="tooltip tooltip-left" data-tip="List">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="List"
                >
                  <List className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div className="tooltip tooltip-left" data-tip="Gallery">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="Gallery"
                >
                  <Image className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div className="tooltip tooltip-left" data-tip="Voice">
                <button
                  type="button"
                  className="btn btn-lg btn-circle cursor-pointer"
                  aria-label="Voice"
                >
                  <Mic className="size-5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab fab-flower + tooltip tooltip-left" />
          </p>`}
          />
        
        </Section>

        <Section
          eyebrow="11 · Colors"
          title="Semantic FAB colors"
          description="Color comes from nested btn classes, not fab itself."
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {colors.map((c) => (
                            <div key={c.name} className="flex flex-col gap-2">
                              <FabStage className="h-36" hint={c.name}>
                                <div className={fabPos}>
                                  <div
                                    className={`tooltip tooltip-left ${c.tip}`}
                                    data-tip={c.name}
                                  >
                                    <button
                                      type="button"
                                      className={`btn btn-circle btn-lg cursor-pointer ${c.btn}`}
                                      aria-label={c.name}
                                    >
                                      <Plus className="size-5" strokeWidth={2} />
                                    </button>
                                  </div>
                                </div>
                              </FabStage>
                              <ClassLabel
                                value={
                                  c.btn
                                    ? `fab + btn btn-circle ${c.btn}`
                                    : 'fab + btn btn-circle'
                                }
                              />
                            </div>
                          ))}
                        </div>
            
              </>
            }
            html={`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((c) => (
              <div key= class="flex flex-col gap-2">
                <!-- FabStage -->
                <!-- ClassLabel -->
              </div>
            ))}
          </div>`}
            jsx={`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <FabStage className="h-36" hint={c.name}>
                  <div className={fabPos}>
                    <div
                      className={\`tooltip tooltip-left \${c.tip}\`}
                      data-tip={c.name}
                    >
                      <button
                        type="button"
                        className={\`btn btn-circle btn-lg cursor-pointer \${c.btn}\`}
                        aria-label={c.name}
                      >
                        <Plus className="size-5" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </FabStage>
                <ClassLabel
                  value={
                    c.btn
                      ? \`fab + btn btn-circle \${c.btn}\`
                      : 'fab + btn btn-circle'
                  }
                />
              </div>
            ))}
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="12 · Sizes"
          title="Button size scale"
          description="FAB actions inherit btn size modifiers."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-end gap-4">
                          {sizes.map((s) => (
                            <div key={s.name} className="flex flex-col items-center gap-2">
                              <div className="tooltip tooltip-primary" data-tip={s.name}>
                                <button
                                  type="button"
                                  className={`btn btn-circle btn-primary cursor-pointer ${s.className}`}
                                  aria-label={s.name}
                                >
                                  <Plus className="size-4" strokeWidth={2} />
                                </button>
                              </div>
                              <ClassLabel value={`btn btn-circle ${s.className}`} />
                            </div>
                          ))}
                        </div>
            
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-4">
            {sizes.map((s) => (
              <div key= class="flex flex-col items-center gap-2">
                <div class="tooltip tooltip-primary" data-tip=>
                  <button
                    type="button"
                    class=
                    aria-label="Label"
                  >
                    <!-- Plus -->
                  </button>
                </div>
                <!-- ClassLabel -->
              </div>
            ))}
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-4">
            {sizes.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <div className="tooltip tooltip-primary" data-tip={s.name}>
                  <button
                    type="button"
                    className={\`btn btn-circle btn-primary cursor-pointer \${s.className}\`}
                    aria-label={s.name}
                  >
                    <Plus className="size-4" strokeWidth={2} />
                  </button>
                </div>
                <ClassLabel value={\`btn btn-circle \${s.className}\`} />
              </div>
            ))}
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="13 · Styles"
          title="Style variants on FAB triggers"
          description="Outline, soft, ghost, and dash on circle FAB buttons."
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-wrap items-end gap-4">
                          {styles.map((style) => (
                            <div key={style.name} className="flex flex-col items-center gap-2">
                              <div className="tooltip tooltip-secondary" data-tip={style.name}>
                                <button
                                  type="button"
                                  className={`btn btn-circle btn-lg btn-secondary cursor-pointer ${style.className}`}
                                  aria-label={style.name}
                                >
                                  <Heart className="size-5" strokeWidth={1.75} />
                                </button>
                              </div>
                              <ClassLabel
                                value={
                                  style.className
                                    ? `btn btn-circle btn-secondary ${style.className}`
                                    : 'btn btn-circle btn-secondary'
                                }
                              />
                            </div>
                          ))}
                        </div>
            
              </>
            }
            html={`<div class="flex flex-wrap items-end gap-4">
            {styles.map((style) => (
              <div key= class="flex flex-col items-center gap-2">
                <div class="tooltip tooltip-secondary" data-tip=>
                  <button
                    type="button"
                    class=
                    aria-label="Label"
                  >
                    <!-- Heart -->
                  </button>
                </div>
                <!-- ClassLabel -->
              </div>
            ))}
          </div>`}
            jsx={`<div className="flex flex-wrap items-end gap-4">
            {styles.map((style) => (
              <div key={style.name} className="flex flex-col items-center gap-2">
                <div className="tooltip tooltip-secondary" data-tip={style.name}>
                  <button
                    type="button"
                    className={\`btn btn-circle btn-lg btn-secondary cursor-pointer \${style.className}\`}
                    aria-label={style.name}
                  >
                    <Heart className="size-5" strokeWidth={1.75} />
                  </button>
                </div>
                <ClassLabel
                  value={
                    style.className
                      ? \`btn btn-circle btn-secondary \${style.className}\`
                      : 'btn btn-circle btn-secondary'
                  }
                />
              </div>
            ))}
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="14 · Mixed palette"
          title="Colored speed dial actions"
          description="Each dial action can use its own semantic color."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <FabStage>
                          <div className={fabPos}>
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-lg btn-circle btn-neutral tooltip tooltip-neutral tooltip-left cursor-pointer"
                              data-tip="Actions"
                              aria-label="Actions"
                            >
                              <Plus className="size-6" strokeWidth={2} />
                            </div>
                            <div className="tooltip tooltip-info tooltip-left" data-tip="Mail">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle btn-info cursor-pointer"
                                aria-label="Mail"
                              >
                                <Mail className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-warning tooltip-left" data-tip="Favorite">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle btn-warning cursor-pointer"
                                aria-label="Favorite"
                              >
                                <Heart className="size-5" strokeWidth={1.75} />
                              </button>
                            </div>
                            <div className="tooltip tooltip-error tooltip-left" data-tip="Close menu">
                              <button
                                type="button"
                                className="btn btn-lg btn-circle btn-error cursor-pointer"
                                aria-label="Close menu"
                              >
                                <X className="size-5" strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        </FabStage>
                        <p className="mt-3">
                          <ClassLabel value="fab + btn-info / btn-warning / btn-error actions" />
                        </p>
            
              </>
            }
            html={`<!-- FabStage -->
          <p class="mt-3">
            <!-- ClassLabel -->
          </p>`}
            jsx={`<FabStage>
            <div className={fabPos}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-lg btn-circle btn-neutral tooltip tooltip-neutral tooltip-left cursor-pointer"
                data-tip="Actions"
                aria-label="Actions"
              >
                <Plus className="size-6" strokeWidth={2} />
              </div>
              <div className="tooltip tooltip-info tooltip-left" data-tip="Mail">
                <button
                  type="button"
                  className="btn btn-lg btn-circle btn-info cursor-pointer"
                  aria-label="Mail"
                >
                  <Mail className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div className="tooltip tooltip-warning tooltip-left" data-tip="Favorite">
                <button
                  type="button"
                  className="btn btn-lg btn-circle btn-warning cursor-pointer"
                  aria-label="Favorite"
                >
                  <Heart className="size-5" strokeWidth={1.75} />
                </button>
              </div>
              <div className="tooltip tooltip-error tooltip-left" data-tip="Close menu">
                <button
                  type="button"
                  className="btn btn-lg btn-circle btn-error cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="size-5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </FabStage>
          <p className="mt-3">
            <ClassLabel value="fab + btn-info / btn-warning / btn-error actions" />
          </p>`}
          />
        
        </Section>
      </div>
    </>
  )
}
