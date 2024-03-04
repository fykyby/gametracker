<script lang="ts">
	import { user } from '$lib/stores/user';
	import { Search } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import SignUpDialog from './SignUpDialog.svelte';
	import LogInDialog from './LogInDialog.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let formSignUpOpen: boolean = false;
	let formLogInOpen: boolean = false;
</script>

<header class="border-b shadow">
	<div
		class="w-full flex flex-col mn:flex-row p-2 md:p-3 gap-2 md:gap-3 items-center max-w-7xl mx-auto"
	>
		<div class="flex-grow">
			<Button href="/" variant="ghost" class="text-xl md:text-2xl">gametracker</Button>
		</div>
		<div class="flex gap-2">
			{#if !$page.url.pathname.includes('/search')}
				<Button variant="secondary" size="icon" href="/search">
					<Search />
				</Button>
			{/if}

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
	</div>
</header>

{#if !$user}
	<LogInDialog bind:open={formLogInOpen} />
	<SignUpDialog bind:open={formSignUpOpen} />
{/if}
