import { GallerySection } from './components/GallerySection'

const lines = Array.from({ length: 48 }, (_, i) => (
  <p key={i} className="text-sm text-base-content">
    Scroll line {i + 1}: pigment wash samples stack along the studio wall.
  </p>
))

export default function BehaviourWaterScrollbarPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Behaviour gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Water-drop scrollbar
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Opt-in via <code className="font-mono text-xs">enableWaterScrollbar</code> on{' '}
          <code className="font-mono text-xs">initWash</code> /{' '}
          <code className="font-mono text-xs">WashProvider</code>, or{' '}
          <code className="font-mono text-xs">attachWaterDropScrollbar()</code>. Default
          sitewide scrollbars are native/daisyUI (theme-tinted thumb). Opt out of fluid
          drops with <code className="font-mono text-xs">wash-scroll-native</code> on a
          pane.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Nested overflow"
          title="Inner scroll pane"
          description="Overflow panes get their own proportional drop (smaller thumb = more content)."
        >
          <div
            className="h-64 max-w-lg overflow-y-auto rounded-box border border-ink-border bg-base-100/80 p-4"
            aria-label="Nested scroll demo"
          >
            <div className="space-y-2">{lines}</div>
          </div>
        </GallerySection>

        <GallerySection
          eyebrow="02 · Horizontal"
          title="Wide row"
          description="Horizontal overflow uses a rotated water drop along the bottom edge."
          panel="wash-panel-blue"
        >
          <div
            className="max-w-full overflow-x-auto rounded-box border border-ink-border bg-base-100/80 p-4"
            aria-label="Horizontal scroll demo"
          >
            <p className="w-[160vw] whitespace-nowrap text-sm text-base-content">
              Long horizontal label — drag or shift-scroll to move the drop along the
              bottom gutter.
            </p>
          </div>
        </GallerySection>
      </div>
    </>
  )
}
