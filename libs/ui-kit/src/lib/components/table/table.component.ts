import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { ITableSortValue } from '@showtime/shared/interfaces';
import { SortDirectionIconPipe } from '@showtime/shared/pipes';
import { TableHeaderItemDirectiveDirective, TableRowDirective } from '@showtime/shared/directives';
import { ETableSortDirection } from '@showtime/shared/enums';

@Component({
  selector: 'uik-table',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, SortDirectionIconPipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends object> {
  @Input() data: T[] = [];
  @Input() sort: ITableSortValue | undefined;

  @Output() sorted = new EventEmitter<ITableSortValue | null>();

  @ContentChild(TableRowDirective<T>)
  row!: TableRowDirective<T>;

  @ContentChildren(TableHeaderItemDirectiveDirective)
  headerItems!: QueryList<TableHeaderItemDirectiveDirective>;

  public onSort(field: string | null, direction: ETableSortDirection = ETableSortDirection.ASC): void {
    const sortValue =
      (field && {
        field,
        direction: this.toggleDirection(direction),
      }) ||
      null;
    this.sorted.emit(sortValue);
  }

  private toggleDirection(direction: ETableSortDirection): ETableSortDirection {
    return direction === ETableSortDirection.ASC ? ETableSortDirection.DESC : ETableSortDirection.ASC;
  }
}
