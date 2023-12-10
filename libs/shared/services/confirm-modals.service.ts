import { inject, Injectable } from '@angular/core';
import { ModalsService } from './modals.service';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  private readonly modalService = inject(ModalsService);

  // --------------------- //

  public open<C>(context: C, content: string, confirmHandler: (param: C) => void) {
    const data = { content };
    const confirmModalComponent = this.modalService.open<ConfirmModalComponent, C>(
      ConfirmModalComponent,
      context,
      data,
    );

    confirmModalComponent.confirmed.pipe(takeUntil(this.modalService.destroyed$)).subscribe(confirmHandler);
    confirmModalComponent.canceled.pipe(takeUntil(this.modalService.destroyed$)).subscribe(() => {
      confirmModalComponent.close();
    });
  }
}
