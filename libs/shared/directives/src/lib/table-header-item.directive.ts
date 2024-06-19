import { Directive, inject, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[tableHeaderItem]',
  standalone: true,
})
export class TableHeaderItemDirectiveDirective {
  public readonly templateRef = inject(TemplateRef);

  // ----------------- //

  @Input() sortValue!: string;
}
