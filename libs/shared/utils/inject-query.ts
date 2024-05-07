import { inject } from '@angular/core';

import { BaseCqrsQuery } from './base-cqrs-query';

export function injectQuery<C, M>(query: typeof BaseCqrsQuery<C, M>): (...args: [boolean, C?]) => BaseCqrsQuery<C, M> {
  return (...args: [boolean, C?]) => {
    const instance = inject(query);
    instance.initialize(...args);

    return instance;
  };
}
