import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from 'libs/shared/utils';
import { Observable } from 'rxjs';
import { IUsersUpdateRolesPayload } from '../../../../domain/interfaces/users-update-roles-payload.interface';
import { UsersRepository } from '../../../../domain/repositories/users.repo';

@Injectable()
export class UpdateRolesCommand extends BaseCqrsCommand<IUsersUpdateRolesPayload, void> {
  private readonly usersRepository = inject(UsersRepository);

  public override command(payload: IUsersUpdateRolesPayload): Observable<void> {
    return this.usersRepository.updateRoles(payload);
  }
}
