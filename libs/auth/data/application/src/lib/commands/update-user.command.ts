import { inject, Injectable } from '@angular/core';
import type { UserModel } from '@showtime/auth/domain';
import { AuthRepository } from '@showtime/auth/domain';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class UpdateUserCommand extends BaseCqrsCommand<UserModel, void> {
  private readonly authRepository = inject(AuthRepository);

  public command(payload: UserModel): Observable<void> {
    this.authRepository.user = payload;
    return of(void 0);
  }
}
