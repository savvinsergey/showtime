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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { checkRoles } from '../operators/check-roles.operator';
import { EUserRoles } from '../../../../shared/enums/user-roles.enum';
import { AuthFacade } from '../../../../ui/src/lib/facades/auth.facade';

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
