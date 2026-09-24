import {
  Lock,
  ShieldCheck,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

function RequiredMark() {
  return (
    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
      *
    </span>
  )
}

const requiredMark =
  '<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>'

const svgLock =
  '<svg class="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
const svgShieldCheck =
  '<svg class="size-3.5 shrink-0 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>'

function toJsx(html: string): string {
  return daisyToJsx(html)
    .replace(/\sfor=/g, ' htmlFor=')
    .replace(/\schecked(?:=["']checked["'])?/g, ' defaultChecked')
    .replace(/\svalue=/g, ' defaultValue=')
    .replace(/\sautocomplete=/g, ' autoComplete=')
    .replace(/\sinputmode=/g, ' inputMode=')
    .replace(/stroke-width=/g, 'strokeWidth=')
}

function CardPaymentPreview() {
  return (
    <div className="flex min-h-[28rem] items-center justify-center rounded-box bg-base-200/60 p-4 sm:p-6">
      <form className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-5">
          <div>
            <h2 className="card-title text-primary font-bold">Pay with card</h2>
            <p className="text-sm text-ink-muted">
              UI only. No card data is processed in this demo.
            </p>
          </div>

          <fieldset className="fieldset">
            <label className="label" htmlFor="pay-card-number">
              <span className="label-text">
                Card number
                <RequiredMark />
              </span>
            </label>
            <input
              id="pay-card-number"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              className="input w-full cursor-text font-mono"
              placeholder="4242 4242 4242 4242"
              defaultValue="4242 4242 4242 4242"
              required
            />
          </fieldset>

          <div className="grid grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <label className="label" htmlFor="pay-expiry">
                <span className="label-text">
                  Expiry
                  <RequiredMark />
                </span>
              </label>
              <input
                id="pay-expiry"
                type="text"
                autoComplete="cc-exp"
                className="input w-full cursor-text font-mono"
                placeholder="MM / YY"
                defaultValue="08 / 28"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="pay-cvc">
                <span className="label-text">
                  CVC
                  <RequiredMark />
                </span>
              </label>
              <input
                id="pay-cvc"
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                className="input w-full cursor-text font-mono"
                placeholder="123"
                defaultValue="123"
                required
              />
            </fieldset>
          </div>

          <fieldset className="fieldset">
            <label className="label" htmlFor="pay-name">
              <span className="label-text">
                Name on card
                <RequiredMark />
              </span>
            </label>
            <input
              id="pay-name"
              type="text"
              autoComplete="cc-name"
              className="input w-full cursor-text"
              placeholder="Maya Chen"
              defaultValue="Maya Chen"
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-medium">Billing address</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                id="pay-billing-line"
                type="text"
                className="input w-full cursor-text sm:col-span-2"
                placeholder="Street"
                defaultValue="124 pigment lane"
                aria-label="Billing street"
              />
              <input
                id="pay-billing-city"
                type="text"
                className="input w-full cursor-text"
                placeholder="City"
                defaultValue="Portland"
                aria-label="Billing city"
              />
              <input
                id="pay-billing-postal"
                type="text"
                className="input w-full cursor-text"
                placeholder="Postal code"
                defaultValue="97209"
                aria-label="Billing postal code"
              />
            </div>
          </fieldset>

          <button type="submit" className="btn btn-primary w-full cursor-pointer">
            Pay $264.00
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
            <Lock className="size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
            Payments are encrypted and processed securely
          </p>
        </div>
      </form>
    </div>
  )
}

function SavedCardsPreview() {
  return (
    <div className="rounded-box bg-base-200/40 p-4 sm:p-6">
      <form className="card mx-auto w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <div>
            <h2 className="card-title text-secondary font-bold">Saved cards</h2>
            <p className="text-sm text-ink-muted">Pick a card on file or add a new one.</p>
          </div>

          <ul className="space-y-2">
            <li>
              <label className="flex cursor-pointer items-center gap-3 rounded-box border border-primary bg-primary/5 p-3">
                <input
                  type="radio"
                  name="saved-card"
                  className="radio radio-primary"
                  defaultChecked
                />
                <span className="flex-1 font-mono text-sm">•••• 4242</span>
                <span className="badge badge-ghost">Default</span>
              </label>
            </li>
            <li>
              <label className="flex cursor-pointer items-center gap-3 rounded-box border border-base-300 p-3">
                <input type="radio" name="saved-card" className="radio radio-primary" />
                <span className="flex-1 font-mono text-sm">•••• 1881</span>
                <span className="text-xs text-ink-muted">Exp 03 / 27</span>
              </label>
            </li>
          </ul>

          <button type="button" className="btn btn-outline w-full cursor-pointer">
            Add new card
          </button>

          <button type="submit" className="btn btn-primary w-full cursor-pointer">
            Pay $264.00
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
            <ShieldCheck className="size-3.5 shrink-0 text-success" strokeWidth={2} aria-hidden="true" />
            Secured by studio payment vault
          </p>
        </div>
      </form>
    </div>
  )
}

const cardPaymentHtml = `<div class="flex min-h-[28rem] items-center justify-center rounded-box bg-base-200/60 p-4 sm:p-6">
  <form class="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body gap-5">
      <div>
        <h2 class="card-title text-primary font-bold">Pay with card</h2>
        <p class="text-sm text-ink-muted">
          UI only. No card data is processed in this demo.
        </p>
      </div>

      <fieldset class="fieldset">
        <label class="label" for="pay-card-number">
          <span class="label-text">Card number${requiredMark}</span>
        </label>
        <input id="pay-card-number" type="text" inputmode="numeric" autocomplete="cc-number" class="input w-full cursor-text font-mono" placeholder="4242 4242 4242 4242" value="4242 4242 4242 4242" required />
      </fieldset>

      <div class="grid grid-cols-2 gap-4">
        <fieldset class="fieldset">
          <label class="label" for="pay-expiry">
            <span class="label-text">Expiry${requiredMark}</span>
          </label>
          <input id="pay-expiry" type="text" autocomplete="cc-exp" class="input w-full cursor-text font-mono" placeholder="MM / YY" value="08 / 28" required />
        </fieldset>
        <fieldset class="fieldset">
          <label class="label" for="pay-cvc">
            <span class="label-text">CVC${requiredMark}</span>
          </label>
          <input id="pay-cvc" type="text" inputmode="numeric" autocomplete="cc-csc" class="input w-full cursor-text font-mono" placeholder="123" value="123" required />
        </fieldset>
      </div>

      <fieldset class="fieldset">
        <label class="label" for="pay-name">
          <span class="label-text">Name on card${requiredMark}</span>
        </label>
        <input id="pay-name" type="text" autocomplete="cc-name" class="input w-full cursor-text" placeholder="Maya Chen" value="Maya Chen" required />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-sm font-medium">Billing address</legend>
        <div class="grid gap-3 sm:grid-cols-2">
          <input id="pay-billing-line" type="text" class="input w-full cursor-text sm:col-span-2" placeholder="Street" value="124 pigment lane" aria-label="Billing street" />
          <input id="pay-billing-city" type="text" class="input w-full cursor-text" placeholder="City" value="Portland" aria-label="Billing city" />
          <input id="pay-billing-postal" type="text" class="input w-full cursor-text" placeholder="Postal code" value="97209" aria-label="Billing postal code" />
        </div>
      </fieldset>

      <button type="submit" class="btn btn-primary w-full cursor-pointer">Pay $264.00</button>

      <p class="flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
        ${svgLock}
        Payments are encrypted and processed securely
      </p>
    </div>
  </form>
</div>`

const cardPaymentJsx = toJsx(cardPaymentHtml)

const savedCardsHtml = `<div class="rounded-box bg-base-200/40 p-4 sm:p-6">
  <form class="card mx-auto w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
    <div class="card-body gap-4">
      <div>
        <h2 class="card-title text-secondary font-bold">Saved cards</h2>
        <p class="text-sm text-ink-muted">Pick a card on file or add a new one.</p>
      </div>

      <ul class="space-y-2">
        <li>
          <label class="flex cursor-pointer items-center gap-3 rounded-box border border-primary bg-primary/5 p-3">
            <input type="radio" name="saved-card" class="radio radio-primary" checked />
            <span class="flex-1 font-mono text-sm">•••• 4242</span>
            <span class="badge badge-ghost">Default</span>
          </label>
        </li>
        <li>
          <label class="flex cursor-pointer items-center gap-3 rounded-box border border-base-300 p-3">
            <input type="radio" name="saved-card" class="radio radio-primary" />
            <span class="flex-1 font-mono text-sm">•••• 1881</span>
            <span class="text-xs text-ink-muted">Exp 03 / 27</span>
          </label>
        </li>
      </ul>

      <button type="button" class="btn btn-outline w-full cursor-pointer">Add new card</button>

      <button type="submit" class="btn btn-primary w-full cursor-pointer">Pay $264.00</button>

      <p class="flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
        ${svgShieldCheck}
        Secured by studio payment vault
      </p>
    </div>
  </form>
</div>`

const savedCardsJsx = toJsx(savedCardsHtml)

export default function PaymentTemplatePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Payment
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Focused payment step for studio commerce.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Card entry"
          title="New card payment"
          description="Card number, expiry, CVC, and name with compact billing address"
        >
          <ShowcaseTabs
            preview={<CardPaymentPreview />}
            html={cardPaymentHtml}
            jsx={cardPaymentJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Saved cards"
          title="Pay with card on file"
          description="Radio list of saved cards"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={<SavedCardsPreview />}
            html={savedCardsHtml}
            jsx={savedCardsJsx}
          />
        </GallerySection>
      </div>
    </>
  )
}
