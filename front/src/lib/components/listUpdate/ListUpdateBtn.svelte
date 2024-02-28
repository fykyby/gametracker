<script lang="ts">
	import { Scroll } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import ListUpdateDialog from './ListUpdateDialog.svelte';
	import type { GameData } from '$lib/types';

	export let gameData: GameData;
	let open = false;
</script>

<Button on:click={() => (open = true)} variant="secondary" size="icon">
	<Scroll />
</Button>

<ListUpdateDialog {gameData} bind:open />
