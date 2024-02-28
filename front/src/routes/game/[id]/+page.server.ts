import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	update: async (event) => {
		console.log('UPDATE');
	}
};
