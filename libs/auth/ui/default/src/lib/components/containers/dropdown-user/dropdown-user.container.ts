import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthUiFacade } from '@showtime/auth/ui/abstract';

import { DropdownUserComponent } from '../../presentational';
import { DropdownUserService } from './dropdown-user.service';

@Component({
  standalone: true,
  imports: [CommonModule, DropdownUserComponent],
  providers: [DropdownUserService],
  selector: 'st-dropdown-user-c',
  templateUrl: './dropdown-user.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownUserContainer {
  public readonly authUiFacade = inject(AuthUiFacade);
  public readonly dropdownUserService = inject(DropdownUserService);

  // ----------------------- //

  public readonly user$ = this.authUiFacade.state.user$;
}
