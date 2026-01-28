import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().max(180, { message: 'Description must be 180 characters or fewer.' }),
		published: z.coerce.date(),
		updated: z.coerce.date(),
		draft: z.boolean().optional().default(false),
		tags: z.array(z.string()).optional().default([])
	})
});

export const collections = { blog };
