<script lang="ts">
	import { type GameData } from '$lib/types';
	import ListItem from './ListItem.svelte';

	export let listItems: GameData[];
	export let username: string;

	function deleteItem(index: number) {
		listItems.splice(index, 1);
		listItems = listItems;
	}
</script>

<ul class="flex flex-col">
	{#each listItems as item, index (item.rawgId)}
		<ListItem {item} {index} {deleteItem} {username} />
	{/each}
</ul>
