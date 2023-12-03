import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoemService {
  constructor(private http: HttpClient) { }

  getDailyPoem(): Observable<string> {
    return this.http.get("markdown/poema.3.md", { responseType: 'text' });
  }
}
