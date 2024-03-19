<script lang="ts">
	import { GameDataStatus, type GameData } from '$lib/types';
	import UpdateListButton from '$lib/components/UpdateListButton.svelte';
	import Score from './Score.svelte';
	import Status from './Status.svelte';
	import { user } from '$lib/stores/user';
	import * as Table from '$lib/components/ui/table';

	export let index: number;
	export let item: GameData;
	export let username: string;
	export let updateItem: (item: GameData) => void;

	$: item, updateItem(item);
</script>

<Table.Row>
	<Table.Cell class="w-0">{index + 1}</Table.Cell>
	<Table.Cell class="min-w-20">
		<a href="/game/{item.rawgId}" class="line-clamp-2 text-sm xs:text-base w-max">
			{item.title}
		</a>
	</Table.Cell>
	<Table.Cell class="w-0">
		<Status status={item.status} />
	</Table.Cell>
	<Table.Cell class="w-0">
		<div class="flex justify-center">
			<Score score={item.rating} isColored={false} />
		</div>
	</Table.Cell>

	{#if $user?.username === username}
		<Table.Cell class="w-0">
			<UpdateListButton bind:gameData={item} />
		</Table.Cell>
	{/if}
</Table.Row>
