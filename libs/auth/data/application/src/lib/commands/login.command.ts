import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '@showtime/auth/domain';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import type { Observable } from 'rxjs';

@Injectable()
export class LoginCommand extends BaseCqrsCommand<null, void> {
  private readonly authRepository = inject(AuthRepository);

  public command(): Observable<void> {
    return this.authRepository.login();
  }
}
