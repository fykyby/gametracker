<script lang="ts">
	import { Scroll, ScrollText } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { GameDataStatus, type GameData } from '$lib/types';
	import UpdateListDialog from './UpdateListDialog.svelte';

	export let gameData: GameData;
	let open = false;
</script>

<Button on:click={() => (open = true)} variant="secondary" size="icon">
	{#if gameData.status !== GameDataStatus.None}
		<ScrollText />
	{:else}
		<Scroll />
	{/if}
</Button>

<UpdateListDialog bind:open {gameData} />
