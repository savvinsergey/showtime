import { ApplicationRef, ComponentRef, inject, Injectable, ViewContainerRef } from '@angular/core';
import { asapScheduler } from 'rxjs';
import { EAlertTypes } from '../enums/alert-types.enum';
import { AlertToastComponent } from '../components/alert-toast/alert-toast.component';
import { ALERT_DEFAULT_DURATION } from '../constants/alert-default-duration.const';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private readonly appRef = inject(ApplicationRef);

  // ---------------- //

  public open(type: EAlertTypes, text: string): void {
    const rootViewContainerRef = this.appRef.components[0].injector.get(ViewContainerRef);

    const node = document.createElement('span');
    const textNode = document.createTextNode(text);

    node.appendChild(textNode);

    const componentRef = rootViewContainerRef.createComponent(AlertToastComponent, {
      projectableNodes: [[node]],
    });

    componentRef.setInput('type', type);

    const instance = componentRef?.instance;
    if (instance.close instanceof Function) {
      const originalClose = instance.close.bind(instance);
      instance.close = () => {
        originalClose();
        asapScheduler.schedule(() => {
          componentRef?.destroy();
        }, ALERT_DEFAULT_DURATION);
      };
    }
  }
}
