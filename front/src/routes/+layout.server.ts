import { updateListSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals }: any) => {
	return {
		user: locals.user,
		updateListForm: await superValidate(zod(updateListSchema))
	};
};
