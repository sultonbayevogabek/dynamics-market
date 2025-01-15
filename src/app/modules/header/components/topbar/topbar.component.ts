import { Component } from '@angular/core';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { LANGUAGES, LANGUAGES_SHORTS } from '../../../../shared/constants/languages';
import { TranslateService } from '@ngx-translate/core';

interface Currency {
  name: string;
  url: string;
  code: string;
  symbol: string;
}

@Component({
  selector: 'app-header-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: [ './topbar.component.scss' ]
})

export class TopbarComponent {
  get languages() {
    return LANGUAGES;
  }

  get currentLang(): string {
    let lang: string = this.translateService.currentLang;

    switch (lang) {
      case 'uz':
        lang = 'O\'z'
        break;
      case 'ru':
        lang = 'РУ'
        break;
      case 'en':
        lang = 'EN'
        break;
    }

    return lang;
  }

  currencies = [
    { name: '$ US Dollar', url: '', code: 'USD', symbol: '$' },
    { name: '₽ Russian Ruble', url: '', code: 'RUB', symbol: '₽' }
  ];

  constructor(
    public currencyService: CurrencyService,
    private translateService: TranslateService,
  ) {
  }

  setCurrency(currency: Currency): void {
    this.currencyService.options = {
      code: currency.code,
      display: currency.symbol
    };
  }

  setLanguage(lang: string): void {
    if (this.translateService.currentLang === lang) {
      return;
    }
    localStorage.setItem('lang', lang);
    location.reload();
  }
}
