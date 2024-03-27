import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../../auth/domain/src/lib/core/models/user.model';
import { UsersApi } from '../../core/api/users.api';
import { IUserUpdatePayload } from '../../interfaces/user-update-payload.interface';

@Injectable()
export class UpdateCommand extends BaseCqrsCommand<IUserUpdatePayload, UserModel> {
  private usersApi = inject(UsersApi);

  public override command(payload: IUserUpdatePayload): Observable<UserModel> {
    return this.usersApi.update(payload);
  }
}
