<script lang="ts">
	import { Button } from './ui/button';

	export let isColored: boolean = true;
	export let score: number | null = null;
	export let url: string | null = null;

	const classList: string = getClassList(score);

	function getClassList(rating: number | null): string {
		if (rating === null) return 'bg-muted text-foreground';

		if (rating < 40) {
			return 'bg-destructive text-destructive-foreground';
		} else if (rating >= 40 && rating < 70) {
			return 'bg-[--warning] text-[--warning-foreground]';
		} else return 'bg-[--success] text-[--success-foreground]';
	}
</script>

{#if url}
	<Button href={url} size="icon" target="_blank">
		<span
			class="h-10 w-10 text-lg font-semibold rounded-md flex flex-shrink-0 items-center justify-center {isColored
				? classList
				: 'bg-muted text-foreground'}"
		>
			{!score || score === 0 ? '-' : score}
		</span>
	</Button>
{:else}
	<span
		class="h-10 w-10 text-lg font-semibold rounded-md flex flex-shrink-0 items-center justify-center {isColored
			? classList
			: 'bg-muted text-foreground'}"
	>
		{!score || score === 0 ? '-' : score}
	</span>
{/if}
