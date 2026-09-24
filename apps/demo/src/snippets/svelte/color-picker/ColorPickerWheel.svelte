<script lang="ts">
	/**
	 * Color picker wheel shell (CSS stand-in for canvas hue + SL square).
	 * `$lib/components/ColorPickerWheel.svelte`
	 */
	type Props = {
		value?: string
		size?: number
		showSwatch?: boolean
		showHexInput?: boolean
		'aria-label'?: string
	}

	let {
		value = $bindable('#276c8e'),
		size = 220,
		showSwatch = true,
		showHexInput = true,
		'aria-label': ariaLabel = 'Color picker',
	}: Props = $props()
</script>

<div class="inline-flex max-w-full flex-col items-center gap-2">
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		role="group"
		aria-label={ariaLabel}
		tabindex="0"
		class="relative touch-none select-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
		style="width:{size}px;height:{size}px"
	>
		<div
			class="block size-full rounded-full border border-ink-border/70 bg-base-100 shadow-sm"
			style="background: conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);"
			aria-hidden="true"
		></div>
		<div
			class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-box border border-ink-border/80 shadow-inner"
			style="width:{Math.round(size * 0.64)}px;height:{Math.round(size * 0.64)}px;background:linear-gradient(to bottom,#fff,transparent),linear-gradient(to right,#000,{value});"
			aria-hidden="true"
		></div>
		<span
			class="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-base-100 shadow"
			style="left:78%;top:28%;background:{value}"
			aria-hidden="true"
		></span>
	</div>
	{#if showSwatch || showHexInput}
		<div class="flex w-full max-w-xs items-center gap-2">
			{#if showSwatch}
				<span
					class="size-9 shrink-0 rounded-box border border-ink-border shadow-sm"
					style:background={value}
					aria-hidden="true"
				></span>
			{/if}
			{#if showHexInput}
				<input
					type="text"
					class="input input-bordered input-sm w-full font-mono cursor-text"
					bind:value
					aria-label="Hex color value"
				/>
			{/if}
		</div>
	{/if}
</div>
