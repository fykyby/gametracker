<script lang="ts">
	import { user } from '$lib/stores/user';
	import { Search } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import SignUpDialog from './SignUpDialog.svelte';
	import LogInDialog from './LogInDialog.svelte';
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
			<Button on:click={() => (formSignUpOpen = true)}>Sign Up</Button>
		{/if}
	</div>
</header>

{#if !$user}
	<LogInDialog bind:open={formLogInOpen} />
	<SignUpDialog bind:open={formSignUpOpen} />
{/if}
