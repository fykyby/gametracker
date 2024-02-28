<script>
	import ModalRegister from './ModalRegister.svelte';
	import Button from './ui/button/button.svelte';

	let modalRegisterOpen = false;
</script>

<header class="bg-zinc-900 p-2 flex gap-2 items-center">
	<div class="flex-grow">
		<Button href="/" variant="ghost" class="text-lg">gametracker</Button>
	</div>
	<div class="flex gap-2">
		<Button variant="secondary" href="/log-in">Log In</Button>
		<!-- <Button on:click={() => (modalRegisterOpen = true)}>Sign Up</Button> -->
		<Button href="/sign-up">Sign Up</Button>
	</div>
	<!-- <ModalRegister bind:open={modalRegisterOpen} /> -->
</header>
