const poemFiles = import.meta.glob('../poems/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

export function getPoemCount(): number {
	return Object.keys(poemFiles).length;
}

export function getPoem(index: number): string {
	const key = `../poems/poema.${index}.md`;
	if (!(key in poemFiles)) {
		throw new Error(`Poem ${index} not found`);
	}
	return poemFiles[key] as string;
}

export function getDailyPoemIndex(userAgent: string): number {
	let hash = 0;
	for (let i = 0; i < userAgent.length; i++) {
		const chr = userAgent.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}

	const now = new Date();
	const start = new Date(now.getFullYear(), 0, 0);
	const diff =
		now.valueOf() -
		start.valueOf() +
		(start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
	const oneDay = 1000 * 60 * 60 * 24;
	const currentDayOfYear = Math.floor(diff / oneDay);

	const count = getPoemCount();
	return Math.abs(hash + currentDayOfYear) % count;
}
