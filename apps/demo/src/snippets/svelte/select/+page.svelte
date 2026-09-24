<script lang="ts">
	import Select from '$lib/components/Select.svelte'

	let pigment = $state('viridian')
</script>

<section class="mx-auto flex w-full max-w-md flex-col gap-4 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Select</h1>
		<p class="text-sm text-base-content/70">
			Combobox: trigger + listbox menu.
		</p>
	</header>

	<Select bind:value={pigment} ariaLabel="Pigment" />

	<p class="font-mono text-xs text-base-content/60">{pigment || '(none)'}</p>
</section>
