import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '@showtime/ui-kit';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UserModel } from '../../../../../../../auth/domain/src/lib/core/models/user.model';
import { UsersTableRowComponent } from '../users-table-row/users-table-row.component';

@Component({
  selector: 'st-users-table',
  standalone: true,
  imports: [CommonModule, DropdownComponent, InlineSVGModule, UsersTableRowComponent],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  @Input() users: UserModel[] = [];
}
