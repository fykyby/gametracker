import { pb } from '$lib/server/pocketbase';

pb.authStore.loadFromCookie(document.cookie);
