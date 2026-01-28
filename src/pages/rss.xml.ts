import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	posts.sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());

	const base = site ? new URL(site) : new URL('https://jizhang495.github.io');
	const now = new Date().toUTCString();

	const items = posts
		.map((post) => {
			const url = new URL(`/blog/${post.slug}/`, base);
			const published = post.data.published.toUTCString();
			const updated = post.data.updated.toUTCString();
			return `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${url.href}</link>
      <guid>${url.href}</guid>
      <pubDate>${published}</pubDate>
      <lastBuildDate>${updated}</lastBuildDate>
      <description><![CDATA[${post.data.description}]]></description>
    </item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>jz's Blog</title>
    <link>${base.href}</link>
    <description>Updates from jz's Blog</description>
    <lastBuildDate>${now}</lastBuildDate>${items}
  </channel>
</rss>`;

	return new Response(xml, {
		status: 200,
		headers: { 'Content-Type': 'application/rss+xml' }
	});
};
