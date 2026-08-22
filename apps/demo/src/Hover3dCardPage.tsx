import type { ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
const HoverZones = () => (
  <>
    <div />
  </>
)

const galleryPlates = [
  {
    title: 'Cerulean wash',
    body: 'Cool sky pigment for coastal fog studies.',
    panel: 'bg-wash-blue/40',
  },
  {
    title: 'Ochre bloom',
    body: 'Warm earth tone for dry-brush edges.',
    panel: 'bg-secondary/20',
  },
  {
    title: 'Rose mist',
    body: 'Soft petal wash for quiet accents.',
    panel: 'bg-wash-rose/35',
  },
  {
    title: 'Ink line',
    body: 'Neutral contour over damp paper.',
    panel: 'bg-base-200',
  },
  {
    title: 'Verdant glaze',
    body: 'Layered greens for meadow plates.',
    panel: 'bg-success/15',
  },
  {
    title: 'Indigo depth',
    body: 'Night sky underpainting for stars.',
    panel: 'bg-primary/15',
  },
] as const

const studioSubjects = [
  {
    title: 'Palette',
    body: 'Mix ratios and pigment notes for the week.',
    wash: 'bg-wash-ochre/50',
  },
  {
    title: 'Layers',
    body: 'Transparent glazes stacked wet-into-wet.',
    wash: 'bg-wash-rose/40',
  },
  {
    title: 'Brushes',
    body: 'Round, flat, and mop for studio sessions.',
    wash: 'bg-wash-blue/40',
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

export default function Hover3dCardPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Hover 3D cards
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Official daisyUI <span className="font-mono text-xs">hover-3d</span>{' '}
          wrappers: eight hover zones tilt content toward the pointer. Keep
          inner content non-interactive; use a link for the whole wrapper when
          the plate should navigate.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Basic 3D hover"
          description="A single studio card tilts when you hover any zone."
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="hover-3d">
                            <div className="card w-72 bg-base-100 shadow-sm">
                              <div className="card-body">
                                <h2 className="card-title font-display">Coastal fog plate</h2>
                                <p className="text-sm text-ink-muted">
                                  Soft cerulean wash over warm paper. Quiet hierarchy, no
                                  extra pigment.
                                </p>
                              </div>
                            </div>
                            <HoverZones />
                          </div>
            
              </>
            }
            html={`<div class="hover-3d">
              <div class="card w-72 bg-base-100 shadow-sm">
                <div class="card-body">
                  <h2 class="card-title font-display">Coastal fog plate</h2>
                  <p class="text-sm text-ink-muted">
                    Soft cerulean wash over warm paper. Quiet hierarchy, no
                    extra pigment.
                  </p>
                </div>
              </div>
              <!-- HoverZones -->
            </div>`}
            jsx={`<div className="hover-3d">
              <div className="card w-72 bg-base-100 shadow-sm">
                <div className="card-body">
                  <h2 className="card-title font-display">Coastal fog plate</h2>
                  <p className="text-sm text-ink-muted">
                    Soft cerulean wash over warm paper. Quiet hierarchy, no
                    extra pigment.
                  </p>
                </div>
              </div>
              <HoverZones />
            </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Pointer follow"
          title="Zone-based pointer follow"
          description="daisyUI places eight zones over the content. Each zone sets a different rotate3d direction so the tilt follows the pointer without JavaScript."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <a href="#hover-3d-zones" className="hover-3d cursor-pointer">
                            <div className="card w-80 bg-neutral text-neutral-content shadow-sm">
                              <div className="card-body gap-4">
                                <div className="mb-2 flex items-start justify-between">
                                  <span className="font-display text-lg font-semibold tracking-wide">
                                    MENZIES DESIGN
                                  </span>
                                  <span className="text-4xl opacity-20" aria-hidden="true">
                                    ❁
                                  </span>
                                </div>
                                <p className="font-mono text-sm tracking-widest opacity-70">
                                  PLATE · 0210 · FOG · 1150
                                </p>
                                <div className="flex justify-between text-sm">
                                  <div>
                                    <p className="text-xs opacity-50">SERIES</p>
                                    <p>Harbor mist</p>
                                  </div>
                                  <div className="text-end">
                                    <p className="text-xs opacity-50">WASH</p>
                                    <p>Cerulean</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <HoverZones />
                          </a>
            
              </>
            }
            html={`<a href="#hover-3d-zones" class="hover-3d cursor-pointer">
              <div class="card w-80 bg-neutral text-neutral-content shadow-sm">
                <div class="card-body gap-4">
                  <div class="mb-2 flex items-start justify-between">
                    <span class="font-display text-lg font-semibold tracking-wide">
                      MENZIES DESIGN
                    </span>
                    <span class="text-4xl opacity-20" aria-hidden="true">
                      ❁
                    </span>
                  </div>
                  <p class="font-mono text-sm tracking-widest opacity-70">
                    PLATE · 0210 · FOG · 1150
                  </p>
                  <div class="flex justify-between text-sm">
                    <div>
                      <p class="text-xs opacity-50">SERIES</p>
                      <p>Harbor mist</p>
                    </div>
                    <div class="text-end">
                      <p class="text-xs opacity-50">WASH</p>
                      <p>Cerulean</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- HoverZones -->
            </a>`}
            jsx={`<a href="#hover-3d-zones" className="hover-3d cursor-pointer">
              <div className="card w-80 bg-neutral text-neutral-content shadow-sm">
                <div className="card-body gap-4">
                  <div className="mb-2 flex items-start justify-between">
                    <span className="font-display text-lg font-semibold tracking-wide">
                      MENZIES DESIGN
                    </span>
                    <span className="text-4xl opacity-20" aria-hidden="true">
                      ❁
                    </span>
                  </div>
                  <p className="font-mono text-sm tracking-widest opacity-70">
                    PLATE · 0210 · FOG · 1150
                  </p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-xs opacity-50">SERIES</p>
                      <p>Harbor mist</p>
                    </div>
                    <div className="text-end">
                      <p className="text-xs opacity-50">WASH</p>
                      <p>Cerulean</p>
                    </div>
                  </div>
                </div>
              </div>
              <HoverZones />
            </a>`}
          />
          <p id="hover-3d-zones" className="mt-4 text-sm text-ink-muted">
            Move across corners and edges to feel each zone. The whole plate is
            one link, matching the daisyUI pattern.
          </p>
        </Section>

        <Section
          eyebrow="03 · Grid"
          title="Sizes and pigment grid"
          description="Responsive studio plates. Avoid layout utilities on the hover-3d wrapper itself so the zone grid stays intact."
        >
          <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
            {galleryPlates.map((plate) => (
              <ShowcaseTabs
            preview={
              <>

              <div className="hover-3d w-full max-w-[14rem]">
                                <div
                                  className={`card card-sm w-full shadow-sm ${plate.panel}`}
                                >
                                  <div className="card-body">
                                    <h2 className="card-title font-display text-base">
                                      {plate.title}
                                    </h2>
                                    <p className="text-xs text-ink-muted">{plate.body}</p>
                                  </div>
                                </div>
                                <HoverZones />
                              </div>
            
              </>
            }
            html={`<div class="hover-3d w-full max-w-[14rem]">
                  <div
                    class=
                  >
                    <div class="card-body">
                      <h2 class="card-title font-display text-base">
                        
                      </h2>
                      <p class="text-xs text-ink-muted"></p>
                    </div>
                  </div>
                  <!-- HoverZones -->
                </div>`}
            jsx={`<div className="hover-3d w-full max-w-[14rem]">
                  <div
                    className={\`card card-sm w-full shadow-sm \${plate.panel}\`}
                  >
                    <div className="card-body">
                      <h2 className="card-title font-display text-base">
                        {plate.title}
                      </h2>
                      <p className="text-xs text-ink-muted">{plate.body}</p>
                    </div>
                  </div>
                  <HoverZones />
                </div>`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Figure"
          title="With image figure"
          description="Image plates use figure as the first child, then the eight empty zone divs."
          panel="wash-panel-rose"
        >
          <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
            {[
              {
                src: 'https://picsum.photos/id/1015/320/220',
                alt: 'Mountain lake reflecting cloudy sky at dusk',
              },
              {
                src: 'https://picsum.photos/id/1016/320/220',
                alt: 'Rocky coastal cliff above turquoise water',
              },
              {
                src: 'https://picsum.photos/id/1035/320/220',
                alt: 'Open notebook with coffee on a wooden desk',
              },
            ].map((img) => (
              <ShowcaseTabs
            preview={
              <>

              <div className="hover-3d">
                                <figure className="w-60 overflow-hidden rounded-2xl shadow-sm">
                                  <img
                                    src={img.src}
                                    alt={img.alt}
                                    width={320}
                                    height={220}
                                    className="aspect-[16/11] w-full object-cover"
                                    loading="lazy"
                                  />
                                </figure>
                                <HoverZones />
                              </div>
            
              </>
            }
            html={`<div class="hover-3d">
                  <figure class="w-60 overflow-hidden rounded-2xl shadow-sm">
                    <img
                      src=
                      alt=
                      width={320}
                      height={220}
                      class="aspect-[16/11] w-full object-cover"
                      loading="lazy" />
                  </figure>
                  <!-- HoverZones -->
                </div>`}
            jsx={`<div className="hover-3d">
                  <figure className="w-60 overflow-hidden rounded-2xl shadow-sm">
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={320}
                      height={220}
                      className="aspect-[16/11] w-full object-cover"
                      loading="lazy"
                    />
                  </figure>
                  <HoverZones />
                </div>`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Motion"
          title="Reduced motion"
          description="All hover-3d plates flatten under prefers-reduced-motion: reduce. hover-3d-safe forces a flat plate for comparison even when motion is allowed."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseTabs
            preview={
              <>

              <div className="hover-3d">
                              <div className="card w-full max-w-sm bg-base-100 shadow-sm">
                                <div className="card-body">
                                  <h2 className="card-title font-display">Full tilt</h2>
                                  <p className="text-sm text-ink-muted">
                                    Standard rotate3d response when motion is allowed.
                                  </p>
                                </div>
                              </div>
                              <HoverZones />
                            </div>
            
              </>
            }
            html={`<div class="hover-3d">
                <div class="card w-full max-w-sm bg-base-100 shadow-sm">
                  <div class="card-body">
                    <h2 class="card-title font-display">Full tilt</h2>
                    <p class="text-sm text-ink-muted">
                      Standard rotate3d response when motion is allowed.
                    </p>
                  </div>
                </div>
                <!-- HoverZones -->
              </div>`}
            jsx={`<div className="hover-3d">
                <div className="card w-full max-w-sm bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h2 className="card-title font-display">Full tilt</h2>
                    <p className="text-sm text-ink-muted">
                      Standard rotate3d response when motion is allowed.
                    </p>
                  </div>
                </div>
                <HoverZones />
              </div>`}
          />
            <ShowcaseTabs
            preview={
              <>

              <div className="hover-3d hover-3d-safe">
                              <div className="card w-full max-w-sm bg-base-100 shadow-sm">
                                <div className="card-body">
                                  <h2 className="card-title font-display">Always flat</h2>
                                  <p className="text-sm text-ink-muted">
                                    Same chrome. hover-3d-safe keeps this plate flat for demos.
                                  </p>
                                </div>
                              </div>
                              <HoverZones />
                            </div>
            
              </>
            }
            html={`<div class="hover-3d hover-3d-safe">
                <div class="card w-full max-w-sm bg-base-100 shadow-sm">
                  <div class="card-body">
                    <h2 class="card-title font-display">Always flat</h2>
                    <p class="text-sm text-ink-muted">
                      Same chrome. hover-3d-safe keeps this plate flat for demos.
                    </p>
                  </div>
                </div>
                <!-- HoverZones -->
              </div>`}
            jsx={`<div className="hover-3d hover-3d-safe">
                <div className="card w-full max-w-sm bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h2 className="card-title font-display">Always flat</h2>
                    <p className="text-sm text-ink-muted">
                      Same chrome. hover-3d-safe keeps this plate flat for demos.
                    </p>
                  </div>
                </div>
                <HoverZones />
              </div>`}
          />
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            Enable reduced motion in your OS or browser to verify every{' '}
            <span className="font-mono text-xs">hover-3d</span> plate stays flat.
          </p>
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Watercolor subject cards"
          description="Palette, layers, and brushes themes for the Menzies Design desk."
        >
          <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
            {studioSubjects.map((subject) => (
              <ShowcaseTabs
            preview={
              <>

              <a
                                href={`#studio-${subject.title.toLowerCase()}`}
                                className="hover-3d cursor-pointer"
                              >
                                <div
                                  className={`card w-64 bg-base-100 shadow-sm ${subject.wash}`}
                                >
                                  <div className="card-body">
                                    <p className="label-ink">{subject.title}</p>
                                    <h2 className="card-title font-display text-lg">
                                      {subject.title} plate
                                    </h2>
                                    <p className="text-sm text-ink-muted">{subject.body}</p>
                                  </div>
                                </div>
                                <HoverZones />
                              </a>
            
              </>
            }
            html={`<a
                  href=
                  class="hover-3d cursor-pointer"
                >
                  <div
                    class=
                  >
                    <div class="card-body">
                      <p class="label-ink"></p>
                      <h2 class="card-title font-display text-lg">
                         plate
                      </h2>
                      <p class="text-sm text-ink-muted"></p>
                    </div>
                  </div>
                  <!-- HoverZones -->
                </a>`}
            jsx={`<a
                  href={\`#studio-\${subject.title.toLowerCase()}\`}
                  className="hover-3d cursor-pointer"
                >
                  <div
                    className={\`card w-64 bg-base-100 shadow-sm \${subject.wash}\`}
                  >
                    <div className="card-body">
                      <p className="label-ink">{subject.title}</p>
                      <h2 className="card-title font-display text-lg">
                        {subject.title} plate
                      </h2>
                      <p className="text-sm text-ink-muted">{subject.body}</p>
                    </div>
                  </div>
                  <HoverZones />
                </a>`}
          />
            ))}
          </div>
          <div className="sr-only">
            <span id="studio-palette" />
            <span id="studio-layers" />
            <span id="studio-brushes" />
          </div>
        </Section>
      </div>
    </>
  )
}
