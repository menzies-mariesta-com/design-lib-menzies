import {
  Droplet,
  MapPin,
  ShoppingBag,
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

const cartItems = [
  {
    name: 'Ultramarine pigment set',
    detail: '15ml tubes, studio grade',
    qty: 2,
    price: '$48.00',
  },
  {
    name: 'Arches cold press plate pack',
    detail: '10 sheets, 140 lb',
    qty: 1,
    price: '$124.00',
  },
  {
    name: 'Palette knife trio',
    detail: 'Flexible steel, wash desk',
    qty: 1,
    price: '$32.00',
  },
]

function CheckoutPreview() {
  return (
    <div className="rounded-box bg-base-200/50 p-4 sm:p-6">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
        <form className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body gap-6">
            <div>
              <h2 className="card-title text-primary font-bold">Shipping details</h2>
              <p className="text-sm text-ink-muted">
                Pigment supplies and plate orders ship from the Menzies studio desk.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <fieldset className="fieldset sm:col-span-2">
                <label className="label" htmlFor="checkout-name">
                  <span className="label-text">
                    Full name
                    <RequiredMark />
                  </span>
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  name="name"
                  className="input w-full cursor-text"
                  placeholder="Studio contact"
                  defaultValue="Maya Chen"
                  required
                />
              </fieldset>

              <fieldset className="fieldset sm:col-span-2">
                <label className="label" htmlFor="checkout-address">
                  <span className="label-text">
                    Street address
                    <RequiredMark />
                  </span>
                </label>
                <label className="input w-full cursor-text">
                  <MapPin className="size-4 opacity-50" strokeWidth={2} aria-hidden="true" />
                  <input
                    id="checkout-address"
                    type="text"
                    name="address"
                    placeholder="124 pigment lane"
                    defaultValue="124 pigment lane"
                    required
                  />
                </label>
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="checkout-city">
                  <span className="label-text">
                    City
                    <RequiredMark />
                  </span>
                </label>
                <input
                  id="checkout-city"
                  type="text"
                  name="city"
                  className="input w-full cursor-text"
                  defaultValue="Portland"
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="checkout-postal">
                  <span className="label-text">
                    Postal code
                    <RequiredMark />
                  </span>
                </label>
                <input
                  id="checkout-postal"
                  type="text"
                  name="postal"
                  className="input w-full cursor-text"
                  defaultValue="97209"
                  required
                />
              </fieldset>
            </div>

            <div>
              <h3 className="font-display text-base font-semibold">Payment method</h3>
              <div className="mt-3 space-y-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-box border border-base-300 bg-base-100 p-3 has-checked:border-primary has-checked:bg-primary/5">
                  <input
                    type="radio"
                    name="checkout-payment"
                    className="radio radio-primary"
                    defaultChecked
                  />
                  <span className="flex-1 text-sm">
                    <span className="font-medium">Credit or debit card</span>
                    <span className="block text-ink-muted">Visa, Mastercard, Amex</span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-box border border-base-300 bg-base-100 p-3 has-checked:border-primary has-checked:bg-primary/5">
                  <input type="radio" name="checkout-payment" className="radio radio-primary" />
                  <span className="flex-1 text-sm">
                    <span className="font-medium">Studio account</span>
                    <span className="block text-ink-muted">Balance: $640.00</span>
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full cursor-pointer">
              Complete order
            </button>
          </div>
        </form>

        <aside className="card h-fit border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-primary" strokeWidth={2} aria-hidden="true" />
              <h2 className="card-title text-secondary font-bold">Order summary</h2>
            </div>

            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li key={item.name} className="flex gap-3 text-sm">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-box bg-primary/10">
                    <Droplet className="size-5 text-primary" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="text-ink-muted">{item.detail}</p>
                    <p className="text-ink-muted">Qty {item.qty}</p>
                  </div>
                  <span className="shrink-0 font-medium">{item.price}</span>
                </li>
              ))}
            </ul>

            <div className="divider my-0" />

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Subtotal</dt>
                <dd>$252.00</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Shipping</dt>
                <dd>$12.00</dd>
              </div>
              <div className="flex justify-between font-semibold">
                <dt>Total</dt>
                <dd>$264.00</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}

const checkoutHtml = `<div class="rounded-box bg-base-200/50 p-4 sm:p-6">
  <div class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
    <form class="card border border-base-300 bg-base-100 shadow-sm">
      <div class="card-body gap-6">
        <div>
          <h2 class="card-title text-primary font-bold">Shipping details</h2>
          <p class="text-sm text-ink-muted">
            Pigment supplies and plate orders ship from the Menzies studio desk.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <fieldset class="fieldset sm:col-span-2">
            <label class="label" for="checkout-name">
              <span class="label-text">Full name<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span>
            </label>
            <input id="checkout-name" type="text" class="input w-full cursor-text" required />
          </fieldset>
          <!-- address, city, postal -->
        </div>

        <div>
          <h3 class="font-display text-base font-semibold">Payment method</h3>
          <label class="flex cursor-pointer items-center gap-3 rounded-box border border-base-300 p-3">
            <input type="radio" name="checkout-payment" class="radio radio-primary" checked />
            <span class="text-sm font-medium">Credit or debit card</span>
          </label>
          <label class="flex cursor-pointer items-center gap-3 rounded-box border border-base-300 p-3">
            <input type="radio" name="checkout-payment" class="radio radio-primary" />
            <span class="text-sm font-medium">Studio account</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary w-full cursor-pointer">Complete order</button>
      </div>
    </form>

    <aside class="card h-fit border border-base-300 bg-base-100 shadow-sm">
      <div class="card-body gap-4">
        <h2 class="card-title text-secondary font-bold">Order summary</h2>
        <!-- cart line items + totals -->
      </div>
    </aside>
  </div>
</div>`

const checkoutJsx = `<div className="rounded-box bg-base-200/50 p-4 sm:p-6">
  <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
    <form className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-6">
        <h2 className="card-title text-primary font-bold">Shipping details</h2>
        {/* shipping fields + payment method radios */}
        <button type="submit" className="btn btn-primary w-full cursor-pointer">
          Complete order
        </button>
      </div>
    </form>

    <aside className="card h-fit border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-4">
        <h2 className="card-title text-secondary font-bold">Order summary</h2>
        {/* cart line items + subtotal, shipping, total */}
      </div>
    </aside>
  </div>
</div>`

export default function CheckoutTemplatePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Template gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Studio commerce checkout
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Commerce"
          title="Pigment and plate checkout"
          description="Two-column layout: shipping and payment on the left, order summary"
        >
          <ShowcaseTabs
            preview={<CheckoutPreview />}
            html={checkoutHtml}
            jsx={checkoutJsx}
          />
        </GallerySection>
      </div>
    </>
  )
}
