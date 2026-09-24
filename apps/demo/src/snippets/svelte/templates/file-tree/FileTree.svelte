<script lang="ts">
	type Node = { name: string; children?: Node[] }

	const tree: Node = {
		name: 'design-lib-menzies',
		children: [
			{
				name: 'packages',
				children: [
					{
						name: 'menzies-design-wash-ui',
						children: [
							{
								name: 'src',
								children: [
									{ name: 'registry.ts' },
									{ name: 'index.css' },
									{ name: 'editor.css' }
								]
							}
						]
					}
				]
			},
			{
				name: 'apps',
				children: [{ name: 'demo' }]
			}
		]
	}

	let selected = $state('registry.ts')
</script>

<div
	class="grid min-h-[28rem] overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]"
>
	<aside class="flex min-h-0 flex-col border-b border-base-300 lg:border-b-0 lg:border-r">
		<header class="flex shrink-0 items-center gap-2 border-b border-base-300 bg-base-200/70 px-3 py-2.5">
			<svg
				class="size-4 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
				><path
					d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
				/></svg
			>
			<h2 class="font-display text-sm font-semibold">Design tree</h2>
		</header>
		<nav class="min-h-0 flex-1 overflow-auto py-2" aria-label="Design library file tree">
			<ul class="menu menu-sm w-full bg-transparent p-0">
				{@render item(tree, true)}
			</ul>
		</nav>
	</aside>

	<section class="flex min-h-0 flex-col">
		<header class="shrink-0 border-b border-base-300 bg-base-200/50 px-4 py-2.5">
			<p class="label-ink text-xs">Selected path</p>
			<p class="mt-1 font-mono text-xs text-ink-muted">
				design-lib-menzies / packages / … / <span class="font-semibold text-base-content"
					>{selected}</span
				>
			</p>
		</header>
		<div class="flex flex-1 flex-col gap-4 overflow-auto p-4 sm:p-5">
			<div>
				<p class="label-ink">File</p>
				<h3 class="font-display mt-1 text-xl font-semibold sm:text-2xl">{selected}</h3>
			</div>
			<div class="wash-panel paper-grain wash-panel-blue">
				<p class="label-ink">Deep dive</p>
				<p class="mt-2 text-sm text-base-content/90">
					Grammar pack registry for CodeEditor language packs and token themes.
				</p>
			</div>
		</div>
	</section>
</div>

{#snippet item(node: Node, open = false)}
	{#if node.children}
		<li>
			<details {open}>
				<summary class="cursor-pointer font-mono text-xs">{node.name}</summary>
				<ul>
					{#each node.children as child}
						{@render item(child, child.name === 'packages' || child.name === 'menzies-design-wash-ui' || child.name === 'src')}
					{/each}
				</ul>
			</details>
		</li>
	{:else}
		<li>
			<button
				type="button"
				class="cursor-pointer font-mono text-xs {selected === node.name
					? 'bg-primary/30 font-medium'
					: ''}"
				onclick={() => (selected = node.name)}
			>
				{node.name}
			</button>
		</li>
	{/if}
{/snippet}
