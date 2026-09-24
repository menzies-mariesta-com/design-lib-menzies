<script lang="ts">
	/**
	 * Portaled daisyUI context menu. Drop into `$lib/components/ContextMenu.svelte`.
	 * Pair with a surface that calls `openAt` on contextmenu / long-press / Shift+F10.
	 */
	import type { Snippet } from 'svelte'
	import type { Attachment } from 'svelte/attachments'

	type Pos = { x: number; y: number }

	type Props = {
		/** When null, the menu is closed. */
		pos?: Pos | null
		ariaLabel?: string
		class?: string
		/** Called when Escape / outside pointerdown / scroll should dismiss. */
		onClose?: () => void
		children?: Snippet
	}

	let {
		pos = null,
		ariaLabel = 'Context menu',
		class: className = '',
		onClose,
		children,
	}: Props = $props()

	const CURSOR_GAP = 4
	const SHELL =
		'menu menu-sm fixed z-[80] w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]'

	let menuEl: HTMLUListElement | undefined = $state()
	/** Measured size after paint; null until the portal menu exists. */
	let measured = $state<{ w: number; h: number } | null>(null)

	function placeNearCursor(clientX: number, clientY: number, width: number, height: number): Pos {
		const pad = 8
		let x = clientX + CURSOR_GAP
		let y = clientY + CURSOR_GAP
		if (x + width + pad > window.innerWidth) x = clientX - width - CURSOR_GAP
		if (y + height + pad > window.innerHeight) y = clientY - height - CURSOR_GAP
		const maxX = Math.max(pad, window.innerWidth - width - pad)
		const maxY = Math.max(pad, window.innerHeight - height - pad)
		return {
			x: Math.min(Math.max(pad, x), maxX),
			y: Math.min(Math.max(pad, y), maxY),
		}
	}

	const placed = $derived.by((): Pos | null => {
		if (!pos) return null
		const w = measured?.w ?? 208
		const h = measured?.h ?? 220
		return placeNearCursor(pos.x, pos.y, w, h)
	})

	/** Move the menu under body so ancestor transform/overflow cannot retarget fixed. */
	const portalToBody: Attachment<HTMLUListElement> = (node) => {
		document.body.appendChild(node)
		return () => {
			node.remove()
		}
	}

	$effect(() => {
		if (!pos) {
			measured = null
			return
		}
		if (!menuEl) return
		const rect = menuEl.getBoundingClientRect()
		const next = { w: rect.width, h: rect.height }
		if (!measured || measured.w !== next.w || measured.h !== next.h) {
			measured = next
		}
	})

	$effect(() => {
		if (!placed) return

		function onPointerDown(event: PointerEvent) {
			if (!menuEl) return
			if (event.target instanceof Node && !menuEl.contains(event.target)) {
				onClose?.()
			}
		}
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') onClose?.()
		}
		function onScroll() {
			onClose?.()
		}

		document.addEventListener('pointerdown', onPointerDown, true)
		document.addEventListener('keydown', onKeyDown)
		window.addEventListener('scroll', onScroll, true)
		return () => {
			document.removeEventListener('pointerdown', onPointerDown, true)
			document.removeEventListener('keydown', onKeyDown)
			window.removeEventListener('scroll', onScroll, true)
		}
	})
</script>

{#if placed}
	<ul
		bind:this={menuEl}
		{@attach portalToBody}
		class="{SHELL} {className}"
		style="left: {placed.x}px; top: {placed.y}px"
		role="menu"
		aria-label={ariaLabel}
	>
		{#if children}
			{@render children()}
		{/if}
	</ul>
{/if}
