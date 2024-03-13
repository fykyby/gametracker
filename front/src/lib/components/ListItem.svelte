<script lang="ts">
	import { GameDataStatus, type GameData } from '$lib/types';
	import UpdateListButton from '$lib/components/UpdateListButton.svelte';
	import Score from './Score.svelte';
	import Status from './Status.svelte';

	export let index: number;
	export let item: GameData;
	export let deleteItem: (index: number) => void;

	$: item, deleteIfStatusNone(item, index);

	function deleteIfStatusNone(item: GameData, index: number) {
		if (item.status !== GameDataStatus.None) return;

		deleteItem(index);
	}
</script>

<li class="flex py-8 gap-2 md:gap-4 xs:px-2 h-14 items-center border-b first:border-t">
	<span>{index + 1}.</span>
	<span class="flex-grow line-clamp-2 text-sm xs:text-base">{item.title}</span>
	<span>
		<Status status={item.status} />
	</span>
	<span>
		<Score score={item.rating} isColored={false} />
	</span>
	<UpdateListButton bind:gameData={item} />
</li>
