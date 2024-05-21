import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import type { IUsersUpdateRolesPayload } from '@showtime/users/domain';
import { UsersRepository } from '@showtime/users/domain';
import type { Observable } from 'rxjs';

@Injectable()
export class UpdateRolesCommand extends BaseCqrsCommand<IUsersUpdateRolesPayload, void> {
  private readonly usersRepository = inject(UsersRepository);

  public override command(payload: IUsersUpdateRolesPayload): Observable<void> {
    return this.usersRepository.updateRoles(payload);
  }
}
