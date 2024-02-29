<script lang="ts">
	import { user } from '$lib/stores/user';
	import { Search } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import DialogSignUp from './DialogSignUp.svelte';
	import DialogLogIn from './DialogLogIn.svelte';
	import { enhance } from '$app/forms';

	let formSignUpOpen: boolean = false;
	let formLogInOpen: boolean = false;
</script>

<header class="p-2 flex gap-2 items-center border-b shadow">
	<div class="flex-grow">
		<Button href="/" variant="ghost" class="text-lg">gametracker</Button>
	</div>
	<div class="flex gap-2">
		<Button variant="secondary" size="icon" href="/search">
			<Search />
		</Button>

		{#if $user}
			<form
				method="POST"
				action="/actions/log-out"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success') {
							$user = undefined;
						}
					};
				}}
			>
				<Button variant="secondary" type="submit">Log Out</Button>
			</form>
		{:else}
			<Button variant="secondary" on:click={() => (formLogInOpen = true)}>Log In</Button>
			<DialogLogIn bind:open={formLogInOpen} />

			<Button on:click={() => (formSignUpOpen = true)}>Sign Up</Button>
			<DialogSignUp bind:open={formSignUpOpen} />
		{/if}
	</div>
</header>
