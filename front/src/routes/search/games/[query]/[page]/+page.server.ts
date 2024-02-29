import { RAWG_API_KEY, RAWG_URL } from '$env/static/private';
import { PUBLIC_SEARCH_PAGE_SIZE } from '$env/static/public';
import type { PageServerLoad, RouteParams } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	async function getResults(params: RouteParams): Promise<any> {
		try {
			const searchRes = await fetch(
				RAWG_URL +
					`/games?key=${RAWG_API_KEY}&page=${params.page}&page_size=${PUBLIC_SEARCH_PAGE_SIZE}&search=${params.query}`
			);
			const searchData = await searchRes.json();

			return searchData.results;
		} catch (err) {
			console.log(err);
		}
	}

	return {
		query: params.query,
		results: getResults(params)
	};
};
