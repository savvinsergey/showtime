import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CheckboxGroupComponent } from '../../../ui-kit/src/lib/components/checkbox-group/checkbox-group.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../ui-kit/src/lib/components/modal/modal.component';
import { IModalData } from '../../interfaces/modal-data.interface';

@Component({
  selector: 'st-confirm-modal',
  templateUrl: 'confirm-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CheckboxGroupComponent, FormsModule, ModalComponent],
})
export class ConfirmModalComponent<C extends unknown> {
  @Input() data?: IModalData;

  @Output() confirmed = new EventEmitter<C | undefined>();
  @Output() canceled = new EventEmitter<void>();

  @ViewChild(ModalComponent)
  private modal!: ModalComponent;

  public onConfirm() {
    this.confirmed.emit(this.modal?.context as C);
    this.modal?.close();
  }

  public onCancel() {
    this.canceled.emit();
    this.close();
  }

  public onClose() {
    this.canceled.emit();
  }

  public open<TContextValue>(context: TContextValue) {
    this.modal?.open(context);
  }

  public close() {
    this.modal?.close();
  }
}
