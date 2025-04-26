import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '@shared/constants/languages';
import { ICategory } from '@shared/interfaces/category';

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

    const url = new URL(window.location.href);

    if (url.searchParams.get('category')) {
      this.replaceCategorySlug(url, lang);
      return;
    }

    localStorage.setItem('lang', lang);
    location.reload();
  }

  replaceCategorySlug(url: URL, lang: string) {
    let flattenedCategories = localStorage.getItem('flattenedCategories');
    if (flattenedCategories) {
      const categories: ICategory[] = Object.values(JSON.parse(flattenedCategories));
      const currentSlug = url.searchParams.get('category');
      const category: ICategory | undefined = categories.find(i => i.slug === currentSlug);

      if (!category) {
        url.searchParams.delete('category');
      } else {
        let slugField: 'slugUz' | 'slugRu' | 'slugEn'  = 'slugUz';
        switch (lang) {
          case 'uz':
            slugField = 'slugUz';
            break;
          case 'ru':
            slugField = 'slugRu';
            break;
          case 'en':
            slugField = 'slugEn';
            break;
        }
        url.searchParams.set('category', category[slugField]);
      }
    } else {
      url.searchParams.delete('category');
    }
    localStorage.setItem('lang', lang);
    window.location.href = url.toString();
  }

  currencies = [
    { name: 'dollar', url: '', code: 'USD', symbol: '$' },
    { name: 'ruble', url: '', code: 'RUB', symbol: '₽' }
  ];
}
