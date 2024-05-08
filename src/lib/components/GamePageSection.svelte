<script lang="ts">
	export let title: string;
</script>

<section>
	<h2 class="text-xl border-b pb-2 md:pb-1.5">{title}</h2>
	<div class="py-2 md:py-3 flex flex-wrap gap-1 md:gap-2">
		<slot />
	</div>
</section>
