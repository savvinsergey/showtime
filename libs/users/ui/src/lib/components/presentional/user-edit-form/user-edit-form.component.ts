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
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../../../../../../auth/domain/src/lib/core/models/user.model';
import { IUserEditFormConfig } from '../../../interfaces/user-edit-form-config';
import { IUserEditFormValue } from '../../../interfaces/user-edit-form-value';
import { DatepickerComponent } from '../../../../../../../ui-kit/src/lib/components/datepicker/datepicker.component';
import { urlValidator } from '../../../../../../../shared/validators/url.validator';
import { IUserEditForm } from '../../../interfaces/user-edit-form';
import { FormControls } from '../../../../../../../shared/types/form-controls.type';

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

  @Input() user!: UserModel;
  @Input() config!: IUserEditFormConfig;

  @Output() saved = new EventEmitter<IUserEditFormValue>();

  public readonly form = this.createForm();

  public get inProgress() {
    return this.config.inProgress;
  }

  public get languages() {
    return this.config.languages;
  }

  public get isAuth0Provider() {
    return this.config.isAuth0Provider;
  }

  public get defaultLanguage() {
    const defaultLanguage = this.languages.find(lang => lang.default)?.value;
    return defaultLanguage || this.languages[0]?.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const user = changes['user']?.currentValue;
    if (user) {
      this.form.patchValue({
        ...user,
        language: user.language || this.defaultLanguage,
        nickname: user.nickname || user.email.split('@')[0],
      });
    }
  }

  private createForm(): FormGroup<FormControls<IUserEditForm>> {
    return this.fb.group<FormControls<IUserEditForm>>({
      nickname: this.fb.control(''),
      birthday: this.fb.control(''),
      language: this.fb.control(''),
      country: this.fb.control(''),
      city: this.fb.control(''),
      address: this.fb.control(''),
      instagramLink: this.fb.control('', urlValidator()),
      facebookLink: this.fb.control('', urlValidator()),
    });
  }
}
