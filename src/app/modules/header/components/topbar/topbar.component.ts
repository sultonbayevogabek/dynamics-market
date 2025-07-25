import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '@shared/services/currency.service';
import { LanguageService } from '@shared/services/language.service';
import { GeolocationService } from '@shared/services/geolocation.service';
import { MultiLanguageAddress } from '@shared/services/multilanguage-geocoding.service';
import { firstValueFrom, interval } from 'rxjs';
import { Language } from '@shared/interfaces/language';

interface Currency {
  name: string;
  url: string;
  code: string;
  symbol: string;
}

@Component({
  selector: 'app-header-topbar',
  templateUrl: './topbar.component.html'
})

export class TopbarComponent implements OnInit {
  currentAddress: MultiLanguageAddress | null = null;
  currentLanguage: Language = 'uz';

  currencies = [
    { name: 'dollar', url: '', code: 'USD', symbol: '$' },
    { name: 'ruble', url: '', code: 'RUB', symbol: '₽' }
  ];

  constructor(
    public currencyService: CurrencyService,
    public languageService: LanguageService,
    private geolocationService: GeolocationService
  ) {
  }

  async ngOnInit() {
    this.currentLanguage = <Language>this.languageService.currentLang;

    if (localStorage.getItem('currentAddress')) {
      this.currentAddress = JSON.parse(localStorage.getItem('currentAddress')!);
      return;
    }

    interval(10000).subscribe(async () => {
      await this.getCurrentLocation();
    });
  }

  async getCurrentLocation() {
    try {
      const location = await firstValueFrom(
        this.geolocationService.getCurrentPosition()
      );

      try {
        const address = await firstValueFrom(
          this.geolocationService.getMultiLanguageAddress(location!)
        );
        if (address) {
          this.currentAddress = address;
        } else {
          this.currentAddress = this.geolocationService.getFallbackAddress(location!);
        }
      } catch (error) {
        this.currentAddress = this.geolocationService.getFallbackAddress(location!);
      }

      localStorage.setItem('currentAddress', JSON.stringify(this.currentAddress));
    } catch (error) {
      console.error('Geolocation xatoligi:', error);
    }
  }

  setCurrency(currency: Currency): void {
    this.currencyService.options = {
      code: currency.code,
      display: currency.symbol
    };
  }
}
