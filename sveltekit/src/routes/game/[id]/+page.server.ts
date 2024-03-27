import { RAWG_API_KEY, RAWG_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	// const res = await fetch(RAWG_URL + `/games?key=${RAWG_API_KEY}&id=${params.id}`);
	// const data = await res.json();
	// return {
	// 	gameData: data
	// };
};
