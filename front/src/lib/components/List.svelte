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

	type SortableColumn = 'title' | 'status' | 'rating';

	let searchQuery: string = '';
	let filteredStatus: GameDataStatus = GameDataStatus.None;
	let sortedBy: { value: SortableColumn; reversed: boolean } = {
		value: 'title',
		reversed: false
	};

	$: filteredListItems = listItems.filter((item) => {
		const isSearchResult = item.title.toLowerCase().includes(searchQuery.toLowerCase());
		if (filteredStatus === GameDataStatus.None) return isSearchResult;

		const isFilteredStatus = item.status === filteredStatus;
		return isSearchResult && isFilteredStatus;
	});

	function updateItem(item: GameData) {
		const index: number = listItems.findIndex((i) => i.rawgId === item.rawgId);

		if (listItems[index].status === item.status && listItems[index].rating === item.rating) return;

		if (item.status === GameDataStatus.None) {
			deleteItem(index);
			return;
		}

		listItems[index] = item;
		listItems = listItems;
	}

	function deleteItem(index: number) {
		listItems.splice(index, 1);
		listItems = listItems;
	}

	function handleFilteredStatusChange(e: string | undefined) {
		const newStatus = e as keyof typeof GameDataStatus;
		filteredStatus = GameDataStatus[newStatus];
	}

	function handleSort(column: SortableColumn) {
		const previousSortedBy = sortedBy;

		sortedBy = {
			value: column,
			reversed: previousSortedBy.value === column && previousSortedBy.reversed === false
		};

		let sortedItems: GameData[] = [];
		switch (column) {
			case 'title':
				sortedItems = filteredListItems.toSorted((a, b) => a.title.localeCompare(b.title, 'en'));
			case 'status':
				sortedItems = filteredListItems.toSorted((a, b) => a.status - b.status);
			case 'rating':
				sortedItems = filteredListItems.toSorted((a, b) => a.rating - b.rating);
		}

		console.log(filteredListItems);
		if (sortedBy.reversed) sortedItems.reverse();
		filteredListItems = sortedItems;
	}
</script>

<Input type="search" placeholder="Search..." bind:value={searchQuery} />

<Tabs.Root
	value={GameDataStatus[filteredStatus]}
	onValueChange={handleFilteredStatusChange}
	class="overflow-x-auto"
>
	<Tabs.List class="h-auto">
		{#each getGameDataStatusKeys() as key}
			<Tabs.Trigger value={key} class="md:text-lg">
				{key === 'None' ? 'All' : formatPascalCase(key)}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
</Tabs.Root>

<Table.Root class="w-full">
	<Table.Header>
		<Table.Row class="hover:bg-transparent">
			<Table.Head class="select-none">#</Table.Head>
			<Table.Head>
				<button on:click={() => handleSort('title')} class="w-full h-full text-left">
					Title
				</button>
			</Table.Head>
			<Table.Head>
				<button on:click={() => handleSort('status')} class="w-full h-full text-left">
					Status
				</button>
			</Table.Head>
			<Table.Head>
				<button on:click={() => handleSort('rating')} class="w-full h-full text-left">
					Rating
				</button>
			</Table.Head>

			{#if $user?.username === username}
				<Table.Head></Table.Head>
			{/if}
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each filteredListItems as item, index (item.rawgId)}
			<ListItem {item} {index} {updateItem} {username} />
		{/each}
	</Table.Body>
</Table.Root>
