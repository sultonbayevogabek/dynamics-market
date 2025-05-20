// clean-content.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanContent'
})
export class CleanContentPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // &nbsp; belgilarini oddiy bo'shliq bilan almashtirish
    return value.replace(/&nbsp;/g, ' ');
  }
}
