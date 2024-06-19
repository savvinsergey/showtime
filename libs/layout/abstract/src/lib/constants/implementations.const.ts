import { LayoutUiFacade } from '@showtime/layout/ui/abstract';

import { LayoutUiFacadeImplementation } from '../facades';

export const layoutImplementationsMap = new Map();

layoutImplementationsMap.set(LayoutUiFacade, LayoutUiFacadeImplementation);
