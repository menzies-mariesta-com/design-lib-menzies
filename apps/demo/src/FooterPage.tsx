import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
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

function FooterLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="#footer-demo"
      className="link link-hover cursor-pointer"
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  )
}

const year = new Date().getFullYear()

const link = (label: string) =>
  `<a href="#footer-demo" class="link link-hover cursor-pointer">${label}</a>`

const svgDroplets = (cls: string, sw = '1.75') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.56 5.12z"/></svg>`

const svgMail =
  '<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/></svg>'

const svgMapPin =
  '<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>'

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

const basicHtml = `<footer class="footer sm:footer-horizontal rounded-box bg-base-200 p-6 text-base-content">
  <nav>
    <h6 class="footer-title">Services</h6>
    ${link('Wet washes')}
    ${link('Dry brush')}
    ${link('Glazing')}
    ${link('Commission')}
  </nav>
  <nav>
    <h6 class="footer-title">Studio</h6>
    ${link('About')}
    ${link('Contact')}
    ${link('Workshops')}
    ${link('Press kit')}
  </nav>
  <nav>
    <h6 class="footer-title">Legal</h6>
    ${link('Terms of use')}
    ${link('Privacy policy')}
    ${link('Cookie policy')}
  </nav>
</footer>`

const centeredHtml = `<footer class="footer footer-horizontal footer-center rounded-box bg-base-200 p-8 text-base-content">
  <nav>
    <h6 class="footer-title">Explore</h6>
    <div class="grid grid-flow-col gap-4">
      ${link('Plates')}
      ${link('Series')}
      ${link('Pigments')}
    </div>
  </nav>
</footer>`

const centeredBrandHtml = `<footer class="footer footer-horizontal footer-center rounded-box bg-primary p-8 text-primary-content">
  <aside>
    ${svgDroplets('size-10')}
    <p class="font-display text-lg font-semibold">Menzies Design</p>
    <p class="text-sm opacity-90">Watercolor studio desk</p>
  </aside>
  <nav>
    <div class="grid grid-flow-col gap-4">
      ${link('About')}
      ${link('Contact')}
      ${link('Workshops')}
    </div>
  </nav>
</footer>`

const multiColumnHtml = `<footer class="footer sm:footer-horizontal grid-rows-2 rounded-box bg-neutral p-6 text-neutral-content">
  <nav>
    <h6 class="footer-title">Services</h6>
    ${link('Branding')}
    ${link('Design')}
    ${link('Marketing')}
  </nav>
  <nav>
    <h6 class="footer-title">Studio</h6>
    ${link('About us')}
    ${link('Contact')}
    ${link('Jobs')}
  </nav>
  <nav>
    <h6 class="footer-title">Legal</h6>
    ${link('Terms')}
    ${link('Privacy')}
    ${link('Cookies')}
  </nav>
  <nav>
    <h6 class="footer-title">Visit</h6>
    ${link('Hours')}
    ${link('Map')}
    ${link('Parking')}
  </nav>
  <nav>
    <h6 class="footer-title">Learn</h6>
    ${link('Guides')}
    ${link('Recipes')}
    ${link('Archive')}
  </nav>
  <nav>
    <h6 class="footer-title">Shop</h6>
    ${link('Prints')}
    ${link('Sets')}
    ${link('Gift cards')}
  </nav>
</footer>`

function colorFooterHtml(className: string): string {
  return `<footer class="${className} rounded-box">
  <nav>
    <h6 class="footer-title">Services</h6>
    ${link('Wet washes')}
    ${link('Dry brush')}
  </nav>
  <nav>
    <h6 class="footer-title">Studio</h6>
    ${link('About')}
    ${link('Contact')}
  </nav>
</footer>`
}

const brandHtml = `<footer class="footer sm:footer-horizontal rounded-box bg-base-200 p-8 text-base-content">
  <aside>
    <div class="flex size-12 items-center justify-center rounded-box bg-wash-blue/50">
      ${svgDroplets('size-7 text-base-content')}
    </div>
    <p class="mt-2 font-display text-lg font-semibold">Menzies Design</p>
    <p class="max-w-xs text-sm text-ink-muted">
      Watercolor studio for plates, washes, and pigment notes since 2014.
    </p>
  </aside>
  <nav>
    <h6 class="footer-title">Services</h6>
    ${link('Commissions')}
    ${link('Workshops')}
    ${link('Restorations')}
  </nav>
  <nav>
    <h6 class="footer-title">Studio</h6>
    ${link('About')}
    ${link('Visit')}
    ${link('Press kit')}
  </nav>
  <nav>
    <h6 class="footer-title">Legal</h6>
    ${link('Terms of use')}
    ${link('Privacy policy')}
  </nav>
</footer>`

const copyrightHtml = `<footer class="footer footer-center rounded-box bg-base-300 p-4 text-base-content">
  <aside>
    <p class="text-sm">Copyright © ${year}. All rights reserved by Menzies Design.</p>
  </aside>
</footer>`

