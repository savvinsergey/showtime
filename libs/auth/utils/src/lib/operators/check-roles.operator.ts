import { map, OperatorFunction, pipe, take } from 'rxjs';
import { UserModel } from '../../../../domain/src/lib/core/models/user.model';
import { IUserRole } from '../../../../../users/domain/src/lib/interfaces/user-roles.interface';

export const checkRoles = (allowedRoles: string[]): OperatorFunction<UserModel, boolean> => {
  return pipe(
    map((user: UserModel) => !!user?.roles.some((role: IUserRole) => allowedRoles.includes(role.name))),
    take(1),
  );
};
