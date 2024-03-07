<script lang="ts">
	import { GameDataStatus, type GameData } from '$lib/types';
	import formatPascalCase from '$lib/formatPascalCase';
	import UpdateListButton from '$lib/components/UpdateListButton.svelte';
	import { user } from '$lib/stores/user';
	import { Badge } from '$lib/components/ui/badge';

	export let index: number;
	export let item: GameData;

	// TODO: if status is none, call export function to delete it from list
	$: item, console.log(item);
</script>

<li class="flex gap-2 md:gap-3 h-14 items-center">
	<span>{index + 1}.</span>
	<span class="flex-grow line-clamp-2">{item.title}</span>
	<span>
		<Badge variant="outline" class="whitespace-nowrap">
			{formatPascalCase(GameDataStatus[item.status])}
		</Badge>
	</span>
	<span>
		<Badge variant="outline">
			{item.rating > 0 ? item.rating : '-'}
		</Badge>
	</span>
	<UpdateListButton bind:gameData={item} />
</li>
<!-- <Table.Row class="h-16">
	<Table.Cell>{index + 1}</Table.Cell>

	<Table.Cell>{item.title}</Table.Cell>

	<Table.Cell class="whitespace-nowrap">
		<Badge variant="outline">
			{formatPascalCase(GameDataStatus[item.status])}
		</Badge>
	</Table.Cell>

	<Table.Cell class="text-center">
		<Badge variant="outline">
			{item.rating !== 0 ? item.rating : '-'}
		</Badge>
	</Table.Cell>

	{#if $user}
		<Table.Cell class="w-full flex justify-end">
			<UpdateListButton bind:gameData={item} />
		</Table.Cell>
	{/if}
</Table.Row> -->
