import { STORAGE_KEYS } from '$lib/constants';

export class StreakService {
	static updateAndGetStreak(): number {
		const now = new Date();
		const today = this.formatDate(now);
		const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);
		const storedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);
		let currentStreak = storedStreak ? parseInt(storedStreak) : 0;

		if (isNaN(currentStreak)) {
			currentStreak = 0;
		}

		if (lastVisit === today) {
			return currentStreak;
		}

		const yesterday = new Date(now);
		yesterday.setDate(yesterday.getDate() - 1);
		const yesterdayStr = this.formatDate(yesterday);

		if (lastVisit === yesterdayStr) {
			currentStreak++;
		} else {
			currentStreak = 1;
		}

		localStorage.setItem(STORAGE_KEYS.LAST_VISIT, today);
		localStorage.setItem(STORAGE_KEYS.STREAK, currentStreak.toString());

		return currentStreak;
	}

	private static formatDate(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
}
