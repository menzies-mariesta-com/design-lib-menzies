<script lang="ts">
	/**
	 * details.dropdown that measures viewport and applies dropdown-end / dropdown-top.
	 * Drop into `$lib/components/SmartDetailsDropdown.svelte`.
	 * Closes on outside click and Escape (native open; no bind:open fight).
	 */
	type Props = {
		label?: string
		children?: import('svelte').Snippet
	}

	let { label = 'Open', children }: Props = $props()

	let detailsEl: HTMLDetailsElement | undefined = $state()
	let end = $state(false)
	let top = $state(false)

	function measure() {
		if (!detailsEl) return
		const rect = detailsEl.getBoundingClientRect()
		end = window.innerWidth - rect.right < 220
		top = window.innerHeight - rect.bottom < 200
	}

	function onToggle() {
		if (detailsEl?.open) measure()
	}

	$effect(() => {
		window.addEventListener('resize', measure)
		return () => window.removeEventListener('resize', measure)
	})

	$effect(() => {
		const node = detailsEl
		if (!node) return

		function onPointerDown(event: PointerEvent) {
			if (!node.open) return
			if (event.target instanceof Node && !node.contains(event.target)) {
				node.open = false
			}
		}

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape' && node.open) node.open = false
		}

		document.addEventListener('pointerdown', onPointerDown)
		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('pointerdown', onPointerDown)
			document.removeEventListener('keydown', onKeyDown)
		}
	})
</script>

<details
	bind:this={detailsEl}
	class="dropdown {end ? 'dropdown-end' : ''} {top ? 'dropdown-top' : ''}"
	ontoggle={onToggle}
>
	<summary class="btn cursor-pointer border-ink-border [&::-webkit-details-marker]:hidden"
		>{label}</summary
	>
	<div
		class="dropdown-content z-50 mt-1 min-w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]"
	>
		{#if children}{@render children()}{/if}
	</div>
</details>
