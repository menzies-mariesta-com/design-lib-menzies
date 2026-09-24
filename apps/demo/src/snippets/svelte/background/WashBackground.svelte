<script lang="ts">
	/**
	 * Wash background shell. `$lib/components/WashBackground.svelte`.
	 * Matches `page-wash` (+ optional `paper-grain`) used by the React WashBackground.
	 */
	import type { Snippet } from 'svelte'

	type Props = {
		class?: string
		/** Paper-fiber grain overlay. Defaults to true. */
		grain?: boolean
		children?: Snippet
	}

	let { class: className = '', grain = true, children }: Props = $props()
</script>

<div class={['page-wash', grain && 'paper-grain', className].filter(Boolean).join(' ')}>
	{#if children}{@render children()}{/if}
</div>
