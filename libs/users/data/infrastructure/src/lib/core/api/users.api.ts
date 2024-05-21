import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@showtime/shared/const';
import type {
  IAllUsersPayload,
  IUsersUpdateRolesPayload,
  IUserUpdatePayload,
  UserModel,
  UserRoleModel,
} from '@showtime/users/domain';
import type { Observable } from 'rxjs';

@Injectable()
export class UsersApi {
  private readonly environment = inject(ENVIRONMENT);
  private readonly httpService = inject(HttpClient);

  // ---------------- //

  private readonly reqUrl: string = '';

  constructor() {
    const { url } = this.environment.auth0Api;
    this.reqUrl = `${url}/api/v2`;
  }

  public delete(id: string): Observable<void> {
    return this.httpService.delete<void>(`${this.reqUrl}/users/${id}`);
  }

  public getAll(payload?: IAllUsersPayload): Observable<UserModel[]> {
    const parameters = new HttpParams({
      fromObject: (payload && { ...payload }) || {},
    });

    return this.httpService.get<UserModel[]>(`${this.reqUrl}/users`, { params: parameters });
  }

  public getRoles(id: string): Observable<UserRoleModel[]> {
    return this.httpService.get<UserRoleModel[]>(`${this.reqUrl}/users/${id}/roles`);
  }

  // ----- USER ROLES ----- //

  public update({ id, body }: IUserUpdatePayload): Observable<UserModel> {
    return this.httpService.patch<UserModel>(`${this.reqUrl}/users/${id}`, body);
  }

  public updateRoles({ id, roles }: IUsersUpdateRolesPayload): Observable<void> {
    return this.httpService.post<void>(`${this.reqUrl}/users/${id}/roles`, { roles });
  }
}
