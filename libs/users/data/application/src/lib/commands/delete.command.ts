import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import { UsersRepository } from '@showtime/users/domain';
import type { Observable } from 'rxjs';

@Injectable()
export class DeleteCommand extends BaseCqrsCommand<string, void> {
  private readonly usersRepository = inject(UsersRepository);

  public override command(id: string): Observable<void> {
    return this.usersRepository.delete(id);
  }
}
