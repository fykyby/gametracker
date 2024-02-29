<script lang="ts">
	import { Scroll } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import type { GameData } from '$lib/types';
	import UpdateListDialog from './UpdateListDialog.svelte';

	export let gameData: GameData;
	let open = false;
</script>

<Button on:click={() => (open = true)} variant="secondary" size="icon">
	<Scroll />
</Button>

<UpdateListDialog bind:open {gameData} />
