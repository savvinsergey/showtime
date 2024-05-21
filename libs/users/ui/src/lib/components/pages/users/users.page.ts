import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFieldComponent } from '@showtime/shared/components';
import { QUERY_PARAMETERS_LIST } from '@showtime/shared/const';
import type { ITableSortValue } from '@showtime/shared/interfaces';
import { EventHandlerPipe } from '@showtime/shared/pipes';
import { FiltersService } from '@showtime/shared/services';
import type { TSearchValue } from '@showtime/shared/types';
import { BaseParametersMapper } from '@showtime/shared/utils';
import { UsersAbstractModule } from '@showtime/users/abstract';
import type { IAllUsersPayload } from '@showtime/users/domain';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { QUERY_PARAMS_USERS_PAGE, USER_SEARCH_TYPE } from '../../../constants';
import { UsersFacade } from '../../../facades';
import type { IUserPageData } from '../../../interfaces';
import { UsersTableComponent } from '../../presentional';
import { UsersPageParametersMapperService } from './users-page.parameters-mapper';
import { UsersPageService } from './users-page.service';

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
  providers: [
    UsersPageService,
    {
      provide: FiltersService,
      useFactory: () => new FiltersService<IUserPageData>(),
    },
    {
      // For using FilterService you have to specify QUERY_PARAMETERS_LIST and BaseParamsConverter
      provide: QUERY_PARAMETERS_LIST,
      useValue: QUERY_PARAMS_USERS_PAGE,
    },
    {
      provide: BaseParametersMapper,
      useClass: UsersPageParametersMapperService,
    },
  ],
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage {
  private readonly usersFacade = inject(UsersFacade);
  private readonly usersPageService = inject(UsersPageService);
  private readonly filtersService = inject(FiltersService);

  public readonly searchTypes = inject(USER_SEARCH_TYPE);

  // -------------------- //

  private readonly state = this.usersFacade.state;

  public readonly allUsers$ = this.state.allUsers$;
  public readonly filters$ = this.filtersService.filters$;
  public readonly inProgress$ = this.usersPageService.inProgress$;
  public readonly refresh$ = this.usersPageService.refresh$;

  public onRefresh = (payload: IAllUsersPayload | undefined): void => {
    this.usersFacade.refresh(payload);
  };

  public onSearch(search: TSearchValue): void {
    this.filtersService.filter = { search };
  }

  public onSort(sort: ITableSortValue | null): void {
    this.filtersService.filter = { sort };
  }
}
