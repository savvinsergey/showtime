import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import { Observable } from 'rxjs';
import { UsersApi } from '../../core/api/users.api';

@Injectable()
export class DeleteCommand extends BaseCqrsCommand<string, void> {
  private usersApi = inject(UsersApi);

  public override command(id: string): Observable<void> {
    return this.usersApi.delete(id);
  }
}
