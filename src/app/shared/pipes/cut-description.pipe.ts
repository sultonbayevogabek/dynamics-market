import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutDescription',
  pure: false
})
export class CutDescriptionPipe implements PipeTransform {
  transform(
    text: string,
    n: number
  ): string {
    const words = text.split(/\s+/); // So'zlarga ajratish (bo'shliqlar bo'yicha)
    if (words.length <= n) return text; // Agar so'zlar n dan kam bo‘lsa, butun matnni qaytar

    let currentWordCount = 0;
    let result = '';
    const sentenceRegex = /[^.!?]+[.!?]/g; // Gaplarni ajratish regexi
    const sentences = text.match(sentenceRegex);

    if (!sentences) return text;

    for (const sentence of sentences) {
      const sentenceWords = sentence.trim().split(/\s+/);
      if (currentWordCount + sentenceWords.length <= n) {
        result += sentence + ' ';
        currentWordCount += sentenceWords.length;
      } else {
        break;
      }
    }

    return result.trim();
  }
}
