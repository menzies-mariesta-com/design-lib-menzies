<script lang="ts">
	import CodeEditorShell from '$lib/components/CodeEditorShell.svelte'
</script>

<section class="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Code editor</h1>
		<p class="text-sm text-base-content/70">
			Titlebar tabs, language select, gutter, and status bar chrome over an editable surface.
		</p>
	</header>
	<CodeEditorShell />
</section>
