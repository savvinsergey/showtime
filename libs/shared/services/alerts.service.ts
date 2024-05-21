import { ApplicationRef, inject, Injectable, ViewContainerRef } from '@angular/core';
import { asapScheduler } from 'rxjs';

import { AlertToastComponent } from '../components';
import { ALERT_DEFAULT_DURATION } from '../constants';
import type { EAlertTypes } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private readonly appRef = inject(ApplicationRef);

  // ---------------- //

  public open(type: EAlertTypes, text: string): void {
    const rootViewContainerReference = this.appRef.components[0].injector.get(ViewContainerRef);

    const node = document.createElement('span');
    const textNode = document.createTextNode(text);

    node.append(textNode);

    const componentReference = rootViewContainerReference.createComponent(AlertToastComponent, {
      projectableNodes: [[node]],
    });

    componentReference.setInput('type', type);

    const instance = componentReference?.instance;
    if (instance.close instanceof Function) {
      const originalClose = instance.close.bind(instance);
      instance.close = () => {
        originalClose();
        asapScheduler.schedule(() => {
          componentReference?.destroy();
        }, ALERT_DEFAULT_DURATION);
      };
    }
  }
}
