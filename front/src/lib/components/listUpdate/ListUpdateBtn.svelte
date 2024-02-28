<script>
	import { Scroll } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import ListUpdateDialog from './ListUpdateDialog.svelte';

	let open = false;
</script>

<Button on:click={() => (open = true)} variant="secondary" size="icon">
	<Scroll />
</Button>

<ListUpdateDialog bind:open />
