import { InjectionToken } from '@angular/core';
import { ISearchType } from '../../../../../shared/interfaces/search-type';

export const USER_SEARCH_TYPE = new InjectionToken<ISearchType[]>('USER_SEARCH_TYPE', {
  providedIn: 'root',
  factory: () => [
    {
      label: 'Nickname',
      value: 'user_metadata.nickname',
    },
    {
      label: 'Email',
      value: 'email',
    },
  ],
});
