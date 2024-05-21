import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthAbstractModule } from '@showtime/auth/abstract';

import { AuthFacade } from '../../../facades';
import { DropdownUserComponent } from '../../presentational';
import { DropdownUserService } from './dropdown-user.service';

@Component({
  standalone: true,
  imports: [CommonModule, AuthAbstractModule, DropdownUserComponent],
  providers: [DropdownUserService],
  selector: 'st-dropdown-user-c',
  templateUrl: './dropdown-user.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownUserContainer {
  public readonly authFacade = inject(AuthFacade);
  public readonly dropdownUserService = inject(DropdownUserService);

  // ----------------------- //

  public readonly user$ = this.authFacade.state.user$;
}
