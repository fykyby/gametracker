<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '../ui/button/button.svelte';
	import { type GameData } from '$lib/types';

	import ListUpdateForm from './ListUpdateForm.svelte';

	export let gameData: GameData;
	export let open: boolean;

	let formElement: HTMLFormElement;
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{gameData.title}</Dialog.Title>
		</Dialog.Header>

		<ListUpdateForm {gameData} bind:formElement />

		<Dialog.Footer class="Footer">
			<Button on:click={() => formElement.submit()}>Submit</Button>
			<Button on:click={() => (open = false)} variant="secondary">Cancel</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
