import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { NewsService } from '@shared/services/news.service';
import { INews } from '@shared/interfaces/news';

@Component({
  selector: 'app-news',
  templateUrl: './page-news.component.html',
})

export class PageNewsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  params = {
    page: 1,
    limit: 6,
    search: '',
    pages: 0
  }
  loading = true;

  sidebarPosition: 'start' | 'end' = 'end';
  layout: 'classic' | 'grid' | 'list' = 'grid';

  news: INews[] = [];

  constructor(
    private newsService: NewsService
  ) {
  }

  async ngOnInit() {
    await this.getNews();
  }

  getPostCardLayout(): 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm' {
    return {
      classic: 'grid-lg',
      grid: 'grid-nl',
      list: 'list-nl'
    }[this.layout] as 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm';
  }

  async getNews(page?: number) {
    if (page) {
      this.params.page = page;
    }

    const response = await firstValueFrom(
      this.newsService.getNews(this.params)
    )

    this.news = response?.data;
    this.params.pages = response?.pages;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
