<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let initialQuery: string = '';
	export let autoFocus: boolean = false;
	export let buttonVariantDefault: boolean = true;

	let query: string = '';

	onMount(() => {
		query = initialQuery;
	});
</script>

<form action="/search/games/{query}/1" class="flex flex-row w-full gap-2 flex-nowrap">
	{#if autoFocus}
		<Input type="text" required placeholder="Search..." bind:value={query} autofocus />
	{:else}
		<Input type="text" required placeholder="Search..." bind:value={query} />
	{/if}

	<Button type="submit" size="icon" variant={buttonVariantDefault ? 'default' : 'secondary'}>
		<Search />
	</Button>
</form>
