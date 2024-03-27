import { LoginCommand, LogoutCommand } from '@showtime/auth/domain/commands';

export interface IAuthCommands {
  login: LoginCommand;
  logout: LogoutCommand;
}
