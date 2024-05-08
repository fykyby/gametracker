import { RAWG_API_KEY, RAWG_URL } from '$env/static/private';
import type { Game } from '$lib/types';
import type { RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const [dataRes, screenshotsRes] = await Promise.all([
		fetch(RAWG_URL + `/games/${params.id}?key=${RAWG_API_KEY}`),
		fetch(RAWG_URL + `/games/${params.id}/screenshots?key=${RAWG_API_KEY}`)
	]);
	const data: Game = await dataRes.json();
	const screenshots = await screenshotsRes.json();

	data.screenshots = [{ image: data.background_image }, ...screenshots.results];

	let listItem: RecordModel | null = null;
	if (locals.user) {
		try {
			listItem = await locals.pb
				.collection('listItems')
				.getFirstListItem(`user.id = '${locals.user.id}' && rawgId = '${params.id}'`);
		} catch (_) {
			listItem = null;
		}
	}

	return {
		game: data,
		statusData: {
			status: listItem ? listItem.status : 0,
			rating: listItem ? listItem.rating : 0
		}
	};
};
