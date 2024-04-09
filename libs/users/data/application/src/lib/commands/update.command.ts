import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from 'libs/shared/utils';
import { Observable } from 'rxjs';
import { IUserUpdatePayload } from '../../../../domain/interfaces/user-update-payload.interface';
import { UsersRepository } from '../../../../domain/repositories/users.repo';
import { UserModel } from '../../../../domain/models/user.model';

@Injectable()
export class UpdateCommand extends BaseCqrsCommand<IUserUpdatePayload, UserModel> {
  private readonly usersRepository = inject(UsersRepository);

  public override command(payload: IUserUpdatePayload): Observable<UserModel> {
    return this.usersRepository.update(payload);
  }
}
