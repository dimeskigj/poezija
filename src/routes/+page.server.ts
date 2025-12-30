import { getDailyPoemIndex, getPoem, getPoemCount } from '$lib/server/poems';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ url, request }) => {
	const idParam = url.searchParams.get('id');
	const userAgent = request.headers.get('user-agent') || '';

	let index: number;
	const count = getPoemCount();

	if (idParam !== null && !isNaN(Number(idParam))) {
		index = Number(idParam) % count;
	} else {
		index = getDailyPoemIndex(userAgent);
	}

	const md = getPoem(index);
	const html = await marked.parse(md);

	return {
		poemHtml: html,
		poemIndex: index
	};
};
