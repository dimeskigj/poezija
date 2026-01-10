import { getDailyPoemIndex, getPoemCount } from '$lib/server/poems';
import { getFullPoem } from '$lib/server/parser';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ url }) => {
	const idParam = url.searchParams.get('id');

	let index: number;
	const count = getPoemCount();

	if (idParam !== null && !isNaN(Number(idParam))) {
		index = Number(idParam) % count;
	} else {
		index = getDailyPoemIndex();
	}

	const poem = getFullPoem(index);
	const html = await marked.parse(poem.content);

	return {
		poemHtml: html,
		poemIndex: index,
		metadata: poem.metadata,
		snippet: poem.snippet,
		isSpecificShared: idParam !== null
	};
};
