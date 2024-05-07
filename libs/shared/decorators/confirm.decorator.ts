import 'reflect-metadata';

import { AppComponent } from '../../../apps/showtime/src/app/app.component';
import { ConfirmModalService } from '../services';

export const Confirm = (message: string): MethodDecorator => {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value!;

    descriptor.value = function (...args: unknown[]) {
      const confirmModalService = AppComponent.appInjector.get(ConfirmModalService);
      if (!confirmModalService) {
        return console.error('ConfirmationModalService was not found');
      }

      confirmModalService.open(args, message, () => {
        original.apply(this, args);
      });
    };

    return descriptor;
  };
};
