import { RAWG_API_KEY, RAWG_URL } from '$env/static/private';
import { PUBLIC_SEARCH_PAGE_SIZE } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const res = await fetch(
		RAWG_URL +
			`/games?key=${RAWG_API_KEY}&page=${params.page}&page_size=${PUBLIC_SEARCH_PAGE_SIZE}&search=${params.query}`
	);
	const data = await res.json();

	console.log(data);
};
