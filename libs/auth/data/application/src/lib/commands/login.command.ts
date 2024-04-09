import { inject, Injectable } from '@angular/core';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../../../domain/repositories/auth.repo';

@Injectable()
export class LoginCommand extends BaseCqrsCommand<null, void> {
  private authRepository = inject(AuthRepository);

  public command(): Observable<void> {
    return this.authRepository.login();
  }
}
