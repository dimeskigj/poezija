import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PoemService } from './services/poem.service';
import { marked } from 'marked';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  poemHtml?: string;

  constructor(private poemService: PoemService, private analytics: AnalyticsService) { }

  ngOnInit(): void {
    this.analytics.logAppOpen();
    this.poemService.getDailyPoem().subscribe((md) => { this.poemHtml = marked.parse(md) as string; });
  }
}
