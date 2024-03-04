<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { logInSchema, type LogInSchema } from '$lib/schemas';
	import { getContext } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from './ui/input';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import { Button } from './ui/button';
	import { user } from '$lib/stores/user';
	import LoadingIndicator from './LoadingIndicator.svelte';

	export let open: boolean;
	const data: SuperValidated<Infer<LogInSchema>> = getContext('logInForm');

	const form = superForm(data, {
		validators: zodClient(logInSchema),
		onResult(e) {
			if (e.result.type !== 'success') return;

			$user = {
				id: e.result.data?.user.record.id
			};
			open = false;
		},
		onError(e) {
			$message = e.result.error.message;
		}
	});
	const { form: formData, message, enhance, delayed } = form;
</script>

<Dialog.Root bind:open closeOnOutsideClick={false}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Log In</Dialog.Title>
		</Dialog.Header>

		{#if $delayed}
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
					<ErrorAlert message={$message} />
				{/if}

				<div class="formFooter">
					<Button type="submit">Submit</Button>
					<Button variant="secondary" on:click={() => (open = false)}>Cancel</Button>
				</div>
			</form>
		{/if}
	</Dialog.Content>
</Dialog.Root>
