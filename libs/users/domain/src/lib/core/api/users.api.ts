import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT } from '@showtime/shared/const';
import { IUserRole } from '../../interfaces/user-roles.interface';
import { UserModel } from '../../../../../../auth/domain/src/lib/core/models/user.model';
import { IAllUsersPayload } from '../../interfaces/users-all-payload.interface';
import { IUsersUpdateRolesPayload } from '../../interfaces/users-update-roles-payload.interface';
import { IUserUpdatePayload } from '../../interfaces/user-update-payload.interface';

// TODO: Why root
@Injectable({
  providedIn: 'root',
})
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

    return this.httpService.get<UserModel[]>(`${this.reqUrl}/users`, { params }).pipe(delay(1000));
  }

  public delete(id: string): Observable<void> {
    return this.httpService.delete<void>(`${this.reqUrl}/users/${id}`);
  }

  public update({ id, body }: IUserUpdatePayload): Observable<UserModel> {
    return this.httpService.patch<UserModel>(`${this.reqUrl}/users/${id}`, body);
  }

  // ----- USER ROLES ----- //

  public getRoles(id: string): Observable<IUserRole[]> {
    return this.httpService.get<IUserRole[]>(`${this.reqUrl}/users/${id}/roles`);
  }

  public updateRoles({ id, roles }: IUsersUpdateRolesPayload): Observable<void> {
    return this.httpService.post<void>(`${this.reqUrl}/users/${id}/roles`, { roles });
  }
}
