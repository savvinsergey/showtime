import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  IAllUsersPayload,
  IUsersUpdateRolesPayload,
  IUserUpdatePayload,
  UserModel,
  UserRoleModel,
} from '@showtime/users/domain';
import { ENVIRONMENT } from '@showtime/shared/const';

@Injectable()
export class UsersApi {
  private readonly httpService = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

  // ---------------- //

  private readonly reqUrl: string = '';

  constructor() {
    const { url } = this.environment.auth0Api;
    this.reqUrl = `${url}/api/v2`;
  }

  public getAll(payload?: IAllUsersPayload): Observable<UserModel[]> {
    const params = new HttpParams({
      fromObject: (payload && { ...payload }) || {},
    });

    return this.httpService.get<UserModel[]>(`${this.reqUrl}/users`, { params });
  }

  public delete(id: string): Observable<void> {
    return this.httpService.delete<void>(`${this.reqUrl}/users/${id}`);
  }

  public update({ id, body }: IUserUpdatePayload): Observable<UserModel> {
    return this.httpService.patch<UserModel>(`${this.reqUrl}/users/${id}`, body);
  }

  // ----- USER ROLES ----- //

  public getRoles(id: string): Observable<UserRoleModel[]> {
    return this.httpService.get<UserRoleModel[]>(`${this.reqUrl}/users/${id}/roles`);
  }

  public updateRoles({ id, roles }: IUsersUpdateRolesPayload): Observable<void> {
    return this.httpService.post<void>(`${this.reqUrl}/users/${id}/roles`, { roles });
  }
}
