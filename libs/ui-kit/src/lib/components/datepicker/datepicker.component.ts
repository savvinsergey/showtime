import { CommonModule } from '@angular/common';
import type { AfterViewInit, ElementRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BaseControl } from '@showtime/shared/utils';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { fromEvent } from 'rxjs';

/* eslint-disable  @typescript-eslint/no-explicit-any */
declare let Datepicker: any;

@Component({
  selector: 'uik-datepicker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InlineSVGModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent extends BaseControl<string> implements AfterViewInit {
  private readonly fb = inject(NonNullableFormBuilder);

  // ------------------- //

  @Input() placeholder = 'Choose date';

  @ViewChild('datepickerEl') datepickerEl!: ElementRef;

  public override form = this.fb.control<string>('');

  ngAfterViewInit() {
    const element = this.datepickerEl.nativeElement as HTMLElement;
    this.initialize(element);
  }

  private initChangingDate(element: HTMLElement) {
    fromEvent<Event>(element, 'changeDate')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event_: Event) => {
        const value = (event_.target as HTMLInputElement).value;

        this.form.setValue(value);
        this.form.markAsDirty();
      });
  }

  private initHideFunc(datepicker: typeof Datepicker) {
    const originalHide = datepicker.hide;
    datepicker.hide = function () {
      originalHide.apply(this);

      datepicker.picker.element.classList.remove('active');
      datepicker.picker.element.classList.add('hidden');
    };
  }

  private initialize(element: HTMLElement): void {
    const datepicker = new Datepicker(element, {
      autohide: true,
      format: 'yyyy-mm-dd',
    });

    this.initHideFunc(datepicker);
    this.initChangingDate(element);
  }
}
