import { CommonModule } from '@angular/common';
import type { OnChanges, SimpleChanges } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent, ModalComponent } from '@showtime/ui-kit';
import type { UserRoleModel } from '@showtime/users/domain';
import type { IRolesManagementConfig } from '@showtime/users/ui';
import { InlineSVGModule } from 'ng-inline-svg-2';

@Component({
  selector: 'st-roles-management',
  standalone: true,
  imports: [
    CommonModule,
    InlineSVGModule,
    ModalComponent,
    ReactiveFormsModule,
    CheckboxGroupComponent,
  ],
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesManagementComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  // -------------------- //

  @Input() public userRoles: UserRoleModel[] = [];
  @Input() public allRoles: UserRoleModel[] = [];
  @Input() public config!: IRolesManagementConfig;

  @Output() public readonly assigned = new EventEmitter<UserRoleModel[]>();
  @Output() public readonly closed = new EventEmitter<void>();

  @ViewChild(ModalComponent, { read: ModalComponent }) private modal!: ModalComponent;

  public readonly rolesControl = this.fb.nonNullable.control([]);

  public get inProgress() {
    return this.config?.inProgress;
  }

  public get userId() {
    return this.modal.context as string;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const userRoles = changes?.['userRoles']?.currentValue;
    if (userRoles?.length) {
      this.rolesControl.setValue(userRoles);
    }
  }

  public close() {
    this.modal.close();
  }

  public open(userId: string) {
    this.modal.open<string>(userId);
  }
}
