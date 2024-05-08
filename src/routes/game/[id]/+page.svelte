<script lang="ts">
	import type { PageData } from './$types';
	import * as Carousel from '$lib/components/ui/carousel';
	import Score from '$lib/components/Score.svelte';
	import UpdateListButton from '$lib/components/UpdateListButton.svelte';
	import { user } from '$lib/stores/user';
	import GamePageSection from '$lib/components/GamePageSection.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let data: PageData;
	const { game } = data;
</script>

<div class="flex gap-2 md:gap-3 justify-between">
	<div class="flex flex-col justify-center">
		<h1 class="line-clamp-3 hyphens-auto break-words">
			{game.name}
		</h1>

		{#if game.released}
			<span class="text-sm text-muted-foreground leading-none block -mt-1.5">{game.released}</span>
		{/if}
	</div>

	<div class="flex gap-2 md:gap-3 items-center">
		<Score score={game.metacritic} url={game.metacritic_url} />

		{#if $user}
			<UpdateListButton
				gameData={{
					rawgId: game.id,
					title: game.name,
					status: data.statusData.status,
					rating: data.statusData.rating
				}}
			/>
		{/if}
	</div>
</div>

<Carousel.Root class="w-full relative rounded-lg overflow-hidden mb-2">
	<Carousel.Content>
		{#each game.screenshots as screenshot, i (i)}
			<Carousel.Item class="basis-5/6 xs:basis-4/6 md:basis-1/2 h-64 md:h-80 lg:h-96">
				<div class="h-full">
					<img
						src={screenshot.image}
						alt={`${game.name} - Screenshot #${i + 1}`}
						class="w-full h-full rounded-lg object-cover"
						loading="lazy"
					/>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="absolute left-1" />
	<Carousel.Next class="absolute right-1" />
</Carousel.Root>

{#if game.genres.length > 0}
	<GamePageSection title="Genres">
		{#each game.genres as genre}
			<Badge variant="outline" class="text-sm xs:text-base">{genre.name}</Badge>
		{/each}
	</GamePageSection>
{/if}

{#if game.platforms.length > 0}
	<GamePageSection title="Platforms">
		{#each game.platforms as platform}
			<Badge variant="outline" class="text-sm xs:text-base">
				{platform.platform.name}
			</Badge>
		{/each}
	</GamePageSection>
{/if}

{#if game.description}
	<GamePageSection title="Description">
		<div
			bind:innerHTML={game.description}
			contenteditable="false"
			class="prose prose-invert max-w-none"
		/>
	</GamePageSection>
{/if}

{#if game.stores.length > 0}
	<GamePageSection title="Stores">
		{#each game.stores as store}
			<Badge variant="outline" class="text-sm xs:text-base">
				<a href={'//' + store.store.domain} target="_blank">{store.store.name}</a>
			</Badge>
		{/each}
	</GamePageSection>
{/if}

{#if game.developers.length > 0}
	<GamePageSection title="Developers">
		{#each game.developers as developer}
			<Badge variant="outline" class="text-sm xs:text-base">{developer.name}</Badge>
		{/each}
	</GamePageSection>
{/if}

{#if game.publishers.length > 0}
	<GamePageSection title="Publishers">
		{#each game.publishers as publisher}
			<Badge variant="outline" class="text-sm xs:text-base">{publisher.name}</Badge>
		{/each}
	</GamePageSection>
{/if}

{#if game.tags.length > 0}
	<GamePageSection title="Tags">
		{#each game.tags as tag}
			<Badge variant="outline" class="text-sm xs:text-base">{tag.name}</Badge>
		{/each}
	</GamePageSection>
{/if}
