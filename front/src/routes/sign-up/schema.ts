import { z } from 'zod';

export const formSchema = z
	.object({
		email: z.string().max(64, 'Email address is too long.').email(),
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

export type FormSchema = typeof formSchema;
