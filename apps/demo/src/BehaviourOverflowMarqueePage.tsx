import type { ReactNode } from 'react'
import { OverflowMarquee } from '@menzies-mariesta-com/menzies-design-wash-ui'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function Sample({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

export default function BehaviourOverflowMarqueePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Behaviour gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Overflow hover marquee
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Truncated labels stay still when they fit. When clipped, hover or focus loops the
          full string, then restores the ellipsis on leave.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Truncate auto-attach"
          title="Clipped text marquees on hover"
          description="WashProvider / initWash enhances .truncate and line-clamp when scrollWidth exceeds the box. Non-overflowing text never animates."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 md:grid-cols-2">
                  <Sample label="truncate (clipped)">
                    <div className="w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                      <p className="truncate text-sm">
                        Ultramarine glaze over warm ochre underpainting for depth
                      </p>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Hover or Tab-focus the truncated line to loop the full label.
                    </p>
                  </Sample>

                  <Sample label="truncate (fits: static)">
                    <div className="w-full max-w-xl rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                      <p className="truncate text-sm">Short label</p>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Wide enough to fit: no marquee, no focus ring.
                    </p>
                  </Sample>
                </div>
              </>
            }
            html={
              '<p class="truncate max-w-[11rem]">Ultramarine glaze over warm ochre underpainting for depth</p>\n<!-- attachOverflowMarquee via initWash / WashProvider -->'
            }
            jsx={
              '{/* Plain truncate: WashProvider / initWash auto-attaches when clipped */}\n<p className="truncate max-w-[11rem]">\n  Ultramarine glaze over warm ochre underpainting for depth\n</p>\n\n<p className="truncate max-w-xl">Short label</p>'
            }
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · OverflowMarquee"
          title="Explicit React wrapper"
          description="Use OverflowMarquee when you own the markup and want a dedicated host. Same hover and focus loop as auto-attach."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="<OverflowMarquee>">
                  <div className="w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                    <OverflowMarquee className="text-sm">
                      Wet-on-wet bloom edges need a clean sponge and patience
                    </OverflowMarquee>
                  </div>
                  <p className="text-xs text-ink-muted">
                    Prefer this in labeled UIs (sidebar rows, table cells, card titles).
                  </p>
                </Sample>
              </>
            }
            html={
              '<div class="overflow-marquee-host overflow-marquee" data-overflow-marquee>\n  <span class="overflow-marquee-label">Wet-on-wet bloom edges need a clean sponge and patience</span>\n</div>'
            }
            jsx={
              "import { OverflowMarquee } from '@menzies-mariesta-com/menzies-design-wash-ui'\n\n<div className=\"max-w-[11rem]\">\n  <OverflowMarquee className=\"text-sm\">\n    Wet-on-wet bloom edges need a clean sponge and patience\n  </OverflowMarquee>\n</div>"
            }
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Line clamp"
          title="Multi-line clamp also loops"
          description="Classes matching line-clamp-* are included in the default attach selector when content is vertically clipped."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-8 md:grid-cols-2">
                  <Sample label="line-clamp-2 (clipped)">
                    <div className="w-full max-w-[14rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                      <p className="line-clamp-2 text-sm">
                        Leave dry islands for bloom edges, lift while the glaze is still shiny,
                        and keep a clean sponge for soft corrections on damp paper.
                      </p>
                    </div>
                  </Sample>
                  <Sample label="line-clamp-2 (fits)">
                    <div className="w-full max-w-xl rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                      <p className="line-clamp-2 text-sm">Two short lines fit.</p>
                    </div>
                  </Sample>
                </div>
              </>
            }
            html={
              '<p class="line-clamp-2 max-w-[14rem]">Leave dry islands for bloom edges…</p>'
            }
            jsx={
              '<p className="line-clamp-2 max-w-[14rem]">\n  Leave dry islands for bloom edges, lift while the glaze is still shiny,\n  and keep a clean sponge for soft corrections on damp paper.\n</p>'
            }
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Reduced motion"
          title="Respect prefers-reduced-motion"
          description="When the user prefers reduced motion, clipped text stays truncated. Hover may expose the full string via title or a static reveal instead of a looping marquee."
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="rounded-box border border-ink-border/70 bg-base-200/50 px-4 py-3 text-sm text-ink-muted">
                  <p>
                    Enable{' '}
                    <span className="font-mono text-xs">prefers-reduced-motion: reduce</span>{' '}
                    in your OS or browser to verify. Overflow hosts set{' '}
                    <span className="font-mono text-xs">data-marquee-static</span> and skip the
                    looping track.
                  </p>
                  <p className="mt-2">
                    Demo tip: DevTools Rendering panel can force reduced motion without changing
                    system settings.
                  </p>
                </div>
                <Sample label="try with reduced motion" className="mt-4">
                  <div className="w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                    <OverflowMarquee className="text-sm">
                      Granulation on rough paper reads loudest at the first wash edge
                    </OverflowMarquee>
                  </div>
                </Sample>
              </>
            }
            html={
              '<!-- CSS: @media (prefers-reduced-motion: reduce) disables overflow marquee loops -->\n<p class="truncate max-w-[11rem]">Granulation on rough paper…</p>'
            }
            jsx={
              '{/* OverflowMarquee reads usePrefersReducedMotion and skips the track */}\n<OverflowMarquee className="text-sm max-w-[11rem]">\n  Granulation on rough paper reads loudest at the first wash edge\n</OverflowMarquee>'
            }
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Opt out"
          title="Skip with no-overflow-marquee"
          description="Add no-overflow-marquee (or nest under skipped editors) when a truncated label must stay static."
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="truncate no-overflow-marquee">
                  <div className="w-full max-w-[11rem] rounded-field border border-ink-border/70 bg-base-100 px-3 py-2">
                    <p className="truncate no-overflow-marquee text-sm">
                      This clipped line stays ellipsized even on hover
                    </p>
                  </div>
                </Sample>
              </>
            }
            html={
              '<p class="truncate no-overflow-marquee max-w-[11rem]">This clipped line stays ellipsized even on hover</p>'
            }
            jsx={
              '<p className="truncate no-overflow-marquee max-w-[11rem]">\n  This clipped line stays ellipsized even on hover\n</p>'
            }
          />
        </GallerySection>
      </div>
    </>
  )
}
