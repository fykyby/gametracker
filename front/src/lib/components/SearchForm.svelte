<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let initialQuery: string = '';
	export let autofocus: boolean = false;
	let query: string = '';

	onMount(() => {
		query = initialQuery;
	});
</script>

<form action="/search/games/{query}/1" class="flex flex-row w-full gap-2 flex-nowrap">
	{#if autofocus}
		<Input type="text" required placeholder="Search..." bind:value={query} autofocus />
	{:else}
		<Input type="text" required placeholder="Search..." bind:value={query} />
	{/if}

	<Button type="submit" size="icon" class="flex-shrink-0">
		<Search />
	</Button>
</form>
