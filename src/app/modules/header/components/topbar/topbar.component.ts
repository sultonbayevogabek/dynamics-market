import { Component } from '@angular/core';
import { CurrencyService } from '@shared/services/currency.service';
import { LanguageService } from '@shared/services/language.service';

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
    public languageService: LanguageService
  ) {
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
