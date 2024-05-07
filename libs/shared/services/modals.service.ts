import { ApplicationRef, ComponentRef, inject, Injectable, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { asapScheduler, Subject, timer } from 'rxjs';

import { IModal, IModalData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalsService implements OnDestroy {
  private readonly appRef = inject(ApplicationRef);

  // ---------------- //

  private readonly destroyedSource = new Subject<void>();

  public readonly destroyed$ = this.destroyedSource.asObservable();

  ngOnDestroy() {
    this.destroyedSource.complete();
  }

  public open<M extends IModal<C>, C>(component: Type<M>, context: C, data?: IModalData): M {
    const rootViewContainerRef = this.appRef.components[0].injector.get(ViewContainerRef);

    const componentRef = rootViewContainerRef.createComponent<M>(component);
    if (data) {
      componentRef.setInput('data', data);
    }

    const instance = componentRef?.instance;
    if (instance.open instanceof Function) {
      timer(0).subscribe(() => instance.open(context));
    } else {
      console.error(`Modal '${component.toString()}' has no implementation of 'open' method`);
    }

    if (instance.close instanceof Function) {
      const originalClose = instance.close.bind(instance);
      instance.close = () => {
        originalClose();
        asapScheduler.schedule(() => {
          this.destroy<M>(componentRef);
        });
      };
    } else {
      console.error(`Modal '${component.toString()}' has no implementation of 'close' method`);
    }

    return instance;
  }

  private destroy<M>(componentRef: ComponentRef<M>): void {
    this.destroyedSource.next();
    componentRef?.destroy();
  }
}
