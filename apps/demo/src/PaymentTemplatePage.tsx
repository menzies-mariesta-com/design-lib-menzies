import {
  Lock,
  ShieldCheck,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

function RequiredMark() {
  return (
    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
      *
    </span>
  )
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

const cardPaymentHtml = `<form class="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
  <div class="card-body gap-5">
    <h2 class="card-title text-primary font-bold">Pay with card</h2>
    <fieldset class="fieldset">
      <label class="label" for="pay-card-number">
        <span class="label-text">Card number<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span>
      </label>
      <input id="pay-card-number" type="text" class="input w-full cursor-text font-mono" required />
    </fieldset>
    <div class="grid grid-cols-2 gap-4">
      <input id="pay-expiry" type="text" class="input w-full cursor-text font-mono" placeholder="MM / YY" />
      <input id="pay-cvc" type="text" class="input w-full cursor-text font-mono" placeholder="CVC" />
    </div>
    <input id="pay-name" type="text" class="input w-full cursor-text" placeholder="Name on card" />
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Billing address</legend>
      <!-- compact street, city, postal -->
    </fieldset>
    <button type="submit" class="btn btn-primary w-full cursor-pointer">Pay $264.00</button>
    <p class="text-center text-xs text-ink-muted">Payments are encrypted and processed securely</p>
  </div>
</form>`

const cardPaymentJsx = `<form className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
  <div className="card-body gap-5">
    <h2 className="card-title text-primary font-bold">Pay with card</h2>
    {/* card number, expiry, CVC, name on card */}
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Billing address</legend>
      {/* compact billing fields */}
    </fieldset>
    <button type="submit" className="btn btn-primary w-full cursor-pointer">
      Pay $264.00
    </button>
    <p className="text-center text-xs text-ink-muted">
      Payments are encrypted and processed securely
    </p>
  </div>
</form>`

const savedCardsHtml = `<form class="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
  <div class="card-body gap-4">
    <h2 class="card-title text-secondary font-bold">Saved cards</h2>
    <label class="flex cursor-pointer items-center gap-3 rounded-box border border-primary p-3">
      <input type="radio" name="saved-card" class="radio radio-primary" checked />
      <span class="font-mono text-sm">•••• 4242</span>
      <span class="badge badge-ghost">Default</span>
    </label>
    <button type="submit" class="btn btn-primary w-full cursor-pointer">Pay $264.00</button>
  </div>
</form>`

const savedCardsJsx = `<form className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
  <div className="card-body gap-4">
    <h2 className="card-title text-secondary font-bold">Saved cards</h2>
    {/* saved card radio list */}
    <button type="submit" className="btn btn-primary w-full cursor-pointer">
      Pay $264.00
    </button>
  </div>
</form>`

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
