import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../../auth/domain/src/lib/core/models/user.model';
import { UsersApi } from '../../core/api/users.api';

@Injectable()
export class UpdateCommand extends BaseCqrsCommand<Partial<UserModel>> {
  private usersApi = inject(UsersApi);

  public override command(payload: { id: string; body: Partial<UserModel> }): Observable<void> {
    return this.usersApi.update(payload);
  }
}
