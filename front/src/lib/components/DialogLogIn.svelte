<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { logInSchema, type LogInSchema } from '$lib/schemas';
	import { getContext } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from './ui/input';
	import AlertError from '$lib/components/AlertError.svelte';
	import { Button } from './ui/button';
	import { user } from '$lib/stores/user';
	import LoadingIndicator from './LoadingIndicator.svelte';

	export let open: boolean;
	let loading = false;
	const data: SuperValidated<Infer<LogInSchema>> = getContext('logInForm');

	const form = superForm(data, {
		validators: zodClient(logInSchema),
		onSubmit: () => {
			loading = true;
		},
		onResult: async (e) => {
			loading = false;
			if (e.result.type !== 'success') return;

			$user = {
				id: e.result.data?.user.record.id
			};
			open = false;
		}
	});

	const { form: formData, message, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Log In</Dialog.Title>
		</Dialog.Header>

		{#if loading}
			<LoadingIndicator />
		{:else}
			<form method="POST" action="/actions/log-in" use:enhance>
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email Address</Form.Label>
						<Input {...attrs} bind:value={$formData.email} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input {...attrs} type="password" bind:value={$formData.password} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				{#if $message}
					<AlertError message={$message} />
				{/if}

				<div class="formFooter">
					<Button type="submit">Submit</Button>
					<Button variant="secondary" on:click={() => (open = false)}>Cancel</Button>
				</div>
			</form>
		{/if}
	</Dialog.Content>
</Dialog.Root>
