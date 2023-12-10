import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from '@showtime/shared/const';

@Injectable({
  providedIn: 'root',
})
export class RolesUsersApi {
  private readonly httpService = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

  // ---------------- //

  private readonly reqUrl: string = '';

  constructor() {
    const { url } = this.environment.auth0Api;
    this.reqUrl = `${url}/api/v2`;
  }

  public getAll(): Observable<string[]> {
    return this.httpService.get<string[]>(`${this.reqUrl}/roles`);
  }
}
