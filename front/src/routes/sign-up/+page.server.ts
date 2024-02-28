import type { Actions, PageServerLoad } from './$types';
import { superValidate, type ValidationErrors } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import errorsFromServerResponse from '$lib/errorsFromServerResponse';
// import { pb } from '$lib/server/pocketbase';

type FormErrors = {
	email?: string | string[];
	username?: string | string[];
	password?: string | string[];
	passwordConfirm?: string | string[];
};

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
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

		throw redirect(303, '/');
	}
};
