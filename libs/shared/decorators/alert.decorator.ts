import 'reflect-metadata';
import { isObservable, Subject, takeUntil, tap } from 'rxjs';

import { AppComponent } from '../../../apps/showtime/src/app/app.component';
import { EAlertTypes, EAsyncStatusesCqrs } from '../enums';
import { AlertsService } from '../services';

export const Alert = (message: { success?: string; error?: string }): MethodDecorator => {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const alertsService = AppComponent.appInjector.get(AlertsService);
      const destroyRefSource = new Subject<void>();

      if (!alertsService) {
        console.error('AlertsService was not found');
        return original.apply(this, args);
      } else {
        const result$ = original.apply(this, args);

        if (!isObservable(result$)) {
          console.error('Result of method is not Observable. Method must return his status$');
          return result$;
        }

        const complete = () => {
          destroyRefSource.next();
          destroyRefSource.complete();
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
            takeUntil(destroyRefSource.asObservable()),
          )
          .subscribe();
      }
    };

    return descriptor;
  };
};
