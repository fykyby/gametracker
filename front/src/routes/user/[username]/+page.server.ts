import type { RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';
import type { GameData } from '$lib/types';

export const load: PageServerLoad = async ({ params, locals }) => {
	let listItems: GameData[] = [];
	try {
		const list = await locals.pb
			.collection('lists')
			.getFirstListItem(`user.username = '${params.username}'`);

		if (!list) throw new Error();

		listItems = await locals.pb.collection('listItems').getFullList<GameData>({
			filter: `list.id = '${list.id}'`
		});
	} catch (_) {
		listItems = [];
	}

	let thisUserListItems: GameData[] = [];
	if (locals.user && listItems.length > 0) {
		try {
			const list = await locals.pb
				.collection('lists')
				.getFirstListItem(`user.id = '${locals.user.id}'`);

			thisUserListItems = await locals.pb.collection('listItems').getFullList<GameData>({
				filter: `list.id = '${list.id}'`
			});
		} catch (_) {
			thisUserListItems = [];
		}
	}

	listItems = listItems.map((listItem: GameData) => {
		const itemIndex = thisUserListItems.findIndex(
			(thisItem) => thisItem.rawgId === listItem.rawgId
		);
		return {
			...listItem,
			statusData: {
				status: itemIndex > -1 ? listItems[itemIndex].status : 0,
				rating: itemIndex > -1 ? listItems[itemIndex].rating : 0
			}
		};
	});

	return {
		username: params.username,
		listItems
	};
};
