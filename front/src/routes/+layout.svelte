<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import type { PageData } from './$types';
	import { user } from '$lib/stores/user';
	import { setContext } from 'svelte';

	export let data: PageData;

	if (!data.user) {
		$user = undefined;

		setContext('signUpForm', data.signUpForm);
		setContext('logInForm', data.logInForm);
	} else {
		$user = {
			id: data.user.id
		};
	}
</script>

<Header />

<main class="flex flex-col gap-2 p-2 flex-grow">
	<slot />
</main>
