import {
  DestroyRef,
  Directive,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthFacade } from '@showtime/auth/abstract';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EUserRoles } from '../../../../domain/src/lib/enums/user-roles.enum';
import { checkRoles } from '../operators/check-roles.operator';

@Directive({
  selector: '[checkAccess]',
  standalone: true,
})
export class CheckAccessDirective implements OnChanges {
  private readonly authFacade = inject(AuthFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly template = inject(TemplateRef);
  private readonly vcr = inject(ViewContainerRef);

  // ------------------- //

  @Input('checkAccess') roles: EUserRoles[] | undefined;

  private readonly user$ = this.authFacade.state.user$;

  ngOnChanges(changes: SimpleChanges): void {
    const roles = changes['roles']?.currentValue;
    if (roles?.length) {
      this.user$!.pipe(checkRoles(roles), takeUntilDestroyed(this.destroyRef)).subscribe((accessAllowed: boolean) => {
        if (accessAllowed) {
          this.vcr.createEmbeddedView(this.template);
        } else {
          this.vcr.clear();
        }
      });
    } else {
      this.vcr.createEmbeddedView(this.template);
    }
  }
}
