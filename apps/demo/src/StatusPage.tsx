import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colors = [
  { name: 'Neutral', className: 'status-neutral' },
  { name: 'Primary', className: 'status-primary' },
  { name: 'Secondary', className: 'status-secondary' },
  { name: 'Accent', className: 'status-accent' },
  { name: 'Info', className: 'status-info' },
  { name: 'Success', className: 'status-success' },
  { name: 'Warning', className: 'status-warning' },
  { name: 'Error', className: 'status-error' },
] as const

const sizes = [
  { name: 'XS', className: 'status-xs' },
  { name: 'SM', className: 'status-sm' },
  { name: 'MD', className: 'status-md' },
  { name: 'LG', className: 'status-lg' },
  { name: 'XL', className: 'status-xl' },
] as const

const presence = [
  { name: 'Online', className: 'status-success', detail: 'Painting now' },
  { name: 'Away', className: 'status-warning', detail: 'Back in 20 min' },
  { name: 'Busy', className: 'status-error', detail: 'Critique in progress' },
  { name: 'Offline', className: 'status-neutral', detail: 'Last seen yesterday' },
] as const

const studioStates = [
  {
    name: 'Layer wet',
    className: 'status-info',
    detail: 'Wash still drying',
  },
  {
    name: 'Layer dry',
    className: 'status-success',
    detail: 'Ready to glaze',
  },
  {
    name: 'Brush ready',
    className: 'status-primary',
    detail: 'Round 6 loaded',
  },
  {
    name: 'Syncing',
    className: 'status-warning',
    detail: 'Uploading plate',
  },
  {
    name: 'Synced',
    className: 'status-success',
    detail: 'Cloud up to date',
  },
  {
    name: 'Sync failed',
    className: 'status-error',
    detail: 'Retry when online',
  },
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
      {value || 'status'}
    </code>
  )
}

