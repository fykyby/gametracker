<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { signUpSchema, type SignUpSchema } from '$lib/schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import AlertError from '$lib/components/AlertError.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getContext } from 'svelte';
	import { user } from '$lib/stores/user';

	export let open: boolean;
	let loading: boolean = false;
	const data: SuperValidated<Infer<SignUpSchema>> = getContext('signUpForm');

	const form = superForm(data, {
		validators: zodClient(signUpSchema),
		onSubmit: () => {
			loading = true;
		},
		onResult: async (e) => {
			loading = false;
			if (e.result.type !== 'success') return;

			$user = {
				id: e.result.data?.user.id
			};
			open = false;
		}
	});

	const { form: formData, message, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Sign Up</Dialog.Title>
		</Dialog.Header>

		<form method="POST" use:enhance action="/actions/sign-up">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email Address</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input {...attrs} bind:value={$formData.username} />
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

			<Form.Field {form} name="passwordConfirm">
				<Form.Control let:attrs>
					<Form.Label>Confirm Password</Form.Label>
					<Input {...attrs} type="password" bind:value={$formData.passwordConfirm} />
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
	</Dialog.Content>
</Dialog.Root>
