import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanContent'
})
export class CleanContentPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // &nbsp; belgilarini oddiy bo'shliq bilan almashtirish
    let cleanedValue = value.replace(/&nbsp;/g, ' ');

    // Birinchi img elementini topish va olib tashlash
    const imgRegex = /<img[^>]*>|<img[^>]*\/>/i;
    cleanedValue = cleanedValue.replace(imgRegex, '');

    return cleanedValue;
  }
}
