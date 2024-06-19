import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENVIRONMENT } from '@showtime/shared/const';
import { UsersUtilsFacade } from '@showtime/users/utils/abstract';
import { first, switchMap } from 'rxjs';

export const usersAuthTokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const usersUtilsFacade = inject(UsersUtilsFacade);
  const environment = inject(ENVIRONMENT);

  // ---------------- //

  if (
    !request.url.includes(environment.auth0Api.url) ||
    request.url.includes('oauth/token') ||
    !usersUtilsFacade.state.usersToken$
  ) {
    return next(request);
  }

  return usersUtilsFacade.state.usersToken$.pipe(
    first(Boolean),
    switchMap((token: string) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      const modifiedRequest = request.clone({ headers });

      return next(modifiedRequest);
    }),
  );
};
