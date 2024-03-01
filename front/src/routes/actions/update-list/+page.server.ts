import { updateListSchema } from '$lib/schemas';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { GameDataStatus } from '$lib/types';
import getGenericErrorMessage from '$lib/getGenericErrorMessage';

export const load: PageServerLoad = async () => {
	redirect(303, '/');
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(updateListSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const list = (
				await event.locals.pb.collection('lists').getList(1, 1, {
					filter: `user.id = '${event.locals.user.id}'`
				})
			).items[0];

			const item = (
				await event.locals.pb.collection('listItems').getList(1, 1, {
					filter: `list.id = '${list.id}' && rawgId = '${form.data.rawgId}'`
				})
			).items[0];

			const newItem = {
				list: list.id,
				rawgId: form.data.rawgId,
				title: form.data.title,
				status: form.data.status,
				rating: form.data.rating
			};

			const isStatusNone: boolean = form.data.status === GameDataStatus.None;
			if (!item) {
				if (isStatusNone) return { form };

				await event.locals.pb.collection('listItems').create(newItem);
			} else if (isStatusNone) {
				await event.locals.pb.collection('listItems').delete(item.id);
			} else {
				await event.locals.pb.collection('listItems').update(item.id, newItem);
			}
		} catch (err: any) {
			form.message = getGenericErrorMessage();
			return fail(400, {
				form
			});
		}

		return { form };
	}
};
