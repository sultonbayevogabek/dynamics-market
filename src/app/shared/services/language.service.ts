import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '@shared/constants/languages';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  constructor(
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
}
