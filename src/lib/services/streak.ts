import { STORAGE_KEYS } from '$lib/constants';

export class StreakService {
	static updateAndGetStreak(): number {
		const today = new Date().toISOString().split('T')[0];
		const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);
		let currentStreak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0');

		if (lastVisit === today) {
			return currentStreak;
		}

		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		const yesterdayStr = yesterday.toISOString().split('T')[0];

		if (lastVisit === yesterdayStr) {
			currentStreak++;
		} else {
			currentStreak = 1;
		}

		localStorage.setItem(STORAGE_KEYS.LAST_VISIT, today);
		localStorage.setItem(STORAGE_KEYS.STREAK, currentStreak.toString());

		return currentStreak;
	}
}
