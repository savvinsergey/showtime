import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { plainToInstance } from 'class-transformer';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth0Api {
  private auth0Service = inject(AuthService);

  public readonly isAuthenticated$ = this.auth0Service.isAuthenticated$;
  public readonly user$ = this.auth0Service.user$ as Observable<UserModel>;

  public login(): Observable<void> {
    return this.auth0Service.loginWithRedirect();
  }

  public logout(): Observable<void> {
    return this.auth0Service.logout();
  }
}
