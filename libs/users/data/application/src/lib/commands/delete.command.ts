import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from 'libs/shared/utils';
import { Observable } from 'rxjs';
import { UsersRepository } from '../../../../domain/repositories/users.repo';

@Injectable()
export class DeleteCommand extends BaseCqrsCommand<string, void> {
  private readonly usersRepository = inject(UsersRepository);

  public override command(id: string): Observable<void> {
    return this.usersRepository.delete(id);
  }
}
