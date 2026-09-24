<script lang="ts">
	import DataTableShell from '$lib/components/DataTableShell.svelte'
</script>

<section class="mx-auto flex w-full max-w-5xl flex-col gap-4 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Data table</h1>
		<p class="text-sm text-base-content/70">
			Sticky header + scroll body + paginator. Actions column first; zebra rows; Tags/Status legends.
		</p>
	</header>

	<DataTableShell />
</section>
