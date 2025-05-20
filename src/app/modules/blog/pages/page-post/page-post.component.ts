import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NewsService } from '@shared/services/news.service';
import { INews } from '@shared/interfaces/news';

@Component({
  selector: 'app-post',
  templateUrl: './page-post.component.html'
})

export class PagePostComponent implements OnInit {
  layout: 'classic' | 'full' = 'full';

  loading = true;
  news!: INews;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
  }

  async ngOnInit() {
    await this.getNewsDetails();
  }

  async getNewsDetails() {
    try {
      const newsSlug = this.activatedRoute.snapshot.params['newsSlug'];
      const response = await firstValueFrom(this.newsService.getNewsDetails(newsSlug));

      if (!response) {
        await this.router.navigate([ '/page-not-found' ]);
        return;
      }

      this.news = response;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching news details:', error);
      await this.router.navigate([ '/page-not-found' ]);
    } finally {
      this.loading = false;
    }
  }
}
