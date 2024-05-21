import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Alert } from '@showtime/shared/decorators';
import type { IModal } from '@showtime/shared/interfaces';
import { EventHandlerPipe } from '@showtime/shared/pipes';
import { ModalComponent } from '@showtime/ui-kit';
import type { UserRoleModel } from '@showtime/users/domain';
import { UsersFacade } from '@showtime/users/ui/facade';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { RolesManagementComponent } from '../../presentional';
import { RolesManagementService } from './roles-management.service';

@Component({
  selector: 'st-roles-management-c',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  private readonly rolesManagementService = inject(RolesManagementService);
  private readonly usersFacade = inject(UsersFacade);

  // -------------------- //

  @ViewChild(RolesManagementComponent)
  public readonly rolesManagementModal!: RolesManagementComponent;

  public readonly allRoles$ = this.usersFacade.state.allRoles$;
  public readonly userRoles$ = this.usersFacade.state.userRoles$;
  public readonly close$ = this.rolesManagementService.close$;
  public readonly config$ = this.rolesManagementService.config$;

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

    this.rolesManagementModal?.open(userId);
  }

  public close() {
    this.rolesManagementModal.close();
  }
}
