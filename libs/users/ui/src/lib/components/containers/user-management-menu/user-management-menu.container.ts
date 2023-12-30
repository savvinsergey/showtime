import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UserModel } from '../../../../../../../auth/domain/src/lib/core/models/user.model';
import { DropdownComponent } from '@showtime/ui-kit';
import { UserManagementMenuService } from './user-management-menu.service';
import { SearchFieldComponent } from '../../../../../../../shared/components/search-field/search-field.component';
import { UsersFacade } from '@showtime/users/abstract';
import { UserManagementMenuComponent } from '../../presentional/user-management-menu/user-management-menu.component';
import { RolesManagementContainer } from '../roles-management/roles-management.container';
import { EventHandlerPipe } from '../../../../../../../shared/pipes/event-handler/event-handler.pipe';
import { ModalsService } from '../../../../../../../shared/services/modals.service';
import { Confirm } from '../../../../../../../shared/decorators/confirm.decorator';
import { AlertToastComponent } from '../../../../../../../shared/components/alert-toast/alert-toast.component';
import { Alert } from '../../../../../../../shared/decorators/alert.decorator';
import { EUserManagementClick } from '../../../enums/user-management-click.enum';

@Component({
  selector: 'st-user-management-menu_c',
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
  private readonly usersFacade = inject(UsersFacade);
  private readonly userManagementMenuService = inject(UserManagementMenuService);
  private readonly modalsService = inject(ModalsService);

  // ------------------- //

  @Input() user!: UserModel;

  private readonly clickHandlerMap = {
    [EUserManagementClick.BLOCK_USER]: this.blockUser,
    [EUserManagementClick.DELETE_USER]: this.deleteUser,
    [EUserManagementClick.ROLE_MANAGEMENT]: this.openRolesManagementModal,
  };

  public readonly menuConfig$ = this.userManagementMenuService.menuConfig$;

  public onClick(clickType: EUserManagementClick, user: UserModel): any {
    this.clickHandlerMap[clickType]?.call<this, [UserModel], any>(this, user);
  }

  @Confirm('This user will be (un)blocked. Are you sure?')
  @Alert({
    success: 'User was (un)blocked successfully',
    error: 'User was not (un)blocked. Something went wrong',
  })
  private blockUser(user: UserModel) {
    return this.usersFacade.block(user);
  }

  @Confirm('This user will be deleted. Are you sure?')
  @Alert({
    success: 'User was deleted successfully',
    error: 'User was not deleted. Something went wrong',
  })
  private deleteUser(user: UserModel) {
    return this.usersFacade.delete(user.user_id);
  }

  private openRolesManagementModal(user: UserModel) {
    this.modalsService.open<RolesManagementContainer, string>(RolesManagementContainer, user.user_id);
  }
}
