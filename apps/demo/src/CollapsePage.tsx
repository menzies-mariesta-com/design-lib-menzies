import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { Droplets, Layers, Palette } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const studioFaq = [
  {
    title: 'How wet should the paper stay?',
    body: 'Keep a soft sheen for wet-into-wet. Let the shine fade before crisp edges.',
  },
  {
    title: 'When do I lift pigment?',
    body: 'Lift while the wash is damp. Dry lifting scuffs the tooth of the sheet.',
  },
  {
    title: 'Why does my wash look mottled?',
    body: 'Usually too much pigment or uneven water. Dilute, then re-lay a cleaner pass.',
  },
] as const

const washTips = [
  {
    title: 'What is a wash?',
    body: 'A thin, transparent layer of pigment diluted with water, laid across the paper.',
    icon: Droplets,
  },
  {
    title: 'How many layers should I use?',
    body: 'Build slowly. Two to four light washes usually beat one heavy pass.',
    icon: Layers,
  },
  {
    title: 'Which pigments dry cooler?',
    body: 'Ultramarine and phthalo lean cool; ochres and cadmiums lean warm.',
    icon: Palette,
  },
] as const

const basicHtml = `<div tabindex="0" class="collapse border border-base-300 bg-base-100">
  <div class="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
  <div class="collapse-content text-sm">Click Sign Up in the top right and follow the registration steps.</div>
</div>`

const basicJsx = `<div tabIndex={0} className="collapse border border-base-300 bg-base-100">
  <div className="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
  <div className="collapse-content text-sm">Click Sign Up in the top right and follow the registration steps.</div>
</div>`

const triggersHtml = `<div class="grid gap-4 lg:grid-cols-3">
  <div tabindex="0" class="collapse border border-base-300 bg-base-100">
    <div class="collapse-title cursor-pointer font-semibold">Focus trigger</div>
    <div class="collapse-content text-sm">Opens on focus. Closes when focus leaves the panel.</div>
  </div>
  <div class="collapse border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div class="collapse-title cursor-pointer font-semibold">Checkbox trigger</div>
    <div class="collapse-content text-sm">Click again to close. State stays until toggled.</div>
  </div>
  <details class="collapse border border-base-300 bg-base-100">
    <summary class="collapse-title cursor-pointer font-semibold">Details trigger</summary>
    <div class="collapse-content text-sm">Native details/summary keeps content searchable.</div>
  </details>
</div>
<div class="mt-4">
  <p class="mb-2 text-sm text-ink-muted">Checkbox with outside click to close (peer + fixed overlay label).</p>
  <div class="collapse border border-base-300 bg-base-100">
    <input id="collapse-outside-toggle" type="checkbox" class="peer" />
    <label for="collapse-outside-toggle" class="fixed inset-0 z-0 hidden cursor-pointer peer-checked:block"></label>
    <div class="collapse-title relative z-[1] cursor-pointer font-semibold">Close on outside click</div>
    <div class="collapse-content relative z-[1] text-sm">Open, then click outside the panel to dismiss.</div>
  </div>
</div>`

const triggersJsx = `<div className="grid gap-4 lg:grid-cols-3">
  <div tabIndex={0} className="collapse border border-base-300 bg-base-100">
    <div className="collapse-title cursor-pointer font-semibold">Focus trigger</div>
    <div className="collapse-content text-sm">Opens on focus. Closes when focus leaves the panel.</div>
  </div>
  <div className="collapse border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div className="collapse-title cursor-pointer font-semibold">Checkbox trigger</div>
    <div className="collapse-content text-sm">Click again to close. State stays until toggled.</div>
  </div>
  <details className="collapse border border-base-300 bg-base-100">
    <summary className="collapse-title cursor-pointer font-semibold">Details trigger</summary>
    <div className="collapse-content text-sm">Native details/summary keeps content searchable.</div>
  </details>
</div>
<div className="mt-4">
  <p className="mb-2 text-sm text-ink-muted">Checkbox with outside click to close (peer + fixed overlay label).</p>
  <div className="collapse border border-base-300 bg-base-100">
    <input id="collapse-outside-toggle" type="checkbox" className="peer" />
    <label htmlFor="collapse-outside-toggle" className="fixed inset-0 z-0 hidden cursor-pointer peer-checked:block"></label>
    <div className="collapse-title relative z-[1] cursor-pointer font-semibold">Close on outside click</div>
    <div className="collapse-content relative z-[1] text-sm">Open, then click outside the panel to dismiss.</div>
  </div>
</div>`

