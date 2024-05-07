import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserEditFormComponent } from '../../presentional';
import { UserPageService } from './user-page.service';

import { IUserEditFormValue } from '@showtime/users/ui';
import { Alert } from '@showtime/shared/decorators';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { UsersFacade } from '@showtime/users/ui/facade';
import { UsersAbstractModule } from '@showtime/users/abstract';

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

  private readonly state = this.usersFacade.state;

  public readonly user$ = this.state.user$;
  public readonly config$ = this.userPageService.config$;

  @Alert({
    success: 'User settings were saved successfully',
    error: "User settings were not saved. Something went wrong'",
  })
  public onSave({ id, body }: IUserEditFormValue): Observable<EAsyncStatusesCqrs> {
    return this.usersFacade.update(id, body);
  }
}
