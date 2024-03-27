import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseControl } from '../../../../../shared/utils/base-control/base-control';
import { NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

declare var Datepicker: any;

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
    const el = this.datepickerEl.nativeElement as HTMLElement;
    this.initialize(el);
  }

  private initialize(element: HTMLElement): void {
    const datepicker = new Datepicker(element, {
      autohide: true,
      format: 'yyyy-mm-dd',
    });

    this.initHideFunc(datepicker);
    this.initChangingDate(element);
  }

  private initHideFunc(datepicker: typeof Datepicker) {
    const originalHide = datepicker.hide;
    datepicker.hide = function () {
      originalHide.apply(this);

      datepicker.picker.element.classList.remove('active');
      datepicker.picker.element.classList.add('hidden');
    };
  }

  private initChangingDate(element: HTMLElement) {
    fromEvent<Event>(element, 'changeDate')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;

        this.form.setValue(value);
        this.form.markAsDirty();
      });
  }
}
