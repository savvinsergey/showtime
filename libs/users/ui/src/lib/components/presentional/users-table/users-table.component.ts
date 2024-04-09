import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '@showtime/ui-kit';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UsersTableRowComponent } from '../users-table-row/users-table-row.component';
import { EUsersTableSort } from '../../../enums/users-table-sort.enum';
import { ITableSortValue } from '../../../../../../../shared/interfaces/table-sort-value.interface';
import { SortDirectionIconPipe } from '../../../../../../../shared/pipes/sort-direction-icon/sort-direction-icon.pipe';
import { USERS_TABLE_DEFAULT_SORT } from '../../../constants/users-table-default-sort.const';
import { TableComponent } from '../../../../../../../ui-kit/src/lib/components/table/table.component';
import { TableHeaderItemDirectiveDirective } from '../../../../../../../shared/directives/table-header-item.directive';
import { TableRowDirective } from '../../../../../../../shared/directives/table-row.directive';
import { UserModel } from '../../../../../../data/domain/models/user.model';

@Component({
  selector: 'st-users-table',
  standalone: true,
  imports: [
    CommonModule,
    DropdownComponent,
    InlineSVGModule,
    UsersTableRowComponent,
    SortDirectionIconPipe,
    TableComponent,
    TableHeaderItemDirectiveDirective,
    TableRowDirective,
  ],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  @Input() users: UserModel[] = [];
  @Input() sort: ITableSortValue = USERS_TABLE_DEFAULT_SORT;

  @Output() sorted = new EventEmitter<ITableSortValue | null>();

  public readonly usersTableSortEnum = EUsersTableSort;
}
