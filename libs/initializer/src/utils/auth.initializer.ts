import { first, map, of, switchMap, tap } from 'rxjs';

import { IsAuthQuery, UserQuery } from '@showtime/auth/application/queries';
import { injectQuery } from '@showtime/shared/utils';
import { GetRolesByUserQuery } from '@showtime/users/application/queries';
import { UserRoleModel } from '../../../users/data/domain/models/user-role.model';
import { UserModel } from '../../../auth/data/domain/models/user.model';

export const authInitializer = () => {
  const queries = {
    isAuth: injectQuery<null, boolean>(IsAuthQuery)(true),
    user: injectQuery<void, UserModel>(UserQuery)(false),
    roles: injectQuery<string, UserRoleModel[]>(GetRolesByUserQuery)(false),
  };

  const userData$ = queries['user'].value$.pipe(
    tap((user: UserModel) => queries['roles'].execute(user.sub)),
    switchMap((user: UserModel) =>
      queries['roles'].value$.pipe(
        first(Boolean),
        tap((roles: UserRoleModel[]) => (user.roles = roles)),
        map(() => user),
      ),
    ),
  );

  const user$ = queries['isAuth'].value$.pipe(switchMap((isAuth: boolean) => (isAuth ? userData$ : of(null))));

  return () => user$.pipe(first());
};
