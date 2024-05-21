import { CommonModule } from '@angular/common';
import type { OnChanges, SimpleChanges } from '@angular/core';
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input } from '@angular/core';
import type { FormArray } from '@angular/forms';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import type { UserRoleModel } from '@showtime/auth/domain';
import { BaseControl } from '@showtime/shared/utils';
import { InlineSVGModule } from 'ng-inline-svg-2';

/* eslint-disable @typescript-eslint/no-explicit-any */
type TExternalValue = Record<string, any> & {
  id: string;
  name: string;
};
type TInnerControl = { list: boolean[] };

@Component({
  selector: 'uik-checkbox-group',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, ReactiveFormsModule],
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class CheckboxGroupComponent
  extends BaseControl<TExternalValue[], TInnerControl>
  implements OnChanges
{
  private readonly fb = inject(FormBuilder);

  // --------------------- //

  @Input() public list: TExternalValue[] = [];

  public override readonly form = this.fb.nonNullable.group({
    list: this.fb.nonNullable.array([]),
  });

  public get listControl() {
    return this.form.get('list') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const list = changes['list']?.currentValue;

    if (list?.length && this.listControl.controls.length === 0) {
      this.initializeForm(list);
    }
  }

  public override convertValue({ list }: TInnerControl): TExternalValue[] {
    return (list || [])
      .map((value: boolean, index: number) => value && this.list[index])
      .filter(Boolean) as TExternalValue[];
  }

  public override writeValue(values: TExternalValue[]) {
    this.setChecked(this.list, values);
  }

  // TODO: Replace UserRoleModel
  private initializeForm(list: UserRoleModel[]) {
    for (const _item of list) {
      const control = this.fb.nonNullable.control<boolean>(false);
      this.listControl.push(control);
    }
  }

  private setChecked(list: TExternalValue[], checked: TExternalValue[]) {
    for (const [index, control] of this.listControl.controls.entries()) {
      const value = !!checked?.find(item => item?.id === list[index]?.id);
      control.setValue(value);
    }
  }
}
