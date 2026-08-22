import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown, Moon, Sun } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  DROPDOWN_PANEL_OVERFLOW,
  useDetailsDropdownPlacement,
} from './dropdownPlacement'
import {
  applyMode,
  applyTheme,
  readStoredMode,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  themeDataAttr,
  watercolorThemes,
  type ThemeChangeDetail,
  type ThemeMode,
  type WatercolorThemeId,
} from './themes'
import { ShowcaseTabs } from './components/ShowcaseTabs'

/** Pigment subset for compact dropdown / button demos */
const DEMO_PIGMENT_IDS: WatercolorThemeId[] = [
  'mineral',
  'indigo',
  'celadon',
  'vermilion',
  'sepia',
  'cobalt',
]
const DEMO_PIGMENTS = watercolorThemes.filter((t) =>
  DEMO_PIGMENT_IDS.includes(t.id),
)

/** Studio strip: first dozen pigments for a readable radio row */
const STRIP_PIGMENTS = watercolorThemes.slice(0, 12)

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
  return <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
}

function useMenziesTheme() {
  const [pigment, setPigment] = useState<WatercolorThemeId>(() => readStoredTheme())
  const [mode, setMode] = useState<ThemeMode>(() => readStoredMode())

  useEffect(() => {
    function onThemeChange(event: Event) {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail
      if (!detail) return
      setPigment(detail.pigment)
      setMode(detail.mode)
    }

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange)
  }, [])

  function selectPigment(id: WatercolorThemeId) {
    setPigment(id)
    applyTheme(id, mode)
  }

  function selectMode(next: ThemeMode) {
    setMode(next)
    applyMode(next)
  }

  function toggleMode() {
    selectMode(mode === 'dark' ? 'light' : 'dark')
  }

  return { pigment, mode, selectPigment, selectMode, toggleMode }
}

