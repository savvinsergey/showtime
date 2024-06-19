import type { OnInit } from '@angular/core';
import { DestroyRef, Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { ControlValueAccessor, FormArray, FormControl, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';

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

  public registerOnChange(function_: () => unknown) {
    this.onChange = function_;
  }

  public registerOnTouched(function_: () => unknown): void {
    this.onTouched = function_;
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

  protected convertValue(value: V): V | R {
    return value;
  }
}
