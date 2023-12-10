import 'reflect-metadata';
import { first, isObservable, Observable, Subject, takeUntil, tap } from 'rxjs';
import { ApplicationRef, inject } from '@angular/core';
import { ConfirmModalService } from '../services/confirm-modals.service';
import { AppComponent } from '../../../apps/showtime/src/app/app.component';
import { EAlertTypes } from '../enums/alert-types.enum';
import { AlertsService } from '../services/alerts.service';
import { EAsyncStatusesCqrs } from '../enums';

export const Alert = (message: { success?: string; error?: string }): MethodDecorator => {
  return function (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
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
