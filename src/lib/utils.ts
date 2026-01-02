/**
 * Returns the correct Macedonian text for streak counter
 * Uses "ден" for numbers ending in 1 (except 11), "дена" for all others
 */
export function getStreakText(streak: number): string {
	// Numbers ending in 1 (except 11) use "ден"
	if (streak % 10 === 1 && streak % 100 !== 11) {
		return `${streak} ден по ред читаш!`;
	}
	return `${streak} дена по ред читаш!`;
}