import { writable } from 'svelte/store';

type LocalUser =
	| {
			id: string;
	  }
	| undefined;

export const user = writable<LocalUser>(undefined);
