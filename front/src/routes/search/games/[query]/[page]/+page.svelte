<script lang="ts">
	import SearchForm from '../../../../../lib/components/SearchForm.svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import MetaScore from '$lib/components/MetaScore.svelte';
	import { user } from '$lib/stores/user';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import UpdateListButton from '$lib/components/UpdateListButton.svelte';
	import AlertError from '$lib/components/AlertError.svelte';

	export let data: PageData;
</script>

<SearchForm initialQuery={data.query} />
<Separator />

<ul class="flex flex-col gap-2">
	{#await data.results}
		<LoadingIndicator />
	{:then results}
		{#each results as result (result.id)}
			<li class="h-28 border rounded-[--radius] flex">
				<div class="w-20 flex-shrink-0">
					<a href="/game/{result.id}">
						<img
							src={result.background_image ?? '/placeholder.png'}
							alt={result.name}
							class="object-cover w-full h-full rounded-l-[--radius]"
							loading="lazy"
						/>
					</a>
				</div>
				<div class="flex p-2 w-full flex-col">
					<Card.Title class="line-clamp-2">
						<a href="/game/{result.id}">{result.name}</a>
					</Card.Title>
					<Card.Description class="flex-grow">{result.released}</Card.Description>
					<div class="flex items-end justify-between">
						<MetaScore score={result.metacritic} />
						{#if $user}
							<UpdateListButton
								gameData={{
									rawgId: result.id,
									title: result.name,
									status: result.statusData.status,
									rating: result.statusData.rating
								}}
							/>
						{/if}
					</div>
				</div>
			</li>
		{/each}
	{:catch error}
		<AlertError message={error.message} />
	{/await}
</ul>
