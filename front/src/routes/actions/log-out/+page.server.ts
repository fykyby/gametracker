import { type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	redirect(303, '/');
};

export const actions: Actions = {
	default: async (event: any) => {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}
};
