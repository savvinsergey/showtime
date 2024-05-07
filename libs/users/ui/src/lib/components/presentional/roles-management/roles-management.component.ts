import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { CheckboxGroupComponent, ModalComponent } from '@showtime/ui-kit';
import { UserRoleModel } from '@showtime/users/domain';
import { IRolesManagementConfig } from '@showtime/users/ui';

@Component({
  selector: 'st-roles-management',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, ModalComponent, ReactiveFormsModule, CheckboxGroupComponent],
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesManagementComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  // -------------------- //

  @Input() allRoles: UserRoleModel[] = [];
  @Input() userRoles: UserRoleModel[] = [];
  @Input() config!: IRolesManagementConfig;

  @Output() assigned = new EventEmitter<UserRoleModel[]>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild(ModalComponent, { read: ModalComponent })
  private modal!: ModalComponent;

  public readonly rolesControl = this.fb.nonNullable.control([]);

  public get userId() {
    return this.modal.context as string;
  }

  public get inProgress() {
    return this.config?.inProgress;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const userRoles = changes?.['userRoles']?.currentValue;
    if (userRoles?.length) {
      this.rolesControl.setValue(userRoles);
    }
  }

  public open(userId: string) {
    this.modal.open<string>(userId);
  }

  public close() {
    this.modal.close();
  }
}
