import { inject } from '@angular/core';

import type { BaseCqrsQuery } from './base-cqrs-query';

export function injectQuery<C, M>(
  query: typeof BaseCqrsQuery<C, M>,
): (...arguments_: [boolean, C?]) => BaseCqrsQuery<C, M> {
  return (...arguments_: [boolean, C?]) => {
    const instance = inject(query);
    instance.initialize(...arguments_);

    return instance;
  };
}