function PigmentDropdown({
  pigment,
  mode,
  onSelect,
}: {
  pigment: WatercolorThemeId
  mode: ThemeMode
  onSelect: (id: WatercolorThemeId) => void
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const { className: dropdownClass, onToggle } = useDetailsDropdownPlacement(
    detailsRef,
    { panelWidth: 208, panelHeight: 280 },
  )
  const current =
    DEMO_PIGMENTS.find((t) => t.id === pigment) ??
    watercolorThemes.find((t) => t.id === pigment) ??
    DEMO_PIGMENTS[0]

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = detailsRef.current
      if (!el?.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && detailsRef.current?.open) {
        detailsRef.current.open = false
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <details ref={detailsRef} className={dropdownClass} onToggle={onToggle}>
      <summary className="btn m-1 cursor-pointer gap-2 border border-ink-border [&::-webkit-details-marker]:hidden">
        Theme
        <ChevronDown className="size-3 opacity-60" strokeWidth={2} aria-hidden />
      </summary>
      <ul
        className={`dropdown-content menu z-20 w-52 rounded-box border border-ink-border bg-base-200 p-2 shadow-xl ${DROPDOWN_PANEL_OVERFLOW}`}
      >
        {DEMO_PIGMENTS.map((item) => {
          const value = themeDataAttr(item.id, mode)
          const active = item.id === pigment
          return (
            <li key={item.id}>
              <input
                type="radio"
                name="theme-dropdown-demo"
                className="theme-controller btn btn-ghost btn-sm btn-block cursor-pointer justify-start"
                aria-label={item.label}
                value={value}
                checked={active}
                onChange={() => {
                  onSelect(item.id)
                  if (detailsRef.current) detailsRef.current.open = false
                }}
              />
            </li>
          )
        })}
      </ul>
      <p className="mt-2 px-1 text-xs text-ink-muted">
        Active: {current.label} · {mode}
      </p>
      <ClassLabel value="dropdown + theme-controller radio" />
    </details>
  )
}

export default function ThemeControllerPage() {
  const { pigment, mode, selectPigment, selectMode, toggleMode } = useMenziesTheme()
  const darkValue = themeDataAttr(pigment, 'dark')
  const isDark = mode === 'dark'

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Theme controller
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">theme-controller</span>{' '}
          patterns wired to Menzies Design pigments. Controllers call the same{' '}
          <span className="font-mono text-xs">applyTheme</span> helpers as the
          navbar ThemeSwitcher so the shell stays in sync.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="00 · Note"
          title="Production chrome"
          description="Live pigment and light/dark controls for the desk live in the navbar ThemeSwitcher. This page is a gallery of controller patterns."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="rounded-box border border-ink-border/60 bg-base-100/60 p-4 text-sm leading-relaxed text-ink-muted">
                            Prefer ThemeSwitcher for day-to-day switching. Gallery demos below keep{' '}
                            <span className="font-mono text-xs">design-web-menzies-theme</span> and{' '}
                            <span className="font-mono text-xs">design-web-menzies-mode</span> aligned via{' '}
                            <span className="font-mono text-xs">THEME_CHANGE_EVENT</span>.
                          </div>
              </>
            }
            html={`<div class="rounded-box border border-ink-border/60 bg-base-100/60 p-4 text-sm leading-relaxed text-ink-muted">
            Prefer ThemeSwitcher for day-to-day switching. Gallery demos below keep
            <span class="font-mono text-xs">design-web-menzies-theme</span> and
            <span class="font-mono text-xs">design-web-menzies-mode</span> aligned via
            <span class="font-mono text-xs">THEME_CHANGE_EVENT</span>.
          </div>`}
            jsx={`<div className="rounded-box border border-ink-border/60 bg-base-100/60 p-4 text-sm leading-relaxed text-ink-muted">
            Prefer ThemeSwitcher for day-to-day switching. Gallery demos below keep{' '}
            <span className="font-mono text-xs">design-web-menzies-theme</span> and{' '}
            <span className="font-mono text-xs">design-web-menzies-mode</span> aligned via{' '}
            <span className="font-mono text-xs">THEME_CHANGE_EVENT</span>.
          </div>`}
          />
        </Section>

        <Section
          eyebrow="01 · Basic"
          title="Checkbox and radio controllers"
          description="Official theme-controller markup on toggles, checkboxes, and radios. Values map to watercolor data-theme ids; changes go through applyTheme."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-start gap-3">
                              <input
                                type="checkbox"
                                value={darkValue}
                                className="toggle theme-controller cursor-pointer"
                                checked={isDark}
                                aria-label="Toggle dark mode"
                                onChange={(e) => selectMode(e.target.checked ? 'dark' : 'light')}
                              />
                              <ClassLabel value="toggle theme-controller" />
                              <span className="text-xs text-ink-muted">Toggle · light / dark</span>
                            </div>
                
                            <div className="flex flex-col items-start gap-3">
                              <input
                                type="checkbox"
                                value={darkValue}
                                className="checkbox theme-controller cursor-pointer"
                                checked={isDark}
                                aria-label="Checkbox dark mode"
                                onChange={(e) => selectMode(e.target.checked ? 'dark' : 'light')}
                              />
                              <ClassLabel value="checkbox theme-controller" />
                              <span className="text-xs text-ink-muted">Checkbox · light / dark</span>
                            </div>
                
                            <div className="flex flex-col items-start gap-3 sm:col-span-2 lg:col-span-1">
                              <label className="flex cursor-pointer items-center gap-2">
                                <Sun className="size-5 shrink-0" strokeWidth={2} aria-hidden />
                                <input
                                  type="checkbox"
                                  value={darkValue}
                                  className="toggle theme-controller cursor-pointer"
                                  checked={isDark}
                                  aria-label="Toggle dark mode with icons"
                                  onChange={(e) => selectMode(e.target.checked ? 'dark' : 'light')}
                                />
                                <Moon className="size-5 shrink-0" strokeWidth={2} aria-hidden />
                              </label>
                              <ClassLabel value="toggle theme-controller + icons" />
                              <span className="text-xs text-ink-muted">Labeled toggle</span>
                            </div>
                          </div>
                
                          <fieldset className="fieldset mt-8 rounded-box border border-ink-border/50 bg-base-100/40 p-4">
                            <legend className="fieldset-legend px-1 text-sm font-medium">
                              Radio pigments (demo set)
                            </legend>
                            <div className="flex flex-wrap gap-3 pt-1">
                              {DEMO_PIGMENTS.map((item) => {
                                const value = themeDataAttr(item.id, mode)
                                return (
                                  <label
                                    key={item.id}
                                    className="flex cursor-pointer items-center gap-2"
                                  >
                                    <input
                                      type="radio"
                                      name="theme-radios-basic"
                                      className="radio radio-sm theme-controller cursor-pointer"
                                      value={value}
                                      checked={pigment === item.id}
                                      onChange={() => selectPigment(item.id)}
                                    />
                                    <span className="text-sm">{item.label}</span>
                                  </label>
                                )
                              })}
                            </div>
                            <ClassLabel value="radio radio-sm theme-controller" />
                          </fieldset>
              </>
            }
            html={`<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col items-start gap-3">
              <input
                type="checkbox"
                value=
                class="toggle theme-controller cursor-pointer"
                checked=
                aria-label="Toggle dark mode"
                onChange=
              />
              
              <span class="text-xs text-ink-muted">Toggle · light / dark</span>
            </div>

            <div class="flex flex-col items-start gap-3">
              <input
                type="checkbox"
                value=
                class="checkbox theme-controller cursor-pointer"
                checked=
                aria-label="Checkbox dark mode"
                onChange=
              />
              
              <span class="text-xs text-ink-muted">Checkbox · light / dark</span>
            </div>

            <div class="flex flex-col items-start gap-3 sm:col-span-2 lg:col-span-1">
              <label class="flex cursor-pointer items-center gap-2">
                <Sun class="size-5 shrink-0" strokeWidth= aria-hidden />
                <input
                  type="checkbox"
                  value=
                  class="toggle theme-controller cursor-pointer"
                  checked=
                  aria-label="Toggle dark mode with icons"
                  onChange=
                />
                <Moon class="size-5 shrink-0" strokeWidth= aria-hidden />
              </label>
              
              <span class="text-xs text-ink-muted">Labeled toggle</span>
            </div>
          </div>

          <fieldset class="fieldset mt-8 rounded-box border border-ink-border/50 bg-base-100/40 p-4">
            <legend class="fieldset-legend px-1 text-sm font-medium">
              Radio pigments (demo set)
            </legend>
            <div class="flex flex-wrap gap-3 pt-1">
              <!-- repeat for each item -->
                    />
                    <span class="text-sm"></span>
                  </label>
                )
              })}
            </div>
            
          </fieldset>`}
            jsx={`<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-start gap-3">
              <input
                type="checkbox"
                value={darkValue}
                className="toggle theme-controller cursor-pointer"
                checked={isDark}
                aria-label="Toggle dark mode"
                onChange={(e) => selectMode(e.target.checked ? 'dark' : 'light')}
              />
              
              <span className="text-xs text-ink-muted">Toggle · light / dark</span>
            </div>

            <div className="flex flex-col items-start gap-3">
              <input
                type="checkbox"
                value={darkValue}
                className="checkbox theme-controller cursor-pointer"
                checked={isDark}
                aria-label="Checkbox dark mode"
                onChange={(e) => selectMode(e.target.checked ? 'dark' : 'light')}
              />
              
              <span className="text-xs text-ink-muted">Checkbox · light / dark</span>
            </div>

            <div className="flex flex-col items-start gap-3 sm:col-span-2 lg:col-span-1">
              <label className="flex cursor-pointer items-center gap-2">
                <Sun className="size-5 shrink-0" strokeWidth={2} aria-hidden />
                <input
                  type="checkbox"
                  value={darkValue}
                  className="toggle theme-controller cursor-pointer"
                  checked={isDark}
                  aria-label="Toggle dark mode with icons"
                  onChange={(e) => selectMode(e.target.checked ? 'dark' : 'light')}
                />
                <Moon className="size-5 shrink-0" strokeWidth={2} aria-hidden />
              </label>
              
              <span className="text-xs text-ink-muted">Labeled toggle</span>
            </div>
          </div>

          <fieldset className="fieldset mt-8 rounded-box border border-ink-border/50 bg-base-100/40 p-4">
            <legend className="fieldset-legend px-1 text-sm font-medium">
              Radio pigments (demo set)
            </legend>
            <div className="flex flex-wrap gap-3 pt-1">
              {DEMO_PIGMENTS.map((item) => {
                const value = themeDataAttr(item.id, mode)
                return (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="theme-radios-basic"
                      className="radio radio-sm theme-controller cursor-pointer"
                      value={value}
                      checked={pigment === item.id}
                      onChange={() => selectPigment(item.id)}
                    />
                    <span className="text-sm">{item.label}</span>
                  </label>
                )
              })}
            </div>
            
          </fieldset>`}
          />
        </Section>

        <Section
          eyebrow="02 · Swap"
          title="Sun and moon swap"
          description="swap-rotate with a theme-controller checkbox. Checked state tracks design-web-menzies-mode and updates the shell."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-10">
                            <div className="flex flex-col items-center gap-2">
                              <label className="swap swap-rotate cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="theme-controller"
                                  value={darkValue}
                                  checked={isDark}
                                  aria-label={isDark ? 'Switch to light' : 'Switch to dark'}
                                  onChange={toggleMode}
                                />
                                <Sun className="swap-off size-10" strokeWidth={2} />
                                <Moon className="swap-on size-10" strokeWidth={2} />
                              </label>
                              <ClassLabel value="swap swap-rotate + theme-controller" />
                              <span className="text-xs text-ink-muted">
                                Mode: {mode} · pigment {pigment}
                              </span>
                            </div>
                
                            <div className="flex flex-col items-center gap-2">
                              <label className="toggle text-base-content cursor-pointer">
                                <input
                                  type="checkbox"
                                  value={darkValue}
                                  className="theme-controller"
                                  checked={isDark}
                                  aria-label="Toggle with icons inside"
                                  onChange={(e) => selectMode(e.target.checked ? 'dark' : 'light')}
                                />
                                <Sun className="size-4" strokeWidth={2} aria-hidden />
                                <Moon className="size-4" strokeWidth={2} aria-hidden />
                              </label>
                              <ClassLabel value="toggle + theme-controller (icons inside)" />
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-10">
            <div class="flex flex-col items-center gap-2">
              <label class="swap swap-rotate cursor-pointer">
                <input
                  type="checkbox"
                  class="theme-controller"
                  value=
                  checked=
                  aria-label=
                  onChange=
                />
                <Sun class="swap-off size-10" strokeWidth= />
                <Moon class="swap-on size-10" strokeWidth= />
              </label>
              
              <span class="text-xs text-ink-muted">
                Mode:  · pigment 
              </span>
            </div>

            <div class="flex flex-col items-center gap-2">
              <label class="toggle text-base-content cursor-pointer">
                <input
                  type="checkbox"
                  value=
                  class="theme-controller"
                  checked=
                  aria-label="Toggle with icons inside"
                  onChange=
                />
                <Sun class="size-4" strokeWidth= aria-hidden />
                <Moon class="size-4" strokeWidth= aria-hidden />
              </label>
              
            </div>
          </div>`}
            jsx={`<div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-10">
            <div className="flex flex-col items-center gap-2">
              <label className="swap swap-rotate cursor-pointer">
                <input
                  type="checkbox"
                  className="theme-controller"
                  value={darkValue}
                  checked={isDark}
                  aria-label={isDark ? 'Switch to light' : 'Switch to dark'}
                  onChange={toggleMode}
                />
                <Sun className="swap-off size-10" strokeWidth={2} />
                <Moon className="swap-on size-10" strokeWidth={2} />
              </label>
              
              <span className="text-xs text-ink-muted">
                Mode: {mode} · pigment {pigment}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="toggle text-base-content cursor-pointer">
                <input
                  type="checkbox"
                  value={darkValue}
                  className="theme-controller"
                  checked={isDark}
                  aria-label="Toggle with icons inside"
                  onChange={(e) => selectMode(e.target.checked ? 'dark' : 'light')}
                />
                <Sun className="size-4" strokeWidth={2} aria-hidden />
                <Moon className="size-4" strokeWidth={2} aria-hidden />
              </label>
              
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Picker"
          title="Dropdown and button join"
          description="Pick among a subset of watercolorThemes. Radios keep the theme-controller class; selection uses applyTheme so ThemeSwitcher updates."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                            <PigmentDropdown
                              pigment={pigment}
                              mode={mode}
                              onSelect={selectPigment}
                            />
                
                            <div className="flex flex-col gap-2">
                              <div className="join join-vertical sm:join-horizontal">
                                {DEMO_PIGMENTS.map((item) => {
                                  const value = themeDataAttr(item.id, mode)
                                  return (
                                    <input
                                      key={item.id}
                                      type="radio"
                                      name="theme-buttons-demo"
                                      className="btn theme-controller join-item cursor-pointer"
                                      aria-label={item.label}
                                      value={value}
                                      checked={pigment === item.id}
                                      onChange={() => selectPigment(item.id)}
                                    />
                                  )
                                })}
                              </div>
                              <ClassLabel value="join + btn theme-controller" />
                            </div>
                          </div>
              </>
            }
            html={`<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <PigmentDropdown
              pigment=
              mode=
              onSelect=
            />

            <div class="flex flex-col gap-2">
              <div class="join join-vertical sm:join-horizontal">
                <!-- repeat for each item -->
                    />
                  )
                })}
              </div>
              
            </div>
          </div>`}
            jsx={`<div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <PigmentDropdown
              pigment={pigment}
              mode={mode}
              onSelect={selectPigment}
            />

            <div className="flex flex-col gap-2">
              <div className="join join-vertical sm:join-horizontal">
                {DEMO_PIGMENTS.map((item) => {
                  const value = themeDataAttr(item.id, mode)
                  return (
                    <input
                      key={item.id}
                      type="radio"
                      name="theme-buttons-demo"
                      className="btn theme-controller join-item cursor-pointer"
                      aria-label={item.label}
                      value={value}
                      checked={pigment === item.id}
                      onChange={() => selectPigment(item.id)}
                    />
                  )
                })}
              </div>
              
            </div>
          </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Studio strip"
          title="Pigment radio strip"
          description="A wider strip of pigments using official controller classes. Responsive wrap on small screens."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap gap-2">
                            {STRIP_PIGMENTS.map((item) => {
                              const value = themeDataAttr(item.id, mode)
                              const active = pigment === item.id
                              return (
                                <label
                                  key={item.id}
                                  className={`flex cursor-pointer items-center gap-2 rounded-box border px-2.5 py-2 transition-[border-color,box-shadow] ${
                                    active
                                      ? 'border-primary shadow-[var(--shadow-paper-sm)]'
                                      : 'border-ink-border/70 hover:border-primary/40'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="theme-strip"
                                    className="theme-controller radio radio-sm cursor-pointer"
                                    value={value}
                                    checked={active}
                                    onChange={() => selectPigment(item.id)}
                                    aria-label={item.label}
                                  />
                                  <span
                                    className="size-3.5 shrink-0 rounded-full border border-ink-border"
                                    style={{
                                      background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, ${item.swatch} 60%, color-mix(in oklab, ${item.swatch} 70%, black) 100%)`,
                                    }}
                                    aria-hidden
                                  />
                                  <span className="text-sm font-medium">{item.label}</span>
                                </label>
                              )
                            })}
                          </div>
                          <div className="mt-3">
                            <ClassLabel value="theme-controller radio radio-sm (pigment strip)" />
                          </div>
              </>
            }
            html={`<div class="flex flex-wrap gap-2">
            <!-- repeat for each item -->
                    aria-label=
                  />
                  <span
                    class="size-3.5 shrink-0 rounded-full border border-ink-border"
                    style= 60%, color-mix(in oklab, $ 70%, black) 100%)\`,
                    }}
                    aria-hidden
                  />
                  <span class="text-sm font-medium"></span>
                </label>
              )
            })}
          </div>
          <div class="mt-3">
            
          </div>`}
            jsx={`<div className="flex flex-wrap gap-2">
            {STRIP_PIGMENTS.map((item) => {
              const value = themeDataAttr(item.id, mode)
              const active = pigment === item.id
              return (
                <label
                  key={item.id}
                  className={\`flex cursor-pointer items-center gap-2 rounded-box border px-2.5 py-2 transition-[border-color,box-shadow] \${
                    active
                      ? 'border-primary shadow-[var(--shadow-paper-sm)]'
                      : 'border-ink-border/70 hover:border-primary/40'
                  }\`}
                >
                  <input
                    type="radio"
                    name="theme-strip"
                    className="theme-controller radio radio-sm cursor-pointer"
                    value={value}
                    checked={active}
                    onChange={() => selectPigment(item.id)}
                    aria-label={item.label}
                  />
                  <span
                    className="size-3.5 shrink-0 rounded-full border border-ink-border"
                    style={{
                      background: \`radial-gradient(circle at 35% 30%, color-mix(in oklab, white 70%, transparent) 0%, \${item.swatch} 60%, color-mix(in oklab, \${item.swatch} 70%, black) 100%)\`,
                    }}
                    aria-hidden
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </label>
              )
            })}
          </div>
          <div className="mt-3">
            
          </div>`}
          />
        </Section>
      </div>
    </>
  )
}
