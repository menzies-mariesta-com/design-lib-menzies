import {
  Droplet,
  MapPin,
  ShoppingBag,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'
import { checkoutSvelteFiles } from './snippets/svelte/templates/checkout'

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

const svgMapPin =
  '<svg class="size-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>'
const svgShoppingBag =
  '<svg class="size-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>'
const svgDroplet =
  '<svg class="size-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>'

const requiredMark =
  '<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span>'

function toJsx(html: string): string {
  return daisyToJsx(html)
    .replace(/\sfor=/g, ' htmlFor=')
    .replace(/\schecked(?:=["']checked["'])?/g, ' defaultChecked')
    .replace(/\svalue=/g, ' defaultValue=')
    .replace(/stroke-width=/g, 'strokeWidth=')
}

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
              <span class="label-text">Full name${requiredMark}</span>
            </label>
            <input id="checkout-name" type="text" name="name" class="input w-full cursor-text" placeholder="Studio contact" value="Maya Chen" required />
          </fieldset>

          <fieldset class="fieldset sm:col-span-2">
            <label class="label" for="checkout-address">
              <span class="label-text">Street address${requiredMark}</span>
            </label>
            <label class="input w-full cursor-text">
              ${svgMapPin}
              <input id="checkout-address" type="text" name="address" placeholder="124 pigment lane" value="124 pigment lane" required />
            </label>
          </fieldset>

          <fieldset class="fieldset">
            <label class="label" for="checkout-city">
              <span class="label-text">City${requiredMark}</span>
            </label>
            <input id="checkout-city" type="text" name="city" class="input w-full cursor-text" value="Portland" required />
          </fieldset>

          <fieldset class="fieldset">
            <label class="label" for="checkout-postal">
              <span class="label-text">Postal code${requiredMark}</span>
            </label>
            <input id="checkout-postal" type="text" name="postal" class="input w-full cursor-text" value="97209" required />
          </fieldset>
        </div>

        <div>
          <h3 class="font-display text-base font-semibold">Payment method</h3>
          <div class="mt-3 space-y-2">
            <label class="flex cursor-pointer items-center gap-3 rounded-box border border-base-300 bg-base-100 p-3 has-checked:border-primary has-checked:bg-primary/5">
              <input type="radio" name="checkout-payment" class="radio radio-primary" checked />
              <span class="flex-1 text-sm">
                <span class="font-medium">Credit or debit card</span>
                <span class="block text-ink-muted">Visa, Mastercard, Amex</span>
              </span>
            </label>
            <label class="flex cursor-pointer items-center gap-3 rounded-box border border-base-300 bg-base-100 p-3 has-checked:border-primary has-checked:bg-primary/5">
              <input type="radio" name="checkout-payment" class="radio radio-primary" />
              <span class="flex-1 text-sm">
                <span class="font-medium">Studio account</span>
                <span class="block text-ink-muted">Balance: $640.00</span>
              </span>
            </label>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-full cursor-pointer">Complete order</button>
      </div>
    </form>

    <aside class="card h-fit border border-base-300 bg-base-100 shadow-sm">
      <div class="card-body gap-4">
        <div class="flex items-center gap-2">
          ${svgShoppingBag}
          <h2 class="card-title text-secondary font-bold">Order summary</h2>
        </div>

        <ul class="space-y-3">
          <li class="flex gap-3 text-sm">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-box bg-primary/10">
              ${svgDroplet}
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium">Ultramarine pigment set</p>
              <p class="text-ink-muted">15ml tubes, studio grade</p>
              <p class="text-ink-muted">Qty 2</p>
            </div>
            <span class="shrink-0 font-medium">$48.00</span>
          </li>
          <li class="flex gap-3 text-sm">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-box bg-primary/10">
              ${svgDroplet}
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium">Arches cold press plate pack</p>
              <p class="text-ink-muted">10 sheets, 140 lb</p>
              <p class="text-ink-muted">Qty 1</p>
            </div>
            <span class="shrink-0 font-medium">$124.00</span>
          </li>
          <li class="flex gap-3 text-sm">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-box bg-primary/10">
              ${svgDroplet}
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium">Palette knife trio</p>
              <p class="text-ink-muted">Flexible steel, wash desk</p>
              <p class="text-ink-muted">Qty 1</p>
            </div>
            <span class="shrink-0 font-medium">$32.00</span>
          </li>
        </ul>

        <div class="divider my-0"></div>

        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-ink-muted">Subtotal</dt>
            <dd>$252.00</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-ink-muted">Shipping</dt>
            <dd>$12.00</dd>
          </div>
          <div class="flex justify-between font-semibold">
            <dt>Total</dt>
            <dd>$264.00</dd>
          </div>
        </dl>
      </div>
    </aside>
  </div>
</div>`

const checkoutJsx = toJsx(checkoutHtml)

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
            svelteFiles={checkoutSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
