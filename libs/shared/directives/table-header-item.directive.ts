import { Directive, inject, Input, TemplateRef } from '@angular/core';
import { ITableSortValue } from '../interfaces/table-sort-value.interface';
import { EUsersTableSort } from '../../users/ui/src/lib/enums/users-table-sort.enum';

@Directive({
  selector: '[tableHeaderItem]',
  standalone: true,
})
export class TableHeaderItemDirectiveDirective {
  public readonly templateRef = inject(TemplateRef<any>);

  // ----------------- //

  @Input() sortValue!: EUsersTableSort;
}
