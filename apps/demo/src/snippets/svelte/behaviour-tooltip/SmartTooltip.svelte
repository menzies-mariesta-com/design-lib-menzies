<script lang="ts">
	/**
	 * Viewport-aware tooltip (prefer side with more room).
	 * Drop into `$lib/components/SmartTooltip.svelte`.
	 */
	type Props = {
		tip?: string
		tone?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
		children?: import('svelte').Snippet
	}

	let { tip = 'Tip', tone = 'primary', children }: Props = $props()

	let rootEl: HTMLDivElement | undefined = $state()
	let side = $state<'left' | 'right'>('right')

	function measure() {
		if (!rootEl) return
		const rect = rootEl.getBoundingClientRect()
		const roomLeft = rect.left
		const roomRight = window.innerWidth - rect.right
		side = roomRight >= roomLeft ? 'right' : 'left'
	}

	$effect(() => {
		measure()
		window.addEventListener('resize', measure)
		return () => window.removeEventListener('resize', measure)
	})
</script>

<div
	bind:this={rootEl}
	class="tooltip tooltip-{tone} tooltip-{side}"
	data-tip={tip}
	onmouseenter={measure}
	onfocusin={measure}
>
	{#if children}{@render children()}{/if}
</div>
