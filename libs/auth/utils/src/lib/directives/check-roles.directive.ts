import {
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { checkRoles } from '../operators/check-roles.operator';

import { EUserRoles } from '@showtime/auth/shared';
import { AuthFacade } from '@showtime/auth/ui/facade';

@Directive({
  selector: '[checkAccess]',
})
export class CheckAccessDirective implements OnChanges {
  private readonly authFacade = inject(AuthFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly template = inject(TemplateRef);
  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);

  // ------------------- //

  @Input('checkAccess') roles: EUserRoles[] | undefined;

  private readonly user$ = this.authFacade.state.user$;

  ngOnChanges(changes: SimpleChanges): void {
    const roles = changes['roles']?.currentValue;
    if (roles?.length) {
      this.user$!.pipe(checkRoles(roles), takeUntilDestroyed(this.destroyRef)).subscribe((accessAllowed: boolean) => {
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
