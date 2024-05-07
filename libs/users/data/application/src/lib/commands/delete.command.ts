import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersRepository } from '@showtime/users/domain';
import { BaseCqrsCommand } from '@showtime/shared/utils';

@Injectable()
export class DeleteCommand extends BaseCqrsCommand<string, void> {
  private readonly usersRepository = inject(UsersRepository);

  public override command(id: string): Observable<void> {
    return this.usersRepository.delete(id);
  }
}
