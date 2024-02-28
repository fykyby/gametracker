import type { SuperValidated } from 'sveltekit-superforms';

// Convert response errors from PocketBase action to SuperForms validation errors
export default function errorsFromServerResponse(
	form: SuperValidated<any>,
	err: any
): SuperValidated<any> {
	const newFormErrors: any = form.errors;
	const serverResponseErrorsRaw: any = err.response.data;

	for (const e in serverResponseErrorsRaw) {
		const rawKey = e as keyof typeof serverResponseErrorsRaw;
		const key = e as keyof typeof newFormErrors;
		const msg: string = serverResponseErrorsRaw[rawKey].message;

		newFormErrors[key] = [msg];
	}

	const newForm = form;
	newForm.errors = newFormErrors;

	return newForm;
}
