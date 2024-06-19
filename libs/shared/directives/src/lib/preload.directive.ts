import { Directive, HostListener, inject, Input } from '@angular/core';
import { OnDemandPreloadService } from '@showtime/shared/services';

@Directive({
  selector: '[preload]',
  standalone: true,
})
export class OnDemandPreloadDirective {
  private readonly preloadOnDemandService = inject(OnDemandPreloadService);

  // -----------------------//

  @Input() preload!: string;

  @HostListener('mouseover') mouseover() {
    if (!this.preload) {
      return;
    }

    this.preloadOnDemandService.startPreload(this.preload);
  }
}
