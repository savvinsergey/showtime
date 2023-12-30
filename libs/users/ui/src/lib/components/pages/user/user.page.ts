import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAbstractModule, UsersFacade } from '@showtime/users/abstract';
import { UserPageService } from './user-page.service';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { EventHandlerPipe } from '../../../../../../../shared/pipes/event-handler/event-handler.pipe';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { defaultIfEmpty, Observable, startWith, tap } from 'rxjs';
import { UserModel, UserModelMetadata } from '../../../../../../../auth/domain/src/lib/core/models/user.model';
import { UserEditFormComponent } from '../../presentional/user-edit-form/user-edit-form.component';
import { IUserEditFormConfig } from '../../../interfaces/user-edit-form-config';
import { IUserEditFormValue } from '../../../interfaces/user-edit-form-value';
import { Alert } from '../../../../../../../shared/decorators/alert.decorator';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';

@Component({
  selector: 'st-user-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersAbstractModule,
    InlineSVGModule,
    UserEditFormComponent,
  ],
  providers: [UserPageService],
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  private readonly usersFacade = inject(UsersFacade);
  private readonly userPageService = inject(UserPageService);

  // -------------------- //

  public readonly user$ = this.usersFacade.state['user'].value$;
  public readonly config$ = this.userPageService.config$;

  @Alert({
    success: 'User settings were saved successfully',
    error: "User settings were not saved. Something went wrong'",
  })
  public onSave({ id, body }: IUserEditFormValue): Observable<EAsyncStatusesCqrs> {
    return this.usersFacade.update(id, body);
  }
}
