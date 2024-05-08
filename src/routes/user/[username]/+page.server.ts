import type { PageServerLoad } from './$types';
import type { GameData } from '$lib/types';

export const load: PageServerLoad = async ({ params, locals }) => {
	let userExists: boolean = true;

	let listItems: GameData[] = [];
	try {
		const user = await locals.pb
			.collection('users')
			.getFirstListItem(`username = '${params.username}'`);

		if (!user) throw new Error();

		listItems = await locals.pb.collection('listItems').getFullList<GameData>({
			filter: `user.id = '${user.id}'`
		});
	} catch (_) {
		listItems = [];
		userExists = false;
	}

	let thisUserListItems: GameData[] = [];
	if (locals.user && listItems.length > 0) {
		try {
			thisUserListItems = await locals.pb.collection('listItems').getFullList<GameData>({
				filter: `user.id = '${locals.user.id}'`
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
		listItems,
		userExists
	};
};
