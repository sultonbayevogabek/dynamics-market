import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RequestService } from '@shared/services/request.service';
import { IFaq } from '@shared/interfaces/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(
    @Inject(PLATFORM_ID)
    private platformId: any,
    private requestService: RequestService
  ) {
    if (isPlatformBrowser(this.platformId)) {
    }
  }

  getList() {
    return this.requestService.request<IFaq[]>('faq/list');
  }
}
