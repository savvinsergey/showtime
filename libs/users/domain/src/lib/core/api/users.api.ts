import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT } from '@showtime/shared/const';
import { User } from '@auth0/auth0-angular';
import { IUserRole } from '../../interfaces/user-roles.interface';
import { UserModel } from '../../../../../../auth/domain/src/lib/core/models/user.model';
import { IAllUsersPayload } from '../../interfaces/users-all-payload.interface';

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

  public getAll(payload?: IAllUsersPayload): Observable<User[]> {
    const params = new HttpParams({
      fromObject: payload as any | {},
    });

    return this.httpService.get<User[]>(`${this.reqUrl}/users`, { params }).pipe(delay(1000));
  }

  public delete(id: string): Observable<any> {
    return this.httpService.delete<void>(`${this.reqUrl}/users/${id}`);
  }

  public update({ id, body }: { id: string; body: Partial<UserModel> }): Observable<any> {
    return this.httpService.patch<void>(`${this.reqUrl}/users/${id}`, body);
  }

  // ----- USER ROLES ----- //

  public getRoles(id: string): Observable<IUserRole[]> {
    return this.httpService.get<IUserRole[]>(`${this.reqUrl}/users/${id}/roles`);
  }

  public updateRoles({ id, roles }: { id: string; roles: string[] }) {
    return this.httpService.post<void>(`${this.reqUrl}/users/${id}/roles`, { roles });
  }
}
