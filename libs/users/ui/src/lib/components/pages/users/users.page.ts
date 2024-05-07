import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersPageService } from './users-page.service';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { UsersTableComponent } from '../../presentional';
import { USER_SEARCH_TYPE, QUERY_PARAMS_USERS_PAGE } from '../../../constants';
import { IUserPageData } from '../../../interfaces';
import { UsersFacade } from '../../../facades';
import { UsersPageParamsConverterService } from './users-page.params-converter';

import { IAllUsersPayload } from '@showtime/users/domain';
import { FiltersService } from '@showtime/shared/services';
import { QUERY_PARAMS_LIST } from '@showtime/shared/const';
import { BaseParamsConverter } from '@showtime/shared/utils';
import { TSearchValue } from '@showtime/shared/types';
import { ITableSortValue } from '@showtime/shared/interfaces';
import { EventHandlerPipe } from '@showtime/shared/pipes';
import { SearchFieldComponent } from '@showtime/shared/components';
import { UsersAbstractModule } from '@showtime/users/abstract';

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
      // For using FilterService you have to specify QUERY_PARAMS_LIST and BaseParamsConverter
      provide: QUERY_PARAMS_LIST,
      useValue: QUERY_PARAMS_USERS_PAGE,
    },
    {
      provide: BaseParamsConverter,
      useClass: UsersPageParamsConverterService,
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
  public readonly inProgress$ = this.usersPageService.inProgress$;
  public readonly refresh$ = this.usersPageService.refresh$;
  public readonly filters$ = this.filtersService.filters$;

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
