import { Directive, inject, Input, TemplateRef } from '@angular/core';

interface TableRowContext<T extends object> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template[tableRow]',
  standalone: true,
})
export class TableRowDirective<T extends object> {
  public readonly templateRef: TemplateRef<TableRowContext<T>> = inject(
    TemplateRef<TableRowContext<T>>,
  );

  // -------------------- //

  @Input() tableRow?: T;

  static ngTemplateContextGuard<TContext extends object>(
    directive: TableRowDirective<TContext>,
    context: unknown,
  ): context is TableRowContext<TContext> {
    return true;
  }
}
