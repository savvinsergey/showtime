import { AuthUiFacade } from '@showtime/auth/ui/abstract';
import { AuthUtilsFacade } from '@showtime/auth/utils/abstract';

import { AuthUiFacadeImplementation, AuthUtilsFacadeImplementation } from '../facades';

export const authImplementationsMap = new Map();

authImplementationsMap.set(AuthUiFacade, AuthUiFacadeImplementation);
authImplementationsMap.set(AuthUtilsFacade, AuthUtilsFacadeImplementation);
