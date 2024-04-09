import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { first, switchMap } from 'rxjs';
import { ENVIRONMENT } from '@showtime/shared/const';
import { UsersFacade } from '../../../../ui/src/lib/facades/users.facade';

export const usersAuthTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const usersFacade = inject(UsersFacade);
  const environment = inject(ENVIRONMENT);

  // ---------------- //

  if (
    req.url.indexOf(environment.auth0Api.url) === -1 ||
    req.url.indexOf('oauth/token') !== -1 ||
    !usersFacade.state.usersToken$
  ) {
    return next(req);
  }

  return usersFacade.state.usersToken$.pipe(
    first(Boolean),
    switchMap((token: string) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      const modifiedReq = req.clone({ headers });

      return next(modifiedReq);
    }),
  );
};
