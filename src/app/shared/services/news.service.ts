import { Injectable } from '@angular/core';
import { RequestService } from '@shared/services/request.service';
import { INews } from '@shared/interfaces/news';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  constructor(
    private requestService: RequestService
  ) {
  }

  getNews(params: { page?: number; limit?: number; search?: string }) {
    return this.requestService.request<{ total: number; pages: number; data: INews[] }>('news/list', params);
  }

  getNewsDetails(slug: string) {
    return this.requestService.request<INews>('news/get-news', { slug });
  }
}
