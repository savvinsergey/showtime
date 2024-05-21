import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableHeaderItemDirectiveDirective, TableRowDirective } from '@showtime/shared/directives';
import type { ITableSortValue } from '@showtime/shared/interfaces';
import { SortDirectionIconPipe } from '@showtime/shared/pipes';
import { DropdownComponent, TableComponent } from '@showtime/ui-kit';
import type { UserModel } from '@showtime/users/domain';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { USERS_TABLE_DEFAULT_SORT } from '../../../constants';
import { EUsersTableSort } from '../../../enums';
import { UsersTableRowComponent } from '../users-table-row/users-table-row.component';

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
  @Input() sort: ITableSortValue = USERS_TABLE_DEFAULT_SORT;
  @Input() users: UserModel[] = [];

  @Output() sorted = new EventEmitter<ITableSortValue | null>();

  public readonly usersTableSortEnum = EUsersTableSort;
}
