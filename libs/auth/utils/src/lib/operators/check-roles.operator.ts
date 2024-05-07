import { map, OperatorFunction, pipe, take } from 'rxjs';

import { UserModel, UserRoleModel } from '@showtime/auth/domain';

export const checkRoles = (allowedRoles: string[]): OperatorFunction<UserModel, boolean> => {
  return pipe(
    map((user: UserModel) => !!user?.roles.some((role: UserRoleModel) => allowedRoles.includes(role.name))),
    take(1),
  );
};
