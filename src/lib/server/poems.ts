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

export function getDailyPoemIndex(): number {
	const START_DATE = Date.UTC(2024, 4, 20); // May 20, 2024
	const MS_PER_DAY = 24 * 60 * 60 * 1000;

	const now = new Date();
	const cetDateString = now.toLocaleDateString('en-GB', { timeZone: 'Europe/Skopje' });
	const [day, month, year] = cetDateString.split('/').map(Number);
	const todayCet = Date.UTC(year, month - 1, day);

	const daysSinceStart = Math.floor((todayCet - START_DATE) / MS_PER_DAY);

	const currentCount = getPoemCount();
	const INITIAL_POEM_COUNT = 9;
	const offset = currentCount - INITIAL_POEM_COUNT;

	return (daysSinceStart + offset) % currentCount;
}