const copyrightIconsHtml = `<footer class="footer sm:footer-horizontal items-center rounded-box bg-neutral p-4 text-neutral-content">
  <aside class="grid-flow-col items-center gap-2">
    ${svgDroplets('size-8')}
    <p class="text-sm">Copyright © ${year}. All rights reserved.</p>
  </aside>
  <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a href="#footer-demo" class="cursor-pointer" aria-label="Studio email">${svgMail}</a>
    <a href="#footer-demo" class="cursor-pointer" aria-label="Studio location">${svgMapPin}</a>
  </nav>
</footer>`

const newsletterHtml = `<footer class="footer sm:footer-horizontal rounded-box bg-base-200 p-6 text-base-content">
  <nav>
    <h6 class="footer-title">Studio</h6>
    ${link('About')}
    ${link('Contact')}
    ${link('Workshops')}
  </nav>
  <nav>
    <h6 class="footer-title">Legal</h6>
    ${link('Terms')}
    ${link('Privacy')}
  </nav>
  <form>
    <h6 class="footer-title">Newsletter</h6>
    <fieldset class="w-full max-w-80">
      <label class="label" for="footer-newsletter">
        <span class="label-text">Studio email</span>
      </label>
      <div class="join w-full">
        <input id="footer-newsletter" type="email" placeholder="you@studio.example" class="input join-item w-full cursor-text" />
        <button type="submit" class="btn btn-primary join-item cursor-pointer">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>`

const responsiveHtml = `<footer class="footer sm:footer-horizontal rounded-box border border-ink-border/60 bg-base-100 p-6 text-base-content">
  <aside class="max-w-xs">
    <p class="font-display text-lg font-semibold">Menzies Design</p>
    <p class="mt-1 text-sm text-ink-muted">
      Resize the viewport: columns stack below <span class="font-mono text-xs">sm</span>,
      then sit in a horizontal row.
    </p>
  </aside>
  <nav>
    <h6 class="footer-title">Plates</h6>
    ${link('Morning wash')}
    ${link('Midday glaze')}
    ${link('Evening ink')}
  </nav>
  <nav>
    <h6 class="footer-title">Pigments</h6>
    ${link('Cerulean')}
    ${link('Ochre')}
    ${link('Rose madder')}
  </nav>
</footer>`

export default function FooterPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Footer
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">footer</span> blocks for studio pages:
          titles, nav columns, colors, brand, and copyright.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Title and nav links"
          description="Default footer is vertical"
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
            html={basicHtml}
            jsx={daisyToJsx(basicHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · Centered"
          title="footer-center placement"
          description="footer-center aligns columns and links to the middle of the bar"
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
            html={centeredHtml}
            jsx={daisyToJsx(centeredHtml)}
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
            html={centeredBrandHtml}
            jsx={daisyToJsx(centeredBrandHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Multi-column"
          title="Several nav title groups"
          description="Stack many footer-title columns"
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
            html={multiColumnHtml}
            jsx={daisyToJsx(multiColumnHtml)}
          />
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic background colors"
          description="Footer has no color modifier classes"
          panel="wash-panel-rose"
        >
          <div className="space-y-4">
            {colorFooters.map((item) => {
              const html = colorFooterHtml(item.className)
              return (
                <ShowcaseTabs
                  key={item.label}
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
                  html={html}
                  jsx={daisyToJsx(html)}
                />
              )
            })}
          </div>
        </Section>

        <Section
          eyebrow="05 · Brand"
          title="Menzies Design studio with logo"
          description="aside holds the mark and blurb"
        >
          <ShowcaseTabs
            preview={
              <>
                <footer className="footer sm:footer-horizontal rounded-box bg-base-200 p-8 text-base-content">
                  <aside>
                    <div className="flex size-12 items-center justify-center rounded-box bg-wash-blue/50">
                      <Droplets
                        className="size-7 text-base-content"
                        strokeWidth={1.75}
                        aria-hidden
                      />
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
            html={brandHtml}
            jsx={daisyToJsx(brandHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Copyright"
          title="Legal and form row"
          description="Compact copyright bars, optional contact icons"
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
            html={copyrightHtml}
            jsx={daisyToJsx(copyrightHtml)}
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
            html={copyrightIconsHtml}
            jsx={daisyToJsx(copyrightIconsHtml)}
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
                        <button
                          type="submit"
                          className="btn btn-primary join-item cursor-pointer"
                        >
                          Subscribe
                        </button>
                      </div>
                    </fieldset>
                  </form>
                </footer>
              </>
            }
            html={newsletterHtml}
            jsx={daisyToJsx(newsletterHtml)}
          />
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Stack on mobile, row on larger screens"
          description="footer-vertical is the default"
        >
          <ShowcaseTabs
            preview={
              <>
                <footer className="footer sm:footer-horizontal rounded-box border border-ink-border/60 bg-base-100 p-6 text-base-content">
                  <aside className="max-w-xs">
                    <p className="font-display text-lg font-semibold">Menzies Design</p>
                    <p className="mt-1 text-sm text-ink-muted">
                      Resize the viewport: columns stack below{' '}
                      <span className="font-mono text-xs">sm</span>, then sit in a horizontal
                      row.
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
            html={responsiveHtml}
            jsx={daisyToJsx(responsiveHtml)}
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
