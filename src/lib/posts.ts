import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export const PAGE_SIZE = 5;

export async function getPublishedPosts() {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export function getPageSlice(posts: CollectionEntry<'blog'>[], page: number) {
	const start = (page - 1) * PAGE_SIZE;
	return posts.slice(start, start + PAGE_SIZE);
}

export function totalPages(posts: CollectionEntry<'blog'>[]) {
	return Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
}

export function getPrevNext(posts: CollectionEntry<'blog'>[], slug: string) {
	const index = posts.findIndex((post) => post.slug === slug);
	if (index === -1) return { prev: undefined, next: undefined };
	return {
		prev: posts[index - 1],
		next: posts[index + 1]
	};
}
