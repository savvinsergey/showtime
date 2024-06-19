import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  inject,
  Input,
} from '@angular/core';
import { AlertToastComponent, SearchFieldComponent } from '@showtime/shared/components';
import { Alert, Confirm } from '@showtime/shared/decorators';
import { EventHandlerPipe } from '@showtime/shared/pipes';
import { ModalsService } from '@showtime/shared/services';
import { DropdownComponent } from '@showtime/ui-kit';
import type { UserModel } from '@showtime/users/domain';
import { UsersUiFacade } from '@showtime/users/ui/abstract';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { EUserManagementClick } from '../../../enums';
import { UserManagementMenuComponent } from '../../presentional';
import { RolesManagementContainer } from '../roles-management/roles-management.container';
import { UserManagementMenuService } from './user-management-menu.service';

@Component({
  selector: 'st-user-management-menu-c',
  standalone: true,
  imports: [
    CommonModule,
    DropdownComponent,
    InlineSVGModule,
    SearchFieldComponent,
    UserManagementMenuComponent,
    RolesManagementContainer,
    EventHandlerPipe,
    AlertToastComponent,
  ],
  templateUrl: './user-management-menu.container.html',
  styleUrls: ['./user-management-menu.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserManagementMenuService],
})
export class UserManagementMenuContainer {
  private readonly modalsService = inject(ModalsService);
  private readonly userManagementMenuService = inject(UserManagementMenuService);
  private readonly usersUiFacade = inject(UsersUiFacade);
  private readonly envInjector = inject(EnvironmentInjector);

  // ------------------- //

  @Input() user!: UserModel;

  private readonly clickHandlerMap = {
    [EUserManagementClick.BLOCK_USER]: this.blockUser,
    [EUserManagementClick.DELETE_USER]: this.deleteUser,
    [EUserManagementClick.ROLE_MANAGEMENT]: this.openRolesManagementModal,
  };

  public readonly menuConfig$ = this.userManagementMenuService.menuConfig$;

  public onClick(clickType: EUserManagementClick, user: UserModel): void {
    const method = this.clickHandlerMap[clickType];
    method?.call<this, [UserModel], ReturnType<typeof method>>(this, user);
  }

  @Confirm('This user will be (un)blocked. Are you sure?')
  @Alert({
    success: 'User was (un)blocked successfully',
    error: 'User was not (un)blocked. Something went wrong',
  })
  private blockUser(user: UserModel) {
    return this.usersUiFacade.block(user);
  }

  @Confirm('This user will be deleted. Are you sure?')
  @Alert({
    success: 'User was deleted successfully',
    error: 'User was not deleted. Something went wrong',
  })
  private deleteUser({ user_id }: UserModel) {
    return this.usersUiFacade.delete(user_id);
  }

  private openRolesManagementModal({ user_id }: UserModel) {
    this.modalsService.open<RolesManagementContainer, string>(
      RolesManagementContainer,
      this.envInjector,
      user_id,
    );
  }
}
