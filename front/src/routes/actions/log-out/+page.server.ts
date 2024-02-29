import { type Actions, redirect } from '@sveltejs/kit';

export const load = async ({ locals }: any) => {
	if (!locals.user) {
		redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async (event: any) => {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}
};