const iconsHtml = `<div class="grid gap-4 md:grid-cols-2">
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100">
    <div class="collapse-title cursor-pointer font-semibold">Arrow icon</div>
    <div class="collapse-content text-sm">Chevron rotates when the panel opens.</div>
  </div>
  <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100">
    <div class="collapse-title cursor-pointer font-semibold">Plus / minus icon</div>
    <div class="collapse-content text-sm">Plus flips to minus while expanded.</div>
  </div>
</div>
<div class="mt-4">
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100">
    <div class="collapse-title cursor-pointer pe-4 ps-12 font-semibold after:end-auto after:start-5">Arrow on the start edge</div>
    <div class="collapse-content text-sm">after:start-5 after:end-auto with pe-4 ps-12 on collapse-title.</div>
  </div>
</div>`

const iconsJsx = `<div className="grid gap-4 md:grid-cols-2">
  <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100">
    <div className="collapse-title cursor-pointer font-semibold">Arrow icon</div>
    <div className="collapse-content text-sm">Chevron rotates when the panel opens.</div>
  </div>
  <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100">
    <div className="collapse-title cursor-pointer font-semibold">Plus / minus icon</div>
    <div className="collapse-content text-sm">Plus flips to minus while expanded.</div>
  </div>
</div>
<div className="mt-4">
  <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100">
    <div className="collapse-title cursor-pointer pe-4 ps-12 font-semibold after:end-auto after:start-5">Arrow on the start edge</div>
    <div className="collapse-content text-sm">after:start-5 after:end-auto with pe-4 ps-12 on collapse-title.</div>
  </div>
</div>`

const forceHtml = `<div class="grid gap-4 md:grid-cols-2">
  <div class="collapse collapse-open border border-base-300 bg-base-100">
    <div class="collapse-title font-semibold">Forced open</div>
    <div class="collapse-content text-sm">Always expanded via collapse-open.</div>
  </div>
  <div tabindex="0" class="collapse collapse-close border border-base-300 bg-base-100">
    <div class="collapse-title cursor-pointer font-semibold">Forced closed</div>
    <div class="collapse-content text-sm">Stays closed even when focused, via collapse-close.</div>
  </div>
</div>
<div class="mt-4">
  <details class="collapse collapse-arrow border border-base-300 bg-base-100" open>
    <summary class="collapse-title cursor-pointer font-semibold">Details open by default</summary>
    <div class="collapse-content text-sm">Use the open attribute on details. collapse-open does not apply here.</div>
  </details>
</div>`

const forceJsx = `<div className="grid gap-4 md:grid-cols-2">
  <div className="collapse collapse-open border border-base-300 bg-base-100">
    <div className="collapse-title font-semibold">Forced open</div>
    <div className="collapse-content text-sm">Always expanded via collapse-open.</div>
  </div>
  <div tabIndex={0} className="collapse collapse-close border border-base-300 bg-base-100">
    <div className="collapse-title cursor-pointer font-semibold">Forced closed</div>
    <div className="collapse-content text-sm">Stays closed even when focused, via collapse-close.</div>
  </div>
</div>
<div className="mt-4">
  <details className="collapse collapse-arrow border border-base-300 bg-base-100" open>
    <summary className="collapse-title cursor-pointer font-semibold">Details open by default</summary>
    <div className="collapse-content text-sm">Use the open attribute on details. collapse-open does not apply here.</div>
  </details>
</div>`

