import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { logInSchema } from '$lib/schemas';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(303, '/');
	}

	return {
		form: await superValidate(zod(logInSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(logInSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await event.locals.pb
				.collection('users')
				.authWithPassword(form.data.email, form.data.password);
		} catch (err: any) {
			form.message = err.response.message;
			return fail(400, {
				form
			});
		}

		redirect(303, '/');
	}
};
