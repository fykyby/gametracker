import { RAWG_API_KEY, RAWG_URL } from '$env/static/private';
import { PUBLIC_SEARCH_PAGE_SIZE } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const searchRes = fetch(
		RAWG_URL +
			`/games?key=${RAWG_API_KEY}&page=${params.page}&page_size=${PUBLIC_SEARCH_PAGE_SIZE}&search=${params.query}`
	);

	let listItems: Array<any> = [];
	if (locals.user) {
		try {
			const list = (
				await locals.pb.collection('lists').getList(1, 1, {
					filter: `user.id = '${locals.user.id}'`
				})
			).items[0];

			const items = await locals.pb.collection('listItems').getFullList({
				filter: `list.id = '${list.id}'`
			});

			listItems = items;
		} catch (err) {
			listItems = [];
		}
	}

	return {
		query: params.query,
		results: searchRes
			.then((res) => res.json())
			.then((res) =>
				res.results.map((res: any) => {
					const itemIndex = listItems.findIndex((item) => parseInt(item.rawgId) === res.id);
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
