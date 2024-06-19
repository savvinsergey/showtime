import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { IModalData } from '@showtime/shared/interfaces';
import { CheckboxGroupComponent, ModalComponent } from '@showtime/ui-kit';

@Component({
  selector: 'st-confirm-modal',
  styleUrls: ['./confirm-modal.component.scss'],
  templateUrl: 'confirm-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CheckboxGroupComponent, FormsModule, ModalComponent],
})
export class ConfirmModalComponent<C> {
  @Input() data?: IModalData;

  @Output() confirmed = new EventEmitter<C | undefined>();
  @Output() canceled = new EventEmitter<void>();

  @ViewChild(ModalComponent) private modal!: ModalComponent;

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
