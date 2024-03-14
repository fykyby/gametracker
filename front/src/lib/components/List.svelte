<script lang="ts">
	import { GameDataStatus, type GameData } from '$lib/types';
	import ListItem from './ListItem.svelte';
	import Input from './ui/input/input.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import getGameDataStatusKeys from '$lib/getGameDataStatusKeys';
	import formatPascalCase from '$lib/formatPascalCase';
	import * as Table from '$lib/components/ui/table';
	import { user } from '$lib/stores/user';

	export let listItems: GameData[];
	export let username: string;

	let searchQuery: string = '';
	let filteredStatus: GameDataStatus = GameDataStatus.None;

	$: filteredListItems = listItems.filter((item) => {
		const isSearchResult = item.title.toLowerCase().includes(searchQuery.toLowerCase());
		if (filteredStatus === GameDataStatus.None) return isSearchResult;

		const isFilteredStatus = item.status === filteredStatus;
		return isSearchResult && isFilteredStatus;
	});

	function deleteItem(index: number) {
		listItems.splice(index, 1);
		listItems = listItems;
	}

	function handleFilteredStatusChange(e: string | undefined) {
		const newStatus = e as keyof typeof GameDataStatus;
		filteredStatus = GameDataStatus[newStatus];
	}
</script>

<Input type="search" placeholder="Search..." bind:value={searchQuery} />

<Tabs.Root
	value={GameDataStatus[filteredStatus]}
	onValueChange={handleFilteredStatusChange}
	class="overflow-auto"
>
	<Tabs.List>
		{#each getGameDataStatusKeys() as key}
			<Tabs.Trigger value={key}>{key === 'None' ? 'All' : formatPascalCase(key)}</Tabs.Trigger>
		{/each}
	</Tabs.List>
</Tabs.Root>

<Table.Root class="w-full">
	<Table.Header>
		<Table.Row>
			<Table.Head>#</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Rating</Table.Head>
			{#if $user?.username === username}
				<Table.Head></Table.Head>
			{/if}
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each filteredListItems as item, index (item.rawgId)}
			<ListItem {item} {index} {deleteItem} {username} />
		{/each}
	</Table.Body>
</Table.Root>
