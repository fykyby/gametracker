import { z } from 'zod';

export const logInSchema = z.object({
	email: z.string().max(64, 'Email address is too long.').email(),
	password: z.string().min(6, 'Password must contain at least 6 characters.')
});
export type LogInSchema = typeof logInSchema;

export const signUpSchema = z
	.object({
		email: z.string().max(64, 'Email address is too long.').email('Invalid email.'),
		username: z
			.string()
			.min(3, 'Username must contain at least 3 characters.')
			.max(48, 'Username is too long.')
			.refine((s) => !s.includes(' '), 'Username cannot contain spaces.'),
		password: z.string().min(6, 'Password must contain at least 6 characters.'),
		passwordConfirm: z.string()
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match.",
		path: ['passwordConfirm']
	});
export type SignUpSchema = typeof signUpSchema;

export const updateListSchema = z.object({
	rawgId: z.number(), // .min(0, 'Incorrect game ID.'),
	status: z.number(), //.min(0, 'Incorrect status.').max(5, 'Incorrect status.'),
	rating: z.number() //.min(0, 'Incorrect rating.').max(10, 'Incorrect rating.')
});
export type UpdateListSchema = typeof updateListSchema;
