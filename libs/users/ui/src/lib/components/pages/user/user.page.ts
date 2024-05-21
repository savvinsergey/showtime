import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alert } from '@showtime/shared/decorators';
import type { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { UsersAbstractModule } from '@showtime/users/abstract';
import type { IUserEditFormValue } from '@showtime/users/ui';
import { UsersFacade } from '@showtime/users/ui/facade';
import { InlineSVGModule } from 'ng-inline-svg-2';
import type { Observable } from 'rxjs';

import { UserEditFormComponent } from '../../presentional';
import { UserPageService } from './user-page.service';

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
