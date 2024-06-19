import type { UpdateUserCommand } from '@showtime/auth/application';
import type { DeleteCommand, UpdateCommand, UpdateRolesCommand } from '@showtime/users/application';

export interface IUsersUiCommands {
  update: UpdateCommand;
  delete: DeleteCommand;
  updateRoles: UpdateRolesCommand;
  updateUser: UpdateUserCommand;
}
