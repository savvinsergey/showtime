import { map, OperatorFunction, pipe, take } from 'rxjs';
import { UserRoleModel } from '../../../../../users/data/domain/models/user-role.model';
import { UserModel } from '../../../../data/domain/models/user.model';

export const checkRoles = (allowedRoles: string[]): OperatorFunction<UserModel, boolean> => {
  return pipe(
    map((user: UserModel) => !!user?.roles.some((role: UserRoleModel) => allowedRoles.includes(role.name))),
    take(1),
  );
};
