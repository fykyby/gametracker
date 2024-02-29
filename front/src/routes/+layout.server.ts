import { logInSchema, signUpSchema, updateListSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals }: any) => {
	return {
		user: locals.user,
		signUpForm: await superValidate(zod(signUpSchema)),
		logInForm: await superValidate(zod(logInSchema)),
		updateListForm: await superValidate(zod(updateListSchema))
	};
};
