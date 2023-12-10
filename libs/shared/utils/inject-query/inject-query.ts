import { BaseCqrsQuery } from '../base-cqrs-query/base-cqrs-query';
import { inject } from '@angular/core';

export function injectQuery<C, M>(query: typeof BaseCqrsQuery<C, M>): (...args: any) => BaseCqrsQuery<C, M> {
  return (...args: [any, any]) => {
    const instance = inject(query);
    instance.initialize(...args);

    return instance;
  };
}
