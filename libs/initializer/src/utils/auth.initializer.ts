import { IsAuthQuery, UserQuery } from '@showtime/auth/application';
import { injectQuery } from '@showtime/shared/utils';
import { GetRolesByUserQuery } from '@showtime/users/application';
import type { UserModel, UserRoleModel } from '@showtime/users/domain';
import { filter, first, map, of, switchMap, tap } from 'rxjs';

export const authInitializer = () => {
  const queries = {
    isAuth: injectQuery<null, boolean>(IsAuthQuery)(true),
    user: injectQuery<void, UserModel>(UserQuery)(false),
    roles: injectQuery<string, UserRoleModel[]>(GetRolesByUserQuery)(false),
  };

  const userData$ = queries.user.value$.pipe(
    filter(Boolean),
    tap((user: UserModel) => queries.roles.execute(user.sub)),
    switchMap((user: UserModel) =>
      queries.roles.value$.pipe(
        first(Boolean),
        tap((roles: UserRoleModel[]) => (user.roles = roles)),
        map(() => user),
      ),
    ),
  );

  const user$ = queries.isAuth.value$.pipe(
    switchMap((isAuth: boolean) =>
      // prettier-ignore
      isAuth
        ? userData$
        : of(null),
    ),
  );

  return () => user$.pipe(first());
};
