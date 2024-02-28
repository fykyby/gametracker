import type { Actions, PageServerLoad } from './$types';
import { superValidate, type ValidationErrors } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import errorsFromServerResponse from '$lib/errorsFromServerResponse';
import { signUpSchema } from '$lib/schemas';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(303, '/');
	}

	return {
		form: await superValidate(zod(signUpSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signUpSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await event.locals.pb.collection('users').create(form.data);
		} catch (err: any) {
			return fail(400, {
				form: errorsFromServerResponse(form, err)
			});
		}

		try {
			await event.locals.pb
				.collection('users')
				.authWithPassword(form.data.email, form.data.password);
		} catch (err: any) {
			throw err;
		}

		redirect(303, '/');
	}
};
