<script lang="ts">
	import WashDialog from '$lib/components/WashDialog.svelte'

	let confirmOpen = $state(false)
	let formOpen = $state(false)
	let infoOpen = $state(false)
	let formSaving = $state(false)

	function saveRename() {
		if (formSaving) return
		formSaving = true
		window.setTimeout(() => {
			formSaving = false
			formOpen = false
		}, 600)
	}
</script>

<section class="mx-auto flex w-full max-w-lg flex-col gap-6 p-6">
	<header class="space-y-1">
		<h1 class="font-display text-2xl font-bold text-primary">Dialog</h1>
		<p class="text-sm text-base-content/70">
			Modal recipes: destructive confirm, rename form, and simple notice. Escape, backdrop, and
			Cancel close each dialog.
		</p>
	</header>

	<button type="button" class="btn btn-error cursor-pointer" onclick={() => (confirmOpen = true)}>
		Delete plate
	</button>

	<WashDialog
		bind:open={confirmOpen}
		tone="error"
		header="Delete plate"
		desc="This cannot be undone. The plate and its wash history will be removed."
	>
		<p class="text-sm">
			Plate <span class="font-mono text-xs">coastal-fog-12</span> is linked to 3 review comments.
		</p>
		{#snippet actions({ close })}
			<button type="button" class="btn cursor-pointer" onclick={close}>Cancel</button>
			<button type="button" class="btn btn-error cursor-pointer" onclick={close}>Delete</button>
		{/snippet}
	</WashDialog>

	<button
		type="button"
		class="btn btn-secondary cursor-pointer"
		onclick={() => (formOpen = true)}
	>
		Rename plate
	</button>

	<WashDialog
		bind:open={formOpen}
		dismissible={!formSaving}
		tone="secondary"
		header="Rename plate"
		desc="Update the studio label shown in the plate library."
	>
		<fieldset class="fieldset mt-2">
			<label class="label" for="dialog-plate-name">
				<span class="label-text"
					>Plate name<span
						class="text-error align-top text-sm leading-none"
						aria-hidden="true">*</span
					></span
				>
			</label>
			<input
				id="dialog-plate-name"
				name="name"
				type="text"
				class="input w-full cursor-text"
				value="Coastal fog plate"
				required
				disabled={formSaving}
			/>
		</fieldset>
		{#snippet actions({ close })}
			<button
				type="button"
				class="btn btn-ghost"
				class:cursor-pointer={!formSaving}
				class:cursor-not-allowed={formSaving}
				class:btn-disabled={formSaving}
				disabled={formSaving}
				onclick={close}
			>
				Cancel
			</button>
			<button
				type="button"
				class="btn btn-secondary"
				class:cursor-pointer={!formSaving}
				class:cursor-not-allowed={formSaving}
				class:btn-disabled={formSaving}
				class:loading={formSaving}
				disabled={formSaving}
				aria-busy={formSaving}
				onclick={saveRename}
			>
				Save changes
			</button>
		{/snippet}
	</WashDialog>

	<button type="button" class="btn btn-primary cursor-pointer" onclick={() => (infoOpen = true)}>
		Show notice
	</button>

	<WashDialog
		bind:open={infoOpen}
		tone="primary"
		header="Wash export ready"
		desc="Your pigment pack finished rendering."
	>
		<p class="text-sm">Download starts from the studio desk Downloads folder.</p>
		{#snippet actions({ close })}
			<button type="button" class="btn btn-primary cursor-pointer" onclick={close}>OK</button>
		{/snippet}
	</WashDialog>
</section>
