import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import errorsFromServerResponse from '$lib/errorsFromServerResponse';
import { signUpSchema } from '$lib/schemas';
import getGenericErrorMessage from '$lib/getGenericErrorMessage';

export const load: PageServerLoad = async () => {
	redirect(303, '/');
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
			const user = await event.locals.pb.collection('users').create(form.data);
			await event.locals.pb
				.collection('users')
				.authWithPassword(form.data.email, form.data.password);

			return { form, user };
		} catch (err: any) {
			form.message = getGenericErrorMessage();
			return fail(400, {
				form: errorsFromServerResponse(form, err)
			});
		}
	}
};
