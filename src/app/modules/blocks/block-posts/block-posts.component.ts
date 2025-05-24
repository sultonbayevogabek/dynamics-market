import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DirectionService } from '@shared/services/direction.service';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { INews } from '@shared/interfaces/news';
import { firstValueFrom } from 'rxjs';
import { NewsService } from '@shared/services/news.service';

@Component({
  selector: 'app-block-posts',
  templateUrl: './block-posts.component.html'
})

export class BlockPostsComponent implements AfterViewInit, OnInit {
  layout: 'list-sm' | 'grid-nl' = 'list-sm';
  news: INews[] = [];

  @ViewChild('container', { read: ElementRef }) container!: ElementRef;

  showCarousel = true;

  carouselOptions: OwlOptions = {
    margin: 30,
    nav: false,
    dots: false,
    loop: true,
    rtl: false,
    responsive: {
      930: { items: 2 },
      0: { items: 1 }
    }
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private direction: DirectionService,
    private newsService: NewsService
  ) {
  }

  async ngOnInit() {
    await this.getNews();
  }

  async getNews(page?: number) {
    const response = await firstValueFrom(
      this.newsService.getNews({
        page: 1,
        limit: 2
      })
    );

    this.news = response?.data;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const container = this.container.nativeElement as HTMLElement;
      const containerWidth = container.getBoundingClientRect().width;

      window.addEventListener('load', () => {
        const newContainerWidth = container.getBoundingClientRect().width;

        if (containerWidth !== newContainerWidth) {
          this.showCarousel = false;

          setTimeout(() => this.showCarousel = true, 0);
        }
      });
    }
  }
}
