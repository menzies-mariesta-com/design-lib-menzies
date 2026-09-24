import type { ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

const snaps = [
  {
    id: 1015,
    alt: 'Mountain lake reflecting cloudy sky at dusk',
    w: 280,
    h: 200,
  },
  {
    id: 1016,
    alt: 'Rocky coastal cliff above turquoise water',
    w: 280,
    h: 200,
  },
  {
    id: 1018,
    alt: 'Misty forest path lined with tall pines',
    w: 280,
    h: 200,
  },
  {
    id: 1025,
    alt: 'Dog wearing a yellow raincoat outdoors',
    w: 280,
    h: 200,
  },
  {
    id: 1035,
    alt: 'Open notebook with coffee on a wooden desk',
    w: 280,
    h: 200,
  },
  {
    id: 1039,
    alt: 'Sunlit canyon walls in warm stone tones',
    w: 280,
    h: 200,
  },
  {
    id: 1043,
    alt: 'Quiet harbor with moored sailboats at dawn',
    w: 280,
    h: 200,
  },
] as const

const fullSlides = [
  {
    id: 1044,
    alt: 'Soft watercolor sky over a quiet meadow',
  },
  {
    id: 1050,
    alt: 'Wet pavement reflections after evening rain',
  },
  {
    id: 106,
    alt: 'Sunflower field stretching toward the horizon',
  },
  {
    id: 110,
    alt: 'Snow-dusted peaks under a clear blue sky',
  },
] as const

function picsum(id: number, w: number, h: number) {
  return `https://picsum.photos/id/${id}/${w}/${h}`
}

function snapItemsHtml(
  slides: ReadonlyArray<{ id: number; alt: string; w: number; h: number }>,
  opts: {
    itemClass?: string
    imgClass?: string
    w?: number
    h?: number
  } = {},
) {
  return slides
    .map((slide) => {
      const w = opts.w ?? slide.w
      const h = opts.h ?? slide.h
      const itemClass = opts.itemClass
        ? `carousel-item ${opts.itemClass}`
        : 'carousel-item'
      const imgClass = opts.imgClass ? ` class="${opts.imgClass}"` : ''
      return `<div class="${itemClass}">
  <img src="${picsum(slide.id, w, h)}" alt="${slide.alt}"${imgClass} width="${w}" height="${h}" />
</div>`
    })
    .join('\n')
}

const snapStartHtml = `<div class="carousel rounded-box">
${snapItemsHtml(snaps)}
</div>`

const snapCenterHtml = `<div class="carousel carousel-center rounded-box">
${snapItemsHtml(snaps)}
</div>`

const snapEndHtml = `<div class="carousel carousel-end rounded-box">
${snapItemsHtml(snaps)}
</div>`

const fullWidthHtml = `<div class="carousel w-full max-w-md rounded-box sm:w-80">
${snapItemsHtml(snaps, { itemClass: 'w-full', imgClass: 'w-full', w: 400, h: 280 })}
</div>`

const verticalHtml = `<div class="carousel carousel-vertical h-96 rounded-box">
${snapItemsHtml(snaps, { itemClass: 'h-full', w: 360, h: 384 })}
</div>`

const halfWidthHtml = `<div class="carousel w-full max-w-lg rounded-box">
${snapItemsHtml(snaps, { itemClass: 'w-1/2', imgClass: 'w-full', w: 320, h: 220 })}
</div>`

const fullBleedHtml = `<div class="carousel carousel-center max-w-md space-x-4 rounded-box bg-neutral p-4">
${snapItemsHtml(snaps, { imgClass: 'rounded-box' })}
</div>`

const indicatorsHtml = `<div class="w-full max-w-xl">
  <div class="carousel w-full">
${fullSlides
  .map(
    (slide, index) => `    <div id="wf-car-ind-${index + 1}" class="carousel-item w-full">
      <img src="${picsum(slide.id, 800, 400)}" alt="${slide.alt}" class="w-full" width="800" height="400" />
    </div>`,
  )
  .join('\n')}
  </div>
  <div class="flex w-full justify-center gap-2 py-2">
${fullSlides
  .map(
    (_, index) =>
      `    <a href="#wf-car-ind-${index + 1}" class="btn btn-xs cursor-pointer">${index + 1}</a>`,
  )
  .join('\n')}
  </div>
</div>`

const navButtonsHtml = `<div class="carousel w-full max-w-xl">
${fullSlides
  .map((slide, index) => {
    const n = fullSlides.length
    const prev = index === 0 ? n : index
    const next = index === n - 1 ? 1 : index + 2
    return `  <div id="wf-car-slide-${index + 1}" class="carousel-item relative w-full">
    <img src="${picsum(slide.id, 800, 400)}" alt="${slide.alt}" class="w-full" width="800" height="400" />
    <div class="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
      <a href="#wf-car-slide-${prev}" class="btn btn-circle cursor-pointer" aria-label="Previous slide">❮</a>
      <a href="#wf-car-slide-${next}" class="btn btn-circle cursor-pointer" aria-label="Next slide">❯</a>
    </div>
  </div>`
  })
  .join('\n')}
</div>`

const horizontalHtml = `<div class="carousel carousel-horizontal rounded-box">
${snapItemsHtml(snaps.slice(0, 4))}
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

export default function CarouselPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Carousel
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">carousel</span>{' '}
          snap, direction, and navigation pattern.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Snap start"
          title="Snap to start"
          description="Default horizontal scroll with items snapping to the start edge"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="carousel rounded-box">
                  {snaps.map((slide) => (
                    <div key={slide.id} className="carousel-item">
                      <img
                        src={picsum(slide.id, slide.w, slide.h)}
                        alt={slide.alt}
                        width={slide.w}
                        height={slide.h}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel rounded-box" />
                </div>
              </>
            }
            html={snapStartHtml}
            jsx={daisyToJsx(snapStartHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · Snap center"
          title="Snap to center"
          description="Items settle toward the middle of the viewport while scrolling"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="carousel carousel-center rounded-box">
                  {snaps.map((slide) => (
                    <div key={slide.id} className="carousel-item">
                      <img
                        src={picsum(slide.id, slide.w, slide.h)}
                        alt={slide.alt}
                        width={slide.w}
                        height={slide.h}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel carousel-center rounded-box" />
                </div>
              </>
            }
            html={snapCenterHtml}
            jsx={daisyToJsx(snapCenterHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Snap end"
          title="Snap to end"
          description="Scroll snap aligns each item to the trailing edge"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="carousel carousel-end rounded-box">
                  {snaps.map((slide) => (
                    <div key={slide.id} className="carousel-item">
                      <img
                        src={picsum(slide.id, slide.w, slide.h)}
                        alt={slide.alt}
                        width={slide.w}
                        height={slide.h}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel carousel-end rounded-box" />
                </div>
              </>
            }
            html={snapEndHtml}
            jsx={daisyToJsx(snapEndHtml)}
          />
        </Section>

        <Section
          eyebrow="04 · Full width"
          title="Full width items"
          description="Each slide fills the carousel width for a classic pager feel"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="carousel w-full max-w-md rounded-box sm:w-80">
                  {snaps.map((slide) => (
                    <div key={slide.id} className="carousel-item w-full">
                      <img
                        src={picsum(slide.id, 400, 280)}
                        alt={slide.alt}
                        className="w-full"
                        width={400}
                        height={280}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel rounded-box · carousel-item w-full" />
                </div>
              </>
            }
            html={fullWidthHtml}
            jsx={daisyToJsx(fullWidthHtml)}
          />
        </Section>

        <Section
          eyebrow="05 · Vertical"
          title="Vertical carousel"
          description="Scroll along the Y axis with full-height slides"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="carousel carousel-vertical h-96 rounded-box">
                  {snaps.map((slide) => (
                    <div key={slide.id} className="carousel-item h-full">
                      <img
                        src={picsum(slide.id, 360, 384)}
                        alt={slide.alt}
                        width={360}
                        height={384}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel carousel-vertical rounded-box h-96" />
                </div>
              </>
            }
            html={verticalHtml}
            jsx={daisyToJsx(verticalHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Half width"
          title="Half width items"
          description="Two slides visible at once inside a fixed carousel frame"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="carousel w-full max-w-lg rounded-box">
                  {snaps.map((slide) => (
                    <div key={slide.id} className="carousel-item w-1/2">
                      <img
                        src={picsum(slide.id, 320, 220)}
                        alt={slide.alt}
                        className="w-full"
                        width={320}
                        height={220}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel rounded-box · carousel-item w-1/2" />
                </div>
              </>
            }
            html={halfWidthHtml}
            jsx={daisyToJsx(halfWidthHtml)}
          />
        </Section>

        <Section
          eyebrow="07 · Full bleed"
          title="Full-bleed carousel"
          description="Centered snaps with padded gutters so peeks of neighbors show"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="carousel carousel-center max-w-md space-x-4 rounded-box bg-neutral p-4">
                  {snaps.map((slide) => (
                    <div key={slide.id} className="carousel-item">
                      <img
                        src={picsum(slide.id, slide.w, slide.h)}
                        alt={slide.alt}
                        className="rounded-box"
                        width={slide.w}
                        height={slide.h}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel carousel-center bg-neutral space-x-4 p-4" />
                </div>
              </>
            }
            html={fullBleedHtml}
            jsx={daisyToJsx(fullBleedHtml)}
          />
        </Section>

        <Section
          eyebrow="08 · Indicators"
          title="Indicator buttons"
          description="Anchor links jump to numbered slides"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="w-full max-w-xl">
                  <div className="carousel w-full">
                    {fullSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        id={`wf-car-ind-${index + 1}`}
                        className="carousel-item w-full"
                      >
                        <img
                          src={picsum(slide.id, 800, 400)}
                          alt={slide.alt}
                          className="w-full"
                          width={800}
                          height={400}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex w-full justify-center gap-2 py-2">
                    {fullSlides.map((_, index) => (
                      <a
                        key={index}
                        href={`#wf-car-ind-${index + 1}`}
                        className="btn btn-xs cursor-pointer"
                      >
                        {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel · btn btn-xs indicators via #anchors" />
                </div>
              </>
            }
            html={indicatorsHtml}
            jsx={daisyToJsx(indicatorsHtml)}
          />
        </Section>

        <Section
          eyebrow="09 · Nav buttons"
          title="Next and previous"
          description="Circle controls on each slide for sequential browsing"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="carousel w-full max-w-xl">
                  {fullSlides.map((slide, index) => {
                    const n = fullSlides.length
                    const prev = index === 0 ? n : index
                    const next = index === n - 1 ? 1 : index + 2
                    return (
                      <div
                        key={slide.id}
                        id={`wf-car-slide-${index + 1}`}
                        className="carousel-item relative w-full"
                      >
                        <img
                          src={picsum(slide.id, 800, 400)}
                          alt={slide.alt}
                          className="w-full"
                          width={800}
                          height={400}
                        />
                        <div className="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
                          <a
                            href={`#wf-car-slide-${prev}`}
                            className="btn btn-circle cursor-pointer"
                            aria-label="Previous slide"
                          >
                            ❮
                          </a>
                          <a
                            href={`#wf-car-slide-${next}`}
                            className="btn btn-circle cursor-pointer"
                            aria-label="Next slide"
                          >
                            ❯
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel · btn btn-circle next/prev anchors" />
                </div>
              </>
            }
            html={navButtonsHtml}
            jsx={daisyToJsx(navButtonsHtml)}
          />
        </Section>

        <Section
          eyebrow="10 · Direction"
          title="Horizontal explicit"
          description="carousel-horizontal is the default direction, shown explicitly"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="carousel carousel-horizontal rounded-box">
                  {snaps.slice(0, 4).map((slide) => (
                    <div key={slide.id} className="carousel-item">
                      <img
                        src={picsum(slide.id, slide.w, slide.h)}
                        alt={slide.alt}
                        width={slide.w}
                        height={slide.h}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ClassLabel value="carousel carousel-horizontal rounded-box" />
                </div>
              </>
            }
            html={horizontalHtml}
            jsx={daisyToJsx(horizontalHtml)}
          />
        </Section>
      </div>
    </>
  )
}
