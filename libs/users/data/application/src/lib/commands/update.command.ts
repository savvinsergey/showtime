import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import type { IUserUpdatePayload, UserModel } from '@showtime/users/domain';
import { UsersRepository } from '@showtime/users/domain';
import type { Observable } from 'rxjs';

@Injectable()
export class UpdateCommand extends BaseCqrsCommand<IUserUpdatePayload, UserModel> {
  private readonly usersRepository = inject(UsersRepository);

  public override command(payload: IUserUpdatePayload): Observable<UserModel> {
    return this.usersRepository.update(payload);
  }
}
