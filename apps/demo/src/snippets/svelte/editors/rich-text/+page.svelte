<script lang="ts">
	import RichTextEditor from '$lib/components/RichTextEditor.svelte'
	let html = $state(
		'<h1>Rich text</h1><p>Draft product copy with toolbar formatting, lists, and links.</p><p>Wash rich text is <em>from-scratch</em>: contenteditable chrome and paste sanitize, not TipTap or Lexical.</p>'
	)
</script>

<section class="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Rich text</h1>
		<p class="text-sm text-base-content/70">contenteditable + toolbar chrome matching the studio preview.</p>
	</header>
	<RichTextEditor bind:value={html} />
</section>
