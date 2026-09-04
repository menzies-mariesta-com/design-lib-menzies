import type { ReactNode } from 'react'
import {
  WashBackground,
  washRecipes,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import { ShowcaseTabs } from './components/ShowcaseTabs'

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

export default function BackgroundPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Background
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Soft pigment radial washes over paper, with optional fiber grain. This
          is the same atmosphere used behind the demo app shell.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Component"
          title="WashBackground"
          description="Wrap an app shell or a framed surface. Grain is on by default on web."
        >
          <ShowcaseTabs
            preview={
              <WashBackground className="flex min-h-56 items-end overflow-hidden rounded-box border border-ink-border p-5">
                <div>
                  <p className="font-display text-lg font-semibold">Studio paper</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    Wash A / B / C blooms over base-100.
                  </p>
                </div>
              </WashBackground>
            }
            html={`<div class="${washRecipes.pageWash} min-h-56 rounded-box border border-ink-border p-5">
  <!-- app chrome -->
</div>`}
            jsx={`import { WashBackground } from '@menzies-mariesta-com/menzies-design-wash-ui'

<WashBackground className="min-h-dvh">
  {/* app shell */}
</WashBackground>`}
            kotlin={`import com.mariesta.menzies.washui.components.WashBackground

WashBackground(modifier = Modifier.fillMaxSize()) {
    // app shell
}`}
          />
        </Section>

        <Section
          eyebrow="02 · Flat wash"
          title="Washes without grain"
          description="Pass grain={false} (or use page-wash alone) when you want pigment blooms only."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <WashBackground
                grain={false}
                className="flex min-h-56 items-end overflow-hidden rounded-box border border-ink-border p-5"
              >
                <div>
                  <p className="font-display text-lg font-semibold">Flat pigment</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    Same washes, no paper-grain overlay.
                  </p>
                </div>
              </WashBackground>
            }
            html={`<div class="${washRecipes.pageWashFlat} min-h-56 rounded-box border border-ink-border p-5">
  <!-- content -->
</div>`}
            jsx={`<WashBackground grain={false} className="min-h-56 rounded-box border border-ink-border p-5">
  {/* content */}
</WashBackground>`}
            kotlin={`WashBackground(
    modifier = Modifier.fillMaxSize(),
    grain = false,
) {
    // content
}`}
          />
        </Section>

        <Section
          eyebrow="03 · Recipe"
          title="Class string helpers"
          description="Prefer the component in React apps. Recipes stay available for progressive HTML."
        >
          <div className="space-y-2 font-mono text-xs text-ink-muted">
            <p>
              washRecipes.pageWash →{' '}
              <span className="text-base-content">{washRecipes.pageWash}</span>
            </p>
            <p>
              washRecipes.pageWashFlat →{' '}
              <span className="text-base-content">{washRecipes.pageWashFlat}</span>
            </p>
          </div>
        </Section>
      </div>
    </>
  )
}
