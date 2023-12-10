import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthAbstractModule, AuthFacade } from '@showtime/auth/abstract';

import { DropdownUserComponent } from '../../presentational/dropdown-user/dropdown-user.component';
import { DropdownUserService } from './dropdown-user.service';

@Component({
  standalone: true,
  imports: [CommonModule, AuthAbstractModule, DropdownUserComponent],
  providers: [DropdownUserService],
  selector: 'st-dropdown-user_c',
  templateUrl: './dropdown-user.container.html',
  styleUrls: ['./dropdown-user.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownUserContainer {
  public readonly authFacade = inject(AuthFacade);
  public readonly dropdownUserService = inject(DropdownUserService);

  public readonly user$ = this.authFacade.state['user'].value$;
}
