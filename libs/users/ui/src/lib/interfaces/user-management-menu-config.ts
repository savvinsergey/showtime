import type { Observable } from 'rxjs';

export interface IUserManagementMenuConfig {
  inProgress$: Observable<boolean>;
}
