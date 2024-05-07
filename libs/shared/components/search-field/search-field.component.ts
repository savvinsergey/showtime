import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { ISearchType } from '../../interfaces';
import { BaseControl } from '../../utils';
import { TSearchValue } from '../../types';

@Component({
  selector: 'st-search-field',
  styleUrls: ['./search-field.component.scss'],
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
export class SearchFieldComponent extends BaseControl<TSearchValue> implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);

  // ------------------- //

  @Input() types: ISearchType[] = [];
  @Input() dynamic = false;
  @Input() placeholder = 'Search...';

  public override form: FormGroup = this.fb.group({});

  override ngOnInit() {
    const updateOn = this.dynamic ? 'change' : 'submit';
    this.form = this.fb.group<TSearchValue>(
      {
        type: '',
        searchString: '',
      },
      { updateOn },
    );

    super.ngOnInit();
  }

  public override writeValue(value: TSearchValue) {
    if (!value?.type && this.types?.length) {
      const options = { onlySelf: true, emitEvent: false };
      this.form.get('type')!.setValue(this.types[0].value, options);
    }

    super.writeValue(value);
  }
}
