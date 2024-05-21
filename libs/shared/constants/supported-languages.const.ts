import { InjectionToken } from '@angular/core';

import type { ILanguage } from '../interfaces';

export const SUPPORTED_LANGUAGES = new InjectionToken<ILanguage[]>('SUPPORTED_LANGUAGES', {
  providedIn: 'root',
  factory: () => [
    {
      label: 'English(en-us)',
      value: 'en-us',
      default: true,
    },
    {
      label: 'Russian(ru)',
      value: 'ru-ru',
      default: true,
    },
  ],
});
