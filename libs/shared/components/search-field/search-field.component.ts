import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BaseControl } from '../../utils/base-control/base-control';

type TExternalValue = Record<string, any> & {
  type?: string | undefined;
  searchString: string;
};

@Component({
  selector: 'st-search-field',
  templateUrl: 'search-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InlineSVGModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchFieldComponent),
      multi: true,
    },
  ],
})
export class SearchFieldComponent extends BaseControl<TExternalValue> implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);

  // ------------------- //

  @Input() types: string[] | undefined;
  @Input() dynamic = false;
  @Input() placeholder = 'Search...';

  public override form!: FormGroup;

  override ngOnInit() {
    const updateOn = this.dynamic ? 'change' : 'submit';
    this.form = this.fb.group<TExternalValue>(
      {
        type: '',
        searchString: '',
      },
      { updateOn },
    );

    super.ngOnInit();
  }

  public override writeValue(value: TExternalValue) {
    if (!value?.type && this.types?.length) {
      this.form.get('type')!.setValue(this.types[0], { onlySelf: true, emitEvent: false });
    }

    super.writeValue(value);
  }
}
