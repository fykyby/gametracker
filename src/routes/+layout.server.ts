import { logInSchema, signUpSchema, updateListSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';

export const prerender = false;
export const ssr = true;

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user,
		signUpForm: await superValidate(zod(signUpSchema)),
		logInForm: await superValidate(zod(logInSchema)),
		updateListForm: await superValidate(zod(updateListSchema))
	};
};
