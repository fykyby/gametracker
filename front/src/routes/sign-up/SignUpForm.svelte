<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { signUpSchema, type SignUpSchema } from '$lib/schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SignUpSchema>>;

	export let formElement: HTMLFormElement;

	const form = superForm(data, {
		dataType: 'json',
		validators: zodClient(signUpSchema)
	});

	const { form: formData, enhance } = form;

	function handleKeyDown(e: any) {
		if (e.key !== 'Enter') return;

		formElement.submit();
	}
</script>

<form bind:this={formElement} method="POST" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email Address</Form.Label>
			<Input {...attrs} on:keydown={handleKeyDown} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} on:keydown={handleKeyDown} bind:value={$formData.username} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input
				{...attrs}
				type="password"
				on:keydown={handleKeyDown}
				bind:value={$formData.password}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="passwordConfirm">
		<Form.Control let:attrs>
			<Form.Label>Confirm Password</Form.Label>
			<Input
				{...attrs}
				type="password"
				on:keydown={handleKeyDown}
				bind:value={$formData.passwordConfirm}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</form>