const surfacesHtml = `<div class="grid gap-3 md:grid-cols-2">
  <div tabindex="0" class="collapse bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content">
    <div class="collapse-title cursor-pointer font-semibold">Focus color shift</div>
    <div class="collapse-content text-sm">Primary at rest, secondary when focused.</div>
  </div>
  <div class="collapse border border-base-300 bg-base-100">
    <input type="checkbox" class="peer" />
    <div class="collapse-title cursor-pointer bg-info font-semibold text-info-content peer-checked:bg-success peer-checked:text-success-content">Peer color shift</div>
    <div class="collapse-content bg-info text-sm text-info-content peer-checked:bg-success peer-checked:text-success-content">Title and content flip from info to success when checked.</div>
  </div>
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100">
    <div class="collapse-title cursor-pointer font-semibold">Bordered panel</div>
    <div class="collapse-content text-sm">border border-base-300 with bg-base-100.</div>
  </div>
  <div tabindex="0" class="collapse collapse-arrow">
    <div class="collapse-title cursor-pointer font-semibold">Minimal (no border)</div>
    <div class="collapse-content text-sm">Bare collapse when the wash panel already provides the surface.</div>
  </div>
</div>
<div class="mt-6">
  <div class="join join-vertical w-full bg-base-100">
    <div class="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" checked />
      <div class="collapse-title cursor-pointer font-semibold">How wet should the paper stay?</div>
      <div class="collapse-content text-sm">Keep a soft sheen for wet-into-wet. Let the shine fade before crisp edges.</div>
    </div>
    <div class="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" />
      <div class="collapse-title cursor-pointer font-semibold">When do I lift pigment?</div>
      <div class="collapse-content text-sm">Lift while the wash is damp. Dry lifting scuffs the tooth of the sheet.</div>
    </div>
    <div class="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" />
      <div class="collapse-title cursor-pointer font-semibold">Why does my wash look mottled?</div>
      <div class="collapse-content text-sm">Usually too much pigment or uneven water. Dilute, then re-lay a cleaner pass.</div>
    </div>
  </div>
</div>`

const surfacesJsx = `<div className="grid gap-3 md:grid-cols-2">
  <div tabIndex={0} className="collapse bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content">
    <div className="collapse-title cursor-pointer font-semibold">Focus color shift</div>
    <div className="collapse-content text-sm">Primary at rest, secondary when focused.</div>
  </div>
  <div className="collapse border border-base-300 bg-base-100">
    <input type="checkbox" className="peer" />
    <div className="collapse-title cursor-pointer bg-info font-semibold text-info-content peer-checked:bg-success peer-checked:text-success-content">Peer color shift</div>
    <div className="collapse-content bg-info text-sm text-info-content peer-checked:bg-success peer-checked:text-success-content">Title and content flip from info to success when checked.</div>
  </div>
  <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100">
    <div className="collapse-title cursor-pointer font-semibold">Bordered panel</div>
    <div className="collapse-content text-sm">border border-base-300 with bg-base-100.</div>
  </div>
  <div tabIndex={0} className="collapse collapse-arrow">
    <div className="collapse-title cursor-pointer font-semibold">Minimal (no border)</div>
    <div className="collapse-content text-sm">Bare collapse when the wash panel already provides the surface.</div>
  </div>
</div>
<div className="mt-6">
  <div className="join join-vertical w-full bg-base-100">
    <div className="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" defaultChecked />
      <div className="collapse-title cursor-pointer font-semibold">How wet should the paper stay?</div>
      <div className="collapse-content text-sm">Keep a soft sheen for wet-into-wet. Let the shine fade before crisp edges.</div>
    </div>
    <div className="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" />
      <div className="collapse-title cursor-pointer font-semibold">When do I lift pigment?</div>
      <div className="collapse-content text-sm">Lift while the wash is damp. Dry lifting scuffs the tooth of the sheet.</div>
    </div>
    <div className="collapse collapse-arrow join-item border border-base-300">
      <input type="checkbox" />
      <div className="collapse-title cursor-pointer font-semibold">Why does my wash look mottled?</div>
      <div className="collapse-content text-sm">Usually too much pigment or uneven water. Dilute, then re-lay a cleaner pass.</div>
    </div>
  </div>
</div>`

