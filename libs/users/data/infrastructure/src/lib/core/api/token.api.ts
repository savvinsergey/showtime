import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENVIRONMENT } from 'libs/shared/constants';
import { IGetTokenResponse } from '../../../../../domain/interfaces/get-token-response.interface';

@Injectable()
export class TokenUsersApi {
  private readonly httpService = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

  // ------------------- //

  public getToken(): Observable<string> {
    const { url, clientId: client_id, clientSecret: client_secret } = this.environment.auth0Api;
    const reqUrl = `${url}/oauth/token`;
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
      .post<IGetTokenResponse>(reqUrl, body, { headers })
      .pipe(map(({ access_token }) => access_token));
  }
}
