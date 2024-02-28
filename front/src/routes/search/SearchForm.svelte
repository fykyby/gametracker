<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let initialQuery: string = '';
	let query = '';

	onMount(() => {
		query = initialQuery;
	});
</script>

<form action="/search/games/{query}/1" class="flex w-full gap-2">
	<Input type="text" placeholder="Search..." bind:value={query} />
	<Button type="submit" size="icon" class="flex-shrink-0">
		<Search />
	</Button>
</form>
