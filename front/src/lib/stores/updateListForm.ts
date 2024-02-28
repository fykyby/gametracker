import type { UpdateListSchema } from '$lib/schemas';
import { writable } from 'svelte/store';
import type { Infer, SuperValidated } from 'sveltekit-superforms';

export const updateListForm = writable<SuperValidated<Infer<UpdateListSchema>>>();
