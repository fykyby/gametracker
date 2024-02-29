<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let initialQuery: string = '';
	let query: string = '';

	onMount(() => {
		query = initialQuery;
	});
</script>

<form action="/search/games/{query}/1" class="flex flex-row w-full gap-2 flex-nowrap">
	<Input type="text" required placeholder="Search..." bind:value={query} />
	<Button type="submit" size="icon" class="flex-shrink-0">
		<Search />
	</Button>
</form>
