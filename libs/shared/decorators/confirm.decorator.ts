import 'reflect-metadata';
import { Observable, tap } from 'rxjs';
import { ApplicationRef, inject } from '@angular/core';
import { ConfirmModalService } from '../services/confirm-modals.service';
import { AppComponent } from '../../../apps/showtime/src/app/app.component';

export const Confirm = (message: string): MethodDecorator => {
  return function (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
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
