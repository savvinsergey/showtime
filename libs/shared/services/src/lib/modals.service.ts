import type { ComponentRef, Injector, OnDestroy, Type } from '@angular/core';
import { ApplicationRef, inject, Injectable, ViewContainerRef } from '@angular/core';
import type { IModal, IModalData } from '@showtime/shared/interfaces';
import { asapScheduler, Subject, timer } from 'rxjs';

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

  public open<M extends IModal<C>, C>(
    component: Type<M>,
    injector: Injector,
    context: C,
    data?: IModalData,
  ): M {
    const rootViewContainerReference = this.appRef.components[0].injector.get(ViewContainerRef);
    const componentReference = rootViewContainerReference.createComponent<M>(component, {
      injector,
    });
    if (data) {
      componentReference.setInput('data', data);
    }

    const instance = componentReference?.instance;
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
          this.destroy<M>(componentReference);
        });
      };
    } else {
      console.error(`Modal '${component.toString()}' has no implementation of 'close' method`);
    }

    return instance;
  }

  private destroy<M>(componentReference: ComponentRef<M>): void {
    this.destroyedSource.next();
    componentReference?.destroy();
  }
}
