<script lang="ts">
	import formatPascalCase from '$lib/formatPascalCase';
	import { GameDataStatus } from '$lib/types';
	import Badge from './ui/badge/badge.svelte';

	export let status: GameDataStatus;
</script>

<Badge variant="outline" class="whitespace-nowrap xs:text-base bg-muted text-foreground">
	{formatPascalCase(GameDataStatus[status])}
</Badge>
