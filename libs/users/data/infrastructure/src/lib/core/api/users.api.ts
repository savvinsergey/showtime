import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT } from 'libs/shared/constants';
import { UserRoleModel } from '../../../../../domain/models/user-role.model';
import { IAllUsersPayload } from '../../../../../domain/interfaces/users-all-payload.interface';
import { IUsersUpdateRolesPayload } from '../../../../../domain/interfaces/users-update-roles-payload.interface';
import { IUserUpdatePayload } from '../../../../../domain/interfaces/user-update-payload.interface';
import { UserModel } from '../../../../../domain/models/user.model';

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
