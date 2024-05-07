import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthRepository } from '@showtime/auth/domain';
import { BaseCqrsCommand } from '@showtime/shared/utils';

@Injectable()
export class LogoutCommand extends BaseCqrsCommand<null, void> {
  private authRepository = inject(AuthRepository);

  public command(): Observable<void> {
    return this.authRepository.logout();
  }
}
