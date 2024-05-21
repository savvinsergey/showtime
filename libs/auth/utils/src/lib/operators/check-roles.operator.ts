import type { UserModel, UserRoleModel } from '@showtime/auth/domain';
import type { OperatorFunction } from 'rxjs';
import { map, pipe, take } from 'rxjs';

export const checkRoles = (allowedRoles: string[]): OperatorFunction<UserModel, boolean> => {
  return pipe(
    map(
      (user: UserModel) =>
        !!user?.roles.some((role: UserRoleModel) => allowedRoles.includes(role.name)),
    ),
    take(1),
  );
};
