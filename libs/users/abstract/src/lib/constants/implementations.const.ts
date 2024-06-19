import { UsersUiFacade } from '@showtime/users/ui/abstract';
import { UsersUtilsFacade } from '@showtime/users/utils/abstract';

import { UsersUiFacadeImplementation, UsersUtilsFacadeImplementation } from '../facades';

export const usersImplementationsMap = new Map();

usersImplementationsMap.set(UsersUiFacade, UsersUiFacadeImplementation);
usersImplementationsMap.set(UsersUtilsFacade, UsersUtilsFacadeImplementation);
