import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UserModel } from '../../../../../../../auth/domain/src/lib/core/models/user.model';
import { UserManagementMenuContainer } from '../../containers/user-management-menu/user-management-menu.container';

@Component({
  selector: 'st-users-table-row',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, UserManagementMenuContainer],
  templateUrl: './users-table-row.component.html',
  styleUrls: ['./users-table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableRowComponent {
  @Input() user!: UserModel;
}
