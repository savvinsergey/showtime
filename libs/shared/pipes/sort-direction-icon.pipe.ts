import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

import { ETableSortDirection } from '../enums';

@Pipe({
  name: 'sortDirectionIcon',
  pure: true,
  standalone: true,
})
export class SortDirectionIconPipe implements PipeTransform {
  transform(value: ETableSortDirection | undefined): string {
    return value === ETableSortDirection.ASC
      ? 'assets/svg/angle-down.svg'
      : 'assets/svg/angle-up.svg';
  }
}
