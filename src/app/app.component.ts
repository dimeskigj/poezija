import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PoemService } from './services/poem.service';
import { marked } from 'marked';
import { AnalyticsService } from './services/analytics.service';
import { HAS_SEEN_NOTICE, LocalStorageService, THEME_KEY } from './services/local-storage.service';
import { NoticeComponent } from "./components/notice/notice.component";
import { LucideAngularModule, Moon, Copy, Sun, Check } from 'lucide-angular';

const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';
const POEM_ID_PARAM = 'id';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, NoticeComponent, LucideAngularModule]
})
export class AppComponent implements OnInit {
  poemHtml?: string;
  hasSeenNotice = false;
  isDark = false;
  currentPoemIndex: number | null = null;
  isCopied = false;

  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly Copy = Copy;
  readonly Check = Check;

  constructor(
    private poemService: PoemService, 
    private analytics: AnalyticsService, 
    private localStorage: LocalStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.analytics.logAppOpen();
    
    this.route.queryParams.subscribe(params => {
      const id = params[POEM_ID_PARAM];
      if (id) {
        this.currentPoemIndex = +id;
      } else {
        this.currentPoemIndex = this.poemService.getDailyPoemIndex();
      }
      this.loadPoem(this.currentPoemIndex);
    });

    this.hasSeenNotice = (this.localStorage.getItem<boolean>(HAS_SEEN_NOTICE) ?? false);
    this.initializeTheme();
  }

  loadPoem(index: number) {
    this.poemService.getPoem(index).subscribe((md) => { 
      this.poemHtml = marked.parse(md) as string; 
    });
  }

  initializeTheme() {
    const storedTheme = this.localStorage.getItem<string>(THEME_KEY);
    if (storedTheme) {
      this.isDark = storedTheme === DARK_THEME;
    } else {
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.localStorage.setItem(THEME_KEY, this.isDark ? DARK_THEME : LIGHT_THEME);
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDark) {
      document.documentElement.classList.add(DARK_THEME);
    } else {
      document.documentElement.classList.remove(DARK_THEME);
    }
  }

  onNoticeClosed(): void {
    this.hasSeenNotice = true;
    this.localStorage.setItem(HAS_SEEN_NOTICE, true);
  }

  share() {
    if (this.currentPoemIndex !== null) {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set(POEM_ID_PARAM, this.currentPoemIndex.toString());
      navigator.clipboard.writeText(url.toString());
      
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    }
  }
}
