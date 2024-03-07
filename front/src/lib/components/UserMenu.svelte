<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { User } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores/user';

	let logOutButton: HTMLButtonElement;
</script>

{#if $user}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button variant="ghost" size="icon" builders={[builder]}>
				<User />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item href="/user/{$user.username}">Profile</DropdownMenu.Item>
				<DropdownMenu.Item href="/user/{$user.username}/list">List</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => logOutButton.click()}>
					Log Out
					<form
						method="POST"
						action="/actions/log-out"
						class="hidden"
						aria-hidden="true"
						hidden
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') {
									$user = undefined;
								}
							};
						}}
					>
						<button bind:this={logOutButton} type="submit">Log Out</button>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
