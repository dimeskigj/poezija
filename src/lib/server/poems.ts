import fs from 'node:fs';
import path from 'node:path';

const POEMS_DIR = path.resolve('src/lib/poems');

export function getPoemCount(): number {
	const files = fs.readdirSync(POEMS_DIR);
	return files.filter((file) => file.endsWith('.md')).length;
}

export function getPoem(index: number): string {
	const filePath = path.join(POEMS_DIR, `poema.${index}.md`);
	if (!fs.existsSync(filePath)) {
		throw new Error(`Poem ${index} not found`);
	}
	return fs.readFileSync(filePath, 'utf-8');
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
