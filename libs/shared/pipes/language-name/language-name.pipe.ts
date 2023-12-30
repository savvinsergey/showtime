import { inject, Pipe, PipeTransform } from '@angular/core';
import { SUPPORTED_LANGUAGES } from '../../constants/supported-languages.const';

@Pipe({
  name: 'languageName',
  pure: true,
  standalone: true,
})
export class LanguageNamePipe implements PipeTransform {
  private readonly supportedLanguages = inject(SUPPORTED_LANGUAGES);

  // ----------------- //

  transform(value: string | undefined): string {
    if (!value) {
      return '---';
    }

    return this.supportedLanguages.find(lang => lang.value === value)?.label || '---';
  }
}
