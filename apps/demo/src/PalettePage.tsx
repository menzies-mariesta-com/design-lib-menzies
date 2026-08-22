import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { Check } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  applyTheme,
  readStoredMode,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  watercolorThemes,
  type ThemeChangeDetail,
  type WatercolorThemeId,
} from './themes'

const semanticColors = [
  { name: 'Primary', bg: 'bg-primary', content: 'text-primary-content', label: 'bg-primary' },
  {
    name: 'Secondary',
    bg: 'bg-secondary',
    content: 'text-secondary-content',
    label: 'bg-secondary',
  },
  { name: 'Accent', bg: 'bg-accent', content: 'text-accent-content', label: 'bg-accent' },
  { name: 'Neutral', bg: 'bg-neutral', content: 'text-neutral-content', label: 'bg-neutral' },
  { name: 'Base 100', bg: 'bg-base-100', content: 'text-base-content', label: 'bg-base-100' },
  { name: 'Base 200', bg: 'bg-base-200', content: 'text-base-content', label: 'bg-base-200' },
  { name: 'Base 300', bg: 'bg-base-300', content: 'text-base-content', label: 'bg-base-300' },
  { name: 'Info', bg: 'bg-info', content: 'text-info-content', label: 'bg-info' },
  { name: 'Success', bg: 'bg-success', content: 'text-success-content', label: 'bg-success' },
  { name: 'Warning', bg: 'bg-warning', content: 'text-warning-content', label: 'bg-warning' },
  { name: 'Error', bg: 'bg-error', content: 'text-error-content', label: 'bg-error' },
] as const

const washTokens: {
  name: string
  note: string
  style: CSSProperties
  label: string
  swatchText?: string
}[] = [
  {
    name: 'Wash A',
    note: 'Cool wash · wash-blue',
    style: { backgroundColor: 'var(--wash-a)' },
    label: '--wash-a / wash-blue',
  },
  {
    name: 'Wash B',
    note: 'Warm wash · wash-ochre',
    style: { backgroundColor: 'var(--wash-b)' },
    label: '--wash-b / wash-ochre',
  },
  {
    name: 'Wash C',
    note: 'Rose wash · wash-rose',
    style: { backgroundColor: 'var(--wash-c)' },
    label: '--wash-c / wash-rose',
  },
  {
    name: 'Paper fiber',
    note: 'Grain undertone',
    style: { backgroundColor: 'var(--paper-fiber)' },
    label: '--paper-fiber',
  },
  {
    name: 'Ink muted',
    note: 'Secondary copy',
    style: { backgroundColor: 'var(--ink-muted)' },
    label: '--ink-muted',
    swatchText: 'text-base-100',
  },
  {
    name: 'Ink border',
    note: 'Hairline rules',
    style: { backgroundColor: 'var(--ink-border)' },
    label: '--ink-border',
  },
]

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

