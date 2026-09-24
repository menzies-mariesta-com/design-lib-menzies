import type { ReactNode } from 'react'

import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

type WashTone = 'blue' | 'ochre' | 'rose' | 'ink' | 'sage' | 'violet'

type Plate = { tone: WashTone; label: string; stage: string }

const toneFills: Record<
  WashTone,
  { a: string; b: string; c: string; label: string }
> = {
  blue: {
    a: '#b8dce8',
    b: '#7aa8b8',
    c: '#eef6f9',
    label: 'Cerulean',
  },
  ochre: {
    a: '#e8d2a8',
    b: '#c4a06a',
    c: '#f8f0e0',
    label: 'Raw sienna',
  },
  rose: {
    a: '#dcb0a8',
    b: '#b87870',
    c: '#f4e4e0',
    label: 'Rose madder',
  },
  ink: {
    a: '#c8c4c0',
    b: '#6e6a66',
    c: '#ebe8e4',
    label: 'Payne grey',
  },
  sage: {
    a: '#c5d4c0',
    b: '#7a9478',
    c: '#e8f0e6',
    label: 'Sap green',
  },
  violet: {
    a: '#c8b8d4',
    b: '#8a7498',
    c: '#f0e8f4',
    label: 'Cobalt violet',
  },
}

/** Offline SVG wash plate (data URI). Same dimensions keep hover-gallery aligned. */
function washSrc(
  tone: WashTone,
  label: string,
  w = 480,
  h = 360,
  stage = 'wet',
): string {
  const { a, b, c } = toneFills[tone]
  const dry = stage === 'dry'
  const fog = dry ? 0.2 : 0.45
  const contrast = dry ? 0.12 : 0.06
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="55%" stop-color="${dry ? b : a}"/>
      <stop offset="100%" stop-color="${c}"/>
    </linearGradient>
    <radialGradient id="bloom" cx="32%" cy="38%" r="55%">
      <stop offset="0%" stop-color="#fff" stop-opacity="${fog}"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="edge" cx="72%" cy="78%" r="48%">
      <stop offset="0%" stop-color="#000" stop-opacity="${contrast}"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#bloom)"/>
  <rect width="100%" height="100%" fill="url(#edge)"/>
  <text x="50%" y="46%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(h * 0.12)}" font-weight="600" fill="#2a2622" opacity="0.85">${label}</text>
  <text x="50%" y="58%" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${Math.round(h * 0.045)}" letter-spacing="0.18em" fill="#2a2622" opacity="0.55">${dry ? 'DRIED' : 'WET WASH'}</text>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

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

const basicPlates = [
  { tone: 'blue' as const, label: 'Cerulean', stage: 'wet' },
  { tone: 'blue' as const, label: 'Cerulean', stage: 'dry' },
  { tone: 'ochre' as const, label: 'Sienna', stage: 'wet' },
  { tone: 'ochre' as const, label: 'Sienna', stage: 'dry' },
]

const coastalSeries = [
  { tone: 'blue' as const, label: 'Fog I', stage: 'wet' },
  { tone: 'blue' as const, label: 'Fog II', stage: 'wet' },
  { tone: 'sage' as const, label: 'Tide', stage: 'wet' },
  { tone: 'ink' as const, label: 'Cliff', stage: 'dry' },
  { tone: 'ochre' as const, label: 'Sand', stage: 'wet' },
  { tone: 'rose' as const, label: 'Dusk', stage: 'dry' },
]

const studioPreview = [
  { tone: 'rose' as const, label: 'Madder', stage: 'wet' },
  { tone: 'ochre' as const, label: 'Ochre', stage: 'wet' },
  { tone: 'blue' as const, label: 'Cobalt', stage: 'wet' },
  { tone: 'sage' as const, label: 'Sap', stage: 'wet' },
  { tone: 'violet' as const, label: 'Violet', stage: 'dry' },
]

const fullPlateSet = [
  { tone: 'blue' as const, label: '01', stage: 'wet' },
  { tone: 'ochre' as const, label: '02', stage: 'wet' },
  { tone: 'rose' as const, label: '03', stage: 'wet' },
  { tone: 'sage' as const, label: '04', stage: 'wet' },
  { tone: 'violet' as const, label: '05', stage: 'wet' },
  { tone: 'ink' as const, label: '06', stage: 'dry' },
  { tone: 'blue' as const, label: '07', stage: 'dry' },
  { tone: 'ochre' as const, label: '08', stage: 'dry' },
  { tone: 'rose' as const, label: '09', stage: 'dry' },
  { tone: 'sage' as const, label: '10', stage: 'dry' },
]

const warmSeries = [
  { tone: 'ochre' as const, label: 'Warm I', stage: 'wet' },
  { tone: 'ochre' as const, label: 'Warm II', stage: 'dry' },
  { tone: 'rose' as const, label: 'Bloom', stage: 'wet' },
  { tone: 'ink' as const, label: 'Line', stage: 'dry' },
] as const

function plateImgsHtml(
  plates: readonly Plate[],
  w: number,
  h: number,
  altFor: (plate: Plate) => string,
  imgClass = '',
): string {
  return plates
    .map((plate) => {
      const cls = imgClass ? ` class="${imgClass}"` : ''
      return `  <img src="${washSrc(plate.tone, plate.label, w, h, plate.stage)}" alt="${altFor(plate)}" width="${w}" height="${h}"${cls} />`
    })
    .join('\n')
}

function figureHtml(
  figureClass: string,
  plates: readonly Plate[],
  w: number,
  h: number,
  altFor: (plate: Plate) => string,
  imgClass = '',
): string {
  return `<figure class="${figureClass}">
${plateImgsHtml(plates, w, h, altFor, imgClass)}
</figure>`
}

function divGalleryHtml(
  divClass: string,
  plates: readonly Plate[],
  w: number,
  h: number,
  altFor: (plate: Plate) => string,
): string {
  return `<div class="${divClass}">
${plateImgsHtml(plates, w, h, altFor)}
</div>`
}

const basicHtml = figureHtml(
  'hover-gallery max-w-60 cursor-pointer',
  basicPlates,
  480,
  360,
  (p) =>
    `${p.label} ${p.stage === 'wet' ? 'wet wash' : 'dried pigment'} plate`,
)

const setAHtml = figureHtml(
  'hover-gallery max-w-60 cursor-pointer',
  basicPlates,
  480,
  360,
  (p) => `${p.label} plate`,
)

const setBHtml = figureHtml(
  'hover-gallery max-w-60 cursor-pointer',
  coastalSeries,
  480,
  360,
  (p) => `${p.label} coastal plate`,
)

const setCHtml = figureHtml(
  'hover-gallery max-w-60 cursor-pointer',
  fullPlateSet,
  480,
  360,
  (p) => `Plate ${p.label}`,
)

const sizeSmHtml = figureHtml(
  'hover-gallery max-w-40 cursor-pointer',
  basicPlates,
  320,
  240,
  (p) => `${p.label} small`,
)

const sizeMdHtml = figureHtml(
  'hover-gallery max-w-60 cursor-pointer',
  basicPlates,
  480,
  360,
  (p) => `${p.label} medium`,
)

const sizeLgHtml = figureHtml(
  'hover-gallery max-w-xs cursor-pointer',
  basicPlates,
  480,
  360,
  (p) => `${p.label} large`,
)

const sizeSqHtml = figureHtml(
  'hover-gallery max-w-sm cursor-pointer',
  (['blue', 'ochre', 'rose', 'sage'] as const).map((tone) => ({
    tone,
    label: toneFills[tone].label,
    stage: 'wet',
  })),
  400,
  400,
  (p) => `${p.label} square plate`,
)

const studioCardHtml = `<div class="card card-sm max-w-60 bg-base-200 shadow-sm">
  <figure class="hover-gallery cursor-pointer">
${plateImgsHtml(studioPreview, 480, 360, (p) => `${p.label} pigment preview`)}
  </figure>
  <div class="card-body">
    <h2 class="card-title flex justify-between font-display text-base">
      Coastal fog set
      <span class="font-normal text-sm text-ink-muted">5 plates</span>
    </h2>
    <p class="text-sm text-ink-muted">Hover across the strip to preview each pigment wash.</p>
  </div>
</div>`

const warmCardHtml = `<div class="card card-sm max-w-60 bg-base-100 shadow-sm">
  <figure class="hover-gallery cursor-pointer">
${plateImgsHtml(warmSeries, 480, 360, (p) => `${p.label} ochre series plate`)}
  </figure>
  <div class="card-body">
    <h2 class="card-title flex justify-between font-display text-base">
      Warm paper set
      <span class="font-normal text-sm text-ink-muted">4 plates</span>
    </h2>
    <p class="text-sm text-ink-muted">Ochre and rose washes for dry-brush studies.</p>
  </div>
</div>`

const divGallerySnippetHtml = divGalleryHtml(
  'hover-gallery max-w-60 cursor-pointer',
  coastalSeries.slice(0, 4),
  480,
  360,
  (p) => `${p.label} as div gallery`,
)

const responsiveSets = [
  { name: 'Blue', tones: ['blue', 'blue', 'sage', 'ink'] as const },
  { name: 'Ochre', tones: ['ochre', 'ochre', 'rose', 'ink'] as const },
  { name: 'Rose', tones: ['rose', 'violet', 'rose', 'ink'] as const },
  { name: 'Sage', tones: ['sage', 'blue', 'sage', 'ochre'] as const },
] as const

const responsiveHtmls = responsiveSets.map((set) => {
  const imgs = set.tones
    .map((tone, i) => {
      const stage = i % 2 === 0 ? 'wet' : 'dry'
      const label = toneFills[tone].label
      return `  <img src="${washSrc(tone, label, 480, 360, stage)}" alt="${set.name} set plate ${i + 1}" width="480" height="360" class="w-full" />`
    })
    .join('\n')
  return `<figure class="hover-gallery w-full max-w-full cursor-pointer sm:max-w-60">
${imgs}
</figure>`
})

export default function HoverGalleryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Hover gallery
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">hover-gallery</span> image strips.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Official structure"
          description="A figure with hover-gallery and a max width"
        >
          <ShowcaseTabs
            preview={
              <>

              <figure className="hover-gallery max-w-60 cursor-pointer">
                            {basicPlates.map((plate) => (
                              <img
                                key={`${plate.label}-${plate.stage}`}
                                src={washSrc(plate.tone, plate.label, 480, 360, plate.stage)}
                                alt={`${plate.label} ${plate.stage === 'wet' ? 'wet wash' : 'dried pigment'} plate`}
                                width={480}
                                height={360}
                              />
                            ))}
                          </figure>
            
              </>
            }
          
            html={basicHtml}
            jsx={daisyToJsx(basicHtml)}
          />
          <p className="mt-4 text-sm text-ink-muted">
            Tip: hover left to right across the plate to step through each image
            column.
          </p>
        </Section>

        <Section
          eyebrow="02 · Multiple figures"
          title="Wash plate sets"
          description="Several galleries with matching SVG wash plates"
          panel="wash-panel-ochre"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ShowcaseTabs
            preview={
              <>

              <figure className="hover-gallery max-w-60 cursor-pointer">
                              {basicPlates.map((plate) => (
                                <img
                                  key={`set-a-${plate.label}-${plate.stage}`}
                                  src={washSrc(plate.tone, plate.label, 480, 360, plate.stage)}
                                  alt={`${plate.label} plate`}
                                  width={480}
                                  height={360}
                                />
                              ))}
                            </figure>
            
              </>
            }
          
            html={setAHtml}
            jsx={daisyToJsx(setAHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <figure className="hover-gallery max-w-60 cursor-pointer">
                              {coastalSeries.map((plate) => (
                                <img
                                  key={`set-b-${plate.label}`}
                                  src={washSrc(plate.tone, plate.label, 480, 360, plate.stage)}
                                  alt={`${plate.label} coastal plate`}
                                  width={480}
                                  height={360}
                                />
                              ))}
                            </figure>
            
              </>
            }
          
            html={setBHtml}
            jsx={daisyToJsx(setBHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <figure className="hover-gallery max-w-60 cursor-pointer">
                              {fullPlateSet.map((plate) => (
                                <img
                                  key={`set-c-${plate.label}`}
                                  src={washSrc(plate.tone, plate.label, 480, 360, plate.stage)}
                                  alt={`Plate ${plate.label}`}
                                  width={480}
                                  height={360}
                                />
                              ))}
                            </figure>
            
              </>
            }
          
            html={setCHtml}
            jsx={daisyToJsx(setCHtml)}
          />
          </div>
        </Section>

        <Section
          eyebrow="03 · Sizes and aspect"
          title="Width and frame"
          description="No size modifier classes: constrain"
          panel="wash-panel-rose"
        >
          <div className="flex flex-wrap items-start gap-6">
            <ShowcaseTabs
            preview={
              <>

              <figure className="hover-gallery max-w-40 cursor-pointer">
                              {basicPlates.map((plate) => (
                                <img
                                  key={`sm-${plate.label}-${plate.stage}`}
                                  src={washSrc(plate.tone, plate.label, 320, 240, plate.stage)}
                                  alt={`${plate.label} small`}
                                  width={320}
                                  height={240}
                                />
                              ))}
                            </figure>
            
              </>
            }
          
            html={sizeSmHtml}
            jsx={daisyToJsx(sizeSmHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <figure className="hover-gallery max-w-60 cursor-pointer">
                              {basicPlates.map((plate) => (
                                <img
                                  key={`md-${plate.label}-${plate.stage}`}
                                  src={washSrc(plate.tone, plate.label, 480, 360, plate.stage)}
                                  alt={`${plate.label} medium`}
                                  width={480}
                                  height={360}
                                />
                              ))}
                            </figure>
            
              </>
            }
          
            html={sizeMdHtml}
            jsx={daisyToJsx(sizeMdHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <figure className="hover-gallery max-w-xs cursor-pointer">
                              {basicPlates.map((plate) => (
                                <img
                                  key={`lg-${plate.label}-${plate.stage}`}
                                  src={washSrc(plate.tone, plate.label, 480, 360, plate.stage)}
                                  alt={`${plate.label} large`}
                                  width={480}
                                  height={360}
                                />
                              ))}
                            </figure>
            
              </>
            }
          
            html={sizeLgHtml}
            jsx={daisyToJsx(sizeLgHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <figure className="hover-gallery max-w-sm cursor-pointer">
                              {['blue', 'ochre', 'rose', 'sage'].map((tone) => (
                                <img
                                  key={`sq-${tone}`}
                                  src={washSrc(
                                    tone as WashTone,
                                    toneFills[tone as WashTone].label,
                                    400,
                                    400,
                                    'wet',
                                  )}
                                  alt={`${toneFills[tone as WashTone].label} square plate`}
                                  width={400}
                                  height={400}
                                />
                              ))}
                            </figure>
            
              </>
            }
          
            html={sizeSqHtml}
            jsx={daisyToJsx(sizeSqHtml)}
          />
          </div>
        </Section>

        <Section
          eyebrow="04 · Studio set"
          title="Menzies Design pigment preview"
          description="Official card + hover-gallery pattern, themed"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ShowcaseTabs
            preview={
              <>

              <div className="card card-sm max-w-60 bg-base-200 shadow-sm">
                              <figure className="hover-gallery cursor-pointer">
                                {studioPreview.map((plate) => (
                                  <img
                                    key={`studio-${plate.label}`}
                                    src={washSrc(plate.tone, plate.label, 480, 360, plate.stage)}
                                    alt={`${plate.label} pigment preview`}
                                    width={480}
                                    height={360}
                                  />
                                ))}
                              </figure>
                              <div className="card-body">
                                <h2 className="card-title flex justify-between font-display text-base">
                                  Coastal fog set
                                  <span className="font-normal text-sm text-ink-muted">
                                    5 plates
                                  </span>
                                </h2>
                                <p className="text-sm text-ink-muted">
                                  Hover across the strip to preview each pigment wash.
                                </p>
                              </div>
                            </div>
            
              </>
            }
          
            html={studioCardHtml}
            jsx={daisyToJsx(studioCardHtml)}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="card card-sm max-w-60 bg-base-100 shadow-sm">
                              <figure className="hover-gallery cursor-pointer">
                                {(
                                  [
                                    ['ochre', 'Warm I', 'wet'],
                                    ['ochre', 'Warm II', 'dry'],
                                    ['rose', 'Bloom', 'wet'],
                                    ['ink', 'Line', 'dry'],
                                  ] as const
                                ).map(([tone, label, stage]) => (
                                  <img
                                    key={`ochre-${label}`}
                                    src={washSrc(tone, label, 480, 360, stage)}
                                    alt={`${label} ochre series plate`}
                                    width={480}
                                    height={360}
                                  />
                                ))}
                              </figure>
                              <div className="card-body">
                                <h2 className="card-title flex justify-between font-display text-base">
                                  Warm paper set
                                  <span className="font-normal text-sm text-ink-muted">
                                    4 plates
                                  </span>
                                </h2>
                                <p className="text-sm text-ink-muted">
                                  Ochre and rose washes for dry-brush studies.
                                </p>
                              </div>
                            </div>
            
              </>
            }
          
            html={warmCardHtml}
            jsx={daisyToJsx(warmCardHtml)}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="hover-gallery max-w-60 cursor-pointer">
                              {coastalSeries.slice(0, 4).map((plate) => (
                                <img
                                  key={`div-${plate.label}`}
                                  src={washSrc(plate.tone, plate.label, 480, 360, plate.stage)}
                                  alt={`${plate.label} as div gallery`}
                                  width={480}
                                  height={360}
                                />
                              ))}
                            </div>
                            <p className="mt-2 text-xs text-ink-muted">
                              Same component on a <span className="font-mono">div</span> instead
                              of <span className="font-mono">figure</span>.
                            </p>
            
              </>
            }
          
            html={divGallerySnippetHtml}
            jsx={daisyToJsx(divGallerySnippetHtml)}
          />
          </div>
        </Section>

        <Section
          eyebrow="05 · Responsive"
          title="Fluid studio grid"
          description="Galleries wrap on small screens"
          panel="wash-panel-blue"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {(
              [
                { name: 'Blue', tones: ['blue', 'blue', 'sage', 'ink'] as const },
                { name: 'Ochre', tones: ['ochre', 'ochre', 'rose', 'ink'] as const },
                { name: 'Rose', tones: ['rose', 'violet', 'rose', 'ink'] as const },
                { name: 'Sage', tones: ['sage', 'blue', 'sage', 'ochre'] as const },
              ] as const
            ).map((set, setIndex) => (
              <ShowcaseTabs
            preview={
              <>

              <figure className="hover-gallery w-full max-w-full cursor-pointer sm:max-w-60">
                                {set.tones.map((tone, i) => (
                                  <img
                                    key={`${set.name}-${tone}-${i}`}
                                    src={washSrc(
                                      tone,
                                      toneFills[tone].label,
                                      480,
                                      360,
                                      i % 2 === 0 ? 'wet' : 'dry',
                                    )}
                                    alt={`${set.name} set plate ${i + 1}`}
                                    width={480}
                                    height={360}
                                    className="w-full"
                                  />
                                ))}
                              </figure>
            
              </>
            }
          
            html={responsiveHtmls[setIndex]}
            jsx={daisyToJsx(responsiveHtmls[setIndex])}
          />
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
