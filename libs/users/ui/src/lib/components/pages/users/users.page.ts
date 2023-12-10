import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAbstractModule, UsersFacade } from '@showtime/users/abstract';
import { UsersPageService } from './users-page.service';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { EventHandlerPipe } from '../../../../../../../shared/pipes/event-handler/event-handler.pipe';
import { UsersTableComponent } from '../../presentional/users-table/users-table.component';
import { SearchFieldComponent } from '../../../../../../../shared/components/search-field/search-field.component';
import { USER_SEARCH_TYPE } from '../../../constants/search-types.const';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAllUsersPayload } from '../../../../../../domain/src/lib/interfaces/users-all-payload.interface';

@Component({
  selector: 'st-users-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersAbstractModule,
    InlineSVGModule,
    UsersTableComponent,
    EventHandlerPipe,
    SearchFieldComponent,
  ],
  providers: [UsersPageService],
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage {
  private readonly usersFacade = inject(UsersFacade);
  private readonly usersPageService = inject(UsersPageService);

  // -------------------- //

  public readonly allUsers$ = this.usersFacade.state['allUsers'].value$;
  public readonly inProgress$ = this.usersPageService.inProgress$;
  public readonly refresh$ = this.usersPageService.refresh$;

  public readonly searchTypes = USER_SEARCH_TYPE;
  public search = null;
  public searchPayload: IAllUsersPayload | undefined;

  public onRefresh = (): void => {
    this.usersFacade.refresh(this.searchPayload);
  };

  // TODO: Implement filters functional. It still works wrong
  public onSearch(search: any) {
    this.searchPayload = search ? ({ q: `${search.type}:"${search.searchString}"` } as IAllUsersPayload) : undefined;
    this.usersFacade.refresh(this.searchPayload);
  }
}
