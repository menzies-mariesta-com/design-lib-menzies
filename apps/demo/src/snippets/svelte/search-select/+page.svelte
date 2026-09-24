<script lang="ts">
	import SearchSelect from '$lib/components/SearchSelect.svelte'

	let pigment = $state<string | null>(null)
	let medium = $state<string | null>(null)
	let paper = $state<string | null>(null)
</script>

<section class="mx-auto flex w-full max-w-2xl flex-col gap-8 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Search select</h1>
		<p class="text-sm text-base-content/70">
			Filterable combobox: btn trigger, search input, menu list (dropdown-no-hover).
		</p>
	</header>

	<SearchSelect bind:value={pigment} label="Pigment" placeholder="Search pigments…" />

	<div class="grid gap-4 sm:grid-cols-2">
		<SearchSelect
			bind:value={medium}
			label="Wash medium"
			placeholder="Search mediums…"
			options={['Water', 'Gouache binder', 'Ox gall', 'Gum arabic']}
		/>
		<SearchSelect
			bind:value={paper}
			label="Paper tooth"
			placeholder="Search papers…"
			options={['Cold press', 'Hot press', 'Rough', 'Plate', 'Block']}
		/>
	</div>

	<form class="flex max-w-md flex-col gap-4" onsubmit={(e) => e.preventDefault()}>
		<SearchSelect
			bind:value={pigment}
			label="Series pigment"
			placeholder="Search then select…"
			required
		/>
		<button type="submit" class="btn btn-primary cursor-pointer self-start">Save pick</button>
	</form>
</section>
