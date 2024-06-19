import { inject, Injectable, Injector } from '@angular/core';
import { ConfirmModalComponent } from '@showtime/shared/components';
import type { IModalData } from '@showtime/shared/interfaces';
import { takeUntil } from 'rxjs';

import { ModalsService } from './modals.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  private readonly modalService = inject(ModalsService);

  // --------------------- //

  public open<C>(context: C, content: string, confirmHandler: (parameter: C | undefined) => void) {
    const data: IModalData = { content };
    const confirmModalComponent = this.modalService.open<ConfirmModalComponent<C>, C>(
      ConfirmModalComponent<C>,
      Injector.NULL,
      context,
      data,
    );

    confirmModalComponent.confirmed
      .pipe(takeUntil(this.modalService.destroyed$))
      .subscribe(confirmHandler);
    confirmModalComponent.canceled
      .pipe(takeUntil(this.modalService.destroyed$))
      .subscribe(() => confirmModalComponent.close());
  }
}
