import { Observable } from 'rxjs';
import { UserModel } from '../models';

export abstract class AuthRepository {
  public abstract readonly isAuthenticated$: Observable<boolean>;
  public abstract readonly user$: Observable<UserModel>;

  public abstract login(): Observable<void>;
  public abstract logout(): Observable<void>;
}
