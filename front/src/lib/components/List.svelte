<script lang="ts">
	// import * as Table from '$lib/components/ui/table';
	import { user } from '$lib/stores/user';
	import { type GameData } from '$lib/types';
	import ListItem from './ListItem.svelte';

	export let listItems: GameData[];
</script>

<ul>
	{#each listItems as item, index (item.rawgId)}
		<ListItem {item} {index} />
	{/each}
</ul>
<!-- <Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-min">#</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head class="text-center">Rating</Table.Head>
			{#if $user}
				<Table.Head class="w-min"></Table.Head>
			{/if}
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each listItems as item, index (item.rawgId)}
			<ListItem {item} {index} />
		{/each}
	</Table.Body>
</Table.Root> -->
