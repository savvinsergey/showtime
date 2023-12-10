import { EAuthCommands } from '../enums/auth-commands.enum';
import { LoginCommand, LogoutCommand } from '@showtime/auth/domain/commands';

export const AUTH_DOMAIN_COMMANDS = {
  [EAuthCommands.LOGIN]: LoginCommand,
  [EAuthCommands.LOGOUT]: LogoutCommand,
};
