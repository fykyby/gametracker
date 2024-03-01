import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import errorsFromServerResponse from '$lib/errorsFromServerResponse';
import { signUpSchema } from '$lib/schemas';

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

		let user;
		try {
			user = await event.locals.pb.collection('users').create(form.data);
			await event.locals.pb.collection('lists').create({
				user: user.id,
				isPrivate: false
			});
		} catch (err: any) {
			if (user) {
				await event.locals.pb
					.collection('users')
					.authWithPassword(form.data.email, form.data.password);
				await event.locals.pb.collection('users').delete(user.id);
			}

			form.message = err.response.message;
			return fail(400, {
				form: errorsFromServerResponse(form, err)
			});
		}

		try {
			await event.locals.pb
				.collection('users')
				.authWithPassword(form.data.email, form.data.password);
		} catch (err: any) {
			form.message = err.response.message;
			return fail(400, {
				form: errorsFromServerResponse(form, err)
			});
		}

		return { form, user };
	}
};
