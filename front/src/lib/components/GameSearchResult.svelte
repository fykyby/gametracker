<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import MetaScore from './MetaScore.svelte';
	import UpdateListButton from '$lib/components/UpdateListButton.svelte';
	import type { GameDataRating, GameDataStatus } from '$lib/types';
	import { user } from '$lib/stores/user';

	type GameResult = {
		id: number;
		name: string;
		background_image: string | null;
		released: string | null;
		metacritic: number | null;
		statusData: {
			status: GameDataStatus;
			rating: GameDataRating;
		};
	};

	export let result: GameResult;
</script>

<li>
	<Card.Root class="overflow-hidden group">
		<Card.Content class="p-0 relative overflow-hidden">
			{#if result.metacritic}
				<div class="absolute left-0 m-2 shadow-sm z-10">
					<MetaScore score={result.metacritic} />
				</div>
			{/if}

			{#if $user}
				<div class="absolute right-0 m-2 shadow-sm z-10">
					<UpdateListButton
						gameData={{
							rawgId: result.id,
							title: result.name,
							status: result.statusData.status,
							rating: result.statusData.rating
						}}
					/>
				</div>
			{/if}

			<a href="/game/{result.id}" class="">
				<img
					src={result.background_image ?? '/placeholder.png'}
					alt={result.name}
					class="object-cover w-full h-64 rounded-t-[--radius] group-hover:scale-105 transition-transform"
					loading="lazy"
				/>
			</a>
		</Card.Content>

		<a href="/game/{result.id}">
			<Card.Header class="p-4 flex flex-row justify-between">
				<div class="truncate">
					<Card.Title class="truncate">{result.name}</Card.Title>
					<Card.Description class="truncate leading-none">{result.released ?? '-'}</Card.Description
					>
				</div>
			</Card.Header>
		</a>
	</Card.Root>
</li>
