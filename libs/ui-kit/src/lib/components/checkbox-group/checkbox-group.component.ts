import { Component, forwardRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormArray, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseControl } from '../../../../../shared/utils/base-control/base-control';
import { UserRoleModel } from '../../../../../users/data/domain/models/user-role.model';

type TInnerControl = { list: boolean[] };
type TExternalValue = Record<string, any> & {
  id: string;
  name: string;
};

@Component({
  selector: 'uik-checkbox-group',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, ReactiveFormsModule],
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class CheckboxGroupComponent extends BaseControl<TExternalValue[], TInnerControl> implements OnChanges {
  private readonly fb = inject(FormBuilder);

  // --------------------- //

  @Input() list: TExternalValue[] = [];

  public override readonly form = this.fb.nonNullable.group({
    list: this.fb.nonNullable.array([]),
  });

  public get listControl() {
    return this.form.get('list') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const list = changes['list']?.currentValue;

    if (list?.length && !this.listControl.controls.length) {
      this.initializeForm(list);
    }
  }

  public override writeValue(values: TExternalValue[]) {
    this.setChecked(this.list, values);
  }

  public override convertValue({ list }: TInnerControl): TExternalValue[] {
    return (list || []).map((value: boolean, i: number) => value && this.list[i]).filter(Boolean) as TExternalValue[];
  }

  private initializeForm(list: UserRoleModel[]) {
    list.forEach(() => {
      const control = this.fb.nonNullable.control<boolean>(false);
      this.listControl.push(control);
    });
  }

  private setChecked(list: TExternalValue[], checked: TExternalValue[]) {
    this.listControl.controls.forEach((control, index) => {
      const value = !!checked?.find(item => item?.id === list[index]?.id);
      control.setValue(value);
    });
  }
}
