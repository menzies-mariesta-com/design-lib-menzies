import type { ShowcaseSvelteFile } from '../../../../components/showcaseTypes'
import { kitFiles } from '../../../../components/kitFiles'
import card from './CheckoutCard.svelte?raw'
import page from './+page.svelte?raw'

export const checkoutSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'CheckoutCard.svelte', code: card },
  { name: '+page.svelte', code: page },
])

export const checkoutHtml = `<div class="rounded-box bg-base-200/50 p-4 sm:p-6">
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
            <input id="checkout-name" type="text" name="name" class="input w-full cursor-text" placeholder="Studio contact" value="Maya Chen" required />
          </fieldset>

          <fieldset class="fieldset sm:col-span-2">
            <label class="label" for="checkout-address">
              <span class="label-text">Street address<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span>
            </label>
            <label class="input w-full cursor-text">
              <svg class="size-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
              <input id="checkout-address" type="text" name="address" placeholder="124 pigment lane" value="124 pigment lane" required />
            </label>
          </fieldset>

          <fieldset class="fieldset">
            <label class="label" for="checkout-city">
              <span class="label-text">City<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span>
            </label>
            <input id="checkout-city" type="text" name="city" class="input w-full cursor-text" value="Portland" required />
          </fieldset>

          <fieldset class="fieldset">
            <label class="label" for="checkout-postal">
              <span class="label-text">Postal code<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span>
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
          <svg class="size-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>
          <h2 class="card-title text-secondary font-bold">Order summary</h2>
        </div>

        <ul class="space-y-3">
          <li class="flex gap-3 text-sm">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-box bg-primary/10">
              <svg class="size-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
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
              <svg class="size-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
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
              <svg class="size-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
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

export const checkoutJsx = checkoutHtml
  .replace(/class=/g, 'className=')
  .replace(/\sfor=/g, ' htmlFor=')
  .replace(/\schecked(?:=["']checked["'])?/g, ' defaultChecked')
  .replace(/\svalue=/g, ' defaultValue=')
  .replace(/stroke-width=/g, 'strokeWidth=')
