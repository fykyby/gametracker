<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main class="flex flex-col gap-2 p-2 flex-grow">
	<slot />
</main>
