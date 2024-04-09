import { Observable } from 'rxjs';

export abstract class TokenUsersRepository {
  public abstract readonly token$: Observable<string>;

  public abstract set token(value: string);

  public abstract getToken(): Observable<string>;
}
