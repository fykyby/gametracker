<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { updateListSchema, type UpdateListSchema } from '$lib/schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getContext } from 'svelte';
	import LoadingIndicator from './LoadingIndicator.svelte';
	import { GameDataStatus, type GameData, possibleRatings } from '$lib/types';
	import getGameDataStatusKeys from '$lib/getGameDataStatusKeys';
	import formatPascalCase from '$lib/formatPascalCase';
	import { updateListDialog } from '$lib/stores/updateListDialog';

	const data: SuperValidated<Infer<UpdateListSchema>> = getContext('updateListForm');

	const form = superForm(data, {
		validators: zodClient(updateListSchema),
		dataType: 'json',
		invalidateAll: false,
		onResult(e) {
			if (e.result.type !== 'success') return;

			$updateListDialog.updateButtonGameData($formData as GameData);
			$updateListDialog.isOpen = false;
		},
		onError(e) {
			$message = e.result.error.message;
		}
	});

	const { form: formData, message, enhance, delayed } = form;

	$: selectedStatus = {
		value: $formData.status,
		label: formatPascalCase(GameDataStatus[$formData.status])
	};

	$: selectedRating = {
		value: $formData.rating,
		label: $formData.rating > 0 ? $formData.rating.toString() : 'None'
	};

	$: $updateListDialog.isOpen, onOpen();

	function onOpen() {
		$formData = $updateListDialog.gameData;
	}
</script>

{#if $updateListDialog.gameData}
	<Dialog.Root bind:open={$updateListDialog.isOpen} closeOnOutsideClick={false}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>{$updateListDialog.gameData.title}</Dialog.Title>
			</Dialog.Header>

			{#if $delayed}
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
										<Select.Item value={GameDataStatus[key]}>{formatPascalCase(key)}</Select.Item>
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
								disabled={selectedStatus.value === GameDataStatus.None}
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

					{#if $message}
						<ErrorAlert message={$message} />
					{/if}

					<div class="formFooter">
						<Button type="submit">Submit</Button>
						<Button variant="secondary" on:click={() => ($updateListDialog.isOpen = false)}
							>Cancel</Button
						>
					</div>
				</form>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
{/if}
