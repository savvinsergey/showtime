import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UserModel } from '../../../../../../../auth/domain/src/lib/core/models/user.model';
import { DropdownComponent } from '@showtime/ui-kit';
import { EUserManagementClick } from '../../../enums/user-management-click.enum';
import { Observable } from 'rxjs';
import { IUserManagementMenuConfig } from '../../../interfaces/user-management-menu-config';

@Component({
  selector: 'st-user-management-menu',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, DropdownComponent],
  templateUrl: './user-management-menu.component.html',
  styleUrls: ['./user-management-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagementMenuComponent {
  @Input({ required: true }) user!: UserModel;
  @Input({ required: true }) config!: IUserManagementMenuConfig;

  @Output() clicked = new EventEmitter<EUserManagementClick>();

  public readonly userManagementClickEnum = EUserManagementClick;

  get id() {
    return this.user?.user_id;
  }
}
