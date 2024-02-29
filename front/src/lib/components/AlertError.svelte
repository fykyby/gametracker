<script lang="ts">
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
	import * as Alert from '$lib/components/ui/alert';

	export let message: string = 'An unknown error has occurred.';
</script>

<Alert.Root variant="destructive" class="alert my-2">
	<AlertCircle class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>{message}</Alert.Description>
</Alert.Root>
