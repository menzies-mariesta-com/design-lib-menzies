/**
 * Decorative corner ribbon for Store page content.
 * Anchors to a relative page wrapper (not wash-panel). Non-blocking.
 */
export default function StoreSupportRibbon() {
  return (
    <div
      className="pointer-events-none absolute end-0 top-0 z-20 size-[7.5rem] overflow-hidden md:size-36"
      aria-hidden="true"
    >
      <p className="absolute top-[1.15rem] end-[-3.4rem] w-[12.75rem] rotate-45 bg-warning px-2 py-1.5 text-center text-[0.625rem] font-semibold leading-snug tracking-wide text-warning-content shadow-[0_1px_0_color-mix(in_oklab,black_12%,transparent)] md:top-[1.35rem] md:end-[-3.75rem] md:w-[14.5rem] md:text-[0.7rem]">
        Support open libraries first. Then support us.
      </p>
    </div>
  )
}
