import type { ILanguage } from '@showtime/shared/interfaces';

export interface IUserEditFormConfig {
  languages: ILanguage[];
  isAuth0Provider: boolean;
  inProgress: {
    saving: boolean;
  } | null;
}
