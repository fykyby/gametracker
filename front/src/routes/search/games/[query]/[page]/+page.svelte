<script lang="ts">
	import SearchForm from '../../../SearchForm.svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import MetaScore from '$lib/components/ui/MetaScore.svelte';

	export let data: PageData;
</script>

<SearchForm initialQuery={data.query} />
<Separator />

<ul class="flex flex-col gap-2">
	{#await data.results}
		<!-- TODO: loader -->
		Loading
	{:then results}
		{#each results as result (result.id)}
			<li class="h-28 border rounded-[--radius] flex">
				<div class="w-20 flex-shrink-0">
					<img
						src={result.background_image}
						alt={result.name}
						class="object-cover w-full h-full rounded-l-[--radius]"
					/>
				</div>
				<div class="flex p-2 w-full justify-between">
					<div class="flex flex-col">
						<Card.Title class="line-clamp-2">
							<a href="/game/{result.id}">{result.name}</a>
						</Card.Title>
						<Card.Description class="flex-grow">{result.released}</Card.Description>
						<div class="">
							<MetaScore score={result.metacritic} />
						</div>
					</div>
					<div>
						<!-- TODO: HERE GOES STATUS BTN -->
					</div>
				</div>
			</li>
		{/each}
	{/await}
</ul>
