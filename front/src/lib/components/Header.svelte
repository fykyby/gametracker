<script lang="ts">
	import { user } from '$lib/stores/user';
	import { Search } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
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
			<form method="POST" action="/log-out">
				<Button variant="secondary" type="submit">Log Out</Button>
			</form>
		{:else}
			<Button variant="secondary" href="/log-in">Log In</Button>
			<Button href="/sign-up">Sign Up</Button>
		{/if}
	</div>
</header>
