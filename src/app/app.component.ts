import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { CurrencyService } from '@shared/services/currency.service';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES_SHORTS } from '@shared/constants/languages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private scroller: ViewportScroller,
    private currency: CurrencyService,
    private translate: TranslateService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const lang = localStorage.getItem('lang') || 'uz';
      if (LANGUAGES_SHORTS.includes(lang)) {
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
      }
    }
  }

  async ngOnInit() {
    this.currency.options = {
      code: 'USD'
      // display: 'symbol',
      // digitsInfo: '1.2-2',
      // locale: 'en-US'
    };
  }
}
