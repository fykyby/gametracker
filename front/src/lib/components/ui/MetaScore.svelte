<script lang="ts">
	export let score: number | null;

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

<span
	class="h-8 w-8 p-1 rounded-[--radius] flex flex-shrink-0 items-center justify-center {classList}"
>
	{score ?? '-'}
</span>
