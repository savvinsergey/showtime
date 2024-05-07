import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUserUpdatePayload, UserModel, UsersRepository } from '@showtime/users/domain';
import { BaseCqrsCommand } from '@showtime/shared/utils';

@Injectable()
export class UpdateCommand extends BaseCqrsCommand<IUserUpdatePayload, UserModel> {
  private readonly usersRepository = inject(UsersRepository);

  public override command(payload: IUserUpdatePayload): Observable<UserModel> {
    return this.usersRepository.update(payload);
  }
}
