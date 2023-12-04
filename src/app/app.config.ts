import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(
      {
        "projectId": "poezija-mk",
        "appId": "1:292730192537:web:c23f0b4552ad9bc3342e08",
        "storageBucket": "poezija-mk.appspot.com",
        "apiKey": "AIzaSyCLYixlokPgY9xLLNhssk4M_xcFu_ImVaI",
        "authDomain": "poezija-mk.firebaseapp.com",
        "messagingSenderId": "292730192537",
        "measurementId": "G-83R63L9RGZ"
      }))),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
  ]
};
