import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENVIRONMENT } from '@showtime/shared/const';
import { UsersFacade } from '@showtime/users/ui/facade';
import { first, switchMap } from 'rxjs';

export const usersAuthTokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const usersFacade = inject(UsersFacade);
  const environment = inject(ENVIRONMENT);

  // ---------------- //

  if (
    !request.url.includes(environment.auth0Api.url) ||
    request.url.includes('oauth/token') ||
    !usersFacade.state.usersToken$
  ) {
    return next(request);
  }

  return usersFacade.state.usersToken$.pipe(
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
