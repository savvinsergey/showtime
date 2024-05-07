import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseCqrsCommand } from '@showtime/shared/utils';
import { AuthRepository } from '@showtime/auth/domain';

@Injectable()
export class LoginCommand extends BaseCqrsCommand<null, void> {
  private authRepository = inject(AuthRepository);

  public command(): Observable<void> {
    return this.authRepository.login();
  }
}
