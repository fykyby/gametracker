<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '../ui/button/button.svelte';

	export let open: boolean;
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>TODO_GAME_NAME</Dialog.Title>
		</Dialog.Header>
		<form method="POST" action="/game/TODO_GAME_ID?/update" use:enhance></form>

		<Dialog.Footer class="Footer">
			<Button on:click={() => (open = false)} variant="secondary">Cancel</Button>
			<Button>Submit</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
