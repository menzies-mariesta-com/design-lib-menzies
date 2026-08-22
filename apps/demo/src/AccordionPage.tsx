import type { ReactNode } from 'react'
import { Droplets, Layers, Palette } from 'menzies-design-wash-ui/icons'

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
          description="Same name on radios: only one panel open at a time."
        >
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
        </Section>

        <Section
          eyebrow="02 · Details"
          title="Accordion with details"
          description="Shared name on details keeps exclusive open state; content stays searchable."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="03 · Arrow"
          title="Arrow icon"
          description="collapse-arrow adds a chevron indicator."
        >
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
        </Section>

        <Section
          eyebrow="04 · Plus"
          title="Plus / minus icon"
          description="collapse-plus toggles a plus/minus glyph."
          panel="wash-panel-rose"
        >
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
        </Section>

        <Section
          eyebrow="05 · Join"
          title="Joined vertical stack"
          description="join join-vertical + join-item for shared borders and radius."
        >
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
        </Section>

        <Section
          eyebrow="06 · Checkbox"
          title="Multiple open (checkbox)"
          description="Checkbox collapses are independent: several can stay open."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="07 · Focus"
          title="Focus-driven collapse"
          description="tabindex=0: opens on focus, closes when focus leaves."
        >
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
        </Section>

        <Section
          eyebrow="08 · Force states"
          title="Open and close modifiers"
          description="collapse-open and collapse-close force visibility."
          panel="wash-panel-rose"
        >
          <div className="space-y-3">
            <div>
              <div className="collapse collapse-open border border-base-300 bg-base-100">
                <div className="collapse-title font-semibold">
                  Forced open
                </div>
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
        </Section>

        <Section
          eyebrow="09 · Colors"
          title="Semantic surfaces"
          description="Background and content colors on accordion panels."
        >
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
        </Section>

        <Section
          eyebrow="10 · Icon start"
          title="Arrow on the start edge"
          description="Utility classes move the collapse-arrow glyph to the left."
          panel="wash-panel-ochre"
        >
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
        </Section>

        <Section
          eyebrow="11 · Minimal"
          title="Without border or background"
          description="Bare collapse: no border, no base fill."
        >
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
        </Section>
      </div>
    </>
  )
}
