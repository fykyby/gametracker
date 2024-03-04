<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import type { PageData } from './$types';
	import { user } from '$lib/stores/user';
	import { setContext } from 'svelte';
	import UpdateListDialog from '$lib/components/UpdateListDialog.svelte';

	export let data: PageData;

	if (!data.user) {
		$user = undefined;
	} else {
		$user = {
			id: data.user.id
		};
	}

	setContext('signUpForm', data.signUpForm);
	setContext('logInForm', data.logInForm);
	setContext('updateListForm', data.updateListForm);
</script>

<Header />
<UpdateListDialog />

<main class="flex flex-col gap-2 p-2 flex-grow w-full max-w-7xl mx-auto">
	<slot />
</main>
