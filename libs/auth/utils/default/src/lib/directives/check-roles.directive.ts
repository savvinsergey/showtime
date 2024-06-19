import type { OnChanges, SimpleChanges } from '@angular/core';
import {
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { EUserRoles } from '@showtime/auth/shared';
import { AuthUtilsFacade } from '@showtime/auth/utils/abstract';

import { checkRoles } from '../operators/check-roles.operator';

@Directive({
  selector: '[checkAccess]',
})
export class CheckAccessDirective implements OnChanges {
  private readonly authUtilsFacade = inject(AuthUtilsFacade);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly template = inject(TemplateRef);
  private readonly vcr = inject(ViewContainerRef);

  // ------------------- //

  @Input('checkAccess') roles: EUserRoles[] | undefined;

  private readonly user$ = this.authUtilsFacade.state.user$;

  ngOnChanges(changes: SimpleChanges): void {
    const roles = changes['roles']?.currentValue;
    if (roles?.length) {
      // prettier-ignore
      this.user$!.pipe(
        checkRoles(roles),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((accessAllowed: boolean) => {
        if (accessAllowed) {
          this.vcr.createEmbeddedView(this.template);
          this.cdr.markForCheck();
        } else {
          this.vcr.clear();
        }
      });
    } else {
      this.vcr.createEmbeddedView(this.template);
      this.cdr.markForCheck();
    }
  }
}
