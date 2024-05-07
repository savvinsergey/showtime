import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownUserService } from './dropdown-user.service';
import { DropdownUserComponent } from '../../presentational';
import { AuthFacade } from '../../../facades';

import { AuthAbstractModule } from '@showtime/auth/abstract';

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

  // ----------------------- //

  public readonly user$ = this.authFacade.state.user$;
}
