<script lang="ts">
	import SearchForm from '../../../../../lib/components/SearchForm.svelte';
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import GameSearchResult from '$lib/components/GameSearchResult.svelte';

	export let data: PageData;
</script>

<SearchForm initialQuery={data.query} buttonVariantDefault={false} />
<Separator />

<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 h-full">
	{#await data.results}
		<LoadingIndicator />
	{:then results}
		{#if results.length === 0}
			<p class="grid place-items-center col-span-full h-full text-muted-foreground">
				No results found.
			</p>
		{:else}
			{#each results as result (result.id)}
				<GameSearchResult {result} />
			{/each}
		{/if}
	{:catch _}
		<ErrorAlert />
	{/await}
</ul>
