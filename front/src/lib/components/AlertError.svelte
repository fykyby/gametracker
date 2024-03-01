<script lang="ts">
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
	import * as Alert from '$lib/components/ui/alert';
	import getGenericErrorMessage from '$lib/getGenericErrorMessage';

	export let message: string = getGenericErrorMessage();
</script>

<Alert.Root variant="destructive" class="alert mt-2 mb-4">
	<AlertCircle class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>{message}</Alert.Description>
</Alert.Root>
