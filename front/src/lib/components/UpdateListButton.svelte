<script lang="ts">
	import { Scroll, ScrollText } from 'lucide-svelte';
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

<Button on:click={openDialog} variant="secondary" size="icon">
	{#if gameData.status !== GameDataStatus.None}
		<ScrollText />
	{:else}
		<Scroll />
	{/if}
</Button>
