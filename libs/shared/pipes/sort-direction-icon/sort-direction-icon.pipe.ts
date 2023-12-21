import { Pipe, PipeTransform } from '@angular/core';
import { ETableSortDirection } from '../../enums/table-sort-direction.enum';

@Pipe({
  name: 'sortDirectionIcon',
  pure: true,
  standalone: true,
})
export class SortDirectionIconPipe implements PipeTransform {
  transform(value: ETableSortDirection | undefined): string {
    return value === ETableSortDirection.ASC ? 'assets/svg/angle-down.svg' : 'assets/svg/angle-up.svg';
  }
}