export default function PalettePage() {
  const [activePigment, setActivePigment] = useState<WatercolorThemeId>(() =>
    readStoredTheme(),
  )

  useEffect(() => {
    function onThemeChange(event: Event) {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail
      if (!detail) return
      setActivePigment(detail.pigment)
    }

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange)
  }, [])

  function selectPigment(id: WatercolorThemeId) {
    setActivePigment(id)
    applyTheme(id, readStoredMode())
  }

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Color gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Palette
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Semantic daisyUI roles, Menzies Design wash tokens, and all{' '}
          {watercolorThemes.length} pigment themes. Click a pigment to restain
          the desk; light and dark mode stay as set.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Semantic"
          title="daisyUI color roles"
          description="Primary through status colors, plus the base paper stack. Labels match Tailwind / daisyUI class names."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                          {semanticColors.map((swatch) => (
                            <div key={swatch.label} className="flex flex-col gap-2">
                              <div
                                className={`flex h-20 items-end rounded-box border border-ink-border p-2.5 ${swatch.bg} ${swatch.content}`}
                              >
                                <span className="font-display text-sm font-semibold leading-tight">
                                  {swatch.name}
                                </span>
                              </div>
                              <ClassLabel value={swatch.label} />
                            </div>
                          ))}
                        </div>
            
              </>
            }
            html={`<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {semanticColors.map((swatch) => (
              <div key= class="flex flex-col gap-2">
                <div
                  class=
                >
                  <span class="font-display text-sm font-semibold leading-tight">
                    
                  </span>
                </div>
                <!-- ClassLabel -->
              </div>
            ))}
          </div>`}
            jsx={`<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {semanticColors.map((swatch) => (
              <div key={swatch.label} className="flex flex-col gap-2">
                <div
                  className={\`flex h-20 items-end rounded-box border border-ink-border p-2.5 \${swatch.bg} \${swatch.content}\`}
                >
                  <span className="font-display text-sm font-semibold leading-tight">
                    {swatch.name}
                  </span>
                </div>
                <ClassLabel value={swatch.label} />
              </div>
            ))}
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="02 · Wash tokens"
          title="Paper and pigment washes"
          description="Studio CSS variables that tint panels, grain, and muted ink. Values follow the active pigment theme."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                          {washTokens.map((token) => (
                            <div key={token.label} className="flex flex-col gap-2">
                              <div
                                className={`flex h-20 flex-col justify-end rounded-box border border-ink-border p-2.5 ${
                                  token.swatchText ?? 'text-base-content'
                                }`}
                                style={token.style}
                              >
                                <span className="font-display text-sm font-semibold leading-tight">
                                  {token.name}
                                </span>
                                <span className="mt-0.5 text-[0.65rem] opacity-80">{token.note}</span>
                              </div>
                              <ClassLabel value={token.label} />
                            </div>
                          ))}
                        </div>
            
              </>
            }
            html={`<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {washTokens.map((token) => (
              <div key= class="flex flex-col gap-2">
                <div
                  class=
                  style=
                >
                  <span class="font-display text-sm font-semibold leading-tight">
                    
                  </span>
                  <span class="mt-0.5 text-[0.65rem] opacity-80"></span>
                </div>
                <!-- ClassLabel -->
              </div>
            ))}
          </div>`}
            jsx={`<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {washTokens.map((token) => (
              <div key={token.label} className="flex flex-col gap-2">
                <div
                  className={\`flex h-20 flex-col justify-end rounded-box border border-ink-border p-2.5 \${
                    token.swatchText ?? 'text-base-content'
                  }\`}
                  style={token.style}
                >
                  <span className="font-display text-sm font-semibold leading-tight">
                    {token.name}
                  </span>
                  <span className="mt-0.5 text-[0.65rem] opacity-80">{token.note}</span>
                </div>
                <ClassLabel value={token.label} />
              </div>
            ))}
          </div>`}
          />
        
        </Section>

        <Section
          eyebrow="03 · Pigments"
          title="Watercolor themes"
          description="Select a pigment to apply it across Menzies Design. Mode (light / dark) is preserved from ThemeSwitcher."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                          {watercolorThemes.map((theme) => {
                            const active = theme.id === activePigment
                            return (
                              <button
                                key={theme.id}
                                type="button"
                                aria-pressed={active}
                                aria-label={`Apply ${theme.label} pigment`}
                                className={`flex cursor-pointer flex-col gap-2 rounded-box border p-2 text-left transition-[box-shadow,border-color] ${
                                  active
                                    ? 'border-primary shadow-[var(--shadow-paper-sm)] dry-brush'
                                    : 'border-ink-border hover:border-primary/40'
                                }`}
                                onClick={() => selectPigment(theme.id)}
                              >
                                <div
                                  className="relative flex h-16 items-end justify-between rounded-lg border border-ink-border/60 p-2"
                                  style={{
                                    background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${theme.swatch} 55%, color-mix(in oklab, ${theme.swatch} 70%, black) 100%)`,
                                  }}
                                >
                                  {active ? (
                                    <span className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-base-100/90 text-primary">
                                      <Check className="size-3.5" strokeWidth={2.5} />
                                    </span>
                                  ) : null}
                                </div>
                                <div className="min-w-0 px-0.5">
                                  <p className="font-display text-sm font-semibold leading-tight">
                                    {theme.label}
                                  </p>
                                  <p className="mt-0.5 font-mono text-[0.65rem] text-ink-muted">
                                    {theme.note}
                                  </p>
                                  <ClassLabel value={theme.id} />
                                </div>
                              </button>
                            )
                          })}
                        </div>
            
              </>
            }
            html={`<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {watercolorThemes.map((theme) => {
              const active = theme.id === activePigment
              return (
                <button
                  key=
                  type="button"
                  aria-pressed="true"
                  aria-label="Label" pigment\`}
                  class=
                  
                >
                  <div
                    class="relative flex h-16 items-end justify-between rounded-lg border border-ink-border/60 p-2"
                    style={{
                      background: \`radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, $ 55%, color-mix(in oklab, $ 70%, black) 100%)\`,
                    }}
                  >
                    {active ? (
                      <span class="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-base-100/90 text-primary">
                        <!-- Check -->
                      </span>
                    ) : null}
                  </div>
                  <div class="min-w-0 px-0.5">
                    <p class="font-display text-sm font-semibold leading-tight">
                      
                    </p>
                    <p class="mt-0.5 font-mono text-[0.65rem] text-ink-muted">
                      
                    </p>
                    <!-- ClassLabel -->
                  </div>
                </button>
              )
            })}
          </div>`}
            jsx={`<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {watercolorThemes.map((theme) => {
              const active = theme.id === activePigment
              return (
                <button
                  key={theme.id}
                  type="button"
                  aria-pressed={active}
                  aria-label={\`Apply \${theme.label} pigment\`}
                  className={\`flex cursor-pointer flex-col gap-2 rounded-box border p-2 text-left transition-[box-shadow,border-color] \${
                    active
                      ? 'border-primary shadow-[var(--shadow-paper-sm)] dry-brush'
                      : 'border-ink-border hover:border-primary/40'
                  }\`}
                  onClick={() => selectPigment(theme.id)}
                >
                  <div
                    className="relative flex h-16 items-end justify-between rounded-lg border border-ink-border/60 p-2"
                    style={{
                      background: \`radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, \${theme.swatch} 55%, color-mix(in oklab, \${theme.swatch} 70%, black) 100%)\`,
                    }}
                  >
                    {active ? (
                      <span className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-base-100/90 text-primary">
                        <Check className="size-3.5" strokeWidth={2.5} />
                      </span>
                    ) : null}
                  </div>
                  <div className="min-w-0 px-0.5">
                    <p className="font-display text-sm font-semibold leading-tight">
                      {theme.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.65rem] text-ink-muted">
                      {theme.note}
                    </p>
                    <ClassLabel value={theme.id} />
                  </div>
                </button>
              )
            })}
          </div>`}
          />
        
        </Section>
      </div>
    </>
  )
}
