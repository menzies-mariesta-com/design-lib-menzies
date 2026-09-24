import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
import { Droplets, Layers, Palette } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const faqItems = [
  {
    title: 'How do I create an account?',
    body: 'Click the "Sign Up" button in the top right corner and follow the registration process.',
  },
  {
    title: 'I forgot my password. What should I do?',
    body: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
  },
  {
    title: 'How do I update my profile information?',
    body: 'Go to "My Account" settings and select "Edit Profile" to make changes.',
  },
] as const

const washItems = [
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

const radioHtml = `<div class="collapse border border-base-300 bg-base-100">
  <input type="radio" name="acc-radio" checked />
  <div class="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
  <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div class="collapse border border-base-300 bg-base-100">
  <input type="radio" name="acc-radio" />
  <div class="collapse-title cursor-pointer font-semibold">I forgot my password. What should I do?</div>
  <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div class="collapse border border-base-300 bg-base-100">
  <input type="radio" name="acc-radio" />
  <div class="collapse-title cursor-pointer font-semibold">How do I update my profile information?</div>
  <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>`

const radioJsx = `<div className="collapse border border-base-300 bg-base-100">
  <input type="radio" name="acc-radio" defaultChecked />
  <div className="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
  <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div className="collapse border border-base-300 bg-base-100">
  <input type="radio" name="acc-radio" />
  <div className="collapse-title cursor-pointer font-semibold">I forgot my password. What should I do?</div>
  <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div className="collapse border border-base-300 bg-base-100">
  <input type="radio" name="acc-radio" />
  <div className="collapse-title cursor-pointer font-semibold">How do I update my profile information?</div>
  <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>`

const detailsHtml = `<details class="collapse border border-base-300 bg-base-100" name="acc-details" open>
  <summary class="collapse-title cursor-pointer font-semibold">How do I create an account?</summary>
  <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</details>
<details class="collapse border border-base-300 bg-base-100" name="acc-details">
  <summary class="collapse-title cursor-pointer font-semibold">I forgot my password. What should I do?</summary>
  <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</details>
<details class="collapse border border-base-300 bg-base-100" name="acc-details">
  <summary class="collapse-title cursor-pointer font-semibold">How do I update my profile information?</summary>
  <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</details>`

const arrowHtml = `<div class="collapse collapse-arrow border border-base-300 bg-base-100">
  <input type="radio" name="acc-arrow" checked />
  <div class="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
  <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div class="collapse collapse-arrow border border-base-300 bg-base-100">
  <input type="radio" name="acc-arrow" />
  <div class="collapse-title cursor-pointer font-semibold">I forgot my password. What should I do?</div>
  <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div class="collapse collapse-arrow border border-base-300 bg-base-100">
  <input type="radio" name="acc-arrow" />
  <div class="collapse-title cursor-pointer font-semibold">How do I update my profile information?</div>
  <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>`

const arrowJsx = `<div className="collapse collapse-arrow border border-base-300 bg-base-100">
  <input type="radio" name="acc-arrow" defaultChecked />
  <div className="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
  <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div className="collapse collapse-arrow border border-base-300 bg-base-100">
  <input type="radio" name="acc-arrow" />
  <div className="collapse-title cursor-pointer font-semibold">I forgot my password. What should I do?</div>
  <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div className="collapse collapse-arrow border border-base-300 bg-base-100">
  <input type="radio" name="acc-arrow" />
  <div className="collapse-title cursor-pointer font-semibold">How do I update my profile information?</div>
  <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>`

const plusHtml = `<div class="collapse collapse-plus border border-base-300 bg-base-100">
  <input type="radio" name="acc-plus" checked />
  <div class="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
  <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div class="collapse collapse-plus border border-base-300 bg-base-100">
  <input type="radio" name="acc-plus" />
  <div class="collapse-title cursor-pointer font-semibold">I forgot my password. What should I do?</div>
  <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div class="collapse collapse-plus border border-base-300 bg-base-100">
  <input type="radio" name="acc-plus" />
  <div class="collapse-title cursor-pointer font-semibold">How do I update my profile information?</div>
  <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>`

const plusJsx = `<div className="collapse collapse-plus border border-base-300 bg-base-100">
  <input type="radio" name="acc-plus" defaultChecked />
  <div className="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
  <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div className="collapse collapse-plus border border-base-300 bg-base-100">
  <input type="radio" name="acc-plus" />
  <div className="collapse-title cursor-pointer font-semibold">I forgot my password. What should I do?</div>
  <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div className="collapse collapse-plus border border-base-300 bg-base-100">
  <input type="radio" name="acc-plus" />
  <div className="collapse-title cursor-pointer font-semibold">How do I update my profile information?</div>
  <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>`

const joinHtml = `<div class="join join-vertical w-full bg-base-100">
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="acc-join" checked />
    <div class="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
    <div class="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
  </div>
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="acc-join" />
    <div class="collapse-title cursor-pointer font-semibold">I forgot my password. What should I do?</div>
    <div class="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
  </div>
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="acc-join" />
    <div class="collapse-title cursor-pointer font-semibold">How do I update my profile information?</div>
    <div class="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
  </div>
</div>`

const joinJsx = `<div className="join join-vertical w-full bg-base-100">
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="acc-join" defaultChecked />
    <div className="collapse-title cursor-pointer font-semibold">How do I create an account?</div>
    <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="acc-join" />
    <div className="collapse-title cursor-pointer font-semibold">I forgot my password. What should I do?</div>
    <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="acc-join" />
    <div className="collapse-title cursor-pointer font-semibold">How do I update my profile information?</div>
    <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
  </div>
</div>`

const checkboxHtml = `<div class="space-y-2">
  <div class="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" checked />
    <div class="collapse-title cursor-pointer font-semibold">
      <span class="inline-flex items-center gap-2">
        <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
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
        <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
        Which pigments dry cooler?
      </span>
    </div>
    <div class="collapse-content text-sm">Ultramarine and phthalo lean cool; ochres and cadmiums lean warm.</div>
  </div>
</div>`

const checkboxJsx = `<div className="space-y-2">
  <div className="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" defaultChecked />
    <div className="collapse-title cursor-pointer font-semibold">
      <span className="inline-flex items-center gap-2">
        <Droplets className="size-4 shrink-0" strokeWidth={1.75} />
        What is a wash?
      </span>
    </div>
    <div className="collapse-content text-sm">A thin, transparent layer of pigment diluted with water, laid across the paper.</div>
  </div>
  <div className="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div className="collapse-title cursor-pointer font-semibold">
      <span className="inline-flex items-center gap-2">
        <Layers className="size-4 shrink-0" strokeWidth={1.75} />
        How many layers should I use?
      </span>
    </div>
    <div className="collapse-content text-sm">Build slowly. Two to four light washes usually beat one heavy pass.</div>
  </div>
  <div className="collapse collapse-arrow border border-base-300 bg-base-100">
    <input type="checkbox" />
    <div className="collapse-title cursor-pointer font-semibold">
      <span className="inline-flex items-center gap-2">
        <Palette className="size-4 shrink-0" strokeWidth={1.75} />
        Which pigments dry cooler?
      </span>
    </div>
    <div className="collapse-content text-sm">Ultramarine and phthalo lean cool; ochres and cadmiums lean warm.</div>
  </div>
</div>`

const focusHtml = `<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100">
  <div class="collapse-title cursor-pointer font-semibold">Focus this panel to expand</div>
  <div class="collapse-content text-sm">Click or tab into the title. Blur or click away to close.</div>
</div>`

const focusJsx = `<div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100">
  <div className="collapse-title cursor-pointer font-semibold">Focus this panel to expand</div>
  <div className="collapse-content text-sm">Click or tab into the title. Blur or click away to close.</div>
</div>`

const forceHtml = `<div class="space-y-3">
  <div class="collapse collapse-open border border-base-300 bg-base-100">
    <div class="collapse-title font-semibold">Forced open</div>
    <div class="collapse-content text-sm">Always expanded via collapse-open.</div>
  </div>
  <div tabindex="0" class="collapse collapse-close border border-base-300 bg-base-100">
    <div class="collapse-title cursor-pointer font-semibold">Forced closed</div>
    <div class="collapse-content text-sm">Stays closed even when focused, via collapse-close.</div>
  </div>
</div>`

const forceJsx = `<div className="space-y-3">
  <div className="collapse collapse-open border border-base-300 bg-base-100">
    <div className="collapse-title font-semibold">Forced open</div>
    <div className="collapse-content text-sm">Always expanded via collapse-open.</div>
  </div>
  <div tabIndex={0} className="collapse collapse-close border border-base-300 bg-base-100">
    <div className="collapse-title cursor-pointer font-semibold">Forced closed</div>
    <div className="collapse-content text-sm">Stays closed even when focused, via collapse-close.</div>
  </div>
</div>`

const colorsHtml = `<div class="grid gap-3 md:grid-cols-2">
  <div class="collapse collapse-arrow bg-primary text-primary-content">
    <input type="radio" name="acc-color" checked />
    <div class="collapse-title cursor-pointer font-semibold">Primary wash</div>
    <div class="collapse-content text-sm">bg-primary text-primary-content on the collapse root.</div>
  </div>
  <div class="collapse collapse-arrow bg-secondary text-secondary-content">
    <input type="radio" name="acc-color" />
    <div class="collapse-title cursor-pointer font-semibold">Secondary wash</div>
    <div class="collapse-content text-sm">bg-secondary text-secondary-content.</div>
  </div>
  <div class="collapse collapse-arrow bg-accent text-accent-content">
    <input type="radio" name="acc-color" />
    <div class="collapse-title cursor-pointer font-semibold">Accent wash</div>
    <div class="collapse-content text-sm">bg-accent text-accent-content.</div>
  </div>
  <div class="collapse border border-base-300 bg-base-100">
    <input type="checkbox" class="peer" />
    <div class="collapse-title cursor-pointer bg-info text-info-content font-semibold peer-checked:bg-success peer-checked:text-success-content">Peer color shift</div>
    <div class="collapse-content bg-info text-info-content text-sm peer-checked:bg-success peer-checked:text-success-content">Title and content flip from info to success when checked.</div>
  </div>
</div>`

const colorsJsx = `<div className="grid gap-3 md:grid-cols-2">
  <div className="collapse collapse-arrow bg-primary text-primary-content">
    <input type="radio" name="acc-color" defaultChecked />
    <div className="collapse-title cursor-pointer font-semibold">Primary wash</div>
    <div className="collapse-content text-sm">bg-primary text-primary-content on the collapse root.</div>
  </div>
  <div className="collapse collapse-arrow bg-secondary text-secondary-content">
    <input type="radio" name="acc-color" />
    <div className="collapse-title cursor-pointer font-semibold">Secondary wash</div>
    <div className="collapse-content text-sm">bg-secondary text-secondary-content.</div>
  </div>
  <div className="collapse collapse-arrow bg-accent text-accent-content">
    <input type="radio" name="acc-color" />
    <div className="collapse-title cursor-pointer font-semibold">Accent wash</div>
    <div className="collapse-content text-sm">bg-accent text-accent-content.</div>
  </div>
  <div className="collapse border border-base-300 bg-base-100">
    <input type="checkbox" className="peer" />
    <div className="collapse-title cursor-pointer bg-info text-info-content font-semibold peer-checked:bg-success peer-checked:text-success-content">Peer color shift</div>
    <div className="collapse-content bg-info text-info-content text-sm peer-checked:bg-success peer-checked:text-success-content">Title and content flip from info to success when checked.</div>
  </div>
</div>`

const iconStartHtml = `<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100">
  <div class="collapse-title cursor-pointer pe-4 ps-12 font-semibold after:end-auto after:start-5">Icon starts on the left</div>
  <div class="collapse-content text-sm">after:start-5 after:end-auto with pe-4 ps-12 on collapse-title.</div>
</div>`

const iconStartJsx = `<div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100">
  <div className="collapse-title cursor-pointer pe-4 ps-12 font-semibold after:end-auto after:start-5">Icon starts on the left</div>
  <div className="collapse-content text-sm">after:start-5 after:end-auto with pe-4 ps-12 on collapse-title.</div>
</div>`

const minimalHtml = `<div tabindex="0" class="collapse collapse-arrow">
  <div class="collapse-title cursor-pointer font-semibold">Minimal focus collapse</div>
  <div class="collapse-content text-sm">Useful when the wash panel already provides the surface.</div>
</div>`

const minimalJsx = `<div tabIndex={0} className="collapse collapse-arrow">
  <div className="collapse-title cursor-pointer font-semibold">Minimal focus collapse</div>
  <div className="collapse-content text-sm">Useful when the wash panel already provides the surface.</div>
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

export default function AccordionPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Accordion
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">collapse</span> as
          accordion: radio, details, arrow, plus, join, and force states.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Radio"
          title="Accordion with radio inputs"
          description="Same name on radios: only one panel open at a time. Svelte tab uses bind:group (static checked is read-only)."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-0">
                  {faqItems.map((item, i) => (
                    <div
                      key={item.title}
                      className="collapse border border-base-300 bg-base-100"
                    >
                      <input
                        type="radio"
                        name="acc-radio"
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
                  <ClassLabel value="collapse + input[type=radio]" />
                </p>
              </>
            }
            html={radioHtml}
            jsx={radioJsx}
          />
        </Section>

        <Section
          eyebrow="02 · Details"
          title="Accordion with details"
          description="Shared name on details keeps exclusive open state. Svelte tab uses bind:open when a panel starts open."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-0">
                  {faqItems.map((item, i) => (
                    <details
                      key={`det-${item.title}`}
                      className="collapse border border-base-300 bg-base-100"
                      name="acc-details"
                      open={i === 0}
                    >
                      <summary className="collapse-title cursor-pointer font-semibold">
                        {item.title}
                      </summary>
                      <div className="collapse-content text-sm">{item.body}</div>
                    </details>
                  ))}
                </div>
                <p className="mt-3">
                  <ClassLabel value="details.collapse[name] + summary.collapse-title" />
                </p>
              </>
            }
            html={detailsHtml}
            jsx={daisyToJsx(detailsHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Arrow"
          title="Arrow icon"
          description="collapse-arrow adds a chevron indicator. Svelte tab uses bind:group."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-0">
                  {faqItems.map((item, i) => (
                    <div
                      key={`arrow-${item.title}`}
                      className="collapse collapse-arrow border border-base-300 bg-base-100"
                    >
                      <input
                        type="radio"
                        name="acc-arrow"
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
                  <ClassLabel value="collapse collapse-arrow" />
                </p>
              </>
            }
            html={arrowHtml}
            jsx={arrowJsx}
          />
        </Section>

        <Section
          eyebrow="04 · Plus"
          title="Plus / minus icon"
          description="collapse-plus toggles a plus/minus glyph. Svelte tab uses bind:group."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-0">
                  {faqItems.map((item, i) => (
                    <div
                      key={`plus-${item.title}`}
                      className="collapse collapse-plus border border-base-300 bg-base-100"
                    >
                      <input
                        type="radio"
                        name="acc-plus"
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
                  <ClassLabel value="collapse collapse-plus" />
                </p>
              </>
            }
            html={plusHtml}
            jsx={plusJsx}
          />
        </Section>

        <Section
          eyebrow="05 · Join"
          title="Joined vertical stack"
          description="join join-vertical + join-item for shared borders and radius. Svelte tab uses bind:group."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="join join-vertical w-full bg-base-100">
                  {faqItems.map((item, i) => (
                    <div
                      key={`join-${item.title}`}
                      className="collapse collapse-arrow join-item border border-base-300"
                    >
                      <input
                        type="radio"
                        name="acc-join"
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
              </>
            }
            html={joinHtml}
            jsx={joinJsx}
          />
        </Section>

        <Section
          eyebrow="06 · Checkbox"
          title="Multiple open (checkbox)"
          description="Checkbox collapses are independent: several can stay open. Svelte tab uses bind:checked."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-2">
                  {washItems.map((item, i) => (
                    <div
                      key={`check-${item.title}`}
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
                  <ClassLabel value="collapse + input[type=checkbox]" />
                </p>
              </>
            }
            html={checkboxHtml}
            jsx={checkboxJsx}
          />
        </Section>

        <Section
          eyebrow="07 · Focus"
          title="Focus-driven collapse"
          description="tabindex=0: opens on focus, closes when focus leaves"
        >
          <ShowcaseTabs
            preview={
              <>
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 bg-base-100"
                >
                  <div className="collapse-title cursor-pointer font-semibold">
                    Focus this panel to expand
                  </div>
                  <div className="collapse-content text-sm">
                    Click or tab into the title. Blur or click away to close.
                  </div>
                </div>
                <p className="mt-3">
                  <ClassLabel value="collapse[tabindex=0] collapse-arrow" />
                </p>
              </>
            }
            html={focusHtml}
            jsx={focusJsx}
          />
        </Section>

        <Section
          eyebrow="08 · Force states"
          title="Open and close modifiers"
          description="collapse-open and collapse-close force visibility"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="space-y-3">
                <div>
                  <div className="collapse collapse-open border border-base-300 bg-base-100">
                    <div className="collapse-title font-semibold">Forced open</div>
                    <div className="collapse-content text-sm">
                      Always expanded via collapse-open.
                    </div>
                  </div>
                  <p className="mt-2">
                    <ClassLabel value="collapse collapse-open" />
                  </p>
                </div>
                <div>
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
                  <p className="mt-2">
                    <ClassLabel value="collapse collapse-close" />
                  </p>
                </div>
              </div>
            }
            html={forceHtml}
            jsx={forceJsx}
          />
        </Section>

        <Section
          eyebrow="09 · Colors"
          title="Semantic surfaces"
          description="Background and content colors on accordion panels"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="collapse collapse-arrow bg-primary text-primary-content">
                    <input type="radio" name="acc-color" defaultChecked />
                    <div className="collapse-title cursor-pointer font-semibold">
                      Primary wash
                    </div>
                    <div className="collapse-content text-sm">
                      bg-primary text-primary-content on the collapse root.
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-secondary text-secondary-content">
                    <input type="radio" name="acc-color" />
                    <div className="collapse-title cursor-pointer font-semibold">
                      Secondary wash
                    </div>
                    <div className="collapse-content text-sm">
                      bg-secondary text-secondary-content.
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-accent text-accent-content">
                    <input type="radio" name="acc-color" />
                    <div className="collapse-title cursor-pointer font-semibold">
                      Accent wash
                    </div>
                    <div className="collapse-content text-sm">
                      bg-accent text-accent-content.
                    </div>
                  </div>
                  <div className="collapse border border-base-300 bg-base-100">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title cursor-pointer bg-info text-info-content font-semibold peer-checked:bg-success peer-checked:text-success-content">
                      Peer color shift
                    </div>
                    <div className="collapse-content bg-info text-info-content text-sm peer-checked:bg-success peer-checked:text-success-content">
                      Title and content flip from info to success when checked.
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <ClassLabel value="collapse bg-primary text-primary-content" />
                  <ClassLabel value="peer + peer-checked:bg-success" />
                </div>
              </>
            }
            html={colorsHtml}
            jsx={colorsJsx}
          />
        </Section>

        <Section
          eyebrow="10 · Icon start"
          title="Arrow on the start edge"
          description="Utility classes move the collapse-arrow glyph to the left"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 bg-base-100"
                >
                  <div className="collapse-title cursor-pointer pe-4 ps-12 font-semibold after:end-auto after:start-5">
                    Icon starts on the left
                  </div>
                  <div className="collapse-content text-sm">
                    after:start-5 after:end-auto with pe-4 ps-12 on collapse-title.
                  </div>
                </div>
                <p className="mt-3">
                  <ClassLabel value="collapse-title after:start-5 after:end-auto ps-12" />
                </p>
              </>
            }
            html={iconStartHtml}
            jsx={iconStartJsx}
          />
        </Section>

        <Section
          eyebrow="11 · Minimal"
          title="Without border or background"
          description="Bare collapse: no border, no base fill"
        >
          <ShowcaseTabs
            preview={
              <>
                <div tabIndex={0} className="collapse collapse-arrow">
                  <div className="collapse-title cursor-pointer font-semibold">
                    Minimal focus collapse
                  </div>
                  <div className="collapse-content text-sm">
                    Useful when the wash panel already provides the surface.
                  </div>
                </div>
                <p className="mt-3">
                  <ClassLabel value="collapse collapse-arrow (no border)" />
                </p>
              </>
            }
            html={minimalHtml}
            jsx={minimalJsx}
          />
        </Section>
      </div>
    </>
  )
}
