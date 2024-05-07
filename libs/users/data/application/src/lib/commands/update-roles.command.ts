import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUsersUpdateRolesPayload, UsersRepository } from '@showtime/users/domain';
import { BaseCqrsCommand } from '@showtime/shared/utils';

@Injectable()
export class UpdateRolesCommand extends BaseCqrsCommand<IUsersUpdateRolesPayload, void> {
  private readonly usersRepository = inject(UsersRepository);

  public override command(payload: IUsersUpdateRolesPayload): Observable<void> {
    return this.usersRepository.updateRoles(payload);
  }
}
