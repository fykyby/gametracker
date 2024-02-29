<!-- <script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import LogInForm from './LogInForm.svelte';

	export let data: any;

	let formElement: HTMLFormElement;
</script>

<div class="min-h-full flex flex-col justify-center">
	<Card.Root class="w-full max-w-xl mx-auto">
		<Card.Header>
			<Card.Title>
				<h1>Log In</h1>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<LogInForm data={data.form} bind:formElement />
		</Card.Content>

		<Card.Footer class="flex justify-end">
			<Button on:click={() => formElement.submit()}>Submit</Button>
		</Card.Footer>
	</Card.Root>
</div> -->
