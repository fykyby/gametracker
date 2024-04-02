<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import type { PageData } from './$types';
	import { user } from '$lib/stores/user';
	import { setContext } from 'svelte';
	import UpdateListDialog from '$lib/components/UpdateListDialog.svelte';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	if (!data.user) {
		$user = undefined;
	} else {
		$user = {
			id: data.user.id,
			username: data.user.username
		};
	}

	setContext('signUpForm', data.signUpForm);
	setContext('logInForm', data.logInForm);
	setContext('updateListForm', data.updateListForm);
</script>

<svelte:head>
	<title>gametracker</title>
</svelte:head>

<Header />
<UpdateListDialog />

<main class="flex flex-col gap-2 md:gap-3 p-2 md:p-3 flex-grow w-full max-w-7xl mx-auto">
	<slot />
</main>
