import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortDirectionIconPipe } from '../../../../../shared/pipes/sort-direction-icon/sort-direction-icon.pipe';
import { TableHeaderItemDirectiveDirective } from '../../../../../shared/directives/table-header-item.directive';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ITableSortValue } from '../../../../../shared/interfaces/table-sort-value.interface';
import { ETableSortDirection } from '../../../../../shared/enums/table-sort-direction.enum';
import { EUsersTableSort } from '../../../../../users/ui/src/lib/enums/users-table-sort.enum';

@Component({
  selector: 'uik-table',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, SortDirectionIconPipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() sort!: ITableSortValue;
  @Output() sorted = new EventEmitter<ITableSortValue | null>();

  @ContentChildren(TableHeaderItemDirectiveDirective)
  headerItems!: QueryList<TableHeaderItemDirectiveDirective>;

  public onSort(field: EUsersTableSort | null, direction: ETableSortDirection = ETableSortDirection.ASC): void {
    const sortValue = (field && { field, direction: this.toggleDirection(direction) }) || null;
    this.sorted.emit(sortValue);
  }

  private toggleDirection(direction: ETableSortDirection): ETableSortDirection {
    return direction === ETableSortDirection.ASC ? ETableSortDirection.DESC : ETableSortDirection.ASC;
  }
}
