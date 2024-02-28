<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import type { PageData } from './$types';
	import { user } from '$lib/stores/user';
	import { updateListForm } from '$lib/stores/updateListForm';

	export let data: PageData;

	if (!data.user) {
		$user = undefined;
	} else {
		$user = {
			id: data.user.id
		};
	}

	$updateListForm = data.updateListForm;
</script>

<Header />

<main class="flex flex-col gap-2 p-2 flex-grow">
	<slot />
</main>
