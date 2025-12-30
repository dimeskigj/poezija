import { browser } from '$app/environment';
import { STORAGE_KEYS, THEME_VALUES } from '$lib/constants';

class ThemeState {
	isDark = $state(false);

	constructor() {
		if (browser) {
			const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
			if (storedTheme) {
				this.isDark = storedTheme === THEME_VALUES.DARK;
			} else {
				this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			}
		}
	}

	toggle() {
		this.isDark = !this.isDark;
		if (browser) {
			localStorage.setItem(
				STORAGE_KEYS.THEME,
				this.isDark ? THEME_VALUES.DARK : THEME_VALUES.LIGHT
			);
		}
	}
}

export const theme = new ThemeState();
