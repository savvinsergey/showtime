import { ILanguage } from '../../../../../shared/interfaces/language.interface';

export interface IUserEditFormConfig {
  languages: ILanguage[];
  isAuth0Provider: boolean;
  inProgress: {
    saving: boolean;
  } | null;
}
