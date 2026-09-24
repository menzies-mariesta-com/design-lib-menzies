<script lang="ts">
	type Props = {
		value?: string
		fileName?: string
		language?: string
	}

	let {
		value = $bindable(`import { initWash } from '@menzies-mariesta-com/menzies-design-wash-ui/brand'

export function boot(): boolean {
  initWash({ pigment: 'mineral', mode: 'light' })
  return true
}
`),
		fileName = 'app.ts',
		language = 'typescript'
	}: Props = $props()

	const lines = $derived(value.split('\n').length)
</script>

<div
	class="wash-code-editor overflow-hidden rounded-box border border-ink-border bg-base-100 shadow-[var(--shadow-paper-sm)]"
	style="min-height:22rem"
>
	<div
		class="wash-code-titlebar flex flex-wrap items-center gap-2 border-b border-base-300 bg-base-200 px-3 py-2"
	>
		<div class="wash-code-dots flex gap-1" aria-hidden="true">
			<span class="size-2.5 rounded-full bg-error/70"></span>
			<span class="size-2.5 rounded-full bg-warning/70"></span>
			<span class="size-2.5 rounded-full bg-success/70"></span>
		</div>
		<div class="wash-code-tabs flex min-w-0 flex-1 flex-wrap gap-1" role="tablist">
			<button
				type="button"
				role="tab"
				aria-selected="true"
				class="wash-code-tab btn btn-ghost btn-xs cursor-pointer"
				data-active="true">{fileName}</button
			>
		</div>
		<div class="wash-code-lang-select">
			<select class="select select-xs select-bordered cursor-pointer" aria-label="Language">
				<option selected>{language}</option>
				<option>json</option>
				<option>markdown</option>
			</select>
		</div>
	</div>
	<div class="wash-code-body flex min-h-[16rem]">
		<div
			class="wash-code-gutter select-none border-e border-base-300 bg-base-200/50 px-2 py-3 text-right font-mono text-xs text-ink-muted"
			aria-hidden="true"
		>
			{#each Array.from({ length: lines }, (_, i) => i + 1) as n}
				<div class="wash-code-gutter-line">{n}</div>
			{/each}
		</div>
		<textarea
			class="wash-code-input min-h-0 flex-1 resize-y border-0 bg-transparent p-3 font-mono text-sm leading-relaxed cursor-text outline-none"
			bind:value
			spellcheck="false"
			aria-label="Code editor"
		></textarea>
	</div>
	<div
		class="wash-code-statusbar flex items-center justify-between border-t border-base-300 bg-base-200/60 px-3 py-1.5 font-mono text-[0.65rem] text-ink-muted"
	>
		<span>Ln 1, Col 1</span>
		<span class="uppercase">{language}</span>
	</div>
</div>
