import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '@shared/services/language.service';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  private monthNamesUz = [
    'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
    'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
  ];

  private monthNamesRu = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  private monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private languageService: LanguageService) {}

  transform(dateStr: string, showTime: boolean = false): string {
    if (!dateStr) {
      return '';
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return dateStr;
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format time (for all languages)
    const time = showTime ? ` ${this.padZero(hours)}:${this.padZero(minutes)}` : '';

    const lang = this.languageService.currentLang;

    switch (lang) {
      case 'uz':
        return `${day}-${this.monthNamesUz[month]}, ${year} yil${time}`;

      case 'ru':
        return `${day} ${this.monthNamesRu[month]} ${year} г.${time}`;

      case 'en':
      default:
        return `${this.monthNamesEn[month]} ${day}, ${year}${time}`;
    }
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