function Sample({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

export default function StatusPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Status
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">status</span> dots for presence, sync, and studio state.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Default status dots"
          description="Bare status spans"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end justify-center gap-8 sm:justify-start">
                            <Sample label="status">
                              <span className="status cursor-default" aria-label="Status" />
                            </Sample>
                            <Sample label="status (pair)">
                              <div className="flex items-center gap-2">
                                <span className="status cursor-default" aria-hidden />
                                <span className="status cursor-default" aria-hidden />
                                <span className="status cursor-default" aria-hidden />
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end justify-center gap-8 sm:justify-start">
            
              <span class="status cursor-default" aria-label="Status" />
            
            
              <div class="flex items-center gap-2">
                <span class="status cursor-default" aria-hidden />
                <span class="status cursor-default" aria-hidden />
                <span class="status cursor-default" aria-hidden />
              </div>
            
          </div>`}
            jsx={`<div className="flex flex-wrap items-end justify-center gap-8 sm:justify-start">
            
              <span className="status cursor-default" aria-label="Status" />
            
            
              <div className="flex items-center gap-2">
                <span className="status cursor-default" aria-hidden />
                <span className="status cursor-default" aria-hidden />
                <span className="status cursor-default" aria-hidden />
              </div>
            
          </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="Brand and feedback colors with class labels"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
                            {colors.map((c) => (
                              <Sample key={c.name} label={`status ${c.className}`}>
                                <span
                                  className={`status cursor-default ${c.className}`}
                                  aria-label={c.name}
                                />
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={`<div class="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
            {colors.map((c) => (
              
                <span
                  className={\`status cursor-default \${c.className}\`}
                  aria-label={c.name}
                />
              
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="status-xs through status-xl"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
                            {sizes.map((s) => (
                              <Sample key={s.name} label={`status status-primary ${s.className}`}>
                                <span
                                  className={`status status-primary cursor-default ${s.className}`}
                                  aria-label={`${s.name} status`}
                                />
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
            {sizes.map((s) => (
              
                <span
                  className={\`status status-primary cursor-default \${s.className}\`}
                  aria-label={\`\${s.name} status\`}
                />
              
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · With text"
          title="Online and offline rows"
          description="Status dots beside labels for presence lists and unread cues"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-3">
                              {presence.map((row) => (
                                <div
                                  key={row.name}
                                  className="flex items-center gap-3 rounded-box border border-ink-border/70 bg-base-100/70 px-4 py-3"
                                >
                                  <span
                                    className={`status shrink-0 cursor-default ${row.className}`}
                                    aria-hidden
                                  />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">{row.name}</p>
                                    <p className="text-xs text-ink-muted">{row.detail}</p>
                                  </div>
                                  <ClassLabel value={`status ${row.className}`} />
                                </div>
                              ))}
                            </div>
                
                            <div className="flex flex-col justify-center gap-6">
                              <Sample label="status status-error animate-ping">
                                <div className="flex items-center gap-3 text-sm">
                                  <div className="inline-grid *:[grid-area:1/1]">
                                    <div
                                      className="status status-error animate-ping cursor-default"
                                      aria-hidden
                                    />
                                    <div
                                      className="status status-error cursor-default"
                                      aria-label="Server is down"
                                    />
                                  </div>
                                  Server is down
                                </div>
                              </Sample>
                              <Sample label="status status-info animate-bounce">
                                <div className="flex items-center gap-3 text-sm">
                                  <span
                                    className="status status-info animate-bounce cursor-default"
                                    aria-hidden
                                  />
                                  Unread messages
                                </div>
                              </Sample>
                            </div>
                          </div>
              </>
            }
            html={`<div class="grid gap-6 lg:grid-cols-2">
            <div class="space-y-3">
              <!-- repeat for each item -->
            </div>

            <div class="flex flex-col justify-center gap-6">
              
                <div class="flex items-center gap-3 text-sm">
                  <div class="inline-grid *:[grid-area:1/1]">
                    <div
                      class="status status-error animate-ping cursor-default"
                      aria-hidden
                    />
                    <div
                      class="status status-error cursor-default"
                      aria-label="Server is down"
                    />
                  </div>
                  Server is down
                </div>
              
              
                <div class="flex items-center gap-3 text-sm">
                  <span
                    class="status status-info animate-bounce cursor-default"
                    aria-hidden
                  />
                  Unread messages
                </div>
              
            </div>
          </div>`}
            jsx={`<div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              {presence.map((row) => (
                <div
                  key={row.name}
                  className="flex items-center gap-3 rounded-box border border-ink-border/70 bg-base-100/70 px-4 py-3"
                >
                  <span
                    className={\`status shrink-0 cursor-default \${row.className}\`}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{row.name}</p>
                    <p className="text-xs text-ink-muted">{row.detail}</p>
                  </div>
                  
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-6">
              
                <div className="flex items-center gap-3 text-sm">
                  <div className="inline-grid *:[grid-area:1/1]">
                    <div
                      className="status status-error animate-ping cursor-default"
                      aria-hidden
                    />
                    <div
                      className="status status-error cursor-default"
                      aria-label="Server is down"
                    />
                  </div>
                  Server is down
                </div>
              
              
                <div className="flex items-center gap-3 text-sm">
                  <span
                    className="status status-info animate-bounce cursor-default"
                    aria-hidden
                  />
                  Unread messages
                </div>
              
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Studio"
          title="Menzies Design states"
          description="Layer wet or dry, brush ready, and sync outcomes"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {studioStates.map((row) => (
                              <div
                                key={row.name}
                                className="flex items-start gap-3 rounded-box border border-ink-border/70 bg-base-100/70 px-4 py-3"
                              >
                                <span
                                  className={`status mt-1 shrink-0 cursor-default ${row.className}`}
                                  aria-hidden
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium">{row.name}</p>
                                  <p className="text-xs text-ink-muted">{row.detail}</p>
                                  <div className="mt-2">
                                    <ClassLabel value={`status ${row.className}`} />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
              </>
            }
            html={`<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {studioStates.map((row) => (
              <div
                key={row.name}
                className="flex items-start gap-3 rounded-box border border-ink-border/70 bg-base-100/70 px-4 py-3"
              >
                <span
                  className={\`status mt-1 shrink-0 cursor-default \${row.className}\`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{row.name}</p>
                  <p className="text-xs text-ink-muted">{row.detail}</p>
                  <div className="mt-2">
                    
                  </div>
                </div>
              </div>
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Breakpoint layouts"
          description="Dots stack tightly on mobile, then open into a labeled size row"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                            <Sample label="status-xs sm:status-sm md:status-md lg:status-lg">
                              <span
                                className="status status-accent status-xs cursor-default sm:status-sm md:status-md lg:status-lg"
                                aria-label="Responsive size status"
                              />
                            </Sample>
                            <div className="grid w-full grid-cols-2 gap-3 sm:max-w-md sm:grid-cols-4">
                              {(['status-success', 'status-warning', 'status-error', 'status-info'] as const).map(
                                (cls) => (
                                  <div
                                    key={cls}
                                    className="flex items-center gap-2 rounded-box border border-ink-border/60 bg-base-100/60 px-3 py-2"
                                  >
                                    <span className={`status cursor-default ${cls}`} aria-hidden />
                                    <span className="truncate text-xs capitalize">
                                      {cls.replace('status-', '')}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            
              <span
                class="status status-accent status-xs cursor-default sm:status-sm md:status-md lg:status-lg"
                aria-label="Responsive size status"
              />
            
            <div class="grid w-full grid-cols-2 gap-3 sm:max-w-md sm:grid-cols-4">
              <!-- repeat for each item -->
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>`}
            jsx={`<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            
              <span
                className="status status-accent status-xs cursor-default sm:status-sm md:status-md lg:status-lg"
                aria-label="Responsive size status"
              />
            
            <div className="grid w-full grid-cols-2 gap-3 sm:max-w-md sm:grid-cols-4">
              {(['status-success', 'status-warning', 'status-error', 'status-info'] as const).map(
                (cls) => (
                  <div
                    key={cls}
                    className="flex items-center gap-2 rounded-box border border-ink-border/60 bg-base-100/60 px-3 py-2"
                  >
                    <span className={\`status cursor-default \${cls}\`} aria-hidden />
                    <span className="truncate text-xs capitalize">
                      {cls.replace('status-', '')}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
