import { RAWG_API_KEY, RAWG_URL } from '$env/static/private';
import { PUBLIC_SEARCH_PAGE_SIZE } from '$env/static/public';
import type { RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const searchRes = fetch(
		RAWG_URL +
			`/games?key=${RAWG_API_KEY}&page=${params.page}&page_size=${PUBLIC_SEARCH_PAGE_SIZE}&search=${params.query}`
	);

	let listItems: RecordModel[] = [];
	if (locals.user) {
		try {
			const list = await locals.pb
				.collection('lists')
				.getFirstListItem(`user.id = '${locals.user.id}'`);

			listItems = await locals.pb.collection('listItems').getFullList({
				filter: `list.id = '${list.id}'`
			});
		} catch (_) {
			listItems = [];
		}
	}

	return {
		query: params.query,
		results: searchRes
			.then((res) => res.json())
			.then((res) =>
				res.results.map((res: RecordModel) => {
					const itemIndex = listItems.findIndex((item) => item.rawgId === res.id);
					return {
						...res,
						statusData: {
							status: itemIndex > -1 ? listItems[itemIndex].status : 0,
							rating: itemIndex > -1 ? listItems[itemIndex].rating : 0
						}
					};
				})
			)
	};
};
