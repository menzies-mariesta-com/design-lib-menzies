import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { Droplets, Mail, MapPin } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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

function FooterLink({ children }: { children: ReactNode }) {
  return (
    <a href="#footer-demo" className="link link-hover cursor-pointer" onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  )
}

const year = new Date().getFullYear()

const colorFooters = [
  {
    label: 'bg-base-200 text-base-content',
    className: 'footer sm:footer-horizontal bg-base-200 text-base-content p-6',
  },
  {
    label: 'bg-neutral text-neutral-content',
    className: 'footer sm:footer-horizontal bg-neutral text-neutral-content p-6',
  },
  {
    label: 'bg-primary text-primary-content',
    className: 'footer sm:footer-horizontal bg-primary text-primary-content p-6',
  },
  {
    label: 'bg-secondary text-secondary-content',
    className: 'footer sm:footer-horizontal bg-secondary text-secondary-content p-6',
  },
  {
    label: 'bg-accent text-accent-content',
    className: 'footer sm:footer-horizontal bg-accent text-accent-content p-6',
  },
] as const

export default function FooterPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Footer
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">footer</span> blocks for
          studio pages: titles, nav columns, colors, brand, and copyright rows.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Title and nav links"
          description="Default footer is vertical. Add sm:footer-horizontal so columns sit side by side from small screens up."
        >
          <ShowcaseTabs
            preview={
              <>

              <footer className="footer sm:footer-horizontal rounded-box bg-base-200 p-6 text-base-content">
                            <nav>
                              <h6 className="footer-title">Services</h6>
                              <FooterLink>Wet washes</FooterLink>
                              <FooterLink>Dry brush</FooterLink>
                              <FooterLink>Glazing</FooterLink>
                              <FooterLink>Commission</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Studio</h6>
                              <FooterLink>About</FooterLink>
                              <FooterLink>Contact</FooterLink>
                              <FooterLink>Workshops</FooterLink>
                              <FooterLink>Press kit</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Legal</h6>
                              <FooterLink>Terms of use</FooterLink>
                              <FooterLink>Privacy policy</FooterLink>
                              <FooterLink>Cookie policy</FooterLink>
                            </nav>
                          </footer>
            
              </>
            }
            html={`<footer class="footer sm:footer-horizontal rounded-box bg-base-200 p-6 text-base-content">
              <nav>
                <h6 class="footer-title">Services</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Studio</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Legal</h6>
                <!-- FooterLink -->
              </nav>
            </footer>`}
            jsx={`<footer className="footer sm:footer-horizontal rounded-box bg-base-200 p-6 text-base-content">
              <nav>
                <h6 className="footer-title">Services</h6>
                <FooterLink>Wet washes</FooterLink>
                <FooterLink>Dry brush</FooterLink>
                <FooterLink>Glazing</FooterLink>
                <FooterLink>Commission</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Studio</h6>
                <FooterLink>About</FooterLink>
                <FooterLink>Contact</FooterLink>
                <FooterLink>Workshops</FooterLink>
                <FooterLink>Press kit</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Legal</h6>
                <FooterLink>Terms of use</FooterLink>
                <FooterLink>Privacy policy</FooterLink>
                <FooterLink>Cookie policy</FooterLink>
              </nav>
            </footer>`}
          />
        </Section>

        <Section
          eyebrow="02 · Centered"
          title="footer-center placement"
          description="footer-center aligns columns and links to the middle of the bar."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <footer className="footer footer-horizontal footer-center rounded-box bg-base-200 p-8 text-base-content">
                            <nav>
                              <h6 className="footer-title">Explore</h6>
                              <div className="grid grid-flow-col gap-4">
                                <FooterLink>Plates</FooterLink>
                                <FooterLink>Series</FooterLink>
                                <FooterLink>Pigments</FooterLink>
                              </div>
                            </nav>
                          </footer>
            
              </>
            }
            html={`<footer class="footer footer-horizontal footer-center rounded-box bg-base-200 p-8 text-base-content">
              <nav>
                <h6 class="footer-title">Explore</h6>
                <div class="grid grid-flow-col gap-4">
                  <!-- FooterLink -->
                </div>
              </nav>
            </footer>`}
            jsx={`<footer className="footer footer-horizontal footer-center rounded-box bg-base-200 p-8 text-base-content">
              <nav>
                <h6 className="footer-title">Explore</h6>
                <div className="grid grid-flow-col gap-4">
                  <FooterLink>Plates</FooterLink>
                  <FooterLink>Series</FooterLink>
                  <FooterLink>Pigments</FooterLink>
                </div>
              </nav>
            </footer>`}
          />
          <ShowcaseTabs
            preview={
              <>

              <footer className="footer footer-horizontal footer-center rounded-box bg-primary p-8 text-primary-content">
                            <aside>
                              <Droplets className="size-10" strokeWidth={1.75} aria-hidden />
                              <p className="font-display text-lg font-semibold">Menzies Design</p>
                              <p className="text-sm opacity-90">Watercolor studio desk</p>
                            </aside>
                            <nav>
                              <div className="grid grid-flow-col gap-4">
                                <FooterLink>About</FooterLink>
                                <FooterLink>Contact</FooterLink>
                                <FooterLink>Workshops</FooterLink>
                              </div>
                            </nav>
                          </footer>
            
              </>
            }
            html={`<footer class="footer footer-horizontal footer-center rounded-box bg-primary p-8 text-primary-content">
              <aside>
                <!-- Droplets -->
                <p class="font-display text-lg font-semibold">Menzies Design</p>
                <p class="text-sm opacity-90">Watercolor studio desk</p>
              </aside>
              <nav>
                <div class="grid grid-flow-col gap-4">
                  <!-- FooterLink -->
                </div>
              </nav>
            </footer>`}
            jsx={`<footer className="footer footer-horizontal footer-center rounded-box bg-primary p-8 text-primary-content">
              <aside>
                <Droplets className="size-10" strokeWidth={1.75} aria-hidden />
                <p className="font-display text-lg font-semibold">Menzies Design</p>
                <p className="text-sm opacity-90">Watercolor studio desk</p>
              </aside>
              <nav>
                <div className="grid grid-flow-col gap-4">
                  <FooterLink>About</FooterLink>
                  <FooterLink>Contact</FooterLink>
                  <FooterLink>Workshops</FooterLink>
                </div>
              </nav>
            </footer>`}
          />
        </Section>

        <Section
          eyebrow="03 · Multi-column"
          title="Several nav title groups"
          description="Stack many footer-title columns. Use grid-rows-2 when the set wraps onto a second row."
        >
          <ShowcaseTabs
            preview={
              <>

              <footer className="footer sm:footer-horizontal grid-rows-2 rounded-box bg-neutral p-6 text-neutral-content">
                            <nav>
                              <h6 className="footer-title">Services</h6>
                              <FooterLink>Branding</FooterLink>
                              <FooterLink>Design</FooterLink>
                              <FooterLink>Marketing</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Studio</h6>
                              <FooterLink>About us</FooterLink>
                              <FooterLink>Contact</FooterLink>
                              <FooterLink>Jobs</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Legal</h6>
                              <FooterLink>Terms</FooterLink>
                              <FooterLink>Privacy</FooterLink>
                              <FooterLink>Cookies</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Visit</h6>
                              <FooterLink>Hours</FooterLink>
                              <FooterLink>Map</FooterLink>
                              <FooterLink>Parking</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Learn</h6>
                              <FooterLink>Guides</FooterLink>
                              <FooterLink>Recipes</FooterLink>
                              <FooterLink>Archive</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Shop</h6>
                              <FooterLink>Prints</FooterLink>
                              <FooterLink>Sets</FooterLink>
                              <FooterLink>Gift cards</FooterLink>
                            </nav>
                          </footer>
            
              </>
            }
            html={`<footer class="footer sm:footer-horizontal grid-rows-2 rounded-box bg-neutral p-6 text-neutral-content">
              <nav>
                <h6 class="footer-title">Services</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Studio</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Legal</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Visit</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Learn</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Shop</h6>
                <!-- FooterLink -->
              </nav>
            </footer>`}
            jsx={`<footer className="footer sm:footer-horizontal grid-rows-2 rounded-box bg-neutral p-6 text-neutral-content">
              <nav>
                <h6 className="footer-title">Services</h6>
                <FooterLink>Branding</FooterLink>
                <FooterLink>Design</FooterLink>
                <FooterLink>Marketing</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Studio</h6>
                <FooterLink>About us</FooterLink>
                <FooterLink>Contact</FooterLink>
                <FooterLink>Jobs</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Legal</h6>
                <FooterLink>Terms</FooterLink>
                <FooterLink>Privacy</FooterLink>
                <FooterLink>Cookies</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Visit</h6>
                <FooterLink>Hours</FooterLink>
                <FooterLink>Map</FooterLink>
                <FooterLink>Parking</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Learn</h6>
                <FooterLink>Guides</FooterLink>
                <FooterLink>Recipes</FooterLink>
                <FooterLink>Archive</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Shop</h6>
                <FooterLink>Prints</FooterLink>
                <FooterLink>Sets</FooterLink>
                <FooterLink>Gift cards</FooterLink>
              </nav>
            </footer>`}
          />
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic background colors"
          description="Footer has no color modifier classes. Tint with Tailwind semantic pairs such as bg-neutral text-neutral-content."
          panel="wash-panel-rose"
        >
          <div className="space-y-4">
            {colorFooters.map((item) => (
              <ShowcaseTabs
            preview={
              <>

              <footer className={`${item.className} rounded-box`}>
                                <nav>
                                  <h6 className="footer-title">Services</h6>
                                  <FooterLink>Wet washes</FooterLink>
                                  <FooterLink>Dry brush</FooterLink>
                                </nav>
                                <nav>
                                  <h6 className="footer-title">Studio</h6>
                                  <FooterLink>About</FooterLink>
                                  <FooterLink>Contact</FooterLink>
                                </nav>
                              </footer>
            
              </>
            }
            html={`<footer class=>
                  <nav>
                    <h6 class="footer-title">Services</h6>
                    <!-- FooterLink -->
                  </nav>
                  <nav>
                    <h6 class="footer-title">Studio</h6>
                    <!-- FooterLink -->
                  </nav>
                </footer>`}
            jsx={`<footer className={\`\${item.className} rounded-box\`}>
                  <nav>
                    <h6 className="footer-title">Services</h6>
                    <FooterLink>Wet washes</FooterLink>
                    <FooterLink>Dry brush</FooterLink>
                  </nav>
                  <nav>
                    <h6 className="footer-title">Studio</h6>
                    <FooterLink>About</FooterLink>
                    <FooterLink>Contact</FooterLink>
                  </nav>
                </footer>`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Brand"
          title="Menzies Design studio with logo"
          description="aside holds the mark and blurb; nav columns list studio destinations."
        >
          <ShowcaseTabs
            preview={
              <>

              <footer className="footer sm:footer-horizontal rounded-box bg-base-200 p-8 text-base-content">
                            <aside>
                              <div className="flex size-12 items-center justify-center rounded-box bg-wash-blue/50">
                                <Droplets className="size-7 text-base-content" strokeWidth={1.75} aria-hidden />
                              </div>
                              <p className="mt-2 font-display text-lg font-semibold">Menzies Design</p>
                              <p className="max-w-xs text-sm text-ink-muted">
                                Watercolor studio for plates, washes, and pigment notes since 2014.
                              </p>
                            </aside>
                            <nav>
                              <h6 className="footer-title">Services</h6>
                              <FooterLink>Commissions</FooterLink>
                              <FooterLink>Workshops</FooterLink>
                              <FooterLink>Restorations</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Studio</h6>
                              <FooterLink>About</FooterLink>
                              <FooterLink>Visit</FooterLink>
                              <FooterLink>Press kit</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Legal</h6>
                              <FooterLink>Terms of use</FooterLink>
                              <FooterLink>Privacy policy</FooterLink>
                            </nav>
                          </footer>
            
              </>
            }
            html={`<footer class="footer sm:footer-horizontal rounded-box bg-base-200 p-8 text-base-content">
              <aside>
                <div class="flex size-12 items-center justify-center rounded-box bg-wash-blue/50">
                  <!-- Droplets -->
                </div>
                <p class="mt-2 font-display text-lg font-semibold">Menzies Design</p>
                <p class="max-w-xs text-sm text-ink-muted">
                  Watercolor studio for plates, washes, and pigment notes since 2014.
                </p>
              </aside>
              <nav>
                <h6 class="footer-title">Services</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Studio</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Legal</h6>
                <!-- FooterLink -->
              </nav>
            </footer>`}
            jsx={`<footer className="footer sm:footer-horizontal rounded-box bg-base-200 p-8 text-base-content">
              <aside>
                <div className="flex size-12 items-center justify-center rounded-box bg-wash-blue/50">
                  <Droplets className="size-7 text-base-content" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="mt-2 font-display text-lg font-semibold">Menzies Design</p>
                <p className="max-w-xs text-sm text-ink-muted">
                  Watercolor studio for plates, washes, and pigment notes since 2014.
                </p>
              </aside>
              <nav>
                <h6 className="footer-title">Services</h6>
                <FooterLink>Commissions</FooterLink>
                <FooterLink>Workshops</FooterLink>
                <FooterLink>Restorations</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Studio</h6>
                <FooterLink>About</FooterLink>
                <FooterLink>Visit</FooterLink>
                <FooterLink>Press kit</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Legal</h6>
                <FooterLink>Terms of use</FooterLink>
                <FooterLink>Privacy policy</FooterLink>
              </nav>
            </footer>`}
          />
        </Section>

        <Section
          eyebrow="06 · Copyright"
          title="Legal and form row"
          description="Compact copyright bars, optional contact icons, and a newsletter form column."
        >
          <ShowcaseTabs
            preview={
              <>

              <footer className="footer footer-center rounded-box bg-base-300 p-4 text-base-content">
                            <aside>
                              <p className="text-sm">
                                Copyright © {year}. All rights reserved by Menzies Design.
                              </p>
                            </aside>
                          </footer>
            
              </>
            }
            html={`<footer class="footer footer-center rounded-box bg-base-300 p-4 text-base-content">
              <aside>
                <p class="text-sm">
                  Copyright © . All rights reserved by Menzies Design.
                </p>
              </aside>
            </footer>`}
            jsx={`<footer className="footer footer-center rounded-box bg-base-300 p-4 text-base-content">
              <aside>
                <p className="text-sm">
                  Copyright © {year}. All rights reserved by Menzies Design.
                </p>
              </aside>
            </footer>`}
          />

          <ShowcaseTabs
            preview={
              <>

              <footer className="footer sm:footer-horizontal items-center rounded-box bg-neutral p-4 text-neutral-content">
                            <aside className="grid-flow-col items-center gap-2">
                              <Droplets className="size-8" strokeWidth={1.75} aria-hidden />
                              <p className="text-sm">Copyright © {year}. All rights reserved.</p>
                            </aside>
                            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                              <a
                                href="#footer-demo"
                                className="cursor-pointer"
                                aria-label="Studio email"
                                onClick={(e) => e.preventDefault()}
                              >
                                <Mail className="size-5" strokeWidth={2} />
                              </a>
                              <a
                                href="#footer-demo"
                                className="cursor-pointer"
                                aria-label="Studio location"
                                onClick={(e) => e.preventDefault()}
                              >
                                <MapPin className="size-5" strokeWidth={2} />
                              </a>
                            </nav>
                          </footer>
            
              </>
            }
            html={`<footer class="footer sm:footer-horizontal items-center rounded-box bg-neutral p-4 text-neutral-content">
              <aside class="grid-flow-col items-center gap-2">
                <!-- Droplets -->
                <p class="text-sm">Copyright © . All rights reserved.</p>
              </aside>
              <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a
                  href="#footer-demo"
                  class="cursor-pointer"
                  aria-label="Studio email"
                  
                >
                  <!-- Mail -->
                </a>
                <a
                  href="#footer-demo"
                  class="cursor-pointer"
                  aria-label="Studio location"
                  
                >
                  <!-- MapPin -->
                </a>
              </nav>
            </footer>`}
            jsx={`<footer className="footer sm:footer-horizontal items-center rounded-box bg-neutral p-4 text-neutral-content">
              <aside className="grid-flow-col items-center gap-2">
                <Droplets className="size-8" strokeWidth={1.75} aria-hidden />
                <p className="text-sm">Copyright © {year}. All rights reserved.</p>
              </aside>
              <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a
                  href="#footer-demo"
                  className="cursor-pointer"
                  aria-label="Studio email"
                  onClick={(e) => e.preventDefault()}
                >
                  <Mail className="size-5" strokeWidth={2} />
                </a>
                <a
                  href="#footer-demo"
                  className="cursor-pointer"
                  aria-label="Studio location"
                  onClick={(e) => e.preventDefault()}
                >
                  <MapPin className="size-5" strokeWidth={2} />
                </a>
              </nav>
            </footer>`}
          />

          <ShowcaseTabs
            preview={
              <>

              <footer className="footer sm:footer-horizontal rounded-box bg-base-200 p-6 text-base-content">
                            <nav>
                              <h6 className="footer-title">Studio</h6>
                              <FooterLink>About</FooterLink>
                              <FooterLink>Contact</FooterLink>
                              <FooterLink>Workshops</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Legal</h6>
                              <FooterLink>Terms</FooterLink>
                              <FooterLink>Privacy</FooterLink>
                            </nav>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault()
                              }}
                            >
                              <h6 className="footer-title">Newsletter</h6>
                              <fieldset className="w-full max-w-80">
                                <label className="label" htmlFor="footer-newsletter">
                                  <span className="label-text">Studio email</span>
                                </label>
                                <div className="join w-full">
                                  <input
                                    id="footer-newsletter"
                                    type="email"
                                    placeholder="you@studio.example"
                                    className="input join-item w-full cursor-text"
                                  />
                                  <button type="submit" className="btn btn-primary join-item cursor-pointer">
                                    Subscribe
                                  </button>
                                </div>
                              </fieldset>
                            </form>
                          </footer>
            
              </>
            }
            html={`<footer class="footer sm:footer-horizontal rounded-box bg-base-200 p-6 text-base-content">
              <nav>
                <h6 class="footer-title">Studio</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Legal</h6>
                <!-- FooterLink -->
              </nav>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <h6 class="footer-title">Newsletter</h6>
                <fieldset class="w-full max-w-80">
                  <label class="label" for="footer-newsletter">
                    <span class="label-text">Studio email</span>
                  </label>
                  <div class="join w-full">
                    <input
                      id="footer-newsletter"
                      type="email"
                      placeholder="you@studio.example"
                      class="input join-item w-full cursor-text" />
                    <button type="submit" class="btn btn-primary join-item cursor-pointer">
                      Subscribe
                    </button>
                  </div>
                </fieldset>
              </form>
            </footer>`}
            jsx={`<footer className="footer sm:footer-horizontal rounded-box bg-base-200 p-6 text-base-content">
              <nav>
                <h6 className="footer-title">Studio</h6>
                <FooterLink>About</FooterLink>
                <FooterLink>Contact</FooterLink>
                <FooterLink>Workshops</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Legal</h6>
                <FooterLink>Terms</FooterLink>
                <FooterLink>Privacy</FooterLink>
              </nav>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <h6 className="footer-title">Newsletter</h6>
                <fieldset className="w-full max-w-80">
                  <label className="label" htmlFor="footer-newsletter">
                    <span className="label-text">Studio email</span>
                  </label>
                  <div className="join w-full">
                    <input
                      id="footer-newsletter"
                      type="email"
                      placeholder="you@studio.example"
                      className="input join-item w-full cursor-text"
                    />
                    <button type="submit" className="btn btn-primary join-item cursor-pointer">
                      Subscribe
                    </button>
                  </div>
                </fieldset>
              </form>
            </footer>`}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Stack on mobile, row on larger screens"
          description="footer-vertical is the default. Prefer sm:footer-horizontal so columns stack on phones and align in a row from small breakpoints up."
        >
          <ShowcaseTabs
            preview={
              <>

              <footer className="footer sm:footer-horizontal rounded-box border border-ink-border/60 bg-base-100 p-6 text-base-content">
                            <aside className="max-w-xs">
                              <p className="font-display text-lg font-semibold">Menzies Design</p>
                              <p className="mt-1 text-sm text-ink-muted">
                                Resize the viewport: columns stack below <span className="font-mono text-xs">sm</span>,
                                then sit in a horizontal row.
                              </p>
                            </aside>
                            <nav>
                              <h6 className="footer-title">Plates</h6>
                              <FooterLink>Morning wash</FooterLink>
                              <FooterLink>Midday glaze</FooterLink>
                              <FooterLink>Evening ink</FooterLink>
                            </nav>
                            <nav>
                              <h6 className="footer-title">Pigments</h6>
                              <FooterLink>Cerulean</FooterLink>
                              <FooterLink>Ochre</FooterLink>
                              <FooterLink>Rose madder</FooterLink>
                            </nav>
                          </footer>
            
              </>
            }
            html={`<footer class="footer sm:footer-horizontal rounded-box border border-ink-border/60 bg-base-100 p-6 text-base-content">
              <aside class="max-w-xs">
                <p class="font-display text-lg font-semibold">Menzies Design</p>
                <p class="mt-1 text-sm text-ink-muted">
                  Resize the viewport: columns stack below <span class="font-mono text-xs">sm</span>,
                  then sit in a horizontal row.
                </p>
              </aside>
              <nav>
                <h6 class="footer-title">Plates</h6>
                <!-- FooterLink -->
              </nav>
              <nav>
                <h6 class="footer-title">Pigments</h6>
                <!-- FooterLink -->
              </nav>
            </footer>`}
            jsx={`<footer className="footer sm:footer-horizontal rounded-box border border-ink-border/60 bg-base-100 p-6 text-base-content">
              <aside className="max-w-xs">
                <p className="font-display text-lg font-semibold">Menzies Design</p>
                <p className="mt-1 text-sm text-ink-muted">
                  Resize the viewport: columns stack below <span className="font-mono text-xs">sm</span>,
                  then sit in a horizontal row.
                </p>
              </aside>
              <nav>
                <h6 className="footer-title">Plates</h6>
                <FooterLink>Morning wash</FooterLink>
                <FooterLink>Midday glaze</FooterLink>
                <FooterLink>Evening ink</FooterLink>
              </nav>
              <nav>
                <h6 className="footer-title">Pigments</h6>
                <FooterLink>Cerulean</FooterLink>
                <FooterLink>Ochre</FooterLink>
                <FooterLink>Rose madder</FooterLink>
              </nav>
            </footer>`}
          />
          <div className="mt-4 rounded-box border border-ink-border/60 bg-base-100/50 p-5">
            <p className="font-display text-lg font-semibold">Breakpoint behavior</p>
            <p className="mt-2 text-sm text-ink-muted">
              Below <span className="font-mono text-xs">sm</span>, the footer stays vertical
              (<span className="font-mono text-xs"> (footer-vertical)</span>. From small screens
              upward, <span className="font-mono text-xs">sm:footer-horizontal</span> places
              columns side by side without forcing a sticky page footer.
            </p>
          </div>
        </Section>
      </div>
    </>
  )
}
