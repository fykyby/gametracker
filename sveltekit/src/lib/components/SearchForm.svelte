<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let initialQuery: string = '';
	export let buttonVariantDefault: boolean = true;

	let query: string = '';

	onMount(() => {
		query = initialQuery;
	});
</script>

<h1>Search {initialQuery ? `- ${initialQuery}` : ''}</h1>

<form action="/search/games/{query}/1" class="flex flex-row w-full gap-2 md:gap-3 flex-nowrap">
	<Input type="search" required placeholder="Search..." bind:value={query} />

	<Button
		type="submit"
		size="icon"
		variant={buttonVariantDefault ? 'default' : 'secondary'}
		aria-label="search"
	>
		<Search />
	</Button>
</form>
