import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function ComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-ink-border/60 bg-base-200/30">
      <span className="badge badge-outline badge-sm">Coming soon</span>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

function PremiumComingSoonPreview({ label }: { label: string }) {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center gap-2 rounded-box border border-dashed border-warning/40 bg-warning/5">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="badge badge-warning badge-sm">Premium</span>
        <span className="badge badge-outline badge-sm">Coming soon</span>
      </div>
      <p className="max-w-sm px-4 text-center text-sm text-ink-muted">{label}</p>
    </div>
  )
}

const narrativeDemos = [
  {
    eyebrow: '01 · Scroll',
    title: 'Scrollytelling',
    description:
      'Step through narrative beats as the reader scrolls. Pin chart panels, animate series reveals, and sync copy blocks to viewport progress.',
    panel: undefined,
    previewLabel:
      'Scrollytelling layout with pinned chart stages, scroll progress driver, and pigment-aware step transitions.',
    slug: 'scrollytelling',
    premium: false,
  },
  {
    eyebrow: '02 · Share',
    title: 'Shareable views',
    description:
      'Serialize filter state, zoom windows, and annotation sets into shareable URLs or embed snippets for studio reports and client handoffs.',
    panel: 'wash-panel-ochre' as const,
    previewLabel:
      'Shareable view links with encoded chart state, theme token, and read-only embed iframe shell.',
    slug: 'shareable-views',
    premium: false,
  },
  {
    eyebrow: '03 · History',
    title: 'Undo redo',
    description:
      'Premium interaction history for annotation edits, filter changes, and brush selections with keyboard shortcuts and timeline scrub.',
    panel: 'wash-panel-slate' as const,
    previewLabel:
      'Undo redo stack for chart interactions with Ctrl+Z / Ctrl+Shift+Z and visual history timeline (Premium).',
    slug: 'undo-redo',
    premium: true,
  },
] as const

export default function ChartsNarrativeCategoryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Narrative Charts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Scrollytelling, shareable chart views, and premium undo redo for long-form studio analytics
          stories. Narrative helpers will ship alongside Apex interactivity upgrades in Wash UI.
        </p>
      </div>

      <div className="space-y-6">
        {narrativeDemos.map((demo) => (
          <GallerySection
            key={demo.slug}
            eyebrow={demo.eyebrow}
            title={demo.title}
            description={demo.description}
            panel={demo.panel}
          >
            <ShowcaseTabs
              preview={
                demo.premium ? (
                  <PremiumComingSoonPreview label={demo.previewLabel} />
                ) : (
                  <ComingSoonPreview label={demo.previewLabel} />
                )
              }
              html={`<!-- ${demo.title} (coming soon) -->
<div class="wash-chart wash-chart-narrative"></div>`}
              jsx={`// ${demo.title} — narrative chart helper, coming soon`}
            />
          </GallerySection>
        ))}
      </div>
    </>
  )
}
