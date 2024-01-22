import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PoemService } from './services/poem.service';
import { marked } from 'marked';
import { AnalyticsService } from './services/analytics.service';
import { HAS_SEEN_NOTICE, LocalStorageService } from './services/local-storage.service';
import { NoticeComponent } from "./components/notice/notice.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, NoticeComponent]
})
export class AppComponent implements OnInit {
  poemHtml?: string;
  hasSeenNotice = false;

  constructor(private poemService: PoemService, private analytics: AnalyticsService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.analytics.logAppOpen();
    this.poemService.getDailyPoem().subscribe((md) => { this.poemHtml = marked.parse(md) as string; });
    this.hasSeenNotice = (this.localStorage.getItem<boolean>(HAS_SEEN_NOTICE) ?? false);
  }

  onNoticeClosed(): void {
    this.hasSeenNotice = true;
    this.localStorage.setItem(HAS_SEEN_NOTICE, true);
  }
}
