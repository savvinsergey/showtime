import { DeleteCommand, UpdateCommand } from '@showtime/users/domain/commands';
import { UpdateRolesCommand } from '../../../../domain/src/lib/cqrs/commands/update-roles.command';

export interface IUsersCommands {
  update: UpdateCommand;
  delete: DeleteCommand;
  updateRoles: UpdateRolesCommand;
}
