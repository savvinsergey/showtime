import 'reflect-metadata';

import { ConfirmModalService } from '../services';
import { RootInjector } from '../utils/root-injector';

export const Confirm = (message: string): MethodDecorator => {
  return function (target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value!;

    descriptor.value = function (...arguments_: unknown[]) {
      const confirmModalService = RootInjector.get(ConfirmModalService);
      if (!confirmModalService) {
        return console.error('ConfirmationModalService was not found');
      }

      confirmModalService.open(arguments_, message, () => {
        original.apply(this, arguments_);
      });
    };

    return descriptor;
  };
};
