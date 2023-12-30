import { OnInit, Directive, inject, DestroyRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({})
export abstract class BaseControl<T, V = T, R = T> implements OnInit, ControlValueAccessor {
  protected readonly destroyRef = inject(DestroyRef);

  // ------------------ //

  protected disabled = false;
  protected form!: FormControl | FormArray | FormGroup;

  protected onChange!: (value: V | R) => void;
  protected onTouched!: () => void;

  private readonly controlOptions = {
    emitEvent: false,
    onlySelf: true,
  };

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        filter(() => !!this.onChange),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: V) => {
        const convertedValue = this.convertValue?.(value);
        this.onChange(convertedValue);
      });
  }

  public registerOnChange(fn: () => unknown) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => unknown): void {
    this.onTouched = fn;
  }

  public writeValue(outsideValue: T): void {
    this.form.patchValue(outsideValue, this.controlOptions);
  }

  public setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable(this.controlOptions);
    } else {
      this.form.enable(this.controlOptions);
    }

    this.disabled = isDisabled;
  }

  protected convertValue(value: V): R {
    return this.form.value;
  }
}
