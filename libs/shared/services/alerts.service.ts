import { ApplicationRef, ComponentRef, inject, Injectable, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { Subject, timeout, timer } from 'rxjs';
import { EAlertTypes } from '../enums/alert-types.enum';
import { AlertToastComponent } from '../components/alert-toast/alert-toast.component';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private readonly appRef = inject(ApplicationRef);

  // ---------------- //

  private componentRef: ComponentRef<any> | undefined;

  open(type: EAlertTypes, text: string): void {
    const rootViewContainerRef = this.appRef.components[0].injector.get(ViewContainerRef);

    const node = document.createElement('span');
    const textNode = document.createTextNode(text);

    node.appendChild(textNode);

    this.componentRef = rootViewContainerRef.createComponent(AlertToastComponent, {
      projectableNodes: [[node]],
    });

    this.componentRef.setInput('type', type);
  }

  destroy(): void {
    this.componentRef?.destroy();
    this.componentRef = undefined;
  }
}
