<script lang="ts">
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import List from '$lib/components/List.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if !data.userExists}
	<ErrorAlert message="User not found." />
{:else}
	<h1>{data.username}'s list</h1>

	<List listItems={data.listItems} username={data.username} />
{/if}
