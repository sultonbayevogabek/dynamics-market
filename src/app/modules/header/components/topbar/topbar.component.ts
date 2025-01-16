import { Component } from '@angular/core';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { LANGUAGES } from '../../../../shared/constants/languages';
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
  constructor(
    public currencyService: CurrencyService,
    private translateService: TranslateService
  ) {
  }

  get languages() {
    return LANGUAGES;
  }

  get currentLang(): string {
    return this.translateService.currentLang;
  }

  get currentLangShort(): string {
    let lang: string = this.currentLang;

    switch (lang) {
      case 'uz':
        lang = 'O\'z';
        break;
      case 'ru':
        lang = 'РУ';
        break;
      case 'en':
        lang = 'EN';
        break;
    }

    return lang;
  }

  setLanguage(lang: string): void {
    if (this.currentLang === lang) {
      return;
    }
    localStorage.setItem('lang', lang);
    location.reload();
  }

  currencies = [
    { name: 'dollar', url: '', code: 'USD', symbol: '$' },
    { name: 'ruble', url: '', code: 'RUB', symbol: '₽' }
  ];

  setCurrency(currency: Currency): void {
    this.currencyService.options = {
      code: currency.code,
      display: currency.symbol
    };
  }
}
