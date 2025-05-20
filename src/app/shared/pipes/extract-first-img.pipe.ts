import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractFirstImage'
})
export class ExtractFirstImagePipe implements PipeTransform {
  transform(content: string): string | null {
    if (!content) return null;

    // <img> tegini izlash uchun regular expression
    const imgRegex = /<img[^>]+>/i;
    const match = content.match(imgRegex);

    // Agar <img> tegi topilsa, uni qaytarish
    return match ? match[0] : null;
  }
}
