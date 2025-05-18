import { Component, OnInit } from '@angular/core';
import { IFaq } from '@shared/interfaces/faq';
import { firstValueFrom } from 'rxjs';
import { FaqService } from '@shared/services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './page-faq.component.html'
})
export class PageFaqComponent implements OnInit {
  loading = true;
  faqList: IFaq[] = [];

  constructor(
    private faqService: FaqService,
  ) {
  }

  async ngOnInit() {
    await this.getFAQList();
  }

  async getFAQList() {
    this.faqList = await firstValueFrom(
      this.faqService.getList()
    )
    this.loading = false;
  }
}
