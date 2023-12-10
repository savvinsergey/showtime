import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import { Observable } from 'rxjs';
import { UsersApi } from '../../core/api/users.api';

@Injectable()
export class UpdateRolesCommand extends BaseCqrsCommand<{ id: string; roles: string[] }> {
  private usersApi = inject(UsersApi);

  public override command(payload: { id: string; roles: string[] }): Observable<void> {
    return this.usersApi.updateRoles(payload);
  }
}
