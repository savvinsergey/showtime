import { ChangeDetectionStrategy, Component, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAbstractModule, UsersFacade } from '@showtime/users/abstract';
import { UsersPageService } from './users-page.service';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { EventHandlerPipe } from '../../../../../../../shared/pipes/event-handler/event-handler.pipe';
import { UsersTableComponent } from '../../presentional/users-table/users-table.component';
import { SearchFieldComponent } from '../../../../../../../shared/components/search-field/search-field.component';
import { USER_SEARCH_TYPE } from '../../../constants/search-types.const';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAllUsersPayload } from '../../../../../../domain/src/lib/interfaces/users-all-payload.interface';
import { FiltersService } from '../../../../../../../shared/services/filters.service';
import { QUERY_PARAMS_USERS_PAGE } from '../../../constants/filters-users-page.const';
import { UsersPageParamsConverterService } from './users-page.params-converter';
import { QUERY_PARAMS_LIST } from '../../../../../../../shared/constants/query-params-list-token.const';
import { BaseParamsConverter } from '../../../../../../../shared/utils/base-params-converter/base-params-converter';
import { ITableSortValue } from '../../../../../../../shared/interfaces/table-sort-value.interface';

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
    FiltersService,
    {
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

  public readonly allUsers$ = this.usersFacade.state['allUsers'].value$;
  public readonly inProgress$ = this.usersPageService.inProgress$;
  public readonly filters$ = this.filtersService.filters$;
  public readonly refresh$ = this.usersPageService.refresh$;

  public onRefresh = (payload: IAllUsersPayload | undefined): void => {
    this.usersFacade.refresh(payload);
  };

  public onSearch(search: any): void {
    this.filtersService.filter = { search };
  }

  public onSort(sort: ITableSortValue | null): void {
    this.filtersService.filter = { sort };
  }
}
