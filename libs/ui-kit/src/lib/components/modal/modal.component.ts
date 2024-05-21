import { CommonModule } from '@angular/common';
import type { AfterViewInit, ElementRef } from '@angular/core';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import type { ModalInterface, ModalOptions } from 'flowbite';
import { Modal } from 'flowbite';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'uik-modal',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @Output() closed = new EventEmitter<void>();

  @ViewChild('modalEl') modalEl!: ElementRef;

  private modal!: ModalInterface;

  public context: unknown = null;

  ngAfterViewInit() {
    const modalElement = this.modalEl.nativeElement;
    const modalOptions: ModalOptions = {
      closable: true,
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/30 fixed inset-0 z-40',
    };

    this.modal = new Modal(modalElement, modalOptions);
  }

  public onClose() {
    this.close();
  }

  public close() {
    asapScheduler.schedule(() => {
      this.context = null;
      this.modal.hide();

      this.closed.emit();
    });
  }

  public open<TContextValue = undefined>(context?: TContextValue) {
    this.context = context;
    this.modal?.show();
  }
}
