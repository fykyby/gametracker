import { redirect } from '@sveltejs/kit';

export function POST({ locals }: any) {
	locals.pb.authStore.clear();
	locals.user = undefined;

	redirect(303, '/');
}
