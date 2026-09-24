<script lang="ts">
	import ColorPickerWheel from '$lib/components/ColorPickerWheel.svelte'

	let fullHex = $state('#276c8e')
	let compactHex = $state('#b87524')
</script>

<section class="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Color picker wheel</h1>
		<p class="text-sm text-base-content/70">Full picker beside compact splash layout.</p>
	</header>

	<div class="grid gap-6 lg:grid-cols-2">
		<div class="rounded-box border border-ink-border/70 bg-base-100/70 p-4">
			<p class="mb-3 text-xs font-medium uppercase tracking-wide text-ink-muted">Full picker</p>
			<ColorPickerWheel bind:value={fullHex} size={220} showSwatch showHexInput aria-label="Full color picker" />
		</div>
		<div class="rounded-box border border-ink-border/70 bg-base-100/70 p-4">
			<p class="mb-3 text-xs font-medium uppercase tracking-wide text-ink-muted">Compact (paint splash layout)</p>
			<div class="flex flex-wrap items-end gap-4">
				<ColorPickerWheel
					bind:value={compactHex}
					size={140}
					showSwatch={false}
					showHexInput={false}
					aria-label="Compact splash color"
				/>
				<label class="form-control min-w-[8rem] flex-1 cursor-default" for="compact-hex">
					<span class="label py-1"><span class="label-text text-sm">Hex</span></span>
					<input
						id="compact-hex"
						type="text"
						class="input input-bordered input-sm w-full font-mono cursor-text"
						bind:value={compactHex}
						aria-label="Hex"
					/>
				</label>
				<span
					class="size-10 shrink-0 rounded-box border border-ink-border shadow-sm"
					style:background={compactHex}
					aria-hidden="true"
				></span>
			</div>
		</div>
	</div>
</section>