const studioHtml = `<div class="space-y-2">
  <div class="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" checked />
    <div class="collapse-title cursor-pointer font-semibold">
      <span class="inline-flex items-center gap-2">
        <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05S9.2 8.2 7 8.2 3 10.03 3 12.25c0 1.3.6 2.45 1.5 3.2"/><path d="M12.5 10.5c.5-1.2 1.8-2 3.3-2 2.2 0 4 1.83 4 4.05S18 16.6 15.8 16.6c-1.2 0-2.25-.55-3-1.4"/><path d="M12 3v2M12 19v2M4.9 5.9l1.4 1.4M17.7 16.7l1.4 1.4M3 12h2M19 12h2"/></svg>
        What is a wash?
      </span>
    </div>
    <div class="collapse-content text-sm">A thin, transparent layer of pigment diluted with water, laid across the paper.</div>
  </div>
  <div class="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div class="collapse-title cursor-pointer font-semibold">
      <span class="inline-flex items-center gap-2">
        <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
        How many layers should I use?
      </span>
    </div>
    <div class="collapse-content text-sm">Build slowly. Two to four light washes usually beat one heavy pass.</div>
  </div>
  <div class="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div class="collapse-title cursor-pointer font-semibold">
      <span class="inline-flex items-center gap-2">
        <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 22C4 22 2 14 2 10a8 8 0 0 1 16 0c0 4-2 12-10 12Z"/></svg>
        Which pigments dry cooler?
      </span>
    </div>
    <div class="collapse-content text-sm">Ultramarine and phthalo lean cool; ochres and cadmiums lean warm.</div>
  </div>
</div>`

const studioJsx = `<div className="space-y-2">
  <div className="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" defaultChecked />
    <div className="collapse-title cursor-pointer font-semibold">
      <span className="inline-flex items-center gap-2">
        <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05S9.2 8.2 7 8.2 3 10.03 3 12.25c0 1.3.6 2.45 1.5 3.2"/><path d="M12.5 10.5c.5-1.2 1.8-2 3.3-2 2.2 0 4 1.83 4 4.05S18 16.6 15.8 16.6c-1.2 0-2.25-.55-3-1.4"/><path d="M12 3v2M12 19v2M4.9 5.9l1.4 1.4M17.7 16.7l1.4 1.4M3 12h2M19 12h2"/></svg>
        What is a wash?
      </span>
    </div>
    <div className="collapse-content text-sm">A thin, transparent layer of pigment diluted with water, laid across the paper.</div>
  </div>
  <div className="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div className="collapse-title cursor-pointer font-semibold">
      <span className="inline-flex items-center gap-2">
        <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
        How many layers should I use?
      </span>
    </div>
    <div className="collapse-content text-sm">Build slowly. Two to four light washes usually beat one heavy pass.</div>
  </div>
  <div className="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div className="collapse-title cursor-pointer font-semibold">
      <span className="inline-flex items-center gap-2">
        <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 22C4 22 2 14 2 10a8 8 0 0 1 16 0c0 4-2 12-10 12Z"/></svg>
        Which pigments dry cooler?
      </span>
    </div>
    <div className="collapse-content text-sm">Ultramarine and phthalo lean cool; ochres and cadmiums lean warm.</div>
  </div>
</div>`

const responsiveHtml = `<div class="grid gap-3 md:grid-cols-2">
  <div class="collapse collapse-plus border border-base-300 bg-base-100">
    <input type="checkbox" checked />
    <div class="collapse-title cursor-pointer font-semibold">How wet should the paper stay?</div>
    <div class="collapse-content text-sm">Keep a soft sheen for wet-into-wet. Let the shine fade before crisp edges.</div>
  </div>
  <div class="collapse collapse-plus border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div class="collapse-title cursor-pointer font-semibold">When do I lift pigment?</div>
    <div class="collapse-content text-sm">Lift while the wash is damp. Dry lifting scuffs the tooth of the sheet.</div>
  </div>
  <div class="collapse collapse-plus border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div class="collapse-title cursor-pointer font-semibold">Why does my wash look mottled?</div>
    <div class="collapse-content text-sm">Usually too much pigment or uneven water. Dilute, then re-lay a cleaner pass.</div>
  </div>
</div>`

