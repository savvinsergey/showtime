import type { LoginCommand, LogoutCommand } from '@showtime/auth/application/commands';

export interface IAuthCommands {
  login: LoginCommand;
  logout: LogoutCommand;
}
