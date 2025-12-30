import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { browser } from '$app/environment';
import { eventTags } from '$lib/analytics-tags';

const firebaseConfig = {
	projectId: 'poezija-mk',
	appId: '1:292730192537:web:c23f0b4552ad9bc3342e08',
	storageBucket: 'poezija-mk.appspot.com',
	apiKey: 'AIzaSyCLYixlokPgY9xLLNhssk4M_xcFu_ImVaI',
	authDomain: 'poezija-mk.firebaseapp.com',
	messagingSenderId: '292730192537',
	measurementId: 'G-83R63L9RGZ'
};

let analytics: any;

if (browser) {
	const app = initializeApp(firebaseConfig);
	analytics = getAnalytics(app);
}

export const logAppOpen = () => {
	if (browser && analytics) {
		logEvent(analytics, eventTags.appOpen);
	}
};
