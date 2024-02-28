<script lang="ts">
	import SearchForm from '../../../SearchForm.svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import MetaScore from '$lib/components/ui/MetaScore.svelte';
	import ListUpdateBtn from '$lib/components/listUpdate/ListUpdateBtn.svelte';
	import { user } from '$lib/stores/user';

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
						src={result.background_image ?? '/placeholder.png'}
						alt={result.name}
						class="object-cover w-full h-full rounded-l-[--radius]"
					/>
				</div>
				<div class="flex p-2 w-full flex-col">
					<Card.Title class="line-clamp-2">
						<a href="/game/{result.id}">{result.name}</a>
					</Card.Title>
					<Card.Description class="flex-grow">{result.released}</Card.Description>
					<div class="flex items-end justify-between">
						<MetaScore score={result.metacritic} />
						{#if $user}
							<ListUpdateBtn />
						{/if}
					</div>
				</div>
				<!-- <div class="outline"> -->
				<!-- <form method="POST" action="/game/{result.id}?/update" use:enhance>
							<button type="submit">sbm</button>
						</form> -->
				<!-- </div> -->
			</li>
		{/each}
	{/await}
</ul>
