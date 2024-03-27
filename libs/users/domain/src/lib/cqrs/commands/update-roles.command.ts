import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import { Observable } from 'rxjs';
import { UsersApi } from '../../core/api/users.api';
import { IUsersUpdateRolesPayload } from '../../interfaces/users-update-roles-payload.interface';

@Injectable()
export class UpdateRolesCommand extends BaseCqrsCommand<IUsersUpdateRolesPayload, void> {
  private usersApi = inject(UsersApi);

  public override command(payload: IUsersUpdateRolesPayload): Observable<void> {
    return this.usersApi.updateRoles(payload);
  }
}
