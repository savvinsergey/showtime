import type { LoginCommand, LogoutCommand } from '@showtime/auth/application';

export interface IAuthUiCommands {
  login: LoginCommand;
  logout: LogoutCommand;
}
