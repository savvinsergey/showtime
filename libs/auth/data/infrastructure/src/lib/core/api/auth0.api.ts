import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import type { UserModel } from '@showtime/auth/domain';
import type { Observable } from 'rxjs';

@Injectable()
export class Auth0Api {
  private readonly auth0Service = inject(AuthService);

  // ------------------------- //

  public readonly isAuthenticated$ = this.auth0Service.isAuthenticated$;
  public readonly user$ = this.auth0Service.user$ as Observable<UserModel>;

  public login(): Observable<void> {
    return this.auth0Service.loginWithRedirect();
  }

  public logout(): Observable<void> {
    return this.auth0Service.logout({
      logoutParams: {
        federate: true,
      },
    });
  }
}
