import { POCKETBASE_URL } from '$env/static/private';
import getGenericErrorMessage from '$lib/getGenericErrorMessage';
import type { HandleServerError } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

const allowedHeaders = ['retry-after', 'content-type'];

export async function handle({ event, resolve }): Promise<Response> {
	event.locals.pb = new PocketBase(POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = structuredClone(event.locals.pb.authStore.model);
	} else {
		event.locals.user = undefined;
	}

	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) => allowedHeaders.includes(name)
	});

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: event.url.protocol === 'https:',
			httpOnly: false
		})
	);

	return response;
}

export const handleError: HandleServerError = async () => {
	return {
		message: getGenericErrorMessage()
	};
};
