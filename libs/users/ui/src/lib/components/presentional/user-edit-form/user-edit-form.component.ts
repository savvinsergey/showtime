import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../../../../../../auth/domain/src/lib/core/models/user.model';
import { IUserEditFormConfig } from '../../../interfaces/user-edit-form-config';
import { IUserEditFormValue } from '../../../interfaces/user-edit-form-value';
import { WithRequiredProperty } from '../../../../../../../shared/types/with-required-property.type';
import { DatepickerComponent } from '../../../../../../../ui-kit/src/lib/components/datepicker/datepicker.component';
import { urlValidator } from '../../../../../../../shared/validators/url.validator';

@Component({
  selector: 'st-user-edit-form',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, ReactiveFormsModule, DatepickerComponent],
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditFormComponent implements OnChanges {
  private readonly fb = inject(NonNullableFormBuilder);

  // ------------------------ //

  @Input() user!: WithRequiredProperty<UserModel, 'sub'>;
  @Input() config!: IUserEditFormConfig | null;

  @Output() saved = new EventEmitter<IUserEditFormValue>();

  public readonly form = this.createForm();
  public get inProgress() {
    return this.config?.inProgress;
  }

  public get languages() {
    return this.config?.languages || [];
  }

  public get isAuth0Provider() {
    return this.config?.isAuth0Provider;
  }

  public get defaultLanguage() {
    return this.languages.find(lang => lang.default)?.value || this.languages[0]?.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const user = changes['user']?.currentValue;
    if (user && Object.keys(user).length) {
      this.form.patchValue({
        ...user,
        language: user.language || this.defaultLanguage,
        nickname: user.nickname || user.email.split('@')[0],
      });
    }
  }

  private createForm() {
    return this.fb.group({
      nickname: this.fb.control<string>(''),
      birthday: this.fb.control<string>(''),
      language: this.fb.control<string>(''),
      country: this.fb.control<string>(''),
      city: this.fb.control<string>(''),
      address: this.fb.control<string>(''),
      instagramLink: this.fb.control<string>('', [urlValidator()]),
      facebookLink: this.fb.control<string>('', [urlValidator()]),
    });
  }
}
