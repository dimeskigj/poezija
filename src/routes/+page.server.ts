import { getDailyPoemIndex, getPoem, getPoemCount } from '$lib/server/poems';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import matter from 'gray-matter';

export const load: PageServerLoad = async ({ url }) => {
	const idParam = url.searchParams.get('id');

	let index: number;
	const count = getPoemCount();

	if (idParam !== null && !isNaN(Number(idParam))) {
		index = Number(idParam) % count;
	} else {
		index = getDailyPoemIndex();
	}

	const md = getPoem(index);
	const { data, content } = matter(md);
	const html = await marked.parse(content);

	const metadata = data as {
		title: string;
		author: string;
		authorUrl?: string;
		source?: string;
		sourceUrl?: string;
		license?: string;
		licenseUrl?: string;
		[key: string]: any;
	};

	return {
		poemHtml: html,
		poemIndex: index,
		metadata
	};
};
