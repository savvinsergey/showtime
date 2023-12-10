import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CheckboxGroupComponent } from '../../../ui-kit/src/lib/components/checkbox-group/checkbox-group.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../ui-kit/src/lib/components/modal/modal.component';

@Component({
  selector: 'st-confirm-modal',
  templateUrl: 'confirm-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CheckboxGroupComponent, FormsModule, ModalComponent],
})
export class ConfirmModalComponent {
  @Input() data?: { content: string };

  @Output() confirmed = new EventEmitter<any>();
  @Output() canceled = new EventEmitter<void>();

  @ViewChild(ModalComponent)
  private modal!: ModalComponent;

  public onConfirm() {
    this.confirmed.emit(this.modal?.context);
    this.modal?.close();
  }

  public onCancel() {
    this.canceled.emit();
    this.close();
  }

  public onClose() {
    this.canceled.emit();
  }

  public open(context: any) {
    this.modal?.open(context);
  }

  public close() {
    this.modal?.close();
  }
}
