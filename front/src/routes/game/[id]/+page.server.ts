import { updateListSchema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const actions: Actions = {
	update: async (event) => {
		const form = await superValidate(event, zod(updateListSchema));
		console.log(form);

		return fail(400, {
			form
		});
	}
};
