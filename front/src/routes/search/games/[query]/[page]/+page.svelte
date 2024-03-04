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

<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-min">
	{#await data.results}
		<LoadingIndicator />
	{:then results}
		{#each results as result (result.id)}
			<GameSearchResult {result} />
		{/each}
	{:catch _}
		<ErrorAlert />
	{/await}
</ul>