const responsiveJsx = `<div className="grid gap-3 md:grid-cols-2">
  <div className="collapse collapse-plus border border-base-300 bg-base-100">
    <input type="checkbox" defaultChecked />
    <div className="collapse-title cursor-pointer font-semibold">How wet should the paper stay?</div>
    <div className="collapse-content text-sm">Keep a soft sheen for wet-into-wet. Let the shine fade before crisp edges.</div>
  </div>
  <div className="collapse collapse-plus border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div className="collapse-title cursor-pointer font-semibold">When do I lift pigment?</div>
    <div className="collapse-content text-sm">Lift while the wash is damp. Dry lifting scuffs the tooth of the sheet.</div>
  </div>
  <div className="collapse collapse-plus border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div className="collapse-title cursor-pointer font-semibold">Why does my wash look mottled?</div>
    <div className="collapse-content text-sm">Usually too much pigment or uneven water. Dilute, then re-lay a cleaner pass.</div>
  </div>
</div>`

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

export default function CollapsePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Collapse
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">collapse</span> panels: focus, checkbox, details, arrow, plus, force states, colors, and.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Title and content"
          description="Minimal focus collapse with a title and body"
        >
          <ShowcaseTabs
            preview={
              <>
                <div
                            tabIndex={0}
                            className="collapse border border-base-300 bg-base-100"
                          >
                            <div className="collapse-title cursor-pointer font-semibold">
                              How do I create an account?
                            </div>
                            <div className="collapse-content text-sm">
                              Click Sign Up in the top right and follow the registration steps.
                            </div>
                          </div>
                          <p className="mt-3">
                            <ClassLabel value="collapse + collapse-title + collapse-content" />
                          </p>
              </>
            }
            html={basicHtml}
            jsx={basicJsx}
          />
        
        </Section>

        <Section
          eyebrow="02 · Triggers"
          title="Focus, checkbox, and details"
          description="Three ways to open and close a standalone panel"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 lg:grid-cols-3">
                            <div className="space-y-2">
                              <div
                                tabIndex={0}
                                className="collapse border border-base-300 bg-base-100"
                              >
                                <div className="collapse-title cursor-pointer font-semibold">
                                  Focus trigger
                                </div>
                                <div className="collapse-content text-sm">
                                  Opens on focus. Closes when focus leaves the panel.
                                </div>
                              </div>
                              <ClassLabel value="collapse[tabindex=0]" />
                            </div>

                            <div className="space-y-2">
                              <div className="collapse border border-base-300 bg-base-100">
                                <input type="checkbox" />
                                <div className="collapse-title cursor-pointer font-semibold">
                                  Checkbox trigger
                                </div>
                                <div className="collapse-content text-sm">
                                  Click again to close. State stays until toggled.
                                </div>
                              </div>
                              <ClassLabel value="collapse + input[type=checkbox]" />
                            </div>

                            <div className="space-y-2">
                              <details className="collapse border border-base-300 bg-base-100">
                                <summary className="collapse-title cursor-pointer font-semibold">
                                  Details trigger
                                </summary>
                                <div className="collapse-content text-sm">
                                  Native details/summary keeps content searchable.
                                </div>
                              </details>
                              <ClassLabel value="details.collapse + summary.collapse-title" />
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="mb-2 text-sm text-ink-muted">
                              Checkbox with outside click to close (peer + fixed overlay label).
                            </p>
                            <div className="collapse border border-base-300 bg-base-100">
                              <input
                                id="collapse-outside-toggle"
                                type="checkbox"
                                className="peer"
                              />
                              <label
                                htmlFor="collapse-outside-toggle"
                                className="fixed inset-0 z-0 hidden cursor-pointer peer-checked:block"
                              />
                              <div className="collapse-title relative z-[1] cursor-pointer font-semibold">
                                Close on outside click
                              </div>
                              <div className="collapse-content relative z-[1] text-sm">
                                Open, then click outside the panel to dismiss.
                              </div>
                            </div>
                            <p className="mt-2">
                              <ClassLabel value="peer + label.fixed.inset-0.peer-checked:block" />
                            </p>
                          </div>
              </>
            }
            html={triggersHtml}
            jsx={triggersJsx}
          />
        
        </Section>

        <Section
          eyebrow="03 · Icons"
          title="Arrow and plus"
          description="collapse-arrow and collapse-plus add built-in indicators"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <div
                                tabIndex={0}
                                className="collapse collapse-arrow border border-base-300 bg-base-100"
                              >
                                <div className="collapse-title cursor-pointer font-semibold">
                                  Arrow icon
                                </div>
                                <div className="collapse-content text-sm">
                                  Chevron rotates when the panel opens.
                                </div>
                              </div>
                              <ClassLabel value="collapse collapse-arrow" />
                            </div>
                            <div className="space-y-2">
                              <div
                                tabIndex={0}
                                className="collapse collapse-plus border border-base-300 bg-base-100"
                              >
                                <div className="collapse-title cursor-pointer font-semibold">
                                  Plus / minus icon
                                </div>
                                <div className="collapse-content text-sm">
                                  Plus flips to minus while expanded.
                                </div>
                              </div>
                              <ClassLabel value="collapse collapse-plus" />
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div
                              tabIndex={0}
                              className="collapse collapse-arrow border border-base-300 bg-base-100"
                            >
                              <div className="collapse-title cursor-pointer pe-4 ps-12 font-semibold after:end-auto after:start-5">
                                Arrow on the start edge
                              </div>
                              <div className="collapse-content text-sm">
                                after:start-5 after:end-auto with pe-4 ps-12 on collapse-title.
                              </div>
                            </div>
                            <ClassLabel value="collapse-title after:start-5 after:end-auto ps-12" />
                          </div>
              </>
            }
            html={iconsHtml}
            jsx={iconsJsx}
          />
        
        </Section>

        <Section
          eyebrow="04 · Force states"
          title="Open and close modifiers"
          description="collapse-open and collapse-close force visibility"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <div className="collapse collapse-open border border-base-300 bg-base-100">
                                <div className="collapse-title font-semibold">Forced open</div>
                                <div className="collapse-content text-sm">
                                  Always expanded via collapse-open.
                                </div>
                              </div>
                              <ClassLabel value="collapse collapse-open" />
                            </div>
                            <div className="space-y-2">
                              <div
                                tabIndex={0}
                                className="collapse collapse-close border border-base-300 bg-base-100"
                              >
                                <div className="collapse-title cursor-pointer font-semibold">
                                  Forced closed
                                </div>
                                <div className="collapse-content text-sm">
                                  Stays closed even when focused, via collapse-close.
                                </div>
                              </div>
                              <ClassLabel value="collapse collapse-close" />
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <details
                              className="collapse collapse-arrow border border-base-300 bg-base-100"
                              open
                            >
                              <summary className="collapse-title cursor-pointer font-semibold">
                                Details open by default
                              </summary>
                              <div className="collapse-content text-sm">
                                Use the open attribute on details. collapse-open does not apply
                                here.
                              </div>
                            </details>
                            <ClassLabel value="details.collapse[open]" />
                          </div>
              </>
            }
            html={forceHtml}
            jsx={forceJsx}
          />
        
        </Section>

        <Section
          eyebrow="05 · Surfaces"
          title="Colors, border, and join"
          description="Semantic fills, bordered panels, and a joined vertical stack"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-3 md:grid-cols-2">
                            <div
                              tabIndex={0}
                              className="collapse bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content"
                            >
                              <div className="collapse-title cursor-pointer font-semibold">
                                Focus color shift
                              </div>
                              <div className="collapse-content text-sm">
                                Primary at rest, secondary when focused.
                              </div>
                            </div>
                            <div className="collapse border border-base-300 bg-base-100">
                              <input type="checkbox" className="peer" />
                              <div className="collapse-title cursor-pointer bg-info font-semibold text-info-content peer-checked:bg-success peer-checked:text-success-content">
                                Peer color shift
                              </div>
                              <div className="collapse-content bg-info text-sm text-info-content peer-checked:bg-success peer-checked:text-success-content">
                                Title and content flip from info to success when checked.
                              </div>
                            </div>
                            <div
                              tabIndex={0}
                              className="collapse collapse-arrow border border-base-300 bg-base-100"
                            >
                              <div className="collapse-title cursor-pointer font-semibold">
                                Bordered panel
                              </div>
                              <div className="collapse-content text-sm">
                                border border-base-300 with bg-base-100.
                              </div>
                            </div>
                            <div tabIndex={0} className="collapse collapse-arrow">
                              <div className="collapse-title cursor-pointer font-semibold">
                                Minimal (no border)
                              </div>
                              <div className="collapse-content text-sm">
                                Bare collapse when the wash panel already provides the surface.
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-4">
                            <ClassLabel value="bg-primary focus:bg-secondary" />
                            <ClassLabel value="peer + peer-checked:bg-success" />
                            <ClassLabel value="border border-base-300" />
                          </div>

                          <div className="mt-6">
                            <div className="join join-vertical w-full bg-base-100">
                              {studioFaq.map((item, i) => (
                                <div
                                  key={`join-${item.title}`}
                                  className="collapse collapse-arrow join-item border border-base-300"
                                >
                                  <input
                                    type="checkbox"
                                    defaultChecked={i === 0}
                                  />
                                  <div className="collapse-title cursor-pointer font-semibold">
                                    {item.title}
                                  </div>
                                  <div className="collapse-content text-sm">{item.body}</div>
                                </div>
                              ))}
                            </div>
                            <p className="mt-3">
                              <ClassLabel value="join join-vertical + collapse join-item" />
                            </p>
                          </div>
              </>
            }
          
            html={surfacesHtml}
            jsx={surfacesJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Studio FAQ"
          title="Watercolor studio collapses"
          description="Independent checkbox panels with icons for studio tips"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-2">
                            {washTips.map((item, i) => (
                              <div
                                key={item.title}
                                className="collapse collapse-arrow border border-base-300 bg-base-100"
                              >
                                <input type="checkbox" defaultChecked={i === 0} />
                                <div className="collapse-title cursor-pointer font-semibold">
                                  <span className="inline-flex items-center gap-2">
                                    <item.icon className="size-4 shrink-0" strokeWidth={1.75} />
                                    {item.title}
                                  </span>
                                </div>
                                <div className="collapse-content text-sm">{item.body}</div>
                              </div>
                            ))}
                          </div>
                          <p className="mt-3">
                            <ClassLabel value="collapse collapse-arrow + checkbox" />
                          </p>
              </>
            }
          
            html={studioHtml}
            jsx={studioJsx}
          />
        
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Stacked on small, paired on large"
          description="Two columns from md up; single stack on phones"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-3 md:grid-cols-2">
                            {studioFaq.map((item, i) => (
                              <div
                                key={`resp-${item.title}`}
                                className="collapse collapse-plus border border-base-300 bg-base-100"
                              >
                                <input type="checkbox" defaultChecked={i === 0} />
                                <div className="collapse-title cursor-pointer font-semibold">
                                  {item.title}
                                </div>
                                <div className="collapse-content text-sm">{item.body}</div>
                              </div>
                            ))}
                          </div>
                          <p className="mt-3">
                            <ClassLabel value="grid gap-3 md:grid-cols-2" />
                          </p>
              </>
            }
          
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        
        </Section>
      </div>
    </>
  )
}
