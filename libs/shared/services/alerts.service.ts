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

  private componentRef: ComponentRef<any> | undefined;

  public open(type: EAlertTypes, text: string): void {
    const rootViewContainerRef = this.appRef.components[0].injector.get(ViewContainerRef);

    const node = document.createElement('span');
    const textNode = document.createTextNode(text);

    node.appendChild(textNode);

    this.componentRef = rootViewContainerRef.createComponent(AlertToastComponent, {
      projectableNodes: [[node]],
    });

    this.componentRef.setInput('type', type);

    const instance = this.componentRef?.instance;
    if (instance.close instanceof Function) {
      const originalClose = instance.close.bind(instance);
      instance.close = () => {
        originalClose();
        asapScheduler.schedule(() => {
          this.destroy();
        }, ALERT_DEFAULT_DURATION);
      };
    }
  }

  public destroy(): void {
    this.componentRef?.destroy();
    this.componentRef = undefined;
  }
}
