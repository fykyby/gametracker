import type { GameData } from '$lib/types';
import { writable } from 'svelte/store';

type UpdateListDialog = {
	isOpen: boolean;
	gameData: GameData;
	updateButtonGameData(newGameData: GameData): void;
};

export const updateListDialog = writable<UpdateListDialog>({
	isOpen: false,
	gameData: {
		rawgId: -1,
		title: '',
		rating: 0,
		status: 0
	} as const,
	updateButtonGameData: () => {}
});
