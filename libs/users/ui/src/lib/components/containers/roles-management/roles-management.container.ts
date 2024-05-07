import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';

import { RolesManagementComponent } from '../../presentional';
import { RolesManagementService } from './roles-management.service';

import { ModalComponent } from '@showtime/ui-kit';
import { IModal } from '@showtime/shared/interfaces';
import { EventHandlerPipe } from '@showtime/shared/pipes';
import { UsersFacade } from '@showtime/users/ui/facade';
import { Alert } from '@showtime/shared/decorators';
import { UserRoleModel } from '@showtime/users/domain';
import { UsersAbstractModule } from '@showtime/users/abstract';

@Component({
  selector: 'st-roles-management_c',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersAbstractModule,
    InlineSVGModule,
    ModalComponent,
    RolesManagementComponent,
    EventHandlerPipe,
  ],
  providers: [RolesManagementService],
  templateUrl: './roles-management.container.html',
  styleUrls: ['./roles-management.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesManagementContainer implements IModal<string> {
  private readonly usersFacade = inject(UsersFacade);
  private readonly rolesManagementService = inject(RolesManagementService);

  // -------------------- //

  @ViewChild(RolesManagementComponent)
  public rolesManagementModal!: RolesManagementComponent;

  public readonly allRoles$ = this.usersFacade.state.allRoles$;
  public readonly userRoles$ = this.usersFacade.state.userRoles$;
  public readonly config$ = this.rolesManagementService.config$;
  public readonly close$ = this.rolesManagementService.close$;

  public onClose = () => this.close();

  @Alert({
    success: 'User roles were changed successfully',
    error: 'User roles were not changed. Something went wrong',
  })
  public onAssign(userId: string, roles: UserRoleModel[]) {
    return this.usersFacade.updateRoles(userId, roles);
  }

  public open(userId: string): void {
    this.usersFacade.getRoles(userId);

    this.rolesManagementModal.open(userId);
  }

  public close() {
    this.rolesManagementModal.close();
  }
}
