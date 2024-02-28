import { z } from 'zod';

export const formSchema = z.object({
	email: z.string().max(64, 'Email address is too long.').email(),
	password: z.string().min(6, 'Password must contain at least 6 characters.')
});

export type FormSchema = typeof formSchema;
