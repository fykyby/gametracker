<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { updateListSchema, type UpdateListSchema } from '$lib/schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import AlertError from '$lib/components/AlertError.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getContext, onMount } from 'svelte';
	import LoadingIndicator from './LoadingIndicator.svelte';
	import { GameDataStatus, type GameData, possibleRatings } from '$lib/types';
	import getGameDataStatusKeys from '$lib/getGameDataStatusKeys';

	export let gameData: GameData;
	export let open: boolean;
	let loading = false;
	const data: SuperValidated<Infer<UpdateListSchema>> = getContext('updateListForm');

	const form = superForm(data, {
		validators: zodClient(updateListSchema),
		onSubmit() {
			loading = true;
		},
		onResult(e) {
			loading = false;
			if (e.result.type !== 'success') return;

			open = false;
		}
	});

	const { form: formData, message, enhance } = form;

	$: selectedStatus = {
		value: $formData.status,
		label: GameDataStatus[$formData.status]
	};

	$: selectedRating = {
		value: $formData.rating,
		label: $formData.rating > 0 ? $formData.rating.toString() : 'None'
	};

	onMount(() => {
		$formData.rawgId = gameData.rawgId;
		$formData.status = gameData.status;
		$formData.rating = gameData.rating;
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{gameData.title}</Dialog.Title>
		</Dialog.Header>

		{#if loading}
			<LoadingIndicator />
		{:else}
			<form method="POST" action="/actions/update-list" use:enhance>
				<Form.Field {form} name="status">
					<Form.Control let:attrs>
						<Form.Label>Status</Form.Label>
						<Select.Root
							selected={selectedStatus}
							onSelectedChange={(v) => {
								if (!v) return;

								$formData.status = v.value;
								if (v.value === GameDataStatus.None) $formData.rating = 0;
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value />
							</Select.Trigger>
							<Select.Content>
								{#each getGameDataStatusKeys() as key}
									<Select.Item value={GameDataStatus[key]}>{key}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				{#if selectedStatus.value !== GameDataStatus.None}
					<Form.Field {form} name="rating">
						<Form.Control let:attrs>
							<Form.Label>Rating</Form.Label>
							<Select.Root
								selected={selectedRating}
								onSelectedChange={(v) => {
									if (!v) return;

									$formData.rating = v.value;
								}}
							>
								<Select.Trigger {...attrs}>
									<Select.Value />
								</Select.Trigger>
								<Select.Content>
									{#each possibleRatings as r}
										<Select.Item value={r}>{r ? r : 'None'}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}

				{#if $message}
					<AlertError message={$message} />
				{/if}

				<div class="formFooter">
					<Button type="submit">Submit</Button>
					<Button variant="secondary" on:click={() => (open = false)}>Cancel</Button>
				</div>
			</form>
		{/if}
	</Dialog.Content>
</Dialog.Root>
