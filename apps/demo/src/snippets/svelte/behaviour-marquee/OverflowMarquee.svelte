<script lang="ts">
	type Props = {
		text?: string
		class?: string
	}

	let { text = 'Long label that overflows the pane and scrolls when clipped', class: className = '' }: Props =
		$props()

	let host: HTMLDivElement | undefined = $state()
	let overflowing = $state(false)

	function measure() {
		if (!host) return
		overflowing = host.scrollWidth > host.clientWidth + 1
	}

	$effect(() => {
		measure()
		window.addEventListener('resize', measure)
		return () => window.removeEventListener('resize', measure)
	})
</script>

<div
	bind:this={host}
	class="overflow-marquee-host overflow-marquee overflow-hidden whitespace-nowrap {className}"
	data-overflow={overflowing ? 'true' : 'false'}
	data-overflow-marquee=""
	tabindex={overflowing ? 0 : undefined}
>
	<span class="overflow-marquee-label inline-block">{text}</span>
</div>
