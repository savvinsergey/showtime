import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { UserManagementMenuContainer } from '../../containers';

import { LanguageNamePipe } from '@showtime/shared/pipes';
import { UserModel } from '@showtime/users/domain';

@Component({
  selector: 'st-users-table-row',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, UserManagementMenuContainer, LanguageNamePipe],
  templateUrl: './users-table-row.component.html',
  styleUrls: ['./users-table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableRowComponent {
  @Input() user!: UserModel;
}
