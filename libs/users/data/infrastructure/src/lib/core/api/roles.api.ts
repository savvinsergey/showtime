import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@showtime/shared/const';
import type { UserRoleModel } from '@showtime/users/domain';
import type { Observable } from 'rxjs';

@Injectable()
export class RolesUsersApi {
  private readonly environment = inject(ENVIRONMENT);
  private readonly httpService = inject(HttpClient);

  // ---------------- //

  private readonly reqUrl: string = '';

  constructor() {
    const { url } = this.environment.auth0Api;
    this.reqUrl = `${url}/api/v2`;
  }

  public getAll(): Observable<UserRoleModel[]> {
    return this.httpService.get<UserRoleModel[]>(`${this.reqUrl}/roles`);
  }
}
