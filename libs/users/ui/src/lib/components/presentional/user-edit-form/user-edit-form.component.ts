import { CommonModule } from '@angular/common';
import type { OnChanges, SimpleChanges } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import type { FormControls } from '@showtime/shared/types';
import { urlValidator } from '@showtime/shared/validators';
import { DatepickerComponent } from '@showtime/ui-kit';
import type { UserModel } from '@showtime/users/domain';
import type { IUserEditForm, IUserEditFormConfig, IUserEditFormValue } from '@showtime/users/ui';
import { InlineSVGModule } from 'ng-inline-svg-2';

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

  @Input() public user!: UserModel;
  @Input() public config!: IUserEditFormConfig;

  @Output() public readonly saved = new EventEmitter<IUserEditFormValue>();

  public readonly form = this.createForm();

  public get defaultLanguage() {
    const defaultLanguage = this.languages.find(lang => lang.default)?.value;
    return defaultLanguage || this.languages[0]?.value;
  }

  public get inProgress() {
    return this.config.inProgress;
  }

  public get isAuth0Provider() {
    return this.config.isAuth0Provider;
  }

  public get languages() {
    return this.config.languages;
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
