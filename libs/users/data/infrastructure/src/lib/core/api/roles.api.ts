import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from 'libs/shared/constants';
import { UserRoleModel } from '../../../../../domain/models/user-role.model';

@Injectable()
export class RolesUsersApi {
  private readonly httpService = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

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
