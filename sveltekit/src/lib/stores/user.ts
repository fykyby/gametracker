import { writable } from 'svelte/store';

type LocalUser =
	| {
			id: string;
			username: string;
	  }
	| undefined;

export const user = writable<LocalUser>(undefined);
