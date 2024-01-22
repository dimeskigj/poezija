import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

const POEM_COUNT = environment.poemCount;

@Injectable({
  providedIn: 'root'
})
export class PoemService {
  constructor(private http: HttpClient) { }

  getDailyPoem(): Observable<string> {
    const index = this.getPoemIndexFromUserAgentAndDate();
    return this.http.get(`markdown/poema.${index}.md`, { responseType: 'text' });
  }

  /**
  * Returns the index of an available poem based on the hash code of the user agent and current date of the year.
  * 
  * Hence, there will be a new poem every day, and on different user agents.
  */
  private getPoemIndexFromUserAgentAndDate() {
    const userAgent = window.navigator.userAgent;

    let hash = 0;
    for (let i = 0; i < userAgent.length; i++) {
      let chr = userAgent.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.valueOf() - start.valueOf()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const currentDayOfYear = Math.floor(diff / oneDay);

    return Math.abs(hash + currentDayOfYear) % POEM_COUNT;
  }
}
