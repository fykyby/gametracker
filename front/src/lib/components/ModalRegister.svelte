<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Button } from './ui/button';
	import { Input } from './ui/input';

	export let open: boolean;
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Sign Up</Dialog.Title>
		</Dialog.Header>

		<!-- <form method="POST" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</form> -->

		<Dialog.Footer>
			<Button type="submit">Confirm</Button>
			<Button type="submit" variant="secondary" on:click={() => (open = false)}>Cancel</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
