import { Injectable } from '@angular/core';
import { Analytics } from '@angular/fire/analytics';
import { logEvent } from "firebase/analytics";
import { eventTags } from '../../analytics-tags';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private analytics: Analytics) { }

  logAppOpen(): void { this.logEventWithName(eventTags.appOpen); }

  private logEventWithName(eventName: string): void {
    logEvent(this.analytics, eventName);
  }
}
