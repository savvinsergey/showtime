import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '@showtime/ui-kit';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { UsersTableRowComponent } from '../users-table-row/users-table-row.component';
import { EUsersTableSort } from '../../../enums';
import { USERS_TABLE_DEFAULT_SORT } from '../../../constants';

import { UserModel } from '@showtime/users/domain';
import { TableComponent } from '@showtime/ui-kit';
import { SortDirectionIconPipe } from '@showtime/shared/pipes';
import { ITableSortValue } from '@showtime/shared/interfaces';
import { TableHeaderItemDirectiveDirective, TableRowDirective } from '@showtime/shared/directives';

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
