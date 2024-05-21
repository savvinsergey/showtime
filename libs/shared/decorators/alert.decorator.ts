import 'reflect-metadata';

import { isObservable, Subject, takeUntil, tap } from 'rxjs';

import { EAlertTypes, EAsyncStatusesCqrs } from '../enums';
import { AlertsService } from '../services';
import { RootInjector } from '../utils/root-injector';

export const Alert = (message: { success?: string; error?: string }): MethodDecorator => {
  return function (target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...arguments_: unknown[]) {
      const alertsService = RootInjector.get(AlertsService);
      const destroyReferenceSource = new Subject<void>();

      if (alertsService) {
        const result$ = original.apply(this, arguments_);

        if (!isObservable(result$)) {
          console.error('Result of method is not Observable. Method must return his status$');
          return result$;
        }

        const complete = () => {
          destroyReferenceSource.next();
          destroyReferenceSource.complete();
        };

        return result$
          .pipe(
            tap(status => {
              if (status === EAsyncStatusesCqrs.SUCCESS) {
                complete();
                if (message?.success) {
                  alertsService.open(EAlertTypes.SUCCESS, message.success);
                }
              }

              if (status === EAsyncStatusesCqrs.ERROR) {
                complete();
                if (message?.error) {
                  alertsService.open(EAlertTypes.ERROR, message.error);
                }
              }
            }),
            takeUntil(destroyReferenceSource.asObservable()),
          )
          .subscribe();
      } else {
        console.error('AlertsService was not found');
        return original.apply(this, arguments_);
      }
    };

    return descriptor;
  };
};
