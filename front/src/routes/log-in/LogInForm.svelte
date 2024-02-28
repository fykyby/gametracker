<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { logInSchema, type LogInSchema } from '$lib/schemas';
	import AlertError from '$lib/components/ui/AlertError.svelte';

	export let data: SuperValidated<Infer<LogInSchema>>;
	export let formElement: HTMLFormElement;

	const form = superForm(data, {
		dataType: 'json',
		validators: zodClient(logInSchema)
	});

	const { form: formData, message, enhance } = form;

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

	{#if $message}
		<AlertError message={$message} />
	{/if}
</form>
