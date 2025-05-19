import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, firstValueFrom, Subject } from 'rxjs';
import { NewsService } from '@shared/services/news.service';
import { INews } from '@shared/interfaces/news';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

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
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.watchQuery();
  }

  watchQuery() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(async params => {
        if (params && params['search']) {
          this.params.search = params['search'];
        } else {
          this.params.search = '';
        }
        await this.getNews(1);
      })
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
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
