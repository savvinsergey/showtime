import { inject, Injectable } from '@angular/core';
import { ModalsService } from './modals.service';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { takeUntil } from 'rxjs';
import { IModalData } from '../interfaces/modal-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  private readonly modalService = inject(ModalsService);

  // --------------------- //

  public open<C>(context: C, content: string, confirmHandler: (param: C | undefined) => void) {
    const data: IModalData = { content };
    const confirmModalComponent = this.modalService.open<ConfirmModalComponent<C>, C>(
      ConfirmModalComponent<C>,
      context,
      data,
    );

    confirmModalComponent.confirmed.pipe(takeUntil(this.modalService.destroyed$)).subscribe(confirmHandler);
    confirmModalComponent.canceled.pipe(takeUntil(this.modalService.destroyed$)).subscribe(() => {
      confirmModalComponent.close();
    });
  }
}
