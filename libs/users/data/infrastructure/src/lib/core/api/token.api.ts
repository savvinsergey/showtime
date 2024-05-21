import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@showtime/shared/const';
import type { IGetTokenResponse } from '@showtime/users/domain';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class TokenUsersApi {
  private readonly environment = inject(ENVIRONMENT);
  private readonly httpService = inject(HttpClient);

  // ------------------- //

  public getToken(): Observable<string> {
    const { url, clientId: client_id, clientSecret: client_secret } = this.environment.auth0Api;
    const requestUrl = `${url}/oauth/token`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      client_id,
      client_secret,
      audience: `${url}/api/v2/`,
      grant_type: 'client_credentials',
    };

    return this.httpService
      .post<IGetTokenResponse>(requestUrl, body, { headers })
      .pipe(map(({ access_token }) => access_token));
  }
}
