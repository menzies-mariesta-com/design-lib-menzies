<script lang="ts">
	import WatercolorSplash from '$lib/components/WatercolorSplash.svelte'
</script>

<section class="mx-auto flex w-full max-w-3xl flex-col gap-8 p-6">
	<header class="space-y-1 text-center">
		<h1 class="font-display text-2xl font-bold text-primary">Paint splash</h1>
		<p class="text-sm text-base-content/70">
			Procedural SVG wash — seed 1284, blob variant, studio pigments.
		</p>
	</header>

	<div
		class="flex min-h-72 items-center justify-center rounded-box border border-base-300 bg-base-200/80 p-6"
	>
		<WatercolorSplash />
	</div>

	<div class="grid gap-4 md:grid-cols-3">
		<article class="card border border-base-300 bg-base-100">
			<div class="relative overflow-hidden p-6">
				<div class="pointer-events-none absolute -right-6 -top-8 opacity-90 scale-75 origin-top-right">
					<WatercolorSplash />
				</div>
				<h3 class="card-title relative z-10 mt-3 text-primary font-bold">Card accent</h3>
				<p class="relative z-10 mt-1 text-sm text-base-content/70">
					Position splashes behind content with absolute layout.
				</p>
			</div>
		</article>
		<article class="flex min-h-40 items-center justify-center rounded-box border border-base-300 bg-base-100">
			<WatercolorSplash />
		</article>
		<article class="flex min-h-40 items-center justify-center gap-2 rounded-box border border-base-300 bg-base-100">
			<div class="scale-50 origin-center"><WatercolorSplash /></div>
			<div class="scale-75 origin-center opacity-70"><WatercolorSplash /></div>
		</article>
	</div>
</section>
