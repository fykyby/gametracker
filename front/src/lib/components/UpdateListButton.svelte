<script lang="ts">
	import { ScrollText, Plus } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { GameDataStatus, type GameData } from '$lib/types';
	import { updateListDialog } from '$lib/stores/updateListDialog';

	export let gameData: GameData;

	function openDialog() {
		$updateListDialog.isOpen = true;
		$updateListDialog.gameData = gameData;
		$updateListDialog.updateButtonGameData = (newGameData) => {
			gameData = newGameData;
		};
	}
</script>

<Button
	on:click={openDialog}
	size="icon"
	variant="default"
	aria-label="update item status on your list"
>
	{#if gameData.status === GameDataStatus.None}
		<Plus />
	{:else}
		<ScrollText />
	{/if}
</Button>
