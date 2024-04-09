import { DeleteCommand, UpdateCommand, UpdateRolesCommand } from '@showtime/users/application/commands';

export interface IUsersCommands {
  update: UpdateCommand;
  delete: DeleteCommand;
  updateRoles: UpdateRolesCommand;
}
