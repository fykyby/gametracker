<script lang="ts">
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import List from '$lib/components/List.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if !data.user}
	<ErrorAlert message="User not found." />
{:else}
	<h1>{data.user.username}'s list</h1>

	<List listItems={data.listItems} />
{/if}
