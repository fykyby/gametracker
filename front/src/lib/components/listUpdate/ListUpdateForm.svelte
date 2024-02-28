<script lang="ts">
	import { possibleRatings, type GameData, GameDataStatus } from '$lib/types';
	import * as Select from '$lib/components/ui/select';
	import * as Form from '$lib/components/ui/form';
	import getGameDataStatusKeys from '$lib/getGameDataStatusKeys';
	import formatPascalCase from '$lib/formatPascalCase';
	import { updateListSchema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { updateListForm } from '$lib/stores/updateListForm';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let gameData: GameData;
	export let formElement: HTMLFormElement;

	const form = superForm($updateListForm, {
		dataType: 'json',
		validators: zodClient(updateListSchema),
		invalidateAll: false,
		applyAction: false,
		resetForm: false
	});

	const { form: formData, message, enhance } = form;

	$: selectedStatus = $formData.status
		? {
				value: $formData.status,
				label: formatPascalCase($formData.status.toString())
			}
		: undefined;

	$: selectedRating = $formData.rating
		? {
				value: $formData.rating,
				label: $formData.rating.toString()
			}
		: undefined;

	async function submit() {
		// action="/game/{gameData.rawgId}?/update"
		const newFormData = new FormData();
		newFormData.append('status', $formData.status.toString());
		newFormData.append('rating', $formData.rating.toString());

		const res = await fetch(`/game/${gameData.rawgId}?/update`, {
			body: newFormData,
			method: 'POST'
		});

		console.log(await res);
	}
</script>

<form bind:this={formElement} on:submit|preventDefault={submit}>
	<Form.Field {form} name="status">
		<Form.Control let:attrs>
			<Form.Label>Status</Form.Label>
			<Select.Root
				selected={selectedStatus}
				onSelectedChange={(v) => {
					v && ($formData.status = v.value);
				}}
			>
				<Select.Trigger>
					<Select.Value />
				</Select.Trigger>
				<Select.Content>
					{#each getGameDataStatusKeys() as statusKey}
						<Select.Item value={statusKey}>{formatPascalCase(statusKey)}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="rating">
		<Form.Control let:attrs>
			<Form.Label>Rating</Form.Label>
			<Select.Root
				selected={selectedRating}
				onSelectedChange={(v) => {
					v && ($formData.rating = v.value);
				}}
			>
				<Select.Trigger>
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
</form>
